import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "where-do-your-enquiries-actually-go",
  title: "Where Do Your Enquiries Actually Go?",
  tag: "Systems",
  excerpt:
    "Most businesses do not have a lead problem, they have a landing problem. Enquiries arrive in five different places and some of them never get answered.",
  metaDescription:
    "Enquiries arrive by form, DM, phone and text, and get lost between them. How a simple CRM stops leads going cold and what it changes about your week.",
  date: "September 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/where-do-your-enquiries-actually-go.jpg",
  body: [
    {
      type: "p",
      text: "Quick question, and be honest about the answer. If somebody enquired with you last Tuesday, where is that enquiry now?",
    },
    {
      type: "p",
      text: "For most businesses the true answer is a shrug. It depends how they got in touch.",
    },
    {
      type: "p",
      text: "Website form goes to an inbox. Instagram DM sits in Instagram, unless it went to the requests folder, in which case it does not exist. Facebook message goes somewhere nobody has opened since 2023. Phone call went in a notepad if somebody happened to have one. Text went to whoever had the work phone that day.",
    },
    {
      type: "p",
      text: "Five doors, five piles, and no single place where you can see what came in this week. That is not a marketing problem. That is a landing problem, and it is much cheaper to fix.",
    },
    { type: "h2", text: "What it costs, in plain terms" },
    {
      type: "p",
      text: "Two things, and the second one hurts more.",
    },
    {
      type: "p",
      text: "First, some enquiries never get answered at all. Not many, but some, and they are people who were ready to buy. You never find out. There is no alert for the one you missed. It just looks like a quiet month.",
    },
    {
      type: "p",
      text: "Second, the ones you do answer, you answer late. Somebody enquires on Tuesday morning, you see it Wednesday night, you reply Thursday. In that time they have messaged two other businesses and one of them came straight back.",
    },
    {
      type: "p",
      text: "People do not enquire with one business any more. They enquire with three and go with whoever feels on it. Being first is worth more than being cheapest, and most of the time being first only means being within the hour.",
    },
    { type: "h2", text: "The follow up nobody does" },
    {
      type: "p",
      text: "Here is the bit that quietly makes the biggest difference, and almost nobody does it.",
    },
    {
      type: "p",
      text: "You send a quote. They say they will have a think. Then nothing, and you leave it, because chasing feels pushy.",
    },
    {
      type: "p",
      text: "They did not say no. They got busy. A single message a week later saying just checking whether you want me to hold that price or park it for now brings back a genuinely surprising number of jobs. Not because it is clever, because everybody else forgot.",
    },
    {
      type: "p",
      text: "You cannot do that reliably out of an inbox, because there is nothing in an inbox that reminds you a quote has gone quiet.",
    },
    { type: "h2", text: "What a CRM actually is" },
    {
      type: "p",
      text: "The word sounds like enterprise software and it puts people right off. For a small business it is simpler than that.",
    },
    {
      type: "p",
      text: "It is one list of everybody who has asked you for something, with where they came from, what you said last, and what happens next. That is it.",
    },
    {
      type: "p",
      text: "A useful one does four things.",
    },
    {
      type: "ol",
      items: [
        "Everything lands in one place. Website form, socials, phone, all in one list you can see in a glance.",
        "Nothing has no next step. Every enquiry either has a date on it or is closed. There is no maybe pile.",
        "You can see what is sat waiting. Quotes out, nobody chased, oldest first. That screen is usually worth money on its own.",
        "It tells you where work comes from. After three months you know which of your marketing is actually doing something, so you stop guessing.",
      ],
    },
    { type: "h2", text: "What changes in the week" },
    {
      type: "p",
      text: "The obvious one is that you stop losing enquiries. The one people do not expect is that it gets quieter in your head.",
    },
    {
      type: "p",
      text: "A lot of the low level stress of running a business is the nagging feeling that you have forgotten to get back to somebody. Usually you have. Once it is all in one list with dates on it, that feeling goes, because you can just look.",
    },
    {
      type: "p",
      text: "It also stops the business living in your phone. If somebody else can pick up the list on a day you are out, you are not the single point of failure any more.",
    },
    { type: "h2", text: "Start smaller than you think" },
    {
      type: "p",
      text: "You do not need a big build to begin. Plenty of businesses get most of the benefit from an off the shelf tool set up properly, and we will tell you when that is the right answer.",
    },
    {
      type: "p",
      text: "Where a bespoke one earns its money is when your process is genuinely yours. If you quote in a way no product understands, or a job moves through five stages that only exist in your trade, then bending a generic tool into that shape is usually more painful than building the thing.",
    },
    {
      type: "p",
      text: "Either way, the first job is the same. Get the enquiries landing in one place. Everything else gets easier after that.",
    },
    {
      type: "callout",
      label: "CRMs and bespoke systems",
      text: "See what we built for a courier firm and a clinic, with real screens on demonstration data.",
      href: "/services/systems",
      linkLabel: "Have a look",
    },
  ],
  relatedSlugs: [
    "your-enquiry-form-might-be-broken",
    "the-same-information-typed-in-four-times",
    "when-bespoke-is-the-wrong-answer",
  ],
};

export default post;
