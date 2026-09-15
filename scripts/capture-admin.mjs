// Authenticated back-end captures for portfolio case studies.
// READ ONLY: logs in, navigates, screenshots. Never clicks save/submit/delete.
//
// Credentials are NEVER stored here. Pass them at runtime:
//   ADMIN_EMAIL=... ADMIN_PASS=... node scripts/capture-admin.mjs <site>
//
// Writes to public/images/projects/<slug>/admin/.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const SITE = process.argv[2];
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASS;

const CONFIG = {
  pm: {
    slug: 'physique-method',
    loginUrl: 'https://physiquemethod.co.uk/admin/login.php',
    shots: [
      ['admin-1', 'https://physiquemethod.co.uk/admin/index.php'],
      ['admin-2', 'https://physiquemethod.co.uk/admin/edit.php?s=hero'],
      ['admin-3', 'https://physiquemethod.co.uk/admin/analytics.php'],
      ['admin-4', 'https://physiquemethod.co.uk/admin/edit.php?s=transformations'],
    ],
  },
  calibre: {
    slug: 'calibre-coaching',
    // Must be the explicit login.php. 20i auto-401s the bare /admin directory URL
    // behind a "Security Verification" reCAPTCHA gate that headless cannot pass.
    loginUrl: 'https://calibre-coaching.com/admin/login.php',
    shots: [
      ['admin-1', 'https://calibre-coaching.com/admin/index.php'],
      ['admin-2', 'https://calibre-coaching.com/admin/pages.php'],
      ['admin-3', 'https://calibre-coaching.com/admin/analytics.php'],
    ],
  },
};

const cfg = CONFIG[SITE];
if (!cfg || !EMAIL || !PASSWORD) {
  console.error('Usage: ADMIN_EMAIL=... ADMIN_PASS=... node scripts/capture-admin.mjs <pm|calibre>');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'public', 'images', 'projects', cfg.slug, 'admin');
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  );

  console.log(`> login ${cfg.loginUrl}`);
  await page.goto(cfg.loginUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));

  const emailSel = await page.evaluate(() => {
    const el = document.querySelector(
      'input[type="email"], input[name="email"], input[name="username"], input[name="user"]'
    );
    if (!el) return null;
    return el.name ? `input[name="${el.name}"]` : 'input[type="email"]';
  });
  if (!emailSel) throw new Error('no email field found on login page');

  await page.type(emailSel, EMAIL, { delay: 12 });
  await page.type('input[type="password"]', PASSWORD, { delay: 12 });
  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
  ]);
  await new Promise((r) => setTimeout(r, 2000));

  const landed = page.url();
  console.log(`  landed on ${landed}`);
  if (/login/i.test(landed)) {
    const body = await page.evaluate(() => document.body.innerText.slice(0, 300));
    throw new Error(`login failed. Page said: ${body}`);
  }

  for (const [name, url] of cfg.shots) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 2500));
      const title = await page.evaluate(() => document.title);

      // Blur anything that reads like personal contact data. These become public
      // marketing images, and real client enquiries must not be legible in them.
      const blurred = await page.evaluate(() => {
        const RE_EMAIL = /[\w.+-]+@[\w-]+\.[\w.]+/;
        const RE_PHONE = /(\+?\d[\d\s().-]{8,}\d)/;
        let n = 0;

        // Blur every data row inside an enquiries/leads panel. A person's NAME is
        // personal data too, and a regex for emails and phones will not catch it.
        // Anchor on the heading TEXT, then climb to the nearest ancestor that actually
        // holds the rows. Anchoring on DOM shape is brittle and silently matches nothing.
        const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5')].filter((h) =>
          /enquir|lead/i.test((h.textContent || '').trim())
        );
        for (const h of headings) {
          let panel = h.parentElement;
          while (panel && !panel.querySelector('tbody tr, ul > li, .row, .lead')) {
            panel = panel.parentElement;
          }
          if (!panel) continue;
          for (const row of panel.querySelectorAll('tbody tr, ul > li, .row, .lead')) {
            row.style.filter = 'blur(7px)';
            n++;
          }
        }

        // Then the generic sweep for stray contact details anywhere else.
        for (const el of document.querySelectorAll('td, li, span, a, div, p, h3, h4, strong')) {
          if (el.children.length) continue;
          const t = el.textContent || '';
          if (RE_EMAIL.test(t) || RE_PHONE.test(t)) {
            el.style.filter = 'blur(6px)';
            n++;
          }
        }
        return n;
      });
      await new Promise((r) => setTimeout(r, 300));

      await page.screenshot({
        path: path.join(outDir, `${name}.jpg`),
        type: 'jpeg',
        quality: 90,
      });
      console.log(`  ${name}.jpg  "${title}"${blurred ? `  (${blurred} field(s) blurred)` : ''}`);
    } catch (err) {
      console.log(`  FAIL ${name}: ${err.message}`);
    }
  }

  await page
    .goto(new URL('logout.php', cfg.loginUrl).href, { waitUntil: 'networkidle2', timeout: 20000 })
    .catch(() => {});
  console.log(`Done -> ${outDir}`);
} finally {
  await browser.close();
}
