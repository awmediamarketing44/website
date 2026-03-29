export interface ServiceData {
  slug: string;
  title: string;
  tag: string;
  headerTitle: string;
  headerAccent: string;
  headerDescription: string;
  longDescription: string[];
  features: string[];
  benefits: { title: string; description: string }[];
  whoIsThisFor: string[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtext: string;
  relatedProjects: string[];
}

export const services: ServiceData[] = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    tag: "Web Design",
    headerTitle: "Websites that turn visitors",
    headerAccent: "into paying clients.",
    headerDescription:
      "Custom-built, conversion-focused websites for fitness professionals. No templates. No page builders. Just websites that actually work.",
    longDescription: [
      "Your website is the first impression most clients will ever have of your business. And right now? It's probably costing you enquiries. A slow, outdated, template-looking site tells potential clients you're not serious — even if you're the best coach in your area.",
      "We design and build websites from scratch, specifically for fitness coaches, PTs, and gym owners. Every layout, every section, every call-to-action is designed with one goal: get your visitors to book a call or sign up. Not just look pretty.",
      "You get a site that loads in under 2 seconds, looks premium on every device, ranks on Google, and integrates with your booking system and payment provider. Built on modern tech that won't break when you need it most.",
    ],
    features: [
      "Custom design tailored to your brand",
      "Mobile-first, responsive on all devices",
      "SEO-optimised from day one",
      "Fast loading speeds (under 2 seconds)",
      "Booking & payment integrations",
      "Content management system",
    ],
    benefits: [
      {
        title: "More enquiries, less chasing.",
        description:
          "A website built to convert means your inbox fills up with qualified leads — people who are already sold before they message you.",
      },
      {
        title: "Look like the premium option.",
        description:
          "When your website looks like it belongs to a brand ten times your size, clients stop comparing you on price and start choosing you on quality.",
      },
      {
        title: "Stop losing clients to competitors.",
        description:
          "Every day your website underperforms, potential clients are finding someone else. A site that converts means you stop leaving money on the table.",
      },
    ],
    whoIsThisFor: [
      "Fitness coaches who are getting enquiries through DMs but losing them when they share their website",
      "PTs who've outgrown their Wix or Squarespace site and need something professional",
      "Gym owners who want a site that actually reflects the quality of their facility",
      "Online coaches launching a new brand and want to start with something premium",
    ],
    faqs: [
      {
        question: "How long does a website take to build?",
        answer:
          "Most websites are delivered within 2-4 weeks. More complex builds with booking systems, client portals, or e-commerce features take 4-6 weeks. We'll give you a clear timeline before we start — and we stick to it.",
      },
      {
        question: "Will I be able to update it myself?",
        answer:
          "Yes. Every site comes with an easy-to-use CMS so you can update text, images, and blog posts yourself. We also give you a walkthrough so you're not left guessing.",
      },
      {
        question: "What platform do you build on?",
        answer:
          "It depends on your needs. We use WordPress, Shopify, and custom-built solutions depending on what your business actually requires. We'll recommend the best option during your discovery call.",
      },
    ],
    ctaHeadline: "Ready to stop losing clients to a bad website?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what needs fixing.",
    relatedProjects: ["Hard to Kill", "Newgen Coaching", "Bridge2Fitness", "Glean App"],
  },
  {
    slug: "branding",
    title: "Logo Design & Branding",
    tag: "Branding",
    headerTitle: "A brand that makes people",
    headerAccent: "stop scrolling.",
    headerDescription:
      "Your brand is more than a logo. It's the reason someone chooses you over the other 50 coaches in their feed.",
    longDescription: [
      "Here's the truth: most fitness coaches are using a logo they got off Fiverr for £20 and a colour palette they picked because they liked it. There's no strategy behind it, no consistency across platforms, and no connection to the audience they're trying to attract.",
      "Your brand is every touchpoint a potential client has with your business — your logo, your colours, your fonts, your social posts, your website, your email signature. When all of those things feel cohesive and premium, you don't have to convince people you're worth the price. They already feel it.",
      "We build complete brand identities from the ground up. Not just a logo — a full system that works across your website, social media, print materials, and everything in between. Designed specifically for the fitness industry, where standing out in a crowded market is everything.",
    ],
    features: [
      "Primary logo + variations",
      "Colour palette & typography",
      "Brand guidelines document",
      "Social media templates",
      "Business card & print design",
      "Brand strategy & positioning",
    ],
    benefits: [
      {
        title: "Charge more without justifying it.",
        description:
          "A premium brand makes your pricing feel right. Clients don't question the cost when everything looks and feels high-end.",
      },
      {
        title: "Consistency without the headache.",
        description:
          "No more guessing which colours to use or what font goes where. Your brand guidelines make every piece of content look like it belongs.",
      },
      {
        title: "Stand out in a saturated market.",
        description:
          "The fitness industry is packed. A distinctive brand identity means people remember you — and come back when they're ready to buy.",
      },
    ],
    whoIsThisFor: [
      "Coaches launching a new brand and want to get it right from day one",
      "Established PTs who've outgrown their DIY logo and need a professional upgrade",
      "Gym owners rebranding after a change in direction or new ownership",
      "Anyone who's tired of their brand looking inconsistent across platforms",
    ],
    faqs: [
      {
        question: "How many logo concepts do I get?",
        answer:
          "We present 3 initial concepts based on your brief and our research. From there, we refine your chosen direction until it's exactly right. Most clients are happy within 2 rounds of revisions.",
      },
      {
        question: "What if I already have a logo but need everything else?",
        answer:
          "No problem. We can build a full brand system around your existing logo — colour palette, typography, templates, guidelines. We'll be honest if we think the logo needs work, but the call is always yours.",
      },
      {
        question: "How long does a branding project take?",
        answer:
          "Typically 2-3 weeks from kickoff to final delivery. The timeline depends on how quickly you provide feedback on concepts — we don't drag things out.",
      },
    ],
    ctaHeadline: "Ready to look like a brand people trust?",
    ctaSubtext: "Book a free call and we'll talk through your vision.",
    relatedProjects: ["Lumina Stone", "The Mind Architect"],
  },
  {
    slug: "social-media",
    title: "Social Media Graphics",
    tag: "Social Media",
    headerTitle: "Content that actually",
    headerAccent: "looks professional.",
    headerDescription:
      "Scroll-stopping graphics and templates so your feed looks consistent, branded, and premium — without you spending hours in Canva.",
    longDescription: [
      "You know you need to post consistently. But between coaching clients, writing programmes, and actually living your life, designing social media content falls to the bottom of the list. And when you do get around to it, you're stuck in Canva for three hours making something you'll probably delete anyway.",
      "Your Instagram feed is often the first thing potential clients check before they enquire. If it looks inconsistent, messy, or like every other fitness account, you're losing people before they even read your caption.",
      "We design custom templates and graphics that match your brand, so every post looks like it was made by a design team — because it was. You get templates you can reuse, custom one-off designs for launches and campaigns, and a feed that finally looks like it belongs to a premium brand.",
    ],
    features: [
      "Custom post & story templates",
      "Carousel designs",
      "Highlight covers",
      "Content calendar templates",
      "Branded quote & tip graphics",
      "Reel cover designs",
    ],
    benefits: [
      {
        title: "Save hours every week.",
        description:
          "With branded templates ready to go, creating content takes minutes instead of hours. Drag, drop, post. Done.",
      },
      {
        title: "Look premium in every feed.",
        description:
          "When someone lands on your profile, they see a cohesive, professional brand — not a random collection of different styles and fonts.",
      },
      {
        title: "More engagement, more reach.",
        description:
          "Professionally designed graphics get more saves, shares, and engagement. Better content means the algorithm works for you, not against you.",
      },
    ],
    whoIsThisFor: [
      "Coaches who know they need to post but dread the design process",
      "PTs who are spending more time in Canva than with their clients",
      "Brands that want a consistent, premium look across all their social platforms",
      "Anyone launching a programme or challenge and needs graphics that convert",
    ],
    faqs: [
      {
        question: "Can I edit the templates myself?",
        answer:
          "Yes. We design templates in Canva so you can easily swap text, images, and colours. We'll walk you through how to use them so you're self-sufficient.",
      },
      {
        question: "How many templates do I get?",
        answer:
          "It depends on the package, but a typical starter set includes 10-15 templates covering posts, stories, carousels, and highlight covers. Enough to keep your feed looking premium for months.",
      },
      {
        question: "Do you offer ongoing design support?",
        answer:
          "Absolutely. We offer monthly packages where we design fresh content for you on a rolling basis — new templates, campaign graphics, whatever you need. No more DIY.",
      },
    ],
    ctaHeadline: "Ready to stop dreading content day?",
    ctaSubtext: "Let's build you a set of templates that makes posting easy.",
    relatedProjects: ["The Mind Architect", "Lumina Stone"],
  },
  {
    slug: "seo-support",
    title: "SEO & Monthly Support",
    tag: "SEO & Support",
    headerTitle: "A website that keeps",
    headerAccent: "working after launch.",
    headerDescription:
      "Ongoing SEO, security, performance, and content support. Think of it as having a web team on retainer — without the overhead.",
    longDescription: [
      "Most agencies build your site, hand over the keys, and disappear. Six months later your plugins are outdated, your site's been hacked, and you're on page 4 of Google wondering what went wrong. Sound familiar?",
      "A website isn't a set-and-forget thing. Google changes its algorithm constantly, security threats evolve, and your competitors are investing in their online presence every month. If your site isn't being maintained and improved, it's falling behind.",
      "Our monthly support covers everything: SEO improvements to climb the rankings, security updates to keep you protected, performance monitoring to keep your site fast, and content updates whenever you need them. One monthly fee, no surprises, priority support whenever you need us.",
    ],
    features: [
      "Monthly SEO improvements",
      "Google Search Console management",
      "Performance & speed monitoring",
      "Security updates & backups",
      "Content updates & changes",
      "Priority support",
    ],
    benefits: [
      {
        title: "Climb the Google rankings.",
        description:
          "Consistent SEO work means you show up when people in your area search for a PT, coach, or gym. More organic traffic, fewer ad costs.",
      },
      {
        title: "Never worry about your site breaking.",
        description:
          "We handle security patches, plugin updates, and daily backups so you never wake up to a broken or hacked website.",
      },
      {
        title: "One less thing to think about.",
        description:
          "Need a text change? New images? A blog post uploaded? Just send it over. We handle all the fiddly stuff so you don't have to.",
      },
    ],
    whoIsThisFor: [
      "Coaches who want their website to generate organic leads without paying for ads",
      "Anyone who's been burned by an agency that disappeared after launch",
      "Business owners who don't have time to manage their own site updates",
      "PTs who want to rank on Google for their local area",
    ],
    faqs: [
      {
        question: "How quickly will I see SEO results?",
        answer:
          "SEO is a long game. Most clients start seeing meaningful improvements in rankings and traffic within 3-6 months. We'll send you monthly reports so you can track exactly what's happening.",
      },
      {
        question: "What if I need something updated urgently?",
        answer:
          "You get priority support. Small updates are usually done within 24 hours. For anything bigger, we'll give you a clear timeline.",
      },
      {
        question: "Can I cancel at any time?",
        answer:
          "Yes, no lock-in contracts. We work month to month because we'd rather keep you because we're good at what we do, not because you're stuck in a contract.",
      },
    ],
    ctaHeadline: "Ready to stop worrying about your website?",
    ctaSubtext: "Let us handle the tech so you can focus on coaching.",
    relatedProjects: ["Hard to Kill", "Bridge2Fitness", "Newgen Coaching"],
  },
  {
    slug: "ecommerce",
    title: "Shopify & E-Commerce",
    tag: "E-Commerce",
    headerTitle: "An online store that",
    headerAccent: "actually sells.",
    headerDescription:
      "Supplements, merch, digital programmes, subscriptions — we build Shopify stores that look premium and are built to convert.",
    longDescription: [
      "Selling online should be straightforward. But if your store looks like a default Shopify template with stock photos and generic descriptions, your customers are bouncing before they even add something to the cart. In fitness, trust is everything — and a cheap-looking store kills it instantly.",
      "We design and build custom Shopify stores that match the quality of your products. From product photography direction to checkout optimisation, every detail is designed to reduce friction and increase conversions. Whether you're selling supplements, gym apparel, meal plans, or coaching programmes.",
      "And we don't just make it look good — we set up the systems that make your life easier. Automated inventory management, subscription billing, abandoned cart recovery, and analytics that actually tell you what's working.",
    ],
    features: [
      "Custom Shopify theme design",
      "Product page optimisation",
      "Payment & shipping setup",
      "Subscription & membership integration",
      "Abandoned cart recovery",
      "Analytics & conversion tracking",
    ],
    benefits: [
      {
        title: "Higher conversion rates.",
        description:
          "A store designed with your customer in mind means more visitors become buyers. Better product pages, smoother checkout, fewer abandoned carts.",
      },
      {
        title: "Passive income on autopilot.",
        description:
          "Digital products, subscriptions, and automated fulfilment mean you can earn money while you're coaching, sleeping, or on holiday.",
      },
      {
        title: "A store that grows with you.",
        description:
          "Shopify scales. Whether you're doing 10 orders a month or 10,000, your store handles it. We build for where you're going, not just where you are.",
      },
    ],
    whoIsThisFor: [
      "Coaches selling digital programmes, meal plans, or e-books online",
      "Fitness brands launching a supplement or apparel line",
      "PTs who want to add a revenue stream beyond 1:1 coaching",
      "Gym owners selling memberships, merchandise, or class passes online",
    ],
    faqs: [
      {
        question: "Do I need to use Shopify?",
        answer:
          "For e-commerce, Shopify is our top recommendation — it's the most reliable, scalable platform for product-based businesses. But if you have specific needs, we'll recommend what works best for you.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes. We can migrate from WooCommerce, Wix, or any other platform to Shopify without losing your products, customer data, or order history.",
      },
      {
        question: "Do you handle product photography?",
        answer:
          "We don't shoot product photos ourselves, but we provide detailed photography briefs and creative direction so you or your photographer know exactly what's needed.",
      },
    ],
    ctaHeadline: "Ready to turn your products into profit?",
    ctaSubtext: "Book a call and let's talk about your store.",
    relatedProjects: ["FitGear Store"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages & Ads",
    tag: "Landing Pages",
    headerTitle: "Stop burning ad spend",
    headerAccent: "on pages that don't convert.",
    headerDescription:
      "High-converting landing pages designed specifically for paid traffic. Every element tested, every word intentional.",
    longDescription: [
      "You're spending money on Facebook ads, Instagram ads, maybe Google too. The clicks are coming in. But the conversions? Nowhere near what they should be. The problem isn't your ads — it's where you're sending people.",
      "A homepage is not a landing page. Sending paid traffic to a page with a navigation bar, six different CTAs, and your life story is the fastest way to burn your ad budget. A proper landing page has one goal, one message, and one action — and it's designed to make that action feel like a no-brainer.",
      "We build landing pages specifically for paid traffic. Clean design, sharp copy, social proof in the right places, and a conversion path that's been tested across hundreds of fitness industry campaigns. Your ads bring the traffic. Our pages close the deal.",
    ],
    features: [
      "Conversion-optimised design",
      "A/B testing ready",
      "Facebook & Google Ads integration",
      "Lead capture forms",
      "Speed optimised for ad traffic",
      "Analytics & tracking setup",
    ],
    benefits: [
      {
        title: "Lower cost per lead.",
        description:
          "A page that converts at 15% instead of 3% means you're paying a fraction of the cost for each enquiry. Same ad spend, five times the results.",
      },
      {
        title: "Launch campaigns faster.",
        description:
          "We can turn around a high-converting landing page in days, not weeks. When you're ready to run ads, your page is ready too.",
      },
      {
        title: "Know exactly what's working.",
        description:
          "Full tracking and analytics setup means you see every click, every form submission, and every conversion. No guesswork.",
      },
    ],
    whoIsThisFor: [
      "Coaches running Facebook or Instagram ads and not seeing enough conversions",
      "PTs launching a new programme, challenge, or lead magnet",
      "Anyone currently sending ad traffic to their homepage (stop doing that)",
      "Businesses who want to test offers quickly without building a full website",
    ],
    faqs: [
      {
        question: "How fast can you build a landing page?",
        answer:
          "A single landing page can be designed, built, and live within 3-5 business days. If you're in a rush, we can often do faster — just ask.",
      },
      {
        question: "Do you write the copy too?",
        answer:
          "Yes. Every landing page includes conversion-focused copy written by our team. We'll need some information about your offer and audience, but we handle the heavy lifting.",
      },
      {
        question: "Can you manage my ads as well?",
        answer:
          "We focus on the creative and the pages, not the ad management itself. But we work closely with ad managers and can recommend trusted partners if you need one.",
      },
    ],
    ctaHeadline: "Ready to make your ad spend actually work?",
    ctaSubtext: "Book a call and we'll audit your current setup for free.",
    relatedProjects: ["Pyper Fitness"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
