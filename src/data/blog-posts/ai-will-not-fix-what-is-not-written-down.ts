import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "ai-will-not-fix-what-is-not-written-down",
  title: "AI Will Not Fix What Is Not Written Down",
  tag: "AI Support",
  excerpt:
    "We use AI every day and it has changed how we work. It still cannot help with the part of your business that only exists in your head.",
  metaDescription:
    "Why AI disappoints in small businesses, the one thing that makes it genuinely useful, and where it saves real hours once your process is written down.",
  date: "September 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/ai-will-not-fix-what-is-not-written-down.jpg",
  body: [
    {
      type: "p",
      text: "Most business owners have now had the same experience with AI. A go on it, quite impressed for about a week, then a slow fade because the output was generic and it was quicker to just do the job.",
    },
    {
      type: "p",
      text: "The reason is almost never the tool. It is that it was asked to do something nobody had ever written down.",
    },
    {
      type: "p",
      text: "AI is very good at doing a job you can describe. It is useless at guessing how your business works, because your business is not written anywhere. It is in your head, and a bit of it is in the head of whoever has been there longest.",
    },
    { type: "h2", text: "Generic in, generic out" },
    {
      type: "p",
      text: "Ask it to write about your service and you get something that could belong to any business in your trade in the country. Everybody looks at that and concludes it does not work for us.",
    },
    {
      type: "p",
      text: "What actually happened is that you asked a stranger to write about a company they have never heard of. It wrote the average of everybody. That is all it could do.",
    },
    {
      type: "p",
      text: "Give it your actual prices, your actual process, the real reasons customers pick you, the jobs you turn down and the way you talk to people, and the same tool produces something that sounds like you. Same model, same prompt, completely different output, because it finally has something specific to work from.",
    },
    { type: "h2", text: "Write the business down once" },
    {
      type: "p",
      text: "This is the unglamorous bit, and it is the whole thing.",
    },
    {
      type: "p",
      text: "Not a business plan. A handful of plain pages covering what you sell and what it costs, who you are for and who you are not, how a job runs from enquiry to finished, the questions you get asked constantly and your real answers, and the way you write to customers.",
    },
    {
      type: "p",
      text: "An afternoon gets you most of it. And even if you never point an AI at it, it is worth doing, because it is the same document you need when you hire somebody, when you go away for a week, and when you want a quote written while you are on site.",
    },
    {
      type: "p",
      text: "Then you can hand it over, and everything you ask afterwards starts from your business instead of the average of everybody else.",
    },
    { type: "h2", text: "Where it earns its keep" },
    {
      type: "p",
      text: "Once that exists, there are a few places it genuinely saves hours in a small business.",
    },
    {
      type: "ul",
      items: [
        "The reply you have written a hundred times. Enquiry responses, quote follow ups, the explanation of how you work. Drafted in seconds, you check it and send.",
        "Turning notes into something readable. A voice note after a site visit becoming a tidy summary. A messy call becoming a proposal you only need to edit.",
        "The same information going to four places. Once a job exists, the confirmation, the calendar entry and the invoice details are all the same facts typed again. That is exactly the sort of thing to hand over.",
        "Sorting the incoming. Working out which enquiry needs you today and which can wait until Friday.",
        "First drafts of anything. It is a decent starting point and a poor finished article. Treat it like a keen junior, not an expert.",
      ],
    },
    { type: "h2", text: "Where it is still no good" },
    {
      type: "p",
      text: "Anything where being wrong matters and nobody checks. Prices, legal wording, medical or financial detail, and anything going out under your name without a human reading it. It will state something wrong with total confidence, which is a much worse failure than admitting it does not know.",
    },
    {
      type: "p",
      text: "Judgement calls too. Whether to take a job, whether a customer is worth the hassle, whether to hold your price. That is your experience and it is what you are actually paid for.",
    },
    {
      type: "p",
      text: "And anything where the point is that it came from you. Nobody wants an AI written condolence message or a thank you that reads like a press release.",
    },
    { type: "h2", text: "How we use it, honestly" },
    {
      type: "p",
      text: "We use AI in most jobs here and it has genuinely changed what a small team can deliver. It handles the repetitive middle of a build so we spend our time on the design, the decisions and the client.",
    },
    {
      type: "p",
      text: "What it has not done is replace anybody, and it has not made the work generic, because every piece of it still gets designed and checked by a person who knows what good looks like. Speed without judgement just gets you to a bad answer faster.",
    },
    {
      type: "p",
      text: "That is the honest version, and it is the same advice we give clients. Point it at the repetitive bits, write your business down first, and keep a human on the end of it.",
    },
    {
      type: "callout",
      label: "Write your business down",
      text: "We put together a free pack that walks you through exactly what to write and how to feed it in. Eleven templates, no email needed.",
      href: "/claude-setup",
      linkLabel: "Get the pack",
    },
  ],
  relatedSlugs: [
    "the-admin-your-business-does-not-need-you-for",
    "when-the-person-who-just-knows-is-off",
    "ai-design-for-small-businesses",
  ],
};

export default post;
