// SEO landing pages — standalone, conversion-focused pages built around
// specific local ranking terms (web design agency, branding agency, small
// business web design, [city] web design). Each lives at its own top-level URL
// (e.g. /web-design-agency-sheffield), NOT under /locations.
//
// Not in the main nav, but the key pages ARE linked from the footer "areas"
// strip (Footer.tsx) and from related blog posts. Post the June 2026 spam
// update, sitemap-only orphan pages targeting keyword permutations read as
// doorway abuse; internal links + genuinely differentiated copy per page are
// what keep these legitimate. Keep each variant's copy distinct.
//
// Pages are generated per (city × keyword variant) so copy stays consistent and
// new cities are a one-line addition to the CITIES array below.

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingPillar {
  title: string;
  description: string;
}

export interface LandingFAQ {
  question: string;
  answer: string;
}

export interface LandingTeamMember {
  name: string;
  role: string;
  photo: string;
}

export interface LandingPageData {
  slug: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Hero
  tag: string;
  title: string; // H1 line 1
  titleAccent: string; // H1 line 2 (gradient)
  headerDescription: string;
  // Intro block
  introHeading: [string, string]; // [white line, pink line]
  introParas: string[];
  // What we do
  servicesHeading: [string, string];
  services: LandingPillar[];
  // Why us
  whyHeading: [string, string];
  why: LandingPillar[];
  // Named team (optional) — renders a "meet the people" block when present.
  // Used on flagship local pages to give AI/search real, verifiable named staff.
  teamHeading?: [string, string];
  team?: LandingTeamMember[];
  // FAQ
  faqHeading: string; // single line, accent word appended by component
  faqs: LandingFAQ[];
  // CTA
  ctaHeadline: string;
  ctaSubtext: string;
  // Schema
  serviceName: string; // schema.org Service name
  serviceType: string; // schema.org serviceType
}

interface City {
  name: string;
  slug: string;
  region: string;
  // A local-presence clause, woven into intro copy. Must read true for the city.
  based: string;
}

// Shared proof points — same across all pages.
export const landingStats: LandingStat[] = [
  { value: "Est. 2016", label: "nearly a decade in business" },
  { value: "500+", label: "websites & brands delivered" },
  { value: "4x", label: "back-to-back award winners" },
  { value: "5.0", label: "average client rating" },
];

const CITIES: City[] = [
  {
    name: "Sheffield",
    slug: "sheffield",
    region: "South Yorkshire",
    based: "born and based in Sheffield",
  },
  {
    name: "Rotherham",
    slug: "rotherham",
    region: "South Yorkshire",
    based: "based right on Rotherham's doorstep in South Yorkshire",
  },
  {
    name: "Barnsley",
    slug: "barnsley",
    region: "South Yorkshire",
    based: "based in South Yorkshire, a short hop from Barnsley",
  },
  {
    name: "Chesterfield",
    slug: "chesterfield",
    region: "Derbyshire",
    based: "based just up the road in South Yorkshire, on Chesterfield's doorstep",
  },
];

// ── Keyword-variant builders ────────────────────────────────────────────────
// Each returns the full LandingPageData for a given city.

function webDesignAgency(c: City): LandingPageData {
  // Sheffield also targets "best web design agency sheffield" (one push off
  // page 1) — award proof in the title + a "how to choose the best" FAQ.
  const isSheffield = c.slug === "sheffield";
  const page: LandingPageData = {
    slug: `web-design-agency-${c.slug}`,
    metaTitle: isSheffield
      ? `Web Design Agency Sheffield | 4x Award Winners | AW Media`
      : `Web Design Agency ${c.name} | AW Media`,
    metaDescription: `Award-winning web design agency in ${c.name}. Custom, conversion-focused websites built to convert, AI-accelerated or fully bespoke. Book a free call.`,
    tag: `Web Design Agency · ${c.name}`,
    title: "The web design agency",
    titleAccent: `${c.name} businesses trust.`,
    headerDescription: `We're a ${c.name} web design agency building custom, conversion-led websites for ambitious local businesses. No templates, no page builders, no agency waffle. Just sites that win work.`,
    introHeading: ["A web design agency", "built around results, not just looks."],
    introParas: [
      `AW Media is a web design agency ${c.based}. For nearly a decade we've built websites for ${c.name} businesses that don't just look the part, they bring in the enquiries. A slow, template-looking site quietly costs you customers every day. We fix that.`,
      `Unlike most ${c.name} web design agencies, we design and build every site from scratch around your brand and your customers. Every layout, every section, every call to action is built with one job: turn visitors into booked calls and paying clients.`,
      "Whether you need a fast AI-accelerated build or a fully bespoke website with the full strategy treatment, you get the same standard that competes with any agency in the country, without the inflated agency price tag.",
    ],
    servicesHeading: [`What our ${c.name}`, "web design agency delivers."],
    services: [
      { title: "Custom Web Design & Development", description: "Bespoke, hand-built websites designed to look premium and convert. No themes, no page builders, no two clients with the same site." },
      { title: "Conversion-Focused Landing Pages", description: "High-converting pages built specifically for your ad traffic. Stop sending paid clicks to a homepage that doesn't sell." },
      { title: "E-commerce & Online Stores", description: "Premium online stores with payment, shipping and tax fully configured, built to actually sell." },
      { title: "SEO & Google Visibility", description: `On-page SEO and technical foundations so ${c.name} customers find you on Google, not your competitors.` },
      { title: "Branding & Logo Design", description: "Brand identities and logos that make you the obvious premium choice in your market." },
      { title: "Ongoing Support & Care", description: "Fast, secure, up-to-date hosting and support so your site keeps performing long after launch." },
    ],
    whyHeading: ["Why choose us as your", `${c.name} web design agency.`],
    why: [
      { title: "Local agency, national standard.", description: `We're rooted in ${c.region} and proud of it, but we build to a standard that competes with any agency in the UK. Local enough for a coffee, good enough to win.` },
      { title: "Custom design, never templated.", description: `Every site is designed from scratch around your brand and your customers. No off-the-shelf themes that look like every other ${c.name} business.` },
      { title: "Built to convert, not just to impress.", description: "A beautiful website that doesn't generate enquiries is a waste of money. We design around the actions you want visitors to take." },
    ],
    faqHeading: `${c.name} web design agency`,
    faqs: [
      { question: `What makes you different from other web design agencies in ${c.name}?`, answer: "We build every site custom, never from a template or page builder, and we design around conversions rather than just aesthetics. You also get two ways to work with us: AI-accelerated for speed and value, or fully bespoke when strategy and depth matter." },
      { question: `Do you only work with ${c.name} businesses?`, answer: `We're rooted in ${c.region} and love working with local businesses, but most of our process happens online, so we work with clients all over the UK. Wherever you are, it's easy to work together.` },
      { question: "How much does a website from your agency cost?", answer: "It depends on scope and lane. AI-accelerated builds start from £695 for a landing page, with full websites and online stores priced accordingly. Bespoke builds include strategy and deeper craft. Book a free call and we'll give you a straight number." },
      { question: "How long does a website take to build?", answer: "AI-accelerated builds ship in 2 to 6 weeks depending on scope. Fully bespoke builds run 4 to 10 weeks. We give you a clear timeline before we start and we stick to it." },
    ],
    ctaHeadline: `Looking for a web design agency in ${c.name}?`,
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your business needs online, no obligation.",
    serviceName: `Web Design Agency ${c.name}`,
    serviceType: "Web design",
  };
  if (isSheffield) {
    page.introParas[0] = `AW Media is a web design agency ${c.based}. If you're comparing agencies and searching for the best web design agency in Sheffield, our honest pitch is simple: judge us on the work. Four years of back-to-back awards, 500+ sites delivered since 2016, and a 5.0 average client rating. A slow, template-looking site quietly costs you customers every day. We fix that.`;
    page.faqs.unshift({
      question: "How do I find the best web design agency in Sheffield?",
      answer:
        "Ignore the sales patter and check three things: recent work you can actually visit, named people you can meet, and proof the sites bring in business, reviews, awards, results. We're happy to be judged on all three: 4x back-to-back award winners, a real named Sheffield team, and a 5.0 average rating across 25+ published client reviews.",
    });
  }
  return page;
}

function brandingAgency(c: City): LandingPageData {
  return {
    slug: `branding-agency-${c.slug}`,
    metaTitle: `Branding Agency ${c.name} | Logo & Brand | AW Media`,
    metaDescription: `Branding agency in ${c.name}. Logos, brand identities and guidelines that make you the obvious premium choice. Award-winning since 2016. Book a free call.`,
    tag: `Branding Agency · ${c.name}`,
    title: "The branding agency",
    titleAccent: `${c.name} brands grow with.`,
    headerDescription: `We're a ${c.name} branding agency creating logos, identities and guidelines that make ambitious businesses look like the obvious premium choice in their market.`,
    introHeading: ["Branding that makes you", "the obvious premium choice."],
    introParas: [
      `AW Media is a branding agency ${c.based}. Your brand is the gut feeling people get before they ever speak to you, and right now a weak, inconsistent identity could be making you look smaller and cheaper than you are. We fix that.`,
      "We build complete brand identities from the ground up: logo suites, colour, typography, and clear guidelines so your business looks sharp and consistent everywhere it shows up, from your website to your van to your Instagram feed.",
      `As a ${c.name} branding agency that also designs and builds websites, we make sure your identity actually works in the real world, not just on a pretty mood board. Every brand we create is built to be used, and built to help you charge what you're worth.`,
    ],
    servicesHeading: [`What our ${c.name}`, "branding agency delivers."],
    services: [
      { title: "Logo Design & Logo Suites", description: "Primary, secondary and icon versions of your logo, crafted to work at every size and on every background." },
      { title: "Full Brand Identity", description: "Colour palettes, typography, imagery direction and graphic elements that make your brand instantly recognisable." },
      { title: "Brand Guidelines", description: "A clear, premium guidelines document so your brand stays consistent across every designer, platform and print job." },
      { title: "Rebrands & Refreshes", description: "Modernise a tired, dated identity into something that reflects how good your business actually is today." },
      { title: "Brand-Led Web Design", description: "We turn your new identity into a website that looks and feels unmistakably you, and converts." },
      { title: "Social & Marketing Assets", description: "On-brand templates and graphics so your social feed looks as professional as your business." },
    ],
    whyHeading: [`Why ${c.name} businesses`, "choose us for branding."],
    why: [
      { title: "Identities built to be used.", description: "No abstract mood boards that fall apart in the real world. Every brand we create comes with the assets and guidelines to apply it everywhere, consistently." },
      { title: "Brand and web under one roof.", description: "Because we design and build websites too, your brand carries seamlessly from identity to site. No translation lost between two separate agencies." },
      { title: "Built to help you charge more.", description: "A premium brand lets you compete on value, not price. We design to make you look like the obvious, more expensive, better choice." },
    ],
    faqHeading: `${c.name} branding agency`,
    faqs: [
      { question: "What does a branding agency actually do?", answer: "We create the visual identity of your business: your logo, colours, typography and the rules for using them consistently. Done well, branding makes you instantly recognisable and lets you charge a premium because you look like one." },
      { question: "Do you only design logos, or full brands?", answer: "Both. You can come to us for a standalone logo, or a complete brand identity with a full logo suite, colour palette, typography, imagery direction and a guidelines document. Most clients go for the full identity." },
      { question: "Can you rebrand an existing business?", answer: "Absolutely. Rebrands and brand refreshes are a big part of what we do. We modernise tired, inconsistent identities into something that reflects how good your business actually is now, without losing what makes you recognisable." },
      { question: "Can you build my website to match the new brand?", answer: "Yes, and we recommend it. Because we're a branding agency and a web design studio, your new identity flows straight into a website built around it, with nothing lost between two separate agencies." },
    ],
    ctaHeadline: `Need a branding agency in ${c.name}?`,
    ctaSubtext: "Book a free 15-minute call. We'll tell you honestly whether your brand is helping or holding you back, no obligation.",
    serviceName: `Branding Agency ${c.name}`,
    serviceType: "Brand identity design",
  };
}

function smallBusiness(c: City): LandingPageData {
  return {
    slug: `small-business-web-design-${c.slug}`,
    metaTitle: `Small Business Web Design ${c.name} | AW Media`,
    metaDescription: `Affordable small business web design in ${c.name}. Custom websites that make small businesses look bigger and win more work. Since 2016. Book a free call.`,
    tag: `Small Business Web Design · ${c.name}`,
    title: "Small business web design",
    titleAccent: "that punches above its weight.",
    headerDescription: `Affordable, professional web design for small businesses in ${c.name}. Custom sites that make you look bigger than you are and turn visitors into paying customers.`,
    introHeading: [`Web design for ${c.name}`, "small businesses that means business."],
    introParas: [
      `AW Media designs websites for small businesses across ${c.name}. We know the pressure: you need a site that looks professional and wins work, but you can't justify a five-figure agency invoice. That's exactly the gap we built our AI-accelerated lane to fill.`,
      "Most small business websites are either expensive agency overkill or cheap, template-looking DIY jobs that quietly cost you customers. We give you a third option: a custom-designed, fast, conversion-focused website at a price that makes sense for a small business.",
      `Every site is built to make you look bigger and more established than you are, so you can compete with larger ${c.name} businesses and charge what you're worth. No jargon, no bloat, just a website that earns its keep.`,
    ],
    servicesHeading: ["Web design built for", `small ${c.name} businesses.`],
    services: [
      { title: "Affordable Custom Websites", description: "Properly designed, custom-built sites from £695 for a landing page. Premium quality without the five-figure agency invoice." },
      { title: "Get Found on Google", description: `On-page SEO and fast load speeds so local ${c.name} customers find your small business, not just the big players.` },
      { title: "Mobile-First Design", description: "Most of your customers are on their phones. Every site looks sharp and works perfectly on every device." },
      { title: "Booking & Enquiry Forms", description: "Make it effortless for customers to call, book or enquire, so your website actually generates leads." },
      { title: "Logo & Branding", description: "Look established from day one with a professional logo and brand that makes you the trusted choice." },
      { title: "Simple, Honest Support", description: "Fast, friendly support from real people. No tech jargon, no being passed around a call centre." },
    ],
    whyHeading: ["Why small businesses", `in ${c.name} choose us.`],
    why: [
      { title: "Priced for small businesses.", description: "Our AI-accelerated lane gives you a genuinely custom website at a price a small business can actually justify. Premium quality, sensible budget." },
      { title: "Look bigger than you are.", description: `A sharp, professional website levels the playing field so you can compete with much larger ${c.name} businesses and win.` },
      { title: "No jargon, no overwhelm.", description: "We speak plain English, handle the tech, and make the whole process simple. You focus on running your business." },
    ],
    faqHeading: "small business web design",
    faqs: [
      { question: `How much does a small business website cost in ${c.name}?`, answer: "Our AI-accelerated builds start from £695 for a landing page, with full small business websites priced by scope. It's a genuinely custom site at a price built for small businesses, not a five-figure agency invoice. Book a free call for a straight number." },
      { question: "Is this just a template website?", answer: "No. Even our most affordable builds are custom-designed around your business, not pulled from a template pack. That's how we make small businesses look more professional than competitors using DIY website builders." },
      { question: "I'm not technical, is that a problem?", answer: "Not at all. We handle all the technical side, speak plain English, and keep the process simple. You don't need to know anything about web design, that's our job." },
      { question: "How quickly can my small business get online?", answer: "AI-accelerated builds typically ship in 2 to 6 weeks depending on scope. We'll give you a clear timeline up front and keep you updated the whole way through." },
    ],
    ctaHeadline: `Need a website for your small ${c.name} business?`,
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your business needs to win more work online, no obligation.",
    serviceName: `Small Business Web Design ${c.name}`,
    serviceType: "Web design",
  };
}

function cityWebDesign(c: City): LandingPageData {
  return {
    slug: `${c.slug}-web-design`,
    metaTitle: `${c.name} Web Design | Sites That Convert | AW Media`,
    metaDescription: `${c.name} web design done properly. Custom, conversion-focused websites built to win work. AI-accelerated or fully bespoke, since 2016. Book a free call.`,
    tag: `${c.name} Web Design`,
    title: `${c.name} web design`,
    titleAccent: "that actually wins work.",
    headerDescription: `${c.name} web design done properly. Custom, conversion-led websites for local businesses, built to look premium and turn visitors into paying customers. No templates, ever.`,
    introHeading: [`${c.name} web design`, "with one job: bring in business."],
    introParas: [
      `AW Media is a web design studio ${c.based}, building websites for ${c.name} businesses since 2016. A slow, dated, template-looking site quietly costs you enquiries every single day. We build the opposite: fast, sharp, custom sites that earn their keep.`,
      `Every project is designed and built from scratch around your brand and your customers. No off-the-shelf themes, no page builders, no two ${c.name} businesses ending up with the same website. Just design that's tailored to you and built to convert.`,
      `From your first impression to the final call to action, our ${c.name} web design is built around the actions you want visitors to take. Choose AI-accelerated for speed and value, or fully bespoke when strategy and depth matter most.`,
    ],
    servicesHeading: [`What our ${c.name}`, "web design covers."],
    services: [
      { title: "Custom Web Design & Development", description: "Hand-built websites designed to look premium and convert. No themes, no page builders, no compromise." },
      { title: "Conversion-Focused Landing Pages", description: "High-converting pages built for your ad traffic. Stop sending paid clicks to a homepage that doesn't sell." },
      { title: "E-commerce & Online Stores", description: "Premium online stores with payment, shipping and tax fully configured, built to sell." },
      { title: "SEO & Google Visibility", description: `On-page SEO and fast, technically sound builds so ${c.name} customers find you on Google first.` },
      { title: "Branding & Logo Design", description: "Logos and brand identities that make you the obvious premium choice in your market." },
      { title: "Website Support & Care", description: "Fast, secure, up-to-date hosting and support so your site keeps performing long after launch." },
    ],
    whyHeading: ["Why choose us for", `your ${c.name} web design.`],
    why: [
      { title: "Local studio, national standard.", description: `Rooted in ${c.region} and proud of it, building to a standard that competes with any agency in the UK. Local enough for a coffee, good enough to win.` },
      { title: "Custom design, never templated.", description: `Every site designed from scratch around your brand and customers. No off-the-shelf themes that look like every other ${c.name} business.` },
      { title: "Built to convert, not just impress.", description: "A beautiful website that doesn't generate enquiries is a waste of money. We design around the actions you want visitors to take." },
    ],
    faqHeading: `${c.name} web design`,
    faqs: [
      { question: `How much does web design cost in ${c.name}?`, answer: "It depends on scope and lane. AI-accelerated builds start from £695 for a landing page, with full websites and online stores priced accordingly. Bespoke builds include deeper strategy and craft. Book a free call for a straight number." },
      { question: "Do you build websites from a template?", answer: `Never. Every site is custom-designed from scratch around your business. That's how we make sure no two ${c.name} businesses end up with the same website, and how we make you look more professional than competitors using DIY builders.` },
      { question: `Do you only work with ${c.name} businesses?`, answer: `We're rooted in ${c.region} and love working with local businesses, but most of our process happens online, so we work with clients all over the UK.` },
      { question: "How long does a website take?", answer: "AI-accelerated builds ship in 2 to 6 weeks depending on scope. Fully bespoke builds run 4 to 10 weeks. We give you a clear timeline before we start and stick to it." },
    ],
    ctaHeadline: `Need web design in ${c.name}?`,
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your business needs online, no obligation.",
    serviceName: `${c.name} Web Design`,
    serviceType: "Web design",
  };
}

function aiWebDesign(c: City): LandingPageData {
  return {
    slug: `ai-web-design-${c.slug}`,
    metaTitle: `AI Web Design ${c.name} | Custom Sites in Weeks, From £695 | AW Media`,
    metaDescription: `AI web design in ${c.name}: premium, custom websites live in weeks not months, from £695. Designer-led, never templated. Award-winning since 2016. Book a free call.`,
    tag: `AI Web Design · ${c.name}`,
    title: `AI web design in ${c.name},`,
    titleAccent: "live in weeks not months.",
    headerDescription: `AI-accelerated web design for ${c.name} businesses. A premium, custom website that brings in enquiries, built in a fraction of the time and cost of a traditional agency.`,
    introHeading: [`Premium ${c.name} web design,`, "without the six-week wait."],
    introParas: [
      `AW Media is an AI web design studio ${c.based}. Most ${c.name} business owners put off sorting their website because they assume it means six weeks of back-and-forth and an agency-sized invoice. Meanwhile a dated, slow site quietly costs them enquiries every day. We remove both problems at once.`,
      `By building AI into every stage of how we design and develop, we deliver a premium, custom ${c.name} website in weeks rather than months, and for noticeably less than a traditional agency charges. The speed and the saving are yours. The quality is identical, because a designer steers every decision and signs everything off before it reaches you.`,
      "What you actually get is a site that's working for you sooner: fast to load, built to rank on Google, and designed to turn visitors into booked calls. The AI just means it lands quicker and costs you less to get there. And no, it won't look like everyone else's, because every site is built from scratch around your brand.",
    ],
    servicesHeading: [`What our ${c.name} AI`, "web design delivers."],
    services: [
      { title: "Premium Sites, Built Faster", description: "AI handles the slow, repetitive parts of the build, so you get a custom website in weeks instead of months, without cutting quality." },
      { title: "Lower Cost Than a Traditional Agency", description: "You're not paying for weeks of manual work. The same premium, bespoke result, for noticeably less." },
      { title: "Custom Design, Never Templated", description: `Every ${c.name} site is designed from scratch around your brand. AI explores more ideas faster; a designer makes every creative call.` },
      { title: "Built to Convert", description: "Designed around the actions you want visitors to take, so your site brings in enquiries instead of just sitting there." },
      { title: "SEO & Speed Baked In", description: `Fast, technically sound builds with on-page SEO so ${c.name} customers find you on Google, not your competitors.` },
      { title: "Human-Led Creative Throughout", description: "AI accelerates the process, people lead the design. You get the best of both: speed and genuine craft." },
    ],
    whyHeading: [`Why ${c.name} businesses`, "choose AI-accelerated web design."],
    why: [
      { title: "Working for you sooner.", description: `Every week an underperforming site stays up, it costs you enquiries. We get your new ${c.name} site live in weeks, so you stop leaving money on the table that much faster.` },
      { title: "Agency quality, without the price.", description: "Because AI does the heavy lifting, you get a premium, bespoke website for a fraction of traditional agency cost." },
      { title: "A site you love, not settle for.", description: "Instead of one take-it-or-leave-it concept, you see several directions early and end up with a site that genuinely fits your brand." },
    ],
    faqHeading: `${c.name} AI web design`,
    faqs: [
      { question: `What is AI web design, and what does it mean for my ${c.name} business?`, answer: "It means we use AI tools through the design and build, generating concepts, drafting layouts, structuring content and creating images, so the whole thing is faster and cheaper for you. A designer leads the creative the entire way. You get the speed and the saving; we handle the tools." },
      { question: "Does using AI mean my website will look generic?", answer: "No, the opposite. Every site is custom to your brand. AI just lets us explore more ideas and reach the best one faster. A designer makes every creative call and signs everything off, so what you end up with is unique to you, never a template." },
      { question: `How much does AI web design cost in ${c.name}?`, answer: "AI-accelerated builds start from £695 for a landing page, with full websites and online stores priced by scope, typically well below traditional agency prices because we're not billing weeks of manual work. Book a free call for a straight number." },
      { question: "Is the quality as good as a fully hand-built site?", answer: "Identical. AI speeds the process up, it doesn't lower the bar. A human designer steers every decision and checks everything before it reaches you. You get a premium, bespoke website, just without the long wait." },
    ],
    ctaHeadline: `Want a premium ${c.name} website, live in weeks?`,
    ctaSubtext: "Book a free 15-minute call. We'll show you what we'd build and how fast you could have it live, no obligation.",
    serviceName: `AI Web Design ${c.name}`,
    serviceType: "Web design",
  };
}

function seoAgency(c: City): LandingPageData {
  return {
    slug: `seo-agency-${c.slug}`,
    metaTitle: `SEO Agency ${c.name} | Get Found on Google | AW Media`,
    metaDescription: `SEO agency and consultant in ${c.name}. Get found on Google for the searches that bring customers. On-page, technical and local SEO. Book a free call.`,
    tag: `SEO Agency · ${c.name}`,
    title: "The SEO agency",
    titleAccent: `${c.name} businesses get found with.`,
    headerDescription: `We're a ${c.name} SEO agency and consultancy that gets local businesses found on Google for the searches that actually bring customers. On-page, technical and local SEO that moves rankings.`,
    introHeading: [`Get found by ${c.name}`, "customers ready to buy."],
    introParas: [
      `AW Media is an SEO agency and consultancy ${c.based}. Right now, the customers searching for what you do in ${c.name} are finding your competitors instead of you, and every search you're not ranking for is money walking out the door. We close that gap.`,
      `We work the full picture: the on-page SEO that tells Google what you do, the technical foundations that let you rank at all, and the local SEO that puts you in front of ${c.name} customers on your doorstep. No jargon, no smoke, no vanity metrics, just the rankings and traffic that turn into enquiries.`,
      `Whether you want a hands-on SEO consultant to guide your own team or a ${c.name} SEO agency to handle the lot, you get clear reporting and honest answers. We tell you what's working, what isn't, and exactly where the next win is coming from.`,
    ],
    servicesHeading: [`What our ${c.name}`, "SEO agency delivers."],
    services: [
      { title: "Local SEO", description: `Get into the Google Map pack and rank for "near me" and ${c.name} searches, so nearby customers find you first.` },
      { title: "On-Page SEO", description: "Titles, structure, content and internal linking optimised so Google understands and ranks every page." },
      { title: "Technical SEO", description: "Site speed, crawlability, schema and the technical foundations that decide whether you rank at all." },
      { title: "Keyword & Competitor Strategy", description: `We find the ${c.name} searches worth winning and the gaps your competitors have left open.` },
      { title: "Content That Ranks", description: "Pages and articles built around real search demand, written to rank and to convert, not just fill space." },
      { title: "Reporting & SEO Consultancy", description: "Clear monthly reporting and straight-talking consultancy, so you always know what you're paying for and why." },
    ],
    whyHeading: [`Why ${c.name} businesses`, "choose us for SEO."],
    why: [
      { title: "We build the sites we rank.", description: "We're a web design studio too, so we understand SEO from the foundations up, not as a bolt-on. That's a head start most agencies don't have." },
      { title: "Honest reporting, no vanity metrics.", description: "We report on the rankings, traffic and enquiries that matter to your business, not numbers that look good and mean nothing." },
      { title: "Agency or consultant, your call.", description: `Want us to run your SEO end to end, or guide your own team as a consultant? We work both ways, whatever suits your ${c.name} business.` },
    ],
    faqHeading: `${c.name} SEO`,
    faqs: [
      { question: `What does an SEO agency in ${c.name} actually do?`, answer: "We get your website ranking on Google for the searches your customers use. That means on-page SEO, technical fixes, local SEO and content, all aimed at one outcome: more of the right people finding you and getting in touch." },
      { question: "Do you offer SEO consultancy as well as done-for-you?", answer: `Yes. Some clients want us to handle their SEO completely; others want an SEO consultant to set the strategy and guide their in-house team. We do both, so you get exactly the level of help your ${c.name} business needs.` },
      { question: "How long does SEO take to work?", answer: "SEO is a longer game than ads. Most clients see meaningful movement in rankings and traffic within 3 to 6 months, with local SEO often quicker. We send clear monthly reports so you can see exactly what's happening." },
      { question: "How much does SEO cost?", answer: "It depends on how competitive your market is and whether you want full management or consultancy. We price it around the results you're after, not padded retainers. Book a free call and we'll give you a straight number." },
    ],
    ctaHeadline: `Want your ${c.name} business found on Google?`,
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly where you're losing rankings and how to win them back, no obligation.",
    serviceName: `SEO Agency ${c.name}`,
    serviceType: "Search engine optimization",
  };
}

const VARIANTS: ((c: City) => LandingPageData)[] = [
  webDesignAgency,
  brandingAgency,
  smallBusiness,
  cityWebDesign,
  aiWebDesign,
  seoAgency,
];

// One-off pages that don't fit the city × variant matrix (city-specific niche
// keywords, or national service keywords with no city).
const extraPages: LandingPageData[] = [
  // web design sheffield — the exact head term, people-led, small-business angle
  {
    slug: "web-design-sheffield",
    metaTitle: "Web Design Sheffield | AW Media | Since 2016",
    metaDescription:
      "Web design in Sheffield for small businesses. Affordable, custom websites built to win enquiries, by a real Sheffield team. AI-accelerated or fully bespoke. Book a free call.",
    tag: "Web Design · Sheffield",
    title: "Web design in Sheffield,",
    titleAccent: "built by people you can actually meet.",
    headerDescription:
      "We're a Sheffield web design and digital marketing team building affordable, custom websites for small businesses across the city. Real people, no templates, no agency waffle. Just sites that bring in the enquiries.",
    introHeading: ["Affordable web design for small", "businesses in Sheffield."],
    introParas: [
      "AW Media is a web design studio born and based in Sheffield. Since 2016 we've built websites for small businesses across the city and South Yorkshire that don't just look good, they bring in the work. If you've searched for affordable web design for small businesses in Sheffield and found nothing but faceless agencies and DIY builders, this is the alternative: a real local team who answer the phone.",
      "A slow, template-looking website quietly costs you customers every single day. People judge your business in seconds, and if your site looks dated or loads slowly, they hit the back button and call a competitor instead. We fix that with a custom-designed site built around your customers and the enquiries you actually want.",
      "We're also a digital marketing agency, Sheffield through and through, so your website doesn't sit on its own. We can handle the branding, the SEO to get you found on Google, and the social graphics that keep you looking premium. One local team for the lot, whether you need a fast AI-accelerated build or a fully bespoke website.",
    ],
    servicesHeading: ["What we build for", "Sheffield small businesses."],
    services: [
      { title: "Small Business Websites", description: "Affordable, custom-designed websites for Sheffield small businesses, built to look premium and turn visitors into booked calls and paying customers." },
      { title: "E-commerce & Online Stores", description: "Sell online with a fast, secure store that's easy to manage, from a handful of products to a full catalogue." },
      { title: "SEO & Google Visibility", description: "On-page SEO and technically fast builds so Sheffield customers find you on Google first, not your competitor." },
      { title: "Branding & Logo Design", description: "Logos and brand identity that make you the obvious premium choice in your Sheffield market." },
      { title: "Social Media Graphics", description: "On-brand carousels, posts and ad creative that keep your business looking sharp on every platform." },
      { title: "Website Support & Care", description: "Hosting, security and updates handled for you, so your site keeps performing long after launch." },
    ],
    whyHeading: ["Why Sheffield businesses", "choose AW Media."],
    why: [
      { title: "A real Sheffield team.", description: "We're local, named and reachable. Come in for a coffee, or just pick up the phone. You're never talking to a call centre or a faceless account manager." },
      { title: "Affordable, without looking cheap.", description: "AI-accelerated builds start from £695 so a small business can have a genuinely professional site. Every one is custom, never a template that looks like every other Sheffield business." },
      { title: "Built to win enquiries.", description: "A pretty website that doesn't generate enquiries is wasted money. We design around the actions you want visitors to take: call, book, buy." },
    ],
    teamHeading: ["Meet the Sheffield team", "behind your website."],
    team: [
      { name: "Alex Whitehead", role: "Director, Developer & Award-Winning Web Designer", photo: "/images/team/alex.jpg" },
      { name: "Beth Rendell", role: "Director & Operations", photo: "/images/team/beth.jpg" },
      { name: "Paul Rendell", role: "Web Design & Development", photo: "/images/team/paul.jpg" },
      { name: "Lahcen", role: "Graphic Design", photo: "/images/team/lahcen.jpg" },
    ],
    faqHeading: "Sheffield web design",
    faqs: [
      { question: "How much does web design cost in Sheffield?", answer: "It depends on scope and lane. AI-accelerated builds start from £695 for a landing page, with full small-business websites and online stores priced accordingly. Fully bespoke builds with deeper strategy cost more. Book a free call and we'll give you a straight number, no obligation." },
      { question: "Do you offer affordable web design for small businesses in Sheffield?", answer: "Yes. That's exactly who we build for. Our AI-accelerated lane makes a genuinely professional, custom website affordable for small businesses, without dropping to a cheap template that looks like everyone else. You get a site that competes with far bigger budgets." },
      { question: "Are you a web design or a digital marketing agency?", answer: "Both. We're a Sheffield web design studio first, but we also handle branding, SEO and social media graphics, so your website, your Google visibility and your brand all pull in the same direction. One local team instead of three separate suppliers." },
      { question: "Do I have to be in Sheffield to work with you?", answer: "No. We're Sheffield-based and love working with local businesses face to face, but most of the work happens online, so we build for clients right across the UK. Wherever you are, it's easy to work together." },
    ],
    ctaHeadline: "Need a web designer in Sheffield?",
    ctaSubtext: "Book a free 15-minute call with a real member of the team. We'll tell you exactly what your website needs to bring in more enquiries, no obligation.",
    serviceName: "Web Design Sheffield",
    serviceType: "Web design",
  },
  // graphic designer sheffield
  {
    slug: "graphic-designer-sheffield",
    metaTitle: "Graphic Designer Sheffield | Logos & Branding | AW Media",
    metaDescription:
      "Graphic designer in Sheffield for logos, branding, social graphics and print that make local businesses look premium. Since 2016. Book a free call.",
    tag: "Graphic Designer · Sheffield",
    title: "The graphic designer",
    titleAccent: "Sheffield businesses rely on.",
    headerDescription:
      "A Sheffield graphic designer for logos, branding, social media graphics and print. We make ambitious local businesses look like the premium choice, on every platform they show up.",
    introHeading: ["Graphic design that makes you", "look like the premium choice."],
    introParas: [
      "AW Media is a graphic design studio born and based in Sheffield. Whether you need a single logo, a full brand identity or a steady stream of social and marketing graphics, we make sure everything you put out looks sharp, consistent and unmistakably yours.",
      "Most Sheffield businesses are let down by inconsistent, DIY-looking graphics that quietly make them look smaller than they are. We fix that with design that's built around your brand and your goals, not pulled from a free template pack.",
      "From logos and brand identities to Instagram carousels, ads, flyers and presentation decks, we cover the lot. You can hire us for a one-off project or design on subscription for an always-on creative team without the in-house salary.",
    ],
    servicesHeading: ["What our Sheffield", "graphic designer covers."],
    services: [
      { title: "Logo Design & Brand Identity", description: "Logos, colour, typography and the full identity that makes you instantly recognisable and premium." },
      { title: "Social Media Graphics", description: "On-brand carousels, posts and story templates that make your feed look as professional as your business." },
      { title: "Print & Marketing Collateral", description: "Flyers, brochures, business cards, banners and signage, designed and print-ready." },
      { title: "Ad Creative", description: "Scroll-stopping graphics for Meta and Google ads, built to convert paid traffic, not just look nice." },
      { title: "Presentations & Decks", description: "Pitch decks, sales decks and proposals that make you look like the serious, credible option in the room." },
      { title: "Design on Subscription", description: "An always-on design team for a flat monthly fee. Unlimited requests, fast turnaround, no in-house salary." },
    ],
    whyHeading: ["Why Sheffield businesses", "choose us for graphic design."],
    why: [
      { title: "Brand-consistent, every time.", description: "Everything we design follows one coherent brand system, so you look joined-up across your website, socials, ads and print." },
      { title: "Fast turnaround, no drama.", description: "Whether it's a one-off or a subscription, you get sharp work back quickly, with a simple process and clear communication." },
      { title: "Designed to do a job.", description: "Pretty isn't enough. Every graphic is built around the action you want, whether that's a booking, a sale or a follow." },
    ],
    faqHeading: "Sheffield graphic design",
    faqs: [
      { question: "What does a graphic designer actually do for my business?", answer: "We create the visual side of your brand: your logo, brand identity, social media graphics, ads, print and presentations. Done well, it makes you look more professional and premium, so you win more of the customers you want." },
      { question: "Can I hire you for just one project?", answer: "Absolutely. Plenty of clients come to us for a single logo, a one-off brand identity or a specific print job. You can also move onto a design subscription later if you find you need graphics regularly." },
      { question: "What is design on subscription?", answer: "For a flat monthly fee you get an always-on design team handling your graphics: social posts, ads, print, brand assets and more, with fast turnaround and no recruitment, no salary, no software costs. It's ideal for businesses that need design every week." },
      { question: "Do you only work with Sheffield businesses?", answer: "We're Sheffield-based and love working with local businesses, but most of the work happens online, so we design for clients all over the UK. Wherever you are, it's easy to work together." },
    ],
    ctaHeadline: "Need a graphic designer in Sheffield?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly how to make your business look more premium, no obligation.",
    serviceName: "Graphic Designer Sheffield",
    serviceType: "Graphic design",
  },

  // bespoke wordpress website (national, no city)
  {
    slug: "bespoke-wordpress-website",
    metaTitle: "Bespoke WordPress Website Design | AW Media",
    metaDescription:
      "Bespoke WordPress websites designed and built from scratch, never templates. Fast, secure and built to convert. UK studio since 2016. Book a free call.",
    tag: "Bespoke WordPress · UK",
    title: "Bespoke WordPress websites",
    titleAccent: "built to convert, built to last.",
    headerDescription:
      "Custom WordPress websites designed from scratch around your brand, never a template. Fast, secure, easy for you to manage, and built to turn visitors into customers.",
    introHeading: ["Bespoke WordPress, not", "another off-the-shelf theme."],
    introParas: [
      "Most WordPress websites are a stock theme stretched to fit, bolted together with a dozen plugins, slow to load and a nightmare to edit. A bespoke WordPress website is the opposite: designed from scratch around your brand and built clean, so it's fast, secure and genuinely yours.",
      "We design and build every site to order. You get the flexibility and familiarity of WordPress, the polish of a custom design, and a back end that's actually simple for you or your team to update, without breaking the layout every time you touch it.",
      "Whether you need a smart brochure site, a content-heavy platform or a full WooCommerce store, we build it bespoke, optimised for speed and Google, and back it with ongoing care so it keeps performing long after launch.",
    ],
    servicesHeading: ["What a bespoke WordPress", "build gets you."],
    services: [
      { title: "Custom Design, Built to Order", description: "Designed from scratch around your brand. No stock themes, no two clients with the same site." },
      { title: "Clean, Lightweight Build", description: "No plugin bloat or bolted-on page builders dragging it down. Fast-loading, stable and built to last." },
      { title: "Easy-to-Edit Back End", description: "A tidy WordPress dashboard set up so you can update content confidently without breaking the design." },
      { title: "WooCommerce & Online Stores", description: "Bespoke WordPress e-commerce with payment, shipping and tax fully configured, built to sell." },
      { title: "Speed, Security & SEO", description: "Optimised hosting, hardened security and on-page SEO baked in so you rank and stay safe." },
      { title: "Care Plans & Support", description: "Ongoing updates, backups, monitoring and support from the people who built it." },
    ],
    whyHeading: ["Why choose a bespoke", "WordPress website."],
    why: [
      { title: "Yours, not a template.", description: "Every bespoke build is designed specifically for your business, so you don't look like every other site running the same theme." },
      { title: "Fast and built to last.", description: "Clean code and a lean plugin stack mean a site that loads quickly, ranks better and doesn't fall over when WordPress updates." },
      { title: "Easy to run yourself.", description: "We set the dashboard up around how you actually work, so updating your site is simple and safe, not stressful." },
    ],
    faqHeading: "Bespoke WordPress",
    faqs: [
      { question: "What's the difference between a bespoke WordPress site and a template?", answer: "A template is a pre-made theme thousands of other sites also use, stretched to fit your content. A bespoke WordPress website is designed and built from scratch around your brand, your content and your goals, so it's faster, more flexible and unmistakably yours." },
      { question: "Will I be able to edit it myself?", answer: "Yes. We build on WordPress precisely because it's familiar and editable, and we set the dashboard up so you can update text, images and pages confidently without breaking the design. We're on hand if you'd rather we handled changes too." },
      { question: "Isn't WordPress slow and insecure?", answer: "Off-the-shelf themes crammed with plugins can be. A bespoke build is the opposite: clean, lightweight code, a minimal plugin stack, hardened security and optimised hosting, so it loads fast and stays safe." },
      { question: "How much does a bespoke WordPress website cost?", answer: "It depends on scope and how many pages and features you need. Builds are priced per project after a quick call to understand what you're after. Book a free call and we'll give you a straight number with no pressure." },
    ],
    ctaHeadline: "Want a bespoke WordPress website?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your project needs and what it'll cost, no obligation.",
    serviceName: "Bespoke WordPress Website Design",
    serviceType: "Web design",
  },

  // freelance web design sheffield (reclaiming a term that used to rank)
  {
    slug: "freelance-web-design-sheffield",
    metaTitle: "Freelance Web Design Sheffield | AW Media",
    metaDescription:
      "Freelance web design in Sheffield without the freelance risk. Direct, personal service from an established studio. Custom sites that win work, since 2016.",
    tag: "Freelance Web Design · Sheffield",
    title: "Freelance web design",
    titleAccent: "Sheffield, without the risk.",
    headerDescription:
      "The personal service and value of a freelance web designer in Sheffield, with the reliability of an established studio. Custom sites built to win work, since 2016.",
    introHeading: ["Freelance-style service,", "studio-grade reliability."],
    introParas: [
      "Looking for a freelance web designer in Sheffield, you usually face a trade-off: the personal, direct service and fair pricing of a freelancer, or the reliability and depth of an agency that won't disappear mid-project. AW Media gives you both.",
      "You deal directly with the people designing and building your site, the same as you would with a freelancer, but with an established Sheffield studio behind it: nearly a decade in business, 500+ sites delivered, and the security of knowing the work always gets finished and supported.",
      "Every site is custom-designed around your brand and built to convert, not pulled from a template. Whether you need a single landing page or a full website, you get sharp work, fair pricing, and someone who actually picks up the phone.",
    ],
    servicesHeading: ["What you get with", "freelance-style web design."],
    services: [
      { title: "Direct, Personal Service", description: "You work straight with the designer building your site. No account managers, no being passed around, no losing your project in a queue." },
      { title: "Custom Design, Fair Pricing", description: "Properly custom websites from £695 for a landing page. Freelance-friendly value, without the freelance gamble." },
      { title: "Built to Convert", description: "Every page designed around the actions you want visitors to take, so your site brings in enquiries." },
      { title: "Reliable & Always Supported", description: "An established studio that finishes what it starts and is still here months later when you need a change." },
      { title: "SEO & Speed Included", description: "Fast, technically sound builds with on-page SEO so Sheffield customers find you on Google." },
      { title: "Branding & Graphics Too", description: "Need a logo or social graphics alongside the site? It's all under one roof and perfectly on-brand." },
    ],
    whyHeading: ["Why choose us over a", "freelance web designer."],
    why: [
      { title: "The upside of a freelancer.", description: "Direct contact, personal service, sensible pricing, and someone who genuinely cares about your project." },
      { title: "Without the downside.", description: "No vanishing mid-build, no single point of failure, no 'sorry, I've taken on too much'. An established studio has your back." },
      { title: "Proven since 2016.", description: "500+ websites and brands delivered, four years of back-to-back awards, and a 5.0 average rating." },
    ],
    faqHeading: "freelance web design Sheffield",
    faqs: [
      { question: "Are you a freelancer or an agency?", answer: "Somewhere better in between. You get the direct, personal service and fair pricing of a freelance web designer, with the reliability, depth and security of an established Sheffield studio. The best of both, without the trade-offs." },
      { question: "How much does freelance web design in Sheffield cost?", answer: "Custom builds start from £695 for a landing page, with full websites priced by scope. It's freelance-friendly value for genuinely custom work, not a template. Book a free call for a straight number." },
      { question: "What if my designer disappears mid-project?", answer: "That's exactly the freelance risk we remove. There's a whole studio behind your project, so it always gets finished, supported and looked after, no matter what." },
      { question: "Do you only work with Sheffield businesses?", answer: "We're Sheffield-based and love working locally, but most of the process happens online, so we work with clients across the UK." },
    ],
    ctaHeadline: "Need a freelance web designer in Sheffield?",
    ctaSubtext: "Book a free 15-minute call. Personal service, honest advice, no obligation.",
    serviceName: "Freelance Web Design Sheffield",
    serviceType: "Web design",
  },

  // wordpress web design sheffield
  {
    slug: "wordpress-web-design-sheffield",
    metaTitle: "WordPress Web Design Sheffield | AW Media",
    metaDescription:
      "WordPress web design in Sheffield, built bespoke not from a template. Fast, secure, easy to edit and built to convert. Book a free call.",
    tag: "WordPress Web Design · Sheffield",
    title: "WordPress web design",
    titleAccent: "Sheffield, done properly.",
    headerDescription:
      "Bespoke WordPress web design for Sheffield businesses. Custom-built, never a stretched template: fast, secure, easy to edit and built to bring in enquiries.",
    introHeading: ["WordPress, built bespoke,", "not bolted together."],
    introParas: [
      "AW Media is a WordPress web design studio born and based in Sheffield. Most WordPress sites are a stock theme stretched to fit and crammed with plugins: slow, fragile, and a pain to edit. We build the opposite, bespoke WordPress designed from scratch around your Sheffield business.",
      "You get the flexibility and familiarity of WordPress with the polish of a custom design, and a back end set up so you or your team can actually update it without breaking the layout. Fast to load, hardened against threats, and built to rank locally.",
      "Whether it's a smart brochure site, a content-heavy platform or a full WooCommerce store, we build it bespoke, optimise it for speed and Google, and back it with ongoing care so it keeps performing long after launch.",
    ],
    servicesHeading: ["What our Sheffield", "WordPress web design covers."],
    services: [
      { title: "Bespoke WordPress Builds", description: "Designed from scratch around your brand. No stock themes, no two Sheffield clients with the same site." },
      { title: "Clean, Lightweight Code", description: "No plugin bloat or page-builder drag. Fast-loading, stable WordPress built to last." },
      { title: "Easy-to-Edit Back End", description: "A tidy dashboard set up so you can update content confidently without breaking the design." },
      { title: "WooCommerce Stores", description: "Bespoke WordPress e-commerce with payment, shipping and tax fully configured, built to sell." },
      { title: "Local SEO & Speed", description: "Optimised hosting, on-page SEO and schema so Sheffield customers find you on Google." },
      { title: "Care Plans & Support", description: "Updates, backups, monitoring and support from the Sheffield team who built it." },
    ],
    whyHeading: ["Why Sheffield businesses", "choose us for WordPress."],
    why: [
      { title: "Bespoke, not a template.", description: "Every build is designed specifically for your business, so you don't look like every other site running the same theme." },
      { title: "Fast and built to last.", description: "Clean code and a lean plugin stack mean a site that loads quickly, ranks better and doesn't fall over on updates." },
      { title: "Local, and easy to reach.", description: "A Sheffield studio you can actually talk to, who set the site up around how you work and are here when you need a change." },
    ],
    faqHeading: "WordPress web design Sheffield",
    faqs: [
      { question: "Why choose bespoke WordPress over a template?", answer: "A template is a pre-made theme thousands of other sites also use, stretched to fit. A bespoke WordPress site is built from scratch around your brand and goals, so it's faster, more flexible, easier to edit and unmistakably yours." },
      { question: "Will I be able to edit it myself?", answer: "Yes. We build on WordPress because it's familiar and editable, and we set the dashboard up so you can update text, images and pages confidently without breaking the design. We're on hand if you'd rather we made changes too." },
      { question: "Isn't WordPress slow and insecure?", answer: "Theme-and-plugin sites can be. A bespoke build is the opposite: clean, lightweight code, a minimal plugin stack, hardened security and optimised hosting, so it loads fast and stays safe." },
      { question: "How much does WordPress web design cost in Sheffield?", answer: "It depends on scope and features. Builds are priced per project after a quick call. Book a free call and we'll give you a straight number, no pressure." },
    ],
    ctaHeadline: "Need WordPress web design in Sheffield?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your project needs and what it'll cost, no obligation.",
    serviceName: "WordPress Web Design Sheffield",
    serviceType: "Web design",
  },

  // ecommerce web design sheffield
  {
    slug: "ecommerce-web-design-sheffield",
    metaTitle: "Ecommerce Website Design Sheffield | Stores That Sell | AW Media",
    metaDescription:
      "Ecommerce website design in Sheffield. Custom Shopify and WooCommerce stores built to convert browsers into buyers, by an award-winning Sheffield studio. Book a free call.",
    tag: "Ecommerce Website Design · Sheffield",
    title: "Ecommerce website design",
    titleAccent: "Sheffield stores that actually sell.",
    headerDescription:
      "Ecommerce website design for Sheffield businesses. Custom Shopify and WooCommerce stores designed to look premium and turn browsers into buyers.",
    introHeading: ["An online store built", "to sell, not just to sit there."],
    introParas: [
      "AW Media handles ecommerce website design for Sheffield businesses, custom stores designed and built to sell. A store that looks like a default template with stock photos kills trust, and customers bounce before they ever reach the checkout. We build the opposite: online stores designed to convert.",
      "Whether you sell products, apparel, supplements or digital programmes, we design and build a store on Shopify or WooCommerce that matches the quality of what you sell, with every detail aimed at reducing friction and increasing sales.",
      "And it's not just the storefront. We set up the systems that make selling easier: payment, shipping and tax configured properly, abandoned cart recovery, subscriptions, and analytics that actually tell you what's working.",
    ],
    servicesHeading: ["What our Sheffield", "ecommerce website design covers."],
    services: [
      { title: "Custom Shopify & WooCommerce", description: "Bespoke online stores designed from scratch around your brand and products, never a stretched template." },
      { title: "Built to Convert", description: "Optimised product pages and a smooth checkout, designed to turn more browsers into buyers." },
      { title: "Payment, Shipping & Tax", description: "The full commercial setup configured properly, so selling online is frictionless from day one." },
      { title: "Subscriptions & Memberships", description: "Recurring revenue, digital products and memberships set up to run on autopilot." },
      { title: "Abandoned Cart Recovery", description: "Win back the sales that nearly happened, with automated recovery flows built in." },
      { title: "Local SEO & Speed", description: "Fast, technically sound stores with on-page SEO so Sheffield customers find and trust you." },
    ],
    whyHeading: ["Why Sheffield businesses", "choose us for ecommerce."],
    why: [
      { title: "Stores designed to sell.", description: "Every store is built around conversions: better product pages, smoother checkout, fewer abandoned carts." },
      { title: "The systems, not just the storefront.", description: "Payment, shipping, tax, subscriptions and analytics all set up properly, so the store runs smoothly behind the scenes." },
      { title: "Local studio, real support.", description: "A Sheffield team you can actually talk to, who built your store and are here when you need a change." },
    ],
    faqHeading: "ecommerce website design Sheffield",
    faqs: [
      { question: "Should I use Shopify or WooCommerce?", answer: "Both are excellent; the right choice depends on your products, volume and how you want to run things. Shopify is brilliant for most product businesses; WooCommerce suits those who want full control on WordPress. We'll recommend the best fit on a quick call." },
      { question: "Can you migrate my existing store?", answer: "Yes. We can migrate from Wix, Squarespace, an old WooCommerce or another platform across to a new store without losing your products, customers or order history." },
      { question: "How much does an ecommerce website cost in Sheffield?", answer: "It depends on how many products and features you need. Stores are priced per project after a quick call to understand your setup. Book a free call and we'll give you a straight number." },
      { question: "Do you only work with Sheffield businesses?", answer: "We're Sheffield-based and love working locally, but most of the process happens online, so we build stores for clients across the UK." },
    ],
    ctaHeadline: "Need an online store that actually sells?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your Sheffield store needs to convert, no obligation.",
    serviceName: "Ecommerce Web Design Sheffield",
    serviceType: "Web design",
  },

  // web design for coaches (national niche)
  {
    slug: "web-design-for-coaches",
    metaTitle: "Web Design for Coaches | Win More Clients | AW Media",
    metaDescription:
      "Web design for coaches and online trainers. Custom websites that turn followers into paying clients. We work with coaches daily. Book a free call.",
    tag: "Web Design · For Coaches",
    title: "Web design for coaches",
    titleAccent: "that turns followers into clients.",
    headerDescription:
      "Custom websites for coaches and online trainers, built to turn your audience into booked, paying clients. We work with coaches every single week.",
    introHeading: ["A coaching website that", "actually fills your client roster."],
    introParas: [
      "AW Media builds websites for coaches and online trainers, it's one of the biggest things we do. You've built an audience and a real method, but if your website doesn't convert that attention into enquiries, you're leaving clients and income on the table every day.",
      "Most coaching sites are either a DIY template that undersells the transformation you deliver, or a link in bio going nowhere. We build you a custom site that tells your story, proves your results, and makes signing up feel like the obvious next step.",
      "From lead-gen landing pages for your ads and launches to full sites with programmes, testimonials and booking built in, every page is designed around one job: turning followers and referrals into paying coaching clients.",
    ],
    servicesHeading: ["What our web design", "for coaches covers."],
    services: [
      { title: "Conversion-Focused Coaching Sites", description: "Custom-built sites that turn your audience into enquiries, with your offer, proof and next step crystal clear." },
      { title: "Lead-Gen Landing Pages", description: "High-converting pages for your ads, launches and lead magnets. Stop sending paid traffic to a link in bio." },
      { title: "Programme & Offer Pages", description: "Each coaching programme gets its own page with outcomes, pricing and a clear path to sign up." },
      { title: "Results & Testimonials", description: "Client transformations and reviews placed where they build trust and tip the decision your way." },
      { title: "Booking & Application Forms", description: "Make enquiring effortless, with application forms that also qualify leads before they reach you." },
      { title: "Branding & Social Graphics", description: "A logo, brand and on-brand social content so your whole presence looks as premium as your coaching." },
    ],
    whyHeading: ["Why coaches", "choose us for their websites."],
    why: [
      { title: "We work with coaches daily.", description: "Coaching is one of our biggest niches. We know how coaches sell, what builds trust, and what turns a follower into a paying client." },
      { title: "Built to convert, not just look good.", description: "A pretty coaching site that doesn't generate enquiries is a waste. Every page is designed around getting people to apply or book." },
      { title: "Fast, AI-accelerated or bespoke.", description: "Need it live before a launch? Our AI-accelerated lane gets you a premium coaching site in weeks, or go fully bespoke for the full treatment." },
    ],
    faqHeading: "web design for coaches",
    faqs: [
      { question: "Do you specialise in websites for coaches?", answer: "Yes. Coaches and online trainers are one of our biggest client groups, you can see plenty in our work. We understand how coaching businesses sell, so we build sites around the things that actually turn your audience into paying clients." },
      { question: "I just send people to my Instagram or link in bio. Do I even need a website?", answer: "A link in bio gives people nowhere to be convinced and nothing to commit to. A proper site tells your story, proves your results and makes signing up easy, so more of the audience you already have actually become clients." },
      { question: "Can you build a landing page for a launch or ad campaign?", answer: "Absolutely. We build high-converting lead-gen and launch pages designed specifically for paid traffic, so your ad spend turns into applications instead of bouncing off a homepage." },
      { question: "How much does a coaching website cost?", answer: "AI-accelerated builds start from £695 for a landing page, with full coaching sites priced by scope. Book a free call and we'll recommend exactly what your coaching business needs and what it'll cost." },
    ],
    ctaHeadline: "Want a website that fills your coaching roster?",
    ctaSubtext: "Book a free 15-minute call. We'll show you exactly how to turn your audience into paying clients, no obligation.",
    serviceName: "Web Design for Coaches",
    serviceType: "Web design",
  },

  // website redesign sheffield — existing-site-underperforming intent
  {
    slug: "website-redesign-sheffield",
    metaTitle: "Website Redesign Sheffield | Keep Your Rankings | AW Media",
    metaDescription:
      "Website redesign in Sheffield that keeps your Google rankings and fixes what's costing you enquiries. Award-winning studio since 2016. Free redesign review.",
    tag: "Website Redesign · Sheffield",
    title: "Website redesign Sheffield,",
    titleAccent: "without losing what you've built.",
    headerDescription:
      "Your site was fine five years ago. Now it's slow, dated and quietly losing you work. We redesign Sheffield websites so they look premium and convert again, while protecting the rankings and traffic you already have.",
    introHeading: ["A redesign that fixes the site,", "not just repaints it."],
    introParas: [
      "AW Media redesigns websites for Sheffield businesses whose current site has fallen behind. The signs are usually the same: it looks dated next to competitors, it's clunky on a phone, it takes forever to load, and the enquiries have slowed down. You don't need to start from zero, you need a redesign done properly.",
      "Done badly, a redesign can wreck the Google rankings you've spent years earning. We plan every redesign around protecting them: your existing pages are mapped and 301-redirected, your best-performing content is kept and improved, and the technical foundations come out stronger than before.",
      "The result is a site that looks like the business you are now, not the one you were when it launched: faster, sharper on mobile, and rebuilt around turning today's visitors into enquiries. AI-accelerated when you need it live fast, fully bespoke when the project calls for it.",
    ],
    servicesHeading: ["What a Sheffield website", "redesign includes."],
    services: [
      { title: "Full Design Refresh", description: "A modern, custom design that makes you look premium again, built around your brand as it is today." },
      { title: "Rankings Protected", description: "Every existing URL mapped and 301-redirected, best content kept, so you don't lose the Google positions you've earned." },
      { title: "Speed & Mobile Rebuild", description: "Redesigns ship on fast, technically clean foundations, because a slow site loses visitors before it loads." },
      { title: "Conversion Overhaul", description: "Clearer offers, stronger calls to action and smoother enquiry paths, so the new site actually wins more work." },
      { title: "Content Improved, Not Binned", description: "We rework the copy and pages that already earn traffic instead of throwing them away." },
      { title: "Measured Before & After", description: "Analytics on from day one, so you can see exactly what the redesign changed in traffic and enquiries." },
    ],
    whyHeading: ["Why Sheffield businesses", "trust us with redesigns."],
    why: [
      { title: "We protect what's working.", description: "A redesign should never cost you rankings or traffic. We map, redirect and preserve before we touch the design." },
      { title: "Honest about what needs fixing.", description: "Sometimes it's the whole site, sometimes it's five key pages. We'll tell you straight what's costing you enquiries and what isn't." },
      { title: "Before-and-after proof.", description: "500+ builds since 2016 and four years of back-to-back awards. We've redesigned sites in nearly every industry Sheffield has." },
    ],
    faqHeading: "Sheffield website redesign",
    faqs: [
      { question: "How do I know if my website needs a redesign?", answer: "The usual signs: it looks dated next to competitors, it's awkward on a phone, it loads slowly, you're embarrassed to send people to it, or enquiries have dropped while your traffic hasn't. If two or more of those sound familiar, a redesign will likely pay for itself." },
      { question: "Will a redesign hurt my Google rankings?", answer: "Done carelessly, yes, it's one of the most common ways businesses lose rankings. Done properly, no. We map every existing URL, set up 301 redirects, keep the content that's earning traffic and strengthen the technical foundations, so rankings are protected and usually improve." },
      { question: "Can you redesign my site without changing platforms?", answer: "Yes. If you're on WordPress and happy there, we redesign within it. If your platform is genuinely holding you back, we'll say so and explain why, but we never force a rebuild you don't need." },
      { question: "How much does a website redesign cost in Sheffield?", answer: "It depends how much of the site needs rework. AI-accelerated redesigns start from £695 for a landing page, with full site redesigns priced by scope. Book a free call and we'll review your current site and give you a straight number." },
    ],
    ctaHeadline: "Thinking about redesigning your website?",
    ctaSubtext: "Book a free 15-minute redesign review. We'll tell you exactly what's costing you enquiries and what to keep, no obligation.",
    serviceName: "Website Redesign Sheffield",
    serviceType: "Web design",
  },

  // logo design sheffield — pure logo intent (distinct from branding-agency +
  // graphic-designer pages: this one is cost/process/deliverables focused)
  {
    slug: "logo-design-sheffield",
    metaTitle: "Logo Design Sheffield | Professional Logo Designers | AW Media",
    metaDescription:
      "Professional logo design in Sheffield. A logo suite that works everywhere, with every file you'll ever need. Award-winning designers since 2016. Book a free call.",
    tag: "Logo Design · Sheffield",
    title: "Logo design Sheffield",
    titleAccent: "businesses are proud to put everywhere.",
    headerDescription:
      "Professional logo design for Sheffield businesses. Not one JPEG and a handshake: a full logo suite designed to work on your sign, your site, your van and your invoices, with every file you'll ever need.",
    introHeading: ["A logo is the one thing", "every customer sees."],
    introParas: [
      "AW Media designs logos for Sheffield businesses, and has done since 2016. Your logo is on everything: the van, the sign, the website, the invoice, the uniform. If it looks DIY, every one of those touchpoints quietly tells customers you're the cheap option. A professional logo flips that.",
      "We don't sell one JPEG and disappear. Every logo project delivers a full suite: primary logo, secondary versions, an icon mark, colour and mono variants, tested at every size from a favicon to a shop front. Plus every file format you or any printer will ever ask for.",
      "And because we're a design studio rather than a logo mill, your logo is drawn around your business: who you sell to, what you charge, who you're up against in Sheffield. Not pulled from a template site with the name swapped out.",
    ],
    servicesHeading: ["What our Sheffield", "logo design includes."],
    services: [
      { title: "Full Logo Suite", description: "Primary, secondary and icon versions, in colour, white and mono, so it works on every background and at every size." },
      { title: "Every File You'll Need", description: "Print-ready vectors, web files, favicons and social versions. No printer or web designer will ever catch you short." },
      { title: "Concepts, Not Guesswork", description: "You see multiple directions early and we refine your favourite, so you end up with a logo you're genuinely proud of." },
      { title: "Built On Your Market", description: "Designed around your customers and your competitors in Sheffield, so you look like the premium choice, not the budget one." },
      { title: "Brand Colours & Type", description: "The colours and fonts to use alongside your logo, so everything you make with it looks consistent." },
      { title: "Grow Into a Full Brand", description: "Start with a logo, extend to full brand guidelines, social templates or a matching website whenever you're ready." },
    ],
    whyHeading: ["Why Sheffield businesses", "get their logo from us."],
    why: [
      { title: "Designed, not generated.", description: "No AI logo dumps, no template packs, no crowdsourcing sites. A designer draws your mark around your business." },
      { title: "A suite, not a single file.", description: "You get every version and format upfront, so you're never paying again later for 'the white one' or 'the print file'." },
      { title: "Proven for nearly a decade.", description: "500+ brands and websites delivered since 2016, four years of back-to-back awards, and a 5.0 average client rating." },
    ],
    faqHeading: "Sheffield logo design",
    faqs: [
      { question: "How much does logo design cost in Sheffield?", answer: "Depends on depth. A professional logo suite is priced per project, and it's a one-off investment that shows up on everything your business puts out for years. Book a free call, tell us what you need, and we'll give you a straight number on the spot." },
      { question: "What do I actually receive at the end?", answer: "A complete logo suite: primary, secondary and icon marks in colour, white and mono, plus print-ready vector files, web-optimised files, favicons and social media versions. Everything you, a printer or a signwriter will ever ask for, delivered in one tidy package." },
      { question: "Can you redesign my existing logo instead of starting fresh?", answer: "Yes. If your current logo has recognition worth keeping, we refine and modernise it rather than bin it. You keep the equity you've built, it just stops looking dated." },
      { question: "Can you do the branding and website too?", answer: "Yes, and it's the strongest way to do it. Because we design brands and build websites under one roof, your logo, brand and site all pull in the same direction, with nothing lost between separate suppliers." },
    ],
    ctaHeadline: "Need a logo you're proud to put everywhere?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you honestly whether your current logo is helping or hurting, no obligation.",
    serviceName: "Logo Design Sheffield",
    serviceType: "Graphic design",
  },

  // local seo sheffield — map pack / GBP intent (distinct from seo-agency:
  // this is specifically about being found locally)
  {
    slug: "local-seo-sheffield",
    metaTitle: "Local SEO Sheffield | Get in the Map Pack | AW Media",
    metaDescription:
      "Local SEO in Sheffield: Google Business Profile, map pack rankings, reviews and local landing pages, so nearby customers find you first. Book a free call.",
    tag: "Local SEO · Sheffield",
    title: "Local SEO that puts you",
    titleAccent: "in front of Sheffield customers.",
    headerDescription:
      "When someone in Sheffield searches for what you do, three businesses get the map pack and most of the calls. Local SEO is how you become one of them.",
    introHeading: ["Be the business Sheffield", "finds first."],
    introParas: [
      "AW Media does local SEO for Sheffield businesses. Most local searches end the same way: the customer picks from the map pack or the first couple of results, and everyone below that gets nothing. If that's not you, local SEO is the fix, and it's usually faster to show results than people expect.",
      "Local SEO is its own discipline. It's your Google Business Profile set up and worked properly, reviews coming in steadily and answered, consistent business details across the web, and pages on your site that actually target the areas and services people search for.",
      "We handle all of it, and because we build websites too, the on-site half gets done properly rather than bolted on. No jargon, no vanity reports, just your business showing up when Sheffield customers are ready to buy.",
    ],
    servicesHeading: ["What our Sheffield", "local SEO covers."],
    services: [
      { title: "Google Business Profile", description: "Your profile fully built out, categorised and optimised, the single biggest lever for map pack rankings." },
      { title: "Map Pack Rankings", description: "The work that moves you into the top 3 local results, where the calls actually happen." },
      { title: "Reviews Engine", description: "A simple system for winning steady 5-star reviews and responding to them, the trust signal Google and customers both read." },
      { title: "Citations & Consistency", description: "Your name, address and phone number consistent across every directory that matters, so Google trusts your details." },
      { title: "Local Landing Pages", description: "Properly written pages for the services and areas you serve, built into your site's structure, not doorway spam." },
      { title: "Local Reporting", description: "Clear monthly reporting on map rankings, calls and direction requests, the numbers a local business actually cares about." },
    ],
    whyHeading: ["Why Sheffield businesses", "choose us for local SEO."],
    why: [
      { title: "Local search is winner-takes-most.", description: "The map pack takes the calls. We focus on the levers that get you in it: profile, reviews, citations and on-site signals." },
      { title: "Site and SEO under one roof.", description: "We build the websites we optimise, so technical fixes and local landing pages get done properly, not passed between suppliers." },
      { title: "We're a Sheffield business too.", description: "We rank for our own local terms in the same city you're competing in. The playbook we sell is the one we use." },
    ],
    faqHeading: "Sheffield local SEO",
    faqs: [
      { question: "What's the difference between SEO and local SEO?", answer: "SEO is about ranking your website in general search results. Local SEO is specifically about being found by customers near you: the Google map pack, 'near me' searches, your Business Profile and reviews. For most Sheffield service businesses, local SEO pays back fastest." },
      { question: "How do I get into the Google map pack in Sheffield?", answer: "Three things move it most: a fully optimised Google Business Profile with the right categories, a steady flow of genuine reviews, and consistent business details plus local relevance signals on your website. We work all three together, which is why it moves." },
      { question: "How long does local SEO take to work?", answer: "Usually quicker than national SEO. Profile and citation fixes can show movement within weeks, with map pack progress typically over 2 to 4 months depending on competition. You get clear monthly reports so you can see it moving." },
      { question: "Do I need local SEO if I already run ads?", answer: "Ads stop the moment you stop paying. Local SEO compounds: every review, citation and ranking you earn keeps working for free. Most of our clients run both, then wind ads down as the organic calls take over." },
    ],
    ctaHeadline: "Want Sheffield customers finding you first?",
    ctaSubtext: "Book a free 15-minute call. We'll check your map pack position live and tell you exactly what's holding you back, no obligation.",
    serviceName: "Local SEO Sheffield",
    serviceType: "Search engine optimization",
  },

  // landing page design (national, no city) — paid-traffic conversion intent
  {
    slug: "landing-page-design-uk",
    metaTitle: "Landing Page Design UK | Pages That Convert | AW Media",
    metaDescription:
      "High-converting landing page design from £695. Stop sending ad traffic to a homepage that doesn't sell. UK studio, award-winning since 2016. Book a free call.",
    tag: "Landing Page Design · UK",
    title: "Landing page design",
    titleAccent: "that makes your ad spend pay.",
    headerDescription:
      "You're paying for every click. A custom, conversion-focused landing page is the difference between ad spend that comes back as enquiries and ad spend that vanishes.",
    introHeading: ["Your ads aren't the problem.", "The page they land on is."],
    introParas: [
      "AW Media designs landing pages for UK businesses running ads, launches and campaigns. Here's the pattern we see constantly: decent ads, sensible targeting, and all of it pointed at a homepage that was never built to sell one thing. The clicks come in, the enquiries don't.",
      "A proper landing page does one job. One offer, one audience, one action, with the proof, the objections and the call to action all engineered around the traffic you're sending. No navigation to wander off through, no generic 'welcome to our website' waffle.",
      "Ours start at £695 and typically go live within days to a couple of weeks, so they pay for themselves quickly against any real ad budget. Design, copy structure, build, tracking, the lot: you just connect your ads.",
    ],
    servicesHeading: ["What our landing page", "design includes."],
    services: [
      { title: "Conversion-First Design", description: "Every section engineered around one action: enquire, book, buy. Built from what converts, not what looks trendy." },
      { title: "Copy Structure Included", description: "Hook, proof, objections, offer, CTA. We structure the page's argument, not just its pixels." },
      { title: "Built for Your Traffic", description: "A page matched to the ad and audience sending the clicks, because message-match is half of conversion." },
      { title: "Fast, Mobile-First Build", description: "Most paid traffic is on a phone. Your page loads fast and converts on the small screen first." },
      { title: "Tracking Wired In", description: "Pixels, analytics and conversion events set up properly, so you know your exact cost per lead." },
      { title: "Test & Iterate", description: "Landing pages are never finished. We refine headlines, offers and layout based on what the data says." },
    ],
    whyHeading: ["Why businesses use us", "for landing pages."],
    why: [
      { title: "From £695, live in days.", description: "AI-accelerated builds mean a genuinely custom, conversion-built page without agency lead times or agency invoices." },
      { title: "We've built hundreds.", description: "Coaches, trades, clinics, ecommerce, SaaS: 500+ projects since 2016 means we already know what converts in your space." },
      { title: "Judged on your numbers.", description: "A landing page has one honest metric: conversion rate. That's what we design for and what we report on." },
    ],
    faqHeading: "landing page design",
    faqs: [
      { question: "What makes a landing page different from a normal web page?", answer: "Focus. A landing page strips out navigation and distractions and makes one offer to one audience with one action. That focus is why a good landing page converts several times better than a homepage for paid traffic." },
      { question: "How much does landing page design cost?", answer: "Our AI-accelerated landing pages start from £695, custom-designed and built, with tracking set up. If you're spending any real money on ads, it typically pays for itself within the first campaign." },
      { question: "How quickly can my landing page go live?", answer: "Days to a couple of weeks depending on scope, not months. If you've got a launch or campaign date, tell us and we'll work to it." },
      { question: "Can you write the copy as well?", answer: "We structure the page's full argument: headline, proof, objection-handling and calls to action, working from your offer and customer knowledge. You review and refine the words with us, so it sounds like you but sells properly." },
    ],
    ctaHeadline: "Ready to stop wasting ad clicks?",
    ctaSubtext: "Book a free 15-minute call. We'll look at where your ads land today and tell you what's leaking, no obligation.",
    serviceName: "Landing Page Design",
    serviceType: "Web design",
  },

  // web design for small businesses (national, no city)
  {
    slug: "web-design-for-small-businesses-uk",
    metaTitle: "Web Design for Small Businesses UK | From £695 | AW Media",
    metaDescription:
      "Web design for small businesses across the UK. Custom, professional websites from £695, built to win work, not a DIY template. Award-winning since 2016.",
    tag: "Web Design · Small Businesses UK",
    title: "Web design for small businesses",
    titleAccent: "that look anything but small.",
    headerDescription:
      "Custom websites for UK small businesses, from £695. Look established, get found on Google and turn visitors into customers, without the five-figure agency invoice or the DIY template look.",
    introHeading: ["The third option between", "'too expensive' and 'too cheap'."],
    introParas: [
      "AW Media builds websites for small businesses across the UK. Every small business owner hits the same fork: agencies quoting five figures you can't justify, or DIY builders that leave you with a template site that looks like ten thousand others. We built our AI-accelerated lane specifically to be the third option.",
      "From £695 you get a genuinely custom website: designed around your business, fast, professional on mobile and built to make you look bigger and more established than you are. That perception gap is real money, it's the difference between winning the job and losing it to a competitor with a sharper site.",
      "And you're not left on your own after launch. Hosting, security, updates and honest support from real people, plus SEO foundations done properly so customers actually find you. Wherever you are in the UK, the whole process happens comfortably online.",
    ],
    servicesHeading: ["What small businesses", "get with us."],
    services: [
      { title: "Custom Sites From £695", description: "Genuinely custom design at small business prices. Never a template with your logo dropped in." },
      { title: "Look Established From Day One", description: "Design that makes a one-person band look like the professional outfit customers trust with their money." },
      { title: "Found on Google", description: "SEO foundations, speed and local signals built in, so nearby customers find you, not just the big players." },
      { title: "Works Perfectly on Phones", description: "Most of your customers will only ever see your site on a mobile. It's designed for that screen first." },
      { title: "Enquiries Made Easy", description: "Clear calls, booking and enquiry forms, so interested visitors become actual leads instead of drifting off." },
      { title: "Plain-English Support", description: "Real people, no jargon, no call centre. We handle the tech so you can run your business." },
    ],
    whyHeading: ["Why UK small businesses", "choose AW Media."],
    why: [
      { title: "Priced for small businesses.", description: "AI acceleration cuts our build time, not our quality. You get the saving, and a site you'd swear cost five times more." },
      { title: "500+ small businesses served.", description: "Trades, coaches, clinics, shops, studios: since 2016 small businesses have been the heart of what we do." },
      { title: "Honest advice first.", description: "We'll tell you what your business actually needs, even when that's less than you expected to spend." },
    ],
    faqHeading: "small business web design",
    faqs: [
      { question: "How much does a small business website cost in the UK?", answer: "Our AI-accelerated builds start from £695 for a landing page, with full small business websites priced by scope. Every one is custom-designed, not a template. Book a free call and we'll give you a straight number for exactly what you need." },
      { question: "Why not just use Wix or Squarespace?", answer: "You can, and for some businesses it's fine. But DIY builders cap how professional you look, load slower, and rank harder, and your time costs money too. Most owners who come to us tried DIY first and found it quietly costing them customers." },
      { question: "Do you work with businesses anywhere in the UK?", answer: "Yes. We're based in Sheffield and love working locally, but the whole process runs comfortably online: calls, previews, feedback and launch. We build for small businesses right across the UK." },
      { question: "What happens after the site goes live?", answer: "We don't vanish. Hosting, security, backups and updates are handled, and when you need changes there's a real person on the end of the phone who already knows your site." },
    ],
    ctaHeadline: "Ready for a website that wins you work?",
    ctaSubtext: "Book a free 15-minute call. We'll tell you exactly what your small business needs online and what it costs, no obligation.",
    serviceName: "Web Design for Small Businesses",
    serviceType: "Web design",
  },

  // ai web design (national head term) — education + conversion intent
  {
    slug: "ai-web-design",
    metaTitle: "AI Web Design | Custom Websites in Weeks, From £695 | AW Media",
    metaDescription:
      "AI web design done properly: designer-led, AI-accelerated custom websites live in weeks, from £695. What it is, how it works and what it costs. UK studio since 2016.",
    tag: "AI Web Design · UK",
    title: "AI web design, done by",
    titleAccent: "designers, not just prompts.",
    headerDescription:
      "AI web design is how a premium, custom website gets built in weeks instead of months, for a fraction of traditional agency cost. Here's what it actually is, how we use it, and what it means for your business.",
    introHeading: ["What AI web design is,", "and what it definitely isn't."],
    introParas: [
      "AW Media is a UK web design studio that builds AI into every stage of design and development. Let's be straight about what that means, because 'AI web design' covers everything from 30-second site generators to what we do, and the difference is enormous.",
      "The 30-second AI site is a template with the blanks filled in: generic, unbranded and identical to thousands of others. Ours is the opposite: a designer leads every project and makes every creative call, while AI handles the slow, repetitive parts of the build. You get a genuinely custom website in weeks rather than months, and the time saved comes off your invoice, not the quality.",
      "The result: fast to load, built to rank on Google, designed around turning your visitors into enquiries, and unmistakably yours. From £695 for a landing page, with full websites and stores priced by scope. That's AI web design done properly.",
    ],
    servicesHeading: ["What AI web design", "delivers with us."],
    services: [
      { title: "Custom Design, AI Speed", description: "AI accelerates concepts, layouts and production. A human designer directs all of it, so nothing generic ships." },
      { title: "Live in Weeks, Not Months", description: "Most AI-accelerated builds go live in 2 to 6 weeks. Your website starts earning instead of sitting in a project queue." },
      { title: "Costs Less Than Traditional", description: "You're not billed for weeks of manual production. The same premium result, from £695." },
      { title: "SEO & Speed Built In", description: "Fast, technically clean builds with on-page SEO from day one, ready to rank, not retrofitted." },
      { title: "Built to Convert", description: "Every page designed around the action you want visitors to take: call, book, buy." },
      { title: "Bespoke When You Need It", description: "Bigger project? Our fully bespoke lane adds deep strategy and craft. Two lanes, one standard." },
    ],
    whyHeading: ["Why businesses choose", "AI-accelerated web design."],
    why: [
      { title: "The economics just work.", description: "Agency-quality custom design at a price and timeline that used to be impossible. The AI saving is passed to you." },
      { title: "A designer signs everything off.", description: "AI is our tool, not our designer. Every decision that reaches you has been made or approved by a human who does this for a living." },
      { title: "Proven at 500+ projects.", description: "We've been building websites since 2016 and building AI into the process for years, award-winning work, 5.0 average rating." },
    ],
    faqHeading: "AI web design",
    faqs: [
      { question: "What is AI web design?", answer: "It's using AI tools through the design and build process: generating concepts, drafting layouts, structuring content and producing imagery, so a custom website comes together in a fraction of the traditional time. Done properly, a designer leads it all. Done lazily, it's a template generator. Always ask which one you're buying." },
      { question: "Will an AI-designed website look generic?", answer: "A generated one will. A designer-led one won't. Every site we ship is custom to your brand and audience, AI just lets us explore more directions faster and skip the slow production work. No two clients have ever received the same site." },
      { question: "How much does AI web design cost?", answer: "From £695 for a custom landing page, with full websites and online stores priced by scope, typically well under traditional agency pricing because we're not billing weeks of manual work. Book a free call for a straight number." },
      { question: "Is AI web design good for SEO?", answer: "The build method doesn't decide SEO, the build quality does. Our AI-accelerated sites ship fast, technically clean and with on-page SEO done properly, which is exactly what Google rewards. What hurts SEO is thin, generic auto-generated content, which is the version we don't sell." },
    ],
    ctaHeadline: "Want to see what AI web design really looks like?",
    ctaSubtext: "Book a free 15-minute call. We'll show you real builds, real timelines and a straight price for yours, no obligation.",
    serviceName: "AI Web Design",
    serviceType: "Web design",
  },
];

export const landingPages: LandingPageData[] = [
  ...CITIES.flatMap((city) => VARIANTS.map((build) => build(city))),
  ...extraPages,
];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return landingPages.find((p) => p.slug === slug);
}
