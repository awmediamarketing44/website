export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  heroImage: string;           // Main hero screenshot/mockup
  thumbnailImage: string;      // Grid thumbnail on /work page
  year: string;
  client: {
    name: string;
    industry: string;
    location?: string;
    website?: string;          // Live site URL if public
  };
  brief: string;               // 1-2 sentences: what they came to you for
  challenge: string[];          // Pain points / what wasn't working
  approach: string[];           // How you tackled it
  features: string[];           // Key things you built
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  results?: {                   // Optional metrics
    stats: { value: string; label: string }[];
  };
  gallery: string[];            // Additional screenshots (desktop, mobile, details)
  relatedProjects: string[];    // Slugs of related projects
}

export const projects: ProjectData[] = [
  {
    slug: "hard-to-kill",
    title: "Hard to Kill",
    category: "Web Design",
    tags: ["Next.js", "Animations", "Booking"],
    heroImage: "/images/projects/hard-to-kill/hero.jpg",
    thumbnailImage: "/images/projects/hard-to-kill/thumb.jpg",
    year: "2025",
    client: {
      name: "Hard to Kill Fitness",
      industry: "Fitness Coaching",
      location: "Manchester, UK",
      website: "https://hardtokill.fitness",
    },
    brief:
      "Hard to Kill needed a website that matched the intensity of their brand — dark, bold, and built to convert serious fitness clients who don't mess around.",
    challenge: [
      "Their old site was a basic WordPress template that looked like every other PT in Manchester. Nothing about it said 'premium'.",
      "They were getting traffic from Instagram but losing people the moment they landed on the website. The bounce rate was over 70%.",
      "No booking integration — clients had to DM to book, which meant lost enquiries overnight and on weekends.",
    ],
    approach: [
      "We started with a deep dive into their brand positioning. Hard to Kill isn't your average coaching brand — the name says it all. We designed a dark, aggressive aesthetic with bold typography and sharp animations that match the energy.",
      "Every section was built with conversion in mind. The hero hits hard with a clear value proposition, social proof is front and centre, and the CTA is impossible to miss.",
      "We integrated Calendly directly into the site so clients can book 24/7 without DMing. We also built a transformation gallery with before/after sliders to let the results speak for themselves.",
    ],
    features: [
      "Custom dark-mode design with bold animations",
      "Integrated booking system (Calendly)",
      "Before & after transformation gallery",
      "Mobile-first responsive design",
      "SEO-optimised for local search terms",
      "Fast loading — under 2 second page speed",
    ],
    testimonial: {
      quote: "The website Alex built us is absolutely unreal. We've had more enquiries in the first month than the previous six months combined. People actually take us seriously now.",
      name: "Jordan",
      role: "Founder, Hard to Kill Fitness",
    },
    results: {
      stats: [
        { value: "3x", label: "more monthly enquiries" },
        { value: "45%", label: "lower bounce rate" },
        { value: "1.8s", label: "page load time" },
        { value: "#2", label: "Google ranking for 'PT Manchester'" },
      ],
    },
    gallery: [
      "/images/projects/hard-to-kill/desktop.jpg",
      "/images/projects/hard-to-kill/mobile.jpg",
      "/images/projects/hard-to-kill/detail-1.jpg",
      "/images/projects/hard-to-kill/detail-2.jpg",
    ],
    relatedProjects: ["newgen-coaching", "bridge2fitness"],
  },
  {
    slug: "glean-app",
    title: "Glean App",
    category: "Web Design",
    tags: ["React", "SaaS", "UI/UX"],
    heroImage: "/images/projects/glean-app/hero.jpg",
    thumbnailImage: "/images/projects/glean-app/thumb.jpg",
    year: "2025",
    client: {
      name: "Glean",
      industry: "Fitness Tech / SaaS",
      location: "London, UK",
    },
    brief:
      "Glean needed a landing page for their fitness tracking app that communicated the product's value instantly and drove app downloads.",
    challenge: [
      "The existing page was developer-built with no design direction — functional but forgettable.",
      "Conversion rate on the landing page was under 2%, well below industry average for SaaS.",
      "No clear visual hierarchy — visitors didn't know where to look or what to do next.",
    ],
    approach: [
      "We redesigned the entire landing page with a clear visual story: problem → solution → proof → action. Every scroll moves the visitor closer to downloading.",
      "Interactive demo sections let users see the app in action without leaving the page. We built animated UI mockups that showcase key features.",
      "The design is clean and modern with plenty of white space, letting the product screenshots breathe while keeping the CTAs prominent.",
    ],
    features: [
      "Clean SaaS landing page design",
      "Interactive product demo sections",
      "Animated feature showcases",
      "App Store & Google Play integration",
      "A/B tested hero variations",
      "Analytics and conversion tracking",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/glean-app/desktop.jpg",
      "/images/projects/glean-app/mobile.jpg",
    ],
    relatedProjects: ["hard-to-kill", "pyper-fitness"],
  },
  {
    slug: "lumina-stone",
    title: "Lumina Stone",
    category: "Branding",
    tags: ["Logo", "Brand Guide", "Print"],
    heroImage: "/images/projects/lumina-stone/hero.jpg",
    thumbnailImage: "/images/projects/lumina-stone/thumb.jpg",
    year: "2024",
    client: {
      name: "Lumina Stone",
      industry: "Construction / Stone Masonry",
      location: "Sheffield, UK",
    },
    brief:
      "Complete brand identity for a premium stone masonry company that needed to look as solid and refined as the work they produce.",
    challenge: [
      "No existing brand identity — just a name and word-of-mouth reputation.",
      "Competing against established companies with decades of brand recognition.",
      "Needed to appeal to both commercial developers and high-end residential clients.",
    ],
    approach: [
      "We researched the premium construction and masonry space to understand what visual language communicates trust and quality in this industry.",
      "The brand direction leans into clean, architectural aesthetics — strong geometric shapes, a refined colour palette, and typography that feels built to last.",
      "We delivered a complete brand system: primary logo with variations, colour palette, typography scale, brand guidelines, business cards, vehicle livery, and social templates.",
    ],
    features: [
      "Primary logo + icon + wordmark variations",
      "Complete colour palette & typography system",
      "Brand guidelines document (40+ pages)",
      "Business card & letterhead design",
      "Vehicle livery design",
      "Social media template pack",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/lumina-stone/logo.jpg",
      "/images/projects/lumina-stone/guidelines.jpg",
      "/images/projects/lumina-stone/mockup.jpg",
    ],
    relatedProjects: ["the-mind-architect"],
  },
  {
    slug: "newgen-coaching",
    title: "Newgen Coaching",
    category: "Web Design",
    tags: ["WordPress", "Portal", "Payments"],
    heroImage: "/images/projects/newgen-coaching/hero.jpg",
    thumbnailImage: "/images/projects/newgen-coaching/thumb.jpg",
    year: "2024",
    client: {
      name: "Newgen Coaching",
      industry: "Online Fitness Coaching",
      location: "Birmingham, UK",
    },
    brief:
      "Newgen needed a coaching platform with client portal, programme delivery, and integrated payments — not just a brochure site.",
    challenge: [
      "Managing clients through spreadsheets and WhatsApp groups — no centralised system.",
      "No way for clients to access programmes, track progress, or make payments through the website.",
      "The brand looked inconsistent — different styles across Instagram, website, and client materials.",
    ],
    approach: [
      "We built a full coaching platform, not just a website. Clients log in, access their programmes, track workouts, and manage their subscription — all from one place.",
      "Payment integration with Stripe means recurring billing is automatic. No more chasing invoices.",
      "The design unifies the brand across every touchpoint, from the public-facing marketing site to the private client portal.",
    ],
    features: [
      "Client login portal with programme delivery",
      "Stripe payment & subscription integration",
      "Workout tracking and progress dashboard",
      "Video library with categorised content",
      "Automated onboarding email sequence",
      "Fully branded client experience",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/newgen-coaching/desktop.jpg",
      "/images/projects/newgen-coaching/portal.jpg",
      "/images/projects/newgen-coaching/mobile.jpg",
    ],
    relatedProjects: ["hard-to-kill", "bridge2fitness"],
  },
  {
    slug: "bridge2fitness",
    title: "Bridge2Fitness",
    category: "Web Design",
    tags: ["Booking", "Timetable", "SEO"],
    heroImage: "/images/projects/bridge2fitness/hero.jpg",
    thumbnailImage: "/images/projects/bridge2fitness/thumb.jpg",
    year: "2024",
    client: {
      name: "Bridge2Fitness",
      industry: "Personal Training",
      location: "Leeds, UK",
    },
    brief:
      "A personal training website with online booking, class timetables, and a testimonial system that builds trust with new visitors.",
    challenge: [
      "Existing Wix site looked generic and didn't reflect the quality of coaching on offer.",
      "Clients couldn't book sessions online — everything was done over the phone or in person.",
      "Zero Google visibility — not ranking for any local search terms despite being established for years.",
    ],
    approach: [
      "We designed a clean, energetic site that immediately communicates professionalism and results.",
      "Integrated an online booking system with a live class timetable so clients can see availability and book instantly.",
      "Built with local SEO from day one — optimised for 'personal trainer Leeds' and related terms with proper schema markup.",
    ],
    features: [
      "Online booking with live availability",
      "Interactive class timetable",
      "Client testimonial carousel",
      "Local SEO optimisation",
      "Google Business Profile integration",
      "Mobile-first design",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/bridge2fitness/desktop.jpg",
      "/images/projects/bridge2fitness/mobile.jpg",
    ],
    relatedProjects: ["hard-to-kill", "newgen-coaching"],
  },
  {
    slug: "pyper-fitness",
    title: "Pyper Fitness",
    category: "Landing Page",
    tags: ["Conversion", "Ads", "Copywriting"],
    heroImage: "/images/projects/pyper-fitness/hero.jpg",
    thumbnailImage: "/images/projects/pyper-fitness/thumb.jpg",
    year: "2025",
    client: {
      name: "Pyper Fitness",
      industry: "Online Coaching",
      location: "Sheffield, UK",
    },
    brief:
      "A high-converting landing page for 1:1 online coaching, optimised specifically for Facebook and Instagram ad traffic.",
    challenge: [
      "Running ads to the homepage — low conversion rate, high cost per lead.",
      "No dedicated landing page for the coaching offer — visitors were overwhelmed with options.",
      "Ad spend was being wasted on clicks that never converted.",
    ],
    approach: [
      "We built a single-focus landing page with one goal: get the visitor to book a call. No navigation, no distractions.",
      "Sharp, conversion-focused copy that speaks directly to the target audience's pain points.",
      "Social proof placed strategically — testimonials, transformation photos, and trust badges exactly where hesitation typically happens.",
    ],
    features: [
      "Single-goal landing page design",
      "Conversion-optimised copy",
      "Facebook Pixel & tracking setup",
      "A/B tested headline variations",
      "Lead capture form with auto-response",
      "Mobile-optimised for ad traffic",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/pyper-fitness/desktop.jpg",
      "/images/projects/pyper-fitness/mobile.jpg",
    ],
    relatedProjects: ["hard-to-kill", "glean-app"],
  },
  {
    slug: "the-mind-architect",
    title: "The Mind Architect",
    category: "Branding",
    tags: ["Logo", "Social Templates", "Strategy"],
    heroImage: "/images/projects/the-mind-architect/hero.jpg",
    thumbnailImage: "/images/projects/the-mind-architect/thumb.jpg",
    year: "2024",
    client: {
      name: "The Mind Architect",
      industry: "Behavioural Performance Coaching",
      location: "London, UK",
    },
    brief:
      "Brand identity for a behavioural performance coach who needed a minimal, premium positioning that stood apart from the typical 'mindset coach' aesthetic.",
    challenge: [
      "The mindset/performance coaching space is saturated with generic branding — motivational quotes on sunset backgrounds.",
      "Needed to attract high-ticket corporate and executive clients, not just general consumers.",
      "No existing brand assets — starting completely from scratch.",
    ],
    approach: [
      "We went minimal and architectural — clean lines, structured layouts, and a restrained colour palette that whispers premium rather than shouting it.",
      "The logo concept plays on the idea of 'architecture of the mind' — geometric, precise, and memorable.",
      "Social templates were designed for LinkedIn and Instagram, tailored to the kind of content that resonates with executive audiences.",
    ],
    features: [
      "Minimal premium logo design",
      "Geometric brand system",
      "LinkedIn & Instagram templates",
      "Brand positioning strategy",
      "Typography & colour system",
      "Social media content guidelines",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/the-mind-architect/logo.jpg",
      "/images/projects/the-mind-architect/social.jpg",
    ],
    relatedProjects: ["lumina-stone"],
  },
  {
    slug: "fitgear-store",
    title: "FitGear Store",
    category: "Shopify",
    tags: ["Shopify", "E-commerce", "Subscriptions"],
    heroImage: "/images/projects/fitgear-store/hero.jpg",
    thumbnailImage: "/images/projects/fitgear-store/thumb.jpg",
    year: "2025",
    client: {
      name: "FitGear",
      industry: "Fitness E-commerce",
      location: "UK-wide",
    },
    brief:
      "An e-commerce store for fitness equipment and supplements with a subscription model for recurring supplement orders.",
    challenge: [
      "Previous WooCommerce store was slow, buggy, and losing sales to checkout abandonment.",
      "No subscription option — missing out on recurring revenue from supplement customers.",
      "Product pages were basic with poor photography and no reviews.",
    ],
    approach: [
      "Migrated to Shopify for reliability and scalability. Custom theme designed to showcase products with high-quality imagery and detailed descriptions.",
      "Set up subscription billing for supplements with flexible delivery schedules — customers can pause, skip, or cancel anytime.",
      "Optimised the checkout flow to reduce abandonment: fewer steps, guest checkout, multiple payment options, and abandoned cart recovery emails.",
    ],
    features: [
      "Custom Shopify theme design",
      "Subscription billing integration",
      "Abandoned cart recovery",
      "Product review system",
      "Optimised checkout flow",
      "Inventory management setup",
    ],
    testimonial: undefined,
    results: undefined,
    gallery: [
      "/images/projects/fitgear-store/desktop.jpg",
      "/images/projects/fitgear-store/product.jpg",
      "/images/projects/fitgear-store/mobile.jpg",
    ],
    relatedProjects: ["hard-to-kill", "pyper-fitness"],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}
