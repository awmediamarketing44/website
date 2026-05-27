// Trim the dark background padding around each brand logo so the wordmark
// fills the hero/thumb container properly. Uses sharp.trim() to detect bg color.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', 'public', 'images', 'projects');

const slugs = ['vanguard-brand', 'primecore-brand', 'hvme-brand', 'wright-coaching-brand', 'her-era-brand'];

for (const slug of slugs) {
  const dir = path.join(root, slug);
  const src = path.join(dir, 'logo.jpg');
  try {
    await fs.access(src);
  } catch {
    console.log(`SKIP ${slug} — no logo.jpg`);
    continue;
  }

  // Trim bg + add small breathing-room padding (8% of width)
  const meta = await sharp(src).metadata();
  const tmp = path.join(dir, '_logo-trimmed.png');
  await sharp(src)
    .trim({ threshold: 12 })
    .toFile(tmp);
  const trimmedMeta = await sharp(tmp).metadata();
  // Pad to square with the same bg color (sample from a corner of the trimmed image)
  const sampleBuf = await sharp(src).extract({ left: 0, top: 0, width: 4, height: 4 }).raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = sampleBuf.data;

  const size = Math.max(trimmedMeta.width, trimmedMeta.height);
  const pad = Math.round(size * 0.12);
  const finalSize = size + pad * 2;

  await sharp({
    create: {
      width: finalSize,
      height: finalSize,
      channels: 3,
      background: { r, g, b },
    },
  })
    .composite([{
      input: tmp,
      gravity: 'center',
    }])
    .jpeg({ quality: 92 })
    .toFile(path.join(dir, 'hero.jpg'));

  // thumb = same as hero
  await fs.copyFile(path.join(dir, 'hero.jpg'), path.join(dir, 'thumb.jpg')).catch(() => {});
  await fs.unlink(tmp).catch(() => {});
  console.log(`  ${slug}: bg=rgb(${r},${g},${b}), trimmed ${meta.width}x${meta.height} -> ${finalSize}x${finalSize}`);
}
console.log('Done');
