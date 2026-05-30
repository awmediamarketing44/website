// Hand-picked testimonials to feature on /reviews. Paste REAL reviews here
// (e.g. copied from Trustpilot/Google). Leave empty to show only the live
// Trustpilot widget. Never invent reviews.
export interface Testimonial {
  name: string;
  business?: string;
  quote: string;
  rating?: number; // 1-5
  source?: string; // "Trustpilot" | "Google" | etc.
}

export const testimonials: Testimonial[] = [
  // {
  //   name: "Josh Cowan",
  //   business: "JJ Transformations",
  //   quote: "…",
  //   rating: 5,
  //   source: "Trustpilot",
  // },
];
