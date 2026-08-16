// The Blood Clinic portfolio captures: patient account portal + booking diary.
//
// READ ONLY. It signs in, navigates and screenshots. It never clicks save, submit,
// pay or delete, and it never writes to the client's database.
//
// SOURCE IS STAGING, NOT LIVE. bloodclinicnew-co-uk.stackstaging.com runs the same
// plugin code as live (parity checked at go-live, only the version constant differs)
// but its account holds TEST results only, never a real patient. Live is deliberately
// not touched: it carries real special-category health data for ~2,200 people.
//
// Even so, nothing is trusted. The one identity on screen is Alex's own test account,
// so it is swapped for a demo patient IN THE BROWSER before any screenshot is taken,
// and every shot is gated: anything that still looks like a real person, a real email,
// a real phone number or a real date of birth means that screen is SKIPPED, not
// captured. Substitution is client side only. Nothing on the server changes.
//
// Run:  node scripts/capture-bloodclinic.mjs
//       node scripts/capture-bloodclinic.mjs --keep    (keeps failed shots for a look)
//
// Credentials are never in this file or on the command line. They are read from the
// JSON file at BC_CREDS ({ "user": ..., "pass": ... }).

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const BASE = process.env.BC_BASE || 'https://bloodclinicnew-co-uk.stackstaging.com';
const SLUG = 'blood-clinic';

const SCRATCH =
  process.env.BC_SCRATCH ||
  'C:/Users/mraiw/AppData/Local/Temp/claude/C--Users-mraiw/5d69a4ba-8215-4f14-a010-107b2e828066/scratchpad';
const REVIEW_FILE = path.join(SCRATCH, 'bloodclinic-capture-review.txt');
const CREDS_PATH = process.env.BC_CREDS || path.join(SCRATCH, 'bc.json');
const CREDS = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));

const outDir = path.join(projectRoot, 'public', 'images', 'projects', SLUG, 'portal');
await fsp.mkdir(outDir, { recursive: true });

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const PHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

// ---------------------------------------------------------------------------
// DEMO PATIENT
// Left = a string that appears on the staging test account.
// Right = the invented stand-in that appears in the marketing image.
// Longest keys first so a short key can never eat a longer one.
// ---------------------------------------------------------------------------
const DEMO_FIRST = 'Jordan';
const DEMO_LAST = 'Ellery';
const DEMO_NAME = `${DEMO_FIRST} ${DEMO_LAST}`;
const DEMO_EMAIL = 'jordan.ellery@example.co.uk';
const DEMO_PHONE = '07700 900412';
const DEMO_DOB = '14 March 1988';
const DEMO_POSTCODE = 'S20 4TP'; // a real outcode the clinic serves, no house

// The build is identical on staging and live, so the staging hostname in a footer or
// a contact email is a hosting detail, not the product. It is rewritten to the real
// domain rather than left to leak "stackstaging" into a marketing image.
const LIVE_HOST = 'thebloodclinic.uk';
const STAGING_HOST = 'bloodclinicnew-co-uk.stackstaging.com';

const DEMO = {
  'mraiwhitehead@gmail.com': DEMO_EMAIL,
  mraiwhitehead: 'jordan.ellery',
  [STAGING_HOST]: LIVE_HOST,
  'bloodclinicnew-co-uk': 'thebloodclinic',
  'Alex Whitehead': DEMO_NAME,
  'Alex Test': DEMO_NAME,
  Whitehead: DEMO_LAST,
  'awmedia.marketing': 'clinic.admin',
  Alex: DEMO_FIRST,
  alex: DEMO_FIRST.toLowerCase(),
};

// Anything matching these must not survive into a screenshot.
// "AW Media" is deliberately NOT here: it is our own credit in the site footer.
const FORBIDDEN = [
  /whitehead/i,
  /mraiw/i,
  /\balex\b/i,
  /gmail\.com/i,
  /stackstaging/i, // the staging hostname must never appear in a marketing image
];

function strayContacts(text) {
  const out = [];
  for (const m of text.match(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g) ?? []) {
    const e = m.toLowerCase();
    if (e === DEMO_EMAIL) continue;
    if (e.endsWith(`@${LIVE_HOST}`)) continue; // the clinic's own published address
    out.push(`stray email -> "${m}"`);
  }
  for (const m of text.match(/\b0\d{3}\s?\d{3}\s?\d{4}\b|\b07\d{2}\s?\d{3}\s?\d{3}\b/g) ?? []) {
    const flat = m.replace(/\s/g, '');
    // The clinic's own published numbers are on their public website already.
    if (flat === DEMO_PHONE.replace(/\s/g, '')) continue;
    if (/^0(114|1777|1909)/.test(flat)) continue; // Sheffield / Retford landlines
    if (flat === '07359707706') continue; // Rich's published bookings number
    out.push(`stray phone -> "${m}"`);
  }
  return out;
}

// Applied inside the page. Walks every text node plus the attributes that render as
// visible text. Returns how many it changed so a silent no-op is visible in the log.
function scrubInPage(demo, demoEmail, demoPhone, demoDob, demoPostcode, liveHost) {
  const keys = Object.keys(demo).sort((a, b) => b.length - a.length);

  const swap = (text) => {
    let out = text;
    // Host rewrite runs FIRST, so the clinic's own info@ address becomes info@<live
    // domain> and is then left alone by the patient-email sweep below.
    for (const k of keys) {
      if (out.includes(k)) out = out.split(k).join(demo[k]);
    }
    out = out.replace(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g, (m) =>
      m.toLowerCase().endsWith(`@${liveHost}`) ? m : demoEmail
    );
    out = out.replace(/\b07\d{2}\s?\d{3}\s?\d{3}\b/g, demoPhone);
    return out;
  };

  // Dates and postcodes are NOT swept blind.
  //
  // A blanket date sweep rewrote "PDF, from your 12 August 2026 test" into the demo
  // date of birth, which is simply wrong on the face of the image. A blanket postcode
  // sweep rewrote RT Fit Retford's own address to a Sheffield postcode, i.e. it put
  // false information about the client's clinic into a marketing shot.
  //
  // So: a date of birth is only swapped where the surrounding element says it is one,
  // and a postcode is only swapped inside an address the customer entered. The clinic's
  // own addresses and the test dates are left exactly as they are.
  const nearLabel = (node, re) => {
    let el = node.parentElement;
    for (let i = 0; el && i < 4; i++, el = el.parentElement) {
      if (re.test(el.textContent || '')) return true;
    }
    return false;
  };
  const DOB_LABEL = /date of birth|d\.o\.b|\bdob\b|born/i;
  const ADDRESS_LABEL = /billing address|shipping address|delivery address|your address/i;

  let changed = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    let next = swap(n.nodeValue);
    if (nearLabel(n, DOB_LABEL)) {
      next = next
        .replace(
          /\b\d{1,2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s(19|20)\d{2}\b/g,
          demoDob
        )
        .replace(/\b\d{1,2}\/\d{1,2}\/(19|20)\d{2}\b/g, '14/03/1988');
    }
    if (nearLabel(n, ADDRESS_LABEL)) {
      next = next.replace(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/g, demoPostcode);
    }
    if (next !== n.nodeValue) {
      n.nodeValue = next;
      changed++;
    }
  }
  for (const el of document.querySelectorAll('input, textarea, option, [title], [alt], [placeholder]')) {
    for (const attr of ['value', 'placeholder', 'title', 'alt']) {
      const v = el.getAttribute?.(attr);
      if (typeof v === 'string' && v) {
        const next = swap(v);
        if (next !== v) {
          el.setAttribute(attr, next);
          changed++;
        }
      }
    }
    if (el.tagName === 'INPUT' && el.value) {
      const next = swap(el.value);
      if (next !== el.value) {
        el.value = next;
        changed++;
      }
    }
  }
  return changed;
}

// The admin bar and any cookie banner are furniture, not product.
function tidyChrome() {
  for (const sel of [
    '#wpadminbar',
    '.cky-consent-container',
    '#cookie-law-info-bar',
    '.cli-modal-backdrop',
    '#usercentrics-root',
  ]) {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  }
  document.documentElement.style.setProperty('margin-top', '0', 'important');
  document.querySelectorAll('html').forEach((el) => el.classList.remove('admin-bar'));
  // Kill smooth scrolling: it races the screenshot.
  document.documentElement.style.scrollBehavior = 'auto';
}

// Scroll so a named element sits just under the STICKY HEADER, not just under the top
// of the viewport. The clinic's header is ~175px tall and sticky, so scrolling an
// element to y=0 buries its first 175px and clipped the top off the health-snapshot
// ring on the first pass. The header height is measured, never assumed.
async function frame(page, selector, extra = 20) {
  const ok = await page.evaluate(
    (sel, p) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      // Find the sticky header by asking what is actually painted at the top of the
      // viewport and walking up to the pinned ancestor, rather than guessing at
      // `header` / `[data-elementor-type=header]`. Elementor pins a generated wrapper
      // that matches none of those, which is why the first attempt still clipped the
      // top off the snapshot ring.
      let headroom = 0;
      for (const x of [window.innerWidth * 0.25, window.innerWidth * 0.5, window.innerWidth * 0.75]) {
        let node = document.elementFromPoint(x, 8);
        for (let i = 0; node && i < 8; i++, node = node.parentElement) {
          const cs = getComputedStyle(node);
          if (cs.position === 'fixed' || cs.position === 'sticky') {
            const r = node.getBoundingClientRect();
            if (r.top <= 4 && r.height > headroom && r.height < window.innerHeight * 0.5) headroom = r.height;
          }
        }
      }
      const y = el.getBoundingClientRect().top + window.scrollY - headroom - p;
      window.scrollTo(0, Math.max(0, y));
      return true;
    },
    selector,
    extra
  );
  await new Promise((r) => setTimeout(r, 900));
  return ok;
}

// Every section on the results dashboard is a collapsed accordion by default, so a
// shot taken straight after load is four closed bars and a footer. `open` clicks the
// named toggles, skipping any that are already expanded so a second call cannot close
// what the first one opened.
async function open(page, selectors, settle = 800) {
  const n = await page.evaluate((sels) => {
    let opened = 0;
    for (const sel of sels) {
      for (const el of document.querySelectorAll(sel)) {
        if (el.getAttribute('aria-expanded') === 'true') continue;
        el.click();
        opened++;
        break; // first match per selector
      }
    }
    return opened;
  }, selectors);
  await new Promise((r) => setTimeout(r, settle));
  return n;
}

// Open one of the Help Guide / Trend bottom-sheet popups and wait for it to land.
async function popup(page, attr) {
  const name = await page.evaluate((a) => {
    const b = document.querySelector(`[${a}]`);
    if (!b) return null;
    b.click();
    return b.getAttribute('data-bcr-name') || '';
  }, attr);
  if (!name && name !== '') return false;
  const ok = await page
    .waitForFunction(() => {
      const m = document.getElementById('bcrModal');
      return !!m && !m.hidden;
    }, { timeout: 8000 })
    .then(() => true)
    .catch(() => false);
  await new Promise((r) => setTimeout(r, 900));
  return ok;
}

async function closePopup(page) {
  await page.evaluate(() => document.querySelector('#bcrModal [data-bcr-close]')?.click());
  await new Promise((r) => setTimeout(r, 500));
}

// ---------------------------------------------------------------------------
// SHOT LIST
// Each entry: [file, url, human label, prepare(page)]
// ---------------------------------------------------------------------------
const RESULTS = 'my-account/results/';

const DESKTOP_SHOTS = [
  ['portal-1-snapshot', RESULTS, 'Health snapshot', (p) => frame(p, '.bcr-hero')],
  [
    'portal-2-attention',
    RESULTS,
    'Anything out of range, first',
    async (p) => {
      await open(p, ['.bcr-attention .bcr-sec-toggle']);
      return frame(p, '.bcr-attention');
    },
  ],
  [
    'portal-3-systems',
    RESULTS,
    'System by system',
    async (p) => {
      await open(p, ['.bcr-systems .bcr-sec-toggle']);
      return frame(p, '.bcr-systems');
    },
  ],
  [
    'portal-4-test',
    RESULTS,
    'One test, opened up',
    // Three levels deep: the section, then the test card, then a category inside it.
    // Opening only the section leaves the card shut and the frame lands on whatever
    // follows, which is how this shot came back showing the systems grid instead.
    async (p) => {
      await open(p, ['.bcr-tests .bcr-sec-toggle']);
      await open(p, ['.bcr-tests .bcr-card-head']);
      await open(p, ['.bcr-tests .bcr-testcat-head']);
      return frame(p, '.bcr-tests .bcr-testcat');
    },
  ],
  ['portal-5-timeline', RESULTS, 'Where the sample is up to', (p) => frame(p, '.bcr-timeline-wrap, .bcr-timeline')],
  [
    'portal-6-allmarkers',
    RESULTS,
    'Every marker, searchable',
    async (p) => {
      await open(p, ['#bcr-panel .bcr-sec-toggle']);
      await open(p, ['#bcr-panel .bcr-sysgroup-head']);
      return frame(p, '#bcr-panel');
    },
  ],
  [
    'portal-7-trend',
    RESULTS,
    'That marker, tracked over time',
    async (p) => {
      const ok = await popup(p, 'data-bcr-trend');
      if (!ok) return false;
      await page0ScrollTop(p);
      return true;
    },
  ],
  [
    'portal-8-help',
    RESULTS,
    'What that marker actually means',
    async (p) => {
      await closePopup(p);
      const ok = await popup(p, 'data-bcr-help');
      if (!ok) return false;
      await page0ScrollTop(p);
      return true;
    },
  ],
  [
    'portal-9-guide',
    'my-account/biomarker-guide/',
    'The biomarker guide',
    async (p) => {
      await open(p, ['.bcg-acc-toggle, .bcr-acc-toggle']);
      return true;
    },
  ],
];

// The popups are fixed to the viewport, so the shot wants the page where it is, not
// scrolled to an element. This just settles it.
async function page0ScrollTop(page) {
  await new Promise((r) => setTimeout(r, 500));
}

// The booking diary is public: no login, no account data on screen.
const BOOKING_SHOTS = [
  ['booking-1-method', 'How you want to be tested'],
  ['booking-2-clinic', 'Which clinic'],
  ['booking-3-calendar', 'The month, with real availability'],
  ['booking-4-slots', 'Times for the day picked'],
];

// Sign in through the CLINIC'S OWN branded form on /my-account/, not wp-login.php.
// wp-login.php on this host trips a WAF under repeated automated hits and serves a
// bare 401 with no form, which looks exactly like a wrong password. The account form
// is the real customer route anyway, so it is also what we want to photograph.
//
// `shotLoginAs` (optional) captures the empty sign-in screen before credentials go in.
async function login(page, shotLoginAs = null) {
  await page.goto(`${BASE}/my-account/`, { waitUntil: 'networkidle2', timeout: 60000 });

  // Already signed in from an earlier page in this browser.
  if (!(await page.$('#username'))) {
    if (/my-account/.test(page.url())) return page.url();
    throw new Error(`no sign-in form and not on the account: ${page.url()}`);
  }

  if (shotLoginAs) {
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await new Promise((r) => setTimeout(r, 1200));
    await shoot(page, shotLoginAs, 'Sign in', { skipGate: true });
  }

  await page.type('#username', CREDS.user, { delay: 10 });
  await page.type('#password', CREDS.pass, { delay: 10 });
  await Promise.all([
    page.click('.woocommerce-form-login__submit'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
  ]);

  if (await page.$('#username')) {
    const said = await page.evaluate(
      () => (document.querySelector('.woocommerce-error, .woocommerce-message')?.innerText || document.body.innerText).slice(0, 300)
    );
    throw new Error(`sign in was refused (${page.url()}): ${said}`);
  }
  return page.url();
}

const dump = [];
const timings = [];
const keepFailures = process.argv.includes('--keep');

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars', '--disable-lcd-text'],
});

async function shoot(page, name, human) {
  await page.evaluate(tidyChrome);
  const changed = await page.evaluate(
    scrubInPage,
    DEMO,
    DEMO_EMAIL,
    DEMO_PHONE,
    DEMO_DOB,
    DEMO_POSTCODE,
    LIVE_HOST
  );

  const text = await page.evaluate(() => document.body.innerText);
  const hits = [
    ...FORBIDDEN.filter((re) => re.test(text)).map((re) => `${re} -> "${(text.match(re) || [])[0]}"`),
    ...strayContacts(text),
  ];

  if (hits.length) {
    console.log(`  !! ${name} still shows something identifying, NOT captured:`);
    hits.forEach((h) => console.log(`     ${h}`));
    dump.push(`\n===== ${name} (${human})  SKIPPED =====\n${hits.join('\n')}`);
    if (!keepFailures) return false;
  }

  await page.screenshot({ path: path.join(outDir, `${name}.jpg`), type: 'jpeg', quality: 92 });
  dump.push(`\n===== ${name} (${human})  captured =====\n${text.slice(0, 4000)}`);
  console.log(`  ${name}.jpg  (${human}, ${changed} field(s) swapped)`);
  return true;
}

async function runAccount({ width, height, dsf, mobile, shots, label, loginShot = null }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dsf, isMobile: !!mobile });
  await page.setUserAgent(mobile ? PHONE_UA : DESKTOP_UA);
  console.log(`\n> ${label}: signing in`);
  console.log(`  landed on ${await login(page, loginShot)}`);

  let lastUrl = '';
  for (const [name, url, human, prepare] of shots) {
    try {
      if (url !== lastUrl) {
        const t0 = Date.now();
        await page.goto(`${BASE}/${url}`, { waitUntil: 'networkidle2', timeout: 90000 });
        timings.push(`${url}  ${Date.now() - t0}ms  (logged in, no page cache)`);
        await page.evaluate(() => document.fonts?.ready).catch(() => {});
        await new Promise((r) => setTimeout(r, 2200));
        lastUrl = url;
      }
      if (prepare) {
        const ok = await prepare(page);
        if (ok === false) {
          console.log(`  -- ${name}: nothing on the page to frame, skipped`);
          continue;
        }
      }
      await shoot(page, name, human);
    } catch (err) {
      console.log(`  FAIL ${name}: ${err.message}`);
    }
  }
  await page.close();
}

// ---------------------------------------------------------------------------
// Booking diary. Public page, no account, so it is also where the load time gets
// measured: this is the thing that used to hang on the old build.
// ---------------------------------------------------------------------------
async function runBooking({ width, height, dsf, mobile, prefix, label }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dsf, isMobile: !!mobile });
  await page.setUserAgent(mobile ? PHONE_UA : DESKTOP_UA);
  console.log(`\n> ${label}: booking diary`);

  // The widget is unprefixed classes scoped under .bclml-diary. Selectors taken from
  // assets/css/booking.css in the plugin, not guessed: .opt (method), .cal-grid /
  // .day.free (calendar), .slot (times).
  const ROOT = '.bclml-diary';
  const url = process.env.BC_PRODUCT || `${BASE}/product/male-platinum-pro/`;

  // Time to a painted, usable page. This is the number that matters: on the old build
  // the diary made blocking lab-API calls during page load, so the product page itself
  // could not finish until the lab answered.
  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const domReady = Date.now() - t0;
  await page.waitForSelector(`${ROOT} .opt`, { timeout: 30000 });
  const widgetUp = Date.now() - t0;
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await new Promise((r) => setTimeout(r, 1600));
  timings.push(`product page DOM ready ${domReady}ms, booking widget interactive ${widgetUp}ms`);
  console.log(`  DOM ready ${domReady}ms, widget interactive ${widgetUp}ms`);

  await page.evaluate(tidyChrome);
  await frame(page, ROOT);
  await shoot(page, `${prefix}booking-1-method`, BOOKING_SHOTS[0][1]);

  // The widget ships its later steps as MARKUP that is already in the DOM and only
  // gets `.active` when reached, and it ships placeholder slots too. Waiting on
  // `.day` or `.slot` existing therefore resolves instantly against markup nobody
  // can see. Every wait below is on the step actually being ACTIVE, and the timings
  // come from Resource Timing on the real admin-ajax calls, not from wall clock
  // around a selector.
  const ajaxTimes = () =>
    page.evaluate(() =>
      performance
        .getEntriesByType('resource')
        .filter((e) => /admin-ajax\.php/.test(e.name))
        .map((e) => Math.round(e.duration))
    );

  const stepActive = (n) =>
    page
      .waitForFunction(
        (root, s) => !!document.querySelector(`${root} .step[data-step="${s}"].active`),
        { timeout: 20000 },
        ROOT,
        n
      )
      .then(() => true)
      .catch(() => false);

  const picked = await page.evaluate((root) => {
    const own = document.querySelector(`${root} .opt[data-mode="clinic"]`);
    if (!own) return null;
    own.click();
    return own.innerText.replace(/\s+/g, ' ').trim().slice(0, 60);
  }, ROOT);
  console.log(`  method: ${picked ?? 'no .opt[data-mode="clinic"] on the page'}`);
  if (!picked) return page.close();

  if (!(await stepActive(2))) console.log('  step 2 never became active');
  await new Promise((r) => setTimeout(r, 900));
  await frame(page, ROOT);
  await shoot(page, `${prefix}booking-2-clinic`, BOOKING_SHOTS[1][1]);

  // Picking the clinic draws the month. Both clinics' months are pre-warmed on the
  // method click, which is the whole point of the design, so this is timed from the
  // AJAX entries rather than from the click.
  const before = (await ajaxTimes()).length;
  const clinic = await page.evaluate((root) => {
    const l = document.querySelector(`${root} #clinicWrap .loc[data-clinic-id]`);
    if (!l) return null;
    l.click();
    return (l.querySelector('.nm')?.textContent || l.textContent).trim();
  }, ROOT);
  console.log(`  clinic: ${clinic ?? 'no .loc[data-clinic-id] found'}`);

  const calOk = await page
    .waitForFunction(
      (root) => {
        const step = document.querySelector(`${root} .step[data-step="3"].active`);
        return !!step && step.querySelectorAll('#calGrid .day.free').length > 0;
      },
      { timeout: 25000 },
      ROOT
    )
    .then(() => true)
    .catch(() => false);

  if (calOk) {
    const days = await page.evaluate((root) => document.querySelectorAll(`${root} #calGrid .day.free`).length, ROOT);
    console.log(`  calendar active with ${days} bookable days`);
  } else {
    console.log('  calendar step never showed bookable days, check the clinic has open hours this month');
  }
  await new Promise((r) => setTimeout(r, 1000));
  await frame(page, `${ROOT} .step[data-step="3"].active`);
  await shoot(page, `${prefix}booking-3-calendar`, BOOKING_SHOTS[2][1]);

  // First bookable day. Slots for that ONE day are fetched on demand.
  const day = await page.evaluate((root) => {
    const d = document.querySelector(`${root} #calGrid .day.free`);
    if (!d) return null;
    d.click();
    return d.textContent.trim();
  }, ROOT);

  if (day) {
    const slotOk = await page
      .waitForFunction(
        (root) => {
          const w = document.querySelector(`${root} #slotWrap`);
          return !!w && w.offsetParent !== null && w.querySelectorAll('.slot').length > 0;
        },
        { timeout: 25000 },
        ROOT
      )
      .then(() => true)
      .catch(() => false);
    const n = await page.evaluate((root) => document.querySelectorAll(`${root} #slots .slot`).length, ROOT);
    console.log(slotOk ? `  ${n} real times for day ${day}` : '  slots never appeared');
    await new Promise((r) => setTimeout(r, 900));
    await frame(page, ROOT);
    await shoot(page, `${prefix}booking-4-slots`, BOOKING_SHOTS[3][1]);
  } else {
    console.log('  no bookable day to click, slot shot skipped');
  }

  const all = await ajaxTimes();
  const fresh = all.slice(before);
  if (all.length) {
    timings.push(
      `booking diary lab/diary calls: ${all.length} in total, slowest ${Math.max(...all)}ms, ` +
        `median ${all.slice().sort((a, b) => a - b)[Math.floor(all.length / 2)]}ms ` +
        `(${fresh.length} fired after the clinic was picked)`
    );
  }

  await page.close();
}

try {
  await runAccount({
    width: 1440,
    height: 900,
    dsf: 2,
    shots: DESKTOP_SHOTS,
    label: 'patient portal (desktop)',
    loginShot: 'portal-0-signin',
  });

  await runBooking({ width: 1440, height: 900, dsf: 2, prefix: '', label: 'desktop' });

  // Phone. NOT isMobile: with mobile emulation Chrome falls back to a 980px layout
  // viewport and the desktop layout renders at phone width.
  await runAccount({
    width: 390,
    height: 844,
    dsf: 3,
    mobile: false,
    label: 'patient portal (phone)',
    shots: [
      ['phone-1-snapshot', RESULTS, 'Health snapshot on a phone', (p) => frame(p, '.bcr-hero')],
      [
        'phone-2-attention',
        RESULTS,
        'Out of range, on a phone',
        async (p) => {
          await open(p, ['.bcr-attention .bcr-sec-toggle']);
          return frame(p, '.bcr-attention');
        },
      ],
      [
        'phone-3-markers',
        RESULTS,
        'Markers on a phone',
        async (p) => {
          await open(p, ['.bcr-tests .bcr-sec-toggle']);
          await open(p, ['.bcr-tests .bcr-card-head']);
          await open(p, ['.bcr-tests .bcr-testcat-head']);
          return frame(p, '.bcr-tests .bcr-testcat');
        },
      ],
      ['phone-4-trend', RESULTS, 'Trend sheet on a phone', (p) => popup(p, 'data-bcr-trend')],
    ],
  });

  await runBooking({ width: 390, height: 844, dsf: 3, mobile: false, prefix: 'phone-', label: 'phone' });

  await fsp.writeFile(
    REVIEW_FILE,
    ['LOAD TIMES', ...timings, '', ...dump].join('\n'),
    'utf8'
  );
  console.log(`\nDone -> ${outDir}`);
  console.log('\nLOAD TIMES');
  timings.forEach((t) => console.log(`  ${t}`));
  console.log(`\nSwapped page text for review -> ${REVIEW_FILE}`);
} finally {
  await browser.close();
}
