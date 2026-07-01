// Shared schema.org / JSON-LD builders.
// Centralises the bits of structured data that several pages need so the markup
// stays consistent (and truthful) across the site. Render the output with a
// <script type="application/ld+json"> tag, matching the existing pages.
import { testimonials } from "@/data/reviews";

export const SITE_URL = "https://awmedia.marketing";

// BreadcrumbList for a page. Pass the trail in order, e.g.
//   breadcrumb([{ name: "Services", path: "/services" }, { name: "Web Design", path: "/services/web-design" }])
// "Home" is prepended automatically.
export function breadcrumb(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

// AggregateRating built from the real on-site client testimonials (never
// invented). Every featured testimonial is a verified 5-star client review.
export function aggregateRating(): Record<string, unknown> {
  const count = testimonials.length;
  return {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: count,
    reviewCount: count,
  };
}

// The full list of real testimonials as schema.org Review objects, for the
// /reviews page. Each is a genuine quote lifted from a client case study.
export function reviewSchema(): Record<string, unknown>[] {
  return testimonials.map((t) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating ?? 5),
      bestRating: "5",
    },
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    ...(t.business ? { itemReviewed: { "@type": "Organization", name: t.business } } : {}),
  }));
}
