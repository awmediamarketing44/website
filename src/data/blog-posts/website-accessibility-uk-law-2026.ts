import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "website-accessibility-uk-law-2026",
  title: "Is Your Website Legal? UK Accessibility Rules Every Business Should Know in 2026",
  tag: "Web Design",
  excerpt:
    "Accessibility used to be a nice-to-have. In 2026 it's edging towards a legal expectation, and it quietly decides whether a big chunk of your customers can use your site at all. Here's what actually matters, in plain English.",
  metaDescription:
    "UK website accessibility explained for business owners in 2026: what the law expects, the WCAG basics that matter, and the practical fixes that widen your customer base.",
  date: "July 2026",
  readingMinutes: 7,
  coverImage: "/images/blog/website-accessibility-uk-law-2026-v2.jpg",
  body: [
    {
      type: "p",
      text: "Accessibility is one of those words that makes business owners glaze over. It sounds like a compliance chore, something for lawyers and big corporations. It isn't. At its core, accessibility means one simple thing: can everyone who lands on your website actually use it? For a surprising number of small business sites, the honest answer is no, and that's costing enquiries every single day.",
    },
    {
      type: "p",
      text: "Around one in five people in the UK has a disability of some kind: sight, hearing, motor, or cognitive. That's not a niche group you can afford to ignore. It's roughly the same slice of the population as left-handed people, and you'd never build a shop only right-handers could walk into. Here's what's changed, what the law now expects, and the practical fixes that matter most.",
    },
    { type: "h2", text: "What's actually changed" },
    {
      type: "p",
      text: "The direction of travel is clear across the UK and Europe: accessibility is moving from optional to expected. The European Accessibility Act came into force in June 2025, and while the UK sits outside the EU now, any business selling to European customers is caught by it. Domestically, the Equality Act already requires businesses to make reasonable adjustments so disabled people aren't put at a disadvantage, and courts and regulators increasingly read that as covering your website, not just your front door.",
    },
    {
      type: "p",
      text: "Translation for a normal business owner: nobody is going to kick your door down over a missing alt tag tomorrow. But the standard you'll be measured against is rising, the risk of a complaint is real, and the businesses getting ahead of it are the ones that win the customers everyone else is quietly turning away.",
    },
    {
      type: "quote",
      text: "An accessible website isn't a favour you do for a minority. It's a better website for everyone, and it happens to be the version Google prefers too.",
    },
    { type: "h2", text: "The standard everyone points to: WCAG" },
    {
      type: "p",
      text: "When people talk about web accessibility, they mean WCAG, the Web Content Accessibility Guidelines. It has three levels: A, AA and AAA. You don't need to memorise any of it. The target almost everyone aims for is AA, and it boils down to four common-sense principles: your site should be perceivable, operable, understandable and robust. Below is what each of those actually means when you're staring at your own website.",
    },
    { type: "h2", text: "The fixes that matter most" },
    { type: "h3", text: "1. Colour contrast you can actually read" },
    {
      type: "p",
      text: "The single most common failure we find. Pale grey text on a white background looks elegant to a designer and is invisible to a lot of real people, including anyone over fifty reading on a phone in daylight. Text needs enough contrast against its background to be read comfortably. This is a five-minute check and one of the highest-impact fixes there is.",
    },
    { type: "h3", text: "2. Alt text on images" },
    {
      type: "p",
      text: "Every meaningful image needs a short written description so screen readers can tell a blind user what it shows. It's a small habit that also happens to help Google understand your images. Decorative images can be marked to skip, but your product shots, team photos and diagrams should all describe themselves.",
    },
    { type: "h3", text: "3. It has to work without a mouse" },
    {
      type: "p",
      text: "Plenty of people navigate entirely by keyboard, tabbing through a page. If your menus, forms and buttons can't be reached and used with the Tab and Enter keys, a chunk of your audience is locked out. Try it yourself: put your mouse down and see if you can get through your own contact form.",
    },
    { type: "h3", text: "4. Forms that explain themselves" },
    {
      type: "p",
      text: "Labels on every field, clear error messages that say what went wrong and how to fix it, and no fields that rely on colour alone to signal a problem. Your contact and enquiry forms are where the money is. If they're confusing to anyone, that's a lost lead, disabled or not.",
    },
    { type: "h3", text: "5. Real headings and structure" },
    {
      type: "p",
      text: "Screen readers let people jump around a page by its headings, the way a sighted person skims. That only works if your headings are proper structural headings, not just big bold text. This is invisible to most visitors and completely essential to some.",
    },
    { type: "h2", text: "The bit nobody tells you: accessibility helps everyone" },
    {
      type: "ul",
      items: [
        "Good contrast helps everyone reading on a phone in bright sunlight, not just people with low vision.",
        "Captions on videos help the deaf and the person watching on mute in a waiting room.",
        "Clear structure and plain language help stressed, distracted and rushed people, which is most of us.",
        "Keyboard-friendly, well-structured pages are exactly what Google's crawler rewards, so accessibility and SEO pull in the same direction.",
      ],
    },
    {
      type: "p",
      text: "That's the part that reframes the whole thing. You're not spending money to satisfy a rule. You're building a site more of your customers can use, that ranks better, and that quietly removes a legal risk at the same time.",
    },
    { type: "h2", text: "How to check where you stand" },
    {
      type: "ol",
      items: [
        "Run your homepage through a free contrast checker and fix anything that fails.",
        "Put your mouse away and try to complete your own enquiry form by keyboard alone.",
        "Ask someone to turn on their phone's screen reader and listen to your homepage read aloud.",
        "Check every important image has a sensible alt description.",
        "If any of that feels overwhelming, that's your sign to get a proper accessibility pass done rather than guessing.",
      ],
    },
    {
      type: "callout",
      label: "Not sure if your site makes the grade?",
      text: "We'll run an accessibility check on your website, tell you plainly what's failing and what it's costing you, and give you a fixed plan to put it right. Free 20-minute call, no jargon.",
      href: "/contact",
      linkLabel: "Book a free accessibility check",
    },
    {
      type: "p",
      text: "The honest summary: accessibility isn't a box to tick, it's a measure of how many of your customers can actually do business with you. Getting it right in 2026 is cheaper than most owners fear, better for your rankings, and increasingly the difference between a site that welcomes everyone and one that quietly turns people away.",
    },
  ],
  relatedSlugs: [
    "real-reason-website-isnt-converting",
    "embarrassed-to-send-people-to-your-website",
    "website-redesign-checklist",
  ],
};

export default post;
