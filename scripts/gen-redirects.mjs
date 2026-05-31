// Generate the 301 redirect map for next.config (runs as a Node app on the
// 20i Cloud Server). Writes redirects.json at the repo root.
// Run: node scripts/gen-redirects.mjs
import fs from "fs";

const wp = JSON.parse(fs.readFileSync("scripts/wp-redirects.json", "utf8"));

// Reserved top-level routes — never shadow a real page with a blog redirect.
const reserved = new Set([
  "about", "contact", "services", "work", "blog", "locations", "reviews",
  "free-audit", "enquiry", "how-we-work", "industries", "",
]);

const CITIES = [
  "sheffield", "rotherham", "barnsley", "chesterfield", "leeds", "manchester",
  "liverpool", "birmingham", "newcastle", "glasgow", "livingston", "torquay", "devon",
];

const seen = new Set();
const redirects = [];
const add = (source, destination) => {
  if (seen.has(source)) return;
  seen.add(source);
  redirects.push({ source, destination, statusCode: 301 });
};

// 1) Migrated blog posts: old root URL -> /blog/<slug>
for (const r of wp) {
  const slug = r.source.replace(/^\//, "").replace(/\/$/, "");
  if (reserved.has(slug)) continue; // don't shadow a real route
  add(`/${slug}`, `/blog/${slug}`);
}

// 2) Old freelance location pages -> new agency location pages.
//    Old brand used "freelance web designer/design [city]" URL patterns.
for (const city of CITIES) {
  const dest = `/locations/web-design-${city}`;
  add(`/freelance-web-designer-${city}`, dest);
  add(`/freelance-web-design-${city}`, dest);
  add(`/web-design-${city}`, dest);
}

// 3) Obvious old service-page consolidations (extend once GSC export confirms).
const serviceMap = {
  "/web-design": "/services/web-design",
  "/logo-design": "/services/branding",
  "/branding": "/services/branding",
  "/seo": "/services/seo-support",
  "/social-media": "/services/social-media",
  "/ai-web-design": "/services/ai-design",
};
for (const [s, d] of Object.entries(serviceMap)) add(s, d);

fs.writeFileSync("redirects.json", JSON.stringify(redirects, null, 2));
console.log(`Wrote redirects.json — ${redirects.length} redirects`);
console.log(`  blog: ${wp.length} · cities: ${CITIES.length * 3} · services: ${Object.keys(serviceMap).length}`);
