// Batch run capture-portfolio.mjs over a queue of URLs.
// Reads scripts/portfolio-queue.json and spawns capture-portfolio.mjs sequentially
// (Puppeteer is heavy; running in parallel risks OOM).
// Skips slugs that already have a hero.jpg.

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const queuePath = path.join(__dirname, 'portfolio-queue.json');
const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));

const all = [
  ...queue.websites.map((q) => ({ ...q, type: 'website' })),
  ...queue.landingPages.map((q) => ({ ...q, type: 'landing' })),
];

console.log(`Batch capturing ${all.length} site(s)...`);

async function runOne({ slug, url, full }) {
  const heroPath = path.join(projectRoot, 'public', 'images', 'projects', slug, 'hero.jpg');
  try {
    await fs.access(heroPath);
    console.log(`SKIP ${slug} (already captured)`);
    return;
  } catch {
    /* doesn't exist, capture */
  }

  return new Promise((resolve) => {
    const args = ['scripts/capture-portfolio.mjs', slug, url];
    if (full) args.push('--full');
    const child = spawn('node', args, { cwd: projectRoot, stdio: 'inherit' });
    child.on('exit', (code) => {
      if (code !== 0) console.log(`FAIL ${slug} exit=${code}`);
      resolve();
    });
    child.on('error', (err) => {
      console.log(`ERROR ${slug}: ${err.message}`);
      resolve();
    });
  });
}

for (const item of all) {
  console.log(`\n[${item.type}] ${item.slug} <- ${item.url}`);
  await runOne(item);
}

console.log('\nBatch capture complete.');
