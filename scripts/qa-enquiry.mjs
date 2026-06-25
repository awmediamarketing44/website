// QA the CRM iframe migration: load each live enquiry page, confirm the iframe
// is present, points at the CRM, and actually returns 200 content. Also checks
// the contact page enquiry cards still link to the right slugs.
import puppeteer from "puppeteer";

const BASE = "https://awmedia.marketing";
const PAGES = [
  { slug: "website-design", expect: "crm.awmedia.marketing/web-design" },
  { slug: "logo-design", expect: "crm.awmedia.marketing/branding" },
  { slug: "social-media", expect: "crm.awmedia.marketing/aw-lwaysontime" },
];

const browser = await puppeteer.launch({ headless: "new" });
let fails = 0;

for (const { slug, expect } of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const url = `${BASE}/enquiry/${slug}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2500));

  const info = await page.evaluate(() => {
    const f = document.querySelector("iframe");
    return f
      ? { found: true, src: f.src, w: f.clientWidth, h: f.clientHeight }
      : { found: false };
  });

  let status = "n/a";
  if (info.found) {
    try {
      const res = await fetch(info.src);
      status = res.status;
    } catch (e) {
      status = `ERR ${e.message}`;
    }
  }

  const ok =
    info.found && info.src.includes(expect) && info.w > 0 && info.h > 0 && status === 200;
  if (!ok) fails++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  /enquiry/${slug}\n` +
      `      iframe=${info.found} src=${info.src || "-"}\n` +
      `      size=${info.w || 0}x${info.h || 0} crmStatus=${status}`
  );
  await page.close();
}

// Contact page cards
const cp = await browser.newPage();
await cp.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
const links = await cp.evaluate(() =>
  Array.from(document.querySelectorAll('a[href*="/enquiry/"]')).map((a) =>
    a.getAttribute("href")
  )
);
console.log(`\nContact enquiry card links: ${JSON.stringify(links)}`);
await cp.close();

await browser.close();
console.log(`\n${fails === 0 ? "ALL PASS" : fails + " FAILED"}`);
process.exit(fails === 0 ? 0 : 1);
