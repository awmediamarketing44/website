import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "landing-page-vs-homepage",
  title: "Landing Page vs Homepage: Why Your Ads Aren't Converting",
  tag: "Marketing",
  excerpt:
    "Decent ads, sensible budget, clicks coming in, and barely any enquiries. Nine times out of ten the problem isn't the ads. It's that you're sending paid traffic to your homepage.",
  metaDescription:
    "Landing page vs homepage explained: why ad traffic converts poorly on a homepage, what a dedicated landing page does differently, and when you need one.",
  date: "July 2026",
  readingMinutes: 5,
  coverImage: "/images/blog/landing-page-vs-homepage.jpg",
  body: [
    {
      type: "p",
      text: "Here's a pattern we see constantly. A business starts running Meta or Google ads. The ads are decent, the targeting is sensible, the clicks arrive, and the enquiries don't. The conclusion is usually 'ads don't work for us'. Nine times out of ten, the ads were fine. The page they landed on wasn't built to sell.",
    },
    { type: "h2", text: "Your homepage has too many jobs" },
    {
      type: "p",
      text: "A homepage is your front door. It has to welcome everyone: new visitors, returning customers, job applicants, suppliers, people who want the phone number. So it offers everything, a navigation bar, six services, an about section, blog links, social icons. For general visitors, that's right.",
    },
    {
      type: "p",
      text: "But someone who clicked an ad isn't a general visitor. They clicked one specific promise. Land them on a page offering twelve directions and most of them wander, get distracted, and leave. Every navigation link on that page is an exit from the thing you paid for them to do.",
    },
    { type: "h2", text: "What a landing page does differently" },
    {
      type: "p",
      text: "A landing page has one job: continue the exact conversation the ad started. One offer, one audience, one action. No navigation to wander off through. The headline matches the ad's promise, the proof answers the doubts that audience actually has, and the whole page funnels to a single next step: book, enquire, buy.",
    },
    {
      type: "ul",
      items: [
        "Message match: the headline continues what the ad promised, so nobody feels lost on arrival.",
        "One action: a single call to action repeated down the page, instead of six competing options.",
        "Proof where it counts: reviews, results and guarantees placed exactly where doubts appear.",
        "No exits: no nav bar, no footer maze, nowhere to drift off to.",
        "Speed: paid traffic is mostly mobile, and every second of load time bleeds paid clicks.",
      ],
    },
    { type: "h2", text: "The difference in numbers" },
    {
      type: "p",
      text: "Homepages typically convert paid traffic at somewhere around 1 to 3 percent. A well-built dedicated landing page routinely does 10 to 25 percent for the same traffic. Same ads, same budget, three to ten times the enquiries. That's why the page, not the ad, is usually the highest-leverage fix in an underperforming campaign.",
    },
    { type: "h2", text: "When you need one, and when you don't" },
    {
      type: "p",
      text: "You need a landing page when you're paying for traffic: ads, a launch, an email campaign, a QR code on print. You don't need one for general brand searches, someone Googling your business name wants your actual website, or for browsing traffic that genuinely benefits from exploring. The rule of thumb: paid click, dedicated page.",
    },
    {
      type: "callout",
      label: "Running ads at your homepage right now?",
      text: "We design conversion-focused landing pages from £695, live within days to a couple of weeks, tracking included. Against any real ad budget, it usually pays for itself inside the first campaign.",
      href: "/landing-page-design-uk",
      linkLabel: "See our landing page design service",
    },
    {
      type: "p",
      text: "Before you kill the ad account, look at where the clicks land. The ads bought you the visitor. The page is what turns them into a customer, and that's the part most campaigns skipped.",
    },
  ],
  relatedSlugs: [
    "real-reason-website-isnt-converting",
    "what-695-buys-in-web-design",
    "google-rankings-dropped-june-2026",
  ],
};

export default post;
