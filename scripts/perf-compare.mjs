// Perf measurement for the motion work: proves the animation layer did not
// cost anything. Measures what actually reaches the visitor rather than what
// is sitting in .next (a stale chunk directory flatters every comparison).
//
// Captures per viewport: bytes transferred split by type, LCP, CLS, and total
// main-thread long-task time (the number that would move if animation were
// running in JS rather than on the compositor).
//
// Usage:
//   node scripts/perf-compare.mjs after
//   node scripts/perf-compare.mjs before
//   node scripts/perf-compare.mjs --diff        # print before vs after table
//
// Writes .qa/perf/<label>.json

import puppeteer from "puppeteer";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const OUT = path.join(root, ".qa", "perf");
const BASE = process.env.PERF_BASE || "http://localhost:3000";

const ROUTES = ["/", "/work", "/services/web-design", "/about"];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, dsf: 3, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
];

function classify(url, resourceType) {
  if (resourceType === "script" || url.endsWith(".js")) return "js";
  if (resourceType === "stylesheet" || url.endsWith(".css")) return "css";
  if (resourceType === "image" || /\.(avif|webp|jpe?g|png|svg|gif)/.test(url)) return "image";
  if (resourceType === "media" || /\.(mp4|webm)/.test(url)) return "media";
  if (resourceType === "font" || /\.(woff2?|ttf)/.test(url)) return "font";
  return "other";
}

async function measure(browser, route, vp) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });

  const bytes = { js: 0, css: 0, image: 0, media: 0, font: 0, other: 0 };
  let requests = 0;

  page.on("response", async (res) => {
    try {
      const url = res.url();
      if (!url.startsWith("http")) return;
      requests++;
      // Encoded length is what actually crosses the wire.
      const len = Number(res.headers()["content-length"] || 0);
      let size = len;
      if (!size) {
        try {
          size = (await res.buffer()).length;
        } catch {
          size = 0;
        }
      }
      bytes[classify(url, res.request().resourceType())] += size;
    } catch {
      /* response gone, ignore */
    }
  });

  // Long tasks tell us whether animation is stealing the main thread.
  await page.evaluateOnNewDocument(() => {
    window.__longTasks = 0;
    window.__lcp = 0;
    window.__cls = 0;
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__longTasks += e.duration;
      }).observe({ type: "longtask", buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcp = e.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          if (!e.hadRecentInput) window.__cls += e.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {
      /* observer unsupported */
    }
  });

  await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 });
  // Settle, then scroll the whole page so lazy assets and scroll-driven work
  // are actually exercised before we read the numbers.
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 60)));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  const metrics = await page.evaluate(() => ({
    lcp: Math.round(window.__lcp || 0),
    cls: Number((window.__cls || 0).toFixed(4)),
    longTasks: Math.round(window.__longTasks || 0),
    scrollHeight: document.body.scrollHeight,
  }));

  await page.close();

  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  return { route, viewport: vp.name, requests, total, bytes, ...metrics };
}

async function run(label) {
  await mkdir(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const results = [];
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const r = await measure(browser, route, vp);
      results.push(r);
      console.log(
        `${label.padEnd(6)} ${r.viewport.padEnd(7)} ${r.route.padEnd(22)} ` +
          `${(r.total / 1024).toFixed(0).padStart(6)}KB  js ${(r.bytes.js / 1024).toFixed(0).padStart(5)}KB  ` +
          `css ${(r.bytes.css / 1024).toFixed(0).padStart(4)}KB  img ${(r.bytes.image / 1024).toFixed(0).padStart(5)}KB  ` +
          `LCP ${String(r.lcp).padStart(5)}ms  CLS ${String(r.cls).padStart(6)}  long ${String(r.longTasks).padStart(5)}ms`
      );
    }
  }

  await browser.close();
  await writeFile(path.join(OUT, `${label}.json`), JSON.stringify(results, null, 2));
  console.log(`\nwrote .qa/perf/${label}.json`);
}

async function diff() {
  const load = async (l) => {
    const p = path.join(OUT, `${l}.json`);
    if (!existsSync(p)) throw new Error(`missing ${p} - run: node scripts/perf-compare.mjs ${l}`);
    return JSON.parse(await readFile(p, "utf8"));
  };
  const before = await load("before");
  const after = await load("after");

  const key = (r) => `${r.viewport}|${r.route}`;
  const bmap = new Map(before.map((r) => [key(r), r]));

  const fmtKB = (n) => `${n >= 0 ? "+" : ""}${(n / 1024).toFixed(1)}KB`;
  const fmtMs = (n) => `${n >= 0 ? "+" : ""}${n}ms`;

  console.log(
    "\nviewport route                     total      js       css      img      LCP      CLS      longtask"
  );
  console.log("-".repeat(104));
  for (const a of after) {
    const b = bmap.get(key(a));
    if (!b) continue;
    console.log(
      `${a.viewport.padEnd(8)} ${a.route.padEnd(22)} ` +
        `${fmtKB(a.total - b.total).padStart(9)} ${fmtKB(a.bytes.js - b.bytes.js).padStart(8)} ` +
        `${fmtKB(a.bytes.css - b.bytes.css).padStart(8)} ${fmtKB(a.bytes.image - b.bytes.image).padStart(8)} ` +
        `${fmtMs(a.lcp - b.lcp).padStart(8)} ${(a.cls - b.cls >= 0 ? "+" : "") + (a.cls - b.cls).toFixed(4)} ` +
        `${fmtMs(a.longTasks - b.longTasks).padStart(9)}`
    );
  }
}

const arg = process.argv[2];
if (arg === "--diff") {
  diff().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
} else {
  run(arg || "after").catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
