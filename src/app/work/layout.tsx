import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | AW Media & Marketing",
  description:
    "Websites, brands, landing pages, AI builds, and social systems delivered for clients across the UK and beyond. AI-accelerated when speed matters, fully bespoke when craft does.",
  openGraph: {
    title: "Our Work | AW Media & Marketing",
    description:
      "A decade of bespoke design and real results. See the work.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
