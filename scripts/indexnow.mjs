#!/usr/bin/env node
/**
 * Ping IndexNow so Bing (and Yandex, Seznam, Naver, Yep, Internet Archive,
 * Amazonbot) learn about changed URLs instead of waiting to be re-crawled.
 * Submitting to one endpoint shares with all participants.
 *
 * Brave is NOT an IndexNow participant, so this does nothing for Claude's
 * search index. Brave only re-crawls off robots.txt -> sitemap lastmod.
 *
 * Usage:
 *   node scripts/indexnow.mjs                 # every URL in the live sitemap
 *   node scripts/indexnow.mjs /about /work    # just these paths
 *   node scripts/indexnow.mjs --dry           # show payload, send nothing
 */
const HOST = "awmedia.marketing";
const KEY = "6093b16e1b150ba2cb889844fbc704d5";
const ORIGIN = `https://${HOST}`;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const paths = args.filter((a) => !a.startsWith("--"));

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const urlList = paths.length
  ? paths.map((p) => (p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`))
  : await sitemapUrls();

if (!urlList.length) {
  console.error("no URLs to submit");
  process.exit(1);
}

// 10,000 URLs per POST is the protocol limit.
const batches = [];
for (let i = 0; i < urlList.length; i += 10000) batches.push(urlList.slice(i, i + 10000));

console.log(`IndexNow: ${urlList.length} URL(s) in ${batches.length} batch(es)`);
if (dry) {
  console.log(urlList.slice(0, 10).join("\n"));
  if (urlList.length > 10) console.log(`... and ${urlList.length - 10} more`);
  process.exit(0);
}

for (const [i, batch] of batches.entries()) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${ORIGIN}/${KEY}.txt`,
      urlList: batch,
    }),
  });
  // 200 = accepted, 202 = accepted, key validation pending.
  const ok = res.status === 200 || res.status === 202;
  console.log(`  batch ${i + 1}/${batches.length}: ${res.status} ${res.statusText}${ok ? "" : ` -> ${await res.text()}`}`);
  if (!ok) process.exitCode = 1;
}
