// Full-site QA capture: every route, mobile + desktop, with perf metrics + console errors.
// Outputs: .qa/full-site/<route>/{desktop,mobile}.jpg + report.json
//
// Usage:
//   node scripts/qa-full-site.mjs                      # captures against http://localhost:3000
//   node scripts/qa-full-site.mjs https://awmedia.app  # captures against prod URL
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const base = process.argv[2] || "http://localhost:3000";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/how-we-work",
  "/services",
  "/industries",
  "/work",
  "/blog",
  "/contact",
];

const SERVICE_SLUGS = [
  "web-design",
  "branding",
  "social-media",
  "seo-support",
  "ecommerce",
  "landing-pages",
  "ai-design",
];

const INDUSTRY_SLUGS = ["fitness", "construction", "dental", "photography", "aesthetics"];

// Sample 4 strong project case studies (cover different industries)
const PROJECT_SLUGS = ["team-procoach", "jic", "fortis", "dan-reeve"];

const ROUTES = [
  ...STATIC_ROUTES,
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  ...INDUSTRY_SLUGS.map((s) => `/industries/${s}`),
  ...PROJECT_SLUGS.map((s) => `/work/${s}`),
];

const outDir = path.join(projectRoot, ".qa", "full-site");
await fs.mkdir(outDir, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

const report = {
  base,
  startedAt: new Date().toISOString(),
  routes: [],
};

async function captureRoute(route) {
  const safeName = route === "/" ? "_home" : route.replace(/^\//, "").replace(/\//g, "_");
  const routeDir = path.join(outDir, safeName);
  await fs.mkdir(routeDir, { recursive: true });

  const result = { route, viewports: {} };

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport(vp);

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("requestfailed", (req) => {
      if (!req.url().includes("favicon")) {
        failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
      }
    });

    const url = `${base}${route}`;
    const t0 = Date.now();
    let navOk = true;
    let httpStatus = 0;

    try {
      const resp = await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
      httpStatus = resp?.status() ?? 0;
    } catch (e) {
      navOk = false;
      pageErrors.push(`Navigation failed: ${e.message}`);
    }

    const loadMs = Date.now() - t0;

    // Web vitals via PerformanceObserver
    const vitals = navOk
      ? await page.evaluate(() => {
          return new Promise((resolve) => {
            const out = { fcp: 0, lcp: 0, cls: 0, ttfb: 0, transferKB: 0 };
            const nav = performance.getEntriesByType("navigation")[0];
            if (nav) {
              out.ttfb = Math.round(nav.responseStart);
              out.transferKB = Math.round((nav.transferSize || 0) / 1024);
            }
            for (const e of performance.getEntriesByType("paint")) {
              if (e.name === "first-contentful-paint") out.fcp = Math.round(e.startTime);
            }
            try {
              new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                  out.lcp = Math.round(e.startTime);
                }
              }).observe({ type: "largest-contentful-paint", buffered: true });
              new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                  if (!e.hadRecentInput) out.cls += e.value;
                }
              }).observe({ type: "layout-shift", buffered: true });
            } catch {}
            setTimeout(() => {
              out.cls = Number(out.cls.toFixed(4));
              resolve(out);
            }, 1500);
          });
        })
      : null;

    // Scroll the entire page to trigger whileInView motion animations, then
    // return to top before the fullPage capture. Without this, sections with
    // `initial opacity: 0` stay invisible in headless captures.
    if (navOk) {
      try {
        await page.evaluate(async () => {
          const sh = document.body.scrollHeight;
          for (let y = 0; y < sh + 500; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
        });
        await new Promise((r) => setTimeout(r, 800));
      } catch (e) {
        pageErrors.push(`Scroll-prime failed: ${e.message}`);
      }
    } else {
      await new Promise((r) => setTimeout(r, 800));
    }

    // Full page screenshot
    try {
      await page.screenshot({
        path: path.join(routeDir, `${vpName}.jpg`),
        type: "jpeg",
        quality: 78,
        fullPage: true,
      });
    } catch (e) {
      pageErrors.push(`Screenshot failed: ${e.message}`);
    }

    // Resource sizes
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType("resource");
      const sum = { totalKB: 0, jsKB: 0, imgKB: 0, cssKB: 0, fontKB: 0, count: entries.length };
      for (const e of entries) {
        const size = (e.transferSize || 0) / 1024;
        sum.totalKB += size;
        if (e.initiatorType === "script") sum.jsKB += size;
        else if (e.initiatorType === "img" || /\.(jpg|jpeg|png|webp|avif|svg)/i.test(e.name)) sum.imgKB += size;
        else if (e.initiatorType === "css" || /\.css/i.test(e.name)) sum.cssKB += size;
        else if (/font|\.(woff|woff2|ttf)/i.test(e.name)) sum.fontKB += size;
      }
      sum.totalKB = Math.round(sum.totalKB);
      sum.jsKB = Math.round(sum.jsKB);
      sum.imgKB = Math.round(sum.imgKB);
      sum.cssKB = Math.round(sum.cssKB);
      sum.fontKB = Math.round(sum.fontKB);
      return sum;
    });

    result.viewports[vpName] = {
      httpStatus,
      loadMs,
      vitals,
      resources,
      consoleErrors,
      pageErrors,
      failedRequests,
    };

    await page.close();
  }

  // Status line
  const d = result.viewports.desktop;
  const m = result.viewports.mobile;
  const errCount =
    (d.consoleErrors?.length || 0) +
    (d.pageErrors?.length || 0) +
    (m.consoleErrors?.length || 0) +
    (m.pageErrors?.length || 0);
  console.log(
    `${route.padEnd(36)} ` +
      `D ${String(d.httpStatus).padEnd(3)} ${String(d.vitals?.lcp ?? "?").padStart(5)}ms ` +
      `${String(d.resources.totalKB).padStart(5)}KB | ` +
      `M ${String(m.httpStatus).padEnd(3)} ${String(m.vitals?.lcp ?? "?").padStart(5)}ms ` +
      `${String(m.resources.totalKB).padStart(5)}KB ` +
      (errCount ? `[${errCount} err]` : ""),
  );

  return result;
}

console.log(`QA capture against ${base}`);
console.log(`Capturing ${ROUTES.length} routes x 2 viewports = ${ROUTES.length * 2} screenshots\n`);
console.log("ROUTE                              DESKTOP                    MOBILE");

for (const route of ROUTES) {
  const r = await captureRoute(route);
  report.routes.push(r);
}

report.finishedAt = new Date().toISOString();

// Summary
const allErrors = [];
for (const r of report.routes) {
  for (const [vp, data] of Object.entries(r.viewports)) {
    if (data.httpStatus !== 200) allErrors.push(`${r.route} [${vp}] HTTP ${data.httpStatus}`);
    for (const e of data.pageErrors || []) allErrors.push(`${r.route} [${vp}] PAGE: ${e}`);
    for (const e of data.consoleErrors || []) allErrors.push(`${r.route} [${vp}] CONSOLE: ${e}`);
    for (const f of data.failedRequests || [])
      allErrors.push(`${r.route} [${vp}] FAILED: ${f.url} (${f.failure})`);
  }
}

console.log("\n=== ERRORS ===");
if (allErrors.length === 0) console.log("none");
else allErrors.forEach((e) => console.log("  " + e));

// Worst LCP
const lcpSorted = [...report.routes].sort((a, b) => {
  const al = Math.max(a.viewports.desktop.vitals?.lcp || 0, a.viewports.mobile.vitals?.lcp || 0);
  const bl = Math.max(b.viewports.desktop.vitals?.lcp || 0, b.viewports.mobile.vitals?.lcp || 0);
  return bl - al;
});
console.log("\n=== TOP 5 SLOWEST LCP (max of desktop/mobile) ===");
for (const r of lcpSorted.slice(0, 5)) {
  console.log(
    `  ${r.route.padEnd(36)} D ${r.viewports.desktop.vitals?.lcp ?? "?"}ms / M ${r.viewports.mobile.vitals?.lcp ?? "?"}ms`,
  );
}

// Heaviest pages
const sizeSorted = [...report.routes].sort((a, b) => {
  const ab = Math.max(a.viewports.desktop.resources.totalKB, a.viewports.mobile.resources.totalKB);
  const bb = Math.max(b.viewports.desktop.resources.totalKB, b.viewports.mobile.resources.totalKB);
  return bb - ab;
});
console.log("\n=== TOP 5 HEAVIEST PAGES (max of desktop/mobile transfer KB) ===");
for (const r of sizeSorted.slice(0, 5)) {
  console.log(
    `  ${r.route.padEnd(36)} D ${r.viewports.desktop.resources.totalKB}KB / M ${r.viewports.mobile.resources.totalKB}KB`,
  );
}

await fs.writeFile(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
console.log(`\nReport: ${path.join(outDir, "report.json")}`);

await browser.close();
