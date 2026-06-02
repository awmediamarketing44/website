import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

// Push the enquiry into ActiveCampaign (Master Contact List + "new-website" tag).
// Fully env-driven so no keys/IDs live in the repo. Best-effort: never throws,
// so an AC issue can't block the enquiry email. (At static launch this same
// logic is mirrored in the 20i PHP handler.)
//   AC_API_URL            e.g. https://awmedia46905.api-us1.com
//   AC_API_KEY            ActiveCampaign API key (server-side only)
//   AC_LIST_ID            numeric ID of "Master Contact List"
//   AC_TAG_ID             numeric ID of the "new-website" tag
//   AC_MARKETING_TAG_ID   numeric ID of the marketing opt-in tag (optional)
async function syncToActiveCampaign(opts: {
  name: string;
  email: string;
  marketingOptIn?: boolean;
}) {
  const base = process.env.AC_API_URL;
  const token = process.env.AC_API_KEY;
  if (!base || !token) return; // not configured — skip quietly

  const headers = { "Api-Token": token, "Content-Type": "application/json" };
  const [firstName, ...rest] = opts.name.trim().split(" ");
  const lastName = rest.join(" ");

  const syncRes = await fetch(`${base}/api/3/contact/sync`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contact: { email: opts.email, firstName, lastName } }),
  });
  const data = await syncRes.json();
  const contactId = data?.contact?.id;
  if (!contactId) return;

  const tasks: Promise<unknown>[] = [];
  if (process.env.AC_LIST_ID) {
    tasks.push(
      fetch(`${base}/api/3/contactLists`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contactList: {
            list: Number(process.env.AC_LIST_ID),
            contact: Number(contactId),
            status: 1,
          },
        }),
      })
    );
  }
  if (process.env.AC_TAG_ID) {
    tasks.push(
      fetch(`${base}/api/3/contactTags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contactTag: { contact: Number(contactId), tag: Number(process.env.AC_TAG_ID) },
        }),
      })
    );
  }
  if (opts.marketingOptIn && process.env.AC_MARKETING_TAG_ID) {
    tasks.push(
      fetch(`${base}/api/3/contactTags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contactTag: {
            contact: Number(contactId),
            tag: Number(process.env.AC_MARKETING_TAG_ID),
          },
        }),
      })
    );
  }
  await Promise.allSettled(tasks);
}

export async function POST(request: Request) {
  try {
    const { name, email, lane, service, message, marketingOptIn, company } =
      await request.json();

    // Honeypot: real users never fill "company" (it's visually hidden).
    // If it's populated, it's a bot — pretend success, send nothing.
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      "landing-page": "Landing Page",
      website: "Website",
      "online-store": "Online Store",
      "web-design": "Web Design & Development",
      branding: "Logo Design & Branding",
      social: "Social Media Graphics",
      seo: "SEO & Monthly Support",
      shopify: "Shopify & E-Commerce",
      landing: "Landing Page",
      "ai-design": "AI-Powered Web Design",
      other: "Something else",
    };

    const laneLabel =
      lane === "ai" ? "AI" : lane === "bespoke" ? "Bespoke" : "";
    const serviceLabel = service ? serviceLabels[service] || service : "";
    const subjectTail = [laneLabel, serviceLabel].filter(Boolean).join(" ");

    // SMTP transport (20i mailbox). All creds come from env — never the repo.
    //   SMTP_HOST  e.g. smtp.20i hostname / mail.awmedia.marketing
    //   SMTP_PORT  465 (SSL) or 587 (STARTTLS)
    //   SMTP_USER  full mailbox address, e.g. alex@awmedia.marketing
    //   SMTP_PASS  mailbox password
    //   SMTP_FROM  optional from address (defaults to SMTP_USER)
    //   CONTACT_TO optional recipient (defaults to alex@awmedia.marketing)
    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@awmedia.marketing";
    const toAddress = process.env.CONTACT_TO || "alex@awmedia.marketing";

    await transporter.sendMail({
      from: `AW Media Website <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `New enquiry from ${name}${subjectTail ? ` - ${subjectTail}` : ""}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
          <h2 style="margin-bottom: 24px;">New website enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${laneLabel ? `<tr>
              <td style="padding: 8px 0; color: #666;">Lane</td>
              <td style="padding: 8px 0; font-weight: 600;">${laneLabel}</td>
            </tr>` : ""}
            ${serviceLabel ? `<tr>
              <td style="padding: 8px 0; color: #666;">Service</td>
              <td style="padding: 8px 0;">${serviceLabel}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #666;">Marketing opt-in</td>
              <td style="padding: 8px 0; font-weight: 600;">${marketingOptIn ? "Yes ✅" : "No"}</td>
            </tr>
          </table>
          ${message ? `
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>` : ""}
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from awmedia.marketing contact form
          </p>
        </div>
      `,
    });

    // Push to ActiveCampaign (best-effort — never blocks the enquiry).
    try {
      await syncToActiveCampaign({ name, email, marketingOptIn });
    } catch (acError) {
      console.error("ActiveCampaign sync failed:", acError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
