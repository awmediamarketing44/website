import type { Metadata } from "next";
import ReviewsClient from "./Client";

export const metadata: Metadata = {
  title: "Reviews | What Our Clients Say | AW Media",
  description:
    "Don't take our word for it. See what AW Media clients say across Trustpilot: web design, branding and social for businesses across the UK.",
  alternates: { canonical: "/reviews" },
};

export default function Page() {
  return <ReviewsClient />;
}
