// Capture the Onyx CMS back office + click-to-edit front end for the AW portfolio page.
// Real enquiry data is replaced with demonstration data in the DOM before any shot is taken,
// and the swap is asserted (the script exits non-zero if a real value survives).
// Run:  node scripts/capture-onyx-admin.mjs
import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const BASE = "https://onyxlagreeandco.com";
const USER = "onyx", PASS = "ShakeSweat-2026";
const OUT = path.resolve("public/images/projects/onyx-lagree/admin");
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const DEMO = [
  { who: "Sophie Bennett", mob: "07700 900118", em: "sophie.bennett@example.com", msg: "Hi, I have never tried Lagree before and I am a bit nervous. Is the taster class suitable for a complete beginner, and do I need to bring anything with me?" },
  { who: "Hannah Clarke",  mob: "07700 900412", em: "hannah.clarke@example.com",  msg: "Interested in the Mini membership. Do the eight classes have to be used in the same month, and can I book two classes in the same week?" },
  { who: "Megan Ellis",    mob: "07700 900307", em: "megan.ellis@example.com",    msg: "Is the hot mat room running yet? I would like to book a Lagree class and a hot mat session in the same week if that is possible." },
  { who: "Jade Marshall",  mob: "07700 900251", em: "jade.marshall@example.com",  msg: "Do you do gift vouchers? Looking to buy the three class taster pack for my sister for her birthday next month." },
];

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox","--disable-setuid-sandbox","--disable-lcd-text"] });
const page = await browser.newPage();
await page.setUserAgent(UA);
await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 2 });

const shot = async (name, sel, pad = 24) => {
  let clip = null;
  if (sel) {
    clip = await page.evaluate((s, p) => {
      const el = document.querySelector(s); if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.max(0, r.x - p), y: Math.max(0, r.y - p), w: Math.min(window.innerWidth, r.width + p*2), h: Math.min(window.innerHeight, r.height + p*2) };
    }, sel, pad);
    if (!clip) { console.log("MISS", sel, name); return; }
  }
  const buf = await page.screenshot({ type: "png", ...(clip ? { clip: { x: clip.x, y: clip.y, width: clip.w, height: clip.h } } : {}) });
  await sharp(buf).jpeg({ quality: 90 }).toFile(path.join(OUT, name + ".jpg"));
  console.log("shot", name);
};

// ---- login
await page.goto(BASE + "/manage/", { waitUntil: "networkidle2", timeout: 90000 });
await page.type('input[name="username"]', USER);
await page.type('input[name="password"]', PASS);
await Promise.all([page.waitForNavigation({ waitUntil: "networkidle2" }), page.click('button[type="submit"], .login-box button')]);
const loggedIn = await page.evaluate(() => !!document.querySelector('.enq, .empty, h1.page'));
if (!loggedIn) { console.error("LOGIN FAILED"); await browser.close(); process.exit(1); }
console.log("logged in");

// ---- swap real enquiry data for demonstration data, then PROVE the originals are gone
const originals = await page.evaluate((demo) => {
  const orig = [];
  document.querySelectorAll('.enq').forEach((row, i) => {
    const d = demo[i % demo.length];
    const who = row.querySelector('.who');
    const links = row.querySelectorAll('.contact a');
    const msg = row.querySelector('.msg');
    if (who) { orig.push(who.textContent.trim()); who.textContent = d.who; }
    if (links[0]) { orig.push(links[0].textContent.trim()); links[0].textContent = d.mob; links[0].href = 'tel:' + d.mob.replace(/\s/g,''); }
    if (links[1]) { orig.push(links[1].textContent.trim()); links[1].textContent = d.em; links[1].href = 'mailto:' + d.em; }
    if (msg) { orig.push(msg.textContent.trim()); msg.textContent = d.msg; }
    row.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = 'mailto:' + d.em; });
  });
  return orig;
}, DEMO);
const leak = await page.evaluate((orig) => {
  const t = document.body.innerText + ' ' + document.body.innerHTML;
  return orig.filter(o => o && o.length > 3 && t.includes(o));
}, originals);
if (leak.length) { console.error("REAL DATA STILL ON PAGE:", leak); await browser.close(); process.exit(1); }
console.log("demo data swapped, " + originals.length + " real values replaced and verified gone");

await page.evaluate(() => window.scrollTo(0, 0));
await sleep(400);
await shot("admin-inbox", null);

// ---- other panels: scroll each heading into view, shoot the viewport
const panels = [["Search (SEO)","admin-seo"],["Staff / Instructors","admin-staff"],["Settings","admin-settings"],["Analytics","admin-analytics"]];
for (const [label, name] of panels) {
  const ok = await page.evaluate((l) => {
    const h = [...document.querySelectorAll('.section-head h2')].find(x => x.textContent.trim().startsWith(l));
    if (!h) return false;
    const r = h.getBoundingClientRect(); window.scrollTo(0, window.scrollY + r.top - 40); return true;
  }, label);
  if (!ok) { console.log("MISS panel", label); continue; }
  await sleep(600);
  await shot(name, null);
}

// ---- edit mode on the live front end
await page.goto(BASE + "/api/editmode.php?on=1", { waitUntil: "networkidle2" });
await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 90000 });
await page.evaluate(() => { const b = [...document.querySelectorAll('.cc-btn')].find(x => x.dataset.cc === 'accepted'); if (b) b.click(); });
await sleep(1200);
const hasBar = await page.evaluate(() => !!document.querySelector('#onyxBar'));
console.log("edit bar present:", hasBar);
await shot("edit-bar", null);

// hover a headline to show the editable outline
await page.evaluate(() => { const el = document.querySelector('h1[data-edit], [data-edit]'); if (el) el.scrollIntoView({block:'center'}); });
await sleep(500);
const box = await page.evaluate(() => { const el = document.querySelector('h1[data-edit], [data-edit]'); if(!el) return null; const r = el.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2}; });
if (box) { await page.mouse.move(box.x, box.y); await sleep(700); }
await shot("edit-hover", null);

// the change-photo badge
const badge = await page.evaluate(() => {
  const b = document.querySelector('.onyx-img-badge'); if (!b) return null;
  b.scrollIntoView({ block: 'center' }); return true;
});
await sleep(900);
if (badge) await shot("edit-photo-badge", null);

// open the media library picker
if (badge) {
  const bp = await page.evaluate(() => { const b = document.querySelector('.onyx-img-badge'); const r = b.getBoundingClientRect(); return {x:r.x+r.width/2, y:r.y+r.height/2}; });
  await page.mouse.click(bp.x, bp.y);
  await sleep(2500);
  const open = await page.evaluate(() => !!document.querySelector('#onyxPicker.open'));
  console.log("picker open:", open);
  if (open) await shot("edit-media-library", null);
  await page.keyboard.press("Escape");
  await sleep(400);
}

// turn edit mode back OFF so the client's site is left exactly as we found it
await page.goto(BASE + "/api/editmode.php?on=0", { waitUntil: "networkidle2" });
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
const stillEditing = await page.evaluate(() => !!document.querySelector('#onyxBar'));
console.log(stillEditing ? "WARNING: edit mode still ON" : "edit mode left OFF (clean)");
await browser.close();
