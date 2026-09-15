/**
 * make-scroll-frames.mjs
 *
 * Builds the tiny full-page stills that the CSS "page scrolls inside a frame"
 * effect uses (.aw-page-frame in motion.css).
 *
 * Why this exists: the desktop homepage proves the work with a scroll-loop
 * VIDEO (calibre-scroll-loop.mp4 is 3.7MB). Phones cannot be asked to carry
 * that, so mobile used to get a single static screenshot and no motion at all.
 * A full-page capture squashed to phone width is about 7KB, which is lighter
 * than the single static hero it replaces, and CSS can scroll it inside a
 * browser frame on the compositor for nothing.
 *
 * Usage:
 *   node scripts/make-scroll-frames.mjs
 *   node scripts/make-scroll-frames.mjs --width 900 --quality 50
 *
 * Output: public/images/scroll-frames/<name>.avif and .webp
 */

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { statSync, existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const argVal = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : Number(args[i + 1]);
};

const WIDTH = argVal("--width", 640); // 300px CSS frame at 2x DPR; 3x downscales cleanly
const QUALITY = argVal("--quality", 32);
const OUT_DIR = "public/images/scroll-frames";

/** Sources are the existing full-page captures already in the repo. */
const SOURCES = [
  {
    name: "calibre",
    src: "public/images/projects/calibre-coaching/desktop-full.jpg",
  },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = {};

  for (const { name, src } of SOURCES) {
    if (!existsSync(src)) {
      console.warn(`SKIP ${name}: missing source ${src}`);
      continue;
    }

    const meta = await sharp(src).metadata();
    const before = statSync(src).size;

    for (const [fmt, opts] of [
      ["avif", { quality: QUALITY }],
      ["webp", { quality: QUALITY + 16 }],
    ]) {
      const buf = await sharp(src)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .toFormat(fmt, opts)
        .toBuffer();

      const outPath = path.join(OUT_DIR, `${name}.${fmt}`);
      await writeFile(outPath, buf);

      const out = await sharp(buf).metadata();
      console.log(
        `${outPath}  ${out.width}x${out.height}  ${(buf.length / 1024).toFixed(1)}KB` +
          `  (source ${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB)`
      );

      /**
       * The CSS travel distance depends only on the ratio between the frame
       * aspect and the image aspect, never on the rendered width, so it can be
       * hard-coded per image. Printed here so motion.css can be kept honest if
       * a source capture is ever re-shot at a different length.
       *   travel% = -(1 - frameAspectH/imageAspectH) as a share of image height
       */
      if (fmt === "avif") {
        const imgRatio = out.height / out.width; // height per unit width
        const frameRatio = 10 / 16; // .aw-page-frame is 16/10
        const travel = -(1 - frameRatio / imgRatio) * 100;
        manifest[name] = {
          width: out.width,
          height: out.height,
          travel: Number(travel.toFixed(2)),
        };
        console.log(`   travel for a 16/10 frame: ${travel.toFixed(2)}%`);
      }
    }
  }

  // The travel distance depends on the source capture's aspect ratio, so a
  // re-shot capture of a different length silently breaks a hard-coded value:
  // the page would stop short or overshoot into blank space, with nothing to
  // flag it. Writing it out here keeps the component and the asset in step.
  const manifestPath = "src/data/scroll-frames.json";
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`wrote ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
