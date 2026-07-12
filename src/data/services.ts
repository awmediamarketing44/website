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
  subscription?: {
    name: string;
    tagline: string;
    intro: string;
    cadences: { name: string; detail: string }[];
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
    tag: "Social Media",
    headerTitle: "Content that actually",
    headerAccent: "looks professional.",
    headerDescription:
      "Scroll-stopping graphics and templates so your feed looks consistent, branded, and premium without you spending hours in Canva.",
    longDescription: [
      "You know you need to post consistently. But between running the business, serving clients, and actually living your life, designing social media content falls to the bottom of the list. And when you do get around to it, you're stuck in Canva for three hours making something you'll probably delete anyway.",
      "Your Instagram feed is often the first thing potential clients check before they enquire. If it looks inconsistent, messy, or like every other account in your space, you're losing people before they even read your caption.",
      "We design custom templates and graphics that match your brand, so every post looks like it was made by a design team. Because it was. You get templates you can reuse, custom one-off designs for launches and campaigns, and a feed that finally looks like it belongs to a premium brand.",
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
    ],
    ctaHeadline: "Ready to stop dreading content day?",
    ctaSubtext: "Let's build you a set of templates that makes posting easy.",
    relatedProjects: ["The Mind Architect", "Lumina Stone"],
    subscription: {
      name: "AW-lways On Time",
      tagline: "Your dedicated design slot, every week",
      intro:
        "Don't want to touch the design at all? Our AW-lways On Time subscription gives you a dedicated spot in our schedule. You tell us what's coming up, we design scroll-stopping, on-brand graphics and deliver them like clockwork. No briefs left in your drafts, no Canva, no missed posts.",
      cadences: [
        {
          name: "Weekly",
          detail: "A fresh batch of graphics every single week, perfect for content-heavy brands that need to stay front-of-mind.",
        },
        {
          name: "Fortnightly",
          detail: "On-brand visuals every two weeks. The balance of consistency and flexibility without the overwhelm.",
        },
        {
          name: "Monthly",
          detail: "A tailored batch delivered in one go each month, ideal for planning ahead and staying organised.",
        },
      ],
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
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
