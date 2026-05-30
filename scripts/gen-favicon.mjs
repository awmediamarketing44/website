import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC =
  "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0980 - Tej ( MAY - WEEK 04 )/aw-favicon.png";
const LOGO_SRC =
  "C:/Users/mraiw/Awmedia Dropbox/AWMedia [Projects]/AWProjects [2026]/0980 - Tej ( MAY - WEEK 04 )/aw-logo-website.png";
const APP = "C:/Users/mraiw/Desktop/awmedia-site/src/app";
const PUB = "C:/Users/mraiw/Desktop/awmedia-site/public/images";

// 1. Modern PNG favicon (Next auto-links app/icon.png)
await sharp(SRC).resize(512, 512, { fit: "cover" }).png().toFile(`${APP}/icon.png`);
// 2. Apple touch icon
await sharp(SRC).resize(180, 180, { fit: "cover" }).png().toFile(`${APP}/apple-icon.png`);

// 3. favicon.ico — wrap a 48x48 PNG inside an ICO container (PNG-in-ICO,
//    supported by all modern browsers + Windows).
const png48 = await sharp(SRC)
  .resize(48, 48, { fit: "cover" })
  .ensureAlpha()
  .png({ force: true })
  .toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
const entry = Buffer.alloc(16);
entry.writeUInt8(48, 0); // width
entry.writeUInt8(48, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(png48.length, 8); // size
entry.writeUInt32LE(22, 12); // offset (6 + 16)
writeFileSync(`${APP}/favicon.ico`, Buffer.concat([header, entry, png48]));

// 4. Navbar logo — copy + report dimensions so we can set width/height
const meta = await sharp(LOGO_SRC).metadata();
await sharp(LOGO_SRC).png().toFile(`${PUB}/aw-logo-website.png`);

console.log("icon.png 512, apple-icon 180, favicon.ico 48 written");
console.log(`logo dimensions: ${meta.width}x${meta.height}`);
