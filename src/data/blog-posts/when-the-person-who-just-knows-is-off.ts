import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "when-the-person-who-just-knows-is-off",
  title: "What Happens When The Person Who Just Knows Is Off",
  tag: "Systems",
  excerpt:
    "Every business has somebody who just knows how it all works. That is lovely right up until they are on holiday, and it is one of the biggest risks most owners are carrying without realising.",
  metaDescription:
    "When your process lives in one person's head instead of your systems, their week off becomes a business risk. How to spot key-person risk and design it out.",
  date: "September 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/when-the-person-who-just-knows-is-off-v2.jpg",
  body: [
    {
      type: "p",
      text: "Every business has one. The person who just knows.",
    },
    {
      type: "p",
      text: "They know which customers get the good rate. They know that job numbers starting with a seven are the ones that need the extra check. They know which supplier to ring when the usual one lets you down, and they know it without looking anything up.",
    },
    {
      type: "p",
      text: "They are usually brilliant and they are usually the reason the place runs as smoothly as it does.",
    },
    {
      type: "p",
      text: "They are also, and there is no nice way to put this, a single point of failure.",
    },
    { type: "h2", text: "You find out on the Tuesday" },
    {
      type: "p",
      text: "Nobody notices this while the person is there. That is the whole nature of it.",
    },
    {
      type: "p",
      text: "You notice on the second day of their holiday, when somebody asks a question and the room goes quiet. Or when they are off poorly and three jobs go out at the wrong price. Or, worst version, when they hand their notice in and you realise a chunk of how your company operates is walking out with them and there is nothing written down.",
    },
    {
      type: "p",
      text: "At that point it becomes very clear that a lot of your process was never actually process. It was one person's memory, and everyone had quietly agreed to treat that as a system.",
    },
    { type: "h2", text: "This is a systems problem wearing a people costume" },
    {
      type: "p",
      text: "It is tempting to look at that and think it is about documentation, or training, or somebody not sharing enough.",
    },
    {
      type: "p",
      text: "It usually is not. It is almost always because the software could not hold the knowledge, so a person had to.",
    },
    {
      type: "p",
      text: "If the system will not let you flag that this customer has a different rate, somebody has to remember. If it will not let you attach a note to a job type, somebody has to remember. If it cannot enforce the extra check on a certain kind of order, somebody has to remember to do it.",
    },
    {
      type: "p",
      text: "Every rule your software cannot express becomes a rule somebody has to carry in their head. Then, because they are good at their job, they carry it well for years and nobody ever sees the risk building up.",
    },
    {
      type: "callout",
      label: "The bit that matters",
      text: "The knowledge did not fail to get written down. There was nowhere to write it.",
    },
    { type: "h2", text: "Why it gets worse as you grow" },
    {
      type: "p",
      text: "Two people can hold a lot between them. It genuinely works, and it works for longer than you would think.",
    },
    {
      type: "p",
      text: "It stops working at the point where you have more jobs than any one person sees. Then the rules that lived in a head start getting applied inconsistently, because half the work is now being done by people who were never told. Customers notice that before you do. They get one experience in January and a different one in March, and they cannot tell you why, only that it feels less sorted than it used to.",
    },
    {
      type: "p",
      text: "That is normally the moment an owner starts thinking about systems, and it is usually blamed on the new staff. It is almost never the new staff.",
    },
    { type: "h2", text: "Two things worth checking this week" },
    {
      type: "h3",
      text: "If your best person was off for a fortnight with no notice, what breaks?",
    },
    {
      type: "p",
      text: "Write the list. Not to worry yourself, just to see it. Most owners have never actually written it down and it is a different feeling on paper.",
    },
    {
      type: "h3",
      text: "For each thing on that list, where would it have to live to be safe?",
    },
    {
      type: "p",
      text: "Sometimes the honest answer is a written procedure and that is genuinely fine. Often the answer is that the system should be doing it, and it cannot. The second list is the one worth acting on.",
    },
    { type: "h2", text: "What it looks like when the system holds it" },
    {
      type: "p",
      text: "The rules stop being remembered and start being enforced.",
    },
    {
      type: "p",
      text: "The customer with the different rate has that rate on their record, so it applies whoever raises the job. The order that needs the extra check will not close without it, so it gets done on a Friday afternoon by somebody who has never heard the story about why it matters. The supplier note is attached to the supplier rather than living in a head.",
    },
    {
      type: "p",
      text: "Your best person is still your best person. They are just no longer the backup for a piece of software.",
    },
    {
      type: "p",
      text: "And here is the bit owners tend not to expect: they usually love it. Being the only one who knows is not a nice job. It means never properly switching off, and getting rung on holiday, and being slightly stuck in the role you are in because nobody can cover you.",
    },
    { type: "h2", text: "Where to start" },
    {
      type: "p",
      text: "You do not need to fix all of it. Start with the rules that cost you money or embarrass you when they get missed, because they are the ones with a real number attached.",
    },
    {
      type: "p",
      text: "Write those down first, then have a look at whether your current setup could hold them if you asked it to. Sometimes it can and nobody ever set it up. That is worth finding out before you spend anything.",
    },
    {
      type: "p",
      text: "If you want a second pair of eyes on the list, give us a shout. We will tell you straight which ones your existing software could handle and which ones genuinely need building, and we would rather tell you the first one where it is true.",
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
    "the-same-information-typed-in-four-times",
    "when-bespoke-is-the-wrong-answer",
  ],
};

export default post;
