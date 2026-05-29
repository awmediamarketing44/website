// Generate AI cover images for all blog posts via Gemini 3 Pro Image.
//
// Usage:
//   $env:GEMINI_API_KEY="..."
//   node scripts/generate-blog-covers.mjs            # generate all missing
//   node scripts/generate-blog-covers.mjs --force    # regen all
//   node scripts/generate-blog-covers.mjs <slug>     # regen single slug
//
// One visual system across all 20 posts so they look like a set:
//   Editorial abstract illustration, dark base (#0A0A0A), pink accent (#F92672),
//   cream highlights, soft 3D matte clay or paper-cut surfaces, no text,
//   no AI artefacts, 16:9, centred subject.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "data", "blog-posts");
const OUT_DIR = path.join(ROOT, "public", "images", "blog");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Set GEMINI_API_KEY in your environment.");
  process.exit(1);
}

const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes("--force");
const TARGET_SLUG = ARGS.find((a) => !a.startsWith("-"));

const SYSTEM_STYLE = [
  "Editorial abstract illustration for a UK design agency blog cover.",
  "Soft 3D matte clay style. Paper-cut, dimensional, tactile.",
  "Palette: deep ink black #0A0A0A base, hot pink accent #F92672, cream #F5EFE6 highlights,",
  "subtle purple shadows. Restrained, premium, not garish.",
  "Centred composition. Generous negative space. No text. No logos.",
  "Studio soft lighting. 16:9 aspect. Magazine cover energy.",
].join(" ");

const PER_POST_PROMPT = {
  "ai-built-in-30-seconds-is-a-scam":
    "A cracked 3D clay browser window with a 'BUILT IN 30 SECONDS' speedometer needle snapped off. Subtle warning glow.",
  "what-695-buys-in-web-design":
    "A neatly stacked 3D clay tower of three website cards labelled by tier with pink price tags. Editorial.",
  "ai-accelerated-vs-bespoke":
    "Two parallel 3D clay race tracks side by side, one labelled with a circuit pattern, one with a paintbrush. Both elegant.",
  "bespoke-vs-template-when-custom-matters":
    "Two 3D clay business cards, one identical mass-produced grid, one hand-shaped and unique. Side by side, top-down.",
  "speed-tax-slow-website-costs":
    "A 3D clay stopwatch with melting pink wax dripping from the hands. Sense of time bleeding.",
  "agency-websites-worse-than-clients":
    "A 3D clay cobbler's bench with a beautiful shoe and a tatty unfinished shoe beside it. Paper-cut backdrop.",
  "real-reason-website-isnt-converting":
    "A 3D clay funnel with the wide entry full of clay people but only one dropping out the bottom. Pink highlight on the drop.",
  "website-in-7-days-without-cutting-corners":
    "A 3D clay desk calendar with 7 pages folded open like a pop-up book, last page showing a finished website thumbnail.",

  "web-design-for-fitness-coaches":
    "A 3D clay smartphone showing a coaching website silhouette with a clay dumbbell resting beside it. Pink highlight on the CTA button.",
  "web-design-for-dental-practices":
    "A 3D clay tooth and a clay laptop showing a calendar booking screen, both glowing softly. Trustworthy editorial.",
  "branding-for-construction-firms":
    "A 3D clay hard hat and a refined paper-cut business card stacked together. Industrial meets premium.",
  "branding-for-aesthetics-clinics":
    "A 3D clay perfume-bottle-sized clinic vial with a paper-cut leaf, pink ribbon detail. Spa minimalism.",
  "seo-for-personal-trainers":
    "A 3D clay map pin standing tall on a Google-search-bar shape with a clay barbell weight on the bar. Local search energy.",
  "seo-for-photographers":
    "A 3D clay vintage camera with a magnifying glass over its lens, pink highlight on the search reticle.",
  "ai-design-for-coaches":
    "A 3D clay clipboard with a half-AI-half-handdrawn website wireframe sketch overlaid. Honest hybrid.",
  "ai-design-for-small-businesses":
    "A 3D clay storefront facade being assembled from clay puzzle pieces, half by hand and half floating in.",
  "social-media-for-aesthetics-clinics":
    "A 3D clay phone showing a stack of Instagram carousel cards, pink ribbon thread weaving through them. Tasteful.",
  "social-media-for-construction":
    "A 3D clay phone showing a building under construction scene as a reel, pink play button highlighted.",
  "landing-pages-for-photographers":
    "A 3D clay single-page brochure standing upright with a clay camera lens projecting a pink CTA button.",
  "ecommerce-for-print-on-demand-artists":
    "A 3D clay framed art print on a small clay easel, a checkout button glowing pink in the foreground.",
};

async function loadPosts() {
  const files = await fs.readdir(POSTS_DIR);
  const posts = [];
  for (const f of files) {
    if (!f.endsWith(".ts")) continue;
    const src = await fs.readFile(path.join(POSTS_DIR, f), "utf8");
    const slugMatch = src.match(/slug:\s*"([^"]+)"/);
    const titleMatch = src.match(/title:\s*"([^"]+)"/);
    if (slugMatch && titleMatch) {
      posts.push({ slug: slugMatch[1], title: titleMatch[1] });
    }
  }
  return posts;
}

async function generateOne(post) {
  const outPath = path.join(OUT_DIR, `${post.slug}.jpg`);
  if (!FORCE) {
    try {
      await fs.access(outPath);
      console.log(`skip ${post.slug} (exists)`);
      return;
    } catch {}
  }

  const prompt = [
    SYSTEM_STYLE,
    PER_POST_PROMPT[post.slug] ?? `Concept for an article titled "${post.title}". Abstract, editorial, no text.`,
  ].join(" ");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`FAIL ${post.slug}: ${res.status} ${err.slice(0, 200)}`);
    return;
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    console.error(`FAIL ${post.slug}: no image in response`);
    return;
  }

  const buf = Buffer.from(imagePart.inlineData.data, "base64");
  await fs.writeFile(outPath, buf);
  console.log(`wrote ${post.slug}.jpg (${(buf.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const posts = await loadPosts();
  const targets = TARGET_SLUG ? posts.filter((p) => p.slug === TARGET_SLUG) : posts;

  if (targets.length === 0) {
    console.error("no posts matched");
    process.exit(1);
  }

  console.log(`generating ${targets.length} covers${FORCE ? " (force)" : ""}`);
  for (const post of targets) {
    await generateOne(post);
    await new Promise((r) => setTimeout(r, 800));
  }
}

await main();
