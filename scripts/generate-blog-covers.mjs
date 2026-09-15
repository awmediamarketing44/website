// Generate AI cover images for all blog posts via Gemini 3 Pro Image.
//
// Usage:
//   $env:GEMINI_API_KEY="..."
//   node scripts/generate-blog-covers.mjs            # generate all missing
//   node scripts/generate-blog-covers.mjs --force    # regen all
//   node scripts/generate-blog-covers.mjs <slug>     # regen single slug
//
// One visual system across all 20 posts so they look like a set:
//   Editorial abstract illustration, dark base (#0A0A0A), pink accent (#F92672),
//   cream highlights, soft 3D matte clay or paper-cut surfaces, no text,
//   no AI artefacts, 16:9, centred subject.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "src", "data", "blog-posts");
const OUT_DIR = path.join(ROOT, "public", "images", "blog");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Set GEMINI_API_KEY in your environment.");
  process.exit(1);
}

const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes("--force");
const TARGET_SLUG = ARGS.find((a) => !a.startsWith("-"));

const SYSTEM_STYLE = [
  "Editorial abstract illustration for a UK design agency blog cover.",
  "Soft 3D matte clay style. Paper-cut, dimensional, tactile.",
  "Palette: deep ink black #0A0A0A base, hot pink accent #F92672, cream #F5EFE6 highlights,",
  "subtle purple shadows. Restrained, premium, not garish.",
  "Centred composition. Generous negative space. No text. No logos.",
  "Studio soft lighting. 16:9 aspect. Magazine cover energy.",
].join(" ");

const PER_POST_PROMPT = {
  "how-to-choose-a-web-design-company-in-sheffield":
    "A 3D clay hand holding a magnifying glass over a row of small clay storefront cards, one card glowing pink as the chosen one. Editorial, top-down.",
  "web-design-cost-sheffield":
    "A 3D clay pink price tag resting on a small clay website card, with a stack of clay coins beside it. Clean, editorial, generous negative space.",
  "freelance-web-designer-vs-agency-sheffield":
    "Two 3D clay figures side by side, one lone figure at a desk and one small group of three around a table, a subtle pink divider between them. Balanced, editorial.",
  "get-your-sheffield-business-found-online":
    "A 3D clay pin marker rising out of a stylised map with a pink signal pulse radiating outward, a small magnifying glass nearby. Sense of being discovered.",
  "ai-built-in-30-seconds-is-a-scam":
    "A cracked 3D clay browser window with a clay speedometer dial inside it, the needle snapped clean off and lying beside it, a pink warning glow through the crack. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "what-695-buys-in-web-design":
    "A neatly stacked 3D clay tower of three website cards labelled by tier with pink price tags. Editorial.",
  "ai-accelerated-vs-bespoke":
    "Two parallel 3D clay race tracks side by side, one labelled with a circuit pattern, one with a paintbrush. Both elegant.",
  "bespoke-vs-template-when-custom-matters":
    "Two 3D clay business cards, one identical mass-produced grid, one hand-shaped and unique. Side by side, top-down.",
  "speed-tax-slow-website-costs":
    "A 3D clay stopwatch with melting pink wax dripping from its hands onto a small clay coin stack below. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "agency-websites-worse-than-clients":
    "A 3D clay cobbler bench holding one beautifully finished pink and cream shoe and one tatty unfinished grey shoe beside it, clay tools scattered around. Plain smooth clay surfaces, no markings. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "real-reason-website-isnt-converting":
    "A wide 3D clay funnel seen from the side, the mouth crowded with small clay figures and only one lone pink figure dropping out of the bottom into a pink pool of light. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "website-in-7-days-without-cutting-corners":
    "A 3D clay desk calendar with 7 pages folded open like a pop-up book, last page showing a finished website thumbnail.",

  "web-design-for-fitness-coaches":
    "A 3D clay smartphone showing a coaching website silhouette with a clay dumbbell resting beside it. Pink highlight on the CTA button.",
  "web-design-for-dental-practices":
    "A 3D clay tooth and a clay laptop showing a calendar booking screen, both glowing softly. Trustworthy editorial.",
  "branding-for-construction-firms":
    "A 3D clay hard hat and a refined paper-cut business card stacked together. Industrial meets premium.",
  "branding-for-aesthetics-clinics":
    "A 3D clay perfume-bottle-sized clinic vial with a paper-cut leaf, pink ribbon detail. Spa minimalism.",
  "seo-for-personal-trainers":
    "A 3D clay map pin standing tall on a Google-search-bar shape with a clay barbell weight on the bar. Local search energy.",
  "seo-for-photographers":
    "A 3D clay vintage camera with a magnifying glass over its lens, pink highlight on the search reticle.",
  "ai-design-for-coaches":
    "A 3D clay clipboard holding a completely blank wireframe of plain grey boxes, half of it crisply machine cut and half of it hand moulded with visible thumbprints, a pink clay pencil resting across it. Every surface plain smooth clay with no markings. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "ai-design-for-small-businesses":
    "A 3D clay storefront facade being assembled from clay puzzle pieces, half by hand and half floating in.",
  "social-media-for-aesthetics-clinics":
    "A 3D clay phone showing a stack of Instagram carousel cards, pink ribbon thread weaving through them. Tasteful.",
  "social-media-for-construction":
    "A 3D clay phone showing a building under construction scene as a reel, pink play button highlighted.",
  "landing-pages-for-photographers":
    "A single 3D clay page standing upright on a plinth with one big glowing pink button on it, a clay camera on a tripod pointed straight at it, a scatter of blank clay photo prints on the floor. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "ecommerce-for-print-on-demand-artists":
    "A 3D clay framed art print on a small clay easel, a checkout button glowing pink in the foreground.",

  "my-website-isnt-showing-up-on-google":
    "A 3D clay search bar with a tiny clay website card sinking far below the visible results, a pink magnifying glass hovering above. Sense of being buried and unfound.",
  "every-change-takes-weeks-with-your-developer":
    "A 3D clay desk calendar with pages piling up beside a pink clay hourglass with sand drained to the bottom. A small blank pink sticky note (no writing) on the calendar. Sense of stalled, waiting time. Absolutely no text, no letters, no words, no numbers anywhere in the image.",
  "embarrassed-to-send-people-to-your-website":
    "A 3D clay smartphone face-down on a surface, a pink share arrow turning away from it. Sense of hiding a link. Restrained, editorial.",
  "your-diy-brand-looks-like-everyone-else":
    "A grid of identical grey 3D clay logo blocks with one single pink hand-shaped unique mark standing out among them. Top-down, sameness versus distinction.",

  "how-much-does-a-website-cost-uk":
    "Three 3D clay website cards on a balance scale against a single clay pound-coin stack, the scale tipping toward value. Pink highlight on the coins. Absolutely no text, no letters, no words, no numbers anywhere in the image.",
  "how-long-does-it-take-to-build-a-website":
    "A 3D clay hourglass beside a clay website card being assembled from floating panels, sand flowing as the panels lock in. Pink glow on the final panel. Sense of fast, controlled progress. No text, no numbers.",
  "how-to-rank-on-chatgpt-and-ai-search":
    "A 3D clay speech-bubble shaped like an AI chat reply, with a small clay business card rising up inside it on a pink beam, as if being recommended. Editorial, futuristic but warm. No text, no letters.",
  "how-to-choose-a-web-designer":
    "A 3D clay hand choosing one glowing pink website card from a fan of plain grey ones. Sense of a careful pick. Top-down, restrained. No text.",
  "do-i-need-a-website":
    "A 3D clay house-shaped home base with small clay social-media icons (a heart, a play triangle, a chat bubble) all pointing arrows back toward it on pink threads. Sense of a central hub. No text, no letters.",

  "google-rankings-dropped-june-2026":
    "A 3D clay search results ladder with small clay website cards sliding down its rungs, one pink card climbing back up against the flow. Sense of a shake-up and recovery. No text, no letters, no numbers.",
  "website-redesign-checklist":
    "A 3D clay website card mid-transformation, half weathered and faded grey, half fresh and pink-highlighted, with a clay checklist clipboard beside it, ticks as simple clay dots. No text, no letters.",
  "logo-design-cost-sheffield":
    "A 3D clay pink price tag tied to an abstract hand-shaped clay logo mark on a small plinth, a row of cheaper identical grey marks fading behind it. Value versus cheap. No text, no letters, no numbers.",
  "local-seo-sheffield-five-things":
    "A 3D clay map with three podium steps rising from it, a pink map pin standing on the top step, a small star-rating ribbon of five clay dots nearby. Map pack energy. No text, no letters.",
  "landing-page-vs-homepage":
    "Two 3D clay pages side by side: one busy homepage crowded with many small panels and doors, one clean focused landing page with a single glowing pink button. A clay cursor arrow choosing the focused one. No text, no letters.",

  "website-accessibility-uk-law-2026":
    "A 3D clay website card with a small pink universal-access ring symbol glowing on it and a clay ramp leading up to an open clay doorway, a cream contrast dial beside it. Sense of a site open to everyone. No text, no letters, no numbers.",
  "website-copy-that-sells":
    "A 3D clay fountain-pen nib drawing a single glowing pink line that curves into a shopping-cart button shape, a small clay speech bubble nearby. Words turning into sales. Editorial, restrained. No text, no letters, no numbers.",
  "google-business-profile-mistakes":
    "A 3D clay map pin shaped like a small storefront card, half of it faded grey and unfinished, half fresh with a pink row of five clay star dots, a little magnifying glass hovering. Local listing energy. No text, no letters, no numbers.",
  "wix-squarespace-or-custom-website":
    "Two 3D clay website cards at a fork in a clay road: one built from identical stacked template blocks, one hand-shaped and unique with a pink highlight, a clay cursor arrow between them. Kit versus custom. Top-down, editorial. No text, no letters, no numbers.",
  "how-often-should-you-redesign-your-website":
    "A 3D clay website card on a small plinth mid-transformation, one faded weathered grey panel swapping out for a fresh pink one, a clay clock-cycle arrow looping around it. Sense of periodic renewal. No text, no letters, no numbers.",

  "worse-businesses-are-taking-your-customers":
    "Two 3D clay storefronts side by side: a rough lopsided one with a glowing pink open sign shape and a queue of small clay figures outside it, and a beautifully crafted one standing empty. Sense of the wrong shop winning. No text, no letters, no numbers.",
  "your-prices-are-set-before-you-say-a-word":
    "A 3D clay price tag hanging from an invisible thread above a small clay storefront, with a clay measuring ruler pressed against the shop's facade as if measuring its looks. Pink highlight on the tag. Judged on sight. No text, no letters, no numbers.",
  "your-sunday-nights-are-going-into-canva":
    "A 3D clay desk lamp glowing over a tiny clay laptop at night, scattered clay template squares piling up beside it, a clay moon shape above. A drained hourglass nearby. Sense of late evenings lost to fiddly design work. No text, no letters, no numbers.",
  "the-admin-your-business-does-not-need-you-for":
    "A 3D clay conveyor belt carrying small completely blank clay envelopes, blank paper sheets and empty speech bubbles into a friendly rounded clay robot arm that sorts them neatly, while a clay figure walks away relaxed. Pink highlight on the sorted stack. Every surface is plain smooth clay. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "the-10pm-test":
    "A 3D clay smartphone glowing in the dark with a soft pink beam, resting on a clay sofa arm beside a clay mug, a crescent moon above. On the screen, abstract clay search-result cards. Late-night lookup energy. No text, no letters, no numbers.",
  "who-actually-owns-your-website":
    "A 3D clay house key with a small clay website card hanging from it as a keyring, a second grey hand reaching in from the edge holding an identical key. Sense of a shared key. No text, no letters, no numbers.",
  "your-enquiry-form-might-be-broken":
    "A 3D clay postbox with no back to it, pink clay envelopes falling straight through and piling up on the floor behind it, one envelope caught mid fall in a pink glow. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "almost-everyone-meets-you-on-a-phone":
    "A 3D clay shop doorway shrunk down and set into a clay phone screen with a pink awning above it, a tiny clay figure stepping in, the full size clay door standing shut and unused in the shadows behind. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "the-photos-on-your-website-are-talking":
    "Two 3D clay photo frames on a clay wall, one crisp and lit with a pink glow, one dim and blurred and slightly crooked, a small clay speech bubble rising from each. No text, no letters, no numbers.",
  "different-company-on-every-platform":
    "Four 3D clay profile cards laid out in a row, each a different colour and shape, a single pink thread trying and failing to link them. Sense of the same business looking like four. Top-down. No text, no letters, no numbers.",
  "the-spreadsheet-nobody-calls-a-problem":
    "A vast 3D clay grid of empty cells receding into the dark like a floor, one glowing pink cell propping up a leaning clay tower of stacked blocks above it. Deep ink black background filling the entire frame, edge to edge. Wide 16:9 landscape composition, no borders, no framing card, no light background. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",
  "you-never-agreed-to-work-this-way":
    "A 3D clay path made of mismatched patched together stepping stones and bits of tape, worn smooth by use, curving off into the dark. One pink stone where a proper one should be. No text, no letters, no numbers.",
  "the-same-information-typed-in-four-times":
    "Four identical 3D clay forms lined up in a row with the same small pink clay block being placed into each one by four separate clay hands. Repetition, wasted effort. No text, no letters, no numbers.",
  "when-the-person-who-just-knows-is-off":
    "A 3D clay desk with an empty chair and a single glowing pink clay lightbulb switched off above it, while three smaller clay figures stand around a machine they cannot start. No text, no letters, no numbers.",
  "when-bespoke-is-the-wrong-answer":
    "A 3D clay tailor's dummy beside a rack of perfectly good ready made clay jackets, a pink measuring tape draped between them and a clay hand reaching for the ready made one. No text, no letters, no numbers.",

  "get-found-look-the-part-get-your-time-back":
    "Three 3D clay panels standing in a row like a triptych: a clay map pin with a pink signal pulse, a small clay storefront with a polished pink facade, and a clay hourglass with the sand flowing back upward. Balanced, editorial, one system. No text, no letters, no words, no numbers.",
  "being-good-is-not-the-same-as-being-findable":
    "A beautifully crafted 3D clay trophy-quality object sitting in deep shadow at the back, while a plainer clay object sits forward under a pink spotlight beam. A clay magnifying glass sweeping past the hidden one. Sense of quality overlooked. No text, no letters, no numbers.",
  "five-star-reviews-are-not-luck":
    "A 3D clay conveyor of small plain clay star shapes being placed one at a time onto a growing pink stack by a friendly clay hand. Steady habit, not luck. Studio lighting, generous negative space. No text, no letters, no numbers.",
  "a-refresh-not-a-rebrand":
    "A single abstract 3D clay logo mark on a small plinth, one half being gently polished to a fresh pink sheen while the other half stays faded grey, a clay cloth and brush beside it. Restoration, not replacement. No text, no letters, no numbers.",
  "nobody-is-waiting-for-your-next-post":
    "A 3D clay phone screen showing a grid of nine blank clay squares, the top row lifting forward and glowing pink while the rest sit flat and grey. A tiny clay figure glancing at it briefly. No text, no letters, no numbers.",
  "nobody-is-looking-after-your-website":
    "A 3D clay website card on a small stand with ivy-like clay vines creeping over one corner and a loose pink panel hanging off, a clay spanner and oil can resting unused beside it. Quiet neglect. No text, no letters, no numbers.",
  "where-do-your-enquiries-actually-go":
    "Five clay pipes coming in from different directions carrying small pink clay envelopes, three feeding into one tidy clay tray and two spilling onto the floor. Sense of leaks in the funnel. Top-down, editorial. No text, no letters, no numbers.",
  "a-portal-instead-of-another-email-thread":
    "A long tangled clay chain of blank speech bubbles on one side, and on the other a single clean clay doorway glowing pink with a small clay figure stepping through to a lit screen. One place to look. No text, no letters, no numbers.",
  "ai-will-not-fix-what-is-not-written-down":
    "A friendly rounded clay robot arm reaching into an empty clay filing drawer, while a neat stack of plain blank clay pages glows pink on the desk beside it. Sense of needing something written first. Every surface plain smooth clay. Absolutely no text, no letters, no words, no writing, no numbers, no labels anywhere in the image.",

  "we-rebuilt-our-own-website":
    "A 3D clay website card being rebuilt by clay scaffolding and a small crane, fresh pink panels replacing faded grey ones, with a small clay mirror leaning against the scaffold. Sense of practising what you preach. No text, no letters, no numbers.",
};

async function loadPosts() {
  const files = await fs.readdir(POSTS_DIR);
  const posts = [];
  for (const f of files) {
    if (!f.endsWith(".ts")) continue;
    const src = await fs.readFile(path.join(POSTS_DIR, f), "utf8");
    const slugMatch = src.match(/slug:\s*"([^"]+)"/);
    const titleMatch = src.match(/title:\s*"([^"]+)"/);
    if (slugMatch && titleMatch) {
      posts.push({ slug: slugMatch[1], title: titleMatch[1] });
    }
  }
  return posts;
}

async function generateOne(post) {
  const outPath = path.join(OUT_DIR, `${post.slug}.jpg`);
  if (!FORCE) {
    try {
      await fs.access(outPath);
      console.log(`skip ${post.slug} (exists)`);
      return;
    } catch {}
  }

  const prompt = [
    SYSTEM_STYLE,
    PER_POST_PROMPT[post.slug] ?? `Concept for an article titled "${post.title}". Abstract, editorial, no text.`,
  ].join(" ");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`FAIL ${post.slug}: ${res.status} ${err.slice(0, 200)}`);
    return;
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  if (!imagePart) {
    console.error(`FAIL ${post.slug}: no image in response`);
    return;
  }

  const buf = Buffer.from(imagePart.inlineData.data, "base64");
  await fs.writeFile(outPath, buf);
  console.log(`wrote ${post.slug}.jpg (${(buf.length / 1024).toFixed(0)}KB)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const posts = await loadPosts();
  const targets = TARGET_SLUG ? posts.filter((p) => p.slug === TARGET_SLUG) : posts;

  if (targets.length === 0) {
    console.error("no posts matched");
    process.exit(1);
  }

  console.log(`generating ${targets.length} covers${FORCE ? " (force)" : ""}`);
  for (const post of targets) {
    await generateOne(post);
    await new Promise((r) => setTimeout(r, 800));
  }
}

await main();
