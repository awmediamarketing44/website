// QA capture for /work index — full page scroll, captures the whole grid.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const outDir = path.join(projectRoot, '.qa', '_work-index');
await fs.mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000/work', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${totalHeight}px`);

  const step = 900;
  for (let y = 0, i = 0; y < totalHeight; y += step, i++) {
    await page.evaluate((s) => window.scrollTo(0, s), y);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(outDir, `slice-${String(i).padStart(2, '0')}.jpg`),
      type: 'jpeg',
      quality: 88,
    });
    console.log(`  slice-${String(i).padStart(2, '0')}.jpg @ y=${y}`);
  }

  console.log(`Done -> ${outDir}`);
} finally {
  await browser.close();
}
