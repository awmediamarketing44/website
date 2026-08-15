// Data for the standalone comparison / decision pages. These are table-first
// pages built to answer high-intent buyer questions ("AW Media vs an agency",
// "how much does a website cost", "Wix vs a professional build") in the format
// AI answer engines cite most: a clear answer sentence, a key-takeaways list,
// and a real semantic comparison table, each backed by FAQPage JSON-LD.
//
// They are deliberately distinct from the editorial blog posts on similar
// topics: table-first here, long-form there, cross-linked via `related`.

export interface ComparisonRow {
  feature: string;
  // One entry per data column (i.e. table.columns minus the first row-header column).
  cells: string[];
}

export interface ComparisonData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  tag: string;
  title: string;
  titleAccent: string;
  headerDescription: string;
  // Answer-first paragraph: the single most quotable, extractable summary.
  answer: string;
  takeaways: string[];
  table: {
    caption: string;
    // columns[0] labels the row-header column; the rest label the data columns.
    columns: string[];
    rows: ComparisonRow[];
  };
  faqs: { question: string; answer: string }[];
  related?: { label: string; href: string };
}

export const comparisons: ComparisonData[] = [
  {
    slug: "aw-media-vs-typical-agency",
    metaTitle:
      "AW Media vs a Typical Web Design Agency | Compared | AW Media",
    metaDescription:
      "How AW Media compares to a typical UK web design agency on turnaround, pricing, support and process. Custom design at AI-accelerated speed, since 2016.",
    tag: "Comparison",
    title: "AW Media vs a",
    titleAccent: "typical agency.",
    headerDescription:
      "How we stack up against a standard UK web design agency on the things that actually matter: speed, price, support and whether the work is genuinely custom.",
    answer:
      "AW Media is a Sheffield-based UK web design studio that delivers fully custom websites in 2 to 6 weeks on its AI-accelerated lane, where a typical agency takes 8 to 12 weeks and often starts from a template. We publish our pricing (websites from £1,495), you talk directly to the people building your site, and we have shipped 450+ websites since 2016.",
    takeaways: [
      "Turnaround: 2 to 6 weeks with AW Media, versus 8 to 12 weeks at a typical agency.",
      "Pricing is published up front, not hidden behind a sales call.",
      "You deal with the people building your site, not an account manager.",
      "Every build is custom designed. Never a template.",
    ],
    table: {
      caption:
        "AW Media compared with a typical UK web design agency across turnaround, pricing, design, support and track record.",
      columns: ["Factor", "AW Media", "Typical agency"],
      rows: [
        {
          feature: "Turnaround",
          cells: ["2 to 6 weeks (AI-accelerated lane)", "8 to 12 weeks"],
        },
        {
          feature: "Pricing",
          cells: [
            "Published up front. Websites from £1,495",
            "Quote only, after a sales call",
          ],
        },
        {
          feature: "Design",
          cells: ["Custom, never templated", "Often theme or template based"],
        },
        {
          feature: "Who you deal with",
          cells: [
            "The people building your site",
            "An account manager in between",
          ],
        },
        {
          feature: "Post-launch support",
          cells: [
            "14 to 30 days included, retainer optional",
            "Often billed per change",
          ],
        },
        {
          feature: "Track record",
          cells: ["450+ sites since 2016, 4x award winner", "Varies"],
        },
        {
          feature: "Based",
          cells: ["Sheffield, UK. Clients UK-wide", "Varies, sometimes offshore"],
        },
      ],
    },
    faqs: [
      {
        question: "Is AW Media cheaper than a typical agency?",
        answer:
          "Usually, yes, and the pricing is transparent. Our AI-accelerated websites start from £1,495 with the price published up front, where many agencies quote several thousand only after a sales call. The saving comes from a faster process, not cheaper work.",
      },
      {
        question: "Does faster mean lower quality?",
        answer:
          "No. The AI-accelerated lane uses AI to speed up production, not to design your site. The design is still custom and human-led. If a project needs deep strategy we use the bespoke lane instead.",
      },
      {
        question: "Will I get a template like some agencies use?",
        answer:
          "Never. Every AW Media site is custom designed around your brand. We do not use off-the-shelf themes.",
      },
      {
        question: "Do you work with businesses outside Sheffield?",
        answer:
          "Yes. We are based in Sheffield but work with clients across the UK. Everything runs remotely with calls, screen-shares and a shared project space.",
      },
    ],
    related: {
      label: "Read: freelance web designer vs agency, which is right for you",
      href: "/blog/freelance-web-designer-vs-agency-sheffield",
    },
  },
  {
    slug: "website-cost-uk",
    metaTitle:
      "How Much Does a Website Cost in the UK? | 2026 Prices | AW Media",
    metaDescription:
      "What a website costs in the UK in 2026 by type: landing page, business website and online store. AW Media prices from £695, published up front.",
    tag: "Pricing",
    title: "How much does a",
    titleAccent: "website cost?",
    headerDescription:
      "A straight answer with real numbers: what a landing page, a full business website and an online store cost in the UK in 2026, and what changes the price.",
    answer:
      "In the UK in 2026, a professional one-page landing page typically costs from around £695, a full business website from around £1,495, and an online store from around £2,495. AW Media publishes these as starting prices on both its AI-accelerated and bespoke lanes, so you can see the cost before you book a call.",
    takeaways: [
      "Landing page: from £695 (AI-accelerated) or £1,200 (bespoke).",
      "Business website: from £1,495 (AI-accelerated) or £2,500 (bespoke).",
      "Online store: from £2,495 (AI-accelerated) or £3,995 (bespoke).",
      "Price is driven by scope, page count and features, not by how long an agency wants to take.",
    ],
    table: {
      caption:
        "Typical UK website cost in 2026 by project type, showing AW Media AI-accelerated and bespoke starting prices and turnaround.",
      columns: [
        "Project type",
        "AI-accelerated lane",
        "Bespoke lane",
        "Typical turnaround",
      ],
      rows: [
        {
          feature: "Landing page",
          cells: ["from £695", "from £1,200", "2 to 4 weeks"],
        },
        {
          feature: "Business website",
          cells: ["from £1,495", "from £2,500", "2 to 6 weeks"],
        },
        {
          feature: "Online store",
          cells: ["from £2,495", "from £3,995", "3 to 8 weeks"],
        },
      ],
    },
    faqs: [
      {
        question: "Why is there such a range in website prices?",
        answer:
          "Scope. A one-page landing site is far quicker to build than a ten-page site with e-commerce, bookings or memberships. Page count, custom features and the amount of copywriting and photography needed are the biggest drivers.",
      },
      {
        question: "Why is the AI-accelerated lane cheaper?",
        answer:
          "Because AI speeds up production, so the same custom design takes us less time to build. It is not a template and it is not lower quality, it is a faster process, and we pass the saving on.",
      },
      {
        question: "Are there ongoing costs after launch?",
        answer:
          "Hosting, a domain and optional support. We offer a monthly plan that covers hosting, security, updates and small content changes, so you are not billed for every tweak.",
      },
      {
        question: "Do you offer payment in stages?",
        answer:
          "Yes. Most projects are split across a deposit and one or more stage payments. We set this out clearly in your quote before any work starts.",
      },
    ],
    related: {
      label: "Read the full UK website cost breakdown",
      href: "/blog/how-much-does-a-website-cost-uk",
    },
  },
  {
    slug: "wix-vs-professional-web-design",
    metaTitle:
      "Wix and DIY vs a Professional Website | Which Wins? | AW Media",
    metaDescription:
      "Wix and DIY builders versus a professionally built website, compared on cost over time, SEO, speed, conversion and ownership. When DIY is fine and when it costs you.",
    tag: "Comparison",
    title: "Wix and DIY vs a",
    titleAccent: "professional build.",
    headerDescription:
      "When a DIY builder like Wix is genuinely fine, and when it quietly costs you leads. Compared on price, SEO, speed, conversion and who owns the result.",
    answer:
      "A DIY builder like Wix is cheaper up front and fine for a simple placeholder, but a professionally built website usually wins on speed, SEO, conversion and long-term cost once your business relies on it to bring in leads. AW Media builds custom sites from £1,495 that are faster and easier to rank than a typical drag-and-drop build.",
    takeaways: [
      "Wix is cheaper to start but limited on speed, SEO and custom design.",
      "A professional build is designed to turn visitors into enquiries.",
      "You own a professionally built site outright, with no platform lock-in.",
      "DIY is fine as a placeholder. It costs you once the site has to sell.",
    ],
    table: {
      caption:
        "Wix and DIY website builders compared with a professional custom build from AW Media across cost, design, speed, SEO, conversion and ownership.",
      columns: ["Factor", "Wix / DIY builder", "Professional build (AW Media)"],
      rows: [
        {
          feature: "Upfront cost",
          cells: ["Low, monthly subscription", "From £1,495 one-off"],
        },
        {
          feature: "Design",
          cells: ["Template-based, limited", "Fully custom to your brand"],
        },
        {
          feature: "Site speed",
          cells: ["Often slow, heavy code", "Optimised, fast-loading"],
        },
        {
          feature: "SEO and AI search",
          cells: [
            "Basic, hard to fine-tune",
            "Structured for Google and AI search",
          ],
        },
        {
          feature: "Conversion",
          cells: ["Generic layouts", "Designed to win enquiries"],
        },
        {
          feature: "Ownership",
          cells: ["Locked to the platform", "You own it outright"],
        },
        {
          feature: "Your time",
          cells: ["You build and maintain it", "We build it, you run the business"],
        },
      ],
    },
    faqs: [
      {
        question: "Is Wix ever the right choice?",
        answer:
          "Yes, for a quick placeholder, a hobby project or testing an idea on a tiny budget. Once the website is a real part of how you win customers, a professional build almost always pays for itself.",
      },
      {
        question: "Can you rank a Wix site on Google?",
        answer:
          "You can, but it is harder. DIY builders give you less control over speed, structure and technical SEO, which are exactly the things Google and AI search engines reward. A professional build is structured for this from the start.",
      },
      {
        question: "I already have a Wix site. Can you rebuild it?",
        answer:
          "Yes. We rebuild DIY and template sites into fast, custom websites regularly, and we can carry over your content so nothing is lost.",
      },
      {
        question: "Will a custom site cost more to maintain?",
        answer:
          "Not necessarily. Our optional support plan covers hosting, security and updates for a fixed monthly fee, often comparable to stacking up Wix premium plans and paid apps.",
      },
    ],
    related: {
      label: "Read: your DIY brand looks like everyone else's",
      href: "/blog/your-diy-brand-looks-like-everyone-else",
    },
  },
];

export function getComparisonBySlug(slug: string): ComparisonData | undefined {
  return comparisons.find((c) => c.slug === slug);
}
