export type Lane = "ai" | "bespoke";

export interface PackageVariant {
  price: string;
  priceNumeric: number;
  turnaround: string;
  tagline: string;
  features: string[];
  support: string;
  revisions: string;
}

export interface PackageTier {
  slug: string;
  name: string;
  intro: string;
  ai: PackageVariant;
  bespoke: PackageVariant;
}

export const packages: PackageTier[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    intro:
      "One page, custom designed, built to convert. Pick the lane that fits your timeline and budget.",
    ai: {
      price: "£695",
      priceNumeric: 695,
      turnaround: "5 days",
      tagline: "One bespoke landing page, AI-accelerated, live in 5 days.",
      features: [
        "1 high-converting landing page, custom designed (not templated)",
        "AI-led design exploration, refined by our team",
        "AI-generated copy, lightly edited and on-brand",
        "Mobile-responsive build",
        "Lead capture form + enquiry routing",
        "Basic on-page SEO setup",
      ],
      support: "14 days post-launch support",
      revisions: "1 round of revisions",
    },
    bespoke: {
      price: "£1,200",
      priceNumeric: 1200,
      turnaround: "10 days",
      tagline: "Strategy-led single page, fully custom, 10-day build.",
      features: [
        "1 strategically designed landing page, fully custom",
        "Discovery session before design starts",
        "Human-led design with AI assisting in the background",
        "Human-written copy, refined for conversion",
        "Mobile-responsive build",
        "Lead capture, integrations, analytics setup",
        "Advanced on-page SEO + schema",
      ],
      support: "30 days post-launch support",
      revisions: "2 rounds of revisions",
    },
  },
  {
    slug: "website",
    name: "Website",
    intro:
      "A full marketing site that does the heavy lifting. Either AI-accelerated for speed or fully bespoke for depth.",
    ai: {
      price: "£1,495",
      priceNumeric: 1495,
      turnaround: "2 weeks",
      tagline:
        "Up to 5 pages, AI-accelerated design and build, 2-week turnaround.",
      features: [
        "Up to 5 pages, custom designed (Home, About, Services, Contact + 1)",
        "AI-led design exploration, refined by our team",
        "AI-generated copy, lightly edited",
        "Mobile-responsive build",
        "Contact forms, basic integrations",
        "On-page SEO setup",
        "Google Analytics + Search Console",
      ],
      support: "14 days post-launch support",
      revisions: "1 round of revisions",
    },
    bespoke: {
      price: "£2,500",
      priceNumeric: 2500,
      turnaround: "4 weeks",
      tagline:
        "Up to 8 pages, strategy session, custom design system, 4-week build.",
      features: [
        "Up to 8 pages, fully bespoke (Home, About, Services, Contact + 4 custom)",
        "Strategy session before design begins",
        "Custom design system aligned to brand",
        "Human-led copy with AI assistance",
        "Booking, CRM, payment integrations as needed",
        "Advanced on-page SEO + schema markup",
        "Blog setup (optional)",
      ],
      support: "30 days post-launch support",
      revisions: "2–3 rounds of revisions",
    },
  },
  {
    slug: "online-store",
    name: "Online Store",
    intro:
      "E-commerce that looks premium and is built to convert. Whether you need fast or full-fat, both lanes are made to sell.",
    ai: {
      price: "£2,495",
      priceNumeric: 2495,
      turnaround: "3 weeks",
      tagline:
        "Online store with up to 15 products, AI-accelerated, 3-week turnaround.",
      features: [
        "Up to 5 site pages + product catalogue",
        "Up to 15 products loaded",
        "AI-led design exploration",
        "AI-generated copy + product descriptions",
        "Payment gateway setup (Stripe / PayPal)",
        "Standard shipping + tax configuration",
        "Order confirmation emails",
      ],
      support: "14 days post-launch support",
      revisions: "1 round of revisions",
    },
    bespoke: {
      price: "£3,995",
      priceNumeric: 3995,
      turnaround: "5–6 weeks",
      tagline: "Full e-commerce build, conversion-optimised, 5–6 week build.",
      features: [
        "Everything in Bespoke Website",
        "Up to 25 products loaded",
        "Custom product page templates designed for conversion",
        "Cart + checkout optimisation",
        "Payment gateway, shipping, tax fully configured",
        "Email automations (abandoned cart, order confirmation, follow-ups)",
      ],
      support: "30 days post-launch support",
      revisions: "2–3 rounds of revisions",
    },
  },
];

export interface ComparisonRow {
  label: string;
  ai: string;
  bespoke: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Design approach",
    ai: "AI-led, refined by us",
    bespoke: "Strategy-led, custom from scratch",
  },
  {
    label: "Copywriting",
    ai: "AI-generated, lightly edited",
    bespoke: "Human-written, AI-assisted",
  },
  {
    label: "Strategy session",
    ai: "Brief form only",
    bespoke: "Full discovery session",
  },
  {
    label: "Revisions",
    ai: "1 round",
    bespoke: "2–3 rounds",
  },
  {
    label: "Communication",
    ai: "Email / Loom only",
    bespoke: "Direct access throughout",
  },
  {
    label: "Landing Page turnaround",
    ai: "5 days",
    bespoke: "10 days",
  },
  {
    label: "Website turnaround",
    ai: "2 weeks",
    bespoke: "4 weeks",
  },
  {
    label: "Store turnaround",
    ai: "3 weeks",
    bespoke: "5–6 weeks",
  },
  {
    label: "Post-launch support",
    ai: "14 days",
    bespoke: "30 days",
  },
];

export const pricingFaqs = [
  {
    question: "Why is the AI option cheaper?",
    answer:
      "Because AI lets us move faster on the production side: design exploration, layout, copy drafting. The design quality is still ours. The strategy depth and revision rounds are leaner. That's the trade-off.",
  },
  {
    question: "Is the AI version templated?",
    answer:
      "No. Every AW Media site is custom designed. AI helps us build it faster. It doesn't make it generic.",
  },
  {
    question: "Will my AI website look like everyone else's?",
    answer:
      "No. Your brand, your colours, your assets, your direction. AI just speeds up production. It doesn't decide what your site looks like.",
  },
  {
    question: "Can I upgrade from AI to Bespoke later?",
    answer:
      "Yes. If you start with an AI build and want to upgrade within 6 months, we credit 100% of your AI fee toward the Bespoke version.",
  },
  {
    question: "What if I need something between AI and Bespoke?",
    answer:
      "Talk to us. We can mix elements where it makes sense. For example, a Bespoke design with AI-generated copy, or an AI build with a custom strategy session bolted on.",
  },
  {
    question: "Do you do custom enterprise builds?",
    answer:
      "Yes. Anything beyond Bespoke Store (memberships, complex integrations, multi-language, etc.) is quoted separately. Get in touch.",
  },
];
