import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "you-never-agreed-to-work-this-way",
  title: "You Never Agreed To Work This Way",
  tag: "Systems",
  excerpt:
    "Nobody sat down and decided to change how their business runs to suit a piece of software. It happens one workaround at a time, and by the time you notice, the software is in charge.",
  metaDescription:
    "Off-the-shelf software quietly reshapes how a business works, one workaround at a time. How to spot it, and what to do when the tool starts running the company.",
  date: "September 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/you-never-agreed-to-work-this-way-v2.jpg",
  body: [
    {
      type: "p",
      text: "Nobody ever sat down and decided to change how their business works to suit a piece of software.",
    },
    {
      type: "p",
      text: "It is not that kind of decision. There was no meeting. Nobody signed anything. It happened one small compromise at a time over about four years, and every single one of them was sensible on the day.",
    },
    { type: "h2", text: "How it actually goes" },
    {
      type: "p",
      text: "Every one of these will be familiar to somebody in your business, even if it is not you.",
    },
    {
      type: "ul",
      items: [
        "The software will not let you have two prices for the same job, so you make a second product called the same thing with a bracket after it.",
        "It will not do part payments, so you raise two invoices and hope nobody queries it.",
        "It cannot handle a customer with more than one site, so you set them up twice and add a note. Somebody has to remember to update both.",
        "It has a mandatory field you have no use for, so everybody types N/A into it fourteen times a day.",
      ],
    },
    {
      type: "p",
      text: "Every one of those is a reasonable answer to a small problem. Put them end to end over a few years and something has changed that nobody chose. Your business now runs the way the software needs it to run, rather than the way you would do it if you were starting fresh.",
    },
    { type: "h2", text: "The bit that makes it hard to see" },
    {
      type: "p",
      text: "You cannot spot this from the inside, and that is not a failing on your part. It is just how it works.",
    },
    {
      type: "p",
      text: "New people join and get trained on the workarounds as if they are the process, because by then they are. Nobody says we do this because the system will not let us do it properly, they just say this is how we do it here. One generation of staff later and the reason is gone. The workaround is now company policy and nobody alive remembers it started as a bodge.",
    },
    {
      type: "p",
      text: "That is the actual damage. Not the wasted clicks. The fact that the compromise stops looking like a compromise.",
    },
    { type: "h2", text: "Why the software does not care" },
    {
      type: "p",
      text: "None of this is because the software is bad. Most of these tools are genuinely well built.",
    },
    {
      type: "p",
      text: "They were built for thousands of businesses at once. That is the whole business model, and it is a good one. To serve thousands of companies, a tool has to assume a shape they mostly share, and then it has to hold that shape firmly or it becomes unmaintainable.",
    },
    {
      type: "p",
      text: "So when your business does something differently, the tool has two options: bend, or make you bend. It is never going to be the one that bends. There are ten thousand other customers on it and you are not the average of them.",
    },
    {
      type: "callout",
      label: "The bit that matters",
      text: "The tool is doing exactly what it was built to do. That is the problem, not a fault.",
    },
    { type: "h2", text: "The awkward question" },
    {
      type: "p",
      text: "Here is one worth sitting with for a minute. What is the thing your business does that your competitors do not? Most owners can answer that quickly. It is the reason people pick you. Might be that you turn quotes round same day. Might be that you check in on people after the job. Might be an ordering process customers actually like.",
    },
    {
      type: "p",
      text: "Now: does your software help you do that, or do you do it in spite of your software?",
    },
    {
      type: "p",
      text: "If the answer is in spite of, then the thing you compete on is the thing your systems fight you on every day. That is a strange way to run a business, and it is worth knowing you are doing it, isn't it.",
    },
    { type: "h2", text: "What changes when the software fits" },
    {
      type: "p",
      text: "The obvious answer is time, and yes, you get some back. But that is not the bit people notice first.",
    },
    {
      type: "p",
      text: "What people notice is that they stop translating. Nobody is converting what actually happened into what the system will accept. The thing you do gets recorded as the thing you do.",
    },
    {
      type: "p",
      text: "Second, the odd thing you are good at becomes repeatable. When your process only exists as a workaround, it lives in whoever remembers it. When the software does it properly, everybody does it the same way including the person who started on Monday.",
    },
    {
      type: "p",
      text: "We built a courier firm a system round their day rather than a sector average, and a clinic a portal so patients could book and see their own results instead of ringing up. Neither of them changed how they worked to suit us. The software was the thing that moved.",
    },
    { type: "h2", text: "Where to start" },
    {
      type: "p",
      text: "Do not start with software. Start with a list of your workarounds.",
    },
    {
      type: "p",
      text: "Get the people who actually use the system in a room for twenty minutes and ask what they do that the software will not let them do properly. You will get more than you expect and some of it will be news to you. That list is the spec, and it is free.",
    },
    {
      type: "p",
      text: "If you want us to look over it and tell you which bits are worth building and which are fine as they are, fire it over. Happy to give you a straight answer either way, and it does not have to turn into a job.",
    },
    {
      type: "callout",
      label: "Bespoke Systems & Software",
      text: "See what we built for a courier firm and a clinic, with real screens on demonstration data.",
      href: "/services/systems",
      linkLabel: "Have a look",
    },
  ],
  relatedSlugs: [
    "the-spreadsheet-nobody-calls-a-problem",
    "when-the-person-who-just-knows-is-off",
    "every-change-takes-weeks-with-your-developer",
  ],
};

export default post;
