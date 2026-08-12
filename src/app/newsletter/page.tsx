import type { Metadata } from "next";
import NewsletterClient from "./Client";

export const metadata: Metadata = {
  title: "Newsletter | Web Design Tips for Business Owners",
  description:
    "Join the AW Media newsletter. Short, practical emails on what actually makes a small business website bring in work. Written for owners, not marketers. Free, unsubscribe in one click.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Join the AW Media Newsletter",
    description:
      "Short, practical emails on what actually makes a small business website bring in work. Real jobs, real fixes, no jargon.",
    type: "website",
  },
};

export default function Page() {
  return <NewsletterClient />;
}
