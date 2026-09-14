import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { locations } from "@/data/locations";
import { landingPages } from "@/data/landing-pages";
import { comparisons } from "@/data/comparisons";
import { downloads } from "@/data/resources";

const siteUrl = "https://awmedia.marketing";

// Stable per-section revision dates.
//
// These must NOT be `new Date()`. A sitemap that stamps the current build time
// on all 372 URLs tells crawlers every page changed on every deploy, which
// carries no information, so Bing and Brave discount the field entirely.
// Brave's main passive re-crawl trigger is a recent lastmod in the sitemap it
// finds via robots.txt, so a build timestamp actively costs us re-crawls.
//
// Bump one of these only when that section's content actually changes.
// Blog posts use their own real publication date instead.
const REVISED = {
  core: "2026-09-08",
  services: "2026-08-03",
  industries: "2026-07-12",
  locations: "2026-06-21",
  work: "2026-08-10",
  landing: "2026-06-21",
  resources: "2026-08-09",
  comparisons: "2026-07-12",
} as const;

// Blog posts carry a human display date ("August 2026"), not a machine date.
// Passing that string straight to lastModified emits an invalid <lastmod>, so
// normalise to YYYY-MM-DD. Built from local getters, not toISOString(), because
// UTC conversion shifts a local-midnight date back a day under BST.
function isoDate(raw: string, fallback: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return fallback;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/work", priority: 0.9, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/locations", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/how-we-work", priority: 0.7, freq: "monthly" },
    { path: "/reviews", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/free-resources", priority: 0.8, freq: "monthly" },
    { path: "/newsletter", priority: 0.7, freq: "monthly" },
    { path: "/website-concept", priority: 0.8, freq: "monthly" },
    { path: "/free-audit", priority: 0.6, freq: "monthly" },
    { path: "/website-audit", priority: 0.6, freq: "monthly" },
    { path: "/social-audit", priority: 0.6, freq: "monthly" },
    { path: "/geo-audit", priority: 0.7, freq: "monthly" },
    { path: "/ai-score", priority: 0.7, freq: "monthly" },
    { path: "/ai-label-check", priority: 0.7, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/cookie-policy", priority: 0.2, freq: "yearly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: REVISED.core,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: REVISED.services,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryEntries: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${siteUrl}/industries/${i.slug}`,
    lastModified: REVISED.industries,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${siteUrl}/locations/${l.slug}`,
    lastModified: REVISED.locations,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: REVISED.work,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: isoDate(post.date, REVISED.core),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Hidden local SEO landing pages (top-level, not in nav). Included here so
  // Google discovers and indexes them for their target ranking terms.
  const landingEntries: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: REVISED.landing,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Free guide capture pages (/free-resources/<slug>). Indexable: each one
  // targets its own buyer-intent term and feeds the lead-magnet funnel.
  const resourceEntries: MetadataRoute.Sitemap = downloads.map((d) => ({
    url: `${siteUrl}/free-resources/${d.slug}`,
    lastModified: REVISED.resources,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Comparison / decision pages (AW vs agency, website cost, Wix vs pro).
  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: REVISED.comparisons,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...industryEntries,
    ...locationEntries,
    ...workEntries,
    ...blogEntries,
    ...landingEntries,
    ...resourceEntries,
    ...comparisonEntries,
  ];
}
