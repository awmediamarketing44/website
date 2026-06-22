import type { BlogPost } from "../blog-types";

const post: BlogPost = {
  slug: "how-to-rank-on-chatgpt-and-ai-search",
  title: "How Do I Get My Business Showing Up In ChatGPT And AI Search?",
  tag: "SEO",
  excerpt:
    "People are asking ChatGPT and Perplexity for recommendations instead of Googling. Here is how AI engines decide who to name, and how to make sure it is you.",
  metaDescription:
    "How to get your business recommended by ChatGPT, Perplexity and AI search. What AI engines pull from, the steps that get you cited, and how AW Media sets sites up for it.",
  date: "June 2026",
  readingMinutes: 6,
  coverImage: "/images/blog/how-to-rank-on-chatgpt-and-ai-search.jpg",
  body: [
    {
      type: "p",
      text: "More and more people are skipping Google entirely. Instead of \"web designer near me,\" they ask ChatGPT \"who is a good web designer for coaches in the UK,\" and they act on the names it gives back. This is called AI search, or GEO (generative engine optimisation), and if your business is not set up for it you are invisible in the place buyers are increasingly looking.",
    },
    {
      type: "p",
      text: "The good news: the fundamentals are learnable, and most of your competitors have not touched them yet. Here is how it works and what to do.",
    },
    {
      type: "h2",
      text: "How AI engines decide who to name",
    },
    {
      type: "p",
      text: "ChatGPT, Perplexity, Gemini and the rest do not invent recommendations. They pull from content they are allowed to read, that is clearly structured, and that they judge trustworthy. In practice that means a few things have to be true about your site.",
    },
    {
      type: "ul",
      items: [
        "The AI crawlers can actually access it. Bots like GPTBot, OAI-SearchBot and PerplexityBot must not be blocked.",
        "Your facts are easy to extract. Plain, clear statements about what you do, who you help and where, not buried in clever marketing copy.",
        "You appear in the underlying indexes. ChatGPT search leans heavily on Bing, so being indexed there matters.",
        "Other sources back you up. Reviews, directories and mentions elsewhere give the AI confidence to name you.",
      ],
    },
    {
      type: "h2",
      text: "The steps that actually move the needle",
    },
    {
      type: "ol",
      items: [
        "Open the door to AI crawlers in your robots file, and give them a sitemap so they can find every page.",
        "Add an llms.txt file: a clean, plain summary of your business that AI engines can read directly.",
        "Mark up your pages with structured data so machines understand your organisation, articles and services.",
        "Get listed and verified in Bing Webmaster Tools as well as Google Search Console.",
        "Publish content that answers the exact questions people ask AI, in clear question-and-answer form.",
        "Build real proof: reviews, case studies and named results an AI can cite with confidence.",
      ],
    },
    {
      type: "callout",
      label: "Why question-led content wins",
      text: "AI answers are built from content that directly answers a question. A page titled \"how much does a website cost in the UK\" with a clear answer near the top is far more likely to be quoted than a clever headline that says nothing a machine can lift.",
    },
    {
      type: "h2",
      text: "It is a slow burn, not a switch",
    },
    {
      type: "p",
      text: "Unlike paying for an ad, GEO compounds. The AI engines need to re-crawl and re-index, which takes days to weeks, and your visibility grows as more of your content gets read and trusted. The businesses that start now build a lead that is hard to catch later.",
    },
    {
      type: "h2",
      text: "How we set clients up for AI search",
    },
    {
      type: "p",
      text: "Every site we build is structured to be read by both Google and the AI engines: crawlable, marked up with structured data, fed by a clean sitemap and an llms.txt summary, and filled with content written to answer the real questions your customers ask. It is the same discipline as good SEO, extended to where search is heading.",
    },
    {
      type: "h2",
      text: "The bottom line",
    },
    {
      type: "p",
      text: "If you are not showing up when someone asks ChatGPT for a recommendation, that is a gap you can close, and most of your market has not noticed it yet. The work is straightforward. The advantage of doing it early is not.",
    },
    {
      type: "p",
      text: "Want to know whether AI engines can even read your site today? Send us your URL and we will tell you exactly where you stand and what to fix.",
    },
  ],
  relatedSlugs: ["my-website-isnt-showing-up-on-google", "seo-for-personal-trainers"],
};

export default post;
