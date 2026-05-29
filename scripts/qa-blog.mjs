// Visual QA capture for the blog: index + sample of 3 posts on desktop + mobile.
import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = ".qa/blog";
await fs.mkdir(OUT, { recursive: true });

const ROUTES = [
  "/blog",
  "/blog/ai-built-in-30-seconds-is-a-scam",
  "/blog/web-design-for-fitness-coaches",
  "/blog/seo-for-personal-trainers",
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const route of ROUTES) {
  for (const device of [
    { name: "desktop", w: 1440, h: 900, mobile: false },
    { name: "mobile", w: 390, h: 844, mobile: true },
  ]) {
    const page = await browser.newPage();
    await page.setViewport({
      width: device.w,
      height: device.h,
      isMobile: device.mobile,
      hasTouch: device.mobile,
      deviceScaleFactor: 1,
    });
    try {
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 800));

      // Scroll prime for whileInView
      await page.evaluate(async () => {
        const sh = document.body.scrollHeight;
        for (let y = 0; y < sh + 500; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 400));

      const safe = route === "/blog" ? "_index" : route.replace("/blog/", "");
      await page.screenshot({
        path: path.join(OUT, `${safe}-${device.name}.jpg`),
        type: "jpeg",
        quality: 82,
        fullPage: true,
      });
      console.log(`captured ${route} ${device.name}`);
    } catch (e) {
      console.error(`FAIL ${route} ${device.name}:`, e.message);
    }
    await page.close();
  }
}

await browser.close();
console.log("done");
