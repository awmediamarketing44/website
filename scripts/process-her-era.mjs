import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '..', 'public', 'images', 'projects', 'her-era-brand');

// Brand pages are landscape A4 (~3508x2480) — resize to 1600 wide, JPG q88
const pages = [
  ['_p1.jpg', 'hero.jpg',     1600],
  ['_p1.jpg', 'thumb.jpg',    1280],
  ['_p2.jpg', 'mockup-1.jpg', 1400],
  ['_p3.jpg', 'mockup-2.jpg', 1400],
  ['_p4.jpg', 'mockup-3.jpg', 1400],
];

for (const [src, dst, width] of pages) {
  await sharp(path.join(dir, src))
    .resize({ width, fit: 'inside' })
    .jpeg({ quality: 88 })
    .toFile(path.join(dir, dst));
  console.log(`  ${dst}`);
}

// Logo on warm bg
await sharp(path.join(dir, '_logo.png'))
  .resize({ width: 1200, fit: 'inside' })
  .flatten({ background: '#3a2a20' })
  .jpeg({ quality: 90 })
  .toFile(path.join(dir, 'logo.jpg'));
console.log('  logo.jpg');

for (const f of ['_p1.jpg', '_p2.jpg', '_p3.jpg', '_p4.jpg', '_logo.png']) {
  try { await fs.unlink(path.join(dir, f)); } catch {}
}
console.log('Done');
