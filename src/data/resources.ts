// Free resources hub (/free-resources).
//
// Two kinds of thing live here:
//   1. `downloads` — gated PDF guides. The capture form is NOT built here: it
//      lives in the AW CRM's lead-magnet engine (crm.awmedia.marketing/get/<slug>),
//      which already stores the lead, tags the contact in ActiveCampaign and
//      emails a tokenised download link. We embed that form on
//      /free-resources/[slug] via CrmEmbed, same pattern as /enquiry/[slug].
//   2. `audits` — the free interactive tools that already live on the site.
//
// Adding a guide = one entry below + one magnet created in the CRM with a
// MATCHING slug. If the slugs disagree the embed 404s, so keep them in step.

export interface ResourceDownload {
  /** Must match the magnet slug in the CRM (max 30 chars, a-z 0-9 and dashes). */
  slug: string;
  title: string;
  /** Short label above the title on the card. */
  kicker: string;
  /** Card blurb, sells the download. */
  description: string;
  /** What they actually get, 3 or 4 short lines. */
  points: string[];
  /** Shown on the card as a format hint, e.g. "8 page PDF". */
  format: string;
  cta: string;
  /** Longer intro used on the capture page. */
  intro: string;
}

export interface ResourceAudit {
  title: string;
  kicker: string;
  description: string;
  href: string;
  cta: string;
}

export const downloads: ResourceDownload[] = [
  {
    slug: "website-that-sells-checklist",
    title: "The Website That Sells Checklist",
    kicker: "30 checks",
    description:
      "Thirty checks you can run on your own website in an afternoon, then score yourself out of thirty to see exactly where you are losing enquiries.",
    points: [
      "30 plain-English checks, no tools needed",
      "Covers message, contact, speed and proof",
      "Score yourself and see what to fix first",
    ],
    format: "8 page PDF",
    cta: "Get the checklist",
    intro:
      "Thirty checks, in the order worth doing them. Pop your details in and we will email it straight over.",
  },
  {
    slug: "what-a-website-should-cost",
    title: "What A Website Should Actually Cost In 2026",
    kicker: "Price guide",
    description:
      "The real UK price bands, what genuinely drives the number up or down, and the things in a quote that should make you ask a second question.",
    points: [
      "The four price bands, explained honestly",
      "The six things that drive the cost",
      "Red flags to spot before you sign",
      "Our own published prices, for reference",
    ],
    format: "8 page PDF",
    cta: "Get the price guide",
    intro:
      "Nobody gives you a straight answer on price, so here is ours, including what we charge. Pop your details in and we will email it over.",
  },
  {
    slug: "brand-basics",
    title: "Brand Basics: Look Like The Premium Option",
    kicker: "Branding",
    description:
      "Why two businesses doing identical work can charge wildly different prices, and the four things that decide how much you can charge before you have said a word.",
    points: [
      "What a working logo actually needs",
      "Colour and type, without the guesswork",
      "The consistency audit that costs nothing",
      "Five things you can fix this week",
    ],
    format: "8 page PDF",
    cta: "Get the brand guide",
    intro:
      "Four things carry almost all the weight, and three of them are free to fix. Pop your details in and we will email it over.",
  },
  {
    slug: "local-seo-starter",
    title: "Get Found On Google: Local SEO Starter",
    kicker: "Local SEO",
    description:
      "The local SEO work that actually moves the needle for a small business, in priority order. No tools to buy and no agency required.",
    points: [
      "Your Google Business Profile, done properly",
      "The details consistency fix most skip",
      "How to actually get reviews",
      "If you only have one afternoon, do this",
    ],
    format: "8 page PDF",
    cta: "Get the SEO starter",
    intro:
      "Most local businesses are not outranked, just less complete than the one above them. Pop your details in and we will email it over.",
  },
  {
    slug: "visible-to-ai",
    title: "Is Your Business Visible To AI?",
    kicker: "AI search",
    description:
      "More people are asking ChatGPT for a recommendation than are scrolling page two of Google. Here is how AI decides who to name, and why most websites get skipped.",
    points: [
      "How an AI decides who to recommend",
      "The five pillars that decide visibility",
      "Six checks you can run yourself today",
      "Pairs with our free GEO audit tool",
    ],
    format: "8 page PDF",
    cta: "Get the AI guide",
    intro:
      "Ranking fourth on Google still puts you on the page. Being fourth in an AI's opinion means you were never mentioned. Pop your details in and we will email it over.",
  },
  {
    slug: "get-your-week-back",
    title: "Get Your Week Back",
    kicker: "Save time",
    description:
      "The admin most owners still do by hand, and which bits are genuinely worth handing to a system. For people too busy to research this properly, which is why it never gets done.",
    points: [
      "A five day audit to find the time sinks",
      "The five jobs worth fixing first",
      "What AI is actually good at, and what it is not",
      "How to do it without losing a weekend",
    ],
    format: "8 page PDF",
    cta: "Get the time guide",
    intro:
      "Most owners are not short of hours, they are short of systems. Pop your details in and we will email it over.",
  },
];

export const audits: ResourceAudit[] = [
  {
    title: "Website Audit",
    kicker: "Google-powered, 30 seconds",
    description:
      "We run your site through Google's own analysis engine, covering performance, mobile, SEO and best practices, then show you what to fix first.",
    href: "/website-audit",
    cta: "Run my website audit",
  },
  {
    title: "Social Media Audit",
    kicker: "Your real profiles, scanned",
    description:
      "We scan your actual social profiles and score you across profile, content, consistency, engagement and growth, with your quick wins instantly.",
    href: "/social-audit",
    cta: "Run my social audit",
  },
  {
    title: "GEO Audit",
    kicker: "Can AI see you?",
    description:
      "Checks how visible your site is to ChatGPT, Perplexity and Google's AI across five pillars, and gives you the gaps stopping you being recommended.",
    href: "/geo-audit",
    cta: "Get my GEO score",
  },
  {
    title: "AI Opportunity Score",
    kicker: "2 minutes, 11 questions",
    description:
      "Answer eleven quick questions and get a score out of 100, plus the three places AI would genuinely pay off first in your business.",
    href: "/ai-score",
    cta: "Get my AI score",
  },
];

/**
 * The newest tool, pulled OUT of the audits grid and given a full-width feature
 * tile above it. Two reasons: it is the most topical thing we have, and a fifth
 * card would leave a dangling item in the 2-column grid.
 */
export const featuredAudit: ResourceAudit & { pill: string } = {
  title: "AI Label Checker",
  kicker: "Instant, no sign up, nothing stored",
  pill: "New",
  description:
    "Platforms decide the AI badge from tags hidden inside your file, and one AI remove or generative fill stamps that tag across the whole thing. Drop in a carousel, a graphic or a photo and see which platforms will flag it, and exactly what caused it.",
  href: "/ai-label-check",
  cta: "Check my image",
};

export function getDownload(slug: string): ResourceDownload | undefined {
  return downloads.find((d) => d.slug === slug);
}

/** The CRM lead-magnet capture form for a given guide. */
export function magnetFormUrl(slug: string): string {
  return `https://crm.awmedia.marketing/get/${slug}`;
}
