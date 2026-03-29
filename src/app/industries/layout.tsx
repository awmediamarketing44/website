import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Work With",
  description:
    "We build websites for fitness coaches, construction companies, dental practices, photographers, and aesthetics clinics. Industry-specific design that converts.",
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
