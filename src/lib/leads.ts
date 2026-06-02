import nodemailer from "nodemailer";

// Shared SMTP sender — same 20i mailbox as the contact form. The audit tools
// use this so they email via SMTP (nodemailer) instead of a third-party
// provider. Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO.
export async function sendMail(opts: {
  subject: string;
  html: string;
  to?: string;
  replyTo?: string;
  text?: string;
}) {
  const port = Number(process.env.SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@awmedia.marketing";
  const to = opts.to || process.env.CONTACT_TO || "alex@awmedia.marketing";
  return transporter.sendMail({
    from: `AW Media <${from}>`,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
}

// Sync a lead into ActiveCampaign — same setup as the contact form: upsert the
// contact, add to the Master Contact List, and tag it. Best-effort: never
// throws, so a CRM hiccup can never block an audit or form submission.
// Env: AC_API_URL, AC_API_KEY, AC_LIST_ID, AC_TAG_ID, AC_MARKETING_TAG_ID.
export async function syncToActiveCampaign(opts: {
  name: string;
  email: string;
  marketingOptIn?: boolean;
  tagId?: string | number; // overrides AC_TAG_ID (e.g. an audit-specific tag)
}) {
  const base = process.env.AC_API_URL;
  const token = process.env.AC_API_KEY;
  if (!base || !token || !opts.email) return;

  try {
    const headers = { "Api-Token": token, "Content-Type": "application/json" };
    const [firstName, ...rest] = (opts.name || "").trim().split(" ");
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
            contactList: { list: Number(process.env.AC_LIST_ID), contact: Number(contactId), status: 1 },
          }),
        })
      );
    }
    const tag = opts.tagId ?? process.env.AC_TAG_ID;
    if (tag) {
      tasks.push(
        fetch(`${base}/api/3/contactTags`, {
          method: "POST",
          headers,
          body: JSON.stringify({ contactTag: { contact: Number(contactId), tag: Number(tag) } }),
        })
      );
    }
    if (opts.marketingOptIn && process.env.AC_MARKETING_TAG_ID) {
      tasks.push(
        fetch(`${base}/api/3/contactTags`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contactTag: { contact: Number(contactId), tag: Number(process.env.AC_MARKETING_TAG_ID) },
          }),
        })
      );
    }
    await Promise.allSettled(tasks);
  } catch {
    /* best-effort — never block on a CRM error */
  }
}
