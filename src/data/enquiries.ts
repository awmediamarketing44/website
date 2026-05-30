// Typeform enquiry forms. Each entry becomes a page at /enquiry/[slug] with the
// Typeform embedded. To add a new form, paste the data-tf-live ID from the
// Typeform embed snippet into a new entry — that's it.

export interface Enquiry {
  slug: string;
  title: string;
  titleAccent: string;
  tag: string;
  description: string;
  typeformId: string;
}

export const enquiries: Enquiry[] = [
  {
    slug: "website-design",
    title: "Website design",
    titleAccent: "enquiry.",
    tag: "Enquiry",
    description:
      "Tell us about your project and we'll come back to you with a tailored recommendation. Takes a couple of minutes.",
    typeformId: "01J1QV55CK4Y7KEVDK75P6ZTVH",
  },
  {
    slug: "logo-design",
    title: "Logo & branding",
    titleAccent: "enquiry.",
    tag: "Enquiry",
    description:
      "Looking for a logo or full brand identity? Answer a few quick questions and we'll be in touch.",
    typeformId: "01KSWR4VGP8KBWTRVDW4YWKFVT",
  },
];

export function getEnquiryBySlug(slug: string): Enquiry | undefined {
  return enquiries.find((e) => e.slug === slug);
}
