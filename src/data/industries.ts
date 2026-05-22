export interface IndustryData {
  slug: string;
  title: string;
  tag: string;
  headerTitle: string;
  headerAccent: string;
  headerDescription: string;
  intro: string[];
  painPoints: { title: string; description: string }[];
  services: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export const industries: IndustryData[] = [
  {
    slug: "fitness",
    title: "Fitness Coaches & PTs",
    tag: "Fitness Industry",
    headerTitle: "Web design built for",
    headerAccent: "fitness professionals.",
    headerDescription:
      "Fitness is where we cut our teeth. Hundreds of websites for coaches, PTs, and gym owners. We know your market, your audience, and exactly what converts visitors into coaching clients.",
    intro: [
      "We've built over 400 websites for fitness coaches, personal trainers, gym owners, and online coaching brands. This isn't a sideline for us. It's what we do every single day.",
      "We understand how your clients think, what makes them enquire, and what puts them off. We know the difference between an online coaching brand that charges £50 a month and one that charges £500, and we know how to make your website reflect which one you are.",
      "From booking integrations to programme delivery, from lead magnets to transformation galleries. We've built it all. No learning curve, no guesswork. Just a team that speaks your language.",
    ],
    painPoints: [
      {
        title: "Your Wix site looks like every other PT.",
        description: "You're competing with hundreds of coaches in your area. A template website makes you invisible. You need something that makes people stop scrolling and start enquiring.",
      },
      {
        title: "You're getting DMs but not website enquiries.",
        description: "If people are messaging you on Instagram but bouncing off your site, the problem isn't your coaching. It's your website. We fix that.",
      },
      {
        title: "You're spending hours in Canva instead of coaching.",
        description: "Your time is worth more than messing around with graphics. We build you branded templates and a website that does the selling for you.",
      },
    ],
    services: [
      { title: "Coaching websites", description: "Custom-built sites with booking systems, testimonial walls, transformation galleries, and conversion-optimised layouts." },
      { title: "Fitness branding", description: "Logo design, brand identity, and social media templates that position you as the premium choice in your market." },
      { title: "Landing pages for ads", description: "High-converting pages built specifically for Facebook and Instagram ad traffic. Stop sending paid clicks to your homepage." },
    ],
    stats: [
      { value: "400+", label: "fitness websites built" },
      { value: "Specialist", label: "in the fitness market" },
      { value: "2-4", label: "weeks average delivery" },
      { value: "4x", label: "back-to-back award winners" },
    ],
    faqs: [
      {
        question: "Do you integrate with booking systems?",
        answer: "Yes, we work with Calendly, Acuity, PTminder, TrueCoach, My PT Hub, and most other fitness booking platforms. If you use it, we can integrate it.",
      },
      {
        question: "Can you build a client portal or programme delivery system?",
        answer: "Absolutely. We've built coaching platforms with client logins, video libraries, workout trackers, and payment integration. We'll recommend the best approach for your business.",
      },
      {
        question: "I only coach online. Do I still need a website?",
        answer: "Especially if you coach online. Your website is your shopfront. It's where people go to decide if you're legit before they DM you. A strong website means higher-quality enquiries and fewer tyre-kickers.",
      },
    ],
    ctaHeadline: "Ready to get a website that matches your coaching?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your fitness business needs online.",
  },
  {
    slug: "construction",
    title: "Construction & Trades",
    tag: "Construction",
    headerTitle: "Websites that win jobs",
    headerAccent: "for construction companies.",
    headerDescription:
      "Professional websites for builders, contractors, and tradespeople that generate enquiries and make you look like the obvious choice.",
    intro: [
      "Most construction company websites look like they were built in 2012. Blurry photos, clip art icons, and a contact form that probably doesn't work. Your competitors are winning jobs because they look more professional online, even if your work is better.",
      "We build clean, modern websites that showcase your projects, highlight your expertise, and make it dead easy for potential clients to get in touch. No fluff, no jargon. Just a site that does its job so you can do yours.",
      "Whether you're a sole trader, a specialist contractor, or a multi-site construction firm, we'll build you something that stands out in an industry where most websites are embarrassingly bad.",
    ],
    painPoints: [
      {
        title: "You're losing tenders to worse companies.",
        description: "When a potential client Googles you and your competitor, the one with the better website wins. First impressions happen online now, not on-site.",
      },
      {
        title: "Your current site doesn't show your best work.",
        description: "You've got incredible project photos sat on your phone. We build portfolio showcases that let your work speak for itself.",
      },
      {
        title: "You don't have time to mess around with websites.",
        description: "You're on-site all day. We handle everything: design, build, content, and deliver a site you're proud to hand out on a business card.",
      },
    ],
    services: [
      { title: "Company websites", description: "Professional sites with project galleries, service breakdowns, testimonials, and clear calls-to-action that generate enquiries." },
      { title: "Branding & identity", description: "Logos, vehicle livery design, workwear branding, and a consistent look that makes your business memorable." },
      { title: "SEO & local visibility", description: "Get found when people search for builders, contractors, and trades in your area. Local SEO that puts you on the map." },
    ],
    stats: [
      { value: "50+", label: "trade & construction sites built" },
      { value: "Top 3", label: "Google rankings for local trades" },
      { value: "2-4", label: "weeks average delivery" },
      { value: "24hr", label: "support response time" },
    ],
    faqs: [
      {
        question: "Can you add a project gallery I can update myself?",
        answer: "Yes. We build easy-to-update galleries where you can upload project photos, add descriptions, and categorise by type of work. No coding needed. If you can use a phone, you can update your site.",
      },
      {
        question: "Do you do vehicle wraps and workwear design?",
        answer: "We design the branding and provide print-ready files for vehicle livery, workwear, signage, and anything else you need. We work with trusted print partners if you need production too.",
      },
      {
        question: "I just want something simple. Is that okay?",
        answer: "Simple is often best. A clean 5-page site with your services, project photos, testimonials, and a contact form is usually all a trades business needs. We won't over-engineer it.",
      },
    ],
    ctaHeadline: "Ready to look as professional online as you are on-site?",
    ctaSubtext: "Book a free call. No jargon, no hard sell. Just a chat about what you need.",
  },
  {
    slug: "dental",
    title: "Dental Practices",
    tag: "Dental",
    headerTitle: "Websites that fill chairs",
    headerAccent: "for dental practices.",
    headerDescription:
      "Professional, trust-building websites for dentists and dental practices that turn visitors into booked appointments.",
    intro: [
      "Patients choose their dentist online before they ever pick up the phone. If your website looks outdated, loads slowly, or doesn't clearly explain your treatments, they're booking with the practice down the road instead.",
      "We build clean, modern dental websites that do three things: build trust instantly, explain your services clearly, and make it effortless to book an appointment. No stock photos of models with perfect teeth. Just a professional site that reflects the quality of care you provide.",
      "From NHS practices to private cosmetic clinics, we understand the dental industry and what patients look for when choosing a new practice.",
    ],
    painPoints: [
      {
        title: "Patients are going to competitors with better websites.",
        description: "When someone searches 'dentist near me', they click the top results and pick the one that looks most trustworthy. Your website is your waiting room. Make it feel right.",
      },
      {
        title: "Your treatment pages don't explain enough.",
        description: "Patients research treatments online before enquiring. If your site doesn't clearly explain what you offer, the pricing, and the process, they'll find one that does.",
      },
      {
        title: "You're not showing up on Google.",
        description: "Local SEO for dental practices is competitive. We build sites that are optimised from day one and offer ongoing SEO to climb the rankings.",
      },
    ],
    services: [
      { title: "Practice websites", description: "Clean, professional sites with treatment pages, team profiles, online booking integration, and patient testimonials." },
      { title: "Treatment page design", description: "Dedicated pages for each treatment (implants, Invisalign, whitening, etc.) designed to educate patients and drive bookings." },
      { title: "Local SEO", description: "Get your practice ranking for 'dentist near me' and specific treatment searches in your area. Google Business Profile optimisation included." },
    ],
    stats: [
      { value: "30+", label: "healthcare websites built" },
      { value: "Page 1", label: "Google rankings achieved" },
      { value: "3-5", label: "weeks average delivery" },
      { value: "GDPR", label: "compliant by default" },
    ],
    faqs: [
      {
        question: "Can you integrate with our booking system?",
        answer: "Yes, we work with Dentally, Software of Excellence, Exact, and most other dental practice management systems. If yours has an online booking widget, we can integrate it seamlessly.",
      },
      {
        question: "Do you handle GDPR compliance?",
        answer: "All our sites are built with GDPR in mind: cookie consent, privacy policies, secure forms, and compliant data handling. We'll make sure your site ticks every box.",
      },
      {
        question: "Can patients leave reviews on the site?",
        answer: "We can integrate Google Reviews, Trustpilot, or a custom testimonial section. Showing real patient feedback builds trust and drives new bookings.",
      },
    ],
    ctaHeadline: "Ready to fill more chairs with your website?",
    ctaSubtext: "Book a free call and we'll review your current online presence.",
  },
  {
    slug: "photography",
    title: "Photographers",
    tag: "Photography",
    headerTitle: "Portfolio websites that",
    headerAccent: "book you out.",
    headerDescription:
      "Stunning portfolio websites for photographers that showcase your work and convert browsers into booked clients.",
    intro: [
      "Your photos are incredible. Your website? Probably not doing them justice. If your portfolio is buried in a slow-loading Squarespace template with tiny thumbnails, you're underselling yourself before a client even sees your best work.",
      "We build fast, visually stunning portfolio websites that let your photography take centre stage. Full-screen galleries, smooth transitions, and a design that gets out of the way and lets your images do the talking.",
      "Whether you shoot weddings, commercial, portraits, or events, we'll build you a site that positions you as a premium photographer, because that's what your work deserves.",
    ],
    painPoints: [
      {
        title: "Your portfolio doesn't do your work justice.",
        description: "Tiny thumbnails, slow loading, and cluttered layouts are killing the impact of your best shots. We build galleries that make your photos feel as good online as they do in print.",
      },
      {
        title: "Clients aren't enquiring through your site.",
        description: "A beautiful portfolio means nothing if there's no clear path to booking. We add strategic CTAs and enquiry forms that turn admirers into paying clients.",
      },
      {
        title: "Your site takes forever to load.",
        description: "High-res images need smart optimisation. We build sites that display your photos in stunning quality while loading in under 2 seconds.",
      },
    ],
    services: [
      { title: "Portfolio websites", description: "Full-screen galleries, category filtering, lightbox viewing, and layouts designed to make your photography the hero." },
      { title: "Branding & identity", description: "A photographer's brand should be as refined as their work. Logo, typography, colour palette, and consistent styling across all touchpoints." },
      { title: "SEO & booking", description: "Get found for searches like 'wedding photographer Sheffield' and make it easy for clients to check availability and enquire." },
    ],
    stats: [
      { value: "40+", label: "creative industry sites built" },
      { value: "<2s", label: "average page load time" },
      { value: "2-3", label: "weeks average delivery" },
      { value: "100%", label: "mobile optimised" },
    ],
    faqs: [
      {
        question: "Will my photos load quickly on the site?",
        answer: "Yes. We use advanced image optimisation: responsive sizing, lazy loading, and modern formats so your photos look stunning but don't slow the site down. Best of both worlds.",
      },
      {
        question: "Can I update the gallery myself?",
        answer: "Absolutely. We build a simple backend where you can upload new shoots, create albums, reorder images, and publish. No technical knowledge needed.",
      },
      {
        question: "Do you work with videographers too?",
        answer: "Yes, we can embed showreels, integrate Vimeo or YouTube, and build portfolio pages that showcase both photo and video work seamlessly.",
      },
    ],
    ctaHeadline: "Ready for a website as good as your photography?",
    ctaSubtext: "Book a free call and we'll talk through your vision.",
  },
  {
    slug: "aesthetics",
    title: "Aesthetics & Beauty",
    tag: "Aesthetics & Beauty",
    headerTitle: "Websites that feel as",
    headerAccent: "premium as your treatments.",
    headerDescription:
      "Elegant, trust-building websites for aesthetics clinics, beauty salons, and medispas that attract high-value clients.",
    intro: [
      "In aesthetics, trust is everything. Your clients are putting their face in your hands. Literally. If your website looks cheap, outdated, or like a DIY job, they're not booking. They're going to the clinic down the road with the better website.",
      "We design websites that feel premium from the first click. Clean layouts, elegant typography, professional imagery, and a booking flow that makes it effortless to schedule a consultation. Every detail is designed to say: this is a clinic you can trust.",
      "From standalone practitioners to multi-treatment medispas, we understand the aesthetics industry and what high-value clients expect to see before they commit.",
    ],
    painPoints: [
      {
        title: "Your website doesn't match the quality of your clinic.",
        description: "You've invested in your space, your training, and your products. But your website still looks like it was made on Wix in an afternoon. That disconnect is costing you bookings.",
      },
      {
        title: "Clients can't find your treatments or prices.",
        description: "If someone has to hunt for your treatment menu or can't figure out how to book, they'll go somewhere easier. We make the path from 'interested' to 'booked' frictionless.",
      },
      {
        title: "You're not showing up for local searches.",
        description: "When someone searches 'lip filler near me' or 'aesthetics clinic Sheffield', you need to be on page one. We build sites optimised for exactly those searches.",
      },
    ],
    services: [
      { title: "Clinic websites", description: "Elegant, premium sites with treatment menus, before & after galleries, practitioner profiles, and seamless online booking." },
      { title: "Brand identity", description: "Luxury branding that positions your clinic as the premium choice: logo, colour palette, social templates, and print materials." },
      { title: "SEO & Google Ads", description: "Local SEO to rank for treatment searches in your area, plus landing pages optimised for paid ad campaigns." },
    ],
    stats: [
      { value: "25+", label: "beauty & aesthetics sites built" },
      { value: "Premium", label: "design as standard" },
      { value: "2-4", label: "weeks average delivery" },
      { value: "GDPR", label: "compliant by default" },
    ],
    faqs: [
      {
        question: "Can you integrate with my booking system?",
        answer: "Yes, we integrate with Fresha, Timely, Pabau, Cliniko, and most other clinic booking platforms. If you use it, we can make it work seamlessly on your site.",
      },
      {
        question: "Can I show before and after photos?",
        answer: "Absolutely. We build dedicated before & after galleries with sliders, categorised by treatment type. It's one of the most powerful trust-builders for aesthetics clinics.",
      },
      {
        question: "Do you understand the advertising restrictions for aesthetics?",
        answer: "Yes. We're aware of ASA guidelines around before & after imagery and treatment claims. We'll make sure your site looks incredible while staying compliant.",
      },
    ],
    ctaHeadline: "Ready for a website your clients will trust on sight?",
    ctaSubtext: "Book a free call and let's elevate your online presence.",
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find((i) => i.slug === slug);
}
