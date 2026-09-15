import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "almost-everyone-meets-you-on-a-phone",
  title: "Almost Everyone Meets Your Business On A Phone",
  tag: "Web Design",
  excerpt:
    "You built your website on a laptop. You check it on a laptop. Your customers are seeing something completely different, one thumb at a time, usually on a bad signal.",
  metaDescription:
    "Most website visitors arrive on a phone, but most owners only ever check their site on a desktop. What to look at on mobile, and the details that lose enquiries.",
  date: "August 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/almost-everyone-meets-you-on-a-phone-v2.jpg",
  body: [
    {
      type: "p",
      text: "Have a think about how you last looked someone up. Sat at a desk with a big screen, taking your time? Or stood in a kitchen, one hand, half watching something else, deciding in about fifteen seconds whether they looked any good?",
    },
    {
      type: "p",
      text: "That second one is your customer. On nearly every site we look after, the large majority of visitors arrive on a phone. Yet almost every business owner only ever views their own website on a laptop. You are checking a version of your shopfront that most people never see.",
    },
    {
      type: "h2",
      text: "What actually goes wrong on a phone",
    },
    {
      type: "ul",
      items: [
        "The headline is the wrong size. What reads as bold and confident on a wide screen becomes four cramped lines that push everything important below the fold.",
        "The main button is too far down. On a laptop it sits neatly next to the text. On a phone it lands under a stack of other things and never gets seen.",
        "Tap targets are too small or too close together. If someone has to aim carefully, on the move, you have already lost a few of them.",
        "The phone number is text rather than a link. On a mobile that should be one tap to call, every time.",
        "Big images and heavy video that were fine on office wifi crawl on a patchy 4G signal in a van.",
        "A popup lands before anyone has read a word, and the close button is half off the edge of the screen.",
      ],
    },
    {
      type: "p",
      text: "None of those are design opinions. They are the difference between someone getting in touch and someone backing out.",
    },
    {
      type: "h2",
      text: "Check yours properly",
    },
    {
      type: "p",
      text: "Not the little preview window on your desktop. An actual phone, held normally, on mobile data rather than wifi, ideally somewhere with an average signal.",
    },
    {
      type: "ol",
      items: [
        "Open your own website cold. Count how many seconds before you can read something useful.",
        "Without scrolling, can you tell what the business does, who it is for, and where it is? Three seconds is the bar.",
        "Find the thing you most want people to do. Is it visible without a long scroll, and can you hit it with a thumb first time?",
        "Tap the phone number. Does it ring? Tap the email. Does it open properly?",
        "Fill in your own enquiry form and confirm it arrives.",
        "Hand the phone to someone who does not know your business and watch where they get stuck. Say nothing. That silence tells you more than any analytics dashboard.",
      ],
    },
    {
      type: "callout",
      label: "The uncomfortable one",
      text: "If you have to pinch and zoom on your own website to read it, so does everyone else. Most people will not bother.",
    },
    {
      type: "h2",
      text: "Mobile first is not a smaller version",
    },
    {
      type: "p",
      text: "The common mistake is designing for the big screen and then squashing it down. What you end up with is technically responsive and practically useless. The order of the page has to change, not just the width. What matters most goes first, the rest can wait.",
    },
    {
      type: "p",
      text: "In practice that means the phone gets a shorter, sharper version of the story. Who you help, what you do, proof that you are any good, and an obvious way to get in touch. Everything else earns its place below that.",
    },
    {
      type: "p",
      text: "We build to the phone first and let the desktop take care of itself, because that is the order your customers actually arrive in. If you want a straight answer on how yours is doing, send us the link and we will have a proper look on a real handset and tell you what we would change.",
    },
  ],
  relatedSlugs: [
    "speed-tax-slow-website-costs",
    "real-reason-website-isnt-converting",
    "the-10pm-test",
  ],
};

export default post;
