// Diagnose page heights + content duplication for suspect routes.
// Loads each page, scrolls top-to-bottom to trigger whileInView animations,
// then reports: scrollHeight, viewport count, presence of duplicate H1s.
import puppeteer from "puppeteer";

const base = process.argv[2] || "http://localhost:3000";
const ROUTES = ["/", "/how-we-work", "/work", "/services", "/industries", "/blog", "/about", "/contact"];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${base}${route}`, { waitUntil: "networkidle2", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 800));

  // Scroll bottom-to-top so all whileInView triggers
  await page.evaluate(async () => {
    const sh = document.body.scrollHeight;
    for (let y = 0; y < sh; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  const info = await page.evaluate(() => {
    const sh = document.body.scrollHeight;
    const vh = window.innerHeight;
    const h1Texts = Array.from(document.querySelectorAll("h1")).map((h) => h.textContent?.trim().slice(0, 60));
    const h2Texts = Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim().slice(0, 60));
    const sections = document.querySelectorAll("section").length;
    // Find elements with very tall fixed/absolute positioning
    const tallElements = [];
    document.querySelectorAll("*").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.height > 3000 && el.tagName !== "BODY" && el.tagName !== "HTML") {
        tallElements.push({
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 60),
          h: Math.round(rect.height),
        });
      }
    });
    return { scrollHeight: sh, viewports: (sh / vh).toFixed(1), sections, h1Texts, h2Texts, tallElements: tallElements.slice(0, 8) };
  });

  console.log(`\n=== ${route} ===`);
  console.log(`  scrollHeight: ${info.scrollHeight}px (${info.viewports} viewports)`);
  console.log(`  sections: ${info.sections}`);
  console.log(`  H1 count: ${info.h1Texts.length}`);
  info.h1Texts.forEach((t) => console.log(`    H1: ${t}`));
  console.log(`  H2 count: ${info.h2Texts.length}`);
  info.h2Texts.slice(0, 6).forEach((t) => console.log(`    H2: ${t}`));
  if (info.tallElements.length) {
    console.log(`  Tall elements (>3000px):`);
    info.tallElements.forEach((e) => console.log(`    ${e.tag}.${e.cls.slice(0, 40)} = ${e.h}px`));
  }

  await page.close();
}

await browser.close();
