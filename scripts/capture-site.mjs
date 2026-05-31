// Capture portfolio screenshots for a live website build.
// Usage: node scripts/capture-site.mjs <url> <slug>
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const URL = process.argv[2];
const SLUG = process.argv[3];
if (!URL || !SLUG) { console.error("usage: node scripts/capture-site.mjs <url> <slug>"); process.exit(1); }

const OUT = path.resolve("public/images/projects", SLUG);
fs.mkdirSync(OUT, { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0; const step = 400;
      const t = setInterval(() => {
        window.scrollBy(0, step); total += step;
        if (total >= document.body.scrollHeight) { clearInterval(t); window.scrollTo(0, 0); resolve(); }
      }, 120);
    });
  });
  await sleep(1500);
}

async function dismissCookies(page) {
  try {
    await page.evaluate(() => {
      const rx = /^(accept all|accept|allow all|i agree|agree|got it|ok|allow)$/i;
      const els = [...document.querySelectorAll('button, a, [role="button"]')];
      for (const el of els) {
        const t = (el.textContent || "").trim();
        if (rx.test(t)) { el.click(); return; }
      }
    });
  } catch {}
}

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
try {
  const desk = await browser.newPage();
  await desk.setUserAgent(UA);
  await desk.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desk.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(1000);
  await dismissCookies(desk);
  await sleep(600);
  await autoScroll(desk);
  await sleep(800);
  const fold = await desk.screenshot({ type: "png", fullPage: false });
  await sharp(fold).jpeg({ quality: 88 }).toFile(path.join(OUT, "desktop.jpg"));
  await sharp(fold).jpeg({ quality: 88 }).toFile(path.join(OUT, "hero.jpg"));
  await sharp(fold).resize(1280, 800, { fit: "cover", position: "top" }).jpeg({ quality: 86 }).toFile(path.join(OUT, "thumb.jpg"));
  const full = await desk.screenshot({ type: "png", fullPage: true });
  await sharp(full).resize({ width: 2880 }).jpeg({ quality: 82 }).toFile(path.join(OUT, "desktop-full.jpg"));
  await desk.close();

  const mob = await browser.newPage();
  await mob.setUserAgent(UA);
  await mob.setViewport({ width: 414, height: 896, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await mob.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(1000);
  await dismissCookies(mob);
  await sleep(600);
  await autoScroll(mob);
  await sleep(800);
  const mb = await mob.screenshot({ type: "png", fullPage: false });
  await sharp(mb).jpeg({ quality: 88 }).toFile(path.join(OUT, "mobile.jpg"));
  await mob.close();
  console.log("Captured →", OUT);
} finally { await browser.close(); }
