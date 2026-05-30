import type { Metadata } from "next";
import EnquiryHubClient from "./HubClient";

export const metadata: Metadata = {
  title: "Quick Enquiry | AW Media",
  description:
    "Tell us what you need and we'll come back with a tailored recommendation. Website design, logo & branding, or social media.",
  alternates: { canonical: "/enquiry" },
};

export default function Page() {
  return <EnquiryHubClient />;
}
