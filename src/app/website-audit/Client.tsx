"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";

/* ── Types matching the API response ── */
interface DeviceScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface CoreWebVital {
  id: string;
  label: string;
  displayValue: string | null;
  score: number | null;
}

interface FieldMetric {
  id: string;
  label: string;
  displayValue: string;
  category: string | null;
}

interface Opportunity {
  id: string;
  title: string;
  displayValue: string | null;
  savingsMs: number;
}

type SeoStatus = "pass" | "warn" | "fail";

interface SeoCheck {
  id: string;
  label: string;
  status: SeoStatus;
  note: string;
}

interface AuditResult {
  url: string;
  mobile: DeviceScores;
  desktop: DeviceScores;
  issues: string[];
  quickWins: string[];
  agencyInsights: string[];
  coreWebVitals?: { lab: CoreWebVital[]; field: FieldMetric[] };
  opportunities?: Opportunity[];
  seo?: { available: boolean; checks: SeoCheck[] };
}

/* ── How it works (ported from source) ── */
const howSteps = [
  {
    number: "1",
    title: "Enter your website URL",
    body: "Paste your homepage or any page you want audited. We accept any public URL.",
  },
  {
    number: "2",
    title: "We run the audit",
    body: "We test your site on mobile and desktop across performance, accessibility, SEO and best practices — using Google's own analysis engine.",
  },
  {
    number: "3",
    title: "Get instant results",
    body: "See your scores, key issues and quick wins, with clear, plain-English recommendations written for your business.",
  },
];

/* ── Live status steps (ported labels) ── */
const loadingSteps = [
  "Connecting to site",
  "Running mobile audit",
  "Running desktop audit",
  "Generating recommendations",
];

/* ── Score helpers (ported from source) ── */
function scoreColor(val: number): string {
  if (val >= 90) return "#28c840";
  if (val >= 50) return "#febc2e";
  return "#ff5c7a";
}

function scoreLabel(val: number): string {
  if (val >= 90) return "Excellent";
  if (val >= 70) return "Good";
  if (val >= 50) return "Needs work";
  return "Poor";
}

function normalizeUrl(raw: string): string {
  const url = raw.trim();
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) return "https://" + url;
  return url;
}

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/* ── Score ring (SVG, ported geometry) ── */
function ScoreRing({ score }: { score: number }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = scoreColor(score);
  return (
    <div className="relative w-[140px] h-[140px]">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          className="stroke-card-border"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke={color}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold"
        style={{ color }}
      >
        {score}
      </div>
    </div>
  );
}

function ScoreCard({ label, val }: { label: string; val: number }) {
  const color = scoreColor(val);
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="mt-3 text-4xl font-extrabold" style={{ color }}>
        {val}
      </div>
      <span className="mt-2 block text-xs text-muted">{scoreLabel(val)}</span>
    </div>
  );
}

function DeviceRows({ data }: { data: DeviceScores }) {
  const rows = [
    { label: "Performance", key: "performance" },
    { label: "Accessibility", key: "accessibility" },
    { label: "Best Practices", key: "bestPractices" },
    { label: "SEO", key: "seo" },
  ] as const;
  return (
    <div className="mt-4 space-y-3">
      {rows.map((row) => {
        const val = data[row.key];
        return (
          <div
            key={row.key}
            className="flex items-center justify-between border-b border-card-border pb-2 last:border-0 last:pb-0"
          >
            <span className="text-sm text-muted">{row.label}</span>
            <span
              className="text-sm font-bold"
              style={{ color: scoreColor(val) }}
            >
              {val}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Core Web Vitals: colour from 0-1 Lighthouse score ── */
function vitalColor(score: number | null): string {
  if (score === null || score === undefined) return "#febc2e";
  if (score >= 0.9) return "#28c840";
  if (score >= 0.5) return "#febc2e";
  return "#ff5c7a";
}

function VitalCard({ vital }: { vital: CoreWebVital }) {
  const color = vitalColor(vital.score);
  return (
    <div className="rounded-2xl border border-card-border bg-card p-5 text-center">
      <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
        {vital.label}
      </span>
      <div className="mt-3 text-2xl font-extrabold" style={{ color }}>
        {vital.displayValue ?? "—"}
      </div>
    </div>
  );
}

/* ── Format opportunity savings (ms) into a friendly string ── */
function formatSavings(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s faster`;
  return `${Math.round(ms)}ms faster`;
}

/* ── SEO status icon ── */
function SeoIcon({ status }: { status: SeoStatus }) {
  if (status === "pass") {
    return (
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (status === "warn") {
    return (
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        style={{ color: "#febc2e" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
    );
  }
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function WebsiteAuditClient() {
  const [urlValue, setUrlValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // `pending` holds the finished audit while the lead gate is shown.
  // `result` is only set once the visitor submits the gate — that's what
  // reveals the full report.
  const [pending, setPending] = useState<AuditResult | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  // Lead gate form state — mirrors the contact form (incl. honeypot).
  const [lead, setLead] = useState({
    name: "",
    email: "",
    marketingOptIn: false,
    company: "", // honeypot — must stay empty; bots fill it, humans never see it
  });
  const [gateSending, setGateSending] = useState(false);
  const [gateError, setGateError] = useState("");

  const gateRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    const url = normalizeUrl(urlValue);
    setError("");

    if (!url || !isValidUrl(url)) {
      setError("Please enter a valid website URL (e.g. https://yoursite.com)");
      return;
    }

    setPending(null);
    setResult(null);
    setGateError("");
    setLoading(true);
    setActiveStep(0);

    // Simulate loading steps for UX (ported timings from source)
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActiveStep(1), 2000));
    timers.push(setTimeout(() => setActiveStep(2), 6000));
    timers.push(setTimeout(() => setActiveStep(3), 12000));

    try {
      const res = await fetch("/api/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed.");

      timers.forEach(clearTimeout);
      setActiveStep(4); // all done

      // Analysis complete — DON'T reveal scores. Show the lead gate instead.
      setTimeout(() => {
        setLoading(false);
        setPending(data);
        setTimeout(() => {
          gateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }, 500);
    } catch (err) {
      timers.forEach(clearTimeout);
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    if (!pending) return;
    setGateError("");

    if (!lead.name.trim() || !lead.email.trim()) {
      setGateError("Please enter your name and email.");
      return;
    }

    setGateSending(true);
    try {
      // Server-side: honeypot check + ActiveCampaign sync + emails.
      const res = await fetch("/api/website-audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: pending.url,
          name: lead.name,
          email: lead.email,
          marketingOptIn: lead.marketingOptIn,
          company: lead.company,
          results: pending,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      // Reveal the full results in place (no page navigation).
      setResult(pending);
      setPending(null);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setGateError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setGateSending(false);
    }
  }

  // Derived averages (ported from source renderResults)
  const overall = result
    ? Math.round((result.mobile.performance + result.desktop.performance) / 2)
    : 0;
  const avgAccess = result
    ? Math.round((result.mobile.accessibility + result.desktop.accessibility) / 2)
    : 0;
  const avgBP = result
    ? Math.round((result.mobile.bestPractices + result.desktop.bestPractices) / 2)
    : 0;
  const avgSEO = result
    ? Math.round((result.mobile.seo + result.desktop.seo) / 2)
    : 0;

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free Instant Website Audit"
          title="Find out why your website"
          titleAccent="isn't converting, in 30 seconds."
          description="Enter your URL below and get instant scores on performance, mobile experience, SEO, accessibility and more, with plain-English recommendations for your business."
        />

        {/* How it works */}
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-pink">
                How It Works
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                Three steps to a clearer picture
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {howSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-card-border bg-card p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/10 text-pink font-bold">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit tool */}
        <section className="pb-24" id="audit-tool">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-pink">
                Run Your Audit
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                Enter your website to get started
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted">
                We&apos;ll analyse your site across six key areas and give you a
                clear breakdown of what&apos;s working and what&apos;s costing you
                leads.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={runAudit}
              className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="relative flex-1">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full rounded-full border border-card-border bg-background py-3.5 pl-11 pr-4 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Running..." : "Run Free Audit"}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-center text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {/* Loading state */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto mt-12 max-w-md rounded-2xl border border-card-border bg-card p-8 text-center"
                >
                  <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-card-border border-t-pink" />
                  <h3 className="text-lg font-bold">Analysing your website...</h3>
                  <p className="mt-2 text-sm text-muted">
                    Running mobile and desktop audits. This usually takes 20–40
                    seconds.
                  </p>
                  <div className="mt-6 space-y-3 text-left">
                    {loadingSteps.map((label, i) => {
                      const done = i < activeStep;
                      const active = i === activeStep;
                      return (
                        <div
                          key={label}
                          className={`flex items-center gap-3 text-sm transition-colors ${
                            done || active ? "text-white" : "text-muted/50"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 flex-shrink-0 rounded-full transition-colors ${
                              done
                                ? "bg-pink"
                                : active
                                ? "bg-pink animate-pulse"
                                : "bg-card-border"
                            }`}
                          />
                          {label}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lead gate — shown once analysis is done, before results */}
            <AnimatePresence>
              {pending && !result && (
                <motion.div
                  ref={gateRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto mt-16 max-w-lg scroll-mt-28 rounded-2xl border border-pink/30 bg-card p-8 text-center sm:p-10"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-pink/10">
                    <svg
                      className="h-7 w-7 text-pink"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Your audit is{" "}
                    <span className="gradient-text">ready</span>
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    Enter your details to see your full report. We&apos;ll show
                    your scores, key issues and recommendations right here, and
                    email you a copy.
                  </p>

                  <form
                    onSubmit={submitGate}
                    className="mt-7 space-y-4 text-left"
                    noValidate
                  >
                    {/* Honeypot: hidden from humans, catches bots. Not a real field. */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={lead.company}
                      onChange={(e) =>
                        setLead({ ...lead, company: e.target.value })
                      }
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={lead.name}
                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={lead.email}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={lead.marketingOptIn}
                        onChange={(e) =>
                          setLead({ ...lead, marketingOptIn: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-card-border bg-background text-pink accent-pink focus:ring-pink/50 cursor-pointer"
                      />
                      <span className="text-sm text-muted leading-relaxed group-hover:text-white/80 transition-colors">
                        Keep me in the loop: send me the occasional web design
                        tip, offer and update from AW Media. No spam, unsubscribe
                        anytime.
                      </span>
                    </label>

                    {gateError && (
                      <p className="text-sm text-red-400" role="alert">
                        {gateError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={gateSending}
                      className="w-full rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {gateSending ? "Loading your report..." : "Show My Full Report"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            {result && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 scroll-mt-28"
              >
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Your Audit Results
                  </h2>
                  <p className="mt-2 text-muted">
                    Results for{" "}
                    <span className="text-pink break-all">{result.url}</span>
                  </p>
                </div>

                {/* Overall ring */}
                <div className="mx-auto mt-10 flex max-w-xs flex-col items-center rounded-2xl border border-card-border bg-card p-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Overall Performance
                  </span>
                  <div className="mt-4">
                    <ScoreRing score={overall} />
                  </div>
                  <div
                    className="mt-4 text-lg font-bold"
                    style={{ color: scoreColor(overall) }}
                  >
                    {scoreLabel(overall)}
                  </div>
                </div>

                {/* 5 score cards */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  <ScoreCard label="Mobile Perf" val={result.mobile.performance} />
                  <ScoreCard label="Desktop Perf" val={result.desktop.performance} />
                  <ScoreCard label="Accessibility" val={avgAccess} />
                  <ScoreCard label="Best Practices" val={avgBP} />
                  <ScoreCard label="SEO" val={avgSEO} />
                </div>

                {/* Mobile vs desktop */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-card-border bg-card p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink"
                      >
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M12 18h.01" />
                      </svg>
                      Mobile
                    </h3>
                    <DeviceRows data={result.mobile} />
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card p-6">
                    <h3 className="flex items-center gap-2 text-base font-bold">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                      </svg>
                      Desktop
                    </h3>
                    <DeviceRows data={result.desktop} />
                  </div>
                </div>

                {/* Issues & quick wins */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-card-border bg-card p-6">
                    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
                      Key Issues
                      <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-400">
                        Needs Attention
                      </span>
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {result.issues.length ? (
                        result.issues.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-muted"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted">
                          None found — looking good.
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-card-border bg-card p-6">
                    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
                      Quick Wins
                      <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-400">
                        Easy Fixes
                      </span>
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {result.quickWins.length ? (
                        result.quickWins.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-muted"
                          >
                            <svg
                              className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted">
                          None found — looking good.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Core Web Vitals */}
                {result.coreWebVitals && result.coreWebVitals.lab.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
                    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
                      Core Web Vitals
                      <span className="rounded-full bg-pink/10 px-2.5 py-0.5 text-xs font-semibold text-pink">
                        Mobile
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      Google&apos;s key loading and stability metrics — the numbers
                      that influence both user experience and search ranking.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {result.coreWebVitals.lab.map((v) => (
                        <VitalCard key={v.id} vital={v} />
                      ))}
                    </div>

                    {result.coreWebVitals.field.length > 0 && (
                      <div className="mt-6 border-t border-card-border pt-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                          Real-user data (last 28 days)
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {result.coreWebVitals.field.map((f) => (
                            <div
                              key={f.id}
                              className="flex items-center justify-between rounded-xl border border-card-border bg-background px-4 py-3"
                            >
                              <span className="text-sm text-muted">{f.label}</span>
                              <span
                                className="text-sm font-bold"
                                style={{
                                  color:
                                    f.category === "FAST"
                                      ? "#28c840"
                                      : f.category === "AVERAGE"
                                      ? "#febc2e"
                                      : f.category === "SLOW"
                                      ? "#ff5c7a"
                                      : "#ffffff",
                                }}
                              >
                                {f.displayValue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Quick wins to speed it up — opportunities */}
                {result.opportunities && result.opportunities.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
                    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
                      Quick Wins to Speed It Up
                      <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-400">
                        Biggest Impact First
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      The highest-impact changes for load speed, with the estimated
                      time saved on each.
                    </p>
                    <ul className="mt-5 space-y-3">
                      {result.opportunities.map((opp) => (
                        <li
                          key={opp.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-card-border bg-background px-4 py-3"
                        >
                          <div className="flex items-start gap-3">
                            <svg
                              className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            <span className="text-sm text-white">{opp.title}</span>
                          </div>
                          <span className="ml-7 rounded-full bg-pink/10 px-2.5 py-0.5 text-xs font-semibold text-pink whitespace-nowrap sm:ml-0">
                            {opp.displayValue || formatSavings(opp.savingsMs)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* On-page SEO checklist */}
                {result.seo && (
                  <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 sm:p-7">
                    <h3 className="flex flex-wrap items-center gap-2 text-base font-bold">
                      On-Page SEO
                      <span className="rounded-full bg-pink/10 px-2.5 py-0.5 text-xs font-semibold text-pink">
                        Foundations
                      </span>
                    </h3>
                    {result.seo.available && result.seo.checks.length > 0 ? (
                      <>
                        <p className="mt-2 text-sm text-muted">
                          The on-page basics search engines look for — checked live
                          against your page.
                        </p>
                        <ul className="mt-5 space-y-3">
                          {result.seo.checks.map((check) => (
                            <li
                              key={check.id}
                              className="flex items-start gap-3 border-b border-card-border pb-3 last:border-0 last:pb-0"
                            >
                              <SeoIcon status={check.status} />
                              <div>
                                <span className="block text-sm font-medium text-white">
                                  {check.label}
                                </span>
                                <span className="block text-sm text-muted">
                                  {check.note}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="mt-3 text-sm text-muted">
                        We couldn&apos;t read this page&apos;s HTML directly, so the
                        on-page SEO checklist isn&apos;t available. Your scores above
                        are unaffected.
                      </p>
                    )}
                  </div>
                )}

                {/* Agency insights */}
                {result.agencyInsights.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-pink/30 bg-card p-7">
                    <h3 className="text-lg font-bold">
                      What This Means for Your Business
                    </h3>
                    <ul className="mt-4 space-y-4">
                      {result.agencyInsights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20V10" />
                            <path d="M18 20V4" />
                            <path d="M6 20v-4" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10 rounded-2xl border border-card-border bg-card p-8 text-center sm:p-10">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Want us to fix this for you?
                  </h3>
                  <p className="mt-3 mx-auto max-w-2xl text-sm text-muted leading-relaxed">
                    This free audit covers the basics. A full expert review goes
                    deeper into your copy, offer, booking flow, trust signals and
                    conversion strategy and how to turn more visitors into
                    enquiries.
                  </p>
                  <div className="mt-6">
                    <BookCallButton>Book a Full Audit</BookCallButton>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
