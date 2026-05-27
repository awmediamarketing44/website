// Scrape recent IG profile posts for social-feature portfolio projects.
// Different from scrape-ig-portfolio.mjs which targets specific post URLs.
// Pulls top N posts from each profile, downloads cover (slide 1) for each.
// Usage: node scripts/scrape-ig-profiles.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

async function loadEnv() {
  try {
    const content = await fs.readFile(path.join(projectRoot, '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      process.env[trimmed.slice(0, eq).trim()] ||= trimmed.slice(eq + 1).trim();
    }
  } catch {/* ignore */}
}
await loadEnv();

const APIFY_TOKEN = process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error('Missing APIFY_TOKEN');
  process.exit(1);
}

// slug -> IG profile URL
const profiles = {
  'fox-socials': 'https://www.instagram.com/michael_trainedbyfox/',
  'icm-socials': 'https://www.instagram.com/theicmeducation/',
  'square-one-socials': 'https://www.instagram.com/squareonegym/',
  'myles-socials': 'https://www.instagram.com/mindarchitectmyles/',
  'prepdad-socials': 'https://www.instagram.com/theprepdad/',
  'mrf-socials': 'https://www.instagram.com/marsharosefit/',
  'strengthinus-socials': 'https://www.instagram.com/strengthinusapp/',
};

// Pull a wider window so we have room to filter out Reels/Videos and only keep carousels (Sidecar type).
const FETCH_PER_PROFILE = 30;
const KEEP_PER_PROFILE = 9;
const runUrl = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;

const input = {
  directUrls: Object.values(profiles),
  resultsType: 'posts',
  resultsLimit: FETCH_PER_PROFILE,
  addParentData: false,
};

console.log(`> Scraping ${Object.keys(profiles).length} profile(s), fetching ${FETCH_PER_PROFILE} per profile, keeping top ${KEEP_PER_PROFILE} carousels...`);
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
console.log(`  Got ${items.length} item(s) back\n`);

// Group items by owner username so we know which profile they belong to
const usernameToSlug = {};
for (const [slug, url] of Object.entries(profiles)) {
  const m = url.match(/instagram\.com\/([^/]+)/);
  if (m) usernameToSlug[m[1].toLowerCase()] = slug;
}

const byProfile = {};
for (const item of items) {
  const owner = (item.ownerUsername || item.ownerFullName || '').toLowerCase();
  const slug = usernameToSlug[owner];
  if (!slug) continue;
  // Carousels only — skip Reels (Video) and single Image posts to keep the showcase visual-graphics-only
  if (item.type !== 'Sidecar') continue;
  if (!byProfile[slug]) byProfile[slug] = [];
  if (byProfile[slug].length < KEEP_PER_PROFILE) byProfile[slug].push(item);
}

for (const [slug, posts] of Object.entries(byProfile)) {
  const outDir = path.join(projectRoot, 'public', 'images', 'projects', slug, 'graphics');
  // Clear any prior images (might include reels from earlier scrape)
  try {
    const existing = await fs.readdir(outDir);
    for (const f of existing) {
      if (f.startsWith('post-') && f.endsWith('.jpg')) {
        await fs.unlink(path.join(outDir, f));
      }
    }
  } catch {/* no prior dir, fine */}
  await fs.mkdir(outDir, { recursive: true });
  console.log(`${slug}: ${posts.length} carousel(s)`);
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i];
    const coverUrl = item.displayUrl
      || (item.images && item.images[0])
      || (item.childPosts && item.childPosts[0] && item.childPosts[0].displayUrl);
    if (!coverUrl) {
      console.log(`  post-${i + 1}: no cover`);
      continue;
    }
    try {
      const imgRes = await fetch(coverUrl);
      if (!imgRes.ok) {
        console.log(`  post-${i + 1}: fetch ${imgRes.status}`);
        continue;
      }
      const buf = Buffer.from(await imgRes.arrayBuffer());
      const name = `post-${String(i + 1).padStart(2, '0')}.jpg`;
      await fs.writeFile(path.join(outDir, name), buf);
      console.log(`  ${name}`);
    } catch (err) {
      console.log(`  post-${i + 1} err: ${err.message}`);
    }
  }
  await fs.writeFile(path.join(outDir, '_apify-raw.json'), JSON.stringify(posts, null, 2));
}

console.log('\nDone.');
