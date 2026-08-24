// Apex Gym Glasgow (job 1461) capture.
// Usage: node scripts/capture-apex.mjs
// Writes desktop section stills + a mobile still to public/images/projects/apex-gym-glasgow/
// and full-bleed section grabs to Desktop/1461-apex-shots/ for the glass mockup frames.
//
// Traps this handles (all previously paid for):
//  - fullPage screenshots of a 100svh hero LIE. Element captures only.
//  - reveal-animated sections come back BLACK unless animations are killed first.
//  - the site paints a custom "A" cursor that lands in the middle of the hero shot.
//  - the header is sticky, so it stamps itself over every section grab.

import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const URL = 'https://apexgymglasgow.com/';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const caseDir = path.join(projectRoot, 'public', 'images', 'projects', 'apex-gym-glasgow');
const shotDir = path.join('C:', '\\', 'Users', 'mraiw', 'Desktop', '1461-apex-shots');

// id -> output name. Order is page order.
const SECTIONS = [
  ['top', 'hero'],
  ['what', 'who-we-are'],
  ['how', 'coaching'],
  ['timetable', 'timetable'],
  ['stories', 'members'],
  ['community', 'community'],
  ['reviews', 'on-camera'],
  ['faq', 'questions'],
  ['start', 'trial'],
];

const KILL_MOTION = `
  *,*::before,*::after{animation:none!important;transition:none!important}
  .reveal,.rv,[data-reveal],.is-hidden{opacity:1!important;visibility:visible!important;transform:none!important}
  /* The cursor node is #cur / .cur ONLY. A [class*="cursor"] sweep also matches
     <html class="cursor-on"> and display:none's the entire document. */
  #cur,.cur{display:none!important}
`;

async function settle(page, ms) {
  await new Promise((r) => setTimeout(r, ms));
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] });

async function prep(page, width, height, dsf) {
  await page.setUserAgent(UA);
  await page.setViewport({ width, height, deviceScaleFactor: dsf });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
  // Park the pointer off-canvas so the custom cursor never renders mid-frame.
  await page.mouse.move(-50, -50);
  // Scroll the whole page to fire every lazy image and every reveal, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });
  await settle(page, 1500);
  await page.addStyleTag({ content: KILL_MOTION });
  // Force anything still transparent into view (reveals that never got their class removed).
  await page.evaluate(() => {
    document.querySelectorAll('section, section *').forEach((el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 1) el.style.setProperty('opacity', '1', 'important');
      if (cs.visibility === 'hidden') el.style.setProperty('visibility', 'visible', 'important');
      if (cs.transform && cs.transform !== 'none') el.style.setProperty('transform', 'none', 'important');
    });
  });
  await settle(page, 800);
}

await fs.mkdir(caseDir, { recursive: true });
await fs.mkdir(shotDir, { recursive: true });

console.log(`> ${URL}`);

// ---------- desktop sections ----------
const page = await browser.newPage();
await prep(page, 1600, 1000, 2);

for (const [id, name] of SECTIONS) {
  const el = await page.$(`#${id}`);
  if (!el) {
    console.log(`  MISS #${id}`);
    continue;
  }
  // Hide the sticky header for everything except the hero, where it belongs.
  await page.evaluate((keep) => {
    const h = document.querySelector('#hdr');
    if (h) h.style.display = keep ? '' : 'none';
  }, id === 'top');

  await el.scrollIntoView();
  await settle(page, 700);
  // The hero video needs a beat after the scroll to repaint.
  if (id === 'top') {
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page, 1200);
  }
  const out = path.join(shotDir, `${name}.png`);
  await el.screenshot({ path: out });
  const { size } = await fs.stat(out);
  console.log(`  ${name}.png  ${(size / 1024).toFixed(0)}KB`);
}

// ---------- mobile ----------
const mob = await browser.newPage();
await prep(mob, 414, 896, 3);
await mob.evaluate(() => window.scrollTo(0, 0));
await settle(mob, 1200);
await mob.screenshot({ path: path.join(shotDir, 'mobile-hero.png') });
console.log('  mobile-hero.png');

await browser.close();
console.log(`Done -> ${shotDir}`);
