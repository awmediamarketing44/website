export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  heroImage: string;           // Main hero screenshot/mockup
  thumbnailImage: string;      // Grid thumbnail on /work page
  hasImages?: boolean;         // true once real screenshots exist in /public; false = render gradient placeholder
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
  graphics?: string[];          // Optional social/graphic deliverables (IG carousel covers, ads, etc.)
  relatedProjects: string[];    // Slugs of related projects
}

// ============================================================================
// WEB DESIGN & BUILD + AI-POWERED WEBSITES
// ============================================================================

const webProjects: ProjectData[] = [
  {
    slug: "wlwt-coaching",
    title: "Weight Loss With Tarn",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "Hosting", "SSL"],
    heroImage: "/images/projects/wlwt-coaching/hero.jpg",
    thumbnailImage: "/images/projects/wlwt-coaching/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Tarn Kaur / Weight Loss With Tarn",
      industry: "Online Weight Loss Coaching",
      location: "UK",
      website: "https://wlwtcoaching.com/",
    },
    brief:
      "Tarn Kaur went from corporate lawyer to fat-loss coach — 127k followers, 1,500+ transformations, helping busy women lose 10–40kg and keep it off. She came to us for a landing page, but the business was scaling fast and one page was never going to be enough.",
    challenge: [
      "A single landing page wouldn't keep up with a business growing this quickly — it needed room to scale.",
      "High-profile coach with a huge audience: the site had to convert enquiries while matching the brand's energy.",
      "Foundations had to be built properly so future pages could be added without a rebuild.",
    ],
    approach: [
      "Started with the landing page, but architected it as the first page of a full multi-page website from day one.",
      "Custom designed and custom built — bold, on-brand, conversion-focused, with hosting, SSL and security all sorted.",
      "Because the foundation was right, scaling from one page to a full site was straightforward. No starting over, no rebuild — just building on what was already there.",
    ],
    features: [
      "Custom multi-page website",
      "Conversion-focused landing page",
      "Bespoke design + build",
      "Hosting, SSL + security",
      "Built to scale with the business",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote:
        "Just wanted to say a huge thank you to you and the whole AW Media team for absolutely smashing the design and development of my website. Honestly from start to finish you've all been incredible to work with. Professional, patient, creative and genuinely invested in bringing my vision to life properly. It never felt like “just another project” and that really shows in the final result. The attention to detail, communication, speed and overall experience has been unreal. Nothing was ever too much and you made the whole process feel easy, even when I had a million ideas and changes flying around. I'm genuinely so happy with how everything has come together. Couldn't recommend AW Media enough!",
      name: "Tarn Kaur",
      role: "Weight Loss With Tarn",
    },
    gallery: [
      "/images/projects/wlwt-coaching/desktop.jpg",
      "/images/projects/wlwt-coaching/mobile.jpg",
      "/images/projects/wlwt-coaching/desktop-full.jpg",
    ],
    relatedProjects: ["sensory-emergency", "thecoachconsultant"],
  },

  {
    slug: "sensory-emergency",
    title: "Sensory Emergency",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "Hosting", "Good Cause"],
    heroImage: "/images/projects/sensory-emergency/hero.jpg",
    thumbnailImage: "/images/projects/sensory-emergency/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Wade / Sensory Emergency",
      industry: "Mobile Sensory Support (SEND)",
      location: "Sheffield, UK",
      website: "https://sensoryemergency.co.uk/",
    },
    brief:
      "Wade runs Sensory Emergency — a mobile sensory support service bringing calm to Sheffield's SEND children at events, parties and big days out. The Sensory Ambulance is a converted medical vehicle turned into a safe, controlled space where children can re-centre when the world gets overwhelming.",
    challenge: [
      "A genuinely good cause that needed a website to grow the business and reach more families who need it.",
      "The site had to communicate a sensitive, specialist service with warmth and clarity.",
      "Bookings needed to be easy to find and act on, with room to scale as demand grows.",
    ],
    approach: [
      "Custom website design and build, shaped around the mission and the families it serves.",
      "Hosting, security and SSL all handled, plus support on how to use bookings effectively.",
      "A site built for growth — reaching more families and growing the service sustainably.",
    ],
    features: [
      "Custom website design + build",
      "Hosting, security + SSL",
      "Booking-focused structure",
      "Built for growth",
      "Mobile-first responsive",
      "Cause-led design",
    ],
    testimonial: {
      quote:
        "Alex and his team are absolutely wizards of the game. Not only do they bring the vision to life through your website, they are really supportive, honest and reliable. They are happy to discuss your ideas and give advice from their experience and expertise to make sure you don't spend unnecessarily and get the best from your site. Alex and Paul who helped me with mine also did so off their own back to help us in our mission to help children with additional needs. I can't thank them enough or give the praise they truly deserve. I will always send people this way. Here's to a long working relationship.",
      name: "Wade",
      role: "Sensory Emergency",
    },
    gallery: [
      "/images/projects/sensory-emergency/desktop.jpg",
      "/images/projects/sensory-emergency/mobile.jpg",
      "/images/projects/sensory-emergency/desktop-full.jpg",
    ],
    relatedProjects: ["wlwt-coaching", "thecoachconsultant"],
  },

  {
    slug: "team-procoach",
    title: "Team Procoach",
    category: "Web Design & Build",
    tags: ["Website", "Landing Pages", "Social Graphics", "Ongoing"],
    heroImage: "/images/projects/team-procoach/hero.jpg",
    thumbnailImage: "/images/projects/team-procoach/thumb.jpg",
    hasImages: true,
    year: "2025 / Ongoing",
    client: {
      name: "Team Procoach",
      industry: "Comp Prep & Physique Coaching",
      location: "UK",
      website: "https://teamprocoach.com/",
    },
    brief:
      "Team Procoach is the UK's leading comp prep and physique coaching team. We rebuilt their website from the ground up, layered in dedicated lead generation pages, and run a weekly social graphics pack that keeps the brand sharp across every launch and content drop.",
    challenge: [
      "Their previous site looked like every other coaching brand in the space. For a team carrying 8 IFBB Pro Cards, 430+ first-place finishes, and Olympia qualifications, it didn't reflect the level.",
      "Comp prep and physique coaching are two very different services with two very different buyers. They needed clear, separate paths into each offer without splitting the brand in half.",
      "Content output is constant: new launches, athlete wins, education resources, social posts. Without a system, every week was a scramble and the visuals drifted off-brand.",
    ],
    approach: [
      "We started with positioning. Team Procoach isn't a coach, it's a roster. Champions, pros, and prep specialists under one banner. We built the site around that idea: bold, dark, IFBB-grade, with the trophy count up top so visitors get the credibility hit in the first three seconds.",
      "The homepage gives a single clear message and two CTAs: Comp Prep Enquiry and Physique Enquiry. Each one drops into a dedicated lead generation landing page tailored to that specific buyer, with the right proof, the right copy, and the right next step.",
      "On the content side we run an ongoing graphics retainer: launches, athlete features, education carousels, and weekly social posts. Every asset is on-brand, properly designed, and shipped fast enough to keep up with the team's output.",
    ],
    features: [
      "Full website rebuild on a custom on-brand design system",
      "Dedicated Comp Prep + Physique lead generation landing pages",
      "Trophy strip + credibility-first hero (430 x 1st, 758 x top 3, 102 x overalls)",
      "Athlete roster, coach intros, eBook funnel, YouTube integration",
      "Weekly social graphics pack (launches, education, athlete features)",
      "Ongoing creative direction across web + social",
    ],
    testimonial: {
      quote:
        "Working with AW Media has allowed us to effectively build brand awareness, presenting our latest launches, education resources and social posts in the best possible way. He brings creative input throughout. We will forever be a long term client. The delivery is exceptional.",
      name: "Team Procoach",
      role: "Comp Prep + Physique Coaching, UK",
    },
    gallery: [
      "/images/projects/team-procoach/desktop.jpg",
      "/images/projects/team-procoach/mobile.jpg",
      "/images/projects/team-procoach/desktop-full.jpg",
    ],
    graphics: [
      "/images/projects/team-procoach/graphics/post-1-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-2-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-3-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-1-slide-03.jpg",
      "/images/projects/team-procoach/graphics/post-2-slide-04.jpg",
      "/images/projects/team-procoach/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["thecoachconsultant", "strength-in-us"],
  },

  {
    slug: "thecoachconsultant",
    title: "The Coach Consultant",
    category: "Web Design & Build",
    tags: ["Website", "Bespoke Design", "Hosting", "SSL"],
    heroImage: "/images/projects/thecoachconsultant/hero.jpg",
    thumbnailImage: "/images/projects/thecoachconsultant/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "The Coach Consultant",
      industry: "Coaching Consultancy",
      location: "UK",
      website: "https://thecoachconsultant.uk/",
    },
    testimonial: {
      quote: "I've worked with Alex for 10 years now. Why would I work with the same guy for 10 years? You run it on performance, reliability, deliverability. Websites, funnels, graphic designs, socials - never missed. He does not care about you going back 25 times as long as it's done right. You'll have the same type of reliability, consistency, and performance that I've had for the last decade of my career and the next decade to come.",
      name: "The Coach Consultant",
      role: "Client of 10 years",
    },
    brief:
      "Bespoke website build for a coaching consultancy that needed a site to set the visual tone for the entire business. A full custom design system, hosting, SSL, and ongoing support shipped together.",
    challenge: [
      "No existing brand assets to work from. The site had to define the visual identity and set the tone for the whole business.",
      "The launch was tied to a wider campaign, so the build had to stay tight to schedule without cutting corners on design.",
      "Needed full hosting, SSL, and ongoing support baked in. They didn't want to manage tech stacks across multiple providers.",
    ],
    approach: [
      "We ran a focused discovery, locked the design direction early, and built a fully bespoke, custom-designed site around their brand. No templates, no shortcuts.",
      "We handled hosting, SSL, and domain setup as part of the package. One bill, one point of contact, zero friction.",
      "The result: a considered, premium site that makes a brand-new consultancy look established and credible from day one.",
    ],
    features: [
      "Fully bespoke, custom design (no templates)",
      "Brand-defining visual direction",
      "Hosting and SSL included",
      "Conversion-focused structure",
      "Mobile-first responsive build",
      "Ongoing support baked in",
    ],
    gallery: [
      "/images/projects/thecoachconsultant/desktop.jpg",
      "/images/projects/thecoachconsultant/mobile.jpg",
      "/images/projects/thecoachconsultant/desktop-full.jpg",
    ],
    relatedProjects: ["kensington-scott", "dan-reeve"],
  },

  {
    slug: "hotchen-construction",
    title: "Hotchen Construction",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/hotchen-construction/hero.jpg",
    thumbnailImage: "/images/projects/hotchen-construction/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Hotchen Construction",
      industry: "Construction",
      location: "UK",
      website: "https://hotchenconstruction.com/",
    },
    brief:
      "Full website rebuild plus email and hosting migration for a construction firm that needed their digital presence to match the quality of their builds.",
    challenge: [
      "Existing site was hosted elsewhere with email tied to it. Any rebuild had to handle a clean transfer with zero downtime on mail.",
      "Construction marketing tends to fall into two camps: generic stock photos, or DIY photos that look amateur. They needed something better.",
      "Needed a CMS the team could actually use to update content themselves after launch.",
    ],
    approach: [
      "We migrated email and hosting cleanly across to a managed setup, then rebuilt the site bespoke in WordPress with a custom design system tailored to the brand.",
      "Big, confident photography of real work, clear service breakdowns, and trust signals throughout. The site reads like a portfolio of the build quality.",
      "WordPress gives them full control post-launch. Add a new project, swap out a hero image, post a testimonial. No developer needed.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Email and hosting transfer with zero downtime",
      "Project portfolio CMS",
      "Service breakdown pages",
      "Local SEO optimisation",
      "Self-service editing for the team",
    ],
    gallery: [
      "/images/projects/hotchen-construction/desktop.jpg",
      "/images/projects/hotchen-construction/mobile.jpg",
      "/images/projects/hotchen-construction/desktop-full.jpg",
    ],
    relatedProjects: ["nick-firth-tiles", "crown-labels"],
  },

  {
    slug: "nick-firth-tiles",
    title: "Nick Firth Tiles",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "E-commerce Roadmap"],
    heroImage: "/images/projects/nick-firth-tiles/hero.jpg",
    thumbnailImage: "/images/projects/nick-firth-tiles/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Nick Firth Tiles",
      industry: "Tiles & Stone",
      location: "UK",
      website: "https://nickfirthtiles.com/",
    },
    brief:
      "Bespoke design and WordPress build for a UK tile specialist, structured from day one to scale into a full online store.",
    challenge: [
      "Highly visual product, weak existing presentation. The tiles deserved a site that could do them justice.",
      "Customers shop for tiles by colour, finish, and use case. The architecture had to support discovery, not bury products in menus.",
      "Long-term plan is full e-commerce. The site needed to launch as a brochure but scale cleanly into a shop.",
    ],
    approach: [
      "We designed a clean, gallery-led brochure site that puts product photography front and centre. Colour stories, room mockups, and category browsing all built in.",
      "WooCommerce-ready structure under the hood, so the upgrade to online sales is a switch-on, not a rebuild.",
      "Clear enquiry funnels for trade and retail buyers, with separate journeys mapped for each.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Gallery-led product showcase",
      "Trade + retail enquiry routing",
      "E-commerce architecture under the hood",
      "Mobile-first responsive layouts",
      "Scalable category structure",
    ],
    testimonial: {
      quote: "A website to be proud of. Alex really understood the brief and delivered a fantastic website. At Nick Firth Tiles we're all really proud of our new website. It's been up for one week and we've had some great feedback, it has already started to generate sales. Communication was good throughout the process. I would highly recommend.",
      name: "Scott",
      role: "Nick Firth Tiles",
    },
    gallery: [
      "/images/projects/nick-firth-tiles/desktop.jpg",
      "/images/projects/nick-firth-tiles/mobile.jpg",
      "/images/projects/nick-firth-tiles/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "crown-labels",
    title: "Crown Labels",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/crown-labels/hero.jpg",
    thumbnailImage: "/images/projects/crown-labels/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Crown Labels",
      industry: "Print & Labels",
      location: "UK",
      website: "https://crownlabels.co.uk/",
    },
    brief:
      "Hosting transfer plus a full bespoke WordPress rebuild for a UK label printer that needed a B2B presence as sharp as the work they produce.",
    challenge: [
      "Old site was hosted with a provider that couldn't keep up. Slow load, frequent issues, no flexibility.",
      "Industrial B2B sites often look dated by default. They wanted something modern that still felt credible to procurement buyers.",
      "Wide product range across labels, packaging, and print services. The structure had to make finding the right product fast.",
    ],
    approach: [
      "Migrated hosting to a managed setup with better performance and uptime. Then built the site bespoke in WordPress with a clean, modern industrial aesthetic.",
      "Product taxonomy designed around how buyers actually search: by material, application, and finish. Not by internal departments.",
      "Strong proof throughout: case studies, certifications, and machinery on display. The site sells the capability before the sales call.",
    ],
    features: [
      "Hosting migration + bespoke WordPress build",
      "Industrial-modern visual language",
      "Buyer-led product taxonomy",
      "Capability showcase + machinery gallery",
      "Quote request system",
      "Optimised for procurement buyer journeys",
    ],
    gallery: [
      "/images/projects/crown-labels/desktop.jpg",
      "/images/projects/crown-labels/mobile.jpg",
      "/images/projects/crown-labels/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "nick-firth-tiles"],
  },

  {
    slug: "body-lab",
    title: "The Body Lab",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/body-lab/hero.jpg",
    thumbnailImage: "/images/projects/body-lab/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "The Body Lab",
      industry: "Personal Training Studio",
      location: "Wiltshire, UK",
      website: "https://thebodylabwiltshire.co.uk/",
    },
    brief:
      "Hosting transfer plus a bespoke WordPress build for a Wiltshire PT studio that needed to stand out from the cookie-cutter gym website crowd.",
    challenge: [
      "Existing setup was on hosting that didn't scale. They needed reliability and speed before any redesign would land properly.",
      "Local fitness market is crowded. Most gym sites look the same. Theirs had to instantly read 'this is different'.",
      "Multiple offers (1:1 PT, group classes, body composition) that all needed clear paths without bloating the site.",
    ],
    approach: [
      "Hosting transferred clean. Then we rebuilt the site bespoke in WordPress with a confident, premium aesthetic that matches the experience inside the studio.",
      "Each service has its own dedicated section with proof, pricing, and a clear booking next step. No buried offers, no ambiguity.",
      "Local SEO baked in from day one. Schema, Google Business Profile integration, and proper structured data for Wiltshire searches.",
    ],
    features: [
      "Hosting transfer + bespoke WordPress build",
      "Premium studio-led visual design",
      "Multiple service paths (PT, classes, body comp)",
      "Booking + enquiry integrations",
      "Local SEO + schema markup",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote: "Absolutely amazing. Alex and Paul were really patient and understanding when I was trying to figure out exactly what I wanted, nothing felt like it was too much trouble. They really care about making sure you feel happy with the end result. I love the new website, it's far exceeded my expectations. I can't recommend AW Media highly enough.",
      name: "The Body Lab",
      role: "Personal Training Studio, Wiltshire",
    },
    gallery: [
      "/images/projects/body-lab/desktop.jpg",
      "/images/projects/body-lab/mobile.jpg",
      "/images/projects/body-lab/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "drug-free-bodybuilding"],
  },

  {
    slug: "quickfit-ev",
    title: "QuickFit EV",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Booking"],
    heroImage: "/images/projects/quickfit-ev/hero.jpg",
    thumbnailImage: "/images/projects/quickfit-ev/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "QuickFit EV",
      industry: "EV Charger Installation",
      location: "UK",
      website: "https://quickfitev.co.uk/",
    },
    testimonial: {
      quote: "I've worked with Alex and AW Media on a few different businesses and can't recommend them enough. Nothing's too much trouble and everything gets sorted. This project was an online shop to make the EV charger journey as simple as possible and Alex and the team have gone above and beyond.",
      name: "Ollie",
      role: "QuickFit EV",
    },
    brief:
      "Bespoke WordPress build for an EV charger installation company entering a fast-growing market that needed a website to match the moment.",
    challenge: [
      "EV charging is exploding. Half the competition still has 2018-era websites. They needed to look like the modern operator they are.",
      "Lead quality matters more than volume. The site had to qualify enquiries upfront: domestic vs. commercial, charger type, install location.",
      "Trust matters. EV install is a £1k+ purchase. Visitors needed clear proof of certifications, warranties, and recent work.",
    ],
    approach: [
      "Clean, modern, tech-forward design language. Strong photography of installs, real engineers, real homes and businesses.",
      "Built a smart enquiry flow that pre-qualifies leads before they land in the inbox. Less time chasing tyre-kickers, more time converting real buyers.",
      "Trust signals layered throughout: OZEV approval, electrician certifications, manufacturer partnerships, recent install gallery.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Smart lead qualification form",
      "Domestic + commercial install paths",
      "Certification + trust signal layout",
      "Install gallery CMS",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/quickfit-ev/desktop.jpg",
      "/images/projects/quickfit-ev/mobile.jpg",
      "/images/projects/quickfit-ev/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "drug-free-bodybuilding",
    title: "Drug Free Bodybuilding",
    category: "Web Design & Build",
    tags: ["WordPress", "WooCommerce", "E-commerce", "Bespoke Design"],
    heroImage: "/images/projects/drug-free-bodybuilding/hero.jpg",
    thumbnailImage: "/images/projects/drug-free-bodybuilding/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Drug Free Bodybuilding",
      industry: "Federation / Events / Merch",
      location: "UK",
      website: "https://drugfreebodybuilding.co.uk/",
    },
    brief:
      "Bespoke design plus a full WordPress + WooCommerce build for a UK natural bodybuilding federation running events, memberships, and a merchandise store.",
    challenge: [
      "Old site was hard to update, slow, and split across multiple platforms for events, memberships, and the shop. Three separate logins, three sources of truth.",
      "Visual identity needed a step up. For a federation building serious credibility against PED-tested rivals, the site had to look the part.",
      "E-commerce had to handle events, memberships, AND physical merch in one consistent checkout.",
    ],
    approach: [
      "Bespoke design rebuild with a strong, confident visual identity. Black, gold, and championship-grade typography.",
      "WordPress + WooCommerce unified the entire stack: event ticketing, athlete memberships, and merchandise all run through one cart and one customer database.",
      "Athlete profile system so competitors can register, build a public profile, and track event history. The federation's data lives in one place now.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "WooCommerce unified for events + memberships + merch",
      "Athlete profile and registration system",
      "Event ticketing and management",
      "Merch storefront with size variants",
      "Member-only content gating",
    ],
    testimonial: {
      quote: "Absolutely outstanding work from Alex on the UKDFBA website. The design is clean, modern and professional, while perfectly capturing the brand and vision of the federation. Communication was excellent throughout, changes were handled quickly, and the final result exceeded expectations. Highly recommend him to anyone looking for a top-level, high-performance website. Looking forward to continuing working alongside Alex going forwards.",
      name: "Christian James",
      role: "UKDFBA",
    },
    gallery: [
      "/images/projects/drug-free-bodybuilding/desktop.jpg",
      "/images/projects/drug-free-bodybuilding/mobile.jpg",
      "/images/projects/drug-free-bodybuilding/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "body-lab"],
  },

  {
    slug: "complete-dentist-academy",
    title: "Complete Dentist Academy",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Education"],
    heroImage: "/images/projects/complete-dentist-academy/hero.jpg",
    thumbnailImage: "/images/projects/complete-dentist-academy/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Complete Dentist Academy",
      industry: "Dental Education",
      location: "UK",
      website: "https://completedentistacademy.com/",
    },
    brief:
      "Bespoke WordPress build for a premium dental education academy that needed a site as polished as the courses it delivers.",
    challenge: [
      "Dental education is a high-trust, high-ticket space. The site had to communicate authority instantly.",
      "Multiple course tiers and CPD paths that needed clear structure without overwhelming the visitor.",
      "Mixed buyer audience: independent dentists, practice owners, and corporates with different motivations.",
    ],
    approach: [
      "Refined, editorial-led design language. Plenty of breathing room, premium typography, considered photography.",
      "Built each course as its own landing experience with clear outcomes, credentials, and enrolment paths.",
      "Faculty profiles, alumni features, and case studies layered throughout to back up the authority claim.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Modular course landing pages",
      "Faculty + alumni showcase",
      "CPD path structuring",
      "Enrolment + waitlist forms",
      "Editorial blog layout",
    ],
    gallery: [
      "/images/projects/complete-dentist-academy/desktop.jpg",
      "/images/projects/complete-dentist-academy/mobile.jpg",
      "/images/projects/complete-dentist-academy/desktop-full.jpg",
    ],
    relatedProjects: ["br-accountancy", "thecoachconsultant"],
  },

  {
    slug: "br-accountancy",
    title: "BR Accountancy",
    category: "Web Design & Build",
    tags: ["Logo Design", "WordPress", "Bespoke Design"],
    heroImage: "/images/projects/br-accountancy/hero.jpg",
    thumbnailImage: "/images/projects/br-accountancy/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "BR Accountancy",
      industry: "Accountancy",
      location: "UK",
      website: "https://braccountancy.co.uk/",
    },
    testimonial: {
      quote: "I used AW for a new logo and brand pack a couple of years ago and was really happy with it. My website was due a refresh, so I went back to them for their same service and style recently, and they didn't disappoint. My new site went live today and I love it! The team have been really helpful from start to finish, really clear on the timelines, and provided easy to use google docs for me to upload everything they need. I basically told them my vision and they made it happen. Thank you!",
      name: "BR Accountancy",
      role: "Sheffield Accountants",
    },
    brief:
      "Full brand-and-build for an accountancy firm: logo design, bespoke website, and WordPress implementation, all developed end to end.",
    challenge: [
      "Starting from scratch. No logo, no brand assets, no website. The brand needed to be designed before the site could even start.",
      "Accountancy is a trust business. Visitors need to feel reassured before they pick up the phone. The visual language had to do heavy lifting.",
      "Mixed client base (sole traders, SMEs, limited companies) with different needs and expectations.",
    ],
    approach: [
      "Logo design phase first. Clean, professional, instantly readable. The kind of mark that sits well on a letterhead, business card, and digital alike.",
      "Then the site: bespoke WordPress build with a confident, trustworthy aesthetic. Service breakdowns clearly mapped to client types.",
      "Onboarding made simple: clear next steps, transparent pricing where appropriate, and quick-contact options for every page.",
    ],
    features: [
      "Logo design + brand identity",
      "Bespoke WordPress website build",
      "Service-by-client-type structuring",
      "Resource hub + tax calendar",
      "Quote request + onboarding flow",
      "Trust + accreditation signal layout",
    ],
    gallery: [
      "/images/projects/br-accountancy/desktop.jpg",
      "/images/projects/br-accountancy/mobile.jpg",
      "/images/projects/br-accountancy/desktop-full.jpg",
    ],
    relatedProjects: ["complete-dentist-academy", "crown-labels"],
  },

  {
    slug: "strength-in-us",
    title: "Strength In Us",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Weekly Graphics", "Ongoing"],
    heroImage: "/images/projects/strength-in-us/hero.jpg",
    thumbnailImage: "/images/projects/strength-in-us/thumb.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Strength In Us",
      industry: "Coaching App",
      location: "USA",
      website: "https://joinstrengthinus.com/",
    },
    testimonial: {
      quote: "To begin Alex is nothing short of a legend - he may not advertise it but he drops everything to fix, create and build my last minute ideas that come to mind! His content is professional but his own - it never looks like anyone else's which is what makes me feel like my content is above and at the top due to it being so unique. Couldn't recommend Alex enough for all he's done for StrengthinUs and his works of art!",
      name: "Strength In Us",
      role: "Coaching",
    },
    brief:
      "Bespoke website build plus an ongoing weekly social graphics retainer for a US-based coaching app brand. One unified visual system across product, web, and social.",
    challenge: [
      "Brand had to translate from app UI into web and social without losing identity. Three different surfaces, one consistent feel.",
      "High content velocity. Weekly social output is non-negotiable for app growth, and quality couldn't slip with the cadence.",
      "Multi-audience: prospective users, existing app subscribers, and community. Each needed a different message.",
    ],
    approach: [
      "Designed and built a bespoke WordPress site that mirrors the app's visual system. Teal + cream + bold typography across the whole brand.",
      "Set up an ongoing weekly graphics retainer. New carousels, story templates, and feed assets shipped every week, all on-brand and ready to publish.",
      "Built the system to scale: as the app grows, the visual library grows with it.",
    ],
    features: [
      "Bespoke WordPress website build",
      "Unified brand system across web + app + social",
      "Ongoing weekly graphics retainer",
      "Carousel + story + feed templates",
      "Multi-audience landing structure",
      "Editorial blog layout",
    ],
    gallery: [
      "/images/projects/strength-in-us/desktop.jpg",
      "/images/projects/strength-in-us/mobile.jpg",
      "/images/projects/strength-in-us/desktop-full.jpg",
    ],
    graphics: [
      "/images/projects/strengthinus-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/strengthinus-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/strengthinus-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["team-procoach", "mrf-socials"],
  },

  {
    slug: "newgen-coaching",
    title: "Newgen Coaching",
    category: "Web Design & Build",
    tags: ["Logo Design", "WordPress", "Bespoke Design"],
    heroImage: "/images/projects/newgen-coaching/hero.jpg",
    thumbnailImage: "/images/projects/newgen-coaching/thumb.jpg",
    hasImages: true,
    year: "2024 + 2026",
    client: {
      name: "Newgen Coaching",
      industry: "Online Fitness Coaching",
      location: "UK",
      website: "https://newgencoaching.uk/",
    },
    brief:
      "Started with logo design in 2024, returning in 2026 to deliver a full bespoke website rebuild. A two-stage relationship that compounds over time.",
    challenge: [
      "First engagement was logo only. They came back because the brand work landed and the website was the next bottleneck.",
      "Existing site didn't reflect the brand we'd built. Visual whiplash between Instagram and the website hurt conversion.",
      "Coaching offer had matured. New programmes, new pricing, new audience. The site had to grow up with the business.",
    ],
    approach: [
      "Phase 1 (2024): logo design and brand foundations. Clean, modern, built to flex across formats.",
      "Phase 2 (2026): full bespoke WordPress site that finally brings the visual system to life on the main customer touchpoint.",
      "Clear programme breakdowns, integrated booking, and a content engine ready to support ongoing growth.",
    ],
    features: [
      "Logo design (2024)",
      "Bespoke WordPress website build (2026)",
      "Programme + pricing structure",
      "Integrated booking + enquiry flow",
      "Client transformation gallery",
      "Content engine + blog",
    ],
    gallery: [
      "/images/projects/newgen-coaching/desktop.jpg",
      "/images/projects/newgen-coaching/mobile.jpg",
      "/images/projects/newgen-coaching/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "body-lab"],
  },

  {
    slug: "jic",
    title: "JIC Refractory",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Industrial"],
    heroImage: "/images/projects/jic/hero.jpg",
    thumbnailImage: "/images/projects/jic/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "JIC Refractory",
      industry: "Industrial Refractory Services",
      location: "UK",
      website: "https://jicrpl.co.uk/",
    },
    brief:
      "Bespoke design and custom WordPress build for a UK refractory specialist. Industrial credibility without the dated industrial aesthetic.",
    challenge: [
      "Specialist industrial services don't get the design treatment they deserve. The site had to compete in a sector where most sites look like 2010.",
      "Decision makers are procurement and engineering buyers. Pretty isn't enough. The site had to load fast, communicate fast, and prove competence fast.",
      "Wide range of services across linings, installations, and maintenance. Structure had to give buyers an answer within seconds.",
    ],
    approach: [
      "Modern industrial aesthetic. Bold typography, strong imagery of real work, structured layouts that prioritise readability and speed.",
      "Each service category gets clear scope, sectors served, and the kind of detail engineering buyers want before they enquire.",
      "Case studies and capability proof front-loaded throughout. The site reads like a credible operator before any sales contact.",
    ],
    features: [
      "Bespoke design + custom WordPress build",
      "Modern industrial aesthetic",
      "Service capability breakdown",
      "Case study + project showcase",
      "Sector-by-sector targeting",
      "Engineer-buyer-led structure",
    ],
    gallery: [
      "/images/projects/jic/desktop.jpg",
      "/images/projects/jic/mobile.jpg",
      "/images/projects/jic/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "steel-city-car-keys",
    title: "Steel City Car Keys",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Local SEO"],
    heroImage: "/images/projects/steel-city-car-keys/hero.jpg",
    thumbnailImage: "/images/projects/steel-city-car-keys/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Steel City Car Keys",
      industry: "Automotive Locksmith",
      location: "Sheffield, UK",
      website: "https://steelcitycarkeys.co.uk/",
    },
    brief:
      "Bespoke WordPress build for a Sheffield-based auto locksmith specialist. Trade-led, fast, and built to convert local search traffic into emergency callouts.",
    challenge: [
      "Most auto locksmiths show up only in directories with weak websites. They needed to own the local space directly.",
      "Emergency service buyers don't read. They scan, decide, and call. Site had to communicate trust and capability in under five seconds.",
      "Wide service range (car keys, fobs, programming, broken keys, lost keys) that all needed clear, scan-friendly structure.",
    ],
    approach: [
      "Confident, no-nonsense design. Phone number front and centre, services clearly listed, trust signals layered in.",
      "Local SEO baked in: Sheffield-targeted pages, schema markup, Google Business Profile integration, and structured data for emergency services.",
      "Built to load fast on 4G. Most enquiries come from someone standing next to a locked car. The site had to perform there first, desktop second.",
    ],
    features: [
      "Bespoke WordPress build",
      "Phone-first conversion design",
      "Service-by-service breakdown",
      "Local SEO + schema markup",
      "4G performance optimisation",
      "Trust + review signal layout",
    ],
    gallery: [
      "/images/projects/steel-city-car-keys/desktop.jpg",
      "/images/projects/steel-city-car-keys/mobile.jpg",
      "/images/projects/steel-city-car-keys/desktop-full.jpg",
    ],
    relatedProjects: ["body-lab", "br-accountancy"],
  },
];

// ============================================================================
// LANDING PAGES
// ============================================================================

const landingProjects: ProjectData[] = [
  {
    slug: "dan-reeve",
    title: "Reeve Conditioning Institute",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Landing Page", "Coaching"],
    heroImage: "/images/projects/dan-reeve/hero.jpg",
    thumbnailImage: "/images/projects/dan-reeve/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dan Reeve",
      industry: "Conditioning Coach",
      location: "UK",
      website: "https://reeveconditioninginstitute.com/",
    },
    brief:
      "AI-focused landing page for a high-performance conditioning coach. Speed-to-launch met design quality that punches well above its ticket price.",
    challenge: [
      "Needed to launch fast, ahead of a wider content campaign. Couldn't wait six weeks for a traditional build.",
      "Conditioning coaching is technical. The landing page had to communicate expertise without losing the buyer in jargon.",
      "Single-purpose page: book a call. Anything else would dilute the conversion.",
    ],
    approach: [
      "AI-Accelerated landing page lane. Custom designed (no template), AI-led exploration, shipped in days.",
      "Clear narrative arc: who it's for, what it solves, how it works, who's behind it, and the single CTA.",
      "Built to optimise. Pixel installed, analytics wired, A/B-ready hero variations.",
    ],
    features: [
      "AI-accelerated custom design",
      "Single-CTA conversion structure",
      "Pixel + analytics setup",
      "A/B-ready hero variations",
      "Mobile-first responsive",
      "Fast turnaround (days)",
    ],
    gallery: [
      "/images/projects/dan-reeve/desktop.jpg",
      "/images/projects/dan-reeve/mobile.jpg",
      "/images/projects/dan-reeve/desktop-full.jpg",
    ],
    relatedProjects: ["kensington-scott", "thecoachconsultant"],
  },

  {
    slug: "redefining-shakti",
    title: "Redefining Shakti",
    category: "Landing Pages",
    tags: ["Logo Design", "Landing Page", "Wellness"],
    heroImage: "/images/projects/redefining-shakti/hero.jpg",
    thumbnailImage: "/images/projects/redefining-shakti/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Redefining Shakti",
      industry: "Women's Wellness",
      location: "UK",
      website: "https://redefiningshakti.com/",
    },
    brief:
      "Logo design plus a bespoke landing page for a women's wellness brand. Soft, considered, and confidently feminine without leaning generic.",
    challenge: [
      "Wellness space is saturated with the same visual cues: soft pinks, hand-lettered scripts, generic mandalas. They wanted to feel different.",
      "Brand needed to read sophisticated and ceremonial without becoming inaccessible.",
      "Single offer, single page. The full story had to land in one scroll.",
    ],
    approach: [
      "Logo first: a refined mark that respects the Shakti reference without resorting to cliché.",
      "Landing page built around the logo's visual language. Considered typography, warm palette, generous spacing.",
      "Narrative copy structure: invitation, philosophy, what's inside, who it's for, how to join.",
    ],
    features: [
      "Logo + brand mark design",
      "Bespoke landing page build",
      "Considered typography + palette",
      "Single-offer narrative structure",
      "Mobile-first responsive",
      "Booking + enquiry integration",
    ],
    testimonial: {
      quote: "The absolute best experience from start to finish. Could not be happier with the outcome of working with Alex and Paul. From the first initial call, Alex has taken the vision of the brand I wanted to build and helped bring it to life. Alongside the logo design, the AW Media team have built my website and helped out with my socials. Super professional, reliable and easy to work with, will never work with another designer again. It turned out even better than I could've imagined.",
      name: "Redefining Shakti",
      role: "Women's Wellness",
    },
    gallery: [
      "/images/projects/redefining-shakti/desktop.jpg",
      "/images/projects/redefining-shakti/mobile.jpg",
      "/images/projects/redefining-shakti/desktop-full.jpg",
    ],
    relatedProjects: ["weather-fix", "altitude"],
  },

  {
    slug: "kensington-scott",
    title: "Kensington Scott",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Landing Page", "Bespoke Kitchens"],
    heroImage: "/images/projects/kensington-scott/hero.jpg",
    thumbnailImage: "/images/projects/kensington-scott/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Kensington Scott",
      industry: "Bespoke Kitchen Maker",
      location: "Kent, UK",
      website: "https://bespoke.kensingtonscott.co.uk/",
    },
    brief:
      "AI-designed, custom-built landing page for a Kent-based bespoke kitchen specialist. Premium presentation at AI-Accelerated speed.",
    challenge: [
      "Bespoke kitchens is a high-ticket considered purchase. The landing page had to feel premium from the first scroll.",
      "Wide style range (Shaker, In-Frame, Modern, Handleless) that buyers self-select. Page had to help them find themselves quickly.",
      "Lead quality is everything. Couldn't afford tyre-kicker enquiries diluting the sales pipeline.",
    ],
    approach: [
      "AI-Accelerated design lane. Custom photography-led layout, premium typography, considered colour palette.",
      "Style-led routing: Shaker, In-Frame, Modern, Handleless each get visual treatment so visitors self-qualify into the right path.",
      "Enquiry form pre-qualifies on budget, location, and timeline. Sales team gets a lead they can actually convert.",
    ],
    features: [
      "AI-accelerated custom design",
      "Style category routing",
      "Photography-led layout",
      "Pre-qualifying enquiry form",
      "Mobile-first responsive",
      "Fast turnaround at premium quality",
    ],
    gallery: [
      "/images/projects/kensington-scott/desktop.jpg",
      "/images/projects/kensington-scott/mobile.jpg",
      "/images/projects/kensington-scott/desktop-full.jpg",
    ],
    relatedProjects: ["dan-reeve", "thecoachconsultant"],
  },

  {
    slug: "altitude",
    title: "Altitude",
    category: "Landing Pages",
    tags: ["Branding", "Landing Page", "Coaching", "Digital PDF"],
    heroImage: "/images/projects/altitude/hero.jpg",
    thumbnailImage: "/images/projects/altitude/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Altitude (Scott Macdonald)",
      industry: "Performance Coaching",
      location: "UK",
      website: "https://altitude-project.com/",
    },
    brief:
      "Full brand identity, long-form landing page, and accompanying AI digital PDF for Altitude. A multi-surface system delivered as one coherent piece.",
    challenge: [
      "Brand starting from zero. Identity, language, and visual system all needed building before any of the marketing surfaces could land.",
      "Long-form landing page had to carry the full pitch: positioning, philosophy, programme, proof, CTA. Many shorter alternatives would have failed to convert.",
      "Companion digital PDF for the offer pack. Had to feel like the same brand, not a separate document.",
    ],
    approach: [
      "Brand identity first: dark, considered, gold accents, performance-driven typography. The look matches the level Scott wants the brand to operate at.",
      "Landing page built long, dense, and confidently structured. Every section earns its place.",
      "Digital PDF pack built in parallel with the same visual language. Cross-surface consistency is the point.",
    ],
    features: [
      "Full brand identity design",
      "Long-form landing page",
      "AI-powered digital PDF pack",
      "Cross-surface consistency",
      "Elementor-ready handoff",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/altitude/desktop.jpg",
      "/images/projects/altitude/mobile.jpg",
      "/images/projects/altitude/desktop-full.jpg",
    ],
    relatedProjects: ["dan-reeve", "kensington-scott"],
  },

  {
    slug: "dr-rio",
    title: "Dr Rio",
    category: "Landing Pages",
    tags: ["Landing Page", "Medical", "Bespoke Design"],
    heroImage: "/images/projects/dr-rio/hero.jpg",
    thumbnailImage: "/images/projects/dr-rio/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dr Rio",
      industry: "Medical / Health",
      location: "UK",
      website: "https://drrio.co.uk/",
    },
    brief:
      "Bespoke landing page for Dr Rio. Clinical credibility, considered design, conversion-focused structure.",
    challenge: [
      "Medical practitioners need to look established and trustworthy from the first impression. Visual signals matter as much as the copy.",
      "Patient journey is information-heavy. The page had to inform without overwhelming.",
      "Booking is the conversion. Everything else is in service of that.",
    ],
    approach: [
      "Clinical-modern visual language. Clean, considered, with editorial typography that signals expertise.",
      "Layered information architecture: top of page sells the credibility, deeper sections answer the practical questions.",
      "Booking integration so patients can convert in a single session.",
    ],
    features: [
      "Bespoke landing page design",
      "Clinical-modern visual system",
      "Booking integration",
      "Layered information structure",
      "Mobile-first responsive",
      "Accessibility-conscious",
    ],
    gallery: [
      "/images/projects/dr-rio/desktop.jpg",
      "/images/projects/dr-rio/mobile.jpg",
      "/images/projects/dr-rio/desktop-full.jpg",
    ],
    relatedProjects: ["complete-dentist-academy", "weather-fix"],
  },

  {
    slug: "weather-fix",
    title: "Weather Fix FRS",
    category: "Landing Pages",
    tags: ["Landing Page", "Services", "Bespoke Design"],
    heroImage: "/images/projects/weather-fix/hero.jpg",
    thumbnailImage: "/images/projects/weather-fix/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Weather Fix FRS",
      industry: "Weather Services",
      location: "UK",
      website: "https://weatherfixfrs.co.uk/",
    },
    brief:
      "Bespoke landing page for a specialist weather services provider. Clear positioning, clear next step, no wasted real estate.",
    challenge: [
      "Niche service that buyers don't know they need until they need it urgently. Page had to educate quickly without sounding salesy.",
      "Mixed audience: trade buyers vs end-customer enquiries with different needs.",
      "Service-area driven business. Geographic specifics had to be clear and verifiable.",
    ],
    approach: [
      "Education-led structure: what the service is, when you need it, what the outcome looks like.",
      "Clear trade vs retail routing without splitting the page in half.",
      "Service-area visuals and structured-data so search engines and visitors both know exactly where it operates.",
    ],
    features: [
      "Bespoke landing page design",
      "Education-led narrative structure",
      "Trade + retail routing",
      "Service-area markup",
      "Mobile-first responsive",
      "Schema + local SEO",
    ],
    gallery: [
      "/images/projects/weather-fix/desktop.jpg",
      "/images/projects/weather-fix/mobile.jpg",
      "/images/projects/weather-fix/desktop-full.jpg",
    ],
    relatedProjects: ["dr-rio", "quickfit-ev"],
  },

  {
    slug: "fortis",
    title: "Fortis Transformations",
    category: "Landing Pages",
    tags: ["Branding", "Logo", "Landing Page", "Bespoke Design"],
    heroImage: "/images/projects/fortis/hero.jpg",
    thumbnailImage: "/images/projects/fortis/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Fortis Transformations",
      industry: "Online Coaching",
      location: "UK",
      website: "https://fortistransformations.com/",
    },
    brief:
      "Full brand build and bespoke website for Fortis Transformations. Logo, identity, and website delivered as one coherent system.",
    challenge: [
      "New brand, new everything. The visual system had to be designed before the website could meaningfully start.",
      "Online coaching space is saturated. Brand needed an identity strong enough to stand out from the algorithmic noise.",
      "Conversion-focused: the site has to turn visitors into discovery calls, full stop.",
    ],
    approach: [
      "Logo design and brand identity locked first. Bold, confident, transformation-led visual cues.",
      "Bespoke website built around the identity: hero shots, before-and-afters, social proof front-loaded.",
      "Funnel structure: hero gets the click, deeper sections build belief, single CTA closes.",
    ],
    features: [
      "Logo + full brand identity",
      "Bespoke website build",
      "Transformation gallery system",
      "Conversion-focused funnel structure",
      "Social proof + testimonial layout",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/fortis/desktop.jpg",
      "/images/projects/fortis/mobile.jpg",
      "/images/projects/fortis/desktop-full.jpg",
      "/images/projects/fortis/logo.jpg",
    ],
    relatedProjects: ["newgen-coaching", "br-accountancy"],
  },

  {
    slug: "noura",
    title: "Noura",
    category: "Branding / Logo Design",
    tags: ["Full Brand", "GHL Landing Page", "Coaching"],
    heroImage: "/images/projects/noura/hero.jpg",
    thumbnailImage: "/images/projects/noura/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Noura",
      industry: "Coaching App",
      location: "UK",
      website: "https://go.noura-app.com/",
    },
    brief:
      "Full brand set-up plus a GoHighLevel landing page for Noura. From identity through to live registration funnel, delivered end to end.",
    challenge: [
      "Brand starting from scratch. Naming, visual identity, palette, type, the lot.",
      "GoHighLevel funnel had to match the brand exactly. Most GHL builds end up looking like GHL builds.",
      "Multiple variants needed (orange, white-hero, YouTube, TikTok) for ad traffic testing.",
    ],
    approach: [
      "Brand identity first. Warm, modern, food-conscious aesthetic that translates across surfaces.",
      "GHL landing page built bespoke inside the platform. Looks custom-built, not templated.",
      "Four traffic variants shipped so ads can test what converts hardest, without rebuilding the page each time.",
    ],
    features: [
      "Full brand identity",
      "GoHighLevel landing page",
      "4 traffic-variant builds",
      "Ad-pixel + tracking setup",
      "Mobile-first responsive",
      "Tested across ad surfaces",
    ],
    gallery: [
      "/images/projects/noura/desktop.jpg",
      "/images/projects/noura/mobile.jpg",
      "/images/projects/noura/desktop-full.jpg",
      "/images/projects/noura/pdf-mockup.jpg",
    ],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },

  {
    slug: "warrior-movement",
    title: "The Warrior Movement",
    category: "Landing Pages",
    tags: ["Logo Design", "Landing Page", "Custom Build"],
    heroImage: "/images/projects/warrior-movement/hero.jpg",
    thumbnailImage: "/images/projects/warrior-movement/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "The Warrior Movement",
      industry: "Coaching / Movement",
      location: "UK",
      website: "https://thewarriormovemement.co.uk/",
    },
    brief:
      "Logo design followed by a custom-built landing page for The Warrior Movement. Brand and build delivered as one coherent piece.",
    challenge: [
      "No existing brand assets. Logo + landing page had to be designed and shipped together as a single coherent system.",
      "Editorial-led aesthetic with strong photography. The landing page had to do justice to the visual direction.",
      "Single CTA. Get the visitor to enquire. Everything else had to be in service of that.",
    ],
    approach: [
      "Logo design first. Bold sans + cyan script combination that reads strong on dark backdrops.",
      "Landing page built around that visual system: full-bleed editorial photography, confident typography, generous spacing.",
      "Single-CTA funnel: hero hits hard, body builds belief, CTA closes.",
    ],
    features: [
      "Custom logo design",
      "Bespoke landing page build",
      "Editorial photography-led layout",
      "Single-CTA conversion structure",
      "Mobile-first responsive",
      "Enquiry form integration",
    ],
    gallery: [
      "/images/projects/warrior-movement/desktop.jpg",
      "/images/projects/warrior-movement/mobile.jpg",
      "/images/projects/warrior-movement/desktop-full.jpg",
    ],
    relatedProjects: ["fortis", "redefining-shakti"],
  },
];

// ============================================================================
// BRANDING / LOGO DESIGN
// ============================================================================

const brandingProjects: ProjectData[] = [
  {
    slug: "vanguard-brand",
    title: "Vanguard",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/vanguard-brand/hero.jpg",
    thumbnailImage: "/images/projects/vanguard-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Vanguard",
      industry: "Performance / Coaching",
      location: "UK",
    },
    brief:
      "Full brand set-up for Vanguard. Identity, logo system, palette, typography, and applications across digital and print.",
    challenge: [
      "Brand needed to feel established from launch. Premium positioning required a visual system that punches above the launch budget.",
      "Wide application range: social, print, swag, future website. The system had to flex without fragmenting.",
      "Distinctive naming meant the mark had to be ownable and immediately recognisable.",
    ],
    approach: [
      "Identity exploration locked the visual direction in two rounds. Bold, confident, performance-led.",
      "Built a full system: primary logo, marks, variants, colour, typography, and application guides.",
      "Delivered ready-to-use templates for social, comms, and document design so the brand stays consistent post-handoff.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography system",
      "Brand guidelines document",
      "Social + print application templates",
      "Stationery design",
      "Future-proofed for digital expansion",
    ],
    testimonial: {
      quote: "It's been great working with AW Media. Marketing today to me is very daunting and technical but AW Media inspired me to focus on the basics, my social branding, the paint work I call it. What represents me and stands out. So I decided to have a consultation and spoke of what inspires me in terms of logo ideas and movie theme concepts I like. AW is very fast for the ideas I gave him and cooked something magical for the first initial stages and followed with something greater, I nearly passed out. AW is a true artist bringing out the artist in the customer and is very passionate about bringing your branding to life.",
      name: "Vanguard",
      role: "The Armed Forces Coach",
    },
    gallery: [
      "/images/projects/vanguard-brand/mockup-1.jpg",
      "/images/projects/vanguard-brand/mockup-2.jpg",
      "/images/projects/vanguard-brand/mockup-3.jpg",
      "/images/projects/vanguard-brand/mockup-4.jpg",
    ],
    relatedProjects: ["primecore-brand", "noura"],
  },

  {
    slug: "primecore-brand",
    title: "PrimeCore",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/primecore-brand/hero.jpg",
    thumbnailImage: "/images/projects/primecore-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "PrimeCore",
      industry: "Coaching / Performance",
      location: "UK",
    },
    testimonial: {
      quote: "AW doesn't just “design” he actually understands you. Who you are. What you stand for. The tone you carry. The standard you operate at. When I explained the new brand name, why I was pivoting, and the direction I wanted to build towards, he nailed it in one attempt. The entire process was completely painless. Quick turnaround, and any minor amendments were handled immediately, not just changed, but understood. He gets the rationale behind decisions, which means you never feel like you're compromising on your vision just to get something finished. When you're working with a graphic designer, trust is everything. They're shaping the first impression people have of your brand, and that matters. That's exactly why I won't go anywhere else.",
      name: "Pete",
      role: "PrimeCore",
    },
    brief:
      "Full brand set-up for PrimeCore. Identity built to scale across digital, content, and merchandise from day one.",
    challenge: [
      "Naming was strong but visual direction was wide open. Could have gone in five different directions.",
      "Brand needed to feel modern and technical without leaning generic-tech.",
      "Multi-product future. Identity system had to hold up as the offer grows.",
    ],
    approach: [
      "Locked direction in a focused identity sprint. Modern, technical, confident.",
      "Full system delivered: primary logo, marks, palette, typography, applications.",
      "Built with future product lines and sub-brands in mind. The system flexes.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography system",
      "Brand guidelines",
      "Social + content templates",
      "Sub-brand-ready architecture",
      "Print + digital application pack",
    ],
    gallery: [
      "/images/projects/primecore-brand/mockup-1.jpg",
      "/images/projects/primecore-brand/mockup-2.jpg",
      "/images/projects/primecore-brand/mockup-3.jpg",
      "/images/projects/primecore-brand/mockup-4.jpg",
    ],
    relatedProjects: ["vanguard-brand", "noura"],
  },

  {
    slug: "hvme-brand",
    title: "HVME",
    category: "Branding / Logo Design",
    tags: ["Logo", "Social Set Up"],
    heroImage: "/images/projects/hvme-brand/hero.jpg",
    thumbnailImage: "/images/projects/hvme-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "HVME",
      industry: "Lifestyle / Coaching",
      location: "UK",
    },
    brief:
      "Logo design plus social set-up for HVME. Launch-ready brand kit covering identity through to ready-to-publish social templates.",
    challenge: [
      "Brand needed to launch socially before anything else. Identity had to translate immediately into IG-ready assets.",
      "Strong naming had to be matched with an equally distinctive mark.",
      "Visual system had to support content-velocity from day one.",
    ],
    approach: [
      "Locked the mark with a tight identity sprint.",
      "Built out a social-first application pack: feed templates, story templates, reel covers, and bio assets.",
      "Delivered the full pack so the team can post on day one without bottlenecks.",
    ],
    features: [
      "Logo + brand mark",
      "Social feed templates",
      "Story + reel cover templates",
      "Bio + profile asset pack",
      "Colour + typography guides",
      "Ready-to-publish from launch",
    ],
    gallery: [
      "/images/projects/hvme-brand/mockup-1.jpg",
      "/images/projects/hvme-brand/mockup-2.jpg",
      "/images/projects/hvme-brand/mockup-3.jpg",
      "/images/projects/hvme-brand/mockup-4.jpg",
    ],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },

  {
    slug: "wright-coaching-brand",
    title: "Wright Coaching",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/wright-coaching-brand/hero.jpg",
    thumbnailImage: "/images/projects/wright-coaching-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Wright Coaching",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Full brand set-up for Wright Coaching. Identity, applications, and a launch-ready system that gives the business a confident visual foundation.",
    challenge: [
      "Crowded coaching space. Visual identity needed to stand out without losing approachability.",
      "Mixed audience meant the brand had to flex tone across professional and consumer touchpoints.",
      "Future website + content. System had to scale.",
    ],
    approach: [
      "Identity that's confident but warm. Strong typography, restrained palette, considered marks.",
      "Built application pack across digital and print.",
      "System engineered for content-first growth.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography",
      "Application templates",
      "Brand guidelines",
      "Content-ready asset pack",
      "Digital + print application",
    ],
    gallery: [
      "/images/projects/wright-coaching-brand/mockup-1.jpg",
      "/images/projects/wright-coaching-brand/mockup-2.jpg",
      "/images/projects/wright-coaching-brand/mockup-3.jpg",
      "/images/projects/wright-coaching-brand/mockup-4.jpg",
    ],
    relatedProjects: ["primecore-brand", "vanguard-brand"],
  },

  {
    slug: "ac-visuals-logo",
    title: "AC Visuals",
    category: "Branding / Logo Design",
    tags: ["Logo Design"],
    heroImage: "/images/projects/ac-visuals-logo/hero.jpg",
    thumbnailImage: "/images/projects/ac-visuals-logo/thumb.jpg",
    hasImages: false,
    year: "2025",
    client: {
      name: "AC Visuals",
      industry: "Creative / Video",
      location: "UK",
    },
    brief:
      "Logo design for AC Visuals. A clean, confident mark for a creative video brand that needed to look as crafted as the work they produce.",
    challenge: [
      "Creative-industry clients are visual-first. The mark had to earn respect from the audience it serves.",
      "Initials-led brief that had to avoid the typical 'monogram-in-a-square' default.",
      "Brand had to flex across video bumpers, watermarks, and social.",
    ],
    approach: [
      "Custom letterform exploration. Built around the AC letters in a way that feels distinctive, not generic.",
      "Delivered with motion-ready variants so the mark animates cleanly into video work.",
      "Full file pack: vector, web, social, and watermark sizes.",
    ],
    features: [
      "Custom letterform logo",
      "Motion-ready variants",
      "Watermark + bumper-sized variants",
      "Vector + web file pack",
      "Colour + monochrome versions",
      "Application examples",
    ],
    gallery: [
      "/images/projects/ac-visuals-logo/logo.jpg",
      "/images/projects/ac-visuals-logo/mockup.jpg",
    ],
    relatedProjects: ["hvme-brand", "br-accountancy"],
  },

  {
    slug: "her-era-brand",
    title: "Her Era",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Brand Guidelines"],
    heroImage: "/images/projects/her-era-brand/hero.jpg",
    thumbnailImage: "/images/projects/her-era-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Her Era",
      industry: "Women's Lifestyle / Wellness",
      location: "UK",
    },
    brief:
      "Full brand set-up for Her Era. Identity, logo, palette, typography, and a four-page A4 landscape brand guidelines deck delivered as one polished system.",
    challenge: [
      "Brand starting from scratch. Naming, identity, palette, type duo, applications, the lot.",
      "Tone is editorial-warm. Easy to default to generic-wellness aesthetics that would have killed the positioning.",
      "Visual system had to flex across digital and print without fragmenting.",
    ],
    approach: [
      "Locked direction with a warm oatmeal-taupe-espresso palette and a refined sans + script duo. Editorial, modern, distinctly Her Era.",
      "Delivered a four-page A4 landscape brand guidelines deck: cover, logo system, palette + typography, application examples.",
      "Built the system to scale into social, print, and future product without redesign.",
    ],
    features: [
      "Logo system + variants",
      "Warm editorial colour palette",
      "Sans + script type duo",
      "4-page brand guidelines deck",
      "Social + print applications",
      "Future-proofed visual system",
    ],
    gallery: [
      "/images/projects/her-era-brand/mockup-1.jpg",
      "/images/projects/her-era-brand/mockup-2.jpg",
      "/images/projects/her-era-brand/mockup-3.jpg",
      "/images/projects/her-era-brand/mockup-4.jpg",
    ],
    relatedProjects: ["redefining-shakti", "noura"],
  },

  {
    slug: "delta-brand",
    title: "Delta Project",
    category: "Branding / Logo Design",
    tags: ["Logo Design", "Social Templates", "Brand Icons"],
    heroImage: "/images/projects/delta-brand/hero.jpg",
    thumbnailImage: "/images/projects/delta-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Delta Project",
      industry: "Online Fitness Coaching",
      location: "UK",
    },
    brief:
      "Full visual set-up for Delta Project, an online fitness coaching brand. Logo design, a custom icon set, and a complete social media template system built to keep the brand consistent across every post.",
    challenge: [
      "New coaching brand that needed to look established and premium from day one, in a saturated fitness market.",
      "Content output is high. The brand needed templates the coach could reuse without the look drifting post-handoff.",
      "Bold, energetic identity that still reads clean at small sizes on a phone feed.",
    ],
    approach: [
      "Built a strong, confident wordmark with a bronze accent block — distinctive in a sea of generic fitness logos.",
      "Designed a matching icon set and a full social media template system: posts, stories, and carousels on-brand out of the box.",
      "Delivered editable templates so Delta can produce consistent content at volume without a designer on every asset.",
    ],
    features: [
      "Primary logo + wordmark",
      "Custom brand icon set",
      "Social media template system",
      "Editable post / story / carousel layouts",
      "Colour + typography system",
      "Built for high-volume content",
    ],
    gallery: [],
    relatedProjects: ["vanguard-brand", "wright-coaching-brand"],
  },

  {
    slug: "mastery-method",
    title: "Mastery Method",
    category: "Branding / Logo Design",
    tags: ["Logo Design", "Landing Page", "Community Build"],
    heroImage: "/images/projects/mastery-method/hero.jpg",
    thumbnailImage: "/images/projects/mastery-method/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Mastery Method (ICM)",
      industry: "Coaching / Education",
      location: "UK",
    },
    brief:
      "End-to-end set-up for Mastery Method, part of ICM. Logo design, a conversion-focused website landing page, a Circle community build, and an ongoing weekly social media service — one connected brand across every touchpoint.",
    challenge: [
      "Sub-brand under ICM that needed its own identity while still feeling part of the wider ecosystem.",
      "Multiple surfaces — logo, landing page, community platform, weekly socials — all had to stay visually consistent.",
      "Landing page had to convert cold traffic into the programme, not just look the part.",
    ],
    approach: [
      "Designed a bold, confident 'M' mark and wordmark in electric blue — modern, premium, instantly recognisable.",
      "Built a conversion-focused landing page and set up the Circle community so members land in a fully branded space.",
      "Run the weekly social media so the brand stays active and consistent without the team lifting a finger.",
    ],
    features: [
      "Logo + brand mark",
      "Conversion landing page",
      "Circle community build",
      "Weekly social media service",
      "Consistent cross-platform identity",
      "Part of the ICM ecosystem",
    ],
    gallery: [],
    relatedProjects: ["delta-brand", "wright-coaching-brand"],
  },

  {
    slug: "vantage-brand",
    title: "Vantage Point",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Welcome Pack"],
    heroImage: "/images/projects/vantage-brand/hero.jpg",
    thumbnailImage: "/images/projects/vantage-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Vantage Point Health & Performance",
      industry: "Health & Performance Coaching",
      location: "USA",
    },
    testimonial: {
      quote: "A creative genius. Got everything I wanted and then some. Took the jumbled ideas in my head and put them into exactly what I wanted. Couldn't recommend him more.",
      name: "Justin Fordham",
      role: "Vantage Point Performance",
    },
    brief:
      "Full brand set-up for Vantage Point Health & Performance, a US fitness client. Logo design, editable social templates, pinned and profile assets, and a welcome pack PDF — a complete identity ready to launch.",
    challenge: [
      "US health and performance brand that needed a premium, ownable identity to stand out in a crowded coaching market.",
      "Wide application range: social, profile, pinned posts, and client onboarding documents all had to feel like one brand.",
      "Mark needed to carry meaning — performance, elevation, the 'vantage point' — without being literal or generic.",
    ],
    approach: [
      "Built a navy-and-gold identity with a custom 'V' mountain-peak mark — premium, confident, and full of meaning.",
      "Designed editable social templates plus pinned and profile assets so the brand launches consistent across every channel.",
      "Delivered a branded welcome pack PDF for smooth, professional client onboarding from the first touchpoint.",
    ],
    features: [
      "Logo + custom peak mark",
      "Navy + gold colour system",
      "Editable social templates",
      "Pinned + profile assets",
      "Welcome pack PDF",
      "Full launch-ready brand kit",
    ],
    gallery: [],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },
];

// ============================================================================
// SOCIAL / GRAPHIC SUBSCRIPTIONS
// ============================================================================

const socialProjects: ProjectData[] = [
  {
    slug: "fox-socials",
    title: "Trained By Fox",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Bodybuilding", "Ongoing"],
    heroImage: "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Michael Fox / Trained By Fox",
      industry: "UK Bodybuilding Coach",
      location: "UK",
      website: "https://www.instagram.com/michael_trainedbyfox/",
    },
    testimonial: {
      quote: "I was very reluctant to initially enquire with Alex and his team. Having previously worked with graphic designers who I rated highly, it got to a point where the creativity across the industry just felt repetitive. Then I started seeing more and more of Alex's work and the coaches he was working with, and I could see a clear differentiation. My partner was actually the first person to work with Alex. The attention to detail he put into what he created for her Molly Rose Studios was great. That gave me the confidence to jump on a consultation call, and I immediately signed up for the fortnightly plan. Within the first three weeks, I upgraded straight to the weekly plan. Alex is not going to just design whatever you hand him. He will give honest feedback, and he will still do what you have asked, but he will tell you straight if he thinks something is not working. Overall, if you are a coach looking to level up your content, give this a try.",
      name: "Michael Fox",
      role: "Trained By Fox",
    },
    brief:
      "Ongoing IG carousel pack design for a UK bodybuilding coach. Editorial-grade graphics that match the seriousness of the coaching.",
    challenge: [
      "Bodybuilding content on IG is mostly noise. He needed graphics that read as authoritative, not algorithm bait.",
      "Recurring output cadence demanded a template system that flexes without going stale.",
      "Strong personal brand voice had to come through visually as well as in copy.",
    ],
    approach: [
      "Built a carousel system: cover, hook, body, CTA, with locked typography and visual cues.",
      "Recurring packs ship on a schedule, each one bespoke within the system.",
      "Tone is direct, technical, and confident. Graphics back that up.",
    ],
    features: [
      "Custom IG carousel template system",
      "Recurring monthly packs",
      "Cover + body + CTA design",
      "Locked brand voice in visuals",
      "Hand-finished, not auto-generated",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/fox-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/fox-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["mrf-socials", "prepdad-socials"],
  },

  {
    slug: "icm-socials",
    title: "ICM Education",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Education", "Ongoing"],
    heroImage: "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "ICM Education",
      industry: "Education / Coaching",
      location: "UK",
      website: "https://www.instagram.com/theicmeducation/",
    },
    testimonial: {
      quote: "AW is the best to work with! He creates all our social media content, website, branding & lead magnets to a high standard every time. He's efficient and delivers all content on time consistently each week. His response times are excellent and the whole graphic process is smooth making it 10x easier to keep up with posting consistently on socials.",
      name: "ICM Education",
      role: "Online Coaching & Education",
    },
    brief:
      "Ongoing IG carousel design for a UK education brand. Editorial-style graphics that turn complex ideas into scrollable, shareable visuals.",
    challenge: [
      "Education-led content is dense by nature. Graphics had to make complex frameworks visually digestible.",
      "Repeating cadence meant the system had to flex without losing identity.",
      "Audience is sharp. Anything that read as cheap or generic would damage authority.",
    ],
    approach: [
      "Editorial visual system: clear hierarchy, generous space, considered typography.",
      "Recurring monthly packs designed around teaching moments.",
      "Locked brand voice through colour and typographic discipline.",
    ],
    features: [
      "Editorial carousel system",
      "Recurring monthly packs",
      "Framework-led visual storytelling",
      "Typography-led identity",
      "Hand-finished, not template-spammed",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/icm-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/icm-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "square-one-socials"],
  },

  {
    slug: "square-one-socials",
    title: "Square One Gym",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Gym", "Ongoing"],
    heroImage: "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Square One Gym",
      industry: "Gym / Fitness Brand",
      location: "UK",
      website: "https://www.instagram.com/squareonegym/",
    },
    brief:
      "Recurring IG carousel design for a UK gym brand. High-velocity output that holds a strong, consistent visual line week after week.",
    challenge: [
      "Gym brands publish constantly. The visual line couldn't drift across hundreds of posts.",
      "Mix of education, member features, and offer content all had to live in the same system.",
      "Audience is fitness-savvy. Generic gym graphics would have hurt trust.",
    ],
    approach: [
      "Locked visual system covering education, member features, and offers in one coherent style.",
      "High-velocity production without quality compromise.",
      "Recurring monthly packs ship on a schedule, ready to publish.",
    ],
    features: [
      "Cross-content-type visual system",
      "Recurring monthly packs",
      "High-velocity production",
      "Member feature + education + offer templates",
      "Locked brand discipline",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/square-one-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/square-one-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "mrf-socials"],
  },

  {
    slug: "myles-socials",
    title: "Mind Architect Myles",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Claude Code", "IG Carousels", "Ongoing"],
    heroImage: "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Mind Architect Myles",
      industry: "Mindset / Performance",
      location: "UK",
      website: "https://www.instagram.com/mindarchitectmyles/",
    },
    brief:
      "AI-led carousel system built in Claude Code for Mind Architect Myles. Recurring high-velocity output where the AI-Accelerated lane meets real production work.",
    challenge: [
      "Weekly cadence at a quality bar that traditional design couldn't hit profitably.",
      "Brand had to read distinctive every single post, not template-y.",
      "Output couldn't feel auto-generated. AI is the engine, craft is still the deliverable.",
    ],
    approach: [
      "Built a Claude Code production pipeline that handles the heavy lifting per pack.",
      "Locked visual system + human editorial oversight on every pack before publish.",
      "Recurring weekly delivery without dropping the quality line.",
    ],
    features: [
      "Claude Code production pipeline",
      "AI-led design at human-craft quality",
      "Weekly carousel packs",
      "Personal-brand narrative carousels",
      "Locked typography + visual discipline",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/myles-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/myles-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["thecoachconsultant", "dan-reeve"],
  },

  {
    slug: "prepdad-socials",
    title: "The Prep Dad",
    category: "Graphic Subscriptions",
    tags: ["AI + Bespoke", "IG Carousels", "French", "Ongoing"],
    heroImage: "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Louis / The Prep Dad",
      industry: "Comp Prep Coaching (French market)",
      location: "France",
      website: "https://www.instagram.com/theprepdad/",
    },
    brief:
      "Recurring IG carousel design for a French-language comp prep brand. Mix of AI-accelerated production and bespoke hand-finishing.",
    challenge: [
      "French-language content with all the typographic gotchas (orphan punctuation, accents) that monolingual systems handle badly.",
      "Mixed AI + bespoke output meant the visual line had to survive across two different production paths.",
      "Topic variety: nutrition, training, mindset, comp prep. Templates had to flex without breaking.",
    ],
    approach: [
      "Built a French-typography-aware production pipeline that handles orphans, accents, and copy length cleanly.",
      "Mix of AI-generated decoration and hand-finished design within a locked visual system.",
      "Recurring packs delivered ready to publish in the French market.",
    ],
    features: [
      "French typography handling",
      "AI + bespoke hybrid production",
      "Recurring monthly packs",
      "Topic-flexible template system",
      "Hand-finished hero slides",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/prepdad-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/prepdad-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "mrf-socials"],
  },

  {
    slug: "mrf-socials",
    title: "Marsha Rose Fit",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Coaching", "Editorial", "Ongoing"],
    heroImage: "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Marsha Rose Fit",
      industry: "Fitness Coaching",
      location: "UK",
      website: "https://www.instagram.com/marsharosefit/",
    },
    brief:
      "Recurring weekly IG carousel packs for Marsha Rose Fit. Editorial-led, magazine-grade visuals with strong typography and considered photography treatment.",
    challenge: [
      "Brand voice is editorial and confident. Most fitness graphics design defaults to gym-bro aesthetics that would have killed the tone.",
      "Weekly cadence with three distinct pack types in rotation.",
      "Photography is central. Treatment had to feel intentional, not auto-filtered.",
    ],
    approach: [
      "Editorial visual system: DM Serif Display italic hero treatment, chunky stickers, polaroid photography treatment.",
      "Three-pack rotation system: hero-led, photo-led, content-led.",
      "Recurring weekly packs with visual QA before sign-off.",
    ],
    features: [
      "Editorial magazine-grade visual system",
      "Three-pack rotation",
      "Weekly publishing cadence",
      "Considered photography treatment",
      "Locked typography discipline",
      "Visual QA per pack",
    ],
    gallery: [],
    graphics: [
      "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/mrf-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/mrf-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "square-one-socials"],
  },

  {
    slug: "proiq-socials",
    title: "ProIQ",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Ongoing"],
    heroImage: "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "ProIQ",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Recurring weekly IG carousel design for ProIQ. Strong visual line, locked system, ready-to-publish packs delivered on a schedule.",
    challenge: [
      "Weekly cadence at a quality bar that doesn't drift across hundreds of posts.",
      "Visual identity had to read distinctive every single time, not template-y.",
      "Topic range had to be supported without breaking the brand line.",
    ],
    approach: [
      "Locked carousel visual system covering covers, body slides, and CTAs.",
      "Recurring weekly packs designed within the system.",
      "Hand-finished, on-brand, ready to publish.",
    ],
    features: [
      "Custom IG carousel system",
      "Recurring weekly packs",
      "Locked brand discipline",
      "Hand-finished quality",
      "Ongoing creative direction",
      "Visual QA before sign-off",
    ],
    gallery: [],
    graphics: [
      "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/proiq-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/proiq-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["mrf-socials", "fox-socials"],
  },

  {
    slug: "cammy-socials",
    title: "Cammy",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Weekly", "Ongoing"],
    heroImage: "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Cammy",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Weekly IG carousel design for Cammy. Recurring packs shipped on a tight cadence with a locked visual system that scales with the content.",
    challenge: [
      "Weekly output without quality drift.",
      "Distinct brand line across every pack.",
      "Topic flexibility without fragmenting the visual system.",
    ],
    approach: [
      "Locked carousel template system with hero, body, and CTA slide patterns.",
      "Recurring weekly packs designed bespoke within the system.",
      "Hand-finished quality, not auto-spammed templates.",
    ],
    features: [
      "Custom IG carousel system",
      "Recurring weekly packs",
      "Locked brand discipline",
      "Hand-finished slides",
      "Ongoing creative direction",
      "Ready-to-publish delivery",
    ],
    gallery: [],
    graphics: [
      "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/cammy-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/cammy-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["proiq-socials", "fox-socials"],
  },

  {
    slug: "matt-cusano-socials",
    title: "Matt Cusano",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Fortnightly", "Ongoing"],
    heroImage: "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Matt Cusano",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Fortnightly IG carousel pack design for Matt Cusano. A sustainable cadence that keeps the visual brand sharp without quality compromise.",
    challenge: [
      "Fortnightly cadence means every pack has to land harder than a typical weekly post.",
      "Visual line had to flex across multiple content angles.",
      "Brand voice + design discipline locked across every drop.",
    ],
    approach: [
      "Locked carousel visual system designed for the fortnightly cadence.",
      "Each pack hand-finished within the system, not template-spammed.",
      "Ongoing creative direction across the engagement.",
    ],
    features: [
      "Custom IG carousel system",
      "Fortnightly publishing cadence",
      "Hand-finished quality",
      "Locked brand discipline",
      "Ongoing creative direction",
      "Visual QA per pack",
    ],
    gallery: [],
    graphics: [
      "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["cammy-socials", "proiq-socials"],
  },
];

// ============================================================================
// EXPORT
// ============================================================================

export const projects: ProjectData[] = [
  ...webProjects,
  ...landingProjects,
  ...brandingProjects,
  ...socialProjects,
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}
