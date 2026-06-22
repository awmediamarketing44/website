import puppeteer from "puppeteer";
import fs from "fs";

const URL = "https://newgencoaching.uk/";
const OUT = "C:/Users/mraiw/Desktop/ng-frames";
const W = 1280, H = 800, FRAMES = 220;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

// Dismiss the cookie consent banner so it doesn't sit in every frame.
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => {
  const els = [...document.querySelectorAll("button, a, [role='button']")];
  const btn = els.find((b) => /^(accept all|accept|i agree|agree|got it|allow all)$/i.test((b.textContent || "").trim()));
  if (btn) btn.click();
});
await new Promise((r) => setTimeout(r, 800));
// Belt & braces: hide any lingering cookie/consent overlay.
await page.addStyleTag({
  content: `[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[class*="gdpr" i],[aria-label*="cookie" i]{display:none !important;visibility:hidden !important;}`,
});

// Trigger lazy-loaded content: walk to the bottom, then back to top.
const scrollHeight = await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else res();
    };
    step();
  });
  window.scrollTo(0, 0);
  return document.documentElement.scrollHeight;
});
await new Promise((r) => setTimeout(r, 1500)); // let images settle

const maxScroll = Math.max(0, scrollHeight - H);
console.log(`page height ${scrollHeight}, scroll range ${maxScroll}px over ${FRAMES} frames`);

for (let i = 0; i < FRAMES; i++) {
  const y = Math.round((maxScroll * i) / (FRAMES - 1));
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 35));
  await page.screenshot({ path: `${OUT}/f${String(i).padStart(4, "0")}.png` });
}
await browser.close();
console.log("done:", FRAMES, "frames in", OUT);
