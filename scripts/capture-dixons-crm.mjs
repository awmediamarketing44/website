// Dixons Dispatch CRM captures for the portfolio case study.
//
// READ ONLY. It logs in, navigates and screenshots. It never clicks save, submit
// or delete, and it never writes to the client's database.
//
// The CRM is in live operational use, so every real name, company, email, phone
// number and money figure is swapped for demo data IN THE BROWSER before any
// screenshot is taken. The substitution is client side only. Nothing on the
// server changes.
//
// Run:  node scripts/capture-dixons-crm.mjs
//
// One pass. For each screen it swaps in demo data, checks nothing real survived,
// screenshots it, and writes the swapped page text to a review file so the result
// can be read back without opening every image. A screen that still shows real
// data is SKIPPED and reported rather than captured.
//
// Credentials are never in this file or on the command line. They are read from
// the JSON file at DX_CREDS ({ "email": ..., "pass": ..., "driverEmail": ..., "driverPass": ... }).

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const BASE = 'https://crm.dixonsdispatch.co.uk';
const SLUG = 'dixons-dispatch';
// Written outside the repo: it is a record of what the swapped screens now say.
const REVIEW_FILE =
  process.env.DX_REVIEW ||
  'C:/Users/mraiw/AppData/Local/Temp/claude/C--Users-mraiw/f1f3668f-050f-4a2c-8815-de8609f5cae3/scratchpad/dixons-crm-review.txt';

const CREDS_PATH =
  process.env.DX_CREDS ||
  'C:/Users/mraiw/AppData/Local/Temp/claude/C--Users-mraiw/f1f3668f-050f-4a2c-8815-de8609f5cae3/scratchpad/dx.json';
const CREDS = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));

const outDir = path.join(projectRoot, 'public', 'images', 'projects', SLUG, 'crm');
await fsp.mkdir(outDir, { recursive: true });

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const PHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';

// ---------------------------------------------------------------------------
// DEMO DATA
// Left hand side = a real string that appears in the live CRM.
// Right hand side = the invented stand-in that appears in the marketing image.
// Longest keys are applied first so a short key can never eat a longer one.
// ---------------------------------------------------------------------------
const DEMO = {
  // Customer accounts and job titles
  'Lister Hospital': 'Northgate General',
  Lister: 'Northgate', // bare, e.g. an account name column. Longer key above wins first.
  'Watford General': 'St Aubrey Hospital',
  'Carter & Bloom': 'Halstead & Vane',
  'Carter and Bloom': 'Halstead and Vane',
  'Dartford Meds': 'Riverside Medical',
  'Royal Free': 'Queen Elizabeth',
  'QA Test Clinic': 'Brackley Clinic',
  'Northampton General': 'Wexford General',
  'Leicester Royal': 'Ashmoor Royal',
  'Addenbrooke': 'Fennimore',
  'Great Ormond': 'Hollybank',
  'Papworth': 'Ravensmere',
  'Mount Vernon': 'Cransley Park',
  'Luton and Dunstable': 'Bramwell and District',
  'Princess Alexandra': 'Princess Caroline',
  'Bedford Hospital': 'Ferrow Hospital',
  'Harlow': 'Marden',
  'Stevenage': 'Stevenage', // their own town, stays

  // Staff. Real people, so they get stand in names in a public image.
  'J. Dixon': 'A. Reeve',
  'M. Ford': 'D. Whitlock',
  'R. Patel': 'K. Almond',
  'S. Cole': 'N. Barrett',
  'T. Sharma': 'P. Naylor',
  'Jason Dixon': 'Alan Reeve',
  'Michael Ford': 'Daniel Whitlock',
  'Raj Patel': 'Kevin Almond',
  'Sam Cole': 'Neil Barrett',
  'Tariq Sharma': 'Paul Naylor',
  // Appears as the customer on a progressive lead-capture row, not as a user.
  'Benn Dixon': 'Bramwell Surgery',
  'AW Media (support)': 'Office admin',
  'Michelle Robertson': 'Diane Ashworth',
  'michelle.robertson': 'd.ashworth',

  // Vehicle registrations
  'AF26 NWL': 'BX24 KTM',
  'AF70 GNN': 'BX71 LRV',
  'NA18 HNP': 'BX18 HDC',
  'AF26NWL': 'BX24KTM',
  'AF70GNN': 'BX71LRV',
  'NA18HNP': 'BX18HDC',
};

// Anything matching these must not survive into a screenshot.
const FORBIDDEN = [
  /lister/i,
  /watford/i,
  /carter\s*(&|and)\s*bloom/i,
  /dartford meds/i,
  /royal free/i,
  /\bdixon\b(?!s)/i, // "Dixon" alone is the family. "Dixons Dispatch" is the brand and is fine.
  /j\.\s?dixon/i,
  /m\.\s?ford/i,
  /r\.\s?patel/i,
  /s\.\s?cole/i,
  /t\.\s?sharma/i,
  /nhs\.net/i,
  /@dixonsdispatch\.co\.uk/i,
  /AF26|AF70|NA18/i,
];

// The demo stand-ins the scrub writes IN. These must not be mistaken for real data
// by the checks below, or every screen fails its own gate.
const DEMO_EMAIL = 'bookings@demo-account.co.uk';
const DEMO_PHONE = '07700 900123';

// Any email, mobile or registration that is NOT a stand-in means one slipped through.
function strayContacts(text) {
  const out = [];
  const minted = new Set(
    [...SPARE_PLATES, ...Object.values(DEMO)]
      .filter((v) => typeof v === 'string' && /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/.test(v))
      .map((v) => v.replace(/\s/g, '').toUpperCase())
  );
  for (const m of text.match(/\b[A-Z]{2}\d{2}\s?[A-Z]{3}\b/g) ?? []) {
    if (!minted.has(m.replace(/\s/g, '').toUpperCase())) out.push(`stray registration -> "${m}"`);
  }
  for (const m of text.match(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g) ?? []) {
    if (m !== DEMO_EMAIL) out.push(`stray email -> "${m}"`);
  }
  for (const m of text.match(/\b07\d{2}\s?\d{3}\s?\d{3}\b/g) ?? []) {
    if (m.replace(/\s/g, '') !== DEMO_PHONE.replace(/\s/g, '')) out.push(`stray mobile -> "${m}"`);
  }
  return out;
}

// Applied inside the page. Walks every text node plus the attributes that render
// as visible text, and rewrites them. Returns what it changed for verification.
// Stand-in registrations. Module scope so the verification gate below can check
// against the same list the scrub hands out.
const SPARE_PLATES = ['BV22 OSF', 'BD23 MYT', 'BN70 ZKC', 'BJ21 WRD', 'BK69 THA', 'BP68 SLN'];

function scrubInPage(demo, SPARE_PLATES) {
  const keys = Object.keys(demo).sort((a, b) => b.length - a.length);

  // Any plate not already in the map gets its own stand-in, and the SAME stand-in
  // every time it appears. Collapsing them all onto one string put three different
  // vans on the fleet board under one registration.
  // Every string this scrub is allowed to leave alone, checked by MEMBERSHIP not by
  // prefix. A prefix test let a real "BV21 KLM" straight through because it happened
  // to start the same way as a stand-in.
  const MINTED = new Set(
    [...SPARE_PLATES, ...Object.values(demo)]
      .filter((v) => /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/.test(v))
      .map((v) => v.replace(/\s/g, '').toUpperCase())
  );
  const plateMap = Object.create(null);
  let plateNext = 0;
  const swapPlate = (m) => {
    const key = m.replace(/\s/g, '').toUpperCase();
    if (MINTED.has(key)) return m; // already a stand-in

    if (!plateMap[key]) {
      plateMap[key] = SPARE_PLATES[plateNext++ % SPARE_PLATES.length];
    }
    return plateMap[key];
  };

  const swap = (text) => {
    let out = text;
    for (const k of keys) {
      if (out.includes(k)) out = out.split(k).join(demo[k]);
    }
    // Emails: keep the shape, lose the person.
    out = out.replace(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g, 'bookings@demo-account.co.uk');
    // Mobile numbers. The office landline is on their public website already, so
    // it stays; personal mobiles do not.
    out = out.replace(/\b07\d{2}\s?\d{3}\s?\d{3}\b/g, '07700 900123');
    // Any leftover vehicle plate shaped string. A UK postcode cannot match this:
    // a postcode's inward half is always a digit followed by two letters.
    out = out.replace(/\b[A-Z]{2}\d{2}\s?[A-Z]{3}\b/g, swapPlate);
    return out;
  };

  let changed = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    const next = swap(n.nodeValue);
    if (next !== n.nodeValue) {
      n.nodeValue = next;
      changed++;
    }
  }
  // Visible attribute text: input values, placeholders, titles, alt text, options.
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
  // Avatar bubbles hold initials generated server side, so a swapped name can end up
  // sitting next to somebody else's letters. Re-derive them from the name shown.
  for (const av of document.querySelectorAll('.av, .av-sm')) {
    if (av.children.length) continue;
    if (!/^[A-Za-z]{1,3}$/.test((av.textContent || '').trim())) continue;
    const who = av.parentElement?.querySelector('.who');
    const name = (who?.firstChild?.textContent || who?.textContent || '').trim();
    const parts = name.split(/[\s.]+/).filter(Boolean);
    if (parts.length >= 2) {
      av.textContent = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      changed++;
    }
  }

  return changed;
}

// Board arrangement, index.php only.
//
// Live, the middle stages are empty (Benn is still running Access alongside this,
// so most jobs sit in New enquiry). A board with three empty columns undersells a
// product that works. This deals the DEMO cards out across the stages so the shot
// shows the pipeline doing its job, then fixes the column counts and the KPI tiles
// so nothing on screen contradicts anything else. Presentation only, in the browser,
// exactly like any product screenshot with sample data on it.
function arrangeBoard() {
  const cols = [...document.querySelectorAll('.board .col')];
  if (cols.length < 5) return 'board columns not found, left as it is';

  const headOf = (c) => c.querySelector('.col-head');
  const nameOf = (c) => (headOf(c)?.textContent || '').replace(/\d+/g, '').trim();
  const cardsOf = (c) => c.querySelector('.cards');

  const source = cols[0];
  const pool = [...cardsOf(source).querySelectorAll('.jc')];
  if (pool.length < 7) return `only ${pool.length} cards to deal, left as it is`;

  const hasDriver = (card) => !card.querySelector('select, .assign-select');
  const withDriver = pool.filter(hasDriver);
  const withoutDriver = pool.filter((c) => !hasDriver(c));

  // A card's driver sits in `.foot` as `.av-sm` (initials) + `.who` (name + status).
  // An unassigned card carries an assign form in the same `.foot` instead. Keep a
  // template so a card moved into an assigned or in-transit column gets a driver
  // rather than sitting there driverless.
  const chipTemplate = withDriver.map((c) => c.querySelector('.foot')).find((f) => f?.querySelector('.who'));
  const SPARE_DRIVERS = [
    ['K. Almond', 'KA'],
    ['N. Barrett', 'NB'],
    ['P. Naylor', 'PN'],
  ];
  let spare = 0;
  const giveDriver = (card) => {
    if (!chipTemplate || hasDriver(card)) return;
    const clone = chipTemplate.cloneNode(true);
    const [name, initials] = SPARE_DRIVERS[spare++ % SPARE_DRIVERS.length];
    const av = clone.querySelector('.av-sm');
    if (av) av.textContent = initials;
    const who = clone.querySelector('.who');
    // `.who` is the name followed by a <small> status. Replace only the name.
    if (who && who.firstChild) who.firstChild.textContent = name;
    card.querySelector('.foot')?.remove();
    card.appendChild(clone);
  };

  // Booked can be unassigned. Driver assigned and In transit should not be.
  const plan = [
    { col: cols[1], take: 3, prefer: withoutDriver },
    { col: cols[2], take: 2, prefer: withDriver },
    { col: cols[3], take: 2, prefer: withDriver },
  ];

  const used = new Set();
  const draw = (prefer, n) => {
    const out = [];
    for (const list of [prefer, pool]) {
      for (const c of list) {
        if (out.length >= n) break;
        if (used.has(c)) continue;
        used.add(c);
        out.push(c);
      }
    }
    return out;
  };

  for (const { col, take, prefer } of plan) {
    for (const card of draw(prefer, take)) {
      // A card landing in an assigned or in-transit column must not still be
      // offering "Assign driver".
      if (col !== cols[1]) giveDriver(card);
      cardsOf(col).appendChild(card);
    }
  }

  // Column counts follow whatever is actually in each column now.
  for (const c of cols) {
    const n = cardsOf(c).querySelectorAll('.jc').length;
    const head = headOf(c);
    if (!head) continue;
    const counter = [...head.querySelectorAll('*')]
      .reverse()
      .find((el) => !el.children.length && /^\d+$/.test((el.textContent || '').trim()));
    if (counter) counter.textContent = String(n);
  }

  // KPI tiles, so the headline figures agree with the board.
  const count = (i) => cardsOf(cols[i]).querySelectorAll('.jc').length;
  const figures = {
    'new enquiries': count(0),
    'on today': count(1) + count(2) + count(3),
    unassigned: [...document.querySelectorAll('.board .jc')].filter((c) => !hasDriver(c)).length,
    'delivered this week': count(4),
  };
  for (const tile of document.querySelectorAll('.kpi')) {
    const label = (tile.querySelector('.lab')?.textContent || '').trim().toLowerCase();
    const num = tile.querySelector('b');
    if (num && label in figures) num.textContent = String(figures[label]);
  }

  // The line under the page title carries its own totals. Make it agree with the tiles.
  const total = document.querySelectorAll('.board .jc').length;
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length) continue;
    const t = el.textContent || '';
    if (/\d+\s+live jobs/.test(t)) {
      el.textContent = t
        .replace(/\d+\s+live jobs/, `${total} live jobs`)
        .replace(/\d+\s+unassigned/, `${figures.unassigned} unassigned`);
    }
  }

  return `dealt cards across ${cols.length} stages, ${total} jobs on the board`;
}

// ---------------------------------------------------------------------------
const ADMIN_SHOTS = [
  ['crm-1-pipeline', 'index.php', 'Job pipeline'],
  ['crm-2-quote', 'quote.php', 'Quick quote'],
  ['crm-3-invoices', 'invoices.php', 'Monthly invoicing'],
  ['crm-4-checklists', 'checklists.php', 'Vehicle checks'],
  ['crm-5-routes', 'routes.php', 'Routes and rates'],
  ['crm-6-reports', 'reports.php', 'Reports'],
  ['crm-7-schedule', 'schedule.php', 'Schedule'],
  ['crm-8-driver-pay', 'driver-pay.php', 'Driver pay'],
];

const DRIVER_SHOTS = [
  ['crm-phone-1-today', 'driver.php', "Driver's day"],
  ['crm-phone-2-checklist', 'checklist.php', 'Vehicle check'],
];

async function login(page, email, pass) {
  await page.goto(`${BASE}/login.php`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.type('input[name="email"]', email, { delay: 8 });
  await page.type('input[type="password"]', pass, { delay: 8 });
  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
  ]);
  const url = page.url();
  if (/login|password/i.test(url)) {
    const said = await page.evaluate(() => document.body.innerText.slice(0, 200));
    throw new Error(`login did not land on the app (${url}): ${said}`);
  }
  return url;
}

const dump = [];

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars', '--disable-lcd-text'],
});

async function run(shots, { width, height, dsf, mobile, email, pass, label }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dsf, isMobile: !!mobile });
  await page.setUserAgent(mobile ? PHONE_UA : DESKTOP_UA);
  console.log(`\n> ${label}: signing in`);
  console.log(`  landed on ${await login(page, email, pass)}`);

  for (const [name, url, human] of shots) {
    try {
      await page.goto(`${BASE}/${url}`, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1800));

      const changed = await page.evaluate(scrubInPage, DEMO, SPARE_PLATES);

      if (url === 'index.php') {
        const how = await page.evaluate(arrangeBoard);
        console.log(`     board: ${how}`);
        await new Promise((r) => setTimeout(r, 400));
      }

      // Verify. Anything real that survived the swap stops the whole run rather
      // than quietly shipping a client's data into a public marketing image.
      const text = await page.evaluate(() => document.body.innerText);
      const hits = [
        ...FORBIDDEN.filter((re) => re.test(text)).map((re) => {
          const m = text.match(re);
          return `${re} -> "${m && m[0]}"`;
        }),
        ...strayContacts(text),
      ];
      if (hits.length) {
        console.log(`  !! ${url} still shows real data, NOT captured:`);
        hits.forEach((h) => console.log(`     ${h}`));
        dump.push(`\n=========== ${url}  (${human})  SKIPPED, real data survived ===========\n${hits.join('\n')}`);
        continue;
      }

      dump.push(`\n=========== ${url}  (${human})  captured ===========\n${text}`);

      await page.screenshot({
        path: path.join(outDir, `${name}.jpg`),
        type: 'jpeg',
        quality: 92,
      });
      console.log(`  ${name}.jpg  (${human}, ${changed} field(s) swapped for demo data)`);
    } catch (err) {
      console.log(`  FAIL ${name}: ${err.message}`);
    }
  }

  await page.goto(`${BASE}/logout.php`, { waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
  await page.close();
}

try {
  await run(ADMIN_SHOTS, {
    width: 1440,
    height: 900,
    dsf: 2,
    email: CREDS.email,
    pass: CREDS.pass,
    label: 'admin',
  });

  if (CREDS.driverEmail && CREDS.driverPass) {
    await run(DRIVER_SHOTS, {
      width: 390,
      height: 844,
      dsf: 3,
      // NOT isMobile. With mobile emulation on, Chrome falls back to a 980px layout
      // viewport and the desktop sidebar renders at phone width. A plain 390 viewport
      // makes the CSS see 390 and the real phone layout appears.
      mobile: false,
      email: CREDS.driverEmail,
      pass: CREDS.driverPass,
      label: 'driver (phone)',
    });
  } else {
    console.log('\n> driver phone shots skipped, no driver credentials in the creds file');
  }

  await fsp.writeFile(REVIEW_FILE, dump.join('\n'), 'utf8');
  console.log(`\nDone -> ${outDir}`);
  console.log(`Swapped page text for review -> ${REVIEW_FILE}`);
} finally {
  await browser.close();
}
