// QA capture: screenshot /work/team-procoach at multiple scroll positions.
// Usage: node scripts/qa-case-study.mjs <slug>

import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const slug = process.argv[2] || 'team-procoach';
const url = `http://localhost:3000/work/${slug}`;

const outDir = path.join(projectRoot, '.qa', slug);
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${totalHeight}px`);

  // Capture at increments of ~900px so we cover the whole page
  const step = 900;
  const positions = [];
  for (let y = 0; y < totalHeight; y += step) positions.push(y);

  for (let i = 0; i < positions.length; i++) {
    const y = positions[i];
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise((r) => setTimeout(r, 800)); // let motion animations settle
    const file = path.join(outDir, `slice-${String(i).padStart(2, '0')}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
    console.log(`  ${path.basename(file)} @ y=${y}`);
  }

  // Also: index page
  const indexPage = await browser.newPage();
  await indexPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await indexPage.goto('http://localhost:3000/work', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  await indexPage.screenshot({ path: path.join(outDir, 'index.jpg'), type: 'jpeg', quality: 88 });
  console.log('  index.jpg');

  console.log(`Done -> ${outDir}`);
} finally {
  await browser.close();
}
