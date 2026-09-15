// Shared schema.org / JSON-LD builders.
// Centralises the bits of structured data that several pages need so the markup
// stays consistent (and truthful) across the site. Render the output with a
// <script type="application/ld+json"> tag, matching the existing pages.
import { testimonials } from "@/data/reviews";
import { REVIEW_STATS } from "@/data/review-stats";
import { services } from "@/data/services";
import type { LocationData } from "@/data/locations";

export const SITE_URL = "https://awmedia.marketing";

// The Organization node id. Reference this from any Service/Offer schema rather
// than re-declaring the organisation inline, so every page describes ONE entity
// instead of a dozen loosely related ones. Answer engines resolve the graph by
// @id, and a business they can pin down is a business they can recommend.
export const ORG_ID = `${SITE_URL}/#organization`;

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

// FAQPage schema from a list of question/answer pairs. Reused across the
// homepage, service pages, comparison pages and any Q&A blog post so AI answer
// engines can surface our answers directly. Render with a
// <script type="application/ld+json"> tag, matching the existing pages.
export function faqPage(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// The services we sell, as a machine-readable catalogue hung off the
// Organization. Without this the offering only exists as prose, and an answer
// engine asked "what do they actually do" has to infer it from marketing copy.
// Built from the real services data so it can never drift from the site.
export function offerCatalog(): Record<string, unknown> {
  return {
    "@type": "OfferCatalog",
    name: "Design, build and support services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

// Per-service Service schema. The service pages previously carried only a
// breadcrumb and their FAQs, so the thing the page is actually selling was
// never named as a Service anywhere an answer engine could read it. Same shape
// as locationService below, tied back to the one organisation.
export function serviceSchema(s: {
  slug: string;
  title: string;
  serviceType?: string;
  headerDescription: string;
  metaDescription?: string;
  features: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    name: s.title,
    serviceType: s.serviceType || s.title,
    description: s.metaDescription || s.headerDescription,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} — what is included`,
      itemListElement: s.features.map((f) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: f },
      })),
    },
  };
}

// Per-location Service schema. Every location page previously served only the
// sitewide Organization block plus a breadcrumb, so twelve pages were telling
// answer engines the same single fact. This gives each one its own service
// node, tied back to the one organisation, with the town it actually covers.
export function locationService(loc: LocationData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/locations/${loc.slug}#service`,
    name: `Web design in ${loc.city}`,
    serviceType: "Web design and development",
    description: loc.blurb,
    url: `${SITE_URL}/locations/${loc.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      {
        "@type": "City",
        name: loc.city,
        containedInPlace: { "@type": "AdministrativeArea", name: loc.region },
      },
      ...loc.nearby.map((town) => ({ "@type": "City", name: town })),
    ],
  };
}

// AggregateRating is deliberately the Trustpilot figure alone: it is the one
// rating we can point a reader (or Google) at to check. The Google reviews are
// counted in visible copy but left out here because we do not publish a
// verified Google rating value.
export function aggregateRating(): Record<string, unknown> {
  return {
    "@type": "AggregateRating",
    ratingValue: REVIEW_STATS.trustpilot.rating,
    bestRating: "5",
    worstRating: "1",
    ratingCount: REVIEW_STATS.trustpilot.count,
    reviewCount: REVIEW_STATS.trustpilot.count,
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
