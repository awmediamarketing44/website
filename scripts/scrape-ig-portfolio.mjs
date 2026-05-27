// Scrape Instagram carousel posts for a portfolio project via Apify.
// Usage: node scripts/scrape-ig-portfolio.mjs <slug> <url1> [url2] [url3] ...
// Outputs to /public/images/projects/<slug>/graphics/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Load .env.local manually (Next.js loads it for app code, not for node scripts)
async function loadEnv() {
  try {
    const envPath = path.join(projectRoot, '.env.local');
    const content = await fs.readFile(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* ignore */
  }
}
await loadEnv();

const APIFY_TOKEN = process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error('Missing APIFY_TOKEN in .env.local');
  process.exit(1);
}

const args = process.argv.slice(2);
const slug = args[0];
const urls = args.slice(1);

if (!slug || urls.length === 0) {
  console.error('Usage: node scripts/scrape-ig-portfolio.mjs <slug> <url1> [url2] ...');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'public', 'images', 'projects', slug, 'graphics');
await fs.mkdir(outDir, { recursive: true });

console.log(`> Scraping ${urls.length} IG post(s) for ${slug}`);

// Apify "Instagram Scraper" (apify/instagram-scraper) - accepts directUrls for posts/carousels
// Docs: https://apify.com/apify/instagram-scraper
const runUrl = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;

const input = {
  directUrls: urls,
  resultsType: 'posts',
  resultsLimit: 1,
  addParentData: false,
};

console.log('  POSTing to Apify...');
const res = await fetch(runUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(input),
});

if (!res.ok) {
  console.error(`Apify error ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const items = await res.json();
console.log(`  Got ${items.length} item(s) back`);

let downloaded = 0;
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const postSlug = `post-${i + 1}`;

  // Carousel images live in `images` array (or sidecar nodes), single posts use `displayUrl`
  const imageUrls = [];
  if (Array.isArray(item.images) && item.images.length) {
    imageUrls.push(...item.images);
  } else if (Array.isArray(item.childPosts) && item.childPosts.length) {
    for (const child of item.childPosts) {
      if (child.displayUrl) imageUrls.push(child.displayUrl);
    }
  } else if (item.displayUrl) {
    imageUrls.push(item.displayUrl);
  }

  console.log(`  ${postSlug}: ${imageUrls.length} slide(s)`);

  for (let s = 0; s < imageUrls.length; s++) {
    const imgUrl = imageUrls[s];
    try {
      const imgRes = await fetch(imgUrl);
      if (!imgRes.ok) {
        console.warn(`    slide ${s + 1} fetch failed: ${imgRes.status}`);
        continue;
      }
      const buf = Buffer.from(await imgRes.arrayBuffer());
      const filename = `${postSlug}-slide-${String(s + 1).padStart(2, '0')}.jpg`;
      await fs.writeFile(path.join(outDir, filename), buf);
      console.log(`    ${filename}`);
      downloaded++;
    } catch (err) {
      console.warn(`    slide ${s + 1} error: ${err.message}`);
    }
  }
}

// Dump raw response for debugging
await fs.writeFile(path.join(outDir, '_apify-raw.json'), JSON.stringify(items, null, 2));

console.log(`Done. Downloaded ${downloaded} image(s) to ${outDir}`);
