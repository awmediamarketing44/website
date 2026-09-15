import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "a-portal-instead-of-another-email-thread",
  title: "A Portal Instead Of Another Email Thread",
  tag: "Systems",
  excerpt:
    "If your customers keep asking you the same question, the answer is usually a place they can go and look, not a faster reply.",
  metaDescription:
    "When a customer portal or small app beats email and phone calls: the questions it answers for you, what it costs, and how to tell if you are ready for one.",
  date: "September 2026",
  readingMinutes: 5,
  coverImage: "/images/blog/a-portal-instead-of-another-email-thread.jpg",
  body: [
    {
      type: "p",
      text: "Think about the question your customers ask you most.",
    },
    {
      type: "p",
      text: "For a clinic it is usually where are my results. For a courier it is where is my delivery. For a builder it is when are you starting. For a coach it is what am I meant to be doing this week.",
    },
    {
      type: "p",
      text: "Now think about how you answer it. Somebody stops what they are doing, finds out, and types a reply. Forty times a month. To the same question, for different people, who all needed the same thing.",
    },
    {
      type: "p",
      text: "That is not a communication problem. It is a missing place to look.",
    },
    { type: "h2", text: "What a portal actually is" },
    {
      type: "p",
      text: "It sounds grand. It is not. It is a page your customer logs into where the thing they keep asking about is already on the screen.",
    },
    {
      type: "p",
      text: "Their booking. Their results. Their job, and where it is up to. Their invoices. Whatever the thing is in your business that currently gets asked for one by one.",
    },
    {
      type: "p",
      text: "The clinic portal we built is exactly that. Patients book their appointment and get their results in the same place, so they do not ring the practice to chase, and the practice does not spend its morning on the phone answering the same thing.",
    },
    { type: "h2", text: "Why it beats answering faster" },
    {
      type: "p",
      text: "The usual instinct when customers ask a lot is to get better at replying. Quicker responses, a template, maybe somebody part time on the inbox.",
    },
    {
      type: "p",
      text: "That works, and it scales badly. Twice the customers is twice the replies, forever.",
    },
    {
      type: "p",
      text: "A place to look is different. It answers the question once for everybody, at eleven at night when you are asleep, without anybody being interrupted. And the customer usually prefers it, because they did not want to bother you either. Most people would rather check than ring.",
    },
    { type: "h2", text: "When it is worth it" },
    {
      type: "ul",
      items: [
        "The same question comes in over and over. If you can write the question down word for word, that is your sign.",
        "The answer already exists somewhere. It is in a system, a sheet or in somebody's head, and the work is just fetching it.",
        "Customers are waiting on you to look something up. Every one of those is a delay you are personally the cause of.",
        "The chasing is eating a real part of somebody's day. If a person spends an hour a day on it, price that over two years and the sums get obvious.",
        "The experience is part of what you sell. In some trades the tidiness of dealing with you is the thing people tell their mates about.",
      ],
    },
    { type: "h2", text: "When it is not" },
    {
      type: "p",
      text: "If you have got twelve customers, you do not need a portal. You need a phone. Software is worth it when something repeats enough to be a pattern, and twelve relationships is not a pattern, it is just knowing people.",
    },
    {
      type: "p",
      text: "If the answer does not exist anywhere yet, a portal will not invent it. If the information lives in different heads and nobody has written it down, sort that first or you are building a window into a cupboard with nothing in it.",
    },
    {
      type: "p",
      text: "And if your customers would genuinely never log in, be realistic. Some audiences will and some will not. It is worth being honest about yours before spending money on it.",
    },
    { type: "h2", text: "Start with one screen" },
    {
      type: "p",
      text: "The mistake is designing the whole thing. Every feature anybody has ever wished for, eighteen screens, a year of building, and it never quite launches.",
    },
    {
      type: "p",
      text: "Start with the single question that gets asked most and build the one screen that answers it. Get it live, watch what people actually do with it, then add the next thing based on what you learn rather than what you guessed.",
    },
    {
      type: "p",
      text: "It is cheaper, it is live in weeks rather than never, and the second version is always better for having watched real people use the first.",
    },
    {
      type: "p",
      text: "If you want a straight opinion on whether your business is at that point, tell us what the question is and how often you get it. Quite often we say not yet, and that is a perfectly good answer.",
    },
    {
      type: "callout",
      label: "Apps and bespoke systems",
      text: "Real screens from a clinic portal and a courier operations platform, on demonstration data.",
      href: "/services/systems",
      linkLabel: "See the work",
    },
  ],
  relatedSlugs: [
    "where-do-your-enquiries-actually-go",
    "when-bespoke-is-the-wrong-answer",
    "when-the-person-who-just-knows-is-off",
  ],
};

export default post;
