// Render Noura "Generic Advice" PDF first page via Puppeteer to JPG
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const pdfSrc = 'C:\\Users\\mraiw\\Awmedia Dropbox\\AWMedia [Projects]\\AWProjects [2026]\\0894 - Noura new PDF\\noura_generic_advice.pdf';
const outDir = path.join(projectRoot, 'public', 'images', 'projects', 'noura');
await fs.mkdir(outDir, { recursive: true });

// Render PDF via Puppeteer headless Chrome
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1697, deviceScaleFactor: 2 });
  const pdfUrl = `file:///${pdfSrc.replace(/\\/g, '/').replace(/\s/g, '%20').replace(/\[/g, '%5B').replace(/\]/g, '%5D')}`;
  console.log('Loading:', pdfUrl);
  await page.goto(pdfUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3000));

  const rawPath = path.join(outDir, '_pdf-raw.png');
  await page.screenshot({ path: rawPath, type: 'png' });
  console.log('Raw screenshot saved');

  // Process to JPG mockup
  await sharp(rawPath)
    .resize({ width: 1400, fit: 'inside' })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, 'pdf-mockup.jpg'));
  console.log('  pdf-mockup.jpg');

  await fs.unlink(rawPath).catch(() => {});
} finally {
  await browser.close();
}
