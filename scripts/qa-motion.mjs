// Proves the CSS motion layer is actually RUNNING in a browser, rather than
// just present in the stylesheet. Greping the CSS proves nothing: a scroll
// timeline that fails to attach, or a selector that misses its element,
// leaves the markup looking perfect and the page dead still.
//
// Two traps this script had to be built around, both of which produced
// convincing false failures on the first pass:
//
//   1. globals.css sets `html { scroll-behavior: smooth }`, so window.scrollTo
//      ANIMATES. Sampling shortly after the call reads a position the page is
//      still travelling towards, and every scroll-linked element looks frozen.
//      Scrolling is forced to instant here and then waited on until settled.
//   2. Sampling at fixed page percentages tells you nothing about an element
//      whose animation range sits somewhere else entirely. Each element is
//      instead parked at two positions inside its OWN range, by scrolling it
//      to 80% and then 20% of viewport height.
//
// A scroll-driven element MUST report different values at those two positions.
// Same value twice means the animation is attached but not being driven.
//
// Usage: node scripts/qa-motion.mjs [baseUrl]

import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const BASE = process.argv[2] || "http://localhost:3000";
const SHOTS = path.join(root, ".qa", "motion");

/**
 * kind:
 *   "scroll" - must change between two scroll positions
 *   "hover"  - must change between resting and hovered
 *   "count"  - scroll-driven, but the value lives in a pseudo custom property
 */
const CHECKS = {
  mobile: [
    { name: "progress bar", selector: ".aw-progress-bar", kind: "root" },
    { name: "in-frame page scroll", selector: ".aw-page-frame img", kind: "scroll" },
    { name: "process rail", selector: ".aw-rail", kind: "scroll" },
    { name: "stats count-up", selector: ".aw-count", kind: "count" },
    { name: "hero backdrop", selector: ".aw-hero-bg", kind: "exit" },
    { name: "hero copy exit", selector: ".aw-hero-exit", kind: "exit" },
    { name: "showcase frame reveal", selector: ".aw-scale-in", kind: "scroll" },
    { name: "showcase copy rise", selector: ".aw-rise-sm", kind: "scroll" },
  ],
  desktop: [
    { name: "progress bar", selector: ".aw-progress-bar", kind: "root" },
    { name: "service card sheen", selector: ".aw-sheen", kind: "hover" },
    { name: "blog cover zoom", selector: ".aw-img-zoom", kind: "hover" },
  ],
};

/** Kill smooth scrolling, otherwise every sample is taken mid-flight. */
async function disableSmoothScroll(page) {
  await page.addStyleTag({
    content: "html, body, * { scroll-behavior: auto !important; }",
  });
}

async function settleAt(page, y) {
  await page.evaluate((target) => {
    window.scrollTo({ top: target, behavior: "instant" });
  }, y);
  // Wait until the reported position stops changing, then give the compositor
  // two frames to apply the timeline.
  await page.evaluate(async () => {
    let last = -1;
    for (let i = 0; i < 30; i++) {
      if (Math.abs(window.scrollY - last) < 1) break;
      last = window.scrollY;
      await new Promise((r) => setTimeout(r, 30));
    }
    await new Promise((res) =>
      requestAnimationFrame(() => requestAnimationFrame(res))
    );
  });
  await new Promise((r) => setTimeout(r, 120));
}

/** Park the element so its top sits at `fraction` of viewport height. */
async function parkElement(page, selector, fraction) {
  const y = await page.evaluate(
    (sel, f) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return window.scrollY + rect.top - window.innerHeight * f;
    },
    selector,
    fraction
  );
  if (y === null) return false;
  await settleAt(page, Math.max(0, y));
  return true;
}

async function sample(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { missing: true };
    const cs = getComputedStyle(el);
    const after = getComputedStyle(el, "::after");
    // A hover sheen lives on ::after and an image zoom lives on a CHILD, so
    // reading only the element's own transform reports "stuck" for effects
    // that are working perfectly.
    const child = el.querySelector("img, picture > img") || el.firstElementChild;
    return {
      missing: false,
      transform: cs.transform,
      opacity: cs.opacity,
      animationName: cs.animationName,
      // getAnimations must walk pseudo-elements too, or a ::after animation
      // reports as zero and looks like a failure.
      animCount: el.getAnimations ? el.getAnimations({ subtree: true }).length : 0,
      counter: after.getPropertyValue("--aw-n").trim(),
      afterTransform: after.transform,
      childTransform: child ? getComputedStyle(child).transform : "none",
    };
  }, selector);
}

function changed(a, b) {
  return (
    a.transform !== b.transform ||
    a.opacity !== b.opacity ||
    a.counter !== b.counter ||
    a.afterTransform !== b.afterTransform ||
    a.childTransform !== b.childTransform
  );
}

async function run() {
  await mkdir(SHOTS, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  console.log(`browser: ${await browser.version()}\n`);

  let failures = 0;
  const failed = [];

  for (const [vpName, checks] of Object.entries(CHECKS)) {
    const page = await browser.newPage();
    const isMobile = vpName === "mobile";
    await page.setViewport({
      width: isMobile ? 390 : 1440,
      height: isMobile ? 844 : 900,
      deviceScaleFactor: isMobile ? 3 : 1,
      isMobile,
      hasTouch: isMobile,
    });

    await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    await disableSmoothScroll(page);

    const supported = await page.evaluate(() =>
      CSS.supports("animation-timeline", "view()")
    );
    console.log(`── ${vpName} ── scroll timelines supported: ${supported}`);
    if (!supported) {
      console.log("   browser too old, skipping\n");
      await page.close();
      continue;
    }

    for (const { name, selector, kind } of checks) {
      let a, b;

      if (kind === "root") {
        // Driven by the document timeline, so plain page positions are right.
        await settleAt(page, 200);
        a = await sample(page, selector);
        await settleAt(page, 4000);
        b = await sample(page, selector);
      } else if (kind === "hover") {
        await parkElement(page, selector, 0.4);
        a = await sample(page, selector);
        await page.hover(selector).catch(() => {});
        await new Promise((r) => setTimeout(r, 700));
        b = await sample(page, selector);
      } else if (kind === "exit") {
        // An `exit` range only begins once the element starts leaving the top
        // of the scrollport. Parking it at 85% and 10% of viewport height, as
        // the scroll checks do, keeps it fully ON screen the whole time, where
        // exit progress is legitimately zero. It has to be pushed off the top.
        await parkElement(page, selector, 0.2);
        a = await sample(page, selector);
        await parkElement(page, selector, -0.85);
        b = await sample(page, selector);
      } else {
        const found = await parkElement(page, selector, 0.85);
        if (!found) {
          console.log(`   FAIL  ${name.padEnd(24)} selector not found: ${selector}`);
          failures++;
          failed.push(`${vpName}/${name}`);
          continue;
        }
        a = await sample(page, selector);
        await parkElement(page, selector, 0.1);
        b = await sample(page, selector);
      }

      if (!a || a.missing) {
        console.log(`   FAIL  ${name.padEnd(24)} selector not found: ${selector}`);
        failures++;
        failed.push(`${vpName}/${name}`);
        continue;
      }

      const moved = changed(a, b);
      if (!moved) {
        failures++;
        failed.push(`${vpName}/${name}`);
      }

      console.log(
        `   ${moved ? "MOVES" : "STUCK"} ${name.padEnd(24)} ` +
          `anims=${a.animCount} ${String(a.animationName).slice(0, 30)}`
      );
      if (!moved) {
        console.log(
          `         A: ${a.transform} op=${a.opacity} n=${a.counter} after=${a.afterTransform} child=${a.childTransform}`
        );
        console.log(
          `         B: ${b.transform} op=${b.opacity} n=${b.counter} after=${b.afterTransform} child=${b.childTransform}`
        );
      }
    }

    // Visual proof frames.
    const height = await page.evaluate(
      () => document.body.scrollHeight - window.innerHeight
    );
    for (const [i, ratio] of [0, 0.12, 0.3, 0.55].entries()) {
      await settleAt(page, height * ratio);
      await page.screenshot({
        path: path.join(SHOTS, `${vpName}-${i}-${Math.round(ratio * 100)}pc.jpg`),
        type: "jpeg",
        quality: 78,
      });
    }
    console.log("");
    await page.close();
  }

  await browser.close();
  if (failures === 0) {
    console.log("ALL MOTION CHECKS PASSED");
  } else {
    console.log(`${failures} MOTION CHECK(S) FAILED: ${failed.join(", ")}`);
  }
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
