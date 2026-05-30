// Location landing pages — recreated from the legacy WordPress site.
// Old URLs were /locations/freelance-web-designer-[city]/. We've rebranded to
// agency language at /locations/web-design-[city]/ and 301 the old freelance
// URLs to these (see .htaccess). Hidden from main nav, linked from the footer
// + the /locations index.

export interface LocationData {
  slug: string; // e.g. "web-design-sheffield"
  city: string; // e.g. "Sheffield"
  region: string; // e.g. "South Yorkshire"
  nearby: string[]; // nearby towns for local relevance + interlinking copy
  blurb: string; // short line used on the /locations index card
}

// Sheffield is home base — referenced in the shared copy.
export const HOME_CITY = "Sheffield";

export const locations: LocationData[] = [
  {
    slug: "web-design-sheffield",
    city: "Sheffield",
    region: "South Yorkshire",
    nearby: ["Rotherham", "Chesterfield", "Barnsley", "Doncaster"],
    blurb: "Our home turf. Web design, branding and SEO for Sheffield businesses.",
  },
  {
    slug: "web-design-rotherham",
    city: "Rotherham",
    region: "South Yorkshire",
    nearby: ["Sheffield", "Barnsley", "Doncaster"],
    blurb: "Websites that win work for Rotherham businesses.",
  },
  {
    slug: "web-design-barnsley",
    city: "Barnsley",
    region: "South Yorkshire",
    nearby: ["Sheffield", "Rotherham", "Wakefield"],
    blurb: "Modern, conversion-led websites for Barnsley businesses.",
  },
  {
    slug: "web-design-chesterfield",
    city: "Chesterfield",
    region: "Derbyshire",
    nearby: ["Sheffield", "Dronfield", "Mansfield"],
    blurb: "Premium web design on Chesterfield's doorstep.",
  },
  {
    slug: "web-design-leeds",
    city: "Leeds",
    region: "West Yorkshire",
    nearby: ["Bradford", "Wakefield", "Harrogate"],
    blurb: "Standout websites for ambitious Leeds businesses.",
  },
  {
    slug: "web-design-manchester",
    city: "Manchester",
    region: "Greater Manchester",
    nearby: ["Salford", "Stockport", "Bolton"],
    blurb: "Web design and branding for Manchester businesses.",
  },
  {
    slug: "web-design-liverpool",
    city: "Liverpool",
    region: "Merseyside",
    nearby: ["Birkenhead", "St Helens", "the Wirral"],
    blurb: "Websites built to convert for Liverpool businesses.",
  },
  {
    slug: "web-design-birmingham",
    city: "Birmingham",
    region: "the West Midlands",
    nearby: ["Solihull", "Wolverhampton", "Dudley"],
    blurb: "Custom web design for Birmingham businesses.",
  },
  {
    slug: "web-design-newcastle",
    city: "Newcastle",
    region: "Tyne and Wear",
    nearby: ["Gateshead", "Sunderland", "Durham"],
    blurb: "Sharp, modern websites for Newcastle businesses.",
  },
  {
    slug: "web-design-glasgow",
    city: "Glasgow",
    region: "Scotland",
    nearby: ["Paisley", "Clydebank", "East Kilbride"],
    blurb: "Web design and branding for Glasgow businesses.",
  },
  {
    slug: "web-design-livingston",
    city: "Livingston",
    region: "West Lothian",
    nearby: ["Edinburgh", "Bathgate", "Broxburn"],
    blurb: "Conversion-led websites for Livingston businesses.",
  },
  {
    slug: "web-design-torquay",
    city: "Torquay",
    region: "Devon",
    nearby: ["Paignton", "Newton Abbot", "Brixham"],
    blurb: "Premium web design for Torquay businesses.",
  },
  {
    slug: "web-design-devon",
    city: "Devon",
    region: "the South West",
    nearby: ["Exeter", "Plymouth", "Torquay"],
    blurb: "Websites that stand out across Devon.",
  },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}

// ---- Shared content, with the city interpolated for local relevance ----

export function metaTitle(loc: LocationData): string {
  return `Web Designer ${loc.city} | Web Design Agency | AW Media`;
}

export function metaDescription(loc: LocationData): string {
  return `Award-winning web design, branding and SEO for ${loc.city} businesses. AI-accelerated or fully bespoke websites built to convert. Book a free call with AW Media.`;
}

export function headerDescription(loc: LocationData): string {
  const isHome = loc.city === HOME_CITY;
  return isHome
    ? `${loc.region}-based and proud of it. We've built hundreds of websites for businesses across ${loc.city} and beyond — designed to look sharp and turn visitors into customers.`
    : `Web design, branding and SEO for businesses in ${loc.city} and across ${loc.region}. We're a ${HOME_CITY}-based studio that works with clients all over the UK — and we'd love to work with you.`;
}

export function intro(loc: LocationData): string[] {
  const isHome = loc.city === HOME_CITY;
  const nearbyList = formatList(loc.nearby);

  if (isHome) {
    return [
      `AW Media is a ${loc.region} web design and branding studio, born and based in ${loc.city}. For nearly a decade we've built websites for ${loc.city} businesses that don't just look the part — they bring in the enquiries.`,
      `We started out in fitness and have since worked with trades, clinics, e-commerce brands, photographers and professional services right across ${loc.city}, ${nearbyList} and the wider region. Local enough to meet for a coffee, good enough to compete with any agency in the country.`,
      `Whether you need a fast AI-accelerated build or a fully bespoke website with the full strategy treatment, you get the same thing: custom design, never a template, built to convert.`,
    ];
  }

  return [
    `Looking for a web designer in ${loc.city}? AW Media builds modern, conversion-focused websites for businesses across ${loc.city} and ${loc.region}. We're based in ${HOME_CITY}, but distance has never mattered — we work with clients all over the UK and most of the process happens online anyway.`,
    `From sole traders to established companies, we help ${loc.city} businesses look more professional online than their competitors and turn more of their visitors into paying customers. No templates, no jargon, no agency waffle. Just a website that does its job.`,
    `We also cover ${nearbyList} and the surrounding ${loc.region} area. Two ways to work with us: AI-accelerated for speed and value, or fully bespoke when strategy and depth matter.`,
  ];
}

export const locationStats = [
  { value: "Est. 2016", label: "nearly a decade in business" },
  { value: "500+", label: "websites designed & built" },
  { value: "4x", label: "back-to-back award winners" },
  { value: "UK-wide", label: "clients in every region" },
];

export function whyChoose(loc: LocationData): { title: string; description: string }[] {
  return [
    {
      title: "Local understanding, national standard.",
      description: `We know what works for ${loc.city} businesses, and we build to a standard that competes with any agency in the country — without the agency price tag.`,
    },
    {
      title: "Custom design, never templated.",
      description: `Every site is designed around your brand and your customers. No off-the-shelf themes that look like every other business in ${loc.city}.`,
    },
    {
      title: "Built to convert, not just to look pretty.",
      description: "A beautiful website that doesn't generate enquiries is a waste of money. We design around the actions you want visitors to take.",
    },
  ];
}

export const locationServices = [
  { title: "Web Design & Development", description: "Custom websites built to look premium and convert visitors into customers. AI-accelerated or fully bespoke." },
  { title: "Logo Design & Branding", description: "Logos, brand identities and guidelines that make you the obvious premium choice in your market." },
  { title: "SEO & Website Support", description: "Get found on Google and stay fast, secure and up to date with ongoing support packages." },
  { title: "E-commerce & Online Stores", description: "Premium online stores built to sell, with payment, shipping and tax fully configured." },
  { title: "Landing Pages", description: "High-converting pages built specifically for your ad traffic. Stop sending paid clicks to your homepage." },
  { title: "Social Media Graphics", description: "On-brand templates and graphics that make your feed look as professional as your business." },
];

export function faqs(loc: LocationData): { question: string; answer: string }[] {
  return [
    {
      question: `Do you work with businesses in ${loc.city}?`,
      answer: `Absolutely. We work with businesses across ${loc.city}, ${formatList(loc.nearby)} and the wider ${loc.region} area — as well as clients all over the UK. Most of the design process happens online, so wherever you are, it's easy to work together.`,
    },
    {
      question: "Do we need to meet in person?",
      answer: `Only if you want to. We're ${HOME_CITY}-based and happy to meet local clients, but the vast majority of our work is done over calls, email and Loom videos. It keeps things fast and means we can work with great businesses wherever they are.`,
    },
    {
      question: "How much does a website cost?",
      answer: "It depends on scope and which lane you choose. AI-accelerated builds start from £695 for a landing page, with full websites and online stores priced accordingly. Bespoke builds include strategy and deeper craft. Book a free call and we'll give you a straight number.",
    },
    {
      question: "How long does it take?",
      answer: "AI-accelerated builds ship in 2 to 6 weeks depending on scope. Fully bespoke builds run 4 to 10 weeks. We'll give you a clear timeline before we start and we stick to it.",
    },
  ];
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
