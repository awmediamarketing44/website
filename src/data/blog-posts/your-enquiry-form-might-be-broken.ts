import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "your-enquiry-form-might-be-broken",
  title: "Your Enquiry Form Might Have Been Broken For Months",
  tag: "Web Design",
  excerpt:
    "A contact form that quietly stops delivering looks exactly like a quiet month. No error, no bounce, no warning. Just an inbox that goes still and a business owner blaming the market.",
  metaDescription:
    "Broken contact forms fail silently and cost real enquiries. How to test your website form properly in ten minutes, and the settings that usually cause it.",
  date: "August 2026",
  readingMinutes: 4,
  coverImage: "/images/blog/your-enquiry-form-might-be-broken-v2.jpg",
  body: [
    {
      type: "p",
      text: "This is the one that costs people the most money and gets noticed the least. Your website form says thanks, we will be in touch. The customer believes it. The message never arrives. Nobody finds out for months.",
    },
    {
      type: "p",
      text: "There is no alert for this. No bounce-back, no red warning in your inbox. From where you are sitting it looks identical to a slow quarter. That is what makes it so expensive.",
    },
    {
      type: "h2",
      text: "Why forms fail quietly",
    },
    {
      type: "ul",
      items: [
        "The notification address belonged to someone who left, or to an old domain that no longer receives mail.",
        "The site started sending from an address it is not authorised to send from, so the messages get filed as spam or dropped entirely before anyone sees them.",
        "A plugin, theme or hosting change updated in the background and quietly broke the send.",
        "Spam protection got turned up too high and is now silently binning real people along with the bots.",
        "The form saves the enquiry into the website but was never actually wired up to email anyone about it.",
      ],
    },
    {
      type: "p",
      text: "That last one is more common than you would think. The enquiries are sitting there, in a dashboard nobody logs into, going stale.",
    },
    {
      type: "h2",
      text: "The ten minute test",
    },
    {
      type: "ol",
      items: [
        "Fill your own form in, from your phone, on mobile data rather than the office wifi. Use a real message, not the word test.",
        "Time how long the notification takes to land. If it is not there inside a couple of minutes, treat that as a fail.",
        "Check the junk folder before you celebrate. Landing in spam is still failing, because that is where it lands for your customer's reply too.",
        "Do it again from a different email address, ideally a Gmail and an Outlook one, because they filter differently.",
        "Reply to the notification. Make sure your reply actually reaches the person who enquired, rather than bouncing back to your own website.",
        "Log into the website itself and check whether the enquiry was stored as well as sent. Belt and braces.",
      ],
    },
    {
      type: "callout",
      label: "Do this quarterly",
      text: "Put a recurring reminder in your calendar to test your own form every three months, and always after any website or hosting change. It takes ten minutes and it is the cheapest insurance in your business.",
    },
    {
      type: "h2",
      text: "What we do about it",
    },
    {
      type: "p",
      text: "On our builds an enquiry gets stored on the site and emailed out, so if one route fails the other still has it. The sending is set up properly on your own domain so it is trusted rather than guessed at. And there is a real thank you page afterwards, which doubles as a way of counting how many enquiries you actually got.",
    },
    {
      type: "p",
      text: "That last part matters more than it sounds. If you can count enquiries, you can spot the week they stop. Without that you are relying on noticing an absence, and people are terrible at noticing an absence.",
    },
    {
      type: "h2",
      text: "The bit that stings",
    },
    {
      type: "p",
      text: "Every silent form failure is somebody who chose you. They read the site, they liked what they saw, they typed their details in and they hit send. That is the hardest part of the job done. Then they waited, heard nothing, decided you could not be bothered, and rang somebody else.",
    },
    {
      type: "p",
      text: "Go and test yours now, before you read anything else. If it fails, or you are not sure what you are looking at, give us a shout and we will check it over properly.",
    },
  ],
  relatedSlugs: [
    "real-reason-website-isnt-converting",
    "embarrassed-to-send-people-to-your-website",
    "landing-page-vs-homepage",
  ],
};

export default post;
