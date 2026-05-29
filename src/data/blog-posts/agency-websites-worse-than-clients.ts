import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "agency-websites-worse-than-clients",
  title: "Why Most Agency Websites Are Worse Than Their Clients' Sites",
  tag: "Strategy",
  excerpt:
    "Half the agencies pitching you a £10k rebuild have their own site running a 4-second LCP, stock photo of a handshake, and a 2019 case study. Walk away.",
  metaDescription:
    "If an agency's own website is slow, bloated and full of stock photos, that is your answer. How to vet a web design agency by judging their actual work.",
  date: "January 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/agency-websites-worse-than-clients.jpg",
  body: [
    {
      type: "p",
      text: "Open ten web design agency websites in your area and time how long they take to load. I will save you the trouble. Half of them are slower than the sites of the clients they are trying to win. Bloated WordPress builds, stock photo of a handshake, vague headline about \"crafting digital experiences\", and a case study from 2019.",
    },
    {
      type: "p",
      text: "These are the people quoting you £10k for a rebuild. The cheek of it is the point.",
    },
    {
      type: "h2",
      text: "Builder's-house-syndrome",
    },
    {
      type: "p",
      text: "There is a classic problem in trades. The plumber's own bathroom is the last one to get fixed. The builder lives in a half-finished house. Web agencies are no different. The site is always \"about to be redesigned\". It has been about to be redesigned since 2022.",
    },
    {
      type: "p",
      text: "There are four reasons for this, and none of them are good ones for you, the prospect.",
    },
    {
      type: "ol",
      items: [
        "Client work always takes priority because it pays. Internal work always loses the calendar war.",
        "The marketing team and the design team cannot agree on positioning, so the homepage gets rewritten every 6 months and never shipped.",
        "Nobody wants to be the person who decides. So three opinions get baked into one mediocre header.",
        "They are scared to ship. Because if their own site is judged and found wanting, what does that say about the rebuild they just sold you?",
      ],
    },
    {
      type: "callout",
      label: "Honest test",
      text: "If our site is slow, stale, or unclear, you have every right to walk. We are asking you to trust us with the front door to your business. The least we can do is keep our own in order.",
    },
    {
      type: "h2",
      text: "What it actually means when an agency's own site is good",
    },
    {
      type: "p",
      text: "Forget the case studies for a second. A great agency website is itself the case study. When you land on one and it loads instantly, the message is sharp, the design feels considered, and the proof is right there, you are looking at three things in a row:",
    },
    {
      type: "ul",
      items: [
        "They ship. They actually finish things. They are not hostages to their own perfectionism.",
        "They decide. Someone in the room has taste and authority. The site is not a committee compromise.",
        "They live their craft. They use the tools, frameworks and tactics they will sell you on Monday morning.",
      ],
    },
    {
      type: "p",
      text: "Compare that to the alternative. Slow agency homepage, three-tier nav, a slider on the hero (in 2026, a slider), and a contact form with eight fields. Why would they suddenly do better work for you?",
    },
    {
      type: "h2",
      text: "How to vet a web design agency in 10 minutes",
    },
    {
      type: "p",
      text: "Stop reading their About page. Do this instead.",
    },
    {
      type: "ul",
      items: [
        "Open their homepage on your phone, on 4G, with cache cleared. Count seconds out loud. Over 3 is a no.",
        "Run their URL through pagespeed.web.dev. If their own Core Web Vitals are red, run.",
        "Look at three case studies. Click through to the live sites. Are they still live? Still fast? Still on-brand?",
        "Check the date on their latest blog post or case study. If it is more than 6 months old, they are coasting.",
        "Look at the team photos. Real humans or AI placeholders? Either is fine, but inconsistency is a tell.",
      ],
    },
    {
      type: "h2",
      text: "The meta point",
    },
    {
      type: "p",
      text: "You can apply this to any agency you hire. Copywriters with weak About pages. Photographers with broken portfolios. SEO agencies that do not rank for their own city plus \"SEO agency\". The first piece of work you should judge them on is the one they did for themselves. It is the only project where they had unlimited budget, total creative freedom, and no client to blame.",
    },
    {
      type: "p",
      text: "If they could not nail that one, what makes you think they will nail yours?",
    },
  ],
};

export default post;
