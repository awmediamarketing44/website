import type { Metadata } from "next";
import GeoAuditClient from "./Client";

export const metadata: Metadata = {
  title: "Free GEO Audit | Is Your Business Visible to AI?",
  description:
    "Run a free GEO (Generative Engine Optimisation) audit. See how visible your website is to ChatGPT, Perplexity and Google's AI, and get the quick wins to be recommended, not skipped.",
  alternates: { canonical: "/geo-audit" },
  openGraph: {
    title: "Free GEO Audit — Is Your Business Visible to AI?",
    description:
      "When someone asks an AI for a recommendation, can it see you? Get your free GEO score and the gaps to fix.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free GEO Audit — Is Your Business Visible to AI?",
    description:
      "Get your free GEO score and find out if AI search can see your business.",
  },
};

export default function Page() {
  return <GeoAuditClient />;
}
