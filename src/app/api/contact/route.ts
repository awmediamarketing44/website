import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      "web-design": "Web Design & Development",
      branding: "Logo Design & Branding",
      social: "Social Media Graphics",
      seo: "SEO & Monthly Support",
      shopify: "Shopify & E-Commerce",
      landing: "Landing Page",
      "ai-design": "AI-Powered Web Design",
      other: "Something else",
    };

    await resend.emails.send({
      from: "AW Media Website <noreply@awmedia.marketing>",
      to: ["alex@awmedia.marketing"],
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` - ${serviceLabels[service] || service}` : ""}`,
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
            ${service ? `<tr>
              <td style="padding: 8px 0; color: #666;">Service</td>
              <td style="padding: 8px 0;">${serviceLabels[service] || service}</td>
            </tr>` : ""}
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
