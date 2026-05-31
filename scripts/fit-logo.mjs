// Fit brand logos to the portfolio box so they fill the frame (no awkward
// cropping / tiny floating logos). Auto-detects whether the source has a
// baked-in background (crop+zoom around the logo, preserves solid OR gradient
// bg) or is a transparent logo (composite centred on a brand colour).
//
// Outputs per project: hero.jpg (square) + thumb.jpg (16:10).
// Run: node scripts/fit-logo.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const JOBS = [
  { slug: "vanguard-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0025 - Vanguard Logo Save/Vanguard RGB/144ppi/vanguard-darkbg.png" },
  { slug: "noura", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0496 - Noura/By Adam/RGB/144ppi/gradientbg-logo(PNG.png" },
  { slug: "hvme-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0629 - HVME/Logo Save Out/RGB/home-lightbg(png).png" },
  { slug: "wright-coaching-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0678 - Wright Coaching/Asset 8@196x.png", bg: { r: 8, g: 8, b: 10 } },
  { slug: "her-era-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0902 - Her Era/Logo Files/RGB Files/logo-oatbg.png" },
  { slug: "ac-visuals-logo", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2025]/0025 - AC Visuals/AC RGB/196ppi/ACV-BLACKBG-RGB.png" },
  { slug: "delta-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0026 - Delta Save Out/Delta RGB/144ppi/delta-white-blackbg.png" },
  { slug: "mastery-method", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2025]/0764 - master method/MASTERY-METHOD-RGB/216ppi/black_bg_emblem.png" },
  { slug: "vantage-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0537 - Vantage Logo Files/RGB/144ppi/logo-yellow_1(PNG.png", bg: { r: 1, g: 17, b: 66 } },
  { slug: "primecore-brand", src: "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0213 - PrimeCore Week 01/PrimeCore - Logo Files/RGB Logo Files/144ppi/blackbg-logo(png).png" },
];

const OUTPUTS = [
  { name: "hero.jpg", w: 1200, h: 1200, fill: 0.72 },
  { name: "thumb.jpg", w: 1280, h: 800, fill: 0.8 },
];

function dist(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

async function analyse(src) {
  const img = sharp(src).ensureAlpha();
  const { width: W, height: H } = await img.metadata();
  const { data } = await img.raw().toBuffer({ resolveWithObject: true }); // RGBA
  const at = (x, y) => {
    const i = (y * W + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  // transparency: sample the alpha channel — if a meaningful fraction of the
  // image is transparent, it's a logo-on-transparent (composite mode).
  let transPix = 0, sampled = 0;
  const tstep = Math.max(1, Math.floor(Math.min(W, H) / 400));
  for (let y = 0; y < H; y += tstep) for (let x = 0; x < W; x += tstep) {
    sampled++; if (at(x, y)[3] < 128) transPix++;
  }
  const transparent = transPix / sampled > 0.12;

  // background colour (for opaque sources) = average of the 4 corners
  const corners = [at(0, 0), at(W - 1, 0), at(0, H - 1), at(W - 1, H - 1)];
  const bg = [0, 1, 2].map((k) => Math.round(corners.reduce((s, c) => s + c[k], 0) / 4));

  // logo bounding box
  let minX = W, minY = H, maxX = 0, maxY = 0, found = false;
  const step = Math.max(1, Math.floor(Math.min(W, H) / 700));
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const p = at(x, y);
      const isInk = transparent ? p[3] > 40 : dist(p, bg) > 42;
      if (isInk) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }
  if (!found) { minX = 0; minY = 0; maxX = W - 1; maxY = H - 1; }
  return { W, H, transparent, bg, bbox: { minX, minY, maxX, maxY } };
}

async function makeCrop(src, info, out) {
  const { W, H, bbox } = info;
  const bw = bbox.maxX - bbox.minX, bh = bbox.maxY - bbox.minY;
  const cx = (bbox.minX + bbox.maxX) / 2, cy = (bbox.minY + bbox.maxY) / 2;
  const AR = out.w / out.h;
  // window must contain the logo at <= fill fraction in both dims
  let cw = Math.max(bw / out.fill, (bh / out.fill) * AR);
  let ch = cw / AR;
  cw = Math.min(cw, W); ch = Math.min(ch, H);
  if (cw / ch > AR) { cw = ch * AR; } else { ch = cw / AR; }
  let left = Math.round(cx - cw / 2), top = Math.round(cy - ch / 2);
  left = Math.max(0, Math.min(left, W - Math.round(cw)));
  top = Math.max(0, Math.min(top, H - Math.round(ch)));
  await sharp(src)
    .extract({ left, top, width: Math.round(cw), height: Math.round(ch) })
    .resize(out.w, out.h, { fit: "cover" })
    .flatten()
    .jpeg({ quality: 90 })
    .toFile(out.path);
}

async function makeComposite(src, info, out, bg) {
  const { bbox } = info;
  const bw = bbox.maxX - bbox.minX + 1, bh = bbox.maxY - bbox.minY + 1;
  // extract the tight logo (keeps transparency)
  const logoBuf = await sharp(src).ensureAlpha()
    .extract({ left: bbox.minX, top: bbox.minY, width: bw, height: bh })
    .png().toBuffer();
  // scale to fill fraction
  const maxW = Math.round(out.w * out.fill), maxH = Math.round(out.h * out.fill);
  const resized = await sharp(logoBuf).resize(maxW, maxH, { fit: "inside" }).png().toBuffer();
  const canvas = sharp({ create: { width: out.w, height: out.h, channels: 4, background: { ...bg, alpha: 1 } } });
  await canvas
    .composite([{ input: resized, gravity: "center" }])
    .flatten({ background: bg })
    .jpeg({ quality: 90 })
    .toFile(out.path);
}

for (const job of JOBS) {
  const dir = path.resolve("public/images/projects", job.slug);
  fs.mkdirSync(dir, { recursive: true });
  const info = await analyse(job.src);
  const mode = info.transparent ? "COMPOSITE" : "CROP";
  for (const o of OUTPUTS) {
    const out = { ...o, path: path.join(dir, o.name) };
    if (info.transparent) await makeComposite(job.src, info, out, job.bg || info.bg);
    else await makeCrop(job.src, info, out);
  }
  console.log(`✓ ${job.slug.padEnd(22)} ${mode}  bbox ${info.bbox.maxX - info.bbox.minX}x${info.bbox.maxY - info.bbox.minY}  bg rgb(${info.bg})`);
}
console.log("Done.");
