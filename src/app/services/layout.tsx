import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Web Design, Branding & SEO",
  description:
    "Web design, branding, social media graphics, SEO, Shopify stores, and landing pages. All under one roof. Bespoke or AI-accelerated.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | AW Media & Marketing",
    description:
      "Everything your business needs online. Web design, branding, social media, SEO. No more juggling multiple agencies.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
