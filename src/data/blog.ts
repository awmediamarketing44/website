import type { BlogPost } from "./blog-types";

import webDesignForFitnessCoaches from "./blog-posts/web-design-for-fitness-coaches";
import webDesignForDentalPractices from "./blog-posts/web-design-for-dental-practices";
import brandingForConstructionFirms from "./blog-posts/branding-for-construction-firms";
import brandingForAestheticsClinics from "./blog-posts/branding-for-aesthetics-clinics";
import seoForPersonalTrainers from "./blog-posts/seo-for-personal-trainers";
import seoForPhotographers from "./blog-posts/seo-for-photographers";
import aiDesignForCoaches from "./blog-posts/ai-design-for-coaches";
import aiDesignForSmallBusinesses from "./blog-posts/ai-design-for-small-businesses";
import socialMediaForAestheticsClinics from "./blog-posts/social-media-for-aesthetics-clinics";
import socialMediaForConstruction from "./blog-posts/social-media-for-construction";
import landingPagesForPhotographers from "./blog-posts/landing-pages-for-photographers";
import ecommerceForPodArtists from "./blog-posts/ecommerce-for-print-on-demand-artists";
import aiBuiltScam from "./blog-posts/ai-built-in-30-seconds-is-a-scam";
import what695Buys from "./blog-posts/what-695-buys-in-web-design";
import aiAcceleratedVsBespoke from "./blog-posts/ai-accelerated-vs-bespoke";
import bespokeVsTemplate from "./blog-posts/bespoke-vs-template-when-custom-matters";
import speedTax from "./blog-posts/speed-tax-slow-website-costs";
import agencyWebsitesWorse from "./blog-posts/agency-websites-worse-than-clients";
import realReasonNotConverting from "./blog-posts/real-reason-website-isnt-converting";
import sevenDayBuild from "./blog-posts/website-in-7-days-without-cutting-corners";
import importedWpPosts from "./blog-posts/_imported-wp";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function dateSortKey(dateStr: string): number {
  const [month, year] = dateStr.split(" ");
  return Number(year) * 12 + MONTHS.indexOf(month);
}

const ALL: BlogPost[] = [
  aiBuiltScam,
  what695Buys,
  webDesignForFitnessCoaches,
  webDesignForDentalPractices,
  brandingForConstructionFirms,
  brandingForAestheticsClinics,
  seoForPersonalTrainers,
  seoForPhotographers,
  aiDesignForCoaches,
  aiDesignForSmallBusinesses,
  socialMediaForAestheticsClinics,
  socialMediaForConstruction,
  landingPagesForPhotographers,
  ecommerceForPodArtists,
  aiAcceleratedVsBespoke,
  bespokeVsTemplate,
  speedTax,
  agencyWebsitesWorse,
  realReasonNotConverting,
  sevenDayBuild,
  ...importedWpPosts,
];

export const blogPosts: BlogPost[] = ALL.slice().sort(
  (a, b) => dateSortKey(b.date) - dateSortKey(a.date)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getNonFeaturedPosts(): BlogPost[] {
  const featured = getFeaturedPost();
  return blogPosts.filter((p) => p.slug !== featured.slug);
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameTag = blogPosts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = blogPosts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, limit);
}
