export interface ServiceData {
  slug: string;
  title: string;
  // Optional SEO overrides. Without these the route falls back to the
  // "<title> | UK Services" pattern, which is fine for most services but too
  // narrow where the page has to answer a specific search term.
  metaTitle?: string;
  metaDescription?: string;
  // Schema.org serviceType. Falls back to `title`, which is fine for most, but
  // "Bespoke Systems & Software" is a brand phrase rather than a thing anyone
  // searches, so that one names the category properly.
  serviceType?: string;
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
  // Optional proof block for services whose deliverable is a screen rather than
  // a website: the systems page shows the actual software we have built. Only
  // rendered when present, so nothing else on /services changes.
  showcase?: {
    heading: [string, string];
    intro: string;
    systems: {
      name: string;
      sector: string;
      caseStudy: string;
      summary: string;
      shots: { src: string; caption: string }[];
      note: string;
    }[];
  };
  // Slug of a form hosted in the CRM (crm.awmedia.marketing/<slug>). When set,
  // the closing CTA embeds that form instead of only offering a call.
  formSlug?: string;
  subscription?: {
    name: string;
    tagline: string;
    intro: string;
    cadences?: { name: string; detail: string }[];
    pricing?: {
      note: string;
      aiNote: string;
      tiers: {
        name: string;
        bestFor: string;
        cadence: string;
        features: string[];
        standard: { price: string; plan: string; perGraphic: string };
        ai: { price: string; plan: string; perGraphic: string };
        highlight?: boolean;
        badge?: string;
      }[];
    };
    whatYouGet: string[];
    process: { step: string; detail: string }[];
    flexibility: string;
    ctaHref?: string;
  };
}

export const services: ServiceData[] = [
  {
    slug: "web-design",
    title: "Web Design & Development",
    tag: "Web Design",
    headerTitle: "Websites that turn visitors",
    headerAccent: "into paying clients.",
    headerDescription:
      "Custom-built, conversion-focused websites for ambitious UK businesses. No templates. No page builders. Just websites that actually work.",
    longDescription: [
      "Your website is the first impression most clients will ever have of your business. And right now? It's probably costing you enquiries. A slow, outdated, template-looking site tells potential clients you're not serious, even if you're the best in your area.",
      "We design and build websites from scratch, tailored to your brand and audience. Every layout, every section, every call-to-action is designed with one goal: get your visitors to book a call or sign up. Not just look pretty.",
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
          "A website built to convert means your inbox fills up with qualified leads. People who are already sold before they message you.",
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
      "Businesses getting enquiries through DMs or referrals but losing them when people land on the website",
      "Operators who've outgrown a Wix or Squarespace site and need something professional",
      "Service businesses who want a site that actually reflects the quality of their work",
      "Anyone launching a new brand or rebrand and wanting to start with something premium",
    ],
    faqs: [
      {
        question: "How long does a website take to build?",
        answer:
          "Most websites are delivered within 2-4 weeks. More complex builds with booking systems, client portals, or e-commerce features take 4-6 weeks. We'll give you a clear timeline before we start, and we stick to it.",
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
    ctaSubtext: "Book a free 20-minute call. We'll tell you exactly what needs fixing.",
    relatedProjects: ["Hard to Kill", "Newgen Coaching", "Bridge2Fitness", "Glean App"],
  },
  {
    slug: "branding",
    title: "Logo Design & Branding",
    tag: "Branding",
    headerTitle: "A brand that makes people",
    headerAccent: "stop scrolling.",
    headerDescription:
      "Your brand is more than a logo. It's the reason someone chooses you over the dozens of competitors in their feed.",
    longDescription: [
      "Here's the truth: most small businesses are using a logo they got off Fiverr for £20 and a colour palette they picked because they liked it. There's no strategy behind it, no consistency across platforms, and no connection to the audience they're trying to attract.",
      "Your brand is every touchpoint a potential client has with your business. Your logo, your colours, your fonts, your social posts, your website, your email signature. When all of those things feel cohesive and premium, you don't have to convince people you're worth the price. They already feel it.",
      "We build complete brand identities from the ground up. Not just a logo. A full system that works across your website, social media, print materials, and everything in between. Designed for businesses where standing out in a crowded market is everything.",
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
          "Most markets are crowded. A distinctive brand identity means people remember you and come back when they're ready to buy.",
      },
    ],
    whoIsThisFor: [
      "Founders launching a new brand and wanting to get it right from day one",
      "Established businesses who've outgrown their DIY logo and need a professional upgrade",
      "Operators rebranding after a change in direction, ownership, or repositioning",
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
          "No problem. We can build a full brand system around your existing logo: colour palette, typography, templates, guidelines. We'll be honest if we think the logo needs work, but the call is always yours.",
      },
      {
        question: "How long does a branding project take?",
        answer:
          "Typically 2-3 weeks from kickoff to final delivery. The timeline depends on how quickly you provide feedback on concepts. We don't drag things out.",
      },
    ],
    ctaHeadline: "Ready to look like a brand people trust?",
    ctaSubtext: "Book a free call and we'll talk through your vision.",
    relatedProjects: ["Lumina Stone", "The Mind Architect"],
  },
  {
    slug: "social-media",
    title: "Social Media Graphics",
    metaTitle: "Social Media Marketing Sheffield | Content & Graphics | AW Media",
    metaDescription:
      "Social media marketing and design for Sheffield businesses. On-brand content, carousels, templates and ad creative, planned and delivered for you every week.",
    tag: "Social Media",
    headerTitle: "Content that actually",
    headerAccent: "looks professional.",
    headerDescription:
      "Social media marketing and design for Sheffield businesses and brands across the UK. Scroll-stopping graphics and templates so your feed looks consistent, branded and premium, without you spending hours in Canva.",
    longDescription: [
      "You know you need to post consistently. But between running the business, serving clients, and actually living your life, designing social media content falls to the bottom of the list. And when you do get around to it, you're stuck in Canva for three hours making something you'll probably delete anyway.",
      "Your Instagram feed is often the first thing potential clients check before they enquire. If it looks inconsistent, messy, or like every other account in your space, you're losing people before they even read your caption.",
      "We design custom templates and graphics that match your brand, so every post looks like it was made by a design team. Because it was. You get templates you can reuse, custom one-off designs for launches and campaigns, and a feed that finally looks like it belongs to a premium brand.",
      "Here's where we're different from a typical social media marketing agency, and it's worth being straight about it. We're not a community manager sitting in your inbox replying to comments, and we won't sell you a retainer built on posting for the sake of it. We're the design and content engine behind your social: we work out what's worth posting, we design it properly, and we deliver it on time so you can actually stay consistent. The consistency is the bit that compounds, and it's the bit almost every business gives up on first.",
      "For a Sheffield business, social does a specific job. It's the second place a local customer checks after your website, and often the first if they found you through a friend, a local group or a hashtag. A feed that looks sharp, current and unmistakably yours turns that check into an enquiry. A feed that's three months stale, or looks like it was made in five different apps, quietly sends them to whoever looks more on top of things. We're a Sheffield studio, so we know the local market you're being compared against.",
      "The work covers the full spread: what to post and in what order, the carousels and single posts themselves, story and highlight templates you can reuse, launch and campaign graphics, ad creative built to convert paid traffic rather than just look nice, and YouTube thumbnails and lead magnets when those are part of the plan. It all follows one brand system, so everything you put out pulls in the same direction.",
    ],
    features: [
      "Custom post & story templates",
      "Carousel designs",
      "Highlight covers",
      "Content calendar templates",
      "Branded quote & tip graphics",
      "Reel cover designs",
      "Launch & campaign graphics",
      "Paid social ad creative",
      "Consistent brand system across every platform",
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
          "When someone lands on your profile, they see a cohesive, professional brand, not a random collection of different styles and fonts.",
      },
      {
        title: "More engagement, more reach.",
        description:
          "Professionally designed graphics get more saves, shares, and engagement. Better content means the algorithm works for you, not against you.",
      },
    ],
    whoIsThisFor: [
      "Business owners who know they need to post but dread the design process",
      "Operators who are spending more time in Canva than with their clients",
      "Brands that want a consistent, premium look across all their social platforms",
      "Anyone launching a programme, product, or campaign and needing graphics that convert",
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
          "Absolutely. We offer monthly packages where we design fresh content for you on a rolling basis: new templates, campaign graphics, whatever you need. No more DIY.",
      },
      {
        question: "Do you do social media marketing for Sheffield businesses?",
        answer:
          "Yes. We're a Sheffield studio and a good chunk of the businesses we design social content for are local, though we work with brands right across the UK. What we do is the content side of social media marketing: working out what's worth posting, designing it to a standard that makes you look premium, and delivering it on a schedule so you stay consistent. What we don't do is sit in your inbox as a community manager. If that's what you need, we'll tell you straight rather than sell you the wrong thing.",
      },
      {
        question: "What does social media marketing actually include?",
        answer:
          "For most businesses it breaks into four parts: deciding what to post and when, creating the content itself, publishing it consistently, and looking at what worked. We cover the deciding and the creating, which is where nearly every business gets stuck, and we build it all on one brand system so your feed, your ads and your website look like the same company. Publishing stays with you or your team, which keeps you in control of your accounts and your tone.",
      },
      {
        question: "How do I keep posting consistently when I'm busy running the business?",
        answer:
          "By taking the design decision off your plate entirely. That's the whole idea behind our AW-lways On Time subscription: you get a fixed slot in our schedule, you tell us what's coming up, and finished graphics land ready to post. No blank Canva page, no half-finished drafts, no week where nothing goes out because the job overran.",
      },
      {
        question: "Can you design ads as well as organic posts?",
        answer:
          "Yes. Paid social creative is a different job from an organic post, because it has seconds to stop a stranger and one clear action to drive. We design ad creative built around that, matched to the offer and the audience you're targeting, so your ad spend comes back as enquiries rather than impressions.",
      },
    ],
    ctaHeadline: "Ready to stop dreading content day?",
    ctaSubtext: "Let's build you a set of templates that makes posting easy.",
    relatedProjects: ["The Mind Architect", "Lumina Stone"],
    subscription: {
      name: "AW-lways On Time",
      tagline: "Your dedicated design slot, every week",
      intro:
        "Don't want to touch the design at all? Our AW-lways On Time subscription gives you a dedicated spot in our schedule. You tell us what's coming up, we design scroll-stopping, on-brand graphics and deliver them like clockwork. No briefs left in your drafts, no Canva, no missed posts.",
      pricing: {
        note: "All graphics are custom designed to your brand. 3 month minimum term, billed via a simple Stripe subscription. Prefer to pay upfront? 3 months upfront saves you half a month, 6 months upfront gives you a full month free.",
        aiNote: "Happy for us to lean on our AI pipeline? The same tools that power the rest of the studio do the production heavy lifting, and every graphic is still art-directed, quality checked and finished by hand before it reaches you. Same slot, same deadlines, same brand standards. Just 25% off every plan.",
        tiers: [
          {
            name: "Monthly",
            bestFor: "Best for: smaller brands or anyone just getting serious about content.",
            cadence: "3 graphics / month",
            features: [
              "3 custom graphics every month",
              "Carousels, single posts, lead-gen designs or YouTube thumbnails",
              "Designed to your brand and content style",
              "Delivered in one batch, ready to schedule",
            ],
            standard: {
              price: "£100",
              plan: "per month",
              perGraphic: "approx £33 per graphic",
            },
            ai: {
              price: "£75",
              plan: "per month, normally £100",
              perGraphic: "approx £25 per graphic",
            },
          },
          {
            name: "Fortnightly",
            bestFor: "Best for: staying active online without the every-week commitment.",
            cadence: "6 graphics / month",
            features: [
              "6 custom graphics every month (3 every 2 weeks)",
              "A steady drip so your feed never goes quiet",
              "Priority in the design diary over monthly clients",
              "The balance of consistency and flexibility",
            ],
            standard: {
              price: "£170",
              plan: "per month (£85 every 2 weeks)",
              perGraphic: "approx £28 per graphic",
            },
            ai: {
              price: "£125",
              plan: "per month, normally £170",
              perGraphic: "approx £21 per graphic",
            },
          },
          {
            name: "Weekly",
            bestFor: "Best for: content-led brands that want to stay front of mind.",
            cadence: "12 graphics / month",
            features: [
              "12 custom graphics every month (3 every week)",
              "Full mix of formats, fresh every single week",
              "First priority in the design diary",
              "Swap a week's graphics for a 10-page PDF lead magnet or site updates",
            ],
            standard: {
              price: "£280",
              plan: "per month (£70 every week)",
              perGraphic: "approx £23 per graphic, best value",
            },
            ai: {
              price: "£210",
              plan: "per month, normally £280",
              perGraphic: "£17.50 per graphic, best value",
            },
            highlight: true,
            badge: "Most popular",
          },
        ],
      },
      whatYouGet: [
        "Carousels",
        "YouTube thumbnails",
        "Lead-gen designs",
        "Single posts",
      ],
      process: [
        {
          step: "Research",
          detail: "We get to know your brand, audience and content goals so every graphic hits the mark.",
        },
        {
          step: "Design",
          detail: "Our team creates bespoke, eye-catching visuals built to match your style and drive engagement.",
        },
        {
          step: "Deliver",
          detail: "Finished graphics land on time, every time, ready for you to post with zero hassle.",
        },
      ],
      flexibility:
        "Too busy to send your content this week? No problem. Swap your graphics for a professionally designed 10-page PDF lead magnet or website design updates instead, so you keep growing your brand even when time isn't on your side.",
    },
  },
  {
    slug: "seo-support",
    title: "SEO & Monthly Support",
    tag: "SEO & Support",
    headerTitle: "A website that keeps",
    headerAccent: "working after launch.",
    headerDescription:
      "Ongoing SEO, security, performance, and content support. Think of it as having a web team on retainer, without the overhead.",
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
          "Consistent SEO work means you show up when people in your area search for what you offer. More organic traffic, fewer ad costs.",
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
      "Business owners who want their website to generate organic leads without paying for ads",
      "Anyone who's been burned by an agency that disappeared after launch",
      "Operators who don't have time to manage their own site updates",
      "Local businesses who want to rank on Google for their area",
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
    ctaSubtext: "Let us handle the tech so you can focus on running your business.",
    relatedProjects: ["Hard to Kill", "Bridge2Fitness", "Newgen Coaching"],
  },
  {
    slug: "ecommerce",
    title: "Shopify & E-Commerce",
    tag: "E-Commerce",
    headerTitle: "An online store that",
    headerAccent: "actually sells.",
    headerDescription:
      "Apparel, products, digital programmes, subscriptions. We build Shopify stores that look premium and are built to convert.",
    longDescription: [
      "Selling online should be straightforward. But if your store looks like a default Shopify template with stock photos and generic descriptions, your customers are bouncing before they even add something to the cart. Trust is everything in e-commerce, and a cheap-looking store kills it instantly.",
      "We design and build custom Shopify stores that match the quality of your products. From product photography direction to checkout optimisation, every detail is designed to reduce friction and increase conversions. Whether you're selling apparel, products, digital downloads, or programmes.",
      "And we don't just make it look good. We set up the systems that make your life easier. Automated inventory management, subscription billing, abandoned cart recovery, and analytics that actually tell you what's working.",
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
          "Digital products, subscriptions, and automated fulfilment mean you can earn money while you're working, sleeping, or on holiday.",
      },
      {
        title: "A store that grows with you.",
        description:
          "Shopify scales. Whether you're doing 10 orders a month or 10,000, your store handles it. We build for where you're going, not just where you are.",
      },
    ],
    whoIsThisFor: [
      "Businesses selling digital products, programmes, or downloads online",
      "Brands launching a product, supplement, or apparel line",
      "Service providers who want to add a recurring revenue stream",
      "Owners selling memberships, merchandise, or passes online",
    ],
    faqs: [
      {
        question: "Do I need to use Shopify?",
        answer:
          "For e-commerce, Shopify is our top recommendation. It's the most reliable, scalable platform for product-based businesses. But if you have specific needs, we'll recommend what works best for you.",
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
      "You're spending money on Facebook ads, Instagram ads, maybe Google too. The clicks are coming in. But the conversions? Nowhere near what they should be. The problem isn't your ads. It's where you're sending people.",
      "A homepage is not a landing page. Sending paid traffic to a page with a navigation bar, six different CTAs, and your life story is the fastest way to burn your ad budget. A proper landing page has one goal, one message, and one action, and it's designed to make that action feel like a no-brainer.",
      "We build landing pages specifically for paid traffic. Clean design, sharp copy, social proof in the right places, and a conversion path that's been tested across hundreds of campaigns. Your ads bring the traffic. Our pages close the deal.",
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
      "Businesses running Facebook or Instagram ads and not seeing enough conversions",
      "Operators launching a new programme, product, or lead magnet",
      "Anyone currently sending ad traffic to their homepage (stop doing that)",
      "Brands who want to test offers quickly without building a full website",
    ],
    faqs: [
      {
        question: "How fast can you build a landing page?",
        answer:
          "A single landing page can be designed, built, and live within 3-5 business days. If you're in a rush, we can often do faster. Just ask.",
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
  {
    slug: "ai-design",
    title: "AI-Powered Web Design",
    tag: "AI Design",
    headerTitle: "A premium website,",
    headerAccent: "live in weeks not months.",
    headerDescription:
      "AI-powered web design that gets you a premium, enquiry-winning website live in weeks, not months, and for less than a traditional agency charges.",
    longDescription: [
      "Most business owners put off sorting their website because they assume it means six weeks of back-and-forth and an agency-sized invoice at the end of it. So they limp along with a site that's quietly costing them enquiries every week it stays up. It doesn't have to work that way anymore.",
      "We use AI through every stage of how we design and build, so the work that used to take a month takes a couple of weeks. For you, that means a premium, custom website that brings in enquiries, without the long wait or the traditional agency price tag. The speed and the saving are yours. The quality is exactly the same, because a designer is steering every decision the whole way through.",
      "What you actually get is more of your time back and a site that's working for you sooner: a website that loads fast, looks like the best business in your market, ranks on Google, and turns visitors into people booking calls. The AI just means it lands quicker, and costs you less to get there.",
      "And no, it won't look like everyone else's. Every site is built from scratch around your brand. AI helps us reach great ideas faster, it never decides what your business looks like. That's a human call, every time, signed off before anything reaches you.",
    ],
    features: [
      "A premium, custom website built around your brand",
      "Live in weeks, not the usual month-plus wait",
      "Lower cost than a traditional agency build",
      "Loads fast and ranks on Google from day one",
      "Several design directions to choose from, not one take-it-or-leave-it concept",
      "Built to turn visitors into enquiries",
      "AI-accelerated process, human-led creative throughout",
      "Booking and payment integrations included",
    ],
    benefits: [
      {
        title: "Your site, working for you sooner.",
        description:
          "Every week an underperforming site stays up, it's costing you enquiries. We get your new one live in weeks instead of months, so you stop leaving money on the table that much faster.",
      },
      {
        title: "Agency quality, without the agency price.",
        description:
          "Because AI handles the slow, repetitive parts of the build, you're not paying for weeks of manual work. You get the same premium, bespoke result for noticeably less.",
      },
      {
        title: "A site you actually love, not settle for.",
        description:
          "Instead of one concept you have to take or leave, you see several directions early on. You end up with a website that genuinely fits your brand, because you helped choose it.",
      },
    ],
    whoIsThisFor: [
      "Business owners who need a professional website sooner rather than later",
      "Anyone who's been quoted six-plus weeks and a big number by a traditional agency",
      "Operators launching a programme, rebrand, or new business who can't wait around",
      "Businesses that want a premium site without paying premium-agency prices",
    ],
    faqs: [
      {
        question: "What does AI-powered web design actually mean for me?",
        answer:
          "It means we use AI tools through the design and build, generating concepts, drafting layouts, structuring content, and creating images, so the whole thing is faster and cheaper for you. A designer leads the creative the entire way. You get the speed and the saving; we handle the tools.",
      },
      {
        question: "Does using AI mean my website will look generic?",
        answer:
          "No, the opposite. Every site we build is custom to your brand. AI just lets us explore more ideas and reach the best one faster. A designer makes every creative call and signs everything off, so what you end up with is unique to you, never a template.",
      },
      {
        question: "Will it be cheaper than going to a traditional agency?",
        answer:
          "Usually, yes. Because AI takes care of the slow, repetitive parts of the process, we're not billing you for weeks of manual work. You get the same premium result for less, and you get it sooner.",
      },
      {
        question: "Is the quality as good as a fully hand-built site?",
        answer:
          "Identical. AI speeds the process up, it doesn't lower the bar. A human designer steers every decision and checks everything before it reaches you. You're getting a premium, bespoke website, just without the long wait.",
      },
    ],
    ctaHeadline: "Want a premium website live in weeks, not months?",
    ctaSubtext: "Book a free call and we'll show you what we'd build, and how fast you could have it live.",
    relatedProjects: ["Hard to Kill", "Glean App", "Newgen Coaching"],
  },
  {
    slug: "ai-business-support",
    title: "AI for Your Business",
    tag: "AI Support",
    headerTitle: "Put AI to work",
    headerAccent: "inside your business.",
    headerDescription:
      "We set up the right AI tools and automations for how your business actually runs, then support you month to month so they keep saving you time and making you money.",
    longDescription: [
      "Every business owner has heard that AI will change everything. Far fewer know where to start. The tools change every week, half of them are hype, and it is hard to tell what would genuinely help your business from what is just noise. So most people do nothing, or sign up to a tool, get nothing out of it, and quietly give up.",
      "That is the gap we close. We sit down with your business, work out where the repetitive, time-draining jobs really are, and build AI into the places it actually pays off. Lead follow-up that happens instantly. Admin and reporting that runs itself. A chatbot or assistant trained on your business, not a generic bot. Content and proposal workflows that turn a day's work into ten minutes. All set up properly, with your team shown how to use it.",
      "Then we stay with you. AI is not a set-and-forget job. New tools land constantly, prompts need tuning, and what works this quarter gets better the next. Our monthly support keeps your setup sharp, rolls out the tools worth having, and quietly ignores the ones that are not. You get the upside of moving early without having to track any of it yourself.",
      "This is not about replacing your people. It is about taking the boring, repetitive work off their plate so they can do the work that actually grows the business. AI-accelerated where it earns its place, human judgement steering the whole way.",
    ],
    features: [
      "AI opportunity audit of your business",
      "Custom automations for admin, follow-up, leads and reporting",
      "AI chatbot or assistant trained on your business",
      "Content and copy workflows (email, social, proposals)",
      "Tool selection and setup, no wasted subscriptions",
      "Team training so your staff actually use it",
      "Ongoing monitoring, tuning and new-tool rollouts",
    ],
    benefits: [
      {
        title: "Get hours back, every week.",
        description:
          "The repetitive jobs that eat your week (chasing leads, copying data, writing the same emails) get handled automatically. You and your team get that time back for the work that actually pays.",
      },
      {
        title: "Move faster than your competition.",
        description:
          "Most businesses in your space are still doing everything by hand. Set AI up properly and you respond quicker, publish more, and serve clients better, all without hiring.",
      },
      {
        title: "AI that fits you, not a generic bot.",
        description:
          "We build around how your business actually works, trained on your services, your tone, your process. It feels like an extension of your team, because that is exactly how we set it up.",
      },
    ],
    whoIsThisFor: [
      "Owners who keep hearing AI could help but have no idea where to start",
      "Teams buried in repetitive admin, follow-ups, reporting and copy-paste work",
      "Businesses that tried an AI tool, got nothing useful from it, and gave up",
      "Operators who want a partner to keep them ahead as the tools keep changing",
    ],
    faqs: [
      {
        question: "Do I need to be technical to do this?",
        answer:
          "Not at all. That is the whole point of us. We handle the setup, the tools, and the fiddly bits, then show you and your team how to use what we have built in plain English. If you can send an email, you can use what we set up.",
      },
      {
        question: "Will AI replace my staff?",
        answer:
          "No. We are not here to cut your team, we are here to free them up. AI takes the repetitive, low-value tasks so your people spend their time on the work that actually grows the business and that machines cannot do.",
      },
      {
        question: "What kind of things can actually be automated?",
        answer:
          "More than most people expect. Instant lead follow-up, booking and reminder flows, first-draft emails and proposals, social content, data entry and reporting, customer FAQs through a trained chatbot, and internal admin. On the audit we map the jobs in your business worth automating first.",
      },
      {
        question: "Why do I need monthly support after setup?",
        answer:
          "Because AI moves fast. New tools and models land every few weeks, and what we set up gets noticeably better with tuning over time. Monthly support keeps your setup current, rolls out the upgrades worth having, and means you always have someone to call when you want to do more. You can also work with us on setup only if you prefer.",
      },
    ],
    ctaHeadline: "Ready to make AI actually work for your business?",
    ctaSubtext:
      "Book a free call. We'll show you exactly where AI could save you time and money, no jargon.",
    relatedProjects: [],
    subscription: {
      name: "AI On Tap",
      tagline: "Your AI team, on tap every month.",
      intro:
        "Setting it up is the start, not the finish. AI On Tap keeps your automations sharp, your tools current, and your team supported month after month. New tools worth having get rolled in, prompts get tuned, and you always have someone to call when you want to do more. No tracking the hype yourself, no falling behind.",
      cadences: [
        {
          name: "Kickstart",
          detail:
            "A monthly check-in, ongoing tuning of what we have built, and one new automation or workflow each month. Ideal once your core setup is live.",
        },
        {
          name: "Growth",
          detail:
            "Priority support, a rolling pipeline of new automations, and a monthly strategy call to plan where AI moves the needle next.",
        },
        {
          name: "Partner",
          detail:
            "We are embedded in your business. Unlimited tweaks, proactive rollout of new tools as they land, and full team support whenever you need it.",
        },
      ],
      whatYouGet: [
        "Automations",
        "AI chatbots",
        "Content workflows",
        "Team training",
        "Tool audits",
      ],
      process: [
        {
          step: "Audit",
          detail:
            "We map where your time really goes and pinpoint the jobs in your business where AI pays off fastest.",
        },
        {
          step: "Build",
          detail:
            "We set up the tools, automations and assistants around how you actually work, then train your team to run them.",
        },
        {
          step: "Optimise",
          detail:
            "Every month we tune what is live, roll out new tools worth having, and keep you a step ahead.",
        },
      ],
      flexibility:
        "Quiet month and nothing new to build? No problem. Swap your support hours for a deeper team training session, a one-off workflow build, or a fresh AI audit of a different part of your business, so you keep moving even when priorities shift.",
      ctaHref: "/contact",
    },
  },

  // ─────────────────────────── BESPOKE SYSTEMS ───────────────────────────
  // The software side of the business, which had no page until now. The spine
  // of this page is FIT, and it is deliberate: it is the same argument as the
  // 1550 ads. Their software was built for thousands of businesses and not
  // theirs, so they bend the business to fit it and patch the gap with a
  // spreadsheet. That is true of everyone and it excludes nobody.
  //
  // PRICE STAYS OFF THE HOOK. Alex killed the money angle on that campaign in
  // one line: "they still obviously have to pay". Any argument built on cost,
  // or on stopping paying for software, gets rebutted instantly, because we
  // are not free either. Price belongs on the call and in the quote. It does
  // not lead this page.
  //
  // The proof is two systems already published on our own case study pages,
  // both on demonstration data, so nothing new is being exposed here.
  {
    slug: "systems",
    title: "Bespoke Systems & Software",
    metaTitle: "Bespoke Business Software & Custom Systems | AW Media",
    metaDescription:
      "Custom built CRMs, client portals and booking systems for businesses outgrowing off-the-shelf software. Built round how you already work.",
    serviceType: "Custom business software development",
    tag: "Systems",
    headerTitle: "Software built round",
    headerAccent: "how you already work.",
    headerDescription:
      "Most businesses bend themselves to fit their software, then patch the gap with a spreadsheet. We build it the other way round, so the software is the thing that moves.",
    longDescription: [
      "There is a spreadsheet on your computer doing a job your software could not. Everyone has one. Nobody ever calls it a problem, because it works, and because it has been there so long it just looks like how the job gets done. It is the whole problem.",
      "Off-the-shelf software is built for thousands of businesses, and yours was not one of them. So the bits that do not fit get worked round. A stage in your process the system has no box for. A price nobody can work out without opening Excel. The same customer details typed into three places because nothing talks to anything. None of it is dramatic. It quietly costs you a day a week, and nobody notices, because it happened one process at a time.",
      "We build the system that fits instead. One place for the work, built round the process you already have rather than the one a software company assumed you had. It runs in a browser on hosting you already pay for, it works on a phone out on site, and your team picks it up in an afternoon because it does what they already do.",
      "The reason a business your size can have this at all is that we build it AI-accelerated. Not AI written and left alone, but a proper build moving at a fraction of the old pace, with the judgement and the testing still done by people who have to answer for it. That is the difference between a bespoke platform being a realistic option and being a conversation you walk away from.",
    ],
    features: [
      "Job, enquiry and order boards your team drags through stages",
      "Quoting and pricing worked out off your own rate card",
      "Invoicing, statements and pay runs, raised and emailed as PDFs",
      "Customer or client portals with their own secure login",
      "Booking diaries with your hours, capacity, closures and reminders",
      "Staff, driver or engineer apps that install on a phone",
      "Paper forms, checklists and sign-offs made digital",
      "Reporting on the numbers you actually run the business on",
      "Connections to the tools you already pay for, so nothing is typed twice",
    ],
    benefits: [
      {
        title: "The software moves, not your business.",
        description:
          "Your process was worked out over years and it is usually right. We build to it rather than asking you to change it, so there is no stage with nowhere to go and no job that needs a spreadsheet running alongside it.",
      },
      {
        title: "One record, and everybody is on it.",
        description:
          "The enquiry becomes the job, the job becomes the invoice, and the person out on site is looking at the same live record as the office. Nothing gets typed out three times and nothing falls down the gap between the two.",
      },
      {
        title: "The admin half of the week goes away.",
        description:
          "Month end, chasing paperwork, working a price out by hand, copying figures into a spreadsheet to see how you did. That is the work a system takes off you, and it is the reason people build one.",
      },
    ],
    whoIsThisFor: [
      "You are running part of the business off a spreadsheet because the software could not cover it",
      "The same details get typed into three different places and something always gets missed",
      "You are on a system being phased out, or one nobody left in the building knows how to change",
      "You pay per seat, every month, for software you use about a tenth of",
      "You have looked at a bespoke build before and decided it was not realistic",
    ],
    showcase: {
      heading: ["Two we have", "already built."],
      intro:
        "Not mockups. Both of these are live, both replaced something that was holding the business back, and both are written up in full on our work pages. Everything on screen here is demonstration data, not real customers or patients.",
      systems: [
        {
          name: "Dixons Dispatch",
          sector: "ADR Class 7 and NHS courier, Stevenage",
          caseStudy: "/work/dixons-dispatch",
          summary:
            "A family courier firm running four decades of NHS work out of a 32-bit Microsoft Access database that gets switched off at the end of 2026. We replaced it with one platform and three doors: the office, the drivers, and their customers. Quoting, invoicing, driver pay, vehicle checks and proof of delivery all on the same record.",
          shots: [
            {
              src: "/images/projects/dixons-dispatch/crm/crm-1-pipeline.jpg",
              caption:
                "The job board the office works off, dragged through stages. A website enquiry lands here as a live job.",
            },
            {
              src: "/images/projects/dixons-dispatch/crm/crm-2-quote.jpg",
              caption:
                "Pricing a job while the customer is still on the phone, off their own rate card instead of a spreadsheet.",
            },
            {
              src: "/images/projects/dixons-dispatch/crm/crm-5-routes.jpg",
              caption:
                "Two postcodes give the real round-trip mileage, plus any Congestion Charge, ULEZ or toll on that route.",
            },
            {
              src: "/images/projects/dixons-dispatch/crm/crm-3-invoices.jpg",
              caption:
                "Month end in a few clicks. One branded invoice per customer, one statement per driver, emailed with the PDF on.",
            },
            {
              src: "/images/projects/dixons-dispatch/crm/crm-4-checklists.jpg",
              caption:
                "The paper vehicle checks that lived in a folder, now digital, with a defect board behind them.",
            },
            {
              src: "/images/projects/dixons-dispatch/crm/crm-6-reports.jpg",
              caption:
                "The numbers out the back, without anybody rebuilding them in Excel at the end of the month.",
            },
          ],
          note: "Names, registrations and figures shown here are demonstration data, not their live jobs.",
        },
        {
          name: "The Blood Clinic UK",
          sector: "Private blood testing, Sheffield and 65 clinics nationwide",
          caseStudy: "/work/blood-clinic",
          summary:
            "A clinic running on three outsourced plugins and around seven thousand lines of code nobody could safely touch. We rebuilt the lot: the booking engine, the patient portal, the lab connection and the back office the owner runs it from. Just under 200,000 historic results moved across, nine paid plugins retired.",
          shots: [
            {
              src: "/images/projects/blood-clinic/portal/portal-1-snapshot.jpg",
              caption:
                "The health snapshot a patient lands on, instead of a plain lab PDF and a list of numbers.",
            },
            {
              src: "/images/projects/blood-clinic/portal/portal-2-attention.jpg",
              caption:
                "Anything outside its healthy range is brought to the front, so the answer is not buried on page four.",
            },
            {
              src: "/images/projects/blood-clinic/portal/portal-6-allmarkers.jpg",
              caption:
                "Every marker drawn against the range it should sit in, with its history one tap behind it.",
            },
            {
              src: "/images/projects/blood-clinic/portal/portal-7-trend.jpg",
              caption:
                "Whether a marker has actually moved since last time, which is the question people are really asking.",
            },
            {
              src: "/images/projects/blood-clinic/portal/booking-3-calendar.jpg",
              caption:
                "The booking diary. It paints straight away and fetches availability in the background while you choose.",
            },
            {
              src: "/images/projects/blood-clinic/portal/portal-9-guide.jpg",
              caption:
                "A plain-English explanation of what each marker measures, written for the person reading it.",
            },
          ],
          note: "Shown on a test account with demonstration results, not a patient's record.",
        },
      ],
    },
    faqs: [
      {
        question: "How long does a system like this take?",
        answer:
          "It depends what it has to do, but a first working version your team can actually use is usually weeks rather than the many months this used to take. We build in stages, so you are looking at the real thing and telling us what is wrong with it early, instead of signing off a document and finding out six months later that we read it differently.",
      },
      {
        question: "Where does it run, and do I need special hosting?",
        answer:
          "Almost always on the hosting you already have. These are web systems, so your team opens them in a browser like any other site and there is nothing to install on a laptop. Where a phone makes more sense, like a driver or an engineer out on site, it installs to the home screen and works the same way.",
      },
      {
        question: "What happens to everything in my current system?",
        answer:
          "It comes with you. Migrating the old data is part of the job, not an extra, because leaving you running two things at once defeats the point. On the Blood Clinic build that meant just under 200,000 historic results and 1,704 existing bookings moved across before anybody switched over.",
      },
      {
        question: "Can my team actually use it, or will it need training?",
        answer:
          "Because it is built round the process they already follow, most people are up and running the same day. We show the team round it properly, and afterwards you have us on the end of the phone rather than a support ticket queue.",
      },
      {
        question: "Do I own what you build?",
        answer:
          "Yes. It is your system, on your hosting, with your data in it, and that is written into the agreement. You are not renting access to it and you are not tied to us to carry on using it.",
      },
      {
        question: "What does one cost?",
        answer:
          "It is priced per job, because no two are the same shape. What we will not do is guess at it. We have a proper conversation about what the system actually has to handle, then you get a fixed written quote with the scope and the stages in it, so there is nothing to find out later.",
      },
    ],
    ctaHeadline: "Tell us what the spreadsheet is doing.",
    ctaSubtext:
      "A few questions, takes a minute. Tell us where the system falls short and we will come back to you with what we would build and what it would cost.",
    relatedProjects: ["dixons-dispatch", "blood-clinic"],
    formSlug: "systems",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
