import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const OUT = path.resolve("C:/Users/mraiw/Desktop/awmedia-site/public/images/projects/onyx-lagree/pages");
fs.mkdirSync(OUT, { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// [url, selector-or-null(top), outfile]
const SHOTS = [
  ["https://onyxlagreeandco.com/method", null, "method-hero"],
  ["https://onyxlagreeandco.com/method", "section.section-pad", "method-grid"],
  ["https://onyxlagreeandco.com/what-is-lagree", null, "lagree-hero"],
  ["https://onyxlagreeandco.com/what-is-lagree", ".compare", "lagree-compare"],
  ["https://onyxlagreeandco.com/what-is-lagree", ".classes-head", "lagree-classes"],
  ["https://onyxlagreeandco.com/what-is-lagree", ".faq", "lagree-faq"],
  ["https://onyxlagreeandco.com/timetable", "#timetable", "timetable-widget"],
  ["https://onyxlagreeandco.com/timetable", "#membership", "timetable-pricing"],
  ["https://onyxlagreeandco.com/timetable", "#classes", "timetable-classes"],
  ["https://onyxlagreeandco.com/our-story", null, "story-hero"],
  ["https://onyxlagreeandco.com/our-story", "#team", "story-team"],
  ["https://onyxlagreeandco.com/contact", null, "contact-hero"],
  ["https://onyxlagreeandco.com/contact", ".c-form", "contact-form"],
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox","--disable-setuid-sandbox","--disable-lcd-text"] });
const page = await browser.newPage();
await page.setUserAgent(UA);
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

let last = null;
for (const [url, sel, name] of SHOTS) {
  if (url !== last) {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
    await page.evaluate(() => {
      const b = [...document.querySelectorAll('.cc-btn')].find(x => x.dataset.cc === 'accepted');
      if (b) b.click();
    });
    await sleep(800);
    // trigger all reveals by scrolling the whole page once
    await page.evaluate(async () => {
      await new Promise(res => { let y=0; const t=setInterval(()=>{ y+=500; window.scrollTo(0,y); if(y>=document.body.scrollHeight){clearInterval(t);res();} },100); });
    });
    await sleep(1200);
    await page.evaluate(() => window.scrollTo(0,0));
    await sleep(900);
    last = url;
  }
  if (sel) {
    const ok = await page.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + r.top - 80);
      return true;
    }, sel);
    if (!ok) { console.log("MISS selector", sel, name); continue; }
    await sleep(1400);
  } else {
    await page.evaluate(() => window.scrollTo(0,0));
    await sleep(700);
  }
  const buf = await page.screenshot({ type: "png", fullPage: false });
  await sharp(buf).jpeg({ quality: 88 }).toFile(path.join(OUT, name + ".jpg"));
  console.log("shot", name);
}
await browser.close();
