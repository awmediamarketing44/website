// Generate placeholder 1600x900 JPG covers for every blog post.
// Used until real Gemini 3 Pro Image covers are generated.
//
// Abstract editorial gradient backgrounds, no burned-in titles
// (titles already render in the page H1, duplicating them in the cover
// makes the layout feel broken). Just a category mark + AW Media footer.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "data", "blog-posts");
const OUT_DIR = path.join(ROOT, "public", "images", "blog");

// Six gradient variants for visual variety, all anchored on AW Media pink #F92672
const VARIANTS = [
  { base: "#0A0A0A", mid: "#1F0814", accent: "#F92672", accent2: "#7B1F3C" },
  { base: "#080612", mid: "#160820", accent: "#F92672", accent2: "#5B2880" },
  { base: "#0A0A0A", mid: "#0D1622", accent: "#F92672", accent2: "#1E3A5F" },
  { base: "#0A0A0A", mid: "#1A0F0F", accent: "#F92672", accent2: "#8B2A3F" },
  { base: "#0A0A0A", mid: "#0F1A14", accent: "#F92672", accent2: "#2D6650" },
  { base: "#100612", mid: "#1F0A1A", accent: "#F92672", accent2: "#6A1F50" },
];

function svgFor(post, variantIndex) {
  const v = VARIANTS[variantIndex % VARIANTS.length];
  const tag = escapeXml(post.tag.toUpperCase());

  // Deterministic shape positions per post (so same slug always gets same image)
  const seed = hash(post.slug);
  const orbX1 = 1100 + (seed % 240);
  const orbY1 = 180 + ((seed >> 4) % 200);
  const orbR1 = 320 + ((seed >> 8) % 120);
  const orbX2 = 240 + ((seed >> 12) % 180);
  const orbY2 = 620 + ((seed >> 16) % 140);
  const orbR2 = 260 + ((seed >> 20) % 100);

  // Curved line accents
  const lineY = 480 + ((seed >> 4) % 80);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${v.base}"/>
      <stop offset="100%" stop-color="${v.mid}"/>
    </linearGradient>
    <radialGradient id="orb1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${v.accent}" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="${v.accent}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${v.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="${v.accent2}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${v.accent2}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed % 100}"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0"/>
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>

  <!-- Soft glow orbs (deterministic per slug) -->
  <circle cx="${orbX1}" cy="${orbY1}" r="${orbR1}" fill="url(#orb1)"/>
  <circle cx="${orbX2}" cy="${orbY2}" r="${orbR2}" fill="url(#orb2)"/>

  <!-- Thin accent rule -->
  <line x1="80" y1="${lineY}" x2="${280 + ((seed >> 24) % 120)}" y2="${lineY}" stroke="${v.accent}" stroke-width="2" opacity="0.5"/>
  <line x1="80" y1="${lineY + 18}" x2="${180 + ((seed >> 8) % 80)}" y2="${lineY + 18}" stroke="${v.accent}" stroke-width="2" opacity="0.25"/>

  <!-- Category tag (top left) -->
  <rect x="80" y="80" width="${tag.length * 18 + 40}" height="44" rx="22" fill="${v.accent}" opacity="0.12"/>
  <rect x="80" y="80" width="${tag.length * 18 + 40}" height="44" rx="22" fill="none" stroke="${v.accent}" stroke-width="1.5" opacity="0.6"/>
  <text x="${100 + (tag.length * 18 + 40 - tag.length * 14) / 2}" y="109" font-family="Inter, system-ui, sans-serif" font-weight="600" font-size="20" fill="${v.accent}" letter-spacing="4">${tag}</text>

  <!-- AW Media wordmark bottom right -->
  <text x="1520" y="820" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#ffffff" opacity="0.45" letter-spacing="1">
    <tspan font-weight="800">aw</tspan><tspan font-weight="400" dx="6">media</tspan>
  </text>

  <!-- Subtle film grain overlay -->
  <rect width="1600" height="900" fill="white" filter="url(#grain)" opacity="0.6"/>
</svg>`.trim();
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h >>> 0;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function loadPosts() {
  const files = await fs.readdir(POSTS_DIR);
  const posts = [];
  for (const f of files) {
    if (!f.endsWith(".ts")) continue;
    const src = await fs.readFile(path.join(POSTS_DIR, f), "utf8");
    const slugMatch = src.match(/slug:\s*"([^"]+)"/);
    const tagMatch = src.match(/tag:\s*"([^"]+)"/);
    if (slugMatch && tagMatch) {
      posts.push({ slug: slugMatch[1], tag: tagMatch[1] });
    }
  }
  return posts;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const posts = await loadPosts();
  console.log(`generating ${posts.length} placeholder covers`);

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const svg = svgFor(post, i);
    const outPath = path.join(OUT_DIR, `${post.slug}.jpg`);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
    console.log(`  ${post.slug}.jpg`);
  }
  console.log("done");
}

await main();
