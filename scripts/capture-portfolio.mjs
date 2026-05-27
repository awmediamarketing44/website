// Portfolio site capture pipeline.
// Usage: node scripts/capture-portfolio.mjs <slug> <url> [--full]
// Captures hero (1440x900 viewport), full page tiled scroll, and mobile (414x896).
// Writes to public/images/projects/<slug>/.

import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const slug = args[0];
const url = args[1];
const wantFull = args.includes('--full');

if (!slug || !url) {
  console.error('Usage: node scripts/capture-portfolio.mjs <slug> <url> [--full]');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'public', 'images', 'projects', slug);
await fs.mkdir(outDir, { recursive: true });

console.log(`> Capturing ${url} -> ${outDir}`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  // ---- DESKTOP HERO (1440x900) ----
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktop.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  // Best-effort cookie banner dismiss (covers most CMPs)
  await desktop.evaluate(() => {
    const selectors = [
      '#cookie-banner', '#cookieBanner', '.cookie-banner', '.cookie-notice',
      '#cookieNotice', '#cookie-notice', '.cky-consent-container', '#cky-consent',
      '[class*="CookieConsent"]', '[id*="cookie"][id*="consent"]',
      '[class*="cookie"][class*="banner"]', '[class*="cookie"][class*="notice"]',
      '.gdpr', '#gdpr', '.cmp-banner', '#onetrust-banner-sdk', '#onetrust-consent-sdk',
    ];
    selectors.forEach((s) => document.querySelectorAll(s).forEach((el) => el.remove()));
  });
  await new Promise((r) => setTimeout(r, 400));

  const heroPath = path.join(outDir, 'hero.jpg');
  await desktop.screenshot({ path: heroPath, type: 'jpeg', quality: 92 });
  console.log(`  hero.jpg`);

  // ---- DESKTOP FULL PAGE (clipped at reasonable height) ----
  if (wantFull) {
    const fullPath = path.join(outDir, 'desktop-full.jpg');
    // Cap height to avoid Puppeteer fullPage duplication bug on tall pages
    const bodyH = await desktop.evaluate(() => Math.min(document.body.scrollHeight, 6000));
    await desktop.setViewport({ width: 1440, height: bodyH, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 800));
    await desktop.screenshot({ path: fullPath, type: 'jpeg', quality: 88 });
    console.log(`  desktop-full.jpg`);
  }

  // ---- DESKTOP STANDARD (viewport-only) ----
  await desktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 500));
  const desktopPath = path.join(outDir, 'desktop.jpg');
  await desktop.screenshot({ path: desktopPath, type: 'jpeg', quality: 92 });
  console.log(`  desktop.jpg`);

  await desktop.close();

  // ---- MOBILE (iPhone 11 - 414x896) ----
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 414, height: 896, deviceScaleFactor: 3, isMobile: true });
  await mobile.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  );
  await mobile.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  await mobile.evaluate(() => {
    const selectors = [
      '#cookie-banner', '#cookieBanner', '.cookie-banner', '.cookie-notice',
      '#cookieNotice', '#cookie-notice', '.cky-consent-container', '#cky-consent',
      '[class*="CookieConsent"]', '[id*="cookie"][id*="consent"]',
      '[class*="cookie"][class*="banner"]', '[class*="cookie"][class*="notice"]',
      '.gdpr', '#gdpr', '.cmp-banner', '#onetrust-banner-sdk', '#onetrust-consent-sdk',
    ];
    selectors.forEach((s) => document.querySelectorAll(s).forEach((el) => el.remove()));
  });
  await new Promise((r) => setTimeout(r, 400));

  const mobilePath = path.join(outDir, 'mobile.jpg');
  await mobile.screenshot({ path: mobilePath, type: 'jpeg', quality: 92 });
  console.log(`  mobile.jpg`);

  await mobile.close();

  // ---- THUMB (1280x800, from hero) ----
  const thumbPath = path.join(outDir, 'thumb.jpg');
  await sharp(heroPath).resize(1280, 800, { fit: 'cover' }).jpeg({ quality: 86 }).toFile(thumbPath);
  console.log(`  thumb.jpg`);

  console.log(`Done -> ${outDir}`);
} finally {
  await browser.close();
}
