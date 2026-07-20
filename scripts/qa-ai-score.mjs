// QA the /ai-score quiz: screenshot intro, quiz, gate, results (desktop + mobile intro).
import puppeteer from "puppeteer";

const BASE = "http://localhost:3000";
const OUT = process.argv[2] || ".";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 960 });

await page.goto(`${BASE}/ai-score`, { waitUntil: "networkidle0", timeout: 60000 });
await sleep(800);
await page.screenshot({ path: `${OUT}/1-intro.png`, fullPage: true });

// Start the test
const clickByText = async (text) => {
  const clicked = await page.evaluate((t) => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((x) => x.textContent.trim().toLowerCase().includes(t.toLowerCase()));
    if (b) { b.click(); return true; }
    return false;
  }, text);
  if (!clicked) throw new Error(`button not found: ${text}`);
};

await clickByText("Start the test");
await sleep(700);
await page.screenshot({ path: `${OUT}/2-question.png`, fullPage: false });

// Answer all 11 questions: pick the first option each time (max-opportunity path varies; first is fine)
for (let i = 0; i < 11; i++) {
  await page.evaluate(() => {
    const card = [...document.querySelectorAll("button")].filter(
      (b) => b.className.includes("rounded-xl") && b.className.includes("text-left")
    );
    if (card[0]) card[0].click();
  });
  await sleep(450);
}

// Calculating phase
await page.screenshot({ path: `${OUT}/3-calculating.png`, fullPage: false });
await sleep(3200);

// Gate with score teaser
await page.screenshot({ path: `${OUT}/4-gate.png`, fullPage: true });

// Fill the gate (intercept the POST so no real email/AC fires during QA)
await page.setRequestInterception(true);
page.on("request", (req) => {
  if (req.url().includes("/api/ai-score/lead")) {
    req.respond({ status: 200, contentType: "application/json", body: '{"success":true}' });
  } else req.continue();
});

await page.evaluate(() => {
  const set = (el, v) => {
    const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    s.call(el, v);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const inputs = [...document.querySelectorAll("form input")];
  const name = inputs.find((i) => i.placeholder === "Your name");
  const email = inputs.find((i) => i.placeholder === "you@email.com");
  const tel = inputs.find((i) => i.type === "tel");
  set(name, "QA Test");
  set(email, "qa@test.com");
  set(tel, "07123456789");
});
await sleep(300);
await clickByText("Unlock My Breakdown");
await sleep(2600);
// Scroll through the page so whileInView sections fire before the capture.
await page.evaluate(async () => {
  const step = window.innerHeight / 2;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 180));
  }
  window.scrollTo(0, 0);
});
await sleep(1500);
await page.screenshot({ path: `${OUT}/5-results.png`, fullPage: true });

// Mobile intro + free-audit hub
await page.setViewport({ width: 390, height: 844 });
await page.goto(`${BASE}/ai-score`, { waitUntil: "networkidle0" });
await sleep(600);
await page.screenshot({ path: `${OUT}/6-mobile-intro.png`, fullPage: true });

await page.setViewport({ width: 1440, height: 960 });
await page.goto(`${BASE}/free-audit`, { waitUntil: "networkidle0" });
await sleep(600);
await page.screenshot({ path: `${OUT}/7-free-audit-hub.png`, fullPage: true });

await browser.close();
console.log("QA screenshots done");
