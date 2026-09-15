// Dr Shabri (job 1449) section stills for the AW work page.
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const OUT = path.resolve("public/images/projects/dr-shabri/pages");
fs.mkdirSync(OUT, { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const B = "https://drshabri.com";

// [url, mode, outfile]   mode: "top" | "bottom" | <css selector> | <heading text>
const SHOTS = [
  [`${B}/`, "h:Three Disciplines", "home-disciplines"],
  [`${B}/`, "bottom", "home-footer"],
  [`${B}/about/`, "top", "about"],
  [`${B}/philosophy/`, "top", "philosophy"],
  [`${B}/contact/`, "top", "contact"],
  [`${B}/treatments/dental-treatments/cosmetic-dentistry/dr-shabri-signature-harmonisation/`, "top", "treatment-harmonisation"],
  [`${B}/treatments/aesthetic-treatments/dr-shabri-full-face-transformation/`, "top", "treatment-full-face"],
  [`${B}/treatments/dental-treatments/orthodontics/invisalign-clear-aligners/`, "top", "treatment-invisalign"],
  [`${B}/treatments/aesthetic-treatments/skinboosters/`, "top", "treatment-skinboosters"],
  [`${B}/gdc-regulations/`, "top", "gdc-regulations"],
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox","--disable-setuid-sandbox","--disable-lcd-text"] });
const page = await browser.newPage();
await page.setUserAgent(UA);
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

let last = null;
for (const [url, mode, name] of SHOTS) {
  if (url !== last) {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
    await page.evaluate(() => {
      const rx = /^(accept all|accept|allow all|i agree|agree|got it|ok|allow)$/i;
      for (const el of document.querySelectorAll('button,a,[role="button"]')) {
        if (rx.test((el.textContent || "").trim())) { el.click(); return; }
      }
    });
    await sleep(700);
    await page.evaluate(async () => {
      await new Promise(res => { let y = 0; const t = setInterval(() => { y += 600; window.scrollTo(0, y); if (y >= document.body.scrollHeight) { clearInterval(t); res(); } }, 90); });
    });
    await sleep(1400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(900);
    last = url;
  }

  if (mode === "top") {
    await page.evaluate(() => window.scrollTo(0, 0));
  } else if (mode === "bottom") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  } else if (mode.startsWith("h:")) {
    const txt = mode.slice(2);
    const ok = await page.evaluate((t) => {
      const el = [...document.querySelectorAll("h1,h2,h3")].find(h => (h.textContent || "").includes(t));
      if (!el) return false;
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 120);
      return true;
    }, txt);
    if (!ok) { console.log("MISS heading", txt, name); continue; }
  } else {
    const ok = await page.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return false;
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 100);
      return true;
    }, mode);
    if (!ok) { console.log("MISS selector", mode, name); continue; }
  }
  await sleep(1300);
  const buf = await page.screenshot({ type: "png", fullPage: false });
  await sharp(buf).jpeg({ quality: 88 }).toFile(path.join(OUT, name + ".jpg"));
  console.log("shot", name);
}
await browser.close();
