import puppeteer from "puppeteer";

const SITES = {
  live: "https://awmedia.marketing/",
  railway: "https://website-production-0939.up.railway.app/",
};

const run = async (name, url) => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const consoleErrors = [];
  const failed = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
  page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText} ${r.url().slice(0, 120)}`));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`HTTP ${r.status()} ${r.url().slice(0, 120)}`); });
  let title = "", err = "";
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    title = await page.title();
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: `C:/Users/mraiw/Desktop/diag-${name}.png`, fullPage: false });
  } catch (e) { err = e.message; }
  // count key elements
  const counts = await page.evaluate(() => ({
    nav: document.querySelectorAll("nav, header").length,
    footer: document.querySelectorAll("footer").length,
    video: document.querySelectorAll("video").length,
    imgs: document.querySelectorAll("img").length,
    brokenImgs: [...document.querySelectorAll("img")].filter(i => !i.complete || i.naturalWidth === 0).length,
    bodyLen: document.body.innerText.length,
  })).catch(() => ({}));
  await browser.close();
  console.log(`\n===== ${name.toUpperCase()} (${url}) =====`);
  console.log("title:", title, err ? `| ERROR: ${err}` : "");
  console.log("elements:", JSON.stringify(counts));
  console.log("console errors:", consoleErrors.length ? consoleErrors.slice(0, 8) : "none");
  console.log("failed requests:", failed.length ? [...new Set(failed)].slice(0, 12) : "none");
};

for (const [name, url] of Object.entries(SITES)) await run(name, url);
console.log("\nScreenshots: Desktop/diag-live.png  &  Desktop/diag-railway.png");
