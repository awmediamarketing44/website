import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "who-actually-owns-your-website",
  title: "Who Actually Owns Your Website?",
  tag: "Strategy",
  excerpt:
    "Most business owners assume they own their website. Then they try to move it, and find out the domain, the hosting and the login are all in somebody else's name.",
  metaDescription:
    "Your domain, hosting and website logins should be in your name, not your designer's. How to check who really owns your website, and what to do if you do not.",
  date: "August 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/who-actually-owns-your-website-v2.jpg",
  body: [
    {
      type: "p",
      text: "Here is a question worth five minutes of your week. If you fell out with whoever built your website tomorrow, could you take it with you? Not in theory. Actually. Could you log in, move it, and carry on trading without asking anyone's permission?",
    },
    {
      type: "p",
      text: "A lot of business owners find out the answer at the worst possible moment. Usually when they want to change something, or move on, or the person who built it has stopped answering the phone.",
    },
    {
      type: "h2",
      text: "The three things that matter",
    },
    {
      type: "p",
      text: "Forget the design for a minute. There are three assets underneath every website, and they are the ones that actually decide whether you own it.",
    },
    {
      type: "ul",
      items: [
        "The domain name. This is the big one. If your domain is registered in your designer's account rather than yours, they hold the keys to your business address, your website and usually your email as well.",
        "The hosting. Where the site physically lives. If it sits inside someone else's reseller account you often cannot get a copy out without their help.",
        "The logins. The admin account for the site itself, plus Google Analytics, Search Console and your Google Business Profile. These get set up in a hurry on day one and never handed over.",
      ],
    },
    {
      type: "p",
      text: "None of that is usually malicious. It is normally just how it got set up, quickly, years ago, and nobody thought about it since. But the effect is the same. You are renting something you think you own.",
    },
    {
      type: "h2",
      text: "How to check, today",
    },
    {
      type: "ol",
      items: [
        "Look up your own domain on a WHOIS lookup. It will show you the registrar. If you cannot log into that registrar yourself, that is your first job.",
        "Check the renewal. Whose card is the domain renewing on? If it is not yours, your website has an expiry date you do not control.",
        "Try to log into your website admin without asking anyone. If you cannot, you do not have access, you have a relationship.",
        "Check Google Analytics and your Google Business Profile. Make sure your own email address is on there as an owner, not just a user.",
      ],
    },
    {
      type: "callout",
      label: "The honest bit",
      text: "Plenty of good designers hold client domains with the best intentions, because it is easier for them to manage. That is fine while everyone gets on. It is only a problem the day it is not, and that is exactly the day you cannot fix it.",
    },
    {
      type: "h2",
      text: "What good looks like",
    },
    {
      type: "p",
      text: "Your domain in your name, on your account, renewing on your card. Hosting either in your name or clearly documented so it can be moved. Owner-level access to your own site and your own Google accounts. Whoever looks after it gets added to your accounts, not the other way round.",
    },
    {
      type: "p",
      text: "That is how we set it up for our clients, and we will happily show you where everything lives. If you ever want to take it elsewhere, you can. Honestly, a designer who is confident in the work does not need to hold your domain hostage to keep you.",
    },
    {
      type: "h2",
      text: "If it is already in someone else's name",
    },
    {
      type: "p",
      text: "Do not panic and do not go in all guns blazing. Most of the time a polite message asking for the domain to be transferred into your own account gets sorted in a week. Ask for the authorisation code, open an account with a registrar in your own name, and move it across. If you get resistance, that tells you something useful about who you are working with.",
    },
    {
      type: "p",
      text: "Either way, get it sorted while nothing is wrong. It is a boring job that takes an afternoon, and it is a lot cheaper than rebuilding a website from scratch because you could not get into the old one. If you are not sure what you are looking at, send us a message and we will talk you through it, whether you end up working with us or not.",
    },
  ],
  relatedSlugs: [
    "how-to-choose-a-web-designer",
    "every-change-takes-weeks-with-your-developer",
    "google-business-profile-mistakes",
  ],
};

export default post;
