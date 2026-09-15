import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "nobody-is-looking-after-your-website",
  title: "Nobody Is Looking After Your Website",
  tag: "Web Design",
  excerpt:
    "A website is not a thing you buy once and forget. Most of the broken sites we get called about were fine on launch day and nobody touched them since.",
  metaDescription:
    "Websites decay quietly. What actually goes wrong after launch, who is meant to be looking after it, and the short list of checks worth doing every month.",
  date: "September 2026",
  readingMinutes: 5,
  coverImage: "/images/blog/nobody-is-looking-after-your-website.jpg",
  body: [
    {
      type: "p",
      text: "Ask a business owner who looks after their website and you usually get a pause.",
    },
    {
      type: "p",
      text: "Then something like, the lad who built it. And when did you last speak to him. Ooh, two years ago, maybe three.",
    },
    {
      type: "p",
      text: "So the answer is nobody. And that is not a disaster on day one, it is just a slow puncture.",
    },
    { type: "h2", text: "Websites do not sit still" },
    {
      type: "p",
      text: "People assume a website is like a sign. You buy it, it goes up, it stays up.",
    },
    {
      type: "p",
      text: "It is more like a van. It works brilliantly, and it still needs somebody to notice the tyres. Browsers change, phones change, the software underneath gets updates, plugins stop being maintained, certificates expire, and the payment card on the hosting eventually gets replaced.",
    },
    {
      type: "p",
      text: "None of that announces itself. It just gets quietly worse until something visible breaks, and by then it has usually been costing you enquiries for a while.",
    },
    { type: "h2", text: "What actually goes wrong" },
    {
      type: "ul",
      items: [
        "The contact form stops sending. The commonest one we see, and the worst, because the site looks perfect and people are filling it in. You do not notice a form that goes quiet, you just think the market has gone soft.",
        "The security certificate expires. Browsers then put a warning in front of your site telling people it is not safe. That is a cliff, not a slope.",
        "Plugins go stale. On WordPress especially, an out of date plugin is the way most sites get hacked, and a hacked site can end up with pages Google flags.",
        "The content goes out of date. Old prices, staff who left, a service you stopped offering, last year on the copyright line. Every one of those tells a visitor nobody is home.",
        "It gets slower. Images added over the years, nothing optimised, and the site that loaded in two seconds now takes six on a phone.",
        "Nobody has the logins. Domain with one company, hosting with another, and the person who set it up is long gone.",
      ],
    },
    { type: "h2", text: "The bit that catches everybody" },
    {
      type: "p",
      text: "Domain renewals. The domain is the actual address of your business, and it sits on an auto renewal against a card that expired at some point.",
    },
    {
      type: "p",
      text: "The reminder goes to an email address nobody uses any more. The domain lapses. The site goes dark, and so does every email account on it, which is usually the moment somebody rings us in a panic.",
    },
    {
      type: "p",
      text: "You can usually get it back, and it can be expensive and stressful. Or you can spend ten minutes today checking the renewal date and which card is attached to it.",
    },
    { type: "h2", text: "The monthly ten minutes" },
    {
      type: "p",
      text: "You do not need a contract to do most of this. Put it in the calendar once a month.",
    },
    {
      type: "ol",
      items: [
        "Fill in your own contact form and check the message arrives. Every month, no exceptions.",
        "Open the site on your phone, on mobile data, and count how long it takes to be usable.",
        "Check for a padlock in the address bar.",
        "Read your own homepage as if you had never seen it. Is anything on there no longer true.",
        "Confirm you know who holds the domain, the hosting and the logins, and that the renewal card is live.",
      ],
    },
    {
      type: "p",
      text: "That is the lot. Five things, ten minutes, and it catches almost everything before a customer finds it for you.",
    },
    { type: "h2", text: "When it is worth paying somebody" },
    {
      type: "p",
      text: "If the site makes you money, if it takes payments or bookings, or if you would be in trouble with it down for a day, then somebody should be looking after it properly. Updates, backups that have actually been tested, uptime monitoring and a real person to ring.",
    },
    {
      type: "p",
      text: "If it is a five page site that quietly does its job, the ten minutes a month is honestly plenty. We would rather tell you that than sell you a care plan you do not need.",
    },
    {
      type: "p",
      text: "Either way, the thing to avoid is the situation most people are in right now, which is assuming somebody else is on it.",
    },
    {
      type: "callout",
      label: "Free website audit",
      text: "Checks the things that go wrong quietly, including speed, security and whether you are still findable. Takes a minute and you see the report straight away.",
      href: "/website-audit",
      linkLabel: "Check your site",
    },
  ],
  relatedSlugs: [
    "who-actually-owns-your-website",
    "your-enquiry-form-might-be-broken",
    "how-often-should-you-redesign-your-website",
  ],
};

export default post;
