import puppeteer from "puppeteer";

const URLS = {
  "live-normal": "https://awmedia.marketing/",
  "live-pagespeed-off": "https://awmedia.marketing/?PageSpeed=off",
};

const run = async (name, url) => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const failed = [];
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`HTTP ${r.status()} ${r.url().slice(0, 80)}`); });
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 3000));
  } catch (e) { console.log(name, "GOTO ERR", e.message); }
  const c = await page.evaluate(() => ({
    video: document.querySelectorAll("video").length,
    motionEls: document.querySelectorAll("[style*='transform'], [data-motion], [data-framer]").length,
    imgs: document.querySelectorAll("img").length,
    brokenImgs: [...document.querySelectorAll("img")].filter(i => !i.complete || i.naturalWidth === 0).length,
    scripts: document.querySelectorAll("script").length,
    hasPageSpeed: !!document.querySelector("script[src*='pagespeed'], [data-pagespeed-url-hash]") || document.documentElement.outerHTML.includes("pagespeed"),
  })).catch((e) => ({ err: e.message }));
  await browser.close();
  console.log(`\n== ${name} ==`);
  console.log(JSON.stringify(c));
  console.log("failed:", failed.length ? [...new Set(failed)].slice(0, 8) : "none");
};

for (const [n, u] of Object.entries(URLS)) await run(n, u);
