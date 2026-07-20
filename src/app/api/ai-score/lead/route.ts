import { NextResponse } from "next/server";
import { sendMail, syncToActiveCampaign } from "@/lib/leads";

export const dynamic = "force-dynamic";

// Lead-capture gate for the AI Opportunity Score quiz. The scoring runs
// entirely client-side (deterministic, see src/data/ai-score.ts); once the
// visitor hits the gate, the Client POSTs here with their details plus the
// full answer set. This route:
//   1. honeypot-checks the hidden "company" field (silently OK on bots),
//   2. upserts + tags the contact in ActiveCampaign incl. phone (best-effort),
//   3. emails a lead notification (with every answer, the sales intel) to
//      CONTACT_TO and a results summary to the visitor.
// Env: same AC_* / SMTP_* / CONTACT_TO set as the audit tools, plus optional
// AC_AI_SCORE_TAG_ID for a quiz-specific tag (falls back to AC_TAG_ID).

interface TopArea {
  title?: string;
  outcome?: string;
  insights?: string[];
}

interface LeadBody {
  name?: string;
  email?: string;
  phone?: string;
  marketingOptIn?: boolean;
  company?: string; // honeypot
  score?: number;
  band?: string;
  hoursPerWeek?: number;
  answers?: { question?: string; answer?: string }[];
  topAreas?: TopArea[];
}

function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Normalise a UK mobile for WhatsApp links: 07123 456789 -> 447123456789.
function waNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("07")) return `44${digits.slice(1)}`;
  if (digits.startsWith("447")) return digits;
  if (digits.startsWith("00")) return digits.slice(2);
  return digits;
}

function scoreColor(val: number): string {
  if (val >= 65) return "#28c840";
  if (val >= 35) return "#febc2e";
  return "#ff5c7a";
}

/* Lead notification to the team: contact details with tap-to-action links,
   the score, the top areas, and every answer (that's the sales intel). */
function buildLeadEmail(body: Required<Pick<LeadBody, "name" | "email">> & LeadBody): string {
  const phone = (body.phone || "").trim();
  const wa = phone ? waNumber(phone) : "";
  const score = Number(body.score) || 0;

  const answerRows = (body.answers || [])
    .map(
      (a) => `<tr>
        <td style="padding:8px 12px;color:#888;font-size:13px;border-bottom:1px solid #222;vertical-align:top;width:55%;">${esc(a.question)}</td>
        <td style="padding:8px 12px;color:#fff;font-size:13px;border-bottom:1px solid #222;font-weight:600;">${esc(a.answer)}</td>
      </tr>`
    )
    .join("");

  const areaBlocks = (body.topAreas || [])
    .map(
      (area, i) => `<div style="background:#1a1a1a;border-left:3px solid #F92672;padding:14px 18px;border-radius:0 8px 8px 0;margin-bottom:10px;">
        <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#F92672;">Opportunity ${i + 1}</p>
        <p style="margin:6px 0 0;color:#fff;font-size:14px;font-weight:bold;">${esc(area.title)}</p>
        <p style="margin:4px 0 0;color:#ccc;font-size:13px;">${esc(area.outcome)}</p>
      </div>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#F92672;margin:0 0 4px;">New AI Score Lead</h1>
      <p style="color:#888;margin:0 0 24px;font-size:14px;">${esc(
        new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })
      )}</p>

      <table style="width:100%;margin-bottom:24px;">
        <tr><td style="color:#888;padding:4px 0;width:130px;">Name</td><td style="padding:4px 0;"><strong>${esc(body.name)}</strong></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(body.email)}" style="color:#F92672;">${esc(body.email)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Mobile</td><td style="padding:4px 0;">${
          phone
            ? `<a href="tel:${esc(phone.replace(/\s/g, ""))}" style="color:#F92672;font-weight:bold;">${esc(phone)}</a>
               &nbsp;·&nbsp; <a href="https://wa.me/${esc(wa)}" style="color:#28c840;font-weight:bold;">WhatsApp them</a>`
            : `<span style="color:#888;">Not given</span>`
        }</td></tr>
        <tr><td style="color:#888;padding:4px 0;">Marketing opt-in</td><td style="padding:4px 0;">${body.marketingOptIn ? "Yes ✅" : "No"}</td></tr>
      </table>

      <div style="background:#111;border-radius:8px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="color:#888;margin:0 0 4px;font-size:13px;">AI OPPORTUNITY SCORE</p>
        <p style="font-size:48px;font-weight:bold;margin:0;color:${scoreColor(score)};">${score}/100</p>
        <p style="color:#ccc;margin:6px 0 0;font-size:14px;">${esc(body.band)}${
          Number(body.hoursPerWeek)
            ? ` &middot; ~${Number(body.hoursPerWeek)} hrs/week automatable`
            : ""
        }</p>
      </div>

      ${areaBlocks}

      <div style="background:#111;border-radius:8px;padding:16px 8px;margin-top:24px;">
        <p style="margin:0 12px 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#888;">Their answers</p>
        <table style="width:100%;border-collapse:collapse;">${answerRows}</table>
      </div>

      <p style="margin-top:24px;font-size:12px;color:#999;">
        Sent from the awmedia.marketing AI Opportunity Score test
      </p>
    </div>
  `;
}

/* Results summary to the visitor: their score plus the top three areas,
   with a book-a-call CTA. */
function buildVisitorEmail(name: string, body: LeadBody): string {
  const score = Number(body.score) || 0;
  const firstName = name.trim().split(" ")[0];

  const areaBlocks = (body.topAreas || [])
    .map(
      (area, i) => `<div style="background:#1a1a1a;border-left:3px solid #F92672;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:12px;">
        <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#F92672;">Opportunity ${i + 1}</p>
        <p style="margin:6px 0 0;color:#fff;font-size:15px;font-weight:bold;">${esc(area.title)}</p>
        <p style="margin:6px 0 0;color:#ccc;font-size:13px;line-height:1.5;">${esc(area.outcome)}</p>
        ${(area.insights || [])
          .map(
            (ins) =>
              `<p style="margin:8px 0 0;color:#999;font-size:12px;line-height:1.5;">&bull; ${esc(ins)}</p>`
          )
          .join("")}
      </div>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#fff;margin:0 0 16px;font-size:22px;">Your AI Opportunity Score, ${esc(firstName)}</h1>

      <div style="background:#111;border-radius:8px;padding:24px;margin-bottom:24px;text-align:center;">
        <p style="color:#888;margin:0 0 4px;font-size:13px;">YOU SCORED</p>
        <p style="font-size:52px;font-weight:bold;margin:0;color:${scoreColor(score)};">${score}/100</p>
        <p style="color:#ccc;margin:8px 0 0;font-size:14px;">${esc(body.band)}</p>
        ${
          Number(body.hoursPerWeek)
            ? `<p style="color:#F92672;margin:8px 0 0;font-size:13px;font-weight:bold;">Around ${Number(
                body.hoursPerWeek
              )} hours a week of your work looks automatable</p>`
            : ""
        }
      </div>

      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 20px;">
        Based on your answers, these are the three places AI would pay off
        first in your business:
      </p>

      ${areaBlocks}

      <div style="text-align:center;margin-top:28px;">
        <a href="https://awmedia.marketing/contact" style="display:inline-block;background:#F92672;color:#fff;font-weight:bold;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;">Book a free call to walk through it</a>
        <p style="color:#888;font-size:12px;margin:14px 0 0;">
          No pitch, no pressure. We'll show you exactly what each one would
          look like in your business.
        </p>
      </div>

      <p style="margin-top:28px;font-size:12px;color:#999;">
        AW Media &middot; awmedia.marketing
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill "company" (it's visually hidden).
  if (body.company) {
    return NextResponse.json({ success: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "A valid mobile number is required." },
      { status: 400 }
    );
  }

  // 1. Push to ActiveCampaign incl. phone (best-effort, never throws).
  await syncToActiveCampaign({
    name,
    email,
    phone,
    marketingOptIn: body.marketingOptIn,
    tagId: process.env.AC_AI_SCORE_TAG_ID,
  });

  // 2. Lead notification to the team + results summary to the visitor.
  try {
    await sendMail({
      subject: `New AI Score lead: ${name} (${body.score}/100)`,
      html: buildLeadEmail({ ...body, name, email }),
      replyTo: email,
    });
    await sendMail({
      to: email,
      subject: `Your AI Opportunity Score: ${body.score}/100`,
      html: buildVisitorEmail(name, body),
    });
  } catch (mailError) {
    // Don't block the reveal on a mail hiccup, the lead is already in AC.
    console.error("AI score lead email failed:", mailError);
  }

  return NextResponse.json({ success: true });
}
