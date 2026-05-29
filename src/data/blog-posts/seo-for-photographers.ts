import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "seo-for-photographers",
  title: "SEO for Photographers: Get Found Before They Open Instagram",
  tag: "SEO",
  excerpt:
    "Most photographers live on referrals and Instagram. The ones with steady year-round bookings have one thing in common: their website actually ranks on Google.",
  metaDescription:
    "SEO for photographers that drives real bookings. Local queries, image SEO, gallery speed fixes, and service pages that rank and convert.",
  date: "March 2026",
  readingMinutes: 7,
  coverImage: "/images/blog/seo-for-photographers.jpg",
  body: [
    {
      type: "p",
      text: "Most photographers run their business on three things: referrals, Instagram, and luck. It works, sort of. Until a quiet quarter hits, the algorithm changes, or your last bride moves to Australia and the word-of-mouth tap dries up.",
    },
    {
      type: "p",
      text: "The photographers who book steadily through the off-season have one boring thing in common. Their website ranks on Google for the queries their clients actually search. It is not sexy, but it is the closest thing to passive income a photographer has.",
    },
    {
      type: "h2",
      text: "The queries your clients actually type",
    },
    {
      type: "p",
      text: "Brides do not search \"award-winning lifestyle storyteller.\" They type \"wedding photographer Sheffield.\" New mums search \"newborn photographer Bristol home session.\" Brand owners search \"product photographer Manchester.\" The pattern is the same across every niche. Service plus location, sometimes with one specific modifier.",
    },
    {
      type: "p",
      text: "If your homepage says \"capturing moments since 2018\" and never names the city you shoot in, Google has no idea what to rank you for. Decide what you want to be found for. Then say it, in plain English, in your page titles, headings and copy.",
    },
    {
      type: "ul",
      items: [
        "Pick one primary service and one primary location per page.",
        "Use the exact phrase clients search, not your artistic re-wording of it.",
        "Mention venues, towns and postcodes you genuinely work in.",
        "Add a couple of questions you actually get asked. Google rewards real answers.",
      ],
    },
    {
      type: "h2",
      text: "Image SEO is not optional for you",
    },
    {
      type: "p",
      text: "Every other industry can get away with sloppy image SEO. You cannot. Images are your product. Google reads them through alt text, file names and surrounding context. Get this right and you start ranking in Google Images, which sends a surprising amount of traffic for visual searches.",
    },
    {
      type: "p",
      text: "The basics, done properly:",
    },
    {
      type: "ul",
      items: [
        "Rename files before upload. Not IMG_4821.jpg. Try sheffield-wedding-photographer-park-hill.jpg.",
        "Write descriptive alt text. \"Bride and groom first dance at The Maynard, Sheffield\" beats \"first dance.\"",
        "Compress to web standards. JPEG quality 80, around 200KB per gallery image, served as WebP where possible.",
        "Use proper image dimensions. A 6000px hero shrunk in CSS still loads the full file.",
      ],
    },
    {
      type: "h2",
      text: "Your portfolio gallery is probably tanking your speed",
    },
    {
      type: "p",
      text: "This is where most photographers lose. You have a beautiful 80-image wedding gallery on your homepage. Each image is 2MB. The page weighs 160MB. It loads in 14 seconds on 4G. Google sees that score and quietly buries you, no matter how good the photos are.",
    },
    {
      type: "callout",
      label: "Reality check",
      text: "Run your site through PageSpeed Insights on mobile. If your homepage scores under 50, your speed is actively losing you bookings. No amount of content can outweigh a page that will not load.",
    },
    {
      type: "p",
      text: "Lazy-load anything below the fold. Cap homepage galleries at 12 to 16 hero images. Use a proper image CDN if you are on a platform that allows it. Save the full archive for individual portfolio pages where people are deeper into the funnel.",
    },
    {
      type: "h2",
      text: "Service pages that rank AND convert",
    },
    {
      type: "p",
      text: "A portfolio is not a service page. A blog of last summer's weddings is not a service page. A service page is a single URL that targets one specific thing you sell, answers every question a serious enquiry has, and gives them one obvious next step.",
    },
    {
      type: "p",
      text: "If you shoot weddings, newborns, brand work and family sessions, that is four service pages, not one. Each one should cover:",
    },
    {
      type: "ol",
      items: [
        "Who it is for (couples in your area, new parents, founder-led brands, etc).",
        "What is included (coverage hours, edited images, prints, turnaround).",
        "Price guidance. A starting from figure is fine if a full menu feels exposing.",
        "Real examples from previous clients in the same category.",
        "FAQs. The ones you actually get asked, not generic ones.",
        "One clear call to action. Enquire, check availability, book a call.",
      ],
    },
    {
      type: "h2",
      text: "Local SEO matters as much as for any plumber",
    },
    {
      type: "p",
      text: "Yes, you have a Google Business Profile. Yes, you should treat it seriously. Photographers undersell themselves here because they think of their business as creative rather than local. To Google, you are a local service business. So play that game.",
    },
    {
      type: "p",
      text: "Fully complete the profile. Pick the right primary category (photographer, wedding photographer, portrait studio). Post your most recent work weekly. Ask every paying client for a Google review with a direct link. Reviews are still the single biggest lever for showing up in the map pack.",
    },
    {
      type: "h2",
      text: "What this looks like 12 months in",
    },
    {
      type: "p",
      text: "None of this rivals Instagram for ego. It does rival it for revenue. Photographers who get SEO right tend to settle into a pattern: two to four qualified enquiries a week landing in the inbox, most of them already half-sold because the service page did the work. Bookings that come from Google convert higher than DMs because the buyer has already self-qualified.",
    },
    {
      type: "p",
      text: "Pick one niche. Pick one location. Write one absolutely brilliant service page this week. Compress your gallery. Ask three clients for reviews. That is the start. The rest compounds.",
    },
  ],
};

export default post;
