import puppeteer from "puppeteer";

const bust = Date.now();
const PAGES = [
  "/",
  "/services/branding",
  "/industries/ev-automotive",
  "/locations/web-design-birmingham",
  "/free-audit",
];
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
for (const p of PAGES) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 90)));
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 90)); });
  const url = `https://awmedia.marketing${p}?v=${bust}`;
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise((r) => setTimeout(r, 1500));
  } catch (e) { console.log(p, "GOTO ERR", e.message); }
  const body = await page.evaluate(() => document.body.innerText);
  const emDash = (body.match(/—/g) || []).length;
  const doubledThe = /surrounding the (West Midlands|South West)/i.test(body);
  const fitnessLeak = /fitness industry is packed/i.test(body);
  await page.close();
  console.log(`\n${p}`);
  console.log(`  pageerrors: ${pageErrors.length ? pageErrors : "none ✓"}`);
  console.log(`  console-errors: ${consoleErrors.length ? consoleErrors : "none ✓"}`);
  console.log(`  em dashes in body: ${emDash === 0 ? "0 ✓" : emDash}`);
  if (p.includes("birmingham")) console.log(`  doubled 'the': ${doubledThe ? "STILL PRESENT ✗" : "fixed ✓"}`);
  if (p.includes("branding")) console.log(`  fitness leak: ${fitnessLeak ? "STILL PRESENT ✗" : "fixed ✓"}`);
}
await browser.close();
