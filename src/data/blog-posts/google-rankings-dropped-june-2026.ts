import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "google-rankings-dropped-june-2026",
  title: "Rankings Dropped in June 2026? What Google Changed and What to Do About It",
  tag: "SEO",
  excerpt:
    "Google rolled out two big updates in late June 2026 and thousands of UK small business sites slid down the results. Here's what actually changed, in plain English, and the honest checklist for getting your positions back.",
  metaDescription:
    "Google's June 2026 core and spam updates explained for business owners: why rankings dropped, what Google now rewards, and the practical steps to recover.",
  date: "July 2026",
  readingMinutes: 7,
  coverImage: "/images/blog/google-rankings-dropped-june-2026.jpg",
  body: [
    {
      type: "p",
      text: "If your website has slipped down Google over the last couple of weeks, you're not imagining it and you're not alone. In late June 2026 Google rolled out two updates almost back to back: a core update, which reshuffles how it judges quality across the board, and a spam update, which specifically targets thin, low-value pages. Together they've moved a lot of furniture.",
    },
    {
      type: "p",
      text: "We've spent the days since inside Search Console and rank trackers for our own site and our clients', so this isn't theory. Here's what changed, who got hit, and what actually works to recover, without the panic or the jargon.",
    },
    { type: "h2", text: "What Google changed in June 2026" },
    {
      type: "p",
      text: "The core update raised the bar on what Google considers a page worth ranking. The pattern in the data is consistent: pages that thoroughly answer what the searcher wants, written by identifiable real people, held up or improved. Thin pages that exist mainly to catch a keyword dropped, fast.",
    },
    {
      type: "p",
      text: "The spam update went after a specific tactic: doorway pages. That's when a site publishes a stack of near-identical pages targeting every variation of a search, think one page per town, all saying the same thing, with nothing genuinely local or different on any of them. Google has disliked these for years. As of June, it's actively demoting them.",
    },
    {
      type: "quote",
      text: "In 2026, SEO is less about volume and more about authority. Thirty genuinely useful pages will outrank three hundred thin ones.",
    },
    { type: "h2", text: "How to tell if you were hit" },
    {
      type: "ul",
      items: [
        "Your rank tracker shows drops across many keywords at once, starting late June, rather than one page slipping gradually.",
        "In Search Console, impressions fall off a cliff while your site stays technically healthy (no errors, no manual actions).",
        "Pages sit in Search Console's 'Crawled, currently not indexed' bucket. That's Google saying: we've seen this page and decided it isn't worth indexing.",
        "Location or service pages that used to rank on page 2 to 3 have vanished from the top 100.",
      ],
    },
    {
      type: "p",
      text: "One important reassurance: an algorithmic drop is not a penalty. If Search Console shows no manual action, nothing is 'wrong' with your site in Google's eyes. It has simply re-scored quality, and you can score better.",
    },
    { type: "h2", text: "What Google now rewards, in plain English" },
    { type: "h3", text: "1. Depth over volume" },
    {
      type: "p",
      text: "One substantial page that genuinely answers a search now beats five thin pages chasing variations of it. If you have near-duplicate pages targeting slightly different phrasings of the same service, consolidate them into one strong page and redirect the rest.",
    },
    { type: "h3", text: "2. Named, real people" },
    {
      type: "p",
      text: "The June data shows most dropped sites had one thing in common: no identifiable author or team. Vague, anonymous content lost; content signed by a named expert with a track record won. Put real names, real photos and real credentials on your site, on the about page, on service pages, on every article.",
    },
    { type: "h3", text: "3. Pages that are part of the site, not bolted on" },
    {
      type: "p",
      text: "Google pays attention to whether a page is woven into your site: linked from other pages, referenced by your articles, sitting in a sensible structure. A page that only exists in the sitemap, with no internal links pointing at it, looks exactly like the doorway pages the spam update targets, even when it isn't one.",
    },
    { type: "h3", text: "4. Genuine local proof on local pages" },
    {
      type: "p",
      text: "Location pages are still fine, Google has said so explicitly. What separates a legitimate local page from doorway spam is real substance: the actual team serving that area, real local work, real reviews, answers to what people in that place actually ask. If you could swap the town name and nothing else would change, that's the problem.",
    },
    { type: "h2", text: "The recovery checklist" },
    {
      type: "ol",
      items: [
        "Check Search Console for manual actions first. Almost certainly clear, but rule it out.",
        "List your pages that dropped and be honest: is each one genuinely useful and different, or a keyword variation?",
        "Consolidate near-duplicates into one strong page each, with 301 redirects from the retired versions.",
        "Add internal links to every page you want to rank, from your footer, your service pages and your blog.",
        "Put named authors with bios and photos on your content, and mark them up in your schema.",
        "Deepen your best near-miss pages, positions 5 to 15, rather than publishing new thin ones.",
        "Fix technical duplication: one canonical domain (www or not, pick one and 301 the other), one URL per page.",
        "Then be patient. Recoveries from core updates typically show over weeks and consolidate at the next update.",
      ],
    },
    { type: "h2", text: "What not to do" },
    {
      type: "p",
      text: "Don't panic-publish twenty new pages, that's pouring petrol on the exact fire Google just lit. Don't buy links. Don't 'refresh' every page with AI-spun rewrites, thin content with new words is still thin content. And don't rebuild the whole site in a rush; drops caused by a quality re-score need quality fixes, not a new coat of paint.",
    },
    {
      type: "callout",
      label: "Had a drop you can't explain?",
      text: "We'll look at your Search Console data, tell you exactly what got hit and why, and give you a straight recovery plan. Free 15-minute call, no pitch.",
      href: "/contact",
      linkLabel: "Book a free ranking review",
    },
    {
      type: "p",
      text: "The honest summary: Google just got stricter about quality and authenticity, which is genuinely good news for real businesses with real expertise. The winners from June 2026 are sites that prove who they are, answer properly, and don't try to game the volume. That's a bar worth clearing, and it's very clearable.",
    },
  ],
  relatedSlugs: [
    "my-website-isnt-showing-up-on-google",
    "get-your-sheffield-business-found-online",
    "how-to-rank-on-chatgpt-and-ai-search",
  ],
};

export default post;
