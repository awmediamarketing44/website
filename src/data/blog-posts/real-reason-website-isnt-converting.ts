import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "real-reason-website-isnt-converting",
  title: "The Real Reason Your Website Isn't Converting",
  tag: "Strategy",
  excerpt:
    "It's not your CTA colour. It's not your hero image. It's not your copy. It is your positioning, and no button tweak on earth will save a homepage that doesn't say who you help.",
  metaDescription:
    "Most websites don't convert because of weak positioning, not weak design. The 3-second test, the questions every homepage must answer, and how to fix it.",
  date: "January 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/real-reason-website-isnt-converting.jpg",
  body: [
    {
      type: "p",
      text: "Your website is not converting. You have, in order: A/B tested the button colour, rewritten the hero headline three times, added a chat widget, added a popup, removed the popup, hired a copywriter, sacked the copywriter, blamed the traffic. The problem is none of those.",
    },
    {
      type: "p",
      text: "The reason your website is not converting is positioning. Specifically, in the first 3 seconds on your homepage, I cannot tell who you help, what you do, and why I should care. No CTA tweak fixes that. You do not have a conversion problem. You have a clarity problem dressed up as a conversion problem.",
    },
    {
      type: "h2",
      text: "The 3-second test",
    },
    {
      type: "p",
      text: "Open your homepage. Show it to a stranger for 3 seconds, then close the tab. Ask them three questions:",
    },
    {
      type: "ol",
      items: [
        "Who is that website for?",
        "What does the business actually do?",
        "Why should you care, today?",
      ],
    },
    {
      type: "p",
      text: "If they cannot answer all three, your hero section has failed and nothing below it will fix that. Visitors do not scroll to figure out what you do. They leave to figure out what someone else does.",
    },
    {
      type: "callout",
      label: "The hill we will die on",
      text: "Positioning beats persuasion. A clear message in plain English will out-convert a brilliantly written paragraph about the wrong thing, every single time.",
    },
    {
      type: "h2",
      text: "Why \"we are a passionate team\" copy fails",
    },
    {
      type: "p",
      text: "Walk down any UK high street website and you will find the same headline rotation. \"We are a passionate team of digital experts.\" \"Crafting bespoke solutions for ambitious brands.\" \"Where creativity meets results.\"",
    },
    {
      type: "p",
      text: "None of these tell me who you help or why it matters. They describe how you feel about yourself. Visitors do not care how you feel about yourself. They care whether you can solve the specific problem they came here with.",
    },
    {
      type: "p",
      text: "Compare to a sharp version. \"We build websites for UK dental practices that fill the diary in 30 days.\" In 14 words I know the audience (dental practices), the deliverable (websites), the outcome (full diary), and the timeframe (30 days). I instantly self-select. If I am a dentist, I keep reading. If I am not, I leave, and that is fine, because I was never going to buy.",
    },
    {
      type: "h2",
      text: "The structural reasons most homepages flop",
    },
    {
      type: "p",
      text: "Pop the hood on a non-converting homepage and you will almost always find the same four sins.",
    },
    {
      type: "ul",
      items: [
        "Vague hero. The headline could belong to any business in any industry. Generic equals invisible.",
        "Scattered service mention. \"We do design, branding, SEO, ads, web, video, strategy.\" Pick a lane. A confused visitor is a lost visitor.",
        "Weak proof. One stock testimonial, no logos, no numbers, no faces. Belief needs evidence.",
        "Buried CTA. The only thing you want them to do is at the bottom of the page, with three competing CTAs above it. Decide what the next step is and make it obvious.",
      ],
    },
    {
      type: "h2",
      text: "The fix (and it is structural, not cosmetic)",
    },
    {
      type: "p",
      text: "Stop tweaking. Audit. Your hero section needs to do four jobs in roughly 30 words.",
    },
    {
      type: "ol",
      items: [
        "Name the audience. Who is this for.",
        "Name the outcome. What changes because of you.",
        "Name the mechanism. What you actually do to make that happen.",
        "Name the next step. One button. Not three.",
      ],
    },
    {
      type: "p",
      text: "Write that on a piece of paper before you touch the website. If it reads weak on paper, it reads weak online, no matter how nice the photography is.",
    },
    {
      type: "h2",
      text: "The uncomfortable truth",
    },
    {
      type: "p",
      text: "Most rebuilds are positioning projects pretending to be design projects. Owners hire an agency hoping that prettier pixels will rescue a muddled message. They never do. A bad message in great design is a bad message in great design.",
    },
    {
      type: "p",
      text: "Fix the message first. Then make it beautiful. In that order.",
    },
  ],
};

export default post;
