import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const msgs = [];
page.on("console", (m) => msgs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => msgs.push(`[pageerror] ${e.message}`));
try {
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 40000 });
  await new Promise((r) => setTimeout(r, 2500));
} catch (e) { console.log("GOTO ERR", e.message); }
await browser.close();
// print only hydration-relevant messages, full text
const relevant = msgs.filter((m) => /hydrat|did not match|cannot be a child|server rendered|client|#418|in html/i.test(m));
console.log(relevant.length ? relevant.join("\n\n") : "No hydration messages captured. All messages:\n" + msgs.slice(0, 15).join("\n"));
