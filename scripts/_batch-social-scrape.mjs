// One-off batch scrape of curated social carousels.
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const jobs = [
  { slug: 'myles-socials', urls: [
    'https://www.instagram.com/p/DYHKkPPjkKY/',
    'https://www.instagram.com/p/DX81IV7jmII/',
    'https://www.instagram.com/p/DXrvEl4jE03/',
  ]},
  { slug: 'prepdad-socials', urls: [
    'https://www.instagram.com/p/DYcbEUykV2x/',
    'https://www.instagram.com/p/DYzpIlNmp3u/',
    'https://www.instagram.com/p/DYOoeK0kdIN/',
  ]},
  { slug: 'mrf-socials', urls: [
    'https://www.instagram.com/p/DY1Tx5sDGcl/',
    'https://www.instagram.com/p/DYhMNtsjKhv/',
    'https://www.instagram.com/p/DYrAhS7DJv3/',
  ]},
  { slug: 'strengthinus-socials', urls: [
    'https://www.instagram.com/p/DYmxgABjGdq/',
    'https://www.instagram.com/p/DYxGO3ADIW2/',
    'https://www.instagram.com/p/DUse4-vDMlL/',
  ]},
  { slug: 'proiq-socials', urls: [
    'https://www.instagram.com/p/DXg0jMdiMnD/',
    'https://www.instagram.com/p/DXPa3z6CPqz/',
    'https://www.instagram.com/p/DWyd9-5CC9v/',
  ]},
  { slug: 'team-procoach', urls: [
    'https://www.instagram.com/p/DYyoU9wDGnB/',
    'https://www.instagram.com/p/DYq7ZMfjaY1/',
    'https://www.instagram.com/p/DYq_BcFgTXp/',
  ]},
  { slug: 'cammy-socials', urls: [
    'https://www.instagram.com/p/DYpYZo6jTx_/',
    'https://www.instagram.com/p/DYfQsLCCEFw/',
    'https://www.instagram.com/p/DYhrPTdiEBM/',
  ]},
  { slug: 'matt-cusano-socials', urls: [
    'https://www.instagram.com/p/DYpVhWKEadH/',
    'https://www.instagram.com/p/DV04UmKkelO/',
    'https://www.instagram.com/p/DU53hevkYZu/',
  ]},
];

for (const job of jobs) {
  // Clear old
  const graphicsDir = path.join(projectRoot, 'public', 'images', 'projects', job.slug, 'graphics');
  try {
    const files = await fs.readdir(graphicsDir);
    for (const f of files) {
      if (f.startsWith('post-') || f.startsWith('_')) {
        await fs.unlink(path.join(graphicsDir, f)).catch(() => {});
      }
    }
  } catch {/* dir doesn't exist yet, fine */}

  // Run scrape
  console.log(`\n=== ${job.slug} ===`);
  await new Promise((resolve) => {
    const child = spawn('node', ['scripts/scrape-ig-portfolio.mjs', job.slug, ...job.urls], {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    child.on('exit', resolve);
  });
}

console.log('\nAll scrapes done.');
