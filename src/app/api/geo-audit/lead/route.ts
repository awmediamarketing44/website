import { NextResponse } from "next/server";
import { sendMail, syncToActiveCampaign } from "@/lib/leads";
import type { GeoResult } from "../analysis";

export const dynamic = "force-dynamic";

// Lead-capture gate for the GEO audit tool. The score is produced by
// /api/geo-audit. Once analysis is done, the Client shows a Name + Email gate
// before revealing the report. On submit it POSTs here, which:
//   1. honeypot-checks the hidden "company" field (silently OK on bots),
//   2. upserts + tags the contact in ActiveCampaign (best-effort, never throws),
//   3. emails a lead notification to CONTACT_TO + the report to the visitor.
//
// Env (already configured for the website audit): AC_API_URL, AC_API_KEY,
// AC_LIST_ID, AC_TAG_ID, AC_MARKETING_TAG_ID, SMTP_*, CONTACT_TO.
// Optional: AC_GEO_TAG_ID to tag GEO-audit leads distinctly.

function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scoreColor(val: number): string {
  if (val >= 75) return "#28c840";
  if (val >= 50) return "#febc2e";
  return "#ff5c7a";
}

function buildReportEmail(
  name: string,
  email: string,
  marketingOptIn: boolean,
  results: GeoResult,
): string {
  const overall = results.overall ?? 0;

  const pillarRows = (results.pillars || [])
    .map(
      (p) => `<tr>
        <td style="padding:8px 0;color:#ccc;font-size:13px;">${esc(p.label)}</td>
        <td style="padding:8px 0;text-align:right;font-weight:bold;color:${scoreColor(
          Math.round((p.score / p.max) * 100),
        )};">${p.score}/${p.max}</td>
      </tr>`,
    )
    .join("");

  const list = (items: string[] | undefined, color: string) =>
    items && items.length
      ? items
          .map(
            (i) =>
              `<li style="margin:0 0 8px;color:#ccc;font-size:13px;line-height:1.5;"><span style="color:${color};">&bull;</span> ${esc(
                i,
              )}</li>`,
          )
          .join("")
      : `<li style="color:#888;font-size:13px;">None found — looking good.</li>`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#F92672;margin:0 0 4px;">New GEO Audit Lead</h1>
      <p style="color:#888;margin:0 0 24px;font-size:14px;">${esc(
        new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }),
      )}</p>

      <table style="width:100%;margin-bottom:24px;">
        <tr><td style="color:#888;padding:4px 0;width:120px;">Name</td><td style="padding:4px 0;"><strong>${esc(
          name,
        )}</strong></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(
          email,
        )}" style="color:#F92672;">${esc(email)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Website</td><td style="padding:4px 0;"><a href="${esc(
          results.url,
        )}" style="color:#F92672;">${esc(results.url)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Marketing opt-in</td><td style="padding:4px 0;">${
          marketingOptIn ? "Yes ✅" : "No"
        }</td></tr>
      </table>

      <div style="background:#111;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="color:#888;margin:0 0 4px;font-size:13px;">GEO SCORE (AI VISIBILITY)</p>
        <p style="font-size:48px;font-weight:bold;margin:0;color:${scoreColor(
          overall,
        )};">${overall}/100 <span style="font-size:24px;color:#888;">(${esc(results.grade)})</span></p>
      </div>

      <table style="width:100%;margin-bottom:24px;">${pillarRows}</table>

      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#ef4444;">Key Gaps</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.issues, "#ef4444")}</ul>
      </div>

      <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#febc2e;">Quick Wins</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.quickWins, "#febc2e")}</ul>
      </div>

      <div style="background:#1a1a1a;border-left:3px solid #F92672;padding:16px 20px;border-radius:0 8px 8px 0;">
        <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#F92672;">What This Means</p>
        <ul style="margin:0;padding:0;list-style:none;">${list(results.insight, "#F92672")}</ul>
      </div>

      <p style="margin-top:24px;font-size:12px;color:#999;">
        Sent from the awmedia.marketing free GEO audit tool
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    marketingOptIn?: boolean;
    company?: string;
    results?: GeoResult;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, marketingOptIn, company, results } = body;

  // Honeypot: real users never fill "company" (it's visually hidden).
  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !results) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  // 1. Push to ActiveCampaign (best-effort — never throws). Tag GEO leads
  //    distinctly if AC_GEO_TAG_ID is set, otherwise fall back to the default.
  await syncToActiveCampaign({
    name,
    email,
    marketingOptIn,
    tagId: process.env.AC_GEO_TAG_ID || process.env.AC_TAG_ID,
  });

  // 2. Email the lead notification + a copy of the report to the visitor.
  const reportHtml = buildReportEmail(name, email, !!marketingOptIn, results);
  try {
    await sendMail({
      subject: `New GEO audit lead — ${name} (${results.overall}/100)`,
      html: reportHtml,
      replyTo: email,
    });
    await sendMail({
      to: email,
      subject: "Your GEO (AI visibility) audit from AW Media",
      html: reportHtml,
    });
  } catch (mailError) {
    console.error("GEO audit lead email failed:", mailError);
  }

  return NextResponse.json({ success: true });
}
