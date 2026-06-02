// Testimonials for /reviews. These are pulled from the real client case studies
// on the Work page (so they stay in sync as new projects are added) plus any
// hand-picked reviews added to `manual` below. Never invent reviews.
import { projects } from "./projects";

export interface Testimonial {
  name: string;
  business?: string;
  quote: string;
  rating?: number; // 1-5
  source?: string; // "Trustpilot" | "Google" | etc.
}

// Hand-picked extras (e.g. specific Trustpilot/Google reviews) — paste real ones
// here to feature them first. Leave empty to show only the case-study testimonials.
const manual: Testimonial[] = [];

// Real testimonials lifted from the project case studies.
const fromProjects: Testimonial[] = projects
  .filter((p) => p.testimonial && p.testimonial.quote)
  .map((p) => ({
    name: p.testimonial!.name,
    business: [p.testimonial!.role, p.title].filter(Boolean).join(", "),
    quote: p.testimonial!.quote,
    rating: 5,
  }));

export const testimonials: Testimonial[] = [...manual, ...fromProjects];
