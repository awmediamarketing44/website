// Visual + behavioural QA for /ai-label-check.
//
// Captures the empty state, the results state and the expanded detail panel at
// desktop and mobile, and fails loudly on horizontal overflow or console errors.
//
// Uploads via elementHandle.uploadFile() rather than clicking the file input:
// the input is visually hidden, and page.click() on a hidden input lands on the
// fixed header instead.
//
// Usage:
//   node scripts/qa-ai-label.mjs                       # against localhost:3000
//   node scripts/qa-ai-label.mjs http://localhost:3311
//   node scripts/qa-ai-label.mjs https://awmedia.marketing
//
// Needs a sample image with real Content Credentials. Pass one with SAMPLE=,
// otherwise it falls back to a repo image (which will read as "stripped").
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = path.join(projectRoot, ".qa", "ai-label");
const SAMPLE =
  process.env.SAMPLE || path.join(projectRoot, "public/images/blog/ai-design-for-coaches.jpg");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--disable-lcd-text", "--force-color-profile=srgb"],
});

const problems = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 2 });

  // Real desktop UA: the default HeadlessChrome string gets 403'd by some
  // 20i/Apache rulesets, which looks exactly like a broken page.
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  );

  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

  await page.goto(`${BASE}/ai-label-check`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  if (overflow) problems.push(`${vp.name}: horizontal overflow on empty state`);

  await page.screenshot({ path: path.join(OUT, `${vp.name}-empty.jpg`), quality: 88 });

  const input = await page.$('input[type="file"]');
  await input.uploadFile(SAMPLE);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
      /check my image/i.test(x.textContent),
    );
    b?.click();
  });

  await page
    .waitForFunction(
      () =>
        /will get flagged|nothing to flag|could not read these/i.test(
          document.body.innerText,
        ),
      { timeout: 20000 },
    )
    .catch(() => problems.push(`${vp.name}: results never rendered`));

  await new Promise((r) => setTimeout(r, 900));

  const overflow2 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  if (overflow2) problems.push(`${vp.name}: horizontal overflow AFTER results`);

  await page.screenshot({ path: path.join(OUT, `${vp.name}-results.jpg`), quality: 88 });

  const hasDetails = await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) =>
      /what is actually in the file/i.test(x.textContent),
    );
    if (!b) return false;
    b.scrollIntoView({ block: "center" });
    b.click();
    return true;
  });
  if (hasDetails) {
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: path.join(OUT, `${vp.name}-details.jpg`), quality: 88 });
  }

  if (consoleErrors.length) {
    problems.push(`${vp.name}: console ${consoleErrors.slice(0, 3).join(" | ")}`);
  }

  await page.close();
}

await browser.close();
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "No problems detected.");
console.log("shots in", OUT);
