import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Websites, Branding & Results",
  description:
    "Websites, brands, landing pages and social systems for clients across the UK. AI-accelerated when speed matters, fully bespoke when craft does.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | AW Media & Marketing",
    description:
      "A decade of bespoke design and real results. See the work.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
