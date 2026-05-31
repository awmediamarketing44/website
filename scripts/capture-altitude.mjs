import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "path";

const URL = "https://altitude-project.com/";
const OUT = path.resolve("public/images/projects/altitude");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
  await sleep(1200);
}

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  // ---- DESKTOP (top fold) 2880x1800 ----
  const desk = await browser.newPage();
  await desk.setUserAgent(UA);
  await desk.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desk.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  await autoScroll(desk);
  await sleep(800);

  const foldBuf = await desk.screenshot({ type: "png", fullPage: false });
  await sharp(foldBuf).jpeg({ quality: 88 }).toFile(path.join(OUT, "desktop.jpg"));
  await sharp(foldBuf).jpeg({ quality: 88 }).toFile(path.join(OUT, "hero.jpg"));
  // thumb 1280x800 from the fold
  await sharp(foldBuf)
    .resize(1280, 800, { fit: "cover", position: "top" })
    .jpeg({ quality: 86 })
    .toFile(path.join(OUT, "thumb.jpg"));
  console.log("desktop.jpg / hero.jpg / thumb.jpg done");

  // ---- DESKTOP FULL (whole page) ----
  const fullBuf = await desk.screenshot({ type: "png", fullPage: true });
  // keep it tidy: scale to 2880 wide, preserve full height
  await sharp(fullBuf).resize({ width: 2880 }).jpeg({ quality: 84 }).toFile(
    path.join(OUT, "desktop-full.jpg")
  );
  console.log("desktop-full.jpg done");
  await desk.close();

  // ---- MOBILE 1242x2688 ----
  const mob = await browser.newPage();
  await mob.setUserAgent(UA);
  await mob.setViewport({ width: 414, height: 896, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await mob.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  await autoScroll(mob);
  await sleep(800);
  const mobBuf = await mob.screenshot({ type: "png", fullPage: false });
  await sharp(mobBuf).jpeg({ quality: 88 }).toFile(path.join(OUT, "mobile.jpg"));
  console.log("mobile.jpg done");
  await mob.close();
} finally {
  await browser.close();
}
console.log("All Altitude screengrabs refreshed →", OUT);
