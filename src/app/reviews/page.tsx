import type { Metadata } from "next";
import ReviewsClient from "./Client";
import { SITE_URL, aggregateRating, reviewSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Reviews | What Our Clients Say",
  description:
    "Don't take our word for it. See what AW Media clients say across Trustpilot: web design, branding and social for businesses across the UK.",
  alternates: { canonical: "/reviews" },
};

// Reviews live on the Organization itself, with the real client testimonials as
// schema.org Review objects and an aggregate rating built from them.
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "AW Media & Marketing",
  url: SITE_URL,
  aggregateRating: aggregateRating(),
  review: reviewSchema(),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <ReviewsClient />
    </>
  );
}
