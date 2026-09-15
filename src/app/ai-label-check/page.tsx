import type { Metadata } from "next";
import AiLabelCheckClient from "./Client";

export const metadata: Metadata = {
  title: "Free AI Label Checker | Will Your Post Get An AI Badge?",
  description:
    "Check whether Instagram, LinkedIn, TikTok or YouTube will stamp an AI label on your carousel, graphic or photo before you post it. Free, instant, and it tells you exactly what caused it.",
  alternates: { canonical: "/ai-label-check" },
  openGraph: {
    title: "Free AI Label Checker — Will Your Post Get An AI Badge?",
    description:
      "Drop in a carousel, a graphic or a photo and see which platforms will label it as AI, and exactly why. Real work gets flagged too.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Label Checker — Will Your Post Get An AI Badge?",
    description:
      "See which platforms will label your post as AI before you publish it, and why.",
  },
};

export default function Page() {
  return <AiLabelCheckClient />;
}
