import type { Metadata } from "next";
import WebsiteAuditClient from "./Client";

export const metadata: Metadata = {
  title: "Free Website Audit | Instant Results",
  description:
    "Run a free, instant website audit. Get scored on performance, mobile experience, SEO, accessibility and best practices, with plain-English recommendations for your business.",
  alternates: { canonical: "/website-audit" },
  openGraph: {
    title: "Free Instant Website Audit",
    description:
      "Find out what's stopping your website from converting. Get instant scores and actionable recommendations.",
    type: "website",
  },
};

export default function Page() {
  return <WebsiteAuditClient />;
}
