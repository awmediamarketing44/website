// GEO (Generative Engine Optimisation) analysis engine.
// Given a public URL, fetch the homepage + robots.txt + llms.txt + sitemap.xml,
// then score how visible the site is to AI answer engines (ChatGPT, Perplexity,
// Google AI Overviews, Claude). Pure logic — the route wraps this; the lead
// route emails the same shape. Mirrors the structure of the website-audit tool.

export type CheckStatus = "pass" | "warn" | "fail";

export interface GeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  note: string;
}

export interface GeoPillar {
  id: string;
  label: string;
  score: number;
  max: number;
  checks: GeoCheck[];
}

export interface GeoResult {
  url: string;
  overall: number; // 0-100
  grade: string; // A–F
  pillars: GeoPillar[];
  schemaTypes: string[]; // detected schema.org @type values
  issues: string[]; // the most important fails, plain English
  quickWins: string[]; // the easy fixes
  insight: string[]; // "what this means" — agency voice
}

// The AI crawlers that matter for GEO. Blocking any of these makes a site
// invisible to that engine.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
];

const UA = "Mozilla/5.0 (compatible; AWMedia-GEO-Audit/1.0; +https://awmedia.marketing/geo-audit)";

// Fetch a URL defensively: short timeout, capped body, never throw.
async function safeFetch(
  url: string,
): Promise<{ ok: boolean; status: number; text: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "*/*" },
      redirect: "follow",
      signal: controller.signal,
    });
    const raw = await res.text();
    // Cap to ~600KB so a giant page can't blow up the worker.
    const text = raw.length > 600_000 ? raw.slice(0, 600_000) : raw;
    return { ok: res.ok, status: res.status, text };
  } catch {
    return { ok: false, status: 0, text: "" };
  } finally {
    clearTimeout(timer);
  }
}

// Parse robots.txt into User-agent → directive blocks, then work out which of
// the AI bots are blocked at the site root.
function analyseRobots(robots: string): { blocked: string[]; hasFile: boolean } {
  if (!robots.trim()) return { blocked: [], hasFile: false };

  // Build a map of lower-cased UA → array of "disallow"/"allow" path rules.
  const lines = robots.split(/\r?\n/);
  const groups: { agents: string[]; rules: { type: string; path: string }[] }[] = [];
  let current: { agents: string[]; rules: { type: string; path: string }[] } | null = null;
  let lastWasAgent = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (field === "user-agent") {
      if (!lastWasAgent || !current) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if ((field === "disallow" || field === "allow") && current) {
      current.rules.push({ type: field, path: value });
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }

  // A group blocks the root if it has `Disallow: /` and no `Allow: /` override.
  const groupBlocksRoot = (g: { rules: { type: string; path: string }[] }) => {
    const disallowAll = g.rules.some((r) => r.type === "disallow" && r.path === "/");
    const allowAll = g.rules.some((r) => r.type === "allow" && r.path === "/");
    return disallowAll && !allowAll;
  };

  const findGroup = (botLc: string) =>
    groups.find((g) => g.agents.includes(botLc));
  const starGroup = groups.find((g) => g.agents.includes("*"));

  const blocked: string[] = [];
  for (const bot of AI_BOTS) {
    const specific = findGroup(bot.toLowerCase());
    if (specific) {
      if (groupBlocksRoot(specific)) blocked.push(bot);
    } else if (starGroup && groupBlocksRoot(starGroup)) {
      blocked.push(bot);
    }
  }
  return { blocked, hasFile: true };
}

// Pull schema.org @type values out of every JSON-LD block on the page.
function extractSchemaTypes(html: string): string[] {
  const types = new Set<string>();
  const blocks = html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  const collect = (node: unknown): void => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(collect);
      return;
    }
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
    // Recurse into @graph and nested objects (publisher, author, etc.).
    for (const v of Object.values(obj)) {
      if (v && typeof v === "object") collect(v);
    }
  };
  for (const m of blocks) {
    try {
      collect(JSON.parse(m[1].trim()));
    } catch {
      // Some sites template invalid JSON-LD — fall back to a type regex.
      for (const tm of m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)) types.add(tm[1]);
    }
  }
  return [...types];
}

function has(html: string, re: RegExp): boolean {
  return re.test(html);
}

function gradeFor(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

const hasAny = (types: string[], wanted: string[]) =>
  types.some((t) => wanted.includes(t));

export async function runGeoAudit(url: string): Promise<GeoResult> {
  const origin = new URL(url).origin;
  const [home, robotsRes, llmsRes, sitemapRes] = await Promise.all([
    safeFetch(url),
    safeFetch(`${origin}/robots.txt`),
    safeFetch(`${origin}/llms.txt`),
    safeFetch(`${origin}/sitemap.xml`),
  ]);

  const html = home.text;
  const schemaTypes = extractSchemaTypes(html);

  // ── Pillar 1: AI crawler access (robots.txt) — 25 ──
  const robotsHasFile = robotsRes.ok && robotsRes.text.trim().length > 0;
  const { blocked } = analyseRobots(robotsRes.text);
  const access: GeoCheck[] = [];
  let accessScore: number;
  if (!robotsHasFile) {
    accessScore = 18;
    access.push({
      id: "robots-file",
      label: "robots.txt",
      status: "warn",
      note: "No robots.txt found. AI bots are allowed by default, but there's no explicit welcome and no sitemap pointer.",
    });
  } else if (blocked.length === 0) {
    accessScore = 25;
    access.push({
      id: "ai-bots",
      label: "AI crawler access",
      status: "pass",
      note: "robots.txt does not block the major AI crawlers.",
    });
  } else {
    accessScore = Math.max(0, 25 - blocked.length * 4);
    access.push({
      id: "ai-bots",
      label: "AI crawler access",
      status: blocked.length > 3 ? "fail" : "warn",
      note: `robots.txt blocks ${blocked.length} AI crawler(s): ${blocked.join(", ")}. These engines can't read the site.`,
    });
  }

  // ── Pillar 2: Machine-readable summary (llms.txt) — 15 ──
  const hasLlms = llmsRes.ok && /\w/.test(llmsRes.text);
  const summary: GeoCheck[] = [
    {
      id: "llms-txt",
      label: "llms.txt",
      status: hasLlms ? "pass" : "fail",
      note: hasLlms
        ? "An llms.txt summary is published — AI tools get a clean brief of the business."
        : "No llms.txt. AI engines have to guess what the business does instead of reading a plain summary.",
    },
  ];
  const summaryScore = hasLlms ? 15 : 0;

  // ── Pillar 3: Structured data (schema) — 30 ──
  const hasOrg = hasAny(schemaTypes, ["Organization", "LocalBusiness", "ProfessionalService", "Corporation"]);
  const hasFaq = hasAny(schemaTypes, ["FAQPage"]);
  const hasBread = hasAny(schemaTypes, ["BreadcrumbList"]);
  const hasReview = hasAny(schemaTypes, ["Review", "AggregateRating"]);
  const schema: GeoCheck[] = [
    {
      id: "schema-org",
      label: "Business / Organization schema",
      status: hasOrg ? "pass" : "fail",
      note: hasOrg
        ? "The business is described in machine-readable schema."
        : "No Organization/LocalBusiness schema. AI can't confirm the basic facts (name, location, contact).",
    },
    {
      id: "schema-faq",
      label: "FAQ schema",
      status: hasFaq ? "pass" : "warn",
      note: hasFaq
        ? "FAQ content is marked up — prime material for AI answers."
        : "No FAQPage schema. FAQs are the single most-quoted format in AI answers.",
    },
    {
      id: "schema-review",
      label: "Reviews / rating schema",
      status: hasReview ? "pass" : "warn",
      note: hasReview
        ? "Reviews/rating are marked up, so AI can cite social proof."
        : "No Review or AggregateRating schema. AI can't see the star rating as a fact.",
    },
    {
      id: "schema-breadcrumb",
      label: "Breadcrumb schema",
      status: hasBread ? "pass" : "warn",
      note: hasBread
        ? "Breadcrumbs help engines understand site structure."
        : "No BreadcrumbList schema. Minor, but it helps AI map the site.",
    },
  ];
  const schemaScore = (hasOrg ? 10 : 0) + (hasFaq ? 8 : 0) + (hasReview ? 8 : 0) + (hasBread ? 4 : 0);

  // ── Pillar 4: Discoverability — 15 ──
  const hasSitemap = sitemapRes.ok && /<urlset|<sitemapindex/i.test(sitemapRes.text);
  const hasCanonical = has(html, /<link[^>]+rel=["']canonical["']/i);
  const hasDesc = has(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i);
  const discover: GeoCheck[] = [
    {
      id: "sitemap",
      label: "sitemap.xml",
      status: hasSitemap ? "pass" : "warn",
      note: hasSitemap ? "A sitemap is published." : "No sitemap.xml found — crawlers have to discover pages the hard way.",
    },
    {
      id: "canonical",
      label: "Canonical tag",
      status: hasCanonical ? "pass" : "warn",
      note: hasCanonical ? "Canonical URL is set." : "No canonical tag on the homepage.",
    },
    {
      id: "meta-desc",
      label: "Meta description",
      status: hasDesc ? "pass" : "warn",
      note: hasDesc ? "A meta description is set." : "No meta description — AI and search get no summary line.",
    },
  ];
  const discoverScore = (hasSitemap ? 6 : 0) + (hasCanonical ? 4 : 0) + (hasDesc ? 5 : 0);

  // ── Pillar 5: Answerability — 15 ──
  const hasTitle = has(html, /<title[^>]*>[^<]+<\/title>/i);
  const hasH1 = has(html, /<h1[\s>]/i);
  const hasOg = has(html, /<meta[^>]+property=["']og:/i);
  const hasFaqContent = hasFaq || /faq|frequently asked/i.test(html);
  const answer: GeoCheck[] = [
    { id: "title", label: "Title tag", status: hasTitle ? "pass" : "fail", note: hasTitle ? "Page title is set." : "No <title> tag." },
    { id: "h1", label: "H1 heading", status: hasH1 ? "pass" : "warn", note: hasH1 ? "An H1 heading is present." : "No H1 heading found." },
    { id: "og", label: "Open Graph tags", status: hasOg ? "pass" : "warn", note: hasOg ? "Open Graph tags are set." : "No Open Graph tags for rich sharing." },
    {
      id: "faq-content",
      label: "Question-style content",
      status: hasFaqContent ? "pass" : "warn",
      note: hasFaqContent ? "The site answers questions directly — what AI engines pull from." : "No obvious FAQ or question-led content for AI to quote.",
    },
  ];
  const answerScore = (hasTitle ? 3 : 0) + (hasH1 ? 3 : 0) + (hasOg ? 3 : 0) + (hasFaqContent ? 6 : 0);

  const pillars: GeoPillar[] = [
    { id: "access", label: "AI Crawler Access", score: accessScore, max: 25, checks: access },
    { id: "summary", label: "AI Summary (llms.txt)", score: summaryScore, max: 15, checks: summary },
    { id: "schema", label: "Structured Data", score: schemaScore, max: 30, checks: schema },
    { id: "discover", label: "Discoverability", score: discoverScore, max: 15, checks: discover },
    { id: "answer", label: "Answerability", score: answerScore, max: 15, checks: answer },
  ];

  const overall = Math.round(pillars.reduce((s, p) => s + p.score, 0));

  // Roll up the headline issues + quick wins from the failing checks.
  const allChecks = pillars.flatMap((p) => p.checks);
  const issues = allChecks.filter((c) => c.status === "fail").map((c) => c.note);
  const quickWins = allChecks
    .filter((c) => c.status === "warn")
    .map((c) => c.note)
    .slice(0, 6);

  // "What this means" — written in the AW Media voice, buyer-led.
  const insight: string[] = [];
  if (overall >= 85) {
    insight.push("This site is in strong shape for AI search — most businesses score far lower. The remaining gaps are quick wins.");
  } else if (overall >= 60) {
    insight.push("The basics are there, but AI engines are missing key signals. Closing these gaps means the difference between being mentioned and being skipped when someone asks an AI for a recommendation.");
  } else {
    insight.push("Right now this site is largely invisible to AI answer engines. When a potential customer asks ChatGPT or Google's AI for a recommendation, there's little here for it to read, trust, or quote.");
  }
  if (blocked.length) insight.push(`The most urgent fix: ${blocked.length} AI crawler(s) are actively blocked, so those engines can't see the site at all.`);
  if (!hasLlms) insight.push("Adding an llms.txt summary is a fast, high-impact win that almost no competitor has done yet.");
  if (!hasFaq) insight.push("Marking up FAQs is the highest-leverage content change for getting quoted in AI answers.");

  return {
    url,
    overall,
    grade: gradeFor(overall),
    pillars,
    schemaTypes,
    issues,
    quickWins,
    insight,
  };
}
