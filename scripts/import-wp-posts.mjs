// One-shot importer: pulls all WordPress posts from the live REST API,
// converts HTML → BlogSection blocks, downloads featured images, and writes:
//   - src/data/blog-posts/_imported-wp.ts   (BlogPost[] as JSON-in-TS)
//   - public/images/blog/imported/<slug>.jpg
//   - scripts/wp-redirects.json              (old root URL → /blog/<slug>)
//
// Run: node scripts/import-wp-posts.mjs
import { parse } from "node-html-parser";
import he from "he";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const BASE = "https://www.awmedia.marketing";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const IMG_DIR = path.resolve("public/images/blog/imported");
const OUT_TS = path.resolve("src/data/blog-posts/_imported-wp.ts");
const OUT_REDIRECTS = path.resolve("scripts/wp-redirects.json");

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Slugs already used by the 20 hand-written posts — those win, skip any WP dupes.
const EXISTING_SLUGS = new Set(
  fs.readdirSync(path.resolve("src/data/blog-posts"))
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
    .map((f) => f.replace(/\.ts$/, ""))
);

fs.mkdirSync(IMG_DIR, { recursive: true });

const clean = (s) => he.decode((s || "").replace(/\s+/g, " ")).trim();
// Strip HTML tags then decode entities — for excerpt/meta which arrive wrapped in <p>…</p>.
const stripHtml = (s) => he.decode((s || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function htmlToBlocks(html) {
  const root = parse(html, { blockTextElements: { script: false, style: false } });
  const blocks = [];
  const pushText = (type, text) => {
    const t = clean(text);
    if (t) blocks.push({ type, text: t });
  };

  for (const node of root.childNodes) {
    if (node.nodeType !== 1) continue; // element nodes only
    const tag = node.rawTagName?.toLowerCase();
    if (!tag) continue;
    switch (tag) {
      case "h1":
      case "h2":
        pushText("h2", node.text);
        break;
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        pushText("h3", node.text);
        break;
      case "p": {
        // skip paragraphs that are just an image/embed
        const txt = clean(node.text);
        if (txt) blocks.push({ type: "p", text: txt });
        break;
      }
      case "ul":
      case "ol": {
        const items = node.querySelectorAll("li").map((li) => clean(li.text)).filter(Boolean);
        if (items.length) blocks.push({ type: tag === "ol" ? "ol" : "ul", items });
        break;
      }
      case "blockquote":
        pushText("quote", node.text);
        break;
      case "figure":
      case "img":
      case "div":
      case "iframe":
      case "figcaption":
      case "table":
      case "style":
      case "script":
        // structural / media — skip, but recover stray text in divs
        if (tag === "div") {
          const inner = parse(node.innerHTML);
          const hasBlock = inner.querySelector("p,h2,h3,ul,ol,blockquote");
          if (hasBlock) {
            for (const sub of htmlToBlocks(node.innerHTML)) blocks.push(sub);
          } else {
            pushText("p", node.text);
          }
        }
        break;
      default:
        pushText("p", node.text);
    }
  }
  return blocks;
}

function categoryTag(cats, blockCount) {
  // Thin project-announcement posts → "Projects"; pure news → "News"; everything else "Insights".
  if (cats.includes(1) && blockCount <= 3) return "Projects";
  if (cats.includes(34) && !cats.includes(35)) return "News";
  return "Insights";
}

function wordCount(blocks) {
  return blocks.reduce((n, b) => {
    if (b.text) return n + b.text.split(/\s+/).length;
    if (b.items) return n + b.items.join(" ").split(/\s+/).length;
    return n;
  }, 0);
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function downloadImage(srcUrl, slug) {
  const out = path.join(IMG_DIR, `${slug}.jpg`);
  if (fs.existsSync(out)) return `/images/blog/imported/${slug}.jpg`; // cached
  try {
    const res = await fetch(srcUrl, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(out);
    return `/images/blog/imported/${slug}.jpg`;
  } catch {
    return null;
  }
}

// ---- main ----
const FALLBACK_COVER = "/images/blog/imported/_fallback.jpg";
// generate a neutral fallback cover (dark brand card) once
await sharp({ create: { width: 1600, height: 1000, channels: 3, background: { r: 13, g: 13, b: 15 } } })
  .jpeg({ quality: 80 })
  .toFile(path.join(IMG_DIR, "_fallback.jpg"));

const posts = [];
let page = 1;
let totalPages = 1;
do {
  const url = `${BASE}/wp-json/wp/v2/posts?per_page=50&page=${page}&_embed=wp:featuredmedia&orderby=date&order=desc`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  totalPages = Number(res.headers.get("x-wp-totalpages")) || 1;
  const batch = await res.json();
  posts.push(...batch);
  console.log(`fetched page ${page}/${totalPages} (${batch.length} posts)`);
  page++;
} while (page <= totalPages);

console.log(`\nTotal fetched: ${posts.length}`);

const out = [];
const redirects = [];
let skipped = 0;
let imageCount = 0;

for (const p of posts) {
  const slug = p.slug;
  if (EXISTING_SLUGS.has(slug)) {
    console.log(`  skip (dupe of hand-written): ${slug}`);
    skipped++;
    continue;
  }
  const title = clean(p.title?.rendered);
  const body = htmlToBlocks(p.content?.rendered || "");
  if (body.length === 0) {
    console.log(`  skip (empty body): ${slug}`);
    skipped++;
    continue;
  }
  const d = new Date(p.date);
  const dateStr = `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  const excerpt = stripHtml(p.excerpt?.rendered).replace(/\s*\[?(\[?…\]?|\.\.\.)\]?\s*$/, "").slice(0, 200);
  const tag = categoryTag(p.categories || [], body.length);
  const minutes = Math.max(2, Math.round(wordCount(body) / 200));

  // featured image
  let cover = FALLBACK_COVER;
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const srcUrl = media?.source_url || media?.media_details?.sizes?.full?.source_url;
  if (srcUrl) {
    const local = await downloadImage(srcUrl, slug);
    if (local) {
      cover = local;
      imageCount++;
    }
  }

  out.push({
    slug,
    title,
    tag,
    excerpt: excerpt || title,
    metaDescription: (excerpt || title).slice(0, 158),
    date: dateStr,
    readingMinutes: minutes,
    coverImage: cover,
    body,
  });

  redirects.push({ source: `/${slug}`, destination: `/blog/${slug}`, permanent: true });
  console.log(`  ✓ ${slug} (${body.length} blocks, ${tag}, ${dateStr})`);
}

const header = `import type { BlogPost } from "../blog-types";

// AUTO-GENERATED by scripts/import-wp-posts.mjs — migrated WordPress posts.
// Do not hand-edit; re-run the importer to refresh.
const importedWpPosts: BlogPost[] = `;
fs.writeFileSync(OUT_TS, header + JSON.stringify(out, null, 2) + ";\n\nexport default importedWpPosts;\n");
fs.writeFileSync(OUT_REDIRECTS, JSON.stringify(redirects, null, 2));

console.log(`\n=== DONE ===`);
console.log(`migrated: ${out.length}`);
console.log(`skipped:  ${skipped}`);
console.log(`images downloaded: ${imageCount} (rest use fallback)`);
console.log(`wrote: ${OUT_TS}`);
console.log(`wrote: ${OUT_REDIRECTS} (${redirects.length} redirects)`);
