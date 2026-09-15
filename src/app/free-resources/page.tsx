import type { Metadata } from "next";
import FreeResourcesClient from "./Client";

export const metadata: Metadata = {
  title: "Free Resources | Guides, Checklists & Audits",
  description:
    "Free guides and checklists for small business owners, plus four free audit tools. Website checklist, what a website should cost, brand basics, local SEO and AI visibility.",
  alternates: { canonical: "/free-resources" },
  openGraph: {
    title: "Free Resources from AW Media",
    description:
      "Practical guides, checklists and free audit tools to help your website bring in more work. No jargon, no obligation.",
    type: "website",
  },
};

export default function Page() {
  return <FreeResourcesClient />;
}
