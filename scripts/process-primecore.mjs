// One-off: convert PrimeCore PNGs to web-optimised JPGs
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '..', 'public', 'images', 'projects', 'primecore-brand');

const files = [
  ['_hero-src.png',     'hero.jpg',     { fit: 'inside', width: 1600 }],
  ['_hero-src.png',     'thumb.jpg',    { fit: 'cover',  width: 1280, height: 800 }],
  ['_mockup-1-src.png', 'mockup-1.jpg', { fit: 'inside', width: 1400 }],
  ['_mockup-2-src.png', 'mockup-2.jpg', { fit: 'inside', width: 1400 }],
  ['_mockup-3-src.png', 'mockup-3.jpg', { fit: 'inside', width: 1400 }],
  ['_logo-src.png',     'logo.jpg',     { fit: 'inside', width: 1200 }],
];

for (const [src, dst, resize] of files) {
  await sharp(path.join(dir, src))
    .resize(resize)
    .flatten({ background: '#0a0a0c' })
    .jpeg({ quality: 88 })
    .toFile(path.join(dir, dst));
  console.log(`  ${dst}`);
}

// Cleanup source PNGs
for (const f of files.map(([s]) => s)) {
  try { await fs.unlink(path.join(dir, f)); } catch {}
}
console.log('Done');
