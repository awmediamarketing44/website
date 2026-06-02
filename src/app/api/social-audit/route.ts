import { NextResponse } from "next/server";
import { sendMail, syncToActiveCampaign } from "@/lib/leads";
import {
  audits,
  runAuditScraping,
  buildNotificationEmail,
  type AuditJob,
  type LeadData,
  type PlatformStatus,
} from "./_engine";

export const dynamic = "force-dynamic";

// ============================================================
// POST /api/social-audit  — start an audit job
// Mirrors POST /api/audit/start from the Express tool: captures the
// lead, extracts handles, creates the in-memory job, and kicks off the
// (non-blocking) Apify scraping. Returns { auditId } immediately; the
// client then polls /api/social-audit/status/[id].
//
// Env: APIFY_TOKEN (scraping), CONTACT_TO (notify address, defaults to
// alex@awmedia.marketing via sendMail), plus the SMTP_* vars used by sendMail.
// ============================================================
export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Extract platform handles (handle_* keys), same as server.js
  const platforms: Record<string, string> = {};
  Object.keys(data).forEach((key) => {
    if (key.startsWith("handle_") && data[key] && data[key].trim()) {
      platforms[key.replace("handle_", "")] = data[key].trim();
    }
  });

  if (Object.keys(platforms).length === 0) {
    return NextResponse.json(
      { error: "Please enter at least one social media handle." },
      { status: 400 }
    );
  }

  const auditId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const lead: LeadData = {
    name: data.name || "",
    email: data.email || "",
    business: data.business || "",
    goal: data.goal || "",
    platforms,
    submittedAt: new Date().toISOString(),
  };

  console.log(
    `New lead: ${lead.name} (${lead.email}) — scanning ${Object.keys(platforms).join(", ")}`
  );

  const job: AuditJob = {
    id: auditId,
    leadData: lead,
    platforms,
    platformStatuses: {},
    rawData: {},
    metrics: {},
    results: null,
    status: "scanning",
    createdAt: new Date(),
  };
  Object.keys(platforms).forEach((p) => {
    job.platformStatuses[p] = "pending" as PlatformStatus;
  });
  audits.set(auditId, job);

  // Capture the lead in ActiveCampaign immediately — before any results are
  // shown — same CRM integration as the contact form. Best-effort.
  if (lead.email) {
    syncToActiveCampaign({ name: lead.name, email: lead.email }).catch(() => {});
  }

  // Kick off scraping (non-blocking). On completion, send the report
  // email via SMTP (sendMail) — swapped from the source's Resend usage.
  runAuditScraping(auditId, (completed) => {
    if (!completed.results) return;
    const { subject, html } = buildNotificationEmail(
      completed.leadData,
      completed.results,
      completed.metrics
    );
    sendMail({
      subject,
      html,
      replyTo: completed.leadData.email,
      // to defaults to CONTACT_TO / alex@awmedia.marketing inside sendMail
    }).catch((err) =>
      console.error(
        "Failed to send social-audit notification:",
        err instanceof Error ? err.message : err
      )
    );
  });

  return NextResponse.json({ auditId });
}
