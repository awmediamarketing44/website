// One-shot codemod: insert a `testimonial` block into named project entries,
// placed right after that entry's `client: { ... },` block. Skips if the entry
// already has a testimonial. Run: node scripts/add-testimonials.mjs
import fs from "fs";
const FILE = "src/data/projects.ts";
let src = fs.readFileSync(FILE, "utf8");

const T = {
  "vantage-brand": {
    name: "Justin Fordham", role: "Vantage Point Performance",
    quote: "A creative genius. Got everything I wanted and then some. Took the jumbled ideas in my head and put them into exactly what I wanted. Couldn't recommend him more.",
  },
  "quickfit-ev": {
    name: "Ollie", role: "QuickFit EV",
    quote: "I've worked with Alex and AW Media on a few different businesses and can't recommend them enough. Nothing's too much trouble and everything gets sorted. This project was an online shop to make the EV charger journey as simple as possible and Alex and the team have gone above and beyond.",
  },
  "primecore-brand": {
    name: "Pete", role: "PrimeCore",
    quote: "AW doesn't just “design” he actually understands you. Who you are. What you stand for. The tone you carry. The standard you operate at. When I explained the new brand name, why I was pivoting, and the direction I wanted to build towards, he nailed it in one attempt. The entire process was completely painless. Quick turnaround, and any minor amendments were handled immediately, not just changed, but understood. He gets the rationale behind decisions, which means you never feel like you're compromising on your vision just to get something finished. When you're working with a graphic designer, trust is everything. They're shaping the first impression people have of your brand, and that matters. That's exactly why I won't go anywhere else.",
  },
  "fox-socials": {
    name: "Michael Fox", role: "Trained By Fox",
    quote: "I was very reluctant to initially enquire with Alex and his team. Having previously worked with graphic designers who I rated highly, it got to a point where the creativity across the industry just felt repetitive. Then I started seeing more and more of Alex's work and the coaches he was working with, and I could see a clear differentiation. My partner was actually the first person to work with Alex. The attention to detail he put into what he created for her Molly Rose Studios was great. That gave me the confidence to jump on a consultation call, and I immediately signed up for the fortnightly plan. Within the first three weeks, I upgraded straight to the weekly plan. Alex is not going to just design whatever you hand him. He will give honest feedback, and he will still do what you have asked, but he will tell you straight if he thinks something is not working. Overall, if you are a coach looking to level up your content, give this a try.",
  },
  "thecoachconsultant": {
    name: "The Coach Consultant", role: "Client of 10 years",
    quote: "I've worked with Alex for 10 years now. Why would I work with the same guy for 10 years? You run it on performance, reliability, deliverability. Websites, funnels, graphic designs, socials - never missed. He does not care about you going back 25 times as long as it's done right. You'll have the same type of reliability, consistency, and performance that I've had for the last decade of my career and the next decade to come.",
  },
  "icm-socials": {
    name: "ICM Education", role: "Online Coaching & Education",
    quote: "AW is the best to work with! He creates all our social media content, website, branding & lead magnets to a high standard every time. He's efficient and delivers all content on time consistently each week. His response times are excellent and the whole graphic process is smooth making it 10x easier to keep up with posting consistently on socials.",
  },
  "strength-in-us": {
    name: "Strength In Us", role: "Coaching",
    quote: "To begin Alex is nothing short of a legend - he may not advertise it but he drops everything to fix, create and build my last minute ideas that come to mind! His content is professional but his own - it never looks like anyone else's which is what makes me feel like my content is above and at the top due to it being so unique. Couldn't recommend Alex enough for all he's done for StrengthinUs and his works of art!",
  },
  "br-accountancy": {
    name: "BR Accountancy", role: "Sheffield Accountants",
    quote: "I used AW for a new logo and brand pack a couple of years ago and was really happy with it. My website was due a refresh, so I went back to them for their same service and style recently, and they didn't disappoint. My new site went live today and I love it! The team have been really helpful from start to finish, really clear on the timelines, and provided easy to use google docs for me to upload everything they need. I basically told them my vision and they made it happen. Thank you!",
  },
};

let added = 0, skipped = 0;
for (const [slug, t] of Object.entries(T)) {
  const slugIdx = src.indexOf(`slug: "${slug}"`);
  if (slugIdx === -1) { console.log(`! slug not found: ${slug}`); continue; }
  // entry spans until the next `slug: "` or end
  const nextSlug = src.indexOf('slug: "', slugIdx + 10);
  const entryEnd = nextSlug === -1 ? src.length : nextSlug;
  if (src.slice(slugIdx, entryEnd).includes("testimonial:")) {
    console.log(`~ already has testimonial: ${slug}`); skipped++; continue;
  }
  // find the client block close: first "\n    }," after "client: {"
  const clientIdx = src.indexOf("client: {", slugIdx);
  const closeIdx = src.indexOf("\n    },", clientIdx);
  if (clientIdx === -1 || closeIdx === -1 || clientIdx > entryEnd) {
    console.log(`! no client block: ${slug}`); continue;
  }
  const insertAt = closeIdx + "\n    },".length;
  const block =
    `\n    testimonial: {\n` +
    `      quote: ${JSON.stringify(t.quote)},\n` +
    `      name: ${JSON.stringify(t.name)},\n` +
    `      role: ${JSON.stringify(t.role)},\n` +
    `    },`;
  src = src.slice(0, insertAt) + block + src.slice(insertAt);
  console.log(`+ testimonial added: ${slug}`);
  added++;
}
fs.writeFileSync(FILE, src);
console.log(`\nDone. added ${added}, skipped ${skipped}.`);
