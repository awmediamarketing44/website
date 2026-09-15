import type { Metadata } from "next";
import WebsiteAuditClient from "../website-audit/Client";

// Paid-traffic twin of /website-audit. Same tool, same gate, same API — but with
// the site nav and footer stripped, because on cold ad traffic every nav link is
// a way off the page before they have typed anything in.
//
// noindex + canonical back to /website-audit ON PURPOSE: these two pages are
// near-identical, and letting both into the index would have them competing for
// the same terms and splitting the organic page's authority. This one exists for
// ads only. It is deliberately NOT in sitemap.ts for the same reason.
export const metadata: Metadata = {
  title: "Free Website Audit | Instant Results",
  description:
    "Put your address in and find out what your website is costing you. Instant scores on speed, mobile, SEO and more, with plain-English fixes.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/website-audit" },
  openGraph: {
    title: "Your website is telling people something.",
    description:
      "Thirty seconds, and you get the scores, the problems and what to actually do about them. Free.",
    type: "website",
  },
};

export default function Page() {
  return <WebsiteAuditClient adMode />;
}
