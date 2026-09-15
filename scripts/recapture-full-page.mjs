/**
 * recapture-full-page.mjs
 *
 * Re-shoots a client's full-page desktop capture properly.
 *
 * Why this exists: public/images/projects/calibre-coaching/desktop-full.jpg is
 * 12000px of a single dark hero with none of the page's actual sections in it.
 * The capture was taken before the scroll-triggered content rendered, so the
 * whole page came out as one flat image. It measures 18.5 greyscale stdev
 * against 100+ for a healthy capture, which is how it was spotted.
 *
 * The two traps it has to avoid:
 *   - A bare fullPage screenshot fires before lazy content and scroll reveals
 *     have run, which is what produced the flat original. This scrolls the
 *     whole page first, waits, then returns to the top before capturing.
 *   - A default HeadlessChrome UA gets 403'd by some 20i/Apache rulesets, so a
 *     real desktop UA is set.
 *
 * Usage:
 *   node scripts/recapture-full-page.mjs <slug> <url>
 *   node scripts/recapture-full-page.mjs calibre-coaching https://calibre-coaching.com/
 */

import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const slug = process.argv[2];
const url = process.argv[3];
if (!slug || !url) {
  console.error("usage: node scripts/recapture-full-page.mjs <slug> <url>");
  process.exit(1);
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const OUT_DIR = path.join(root, "public", "images", "projects", slug);
const TMP = path.join(root, ".qa", "recapture");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log(`loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 4500)); // boot/loader intros

  // Dismiss a cookie banner by its label text, then sweep leftovers.
  await page.evaluate(() => {
    const wanted = /^(reject|decline|deny|only necessary|essential only|accept|allow|got it|ok)/i;
    for (const el of document.querySelectorAll("button, a, [role=button]")) {
      const t = (el.textContent || "").trim();
      if (t && wanted.test(t) && el.offsetParent !== null) {
        el.click();
        break;
      }
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll the whole page so lazy images and scroll reveals actually fire.
  // Without this the capture is one flat hero, which is the original bug.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 320));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2000));

  // Remove anything fixed (nav bars, chat bubbles, consent) so it does not
  // repeat down the length of a full-page shot.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.position === "fixed" || cs.position === "sticky") {
        el.style.setProperty("display", "none", "important");
      }
    }
  });
  await new Promise((r) => setTimeout(r, 500));

  const raw = path.join(TMP, `${slug}-raw.png`);
  await page.screenshot({ path: raw, fullPage: true });

  const meta = await sharp(raw).metadata();
  console.log(`captured ${meta.width}x${meta.height}`);

  // Health check: a flat capture is the failure this script exists to fix.
  const stats = await sharp(raw).resize({ width: 64 }).greyscale().stats();
  const sd = stats.channels[0].stdev;
  console.log(`variety (greyscale stdev): ${sd.toFixed(1)}  ${sd < 30 ? "TOO FLAT" : "ok"}`);

  await sharp(raw)
    .resize({ width: 2880, withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT_DIR, "desktop-full.jpg"));
  console.log(`wrote ${path.join(OUT_DIR, "desktop-full.jpg")}`);

  await browser.close();
  if (sd < 30) process.exit(2);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
