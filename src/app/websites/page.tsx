import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Websites, and the price up front",
  description:
    "Custom built websites for businesses that need one doing properly. Six live client sites you can go and look at, and every price on the page. Landing pages from £695, websites from £1,495.",
  alternates: { canonical: "/websites" },
  // Ads only. This page carries the full price list and would otherwise compete
  // with /services and the location pages in search, so it stays out of the
  // index. Deliberately NOT added to sitemap.ts, and deliberately NOT added to
  // robots.txt either: a Disallow would stop crawlers reading this noindex, and
  // Google can still list a URL it was never allowed to look at. Noindex only
  // works if the crawler is allowed in to see it.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "A proper website, and the price up front.",
    description:
      "Designed round what you actually do, live in weeks rather than months. Every price is on the page, so you can see what it costs without sitting through a call first.",
    type: "website",
  },
};

export default function Page() {
  return <Client />;
}
