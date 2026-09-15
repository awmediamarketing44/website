// Reviews taken straight off the public Trustpilot profile.
//
// WHY THIS FILE EXISTS SEPARATELY FROM projects.ts
// projects.ts holds a testimonial attached to a build we can name. Plenty of
// the best reviews are not attached to a project page at all, and several
// reviewers only give a first name. They are still real and still public, so
// they belong on a page that has to convince a stranger, they just have no
// project to hang off.
//
// EVERY QUOTE HERE IS VERBATIM, INCLUDING THE TYPOS. "Patience's", "upto" and
// "that ever" are in the originals. Do not tidy them. A cleaned-up review under
// a real person's name is not their review any more, and the small mistakes are
// most of what makes it read as a human rather than as marketing copy.
//
// Names are exactly as Trustpilot displays them. Nothing here is written by us.
//
// Pulled 8 September 2026 from https://uk.trustpilot.com/review/awmedia.marketing
// (5.0 from 311 reviews at the time). Counts live in review-stats.ts, not here.

export interface TrustpilotReview {
  /** Display name exactly as it appears on Trustpilot. */
  name: string;
  /** Verbatim review body. Never edited, never trimmed. */
  quote: string;
  /** Date shown on the review. */
  date: string;
}

export const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/awmedia.marketing";

export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    name: "Sean Mcintosh",
    date: "24 August 2026",
    quote:
      "AW Media & Marketing were great to work with. Everything was really quick and straightforward. I told them what I had in mind and they brought it to life exactly how I wanted. Any amendments I asked for were never a problem and were sorted with ease. Communication was spot on throughout and the guys clearly know what they're doing. I worked directly with Paul and he was great from start to finish. Would definitely work with them again. Highly recommend!",
  },
  {
    name: "Luke Pella",
    date: "1 July 2026",
    quote:
      "Alex and the team came as a recommendation and they definitely lived upto expectations and beyond! Patience's, attention to detail, prompt turn around. Literally, craftsmen in their field. I'd recommend AW Media's service to anyone and everyone looking for a team that are truly dialed into their line of work.",
  },
  {
    name: "Chloe",
    date: "21 January 2026",
    quote:
      "Incredible experience that I would highly recommend to anyone especially coaches and business owners. I've had AW designing my graphics for socials for a few months now and they've been so aesthetically pleasing. I'm gaining more traction on Instagram that ever with them. Recently they designed my website too and I'm blown away by how it looks and how they have managed to capture everything I wanted. From the colours, the details, the animations, the pictures and text, it's perfectly laid out and eye catching. I couldn't have designed it better myself. All for an incredible price too, they should 100% be charging more for their work.",
  },
];
