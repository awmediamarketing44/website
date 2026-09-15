import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "the-same-information-typed-in-four-times",
  title: "The Same Information, Typed In Four Times",
  tag: "Systems",
  excerpt:
    "Most of the admin in a small business is not work. It is the same details being re-typed between tools that do not talk to each other, and nobody has ever counted how long it takes.",
  metaDescription:
    "Re-keying the same customer details between separate tools quietly eats hours every week. How to spot the double entry in your business and what fixes it.",
  date: "September 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/the-same-information-typed-in-four-times-v2.jpg",
  body: [
    {
      type: "p",
      text: "Think about a normal enquiry coming into your business and follow it all the way through.",
    },
    {
      type: "p",
      text: "Somebody fills in a form on your website. Their details land in your inbox. Somebody copies the name and number into a spreadsheet, or a CRM, or a WhatsApp group. When it turns into a job, the same details go into whatever you use to schedule it. When it is done, the same details again go into the accounting software to raise the invoice.",
    },
    {
      type: "p",
      text: "That is one customer, and their name has been typed in four times by hand.",
    },
    { type: "h2", text: "Nobody has ever counted it" },
    {
      type: "p",
      text: "This is the bit that keeps it invisible. Each of those is thirty seconds. Nobody is ever going to raise thirty seconds as a problem, and quite right too.",
    },
    {
      type: "p",
      text: "But it is thirty seconds times every enquiry, times every stage, times every week, done by somebody you are paying. And it is not the good kind of busy. Nothing about re-typing a postcode makes a customer happier or wins you a job.",
    },
    {
      type: "p",
      text: "Here is a version of the maths you can do on your own numbers in about a minute. Take how many enquiries you get in a week. Multiply by the number of places their details end up. Multiply that by a minute, because it is never really thirty seconds once you count finding the right record. That is your weekly number, and most people are surprised by it.",
    },
    {
      type: "p",
      text: "Whatever it comes to, that is time that exists in your business and produces nothing.",
    },
    { type: "h2", text: "The errors cost more than the minutes" },
    {
      type: "p",
      text: "Time is the obvious cost and it is not the expensive one.",
    },
    {
      type: "p",
      text: "Every re-type is a chance to get it wrong. A digit dropped off a phone number. A postcode that goes to the wrong end of town. An email address with a full stop in the wrong place, so your invoice never arrives and you spend a fortnight thinking somebody is dodging you when they simply never got it.",
    },
    {
      type: "p",
      text: "Then there is the version problem. A customer rings and changes their address. Somebody updates it in one place. The other three are now wrong, and nobody knows which one is right until something goes badly wrong at a delivery.",
    },
    {
      type: "callout",
      label: "The bit that matters",
      text: "You cannot train your way out of that. It is not a carelessness problem, it is a design problem. If the same fact lives in four places, those four places will disagree eventually. That is not a maybe.",
    },
    { type: "h2", text: "Why it is nobody's fault" },
    {
      type: "p",
      text: "None of this happened because anybody made a bad call.",
    },
    {
      type: "p",
      text: "You bought a form tool because you needed a form. You bought accounting software because you needed to invoice. You added a booking system when the diary got busy. Each one was the right answer to the problem in front of you at the time, and each one was bought years apart from the others.",
    },
    {
      type: "p",
      text: "Nobody buys a disconnected stack on purpose. You buy four good tools over six years and end up with a disconnected stack, because none of them was ever designed to know the others exist.",
    },
    {
      type: "p",
      text: "The gap between them is where the admin lives. And the gap is not on anybody's invoice, so it never gets reviewed.",
    },
    { type: "h2", text: "The two questions worth asking" },
    {
      type: "h3",
      text: "When a customer changes their phone number, how many places have to be updated?",
    },
    {
      type: "p",
      text: "If it is more than one, you have double entry and you now know roughly what it costs you.",
    },
    {
      type: "h3",
      text: "Could you answer how many jobs we did last month and what they made us, without opening two things and doing sums?",
    },
    {
      type: "p",
      text: "If not, your information is in pieces, and the pieces are the reason nobody can see the whole business at once.",
    },
    {
      type: "p",
      text: "Neither of those is a trick question, and a lot of well-run businesses answer badly on both. It is worth knowing where you stand.",
    },
    { type: "h2", text: "What joined up actually means" },
    {
      type: "p",
      text: "It does not mean one enormous piece of software that does everything. That is how you end up back at a tool that fits nobody.",
    },
    {
      type: "p",
      text: "It means the details get entered once, by the customer where possible, and everything downstream reads from that. The enquiry becomes the job becomes the invoice, and nobody re-types anything at any point. When the customer changes their number, it changes everywhere, because there is only one everywhere.",
    },
    {
      type: "p",
      text: "That is what we built the courier firm. The job comes in, gets assigned, gets done, gets invoiced, and the customer's details were typed once at the start by the person who actually knows them.",
    },
    { type: "h2", text: "Where to start" },
    {
      type: "p",
      text: "Pick your most common job type and draw it on a piece of paper. Enquiry on the left, money in the bank on the right, every tool it passes through in between.",
    },
    {
      type: "p",
      text: "Then put a mark everywhere a human re-types something that already exists somewhere else. You do not need any software to do this and it takes about ten minutes.",
    },
    {
      type: "p",
      text: "That sheet of paper is worth more than any demo you will sit through. If you want to send us a photo of it, we will tell you which bits are worth joining up and which are honestly fine as they are. No pitch, just the list.",
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
    "you-never-agreed-to-work-this-way",
    "your-enquiry-form-might-be-broken",
  ],
};

export default post;
