// QA the call-booked tracking on the LIVE site: load a page, wait for the
// afterInteractive bridge to attach, then dispatch synthetic postMessages and
// confirm GA4 (gtag) + dataLayer + Meta (fbq Schedule) all receive the event:
//   1) relayed  { awcrm:'call_booked' } from the CRM iframe origin
//   2) direct   calendly.event_scheduled from the site's own Calendly modal
//   3) hostile  same payloads from a wrong origin -> ignored
import puppeteer from "puppeteer";

const URL = "https://awmedia.marketing/contact";
const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 3500)); // let afterInteractive scripts attach

const result = await page.evaluate(() => {
  const calls = { gtag: [], fbq: [] };
  const realGtag = window.gtag;
  window.gtag = function (...a) {
    calls.gtag.push(a);
    if (typeof realGtag === "function") realGtag(...a);
  };
  const realFbq = window.fbq;
  window.fbq = function (...a) {
    calls.fbq.push(a);
    if (typeof realFbq === "function") realFbq(...a);
  };
  window.dataLayer = window.dataLayer || [];
  const before = window.dataLayer.length;

  // 1) Relayed booking from the CRM thank-you iframe
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://crm.awmedia.marketing",
      data: { awcrm: "call_booked", form_slug: "web-design", form_name: "Website enquiry" },
    })
  );
  // 2) Direct booking in the site's own Calendly modal
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://calendly.com",
      data: { event: "calendly.event_scheduled", payload: {} },
    })
  );
  // 3) Hostile origins -> must be ignored
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://evil.example.com",
      data: { awcrm: "call_booked", form_slug: "hacker" },
    })
  );
  window.dispatchEvent(
    new MessageEvent("message", {
      origin: "https://evil.example.com",
      data: { event: "calendly.event_scheduled" },
    })
  );

  const dlPushes = window.dataLayer.slice(before);
  return {
    gtagCalls: calls.gtag,
    fbqCalls: calls.fbq,
    dlPushes,
    bookCallCount: calls.gtag.filter((c) => c[0] === "event" && c[1] === "book_call").length,
    scheduleCount: calls.fbq.filter((c) => c[0] === "track" && c[1] === "Schedule").length,
    dlBookedCount: dlPushes.filter((e) => e && e.event === "aw_call_booked").length,
    sawHostile: dlPushes.some((e) => e && e.form_slug === "hacker"),
  };
});

await browser.close();

console.log("gtag calls:", JSON.stringify(result.gtagCalls));
console.log("fbq calls:", JSON.stringify(result.fbqCalls));
console.log("dataLayer pushes:", JSON.stringify(result.dlPushes));

const relayOk = result.bookCallCount === 2 && result.dlBookedCount === 2 && result.scheduleCount === 2;
const blockedHostile = !result.sawHostile;
console.log(`${relayOk ? "PASS" : "FAIL"}  CRM relay + Calendly modal -> book_call x2, aw_call_booked x2, Meta Schedule x2`);
console.log(`${blockedHostile ? "PASS" : "FAIL"}  hostile origins ignored`);

const ok = relayOk && blockedHostile;
console.log(`\n${ok ? "ALL PASS" : "FAILED"}`);
process.exit(ok ? 0 : 1);
