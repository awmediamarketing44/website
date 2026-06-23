// QA the CRM form-submit bridge: load a live page, wait for the afterInteractive
// scripts to attach, then dispatch a synthetic postMessage as if it came from the
// CRM iframe and confirm GA4 (gtag) + dataLayer both receive the lead event.
// Also confirms a message from the WRONG origin is ignored.
import puppeteer from "puppeteer";

const URL = "https://awmedia.marketing/contact";
const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 3500)); // let afterInteractive scripts attach

const result = await page.evaluate(() => {
  // Spy on gtag + dataLayer
  const calls = { gtag: [], dl: [] };
  const realGtag = window.gtag;
  window.gtag = function (...a) {
    calls.gtag.push(a);
    if (typeof realGtag === "function") realGtag(...a);
  };
  window.dataLayer = window.dataLayer || [];
  const before = window.dataLayer.length;

  // 1) Legit message from the CRM origin — should fire
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://crm.awmedia.marketing",
      data: { awcrm: "submit", form_slug: "web-design", form_name: "Website enquiry" },
    })
  );

  // 2) Message from a hostile origin — should be ignored
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://evil.example.com",
      data: { awcrm: "submit", form_slug: "hacker", form_name: "nope" },
    })
  );

  const dlPushes = window.dataLayer.slice(before);
  return {
    gtagCalls: calls.gtag,
    dlPushes,
    sawAwSubmit: dlPushes.some((e) => e && e.event === "aw_form_submit"),
    sawHostile: dlPushes.some((e) => e && e.form_slug === "hacker"),
  };
});

await browser.close();

const fired =
  result.sawAwSubmit &&
  result.gtagCalls.some((c) => c[0] === "event" && c[1] === "generate_lead");
const blockedHostile = !result.sawHostile;

console.log("gtag calls:", JSON.stringify(result.gtagCalls));
console.log("dataLayer pushes:", JSON.stringify(result.dlPushes));
console.log(`${fired ? "PASS" : "FAIL"}  CRM submit -> generate_lead + aw_form_submit`);
console.log(`${blockedHostile ? "PASS" : "FAIL"}  hostile origin ignored`);

const ok = fired && blockedHostile;
console.log(`\n${ok ? "ALL PASS" : "FAILED"}`);
process.exit(ok ? 0 : 1);
