// Capture homepage at every scroll position to find the actual broken state.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const outDir = path.join(projectRoot, '.qa', '_homepage');
await fs.mkdir(outDir, { recursive: true });
const url = process.argv[2] || 'http://localhost:3000/';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const vh = 1080;
  console.log(`Page height: ${totalHeight}px (${(totalHeight / vh).toFixed(1)} viewports)`);

  // Capture every 600px (smaller step to catch mid-transition states)
  const step = 600;
  let i = 0;
  for (let y = 0; y < totalHeight; y += step, i++) {
    await page.evaluate((s) => window.scrollTo(0, s), y);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({
      path: path.join(outDir, `s${String(i).padStart(3, '0')}.jpg`),
      type: 'jpeg',
      quality: 82,
    });
    if (i % 5 === 0) console.log(`  s${String(i).padStart(3, '0')} @ y=${y}`);
  }
  console.log(`Done -> ${outDir}`);
} finally {
  await browser.close();
}
