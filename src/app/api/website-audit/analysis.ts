// Helper analysis utilities for the website audit route.
// All functions guard every nested access with optional chaining and never
// throw — a failure in any one section must not break the core PSI scores.

/* ── Shared PSI shapes (loose, since the API surface is large) ── */
export interface PSIAudit {
  id?: string;
  title?: string;
  displayValue?: string;
  score?: number | null;
  numericValue?: number;
  details?: {
    type?: string;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
  };
}

export interface CruxMetric {
  percentile?: number;
  category?: string; // "FAST" | "AVERAGE" | "SLOW"
}

export interface PSIFull {
  lighthouseResult?: {
    categories?: Record<string, { score?: number | null }>;
    audits?: Record<string, PSIAudit>;
  };
  loadingExperience?: {
    metrics?: Record<string, CruxMetric>;
  };
}

/* ── 1. Core Web Vitals ── */
export interface CoreWebVital {
  id: string;
  label: string;
  displayValue: string | null;
  score: number | null; // 0-1, drives the colour
}

export interface FieldMetric {
  id: string;
  label: string;
  displayValue: string;
  category: string | null; // FAST / AVERAGE / SLOW
}

export interface CoreWebVitalsResult {
  lab: CoreWebVital[];
  field: FieldMetric[]; // real-user CrUX data (may be empty)
}

const CWV_METRICS: { id: string; label: string }[] = [
  { id: "largest-contentful-paint", label: "Largest Contentful Paint" },
  { id: "cumulative-layout-shift", label: "Cumulative Layout Shift" },
  { id: "total-blocking-time", label: "Total Blocking Time" },
  { id: "first-contentful-paint", label: "First Contentful Paint" },
  { id: "speed-index", label: "Speed Index" },
  { id: "interactive", label: "Time to Interactive" },
];

// Field (CrUX) metric formatting helpers
const FIELD_METRICS: { key: string; label: string; format: (v: number) => string }[] = [
  {
    key: "LARGEST_CONTENTFUL_PAINT_MS",
    label: "Largest Contentful Paint",
    format: (v) => `${(v / 1000).toFixed(1)} s`,
  },
  {
    key: "CUMULATIVE_LAYOUT_SHIFT_SCORE",
    label: "Cumulative Layout Shift",
    // CrUX reports CLS x100 as an integer percentile
    format: (v) => (v / 100).toFixed(2),
  },
  {
    key: "INTERACTION_TO_NEXT_PAINT",
    label: "Interaction to Next Paint",
    format: (v) => `${Math.round(v)} ms`,
  },
  {
    key: "FIRST_CONTENTFUL_PAINT_MS",
    label: "First Contentful Paint",
    format: (v) => `${(v / 1000).toFixed(1)} s`,
  },
];

export function parseCoreWebVitals(data: PSIFull): CoreWebVitalsResult {
  const lab: CoreWebVital[] = [];
  try {
    const audits = data?.lighthouseResult?.audits || {};
    for (const m of CWV_METRICS) {
      const audit = audits[m.id];
      if (!audit) continue;
      lab.push({
        id: m.id,
        label: m.label,
        displayValue: audit.displayValue ?? null,
        score: audit.score ?? null,
      });
    }
  } catch {
    // leave lab as-is
  }

  const field: FieldMetric[] = [];
  try {
    const metrics = data?.loadingExperience?.metrics || {};
    for (const fm of FIELD_METRICS) {
      const metric = metrics[fm.key];
      if (!metric || typeof metric.percentile !== "number") continue;
      field.push({
        id: fm.key,
        label: fm.label,
        displayValue: fm.format(metric.percentile),
        category: metric.category ?? null,
      });
    }
  } catch {
    // leave field as-is
  }

  return { lab, field };
}

/* ── 2. Top opportunities ── */
export interface Opportunity {
  id: string;
  title: string;
  displayValue: string | null;
  savingsMs: number;
}

export function parseOpportunities(data: PSIFull): Opportunity[] {
  try {
    const audits = data?.lighthouseResult?.audits || {};
    const opps: Opportunity[] = [];
    for (const [id, audit] of Object.entries(audits)) {
      const details = audit?.details;
      if (details?.type !== "opportunity") continue;
      const savings = details?.overallSavingsMs ?? 0;
      if (!(savings > 0)) continue;
      opps.push({
        id,
        title: audit?.title || id,
        displayValue: audit?.displayValue ?? null,
        savingsMs: Math.round(savings),
      });
    }
    opps.sort((a, b) => b.savingsMs - a.savingsMs);
    return opps.slice(0, 6);
  } catch {
    return [];
  }
}

/* ── 3. On-page SEO checks ──
   Built primarily from the PageSpeed / Lighthouse audits — those already loaded
   and rendered the page from Google's own trusted infrastructure, so they're
   never blocked by a target site's firewall/WAF. We then ENHANCE that base with
   a direct HTML fetch where it succeeds (exact title/description lengths, single
   H1, Open Graph tags, favicon). If the HTML fetch is blocked or times out, the
   reliable PSI-derived checklist still shows. */
export type SeoStatus = "pass" | "warn" | "fail";

export interface SeoCheck {
  id: string;
  label: string;
  status: SeoStatus;
  note: string;
}

export interface SeoResult {
  available: boolean;
  checks: SeoCheck[];
}

// Display order for the merged checklist.
const SEO_ORDER = [
  "https",
  "title",
  "description",
  "h1",
  "viewport",
  "og",
  "image-alt",
  "structured-data",
  "favicon",
  "link-text",
  "font-size",
  "tap-targets",
  "is-crawlable",
];

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function scoreToStatus(score: number): SeoStatus {
  if (score >= 0.9) return "pass";
  if (score >= 0.5) return "warn";
  return "fail";
}

// Reliable base: derive checks from the Lighthouse SEO / best-practice audits.
function psiSeoChecks(data: PSIFull, url: string): SeoCheck[] {
  const audits = data?.lighthouseResult?.audits || {};
  const checks: SeoCheck[] = [];

  // HTTPS from the URL itself (always known).
  const https = /^https:\/\//i.test(url);
  checks.push({
    id: "https",
    label: "Secure (HTTPS)",
    status: https ? "pass" : "fail",
    note: https ? "Served securely over HTTPS." : "Not served over HTTPS.",
  });

  const map: { id: string; key: string; label: string; pass: string; fail: string }[] = [
    { id: "title", key: "document-title", label: "Page title", pass: "Page has a title tag.", fail: "Missing or empty title tag." },
    { id: "description", key: "meta-description", label: "Meta description", pass: "Meta description is present.", fail: "No meta description found." },
    { id: "viewport", key: "viewport", label: "Mobile viewport", pass: "Mobile viewport is configured.", fail: "No mobile viewport tag — not mobile-friendly." },
    { id: "image-alt", key: "image-alt", label: "Image alt text", pass: "Images have alt text.", fail: "Some images are missing alt text." },
    { id: "link-text", key: "link-text", label: "Descriptive link text", pass: "Links use descriptive text.", fail: "Some links lack descriptive anchor text." },
    { id: "font-size", key: "font-size", label: "Legible font sizes", pass: "Text is legible on mobile.", fail: "Some text is too small to read on mobile." },
    { id: "tap-targets", key: "tap-targets", label: "Tap targets", pass: "Buttons and links are easy to tap.", fail: "Some tap targets are too small or too close together." },
    { id: "is-crawlable", key: "is-crawlable", label: "Search-engine crawlable", pass: "Search engines can index this page.", fail: "Page appears blocked from search indexing." },
  ];

  for (const m of map) {
    const a = audits[m.key];
    if (!a) continue;
    if (a.score === null || a.score === undefined) continue; // not applicable
    const status = scoreToStatus(a.score);
    checks.push({ id: m.id, label: m.label, status, note: status === "pass" ? m.pass : m.fail });
  }

  // Structured data is a manual Lighthouse audit (usually null) — left to HTML.
  return checks;
}

export async function runSeoChecks(url: string, data?: PSIFull): Promise<SeoResult> {
  const byId = new Map<string, SeoCheck>();

  // 1. Reliable base from PSI (never blocked by the target site).
  try {
    if (data) for (const c of psiSeoChecks(data, url)) byId.set(c.id, c);
  } catch {
    // ignore — HTML may still provide checks
  }

  // 2. Enhance with a direct HTML fetch where possible (richer detail wins).
  try {
    const html = await fetchHtml(url);
    if (html) {
      for (const c of analyseHtml(html, url)) byId.set(c.id, c);
    }
  } catch {
    // blocked / timed out — the PSI base still stands
  }

  if (byId.size === 0) return { available: false, checks: [] };

  const checks: SeoCheck[] = [];
  for (const id of SEO_ORDER) {
    const c = byId.get(id);
    if (c) checks.push(c);
  }
  // append any checks with ids not in the predefined order
  for (const [id, c] of byId) {
    if (!SEO_ORDER.includes(id)) checks.push(c);
  }

  return { available: true, checks };
}

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) return "";
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

// Pure HTML heuristics — exported for testability, never throws. Ids are kept in
// sync with the PSI base so a richer HTML check overrides the matching PSI one.
export function analyseHtml(html: string, url: string): SeoCheck[] {
  const checks: SeoCheck[] = [];

  /* HTTPS (cheap, deterministic) */
  try {
    const https = /^https:\/\//i.test(url);
    checks.push({
      id: "https",
      label: "Secure (HTTPS)",
      status: https ? "pass" : "fail",
      note: https ? "Served securely over HTTPS." : "Not served over HTTPS.",
    });
  } catch {
    // skip
  }

  /* <title> */
  try {
    const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = m?.[1]?.replace(/\s+/g, " ").trim() || "";
    if (!title) {
      checks.push({ id: "title", label: "Page title", status: "fail", note: "No <title> tag found." });
    } else if (title.length < 10 || title.length > 60) {
      checks.push({
        id: "title",
        label: "Page title",
        status: "warn",
        note: `Title is ${title.length} characters — aim for 10–60.`,
      });
    } else {
      checks.push({ id: "title", label: "Page title", status: "pass", note: `${title.length} characters — good length.` });
    }
  } catch {
    // skip — PSI base covers it
  }

  /* meta description */
  try {
    const desc = matchMetaContent(html, "description");
    const len = desc?.trim().length || 0;
    if (!desc) {
      checks.push({ id: "description", label: "Meta description", status: "fail", note: "No meta description found." });
    } else if (len < 50 || len > 160) {
      checks.push({
        id: "description",
        label: "Meta description",
        status: "warn",
        note: `Description is ${len} characters — aim for 50–160.`,
      });
    } else {
      checks.push({ id: "description", label: "Meta description", status: "pass", note: `${len} characters — good length.` });
    }
  } catch {
    // skip
  }

  /* exactly one <h1> */
  try {
    const count = (html.match(/<h1[\s>]/gi) || []).length;
    if (count === 1) {
      checks.push({ id: "h1", label: "Single H1 heading", status: "pass", note: "Exactly one H1 found." });
    } else if (count === 0) {
      checks.push({ id: "h1", label: "Single H1 heading", status: "fail", note: "No H1 heading found." });
    } else {
      checks.push({ id: "h1", label: "Single H1 heading", status: "warn", note: `${count} H1 headings found — use just one.` });
    }
  } catch {
    // skip
  }

  /* viewport */
  try {
    const viewport = matchMetaContent(html, "viewport");
    if (viewport) {
      checks.push({ id: "viewport", label: "Mobile viewport", status: "pass", note: "Viewport meta tag present." });
    } else {
      checks.push({ id: "viewport", label: "Mobile viewport", status: "fail", note: "No viewport meta tag — not mobile-friendly." });
    }
  } catch {
    // skip
  }

  /* Open Graph */
  try {
    const hasOgTitle = /property\s*=\s*["']og:title["']/i.test(html);
    const hasOgImage = /property\s*=\s*["']og:image["']/i.test(html);
    if (hasOgTitle && hasOgImage) {
      checks.push({ id: "og", label: "Social sharing tags", status: "pass", note: "Open Graph title and image present." });
    } else if (hasOgTitle || hasOgImage) {
      checks.push({
        id: "og",
        label: "Social sharing tags",
        status: "warn",
        note: `Missing og:${hasOgTitle ? "image" : "title"}.`,
      });
    } else {
      checks.push({ id: "og", label: "Social sharing tags", status: "fail", note: "No Open Graph tags — poor link previews." });
    }
  } catch {
    // skip
  }

  /* Image alt coverage */
  try {
    const imgs = html.match(/<img\b[^>]*>/gi) || [];
    const total = imgs.length;
    if (total === 0) {
      checks.push({ id: "image-alt", label: "Image alt text", status: "pass", note: "No images found on the page." });
    } else {
      let withAlt = 0;
      for (const tag of imgs) {
        const alt = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
        if (alt && alt[1].trim().length > 0) withAlt++;
      }
      const pct = Math.round((withAlt / total) * 100);
      let status: SeoStatus = "pass";
      if (pct < 60) status = "fail";
      else if (pct < 90) status = "warn";
      checks.push({
        id: "image-alt",
        label: "Image alt text",
        status,
        note: `${withAlt}/${total} images (${pct}%) have alt text.`,
      });
    }
  } catch {
    // skip
  }

  /* Structured data */
  try {
    const hasLdJson = /<script[^>]+type\s*=\s*["']application\/ld\+json["']/i.test(html);
    checks.push({
      id: "structured-data",
      label: "Structured data",
      status: hasLdJson ? "pass" : "warn",
      note: hasLdJson ? "JSON-LD structured data found." : "No structured data (JSON-LD) found.",
    });
  } catch {
    // skip
  }

  /* Favicon */
  try {
    const hasFavicon = /<link[^>]+rel\s*=\s*["'][^"']*icon[^"']*["']/i.test(html);
    checks.push({
      id: "favicon",
      label: "Favicon",
      status: hasFavicon ? "pass" : "warn",
      note: hasFavicon ? "Favicon link present." : "No favicon link found.",
    });
  } catch {
    // skip
  }

  return checks;
}

// Match <meta name="X" content="Y"> in either attribute order.
function matchMetaContent(html: string, name: string): string | null {
  const re1 = new RegExp(
    `<meta[^>]+name\\s*=\\s*["']${name}["'][^>]*content\\s*=\\s*["']([^"']*)["']`,
    "i"
  );
  const re2 = new RegExp(
    `<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]*name\\s*=\\s*["']${name}["']`,
    "i"
  );
  const m = html.match(re1) || html.match(re2);
  return m?.[1] ?? null;
}
