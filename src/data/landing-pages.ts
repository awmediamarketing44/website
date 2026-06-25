// Hidden SEO landing pages — standalone, conversion-focused pages built around
// specific local ranking terms (web design agency, web design companies,
// branding agency, small business web design, [city] web design). Each lives at
// its own top-level URL (e.g. /web-design-agency-sheffield), NOT under
// /locations.
//
// "Hidden" = not linked from the nav or footer anywhere on the site. They ARE
// indexable (no noindex) and listed in sitemap.ts so Google discovers and ranks
// them for their target terms. Reachable only by direct URL or via search.
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
];

// ── Keyword-variant builders ────────────────────────────────────────────────
// Each returns the full LandingPageData for a given city.

function webDesignAgency(c: City): LandingPageData {
  return {
    slug: `web-design-agency-${c.slug}`,
    metaTitle: `Web Design Agency ${c.name} | AW Media`,
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
}

function webDesignCompanies(c: City): LandingPageData {
  return {
    slug: `web-design-companies-${c.slug}`,
    metaTitle: `Web Design Companies ${c.name} | AW Media`,
    metaDescription: `Comparing web design companies in ${c.name}? AW Media builds custom, conversion-focused websites that win work. Award-winning, since 2016. Book a free call.`,
    tag: `Web Design Companies · ${c.name}`,
    title: `One of ${c.name}'s leading`,
    titleAccent: "web design companies.",
    headerDescription: `Comparing web design companies in ${c.name}? AW Media builds custom, conversion-led websites that compete with any agency in the country, without the inflated price tag.`,
    introHeading: [`Not all ${c.name} web design`, "companies are the same."],
    introParas: [
      `There are plenty of web design companies in ${c.name}, and most of them are reaching for the same templates and page builders. The result is a sea of websites that look almost identical and quietly cost their owners enquiries. AW Media is the alternative.`,
      `We've been building websites for ${c.name} businesses since 2016, every one custom-designed from scratch around the brand and its customers. We're small enough to genuinely care about your project and good enough to compete with any larger company on quality.`,
      `When you weigh up web design companies in ${c.name}, look past the price and ask one thing: will this site actually bring in business? That's the only question we build around, with AI-accelerated or fully bespoke options to suit your budget and timeline.`,
    ],
    servicesHeading: ["What you get when you", "choose us over the rest."],
    services: [
      { title: "Custom Websites, Never Templates", description: "Every site designed and built from scratch. No themes, no two clients with the same layout, no compromise." },
      { title: "Conversion-Led Design", description: "We design around the actions you want visitors to take, so your site earns its keep instead of just sitting there." },
      { title: "E-commerce & Online Stores", description: "Premium stores with payment, shipping and tax fully configured, built to convert browsers into buyers." },
      { title: "SEO Built In", description: `Fast, technically sound sites with on-page SEO so ${c.name} customers find you first.` },
      { title: "Branding & Logo Design", description: "Full brand identities and logos so you look like the premium choice from the first impression." },
      { title: "Honest, Ongoing Support", description: "Real support from the people who built your site, not a faceless ticket queue." },
    ],
    whyHeading: [`Why ${c.name} businesses`, "pick us over other companies."],
    why: [
      { title: "Boutique care, agency quality.", description: "You deal directly with the people building your site. No account managers, no being passed around, no losing your project in a queue." },
      { title: "Every site custom-built.", description: "We don't recycle templates between clients. Your website is designed specifically for your business and nobody else's." },
      { title: "Proven track record since 2016.", description: "500+ websites and brands delivered, four years of back-to-back awards, and a 5.0 average rating. The work speaks for itself." },
    ],
    faqHeading: `${c.name} web design company`,
    faqs: [
      { question: `How do I choose between web design companies in ${c.name}?`, answer: "Look past the headline price and ask whether the site is custom-built and designed to convert. Check their recent work, ask who you'll actually be dealing with day to day, and make sure SEO and speed are part of the build, not paid extras." },
      { question: "Are you a big agency or a small company?", answer: `We're a boutique ${c.region} studio, which means you deal directly with the people building your site and your project gets real attention. We deliver to the same standard as much larger companies, without the overheads or the price tag.` },
      { question: "How much do your websites cost?", answer: "AI-accelerated builds start from £695 for a landing page, with full sites and stores priced by scope. Bespoke builds include deeper strategy and craft. Book a free call for a straight, no-pressure quote." },
      { question: `Do you work with businesses outside ${c.name}?`, answer: "Yes. We're South Yorkshire-based but work with clients across the wider UK. Most of the process happens online, so location is never a barrier." },
    ],
    ctaHeadline: `Comparing web design companies in ${c.name}?`,
    ctaSubtext: "Book a free 15-minute call before you decide. We'll give you honest advice on what your business actually needs, no obligation.",
    serviceName: `Web Design Company ${c.name}`,
    serviceType: "Web design",
  };
}

function brandingAgency(c: City): LandingPageData {
  return {
    slug: `branding-agency-${c.slug}`,
    metaTitle: `Branding Agency ${c.name} | Logo & Brand Design | AW Media`,
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
    metaTitle: `${c.name} Web Design | Custom Sites That Convert | AW Media`,
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

const VARIANTS: ((c: City) => LandingPageData)[] = [
  webDesignAgency,
  webDesignCompanies,
  brandingAgency,
  smallBusiness,
  cityWebDesign,
];

// One-off pages that don't fit the city × variant matrix (city-specific niche
// keywords, or national service keywords with no city).
const extraPages: LandingPageData[] = [
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
];

export const landingPages: LandingPageData[] = [
  ...CITIES.flatMap((city) => VARIANTS.map((build) => build(city))),
  ...extraPages,
];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return landingPages.find((p) => p.slug === slug);
}
