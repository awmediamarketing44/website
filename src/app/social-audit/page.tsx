import type { Metadata } from "next";
import SocialAuditClient from "./Client";

export const metadata: Metadata = {
  title: "Free Social Media Audit | Scan Your Profiles",
  description:
    "We scan your real social profiles and score you across 5 dimensions with real data, not guesswork. Free, takes about 60 seconds.",
  alternates: { canonical: "/social-audit" },
  openGraph: {
    title: "Free Social Media Audit, Your Profiles, Professionally Reviewed",
    description:
      "We scan your real social profiles and score them across profile, content, consistency, engagement and growth. Get your quick wins instantly.",
    type: "website",
  },
};

export default function Page() {
  return <SocialAuditClient />;
}
