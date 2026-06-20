import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Work With",
  description:
    "Websites for fitness coaches, construction, dental, photographers, aesthetics and automotive businesses. Industry-specific design that converts.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
