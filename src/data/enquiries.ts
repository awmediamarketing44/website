// Enquiry forms. Each entry becomes a page at /enquiry/[slug] with the form
// embedded. Forms now live in our own CRM (crm.awmedia.marketing) — set
// `crmUrl` to embed that. Legacy forms still on Typeform fall back to
// `typeformId` until they're rebuilt in the CRM.

export interface Enquiry {
  slug: string;
  title: string;
  titleAccent: string;
  tag: string;
  description: string;
  // CRM-hosted form URL (preferred). When set, embedded as an iframe.
  crmUrl?: string;
  // Legacy Typeform live ID — used only when crmUrl is not set.
  typeformId?: string;
}

export const enquiries: Enquiry[] = [
  {
    slug: "website-design",
    title: "Website design",
    titleAccent: "enquiry.",
    tag: "Enquiry",
    description:
      "Tell us about your project and we'll come back to you with a tailored recommendation. Takes a couple of minutes.",
    crmUrl: "https://crm.awmedia.marketing/web-design",
  },
  {
    slug: "logo-design",
    title: "Logo & branding",
    titleAccent: "enquiry.",
    tag: "Enquiry",
    description:
      "Looking for a logo or full brand identity? Answer a few quick questions and we'll be in touch.",
    crmUrl: "https://crm.awmedia.marketing/branding",
  },
  {
    slug: "social-media",
    title: "Social media",
    titleAccent: "enquiry.",
    tag: "Enquiry",
    description:
      "Want help with social media graphics or content? Tell us what you're after and we'll be in touch.",
    crmUrl: "https://crm.awmedia.marketing/aw-lwaysontime",
  },
];

export function getEnquiryBySlug(slug: string): Enquiry | undefined {
  return enquiries.find((e) => e.slug === slug);
}
