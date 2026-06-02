import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Ported faithfully from the standalone Express audit tool (server.js).
// Calls Google PageSpeed Insights (Lighthouse) for mobile + desktop, derives
// the six scores, and builds the key-issues / quick-wins / agency-insight lists.
//
// Env:
//   PSI_API_KEY  Optional Google PageSpeed Insights API key. Without it the call
//                still works (keyless is rate-limited but functional); with it we
//                append &key= for higher quotas.

const PSI_BASE = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const PSI_API_KEY = process.env.PSI_API_KEY || "";

/* ── URL validation (mirrors server.js sanitizeUrl) ── */
function sanitizeUrl(raw: unknown): string | null {
  if (!raw || typeof raw !== "string") return null;
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname.includes(".")) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

interface Scores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface LighthouseCategory {
  score?: number | null;
}

interface LighthouseAudit {
  score?: number | null;
}

interface PSIResponse {
  lighthouseResult?: {
    categories?: Record<string, LighthouseCategory>;
    audits?: Record<string, LighthouseAudit>;
  };
}

/* ── Fetch PageSpeed data ── */
async function fetchPSI(url: string, strategy: "MOBILE" | "DESKTOP"): Promise<PSIResponse> {
  // Build query manually so all four category params are preserved
  // (URLSearchParams would dedupe the repeated "category" key).
  const queryStr =
    `url=${encodeURIComponent(url)}&strategy=${strategy}` +
    `&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO` +
    (PSI_API_KEY ? `&key=${PSI_API_KEY}` : "");

  const res = await fetch(`${PSI_BASE}?${queryStr}`);

  if (!res.ok) {
    const body = await res.text();
    console.error(`PSI ${strategy} error ${res.status}:`, body.substring(0, 500));
    throw new Error(`PageSpeed API returned ${res.status} for ${strategy.toLowerCase()} analysis`);
  }

  return res.json();
}

/* ── Parse PSI response ── */
function parseScores(data: PSIResponse): Scores {
  const cats = data.lighthouseResult?.categories || {};
  return {
    performance: Math.round((cats.performance?.score || 0) * 100),
    accessibility: Math.round((cats.accessibility?.score || 0) * 100),
    bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
  };
}

interface AuditCheck {
  id: string;
  issue?: string;
  win?: string;
}

function parseIssues(data: PSIResponse): { issues: string[]; wins: string[] } {
  const audits = data.lighthouseResult?.audits || {};
  const issues: string[] = [];
  const wins: string[] = [];

  // Key audits to check
  const auditChecks: AuditCheck[] = [
    { id: "first-contentful-paint", issue: "First paint is slow — visitors may leave before seeing content" },
    { id: "largest-contentful-paint", issue: "Main content takes too long to appear" },
    { id: "cumulative-layout-shift", issue: "Page elements shift while loading — feels unstable" },
    { id: "total-blocking-time", issue: "Page is unresponsive for too long during load" },
    { id: "speed-index", issue: "Visual loading is slower than expected" },
    { id: "render-blocking-resources", issue: "Render-blocking CSS or JS is slowing down the page", win: "Remove or defer render-blocking resources" },
    { id: "unused-css-rules", issue: "Unused CSS is adding weight to the page", win: "Remove unused CSS to speed up loading" },
    { id: "unused-javascript", issue: "Unused JavaScript is slowing things down", win: "Remove unused JavaScript files" },
    { id: "uses-optimized-images", win: "Compress images to reduce page weight" },
    { id: "uses-webp-images", win: "Convert images to WebP format for faster loading" },
    { id: "uses-text-compression", win: "Enable text compression (gzip/brotli) on the server" },
    { id: "uses-responsive-images", win: "Serve properly sized images for each device" },
    { id: "meta-description", issue: "Missing or weak meta description — affects search appearance" },
    { id: "document-title", issue: "Page title is missing or could be stronger" },
    { id: "image-alt", issue: "Images are missing alt text — hurts accessibility and SEO", win: "Add descriptive alt text to all images" },
    { id: "link-name", issue: "Some links don't have descriptive text" },
    { id: "heading-order", issue: "Heading levels are skipped — affects structure and SEO" },
    { id: "viewport", issue: "Viewport meta tag is missing or incorrect" },
    { id: "tap-targets", issue: "Tap targets (buttons/links) are too small on mobile" },
    { id: "font-display", win: "Use font-display: swap to prevent invisible text during load" },
  ];

  for (const check of auditChecks) {
    const audit = audits[check.id];
    if (!audit) continue;

    // Score of null means not applicable, 1 means passing
    if (audit.score !== null && audit.score !== undefined && audit.score < 0.9) {
      if (check.issue && issues.length < 8) issues.push(check.issue);
      if (check.win && wins.length < 6) wins.push(check.win);
    }
  }

  return { issues, wins };
}

/* ── Generate agency-style insights ── */
function generateInsights(mobile: Scores, desktop: Scores): string[] {
  const insights: string[] = [];

  if (mobile.performance < 50) {
    insights.push("Your mobile performance score is low. Most people browse on their phone, so a slow mobile site means lost enquiries and sales.");
  } else if (mobile.performance < 75) {
    insights.push("Your mobile performance could be stronger. A faster mobile experience means more people stay long enough to enquire or book.");
  }

  if (desktop.performance > mobile.performance + 20) {
    insights.push("There's a big gap between your desktop and mobile scores. Most of your audience is on mobile, so that's where the biggest gains are.");
  }

  if (mobile.seo < 80 || desktop.seo < 80) {
    insights.push("Your SEO foundations need tightening. When someone searches for a business like yours in your area, you need to show up, and the basics aren't in place yet.");
  }

  if (mobile.accessibility < 80) {
    insights.push("Accessibility issues can hurt your reach and search rankings. Simple fixes like adding alt text and improving contrast make your site work for everyone.");
  }

  if (mobile.bestPractices < 80) {
    insights.push("Best practice issues suggest your site may not feel as trustworthy or polished as it should. Premium services need premium presentation.");
  }

  const avgPerf = (mobile.performance + desktop.performance) / 2;
  if (avgPerf < 60) {
    insights.push("Your overall performance suggests visitors may be leaving before they even see your offer. Speed is one of the easiest things to fix — and one of the most impactful.");
  }

  if (mobile.performance >= 90 && desktop.performance >= 90) {
    insights.push("Your performance scores are strong — your site loads fast on both mobile and desktop. Focus your next improvements on copy, offer clarity and conversion flow.");
  }

  if (insights.length === 0) {
    insights.push("Your scores are solid across the board. To get more leads, focus on your offer positioning, calls to action and booking flow — the things a technical audit can't measure.");
  }

  return insights;
}

/* ── Simple in-memory rate limiter (mirrors server.js) ── */
const rateMap = new Map<string, { start: number; count: number }>();
const RATE_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT = 5; // max requests per window

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  // Opportunistic cleanup of stale entries
  if (rateMap.size > 1000) {
    for (const [k, v] of rateMap) {
      if (now - v.start > RATE_WINDOW * 2) rateMap.delete(k);
    }
  }
  return entry.count <= RATE_LIMIT;
}

/* ── API Route ── */
export async function POST(request: Request) {
  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: { url?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  const url = sanitizeUrl(body.url);
  if (!url) {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  try {
    // Run mobile and desktop in parallel
    const [mobileData, desktopData] = await Promise.all([
      fetchPSI(url, "MOBILE"),
      fetchPSI(url, "DESKTOP"),
    ]);

    const mobile = parseScores(mobileData);
    const desktop = parseScores(desktopData);

    // Merge issues from both
    const mobileIssues = parseIssues(mobileData);
    const desktopIssues = parseIssues(desktopData);

    // Deduplicate
    const issues = [...new Set([...mobileIssues.issues, ...desktopIssues.issues])].slice(0, 8);
    const quickWins = [...new Set([...mobileIssues.wins, ...desktopIssues.wins])].slice(0, 6);

    const agencyInsights = generateInsights(mobile, desktop);

    return NextResponse.json({
      url,
      mobile,
      desktop,
      issues,
      quickWins,
      agencyInsights,
    });
  } catch (err) {
    console.error("Audit error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Failed to analyse this website. Please check the URL and try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
