// Process raw HVME + Wright Coaching logo PNGs into hero/thumb JPGs
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', 'public', 'images', 'projects');

const jobs = [
  { slug: 'hvme-brand',           bg: { r: 16, g: 16, b: 18 } },   // dark almost-black
  { slug: 'wright-coaching-brand', bg: { r: 12, g: 12, b: 12 } },  // black
];

for (const { slug, bg } of jobs) {
  const dir = path.join(root, slug);
  const src = path.join(dir, '_logo-src.png');
  try { await fs.access(src); } catch { console.log(`SKIP ${slug}`); continue; }

  // Trim transparent / matching-bg pixels, then pad to square
  const tmp = path.join(dir, '_logo-trimmed.png');
  await sharp(src).trim({ threshold: 12 }).toFile(tmp);
  const meta = await sharp(tmp).metadata();

  const size = Math.max(meta.width, meta.height);
  const pad = Math.round(size * 0.18);
  const finalSize = size + pad * 2;

  await sharp({
    create: { width: finalSize, height: finalSize, channels: 3, background: bg },
  })
    .composite([{ input: tmp, gravity: 'center' }])
    .jpeg({ quality: 92 })
    .toFile(path.join(dir, 'hero.jpg'));

  await fs.copyFile(path.join(dir, 'hero.jpg'), path.join(dir, 'thumb.jpg')).catch(() => {});

  await fs.unlink(tmp).catch(() => {});
  await fs.unlink(src).catch(() => {});
  console.log(`  ${slug}: ${meta.width}x${meta.height} -> ${finalSize}x${finalSize}`);
}
console.log('Done');
