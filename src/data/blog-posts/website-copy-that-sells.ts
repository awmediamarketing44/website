import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "website-copy-that-sells",
  title: "Your Website Copy Is Costing You Customers: How to Write Words That Sell",
  tag: "Marketing",
  excerpt:
    "Most small business websites look fine and read terribly. The design gets all the attention while the words, the part that actually persuades someone to enquire, get written last and phoned in. Here's how to fix that.",
  metaDescription:
    "Why your website copy loses customers and how to write words that sell: lead with the customer's problem, cut the jargon, and turn features into outcomes. Practical, no fluff.",
  date: "July 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/website-copy-that-sells-v2.jpg",
  body: [
    {
      type: "p",
      text: "Here's an uncomfortable truth about websites: people don't buy from the one that looks best. They buy from the one that makes them feel understood. And what does that? The words. Yet copy is almost always the last thing anyone thinks about, usually scribbled into a template at 11pm the night before launch. A beautiful site with weak copy is a shop with a stunning window and a mumbling salesperson inside.",
    },
    {
      type: "p",
      text: "The good news is that writing copy that sells isn't a dark art, and you don't need to be a poet. You need to stop making a handful of very common mistakes. Here they are, and here's what to do instead.",
    },
    { type: "h2", text: "Mistake one: you talk about yourself" },
    {
      type: "p",
      text: "Open your homepage and count how many sentences start with 'We'. 'We are a family-run business.' 'We have twenty years of experience.' 'We pride ourselves on quality.' Your visitor doesn't care yet. They arrived with a problem, and they're scanning for one thing: can this lot solve it? Copy that leads with you makes them do the translation work themselves, and most won't bother.",
    },
    {
      type: "quote",
      text: "Nobody reads your website to learn about you. They read it to find out if you can help them. Write the second thing, not the first.",
    },
    {
      type: "p",
      text: "Flip it. Lead with their problem, not your credentials. 'Struggling to get found on Google?' beats 'We are an award-winning SEO agency' every time, because the first one sounds like it was written about the reader. Your experience and your awards still matter, they just come later, as proof, once you've earned their attention.",
    },
    { type: "h2", text: "Mistake two: you sell features, not outcomes" },
    {
      type: "p",
      text: "A feature is what your product is. An outcome is what it does for the customer's life. People pay for outcomes. 'Responsive design and a bespoke CMS' is a feature list. 'A website that looks sharp on every phone and lets you update it yourself in seconds' is the same thing translated into something a human actually wants.",
    },
    {
      type: "ul",
      items: [
        "Feature: '24/7 support.' Outcome: 'If something breaks at 9pm before a big launch, someone actually answers.'",
        "Feature: 'SEO optimised.' Outcome: 'The right customers find you on Google instead of your competitor.'",
        "Feature: 'Fast loading.' Outcome: 'Visitors don't give up and leave before your page even appears.'",
      ],
    },
    {
      type: "p",
      text: "The trick is to keep asking 'so what?' after every claim until you reach something the customer feels. Fast loading, so what? People don't leave. So what? You get the enquiry instead of losing it. That last line is your copy.",
    },
    { type: "h2", text: "Mistake three: you write like a brochure" },
    {
      type: "p",
      text: "Corporate fog is the enemy. 'We leverage synergistic solutions to deliver bespoke outcomes' means nothing and trusts no one. Write the way you'd talk to a customer across a table. Short sentences. Plain words. A bit of personality. If you wouldn't say it out loud without cringing, don't put it on your homepage.",
    },
    {
      type: "p",
      text: "A quick test: read your copy aloud. Anywhere you stumble, run out of breath, or feel a bit embarrassed, that's a sentence to cut or simplify. Real voice beats polished waffle in every industry we've ever worked in.",
    },
    { type: "h2", text: "Mistake four: you bury the next step" },
    {
      type: "p",
      text: "You've hooked them, you've convinced them, and then... nothing. No obvious button. No clear invitation. A great pitch with no call to action is a salesperson who talks brilliantly and then stares at the floor. Every page should make the next step obvious and singular: call, book, enquire, buy. One clear action, repeated, not five competing links that leave people frozen.",
    },
    { type: "h2", text: "A simple structure that works" },
    {
      type: "ol",
      items: [
        "Hook: name the reader's problem or desire in one line, in their words.",
        "Promise: state the outcome you deliver, plainly.",
        "Proof: back it up with results, reviews, named clients, real numbers.",
        "Detail: now explain what you actually do and how it works.",
        "Action: tell them exactly what to do next, and make it one thing.",
      ],
    },
    {
      type: "p",
      text: "That order matters. Most sites do it backwards, opening with a company history and hiding the customer's problem three scrolls down. Put the reader first and the whole page starts pulling its weight.",
    },
    {
      type: "callout",
      label: "Copy not doing its job?",
      text: "We write websites that read like a person and sell like a pro, built on the outcome your customer actually wants. Send us your current site and we'll tell you exactly where the words are leaking enquiries.",
      href: "/contact",
      linkLabel: "Get a straight copy review",
    },
    {
      type: "p",
      text: "The honest summary: your design gets people to stay for three seconds. Your words are what turn those three seconds into an enquiry. Spend at least as much care on what your website says as on how it looks, because the words are the part that actually does the selling.",
    },
  ],
  relatedSlugs: [
    "real-reason-website-isnt-converting",
    "landing-page-vs-homepage",
    "embarrassed-to-send-people-to-your-website",
  ],
};

export default post;
