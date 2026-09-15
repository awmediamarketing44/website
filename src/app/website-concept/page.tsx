import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Free Website Concept",
  description:
    "We will design you a free website concept. Not a mockup, a real page you can open on your phone, with the project laid out and the exact price. Takes two minutes.",
  alternates: { canonical: "/website-concept" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ever wondered what your website could actually look like?",
    description:
      "A free website concept, designed for your business. A real working page with the exact price alongside it. No card, no obligation.",
    type: "website",
  },
};

export default function Page() {
  return <Client />;
}
