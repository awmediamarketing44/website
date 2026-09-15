import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "the-spreadsheet-nobody-calls-a-problem",
  title: "The Spreadsheet Nobody Calls A Problem",
  tag: "Systems",
  excerpt:
    "There is a spreadsheet on your computer doing a job your software should be doing. Everybody has one, nobody mentions it, and it is the clearest sign you have outgrown what you are running on.",
  metaDescription:
    "That spreadsheet running alongside your software is not a workaround, it is a symptom. How to tell when your business has outgrown off-the-shelf software.",
  date: "September 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/the-spreadsheet-nobody-calls-a-problem-v2.jpg",
  body: [
    {
      type: "p",
      text: "There is a spreadsheet on your computer right now doing a job your software was supposed to do.",
    },
    {
      type: "p",
      text: "You know the one. It might be job numbers. It might be who has paid and who has not. It might be a tab per driver, or a colour-coded column somebody set up in 2023 that everyone is now frightened to touch.",
    },
    {
      type: "p",
      text: "Nobody in your business calls that a problem. It is just how things get done. Somebody built it because the software would not do the thing, and it worked, so it stayed.",
    },
    {
      type: "p",
      text: "That spreadsheet is the most useful thing in your business for working out what is actually wrong.",
    },
    { type: "h2", text: "Nobody chose it. It just arrived." },
    {
      type: "p",
      text: "Here is how it happens, and it is the same story in a courier firm, a clinic, a gym and a building company.",
    },
    {
      type: "p",
      text: "You buy a piece of software. It does eighty per cent of what you need, which at the time feels brilliant. Then you hit the twenty per cent it cannot do. Maybe it will not handle your second location. Maybe it cannot cope with the way you quote. Maybe it will not let you record the one field that actually matters to your trade.",
    },
    {
      type: "p",
      text: "So somebody opens a spreadsheet. Just for now. Just until we find something better.",
    },
    {
      type: "p",
      text: "That was two years ago. The spreadsheet is now load bearing.",
    },
    { type: "h2", text: "It is not laziness, it is a fit problem" },
    {
      type: "p",
      text: "This is the bit worth being clear about, because it is easy to feel a bit daft about the spreadsheet and there is genuinely no reason to.",
    },
    {
      type: "p",
      text: "Your software was built for thousands of businesses. Yours was not one of them. It was built for the average of a sector, and no actual business is the average of its sector. Every single one has a couple of things it does differently, and those things are usually the reason customers pick them.",
    },
    {
      type: "p",
      text: "So the software cannot hold the thing that makes you you. And rather than lose that thing, you kept it and put it in a spreadsheet. Honestly, that is the right instinct. You protected the bit that matters.",
    },
    {
      type: "p",
      text: "The problem is not the decision. It is what the decision costs once it has been running for a few years.",
    },
    { type: "h2", text: "What it is actually costing" },
    {
      type: "p",
      text: "Two things, and neither shows up on an invoice.",
    },
    {
      type: "p",
      text: "The first is that your information now lives in two places that do not know about each other. Somebody updates the software, somebody else updates the sheet, and at some point those two stop agreeing. Then you get the phone call where a customer is told one thing and the paperwork says another.",
    },
    {
      type: "p",
      text: "The second is quieter and worse. Nobody can see the whole picture any more. You cannot ask a straight question like how many of these did we do last month and what did they earn us, without somebody spending an afternoon stitching two exports together. So you stop asking. Businesses make worse decisions when the answer is hard work to get, and you never notice you have stopped asking, because there is no moment where it happens.",
    },
    { type: "h2", text: "The test, and you can do it today" },
    {
      type: "p",
      text: "Go and open the spreadsheet. Then ask two questions about it.",
    },
    { type: "h3", text: "Would the business stop if this file vanished?" },
    {
      type: "p",
      text: "Not slow down. Stop. If the honest answer is yes, that is not a spreadsheet, that is a piece of business-critical software with no backup and no owner.",
    },
    { type: "h3", text: "Does anybody outside this office know it exists?" },
    {
      type: "p",
      text: "If your accountant, your insurer or a new starter would have no idea to look for it, then a chunk of how your company runs is undocumented.",
    },
    {
      type: "p",
      text: "That is worth knowing either way, whatever you decide to do about it.",
    },
    { type: "h2", text: "What the alternative actually looks like" },
    {
      type: "p",
      text: "Not a bigger piece of off-the-shelf software. That just moves the line: the new one will do eighty-five per cent instead of eighty and you will start a fresh spreadsheet for the rest.",
    },
    {
      type: "p",
      text: "The alternative is software built round how you already work. The processes you have now, the fields you actually use, the odd thing your trade does that no generic system has heard of. Nothing bent to fit, because the software is the thing that moves.",
    },
    {
      type: "p",
      text: "We built a courier firm their own system on exactly that basis. Jobs, drivers, invoices, vehicle checks, all in one place, shaped round their day rather than a sector average. We did the same for a clinic, where patients book and see their own results in a portal rather than ringing up for them.",
    },
    { type: "h2", text: "Where to start" },
    {
      type: "p",
      text: "You do not need to know what you want building. Most people do not, and working it out is the first part of the job anyway.",
    },
    {
      type: "p",
      text: "Open the spreadsheet and have a proper look at what is in it. That file is a list of everything your software could not do, written by the people who use it every day. It is the best brief you will ever get and it already exists.",
    },
    {
      type: "p",
      text: "If you want a second opinion on it, fire us a message and we will tell you what we would build first and what we would leave well alone. No pitch, and it does not have to turn into a job.",
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
    "you-never-agreed-to-work-this-way",
    "when-bespoke-is-the-wrong-answer",
    "bespoke-vs-template-when-custom-matters",
  ],
};

export default post;
