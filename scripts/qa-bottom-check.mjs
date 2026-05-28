// Capture just the bottom of home + work index to find the "duplicate hero" mystery.
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";

const outDir = ".qa/bottom-check";
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const route of ["/", "/work"]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle2", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 1500));

  const info = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    innerHeight: window.innerHeight,
  }));

  // Capture top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  const safe = route === "/" ? "_home" : route.slice(1);
  await page.screenshot({ path: path.join(outDir, `${safe}-TOP.jpg`), type: "jpeg", quality: 80 });

  // Capture bottom
  await page.evaluate((sh) => window.scrollTo(0, sh - 900), info.scrollHeight);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, `${safe}-BOTTOM.jpg`), type: "jpeg", quality: 80 });

  // Capture mid (50%)
  await page.evaluate((sh) => window.scrollTo(0, Math.floor(sh / 2)), info.scrollHeight);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, `${safe}-MID.jpg`), type: "jpeg", quality: 80 });

  console.log(`${route}: scrollHeight=${info.scrollHeight}px`);
  await page.close();
}

await browser.close();
