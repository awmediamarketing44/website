import { NextResponse } from "next/server";
import { sendMail, syncToActiveCampaign } from "@/lib/leads";

export const dynamic = "force-dynamic";

// Newsletter signup for /newsletter. Same shape as the other lead routes:
//   1. honeypot-checks the hidden "company" field (silently OK on bots),
//   2. upserts the contact into ActiveCampaign, adds them to the Master
//      Contact List and tags them (best-effort, never throws),
//   3. emails a welcome to the subscriber and a heads-up to the team.
// Submitting the form IS the marketing consent here, so marketingOptIn is
// always true and the marketing tag goes on with it.
// Env: same AC_* / SMTP_* / CONTACT_TO set as the audit tools, plus optional
// AC_NEWSLETTER_TAG_ID for a newsletter-specific tag (falls back to AC_TAG_ID).

interface SignupBody {
  name?: string;
  email?: string;
  company?: string; // honeypot
}

function esc(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTeamEmail(name: string, email: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#F92672;margin:0 0 4px;">New newsletter signup</h1>
      <p style="color:#888;margin:0 0 24px;font-size:14px;">${esc(
        new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })
      )}</p>

      <table style="width:100%;">
        <tr><td style="color:#888;padding:4px 0;width:130px;">Name</td><td style="padding:4px 0;"><strong>${esc(name)}</strong></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Email</td><td style="padding:4px 0;"><a href="mailto:${esc(email)}" style="color:#F92672;">${esc(email)}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0;">Source</td><td style="padding:4px 0;">awmedia.marketing/newsletter</td></tr>
      </table>

      <p style="margin-top:24px;font-size:12px;color:#999;">
        Added to the Master Contact List in ActiveCampaign.
      </p>
    </div>
  `;
}

function buildWelcomeEmail(name: string): string {
  const firstName = name.trim().split(" ")[0];

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
      <h1 style="color:#fff;margin:0 0 16px;font-size:22px;">You are in, ${esc(firstName)}</h1>

      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 16px;">
        Thanks for signing up. From here you will get short emails on what
        actually makes a small business website bring in work. Real examples
        from jobs we have just finished, the fixes that moved the needle, and
        the things we would do differently.
      </p>

      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 16px;">
        Nothing to do now. The first one will land with the next send. If it
        ever stops being useful, every email has a one-click unsubscribe at the
        bottom and we will not chase you.
      </p>

      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 24px;">
        In the meantime, the free guides and the audit tools are all sat on the
        site waiting for you.
      </p>

      <div style="text-align:center;margin-top:28px;">
        <a href="https://awmedia.marketing/free-resources" style="display:inline-block;background:#F92672;color:#fff;font-weight:bold;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;">Browse the free resources</a>
      </div>

      <p style="margin-top:28px;font-size:12px;color:#999;">
        Alex, AW Media &middot; awmedia.marketing
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: SignupBody;
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

  if (!name) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please add a valid email address." },
      { status: 400 }
    );
  }

  // 1. Push to ActiveCampaign (best-effort, never throws).
  await syncToActiveCampaign({
    name,
    email,
    marketingOptIn: true,
    tagId: process.env.AC_NEWSLETTER_TAG_ID,
  });

  // 2. Welcome the subscriber, tell the team.
  try {
    await sendMail({
      to: email,
      subject: "You are on the AW Media list",
      html: buildWelcomeEmail(name),
    });
    await sendMail({
      subject: `New newsletter signup: ${name}`,
      html: buildTeamEmail(name, email),
      replyTo: email,
    });
  } catch (mailError) {
    // Don't fail the signup on a mail hiccup, they're already in AC.
    console.error("Newsletter signup email failed:", mailError);
  }

  return NextResponse.json({ success: true });
}
