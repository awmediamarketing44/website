// Split the 156 migrated posts into per-slug source files for the rewrite
// workflow. Each agent reads in/<slug>.json and writes out/<slug>.json.
// Run: node scripts/prep-rewrite.mjs
import fs from "fs";
import path from "path";

const SRC = "src/data/blog-posts/_imported-wp.ts";
const IN = path.resolve("scripts/rewrite-io/in");
const OUT = path.resolve("scripts/rewrite-io/out");
fs.mkdirSync(IN, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const src = fs.readFileSync(SRC, "utf8");
const marker = "BlogPost[] = ";
const json = src.slice(src.indexOf(marker) + marker.length, src.lastIndexOf("]") + 1);
const posts = JSON.parse(json);

function blocksToText(body) {
  return body
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "h3") return `### ${b.text}`;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      if (b.type === "ol") return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
      if (b.type === "quote") return `> ${b.text}`;
      if (b.type === "callout") return `[callout] ${b.text}`;
      return b.text || "";
    })
    .filter(Boolean)
    .join("\n\n");
}

const slugs = [];
for (const p of posts) {
  const rec = {
    slug: p.slug,
    title: p.title,
    tag: p.tag,
    date: p.date,
    coverImage: p.coverImage,
    rawText: blocksToText(p.body),
  };
  fs.writeFileSync(path.join(IN, `${p.slug}.json`), JSON.stringify(rec, null, 2));
  slugs.push(p.slug);
}

fs.writeFileSync(path.resolve("scripts/rewrite-io/slugs.json"), JSON.stringify(slugs, null, 2));
console.log(`Wrote ${slugs.length} source files to ${IN}`);
console.log(`Slug list: scripts/rewrite-io/slugs.json`);
