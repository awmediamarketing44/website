import type { Metadata } from "next";
import AiScoreClient from "./Client";

export const metadata: Metadata = {
  title: "Free AI Opportunity Score | 2-Minute Business Test",
  description:
    "Take the free 2-minute AI Opportunity Score test. Find out exactly where AI could answer your enquiries, win back your hours and grow your business, with a personalised breakdown.",
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
