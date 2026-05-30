import type { Metadata } from "next";
import FreeAuditClient from "./Client";

export const metadata: Metadata = {
  title: "Free Audit | Website & Social Media | AW Media",
  description:
    "Get a free, instant audit of your website or social media. See exactly what's working, what's not, and what to fix — no obligation.",
  alternates: { canonical: "/free-audit" },
};

export default function Page() {
  return <FreeAuditClient />;
}
