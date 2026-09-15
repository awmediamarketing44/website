import sharp from "sharp"; import fs from "fs"; import path from "path";
const OUT = "C:/Users/mraiw/Desktop/onyx-mockups/out";
const BG = { r: 11, g: 10, b: 9 }; // Onyx #0B0A09
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith("-TRANSPARENT.png"))) {
  const src = path.join(OUT, f);
  const m = await sharp(src).metadata();
  const dst = path.join(OUT, f.replace("-TRANSPARENT.png", "-DARK.png"));
  await sharp({ create: { width: m.width, height: m.height, channels: 3, background: BG } })
    .composite([{ input: src }]).png().toFile(dst);
  console.log("dark", path.basename(dst));
}
