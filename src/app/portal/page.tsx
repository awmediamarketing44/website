import type { Metadata } from "next";
import PortalClient from "./Client";

export const metadata: Metadata = {
  title: "AI Portal | Content Tools for £29/month | AW Media",
  description:
    "Get the same AI content tools our clients use: carousel reviews, social audits, copy rewrites, content research, competitor analysis and Ask Alex. £29 a month, cancel anytime.",
  alternates: { canonical: "/portal" },
};

export default function Page() {
  return <PortalClient />;
}
