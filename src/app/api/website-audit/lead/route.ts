import { NextResponse } from "next/server";
import { sendMail, syncToActiveCampaign } from "@/lib/leads";

export const dynamic = "force-dynamic";

// Lead-capture gate for the website-audit tool.
// The PSI scores are produced by /api/website-audit (unchanged). Once the
// analysis is done, the Client shows a Name + Email gate before revealing the
// results. On submit it POSTs here, which:
//   1. honeypot-checks the hidden "company" field (silently OK on bots),
//   2. upserts + tags the contact in ActiveCampaign (best-effort, never throws),
//   3. emails a lead notification to CONTACT_TO + the report to the visitor.
// The Client then reveals the full results in place.
//
// Env (already configured): AC_API_URL, AC_API_KEY, AC_LIST_ID, AC_TAG_ID,
// AC_MARKETING_TAG_ID, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM,
// CONTACT_TO.

/* ── Types matching the PSI results shape from /api/website-audit ── */
interface DeviceScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface AuditResults {
  url?: string;
  mobile?: DeviceScores;
  desktop?: DeviceScores;
  issues?: string[];
  quickWins?: string[];
  agencyInsights?: string[];
}

/* ── Escape any user/site-derived text before dropping it into HTML ── */
function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scoreColor(val: number): string {
  if (val >= 90) return "#28c840";
  if (val >= 50) return "#febc2e";
  return "#ff5c7a";
}

function avg(a: number, b: number): number {
  return Math.round((a + b) / 2);
}

/* ── Dark-themed report email (matches the social-audit notification style) ── */
function buildReportEmail(
  name: string,
  email: string,
  marketingOptIn: boolean,
  results: AuditResults
): string {
  const mobile = results.mobile || { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
  const desktop = results.desktop || { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
  const overall = avg(mobile.performance, desktop.performance);

  const scoreCards = [
    { label: "Mobile Perf", val: mobile.performance },
    { label: "Desktop Perf", val: desktop.performance },
    { label: "Accessibility", val: avg(mobile.accessibility, desktop.accessibility) },
    { label: "Best Practices", val: avg(mobile.bestPractices, desktop.bestPractices) },
    { label: "SEO", val: avg(mobile.seo, desktop.seo) },
  ]
    .map(
      (c) => `<td style="padding:12px 8px;text-align:center;background:#111;border-radius:8px;">
        <span style="display:block;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#888;">${esc(
          c.label
        )}</span>
        <span style="display:block;margin-top:6px;font-size:26px;font-weight:bold;color:${scoreColor(
          c.val
        )};">${c.val}</span>
      </td>`
    )
    .join('<td style="width:8px;"></td>');

  const list = (items: string[] | undefined, color: string) =>
    (items && items.length
      ? items
          .map(
            (i) =>
              `<li style="margin:0 0 8px;color:#ccc;font-size:13px;line-height:1.5;"><span style="color:${color};">&bull;</span> ${esc(
                i
              )}</li>`
          )
          .join("")
      : `<li style="color:#888;font-size:13px;">None found — looking good.</li>`);

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#F92672;margin:0 0 4px;">New Website Audit Lead</h1>
      <p style="color:#888;margin:0 0 24px;font-size:14px;">${esc(
        new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })
      )}</p>

      <table style="width:100%;margin-bottom:24px;">
        <tr><td style="color:#888;padding:4px 0;width:120px;">Name</td><td style="padding:4px 0;"><strong>${esc(
          name
        )}</strong></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(
          email
        )}" style="color:#F92672;">${esc(email)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Website</td><td style="padding:4px 0;"><a href="${esc(
          results.url
        )}" style="color:#F92672;">${esc(results.url)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Marketing opt-in</td><td style="padding:4px 0;">${
          marketingOptIn ? "Yes ✅" : "No"
        }</td></tr>
      </table>

      <div style="background:#111;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="color:#888;margin:0 0 4px;font-size:13px;">OVERALL PERFORMANCE</p>
        <p style="font-size:48px;font-weight:bold;margin:0;color:${scoreColor(
          overall
        )};">${overall}/100</p>
      </div>

      <table style="width:100%;border-collapse:separate;margin-bottom:24px;"><tr>${scoreCards}</tr></table>

      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#ef4444;">Key Issues</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.issues, "#ef4444")}</ul>
      </div>

      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#22c55e;">Quick Wins</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.quickWins, "#22c55e")}</ul>
      </div>

      <div style="background:#1a1a1a;border-left:3px solid #F92672;padding:16px 20px;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#F92672;">What This Means</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.agencyInsights, "#F92672")}</ul>
      </div>

      <p style="margin-top:24px;font-size:12px;color:#999;">
        Sent from the awmedia.marketing free website audit tool
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: {
    url?: string;
    name?: string;
    email?: string;
    marketingOptIn?: boolean;
    company?: string;
    results?: AuditResults;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { url, name, email, marketingOptIn, company, results } = body;

  // Honeypot: real users never fill "company" (it's visually hidden).
  // If it's populated, it's a bot — pretend success, process nothing.
  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const safeResults: AuditResults = { url, ...(results || {}) };

  // 1. Push to ActiveCampaign (best-effort — syncToActiveCampaign never throws).
  await syncToActiveCampaign({ name, email, marketingOptIn });

  // 2. Email the lead notification (to CONTACT_TO) + the report to the visitor.
  const reportHtml = buildReportEmail(name, email, !!marketingOptIn, safeResults);
  try {
    // Lead notification to the team (default CONTACT_TO).
    await sendMail({
      subject: `New website audit lead — ${name}`,
      html: reportHtml,
      replyTo: email,
    });
    // Copy of the report to the visitor.
    await sendMail({
      to: email,
      subject: "Your website audit report from AW Media",
      html: reportHtml,
    });
  } catch (mailError) {
    // Don't block the reveal on a mail hiccup — the lead is already in AC.
    console.error("Website audit lead email failed:", mailError);
  }

  return NextResponse.json({ success: true });
}
