import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "website-redesign-checklist",
  title: "Website Redesign Checklist: 10 Things to Get Right Before You Touch the Design",
  tag: "Web Design",
  excerpt:
    "A website redesign done badly can wipe out years of Google rankings overnight. Done properly, it wins you more work AND keeps everything you've earned. Here's the checklist we run on every redesign.",
  metaDescription:
    "The 10-point website redesign checklist: protect your Google rankings, keep what works, fix what's costing you enquiries. From a Sheffield studio with 450+ builds.",
  date: "July 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/website-redesign-checklist.jpg",
  body: [
    {
      type: "p",
      text: "Most businesses only redesign their website when it's become embarrassing. Fair enough. But the redesign itself is where things go wrong: we regularly meet business owners whose shiny new site quietly lost them their Google rankings, because nobody thought about anything except the design.",
    },
    {
      type: "p",
      text: "Here's the checklist we run before, during and after every redesign we do. Use it with whoever builds yours.",
    },
    { type: "h2", text: "Before you start" },
    { type: "h3", text: "1. Know why you're redesigning" },
    {
      type: "p",
      text: "'It looks dated' is a reason, but it's not a goal. Get specific: enquiries have dropped, it's clunky on mobile, it doesn't reflect what the business is now, you're losing quotes to a competitor with a sharper site. The specific problem shapes the whole project, and tells you afterwards whether the redesign worked.",
    },
    { type: "h3", text: "2. Find out what's already working" },
    {
      type: "p",
      text: "Before anyone deletes anything, pull your analytics and Search Console. Which pages bring traffic? Which ones rank? Which ones convert? Those pages are assets. A redesign should improve them, never casually bin them. This is the single most-skipped step and the most expensive one to skip.",
    },
    { type: "h3", text: "3. List every URL on your current site" },
    {
      type: "p",
      text: "Every page that exists now needs a decision: keep it, improve it, or redirect it somewhere sensible. Any URL that just disappears takes its Google value and any links pointing at it to the grave. Your designer should produce a redirect map before the new site goes anywhere near live.",
    },
    { type: "h2", text: "During the redesign" },
    { type: "h3", text: "4. Keep your page addresses where you can" },
    {
      type: "p",
      text: "If /services/roofing ranks, the new site should keep that exact address unless there's a strong reason not to. Same content at the same URL keeps its history. Where URLs must change, every old address gets a 301 redirect to its new home. No exceptions, no 'we'll sort it after launch'.",
    },
    { type: "h3", text: "5. Rewrite for your customer, not your ego" },
    {
      type: "p",
      text: "The biggest conversion win in most redesigns isn't visual. It's replacing 'welcome to our website, we are a leading provider of...' with copy about the customer's problem and the result they get. Every page should answer: what do I get, why you, what do I do next.",
    },
    { type: "h3", text: "6. Design mobile-first, genuinely" },
    {
      type: "p",
      text: "For most local businesses, 60 to 80 percent of visitors are on a phone. If you're only shown desktop mockups, ask to see the phone version of every page before you sign anything off.",
    },
    { type: "h3", text: "7. Set a speed budget" },
    {
      type: "p",
      text: "New sites tend to launch heavier than old ones: bigger images, more animation, more scripts. Slow costs you both rankings and patience. Agree up front that the new site must load faster than the old one, and have that measured, not promised.",
    },
    { type: "h2", text: "Before and after launch" },
    { type: "h3", text: "8. Test the redirects before switching over" },
    {
      type: "p",
      text: "Every URL on your list from step 3 should be tested on the staging site: does it load, or does it redirect to the right place? Ten minutes of checking here saves months of lost rankings.",
    },
    { type: "h3", text: "9. Keep your analytics and tracking alive" },
    {
      type: "p",
      text: "Google Analytics, Search Console, any ad pixels, call tracking: all of it needs to carry over to the new site on day one. You want a clean before-and-after comparison, and ad campaigns that don't go blind at midnight.",
    },
    { type: "h3", text: "10. Watch the data for the first month" },
    {
      type: "p",
      text: "Rankings normally wobble for a week or two after a proper relaunch, then settle. What you're watching for is any page that lost traffic and didn't recover, usually a missed redirect or a page that got thinner in the rewrite. Caught early, it's a quick fix.",
    },
    {
      type: "callout",
      label: "Sheffield business thinking about a redesign?",
      text: "We redesign websites with the rankings protected as standard: full URL mapping, 301s, speed budget and a before-and-after report. Every existing page accounted for.",
      href: "/website-redesign-sheffield",
      linkLabel: "See our website redesign service",
    },
    {
      type: "p",
      text: "A redesign is one of the highest-leverage things a business can do online, and one of the few that can genuinely go backwards if it's rushed. Get these ten right and you keep everything you've earned while fixing everything that's been costing you.",
    },
  ],
  relatedSlugs: [
    "google-rankings-dropped-june-2026",
    "web-design-cost-sheffield",
    "embarrassed-to-send-people-to-your-website",
  ],
};

export default post;
