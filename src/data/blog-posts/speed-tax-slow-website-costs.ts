import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "speed-tax-slow-website-costs",
  title: "The Speed Tax: Why Your Slow Website Costs You Clients",
  tag: "Strategy",
  excerpt:
    "Every second your site takes to load over two seconds, you lose roughly 7 percent of visitors. That is the speed tax, and it is invoiced in clients you never met.",
  metaDescription:
    "Slow websites quietly cost UK businesses real money. The speed tax explained in plain English, the biggest speed killers, and how to actually fix them.",
  date: "February 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/speed-tax-slow-website-costs.jpg",
  body: [
    {
      type: "p",
      text: "Your website is too slow. I have not seen it, and I am still 80 percent confident. Every second your site spends loading past two seconds, you lose roughly 7 percent of the people who clicked. That is not a marketing slogan. It is what Google, Akamai, Portent and a stack of other people who measure these things have found, repeatedly, for years.",
    },
    {
      type: "p",
      text: "The reason most owners refuse to believe it is simple. You never see the people who left. There is no bounced visitor standing in your shop saying \"I would have bought but the page was crap\". They just close the tab and ask a competitor. That is the speed tax. It is invoiced in clients you never met.",
    },
    {
      type: "h2",
      text: "What \"fast\" actually means in 2026",
    },
    {
      type: "p",
      text: "Forget stopwatch numbers. Google measures real-world speed with three Core Web Vitals. You only need to remember two of them.",
    },
    {
      type: "p",
      text: "LCP (Largest Contentful Paint) is how long it takes for the biggest thing on screen, usually your hero image or headline, to actually appear. Good is under 2.5 seconds. Anything over 4 seconds and Google treats your page like a slow restaurant: still open, but not recommended.",
    },
    {
      type: "p",
      text: "CLS (Cumulative Layout Shift) is the jumpiness. You know when you go to tap a button and the page leaps and you tap an ad instead? That. Good is under 0.1. Most pages built in cheap page builders are 3 to 5 times worse than that.",
    },
    {
      type: "callout",
      label: "The honest version",
      text: "If your homepage takes 5 seconds to settle, your premium pricing means nothing. The site is telling visitors \"we do not really care\" before your copy gets a word in.",
    },
    {
      type: "h2",
      text: "The four things actually slowing your site down",
    },
    {
      type: "p",
      text: "After auditing hundreds of UK small business sites, the same culprits turn up every single time. None of them are exotic.",
    },
    {
      type: "ul",
      items: [
        "Uncompressed images. A 4MB hero photo straight out of a Canon. Modern formats (WebP, AVIF) get the same image down to 200KB without anyone noticing.",
        "Page builder bloat. Elementor, Divi and friends inject hundreds of kilobytes of CSS and JavaScript before your content shows up. Useful tools, but they need a tidy hand.",
        "Autoplay video backgrounds. That \"premium\" looped video header is 8MB on mobile, kills LCP, drains battery and makes Google quietly downrank you.",
        "Third-party widgets. The Trustpilot widget, the chat bubble, the cookie banner, the Facebook pixel, the GA4 tag. Each one is fine. All five together is why your phone fan starts spinning.",
      ],
    },
    {
      type: "h2",
      text: "How to actually diagnose it (without becoming a developer)",
    },
    {
      type: "p",
      text: "Go to pagespeed.web.dev and put your homepage URL in. Ignore the big number at the top. It is a distraction.",
    },
    {
      type: "p",
      text: "Scroll to the \"Core Web Vitals Assessment\" panel. Look at the Field Data, not the Lab Data. Field Data is what real people on real phones experienced over the last 28 days. Lab Data is a simulated test in a clean room. Real visitors live in the real world.",
    },
    {
      type: "p",
      text: "If LCP is red or amber, you have an image or font problem 9 times out of 10. If CLS is red, you have ads, late-loading widgets, or images without dimensions. The PageSpeed diagnostic section will literally name the files. Send that to whoever built your site.",
    },
    {
      type: "h2",
      text: "What good looks like",
    },
    {
      type: "p",
      text: "A well-built UK small business site in 2026 should hit LCP under 2 seconds on mobile 4G, CLS under 0.05, and weigh less than 1MB on the first paint. That is not aspirational. That is competent. We hit it on every site we ship, AI-Accelerated or Bespoke, because slow is a decision, not bad luck.",
    },
    {
      type: "p",
      text: "Your homepage has roughly three seconds to convince someone you are worth their time. Two of those are spent loading. Spend them wisely.",
    },
  ],
};

export default post;
