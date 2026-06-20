import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work | AI-Accelerated & Bespoke",
  description:
    "Two ways to build your website. Both bespoke. Neither templated. AI-accelerated for speed, fully bespoke when the project demands strategy and depth.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "How We Work · AW Media & Marketing",
    description:
      "AI-accelerated by default. Bespoke when it counts. See how the two lanes compare.",
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
