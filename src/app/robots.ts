import type { MetadataRoute } from "next";

const siteUrl = "https://awmedia.marketing";

// AI answer engines (ChatGPT, Perplexity, Gemini, Claude, Copilot, etc.) only
// cite and surface sites they are allowed to crawl. We explicitly welcome them
// so AW Media can be quoted as a source in AI search results (GEO).
const aiCrawlers = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT live browsing on a user's behalf
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live fetch
  "Google-Extended", // Gemini + Google AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "ClaudeBot", // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "cohere-ai",
  "Amazonbot",
  "Bytespider", // TikTok / Doubao
  "CCBot", // Common Crawl (feeds many models)
  "Meta-ExternalAgent", // Meta AI
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everyone else: full access, no crawl delay.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you", "/enquiry/"],
      },
      // AI answer engines: explicit allow so none are accidentally blocked.
      ...aiCrawlers.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/api/", "/thank-you", "/enquiry/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
