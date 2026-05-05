import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | AI & Bespoke Web Design from £695",
  description:
    "Two ways to build your website. Both bespoke. Neither templated. AI-accelerated from £695, or fully bespoke from £1,200. Landing pages, websites, and online stores.",
  openGraph: {
    title: "Pricing — AW Media & Marketing",
    description:
      "Two ways to build your website. AI from £695 or Bespoke from £1,200. Both fully custom. No templates.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
