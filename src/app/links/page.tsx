import type { Metadata } from "next";
import LinksClient from "./LinksClient";

export const metadata: Metadata = {
  title: "AW Media & Marketing | Quick Links",
  description:
    "Book a free call, get a free website or social audit, see our work, or send an enquiry — all in one place.",
  alternates: { canonical: "/links" },
};

export default function LinksPage() {
  return <LinksClient />;
}
