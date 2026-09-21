import type { Metadata } from "next";
import AiScoreClient from "./Client";

export const metadata: Metadata = {
  title: "Free AI Opportunity Score | 2-Minute Test",
  description:
    "A free 2-minute test that scores your business and shows exactly where AI could answer enquiries, win back your hours and bring in more work.",
  alternates: { canonical: "/ai-score" },
  openGraph: {
    title: "What Could AI Actually Do For Your Business?",
    description:
      "A free 2-minute test that scores your business and shows the three places AI would pay off first. No jargon, no obligation.",
    type: "website",
  },
};

export default function Page() {
  return <AiScoreClient />;
}
