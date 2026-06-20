"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import { trackLead } from "@/lib/track";
import Footer from "@/components/Footer";

// ============================================================
// Faithful port of the standalone Social Media Audit tool
// (index.ejs / loading.ejs / results.ejs) into the AW Media site.
// Same 2-step form, same loading/progress, same 5-dimension results.
// The only behavioural change (email via SMTP) lives server-side.
// ============================================================

type PlatformStatus = "pending" | "scanning" | "complete" | "failed";

interface DimensionScore {
  rating: "Strong" | "Needs Work" | "Missing" | "N/A";
  score: number;
}
interface PlatformScore {
  profileOptimization: DimensionScore;
  contentQuality: DimensionScore;
  postingConsistency: DimensionScore;
  engagementHealth: DimensionScore;
  growthSignals: DimensionScore;
  overallScore: number;
  failed: boolean;
}
interface PlatformMetrics {
  failed?: boolean;
  followers?: number;
  engagementRate?: number;
  postsPerWeek?: number;
  daysSinceLastPost?: number | null;
  avgLikes?: number;
  avgComments?: number;
  hashtagUsageRate?: number;
  avgCaptionLength?: number;
}
interface Insight {
  platform: string;
  text: string;
}
interface AuditResults {
  platforms: Record<string, PlatformScore>;
  insights: { wins: Insight[]; quickWins: Insight[]; totalQuickWins: number };
  overallScore: number;
  grade: string;
}

// Platform definitions (order + icons + placeholders) from index.ejs
const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: "📸", placeholder: "@yourusername" },
  { key: "tiktok", label: "TikTok", icon: "🎵", placeholder: "@yourusername" },
  { key: "facebook", label: "Facebook", icon: "👥", placeholder: "facebook.com/yourpage" },
  { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "linkedin.com/in/yourname" },
  { key: "youtube", label: "YouTube", icon: "▶️", placeholder: "@channelname or channel URL" },
  { key: "twitter", label: "X / Twitter", icon: "𝕏", placeholder: "@yourusername" },
  { key: "pinterest", label: "Pinterest", icon: "📌", placeholder: "@yourusername or profile URL" },
] as const;

const GOAL_OPTIONS = [
  { value: "brand_awareness", label: "Brand Awareness, Get my name out there" },
  { value: "lead_generation", label: "Lead Generation, Book more calls & enquiries" },
  { value: "direct_sales", label: "Direct Sales, Drive purchases & revenue" },
  { value: "community", label: "Community Building, Build a loyal audience" },
  { value: "thought_leadership", label: "Thought Leadership, Become the go-to expert" },
];

const TIPS = [
  "Profiles with consistent posting and complete bios score highest.",
  "Engagement rate matters more than follower count.",
  "Posts with hashtags get 12% more reach on average.",
  "The best time to post? When your audience is online, check your insights.",
  "Carousels get 3x more engagement than single image posts on Instagram.",
  "Video content is king on every platform right now.",
];

const DIMENSIONS: { key: keyof PlatformScore; label: string }[] = [
  { key: "profileOptimization", label: "Profile Optimization" },
  { key: "contentQuality", label: "Content Quality" },
  { key: "postingConsistency", label: "Posting Consistency" },
  { key: "engagementHealth", label: "Engagement Health" },
  { key: "growthSignals", label: "Growth Signals" },
];

function platformLabel(p: string): string {
  const found = PLATFORMS.find((x) => x.key === p);
  if (found) return found.label;
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function fmtNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function ratingClasses(rating: string): string {
  switch (rating) {
    case "Strong":
      return "bg-green-500/15 text-green-400";
    case "Needs Work":
      return "bg-yellow-500/15 text-yellow-400";
    case "N/A":
      return "bg-white/5 text-muted";
    default:
      return "bg-red-500/15 text-red-400";
  }
}

const gradeClasses: Record<string, string> = {
  A: "bg-green-500 text-black",
  B: "bg-green-300 text-black",
  C: "bg-yellow-500 text-black",
  D: "bg-orange-400 text-black",
  F: "bg-red-500 text-white",
};

type View = "form" | "loading" | "results";

export default function SocialAuditClient() {
  const [view, setView] = useState<View>("form");

  // Form state
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState({ name: "", email: "", business: "", goal: "" });
  const [handles, setHandles] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Job state
  const [auditId, setAuditId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, PlatformStatus>>({});
  const [results, setResults] = useState<AuditResults | null>(null);
  const [metrics, setMetrics] = useState<Record<string, PlatformMetrics>>({});
  const [firstName, setFirstName] = useState("");
  const [tipIndex, setTipIndex] = useState(0);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Rotating tips on the loading screen
  useEffect(() => {
    if (view !== "loading") return;
    const t = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(t);
  }, [view]);

  // Polling loop (replaces SSE + polling fallback from loading.ejs)
  useEffect(() => {
    if (view !== "loading" || !auditId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/social-audit/status/${auditId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.platformStatuses) setStatuses(data.platformStatuses);
        if (data.status === "complete") {
          if (pollRef.current) clearInterval(pollRef.current);
          setResults(data.results);
          setMetrics(data.metrics || {});
          setFirstName((data.lead?.name || "").split(" ")[0] || "");
          // brief beat so the final ticks register, like the source's 800ms delay
          setTimeout(() => setView("results"), 800);
        }
      } catch {
        /* keep polling */
      }
    };

    poll();
    pollRef.current = setInterval(poll, 2500);

    // Safety: stop polling after 3 minutes (source had a hard redirect)
    const safety = setTimeout(() => {
      if (pollRef.current) clearInterval(pollRef.current);
    }, 180000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      clearTimeout(safety);
    };
  }, [view, auditId]);

  const progressPct = step === 1 ? 0 : 100;

  function nextStep() {
    if (!lead.name.trim() || !lead.email.trim() || !lead.business.trim() || !lead.goal) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitAudit() {
    const active = Object.entries(handles).filter(([, v]) => v && v.trim());
    if (active.length === 0) {
      setError("Please enter at least one social media handle.");
      return;
    }
    setError("");
    setSubmitting(true);

    const payload: Record<string, string> = {
      name: lead.name,
      email: lead.email,
      business: lead.business,
      goal: lead.goal,
    };
    active.forEach(([k, v]) => {
      payload[`handle_${k}`] = v.trim();
    });

    try {
      const res = await fetch("/api/social-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Something went wrong.");

      // seed statuses as pending for the platforms we submitted
      const initial: Record<string, PlatformStatus> = {};
      active.forEach(([k]) => (initial[k] = "pending"));
      setStatuses(initial);
      trackLead("social-audit");
      setAuditId(result.auditId);
      setView("loading");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const scoringPlatforms = results ? Object.keys(results.platforms) : [];

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        {view === "form" && (
          <FormView
            step={step}
            setStep={setStep}
            lead={lead}
            setLead={setLead}
            handles={handles}
            setHandles={setHandles}
            error={error}
            setError={setError}
            submitting={submitting}
            nextStep={nextStep}
            submitAudit={submitAudit}
            progressPct={progressPct}
          />
        )}

        {view === "loading" && (
          <LoadingView statuses={statuses} tip={TIPS[tipIndex]} />
        )}

        {view === "results" && results && (
          <ResultsView
            results={results}
            metrics={metrics}
            firstName={firstName}
            scoringPlatforms={scoringPlatforms}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

// ============================================================
// FORM VIEW (Step 1 + Step 2), ported from index.ejs
// ============================================================
function FormView(props: {
  step: number;
  setStep: (n: number) => void;
  lead: { name: string; email: string; business: string; goal: string };
  setLead: (l: { name: string; email: string; business: string; goal: string }) => void;
  handles: Record<string, string>;
  setHandles: (h: Record<string, string>) => void;
  error: string;
  setError: (s: string) => void;
  submitting: boolean;
  nextStep: () => void;
  submitAudit: () => void;
  progressPct: number;
}) {
  const {
    step,
    setStep,
    lead,
    setLead,
    handles,
    setHandles,
    error,
    submitting,
    nextStep,
    submitAudit,
    progressPct,
  } = props;

  const inputCls =
    "w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors";

  return (
    <>
      <PageHeader
        tag="Free Audit"
        title="We'll scan your real profiles."
        titleAccent="You'll see what's broken."
        description="Enter your social media handles. We'll scrape your actual profiles and score you across 5 dimensions with real data, not guesswork. Takes about 60 seconds."
      />

      <section className="py-12 pb-24">
        <div className="mx-auto max-w-2xl px-6">
          {/* Progress */}
          <div className="mb-10">
            <div className="relative h-[3px] w-full rounded-full bg-card-border">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-pink"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="-mt-3.5 flex justify-between">
              {[1, 2].map((n) => (
                <span
                  key={n}
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                    n <= step
                      ? "border-pink bg-pink text-white"
                      : "border-card-border bg-card text-muted"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-card-border bg-card p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold">
                    Let&apos;s start with <span className="text-pink">you</span>
                  </h2>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      className={inputCls}
                      placeholder="e.g. Sarah Johnson"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className={inputCls}
                      placeholder="e.g. sarah@yourbusiness.com"
                    />
                    <span className="mt-1.5 block text-xs text-muted">
                      We&apos;ll send your full audit report here
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What does your business do?
                    </label>
                    <textarea
                      rows={2}
                      value={lead.business}
                      onChange={(e) => setLead({ ...lead, business: e.target.value })}
                      className={`${inputCls} resize-none`}
                      placeholder="e.g. I'm a personal trainer helping busy professionals get fit with online coaching"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What&apos;s your #1 goal with social media?
                    </label>
                    <select
                      value={lead.goal}
                      onChange={(e) => setLead({ ...lead, goal: e.target.value })}
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select your primary goal
                      </option>
                      {GOAL_OPTIONS.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300"
                  >
                    Next Step
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold">
                      Enter your <span className="text-pink">social handles</span>
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      Add at least one. We&apos;ll scan each profile and analyse your real
                      data.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {PLATFORMS.map((p) => (
                      <div
                        key={p.key}
                        className="flex items-center gap-4 rounded-xl border border-card-border bg-background px-4 py-1.5 focus-within:border-pink/50 transition-colors"
                      >
                        <div className="flex min-w-[120px] flex-shrink-0 items-center gap-2.5 text-sm font-semibold">
                          <span className="text-xl">{p.icon}</span>
                          <span>{p.label}</span>
                        </div>
                        <input
                          type="text"
                          value={handles[p.key] || ""}
                          onChange={(e) =>
                            setHandles({ ...handles, [p.key]: e.target.value })
                          }
                          placeholder={p.placeholder}
                          className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-muted/50 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-full border border-card-border px-6 py-3.5 text-sm font-semibold text-muted hover:text-white hover:border-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={submitAudit}
                      disabled={submitting}
                      className="flex-1 rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Starting analysis..." : "Analyse My Profiles"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// LOADING VIEW, ported from loading.ejs
// ============================================================
function LoadingView({
  statuses,
  tip,
}: {
  statuses: Record<string, PlatformStatus>;
  tip: string;
}) {
  const platforms = Object.keys(statuses);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 h-16 w-16 rounded-full bg-pink shadow-[0_0_40px_rgba(249,38,114,0.5)]"
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold">
        Scanning Your <span className="gradient-text">Profiles</span>
      </h1>
      <p className="mt-3 max-w-md text-muted">
        We&apos;re pulling real data from your social accounts. This usually takes 30-90
        seconds.
      </p>

      <div className="mt-10 flex w-full max-w-md flex-col gap-3">
        {platforms.map((p) => {
          const status = statuses[p];
          return (
            <div
              key={p}
              className={`flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-all ${
                status === "complete"
                  ? "border-green-500/50"
                  : status === "failed"
                  ? "border-red-500/50 opacity-60"
                  : status === "scanning"
                  ? "border-pink/50"
                  : "border-card-border"
              }`}
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                {status === "complete" ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-extrabold text-black">
                    ✓
                  </span>
                ) : status === "failed" ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-extrabold text-white">
                    ✕
                  </span>
                ) : (
                  <span
                    className={`h-8 w-8 rounded-full border-[3px] border-card-border ${
                      status === "scanning" ? "border-t-pink animate-spin" : ""
                    }`}
                  />
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold">{platformLabel(p)}</span>
                <span className="text-xs text-muted">
                  {status === "complete"
                    ? "Complete"
                    : status === "failed"
                    ? "Could not access"
                    : status === "scanning"
                    ? "Scanning..."
                    : "Waiting..."}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={tip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-8 max-w-md text-sm italic text-muted"
        >
          Tip: {tip}
        </motion.p>
      </AnimatePresence>
    </section>
  );
}

// ============================================================
// RESULTS VIEW, ported from results.ejs
// ============================================================
function ResultsView({
  results,
  metrics,
  firstName,
  scoringPlatforms,
}: {
  results: AuditResults;
  metrics: Record<string, PlatformMetrics>;
  firstName: string;
  scoringPlatforms: string[];
}) {
  const [animScore, setAnimScore] = useState(0);
  const circumference = 534; // 2πr with r=85
  const offset = circumference - (circumference * results.overallScore) / 100;

  useEffect(() => {
    let current = 0;
    const target = results.overallScore;
    const interval = setInterval(() => {
      current += 1;
      setAnimScore(current);
      if (current >= target) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [results.overallScore]);

  const summary =
    results.overallScore >= 70
      ? "Solid foundation, but there's still revenue being left on the table."
      : results.overallScore >= 45
      ? "Your social media is underperforming. The good news? The fixes are clear."
      : "Your social media presence needs serious attention. Every day without fixing this is costing you.";

  return (
    <section className="py-12 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Score Hero */}
        <div className="text-center">
          <p className="text-lg text-muted">
            Hey <span className="text-pink font-semibold">{firstName}</span>, here&apos;s your
            audit.
          </p>

          <div className="relative mt-8 inline-block">
            <div className="relative h-[200px] w-[200px]">
              <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#F92672"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold leading-none">{animScore}</span>
                <span className="text-sm text-muted">/ 100</span>
              </div>
            </div>
            <div
              className={`absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-background text-xl font-extrabold ${
                gradeClasses[results.grade] || "bg-red-500 text-white"
              }`}
            >
              {results.grade}
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">{summary}</p>
        </div>

        {/* Real Metrics */}
        <Section title="Your" accent="Real Numbers">
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(metrics).map(([platform, m]) => (
              <div
                key={platform}
                className={`rounded-2xl border border-card-border bg-card p-6 ${
                  m.failed ? "opacity-50" : ""
                }`}
              >
                <h3 className="mb-4 text-base font-bold text-pink">
                  {platformLabel(platform)}
                </h3>
                {m.failed ? (
                  <p className="text-sm text-muted">
                    We couldn&apos;t access this profile. Check the handle and try again.
                  </p>
                ) : (
                  <>
                    <div className="mb-4 grid grid-cols-4 gap-2">
                      <Stat
                        value={
                          (m.followers ?? 0) >= 1000000
                            ? ((m.followers ?? 0) / 1000000).toFixed(1) + "M"
                            : (m.followers ?? 0) >= 1000
                            ? ((m.followers ?? 0) / 1000).toFixed(1) + "K"
                            : String(m.followers ?? 0)
                        }
                        label="Followers"
                      />
                      <Stat value={`${m.engagementRate}%`} label="Eng. Rate" />
                      <Stat value={String(m.postsPerWeek)} label="Posts/Week" />
                      <Stat
                        value={m.daysSinceLastPost != null ? `${m.daysSinceLastPost}d` : "N/A"}
                        label="Last Post"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(m.avgLikes ?? 0) > 0 && (
                        <Tag>
                          Avg{" "}
                          {(m.avgLikes ?? 0) >= 1000
                            ? ((m.avgLikes ?? 0) / 1000).toFixed(1) + "K"
                            : m.avgLikes}{" "}
                          likes
                        </Tag>
                      )}
                      {(m.avgComments ?? 0) > 0 && <Tag>Avg {m.avgComments} comments</Tag>}
                      {(m.hashtagUsageRate ?? 0) > 0 && (
                        <Tag>{m.hashtagUsageRate}% posts use hashtags</Tag>
                      )}
                      {(m.avgCaptionLength ?? 0) > 0 && (
                        <Tag>Avg {m.avgCaptionLength} char captions</Tag>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Platform Scorecard */}
        <Section title="Platform" accent="Scorecard">
          <div className="overflow-x-auto rounded-2xl border border-card-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-card px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                    Dimension
                  </th>
                  {scoringPlatforms.map((p) => (
                    <th
                      key={p}
                      className="bg-card px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider"
                    >
                      {p === "twitter" ? "X" : platformLabel(p)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DIMENSIONS.map((dim) => (
                  <tr key={dim.key} className="border-t border-card-border">
                    <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-muted">
                      {dim.label}
                    </td>
                    {scoringPlatforms.map((p) => {
                      const d = results.platforms[p][dim.key] as DimensionScore;
                      return (
                        <td key={p} className="px-4 py-3.5">
                          <span
                            className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${ratingClasses(
                              d.rating
                            )}`}
                          >
                            {d.rating}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* What's Working */}
        {results.insights.wins.length > 0 && (
          <Section title="What's" accent="Working">
            <div className="flex flex-col gap-3">
              {results.insights.wins.map((win, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-card-border bg-card p-5"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-500/15 text-sm font-extrabold text-green-400">
                    ✓
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-pink">
                      {win.platform}
                    </span>
                    <p className="text-sm text-muted">{win.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Quick Wins */}
        <Section title="Quick Wins" accent="You Can Fix Today">
          <div className="flex flex-col gap-3">
            {results.insights.quickWins.map((qw, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink text-sm font-extrabold text-white">
                  {i + 1}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-pink">
                    {qw.platform}
                  </span>
                  <p className="text-sm text-muted">{qw.text}</p>
                </div>
              </div>
            ))}
          </div>

          {results.insights.totalQuickWins > 2 && (
            <div className="relative mt-3 overflow-hidden rounded-2xl p-5">
              <div className="flex flex-col gap-4 opacity-40 blur-[4px]">
                {Array.from({
                  length: Math.min(results.insights.totalQuickWins - 2, 3),
                }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-card-border text-sm font-extrabold text-muted">
                      {i + 3}
                    </span>
                    <div className="h-3 flex-1 rounded-md bg-card-border" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-2xl">🔒</div>
                <p className="text-sm font-semibold text-muted">
                  {results.insights.totalQuickWins - 2} more quick wins + your full 30-day
                  action plan
                </p>
              </div>
            </div>
          )}
        </Section>

        {/* 30-Day Plan Teaser */}
        <Section title="Your 30-Day" accent="Action Plan">
          <div className="relative">
            <div className="mb-2 rounded-xl border border-card-border bg-card p-5">
              <h3 className="mb-2 text-base font-bold">Week 1: Foundation Fixes</h3>
              <p className="text-sm text-muted">
                Quick profile optimizations and setup changes that create immediate impact...
              </p>
            </div>
            {[
              {
                t: "Week 2: Content System",
                d: "Build a repeatable posting system with defined pillars and batching...",
              },
              {
                t: "Week 3: Engagement Engine",
                d: "Daily routines and strategies to build real community interaction...",
              },
              {
                t: "Week 4: Growth & Measurement",
                d: "Scale what works, cut what doesn't, and set up tracking for next month...",
              },
            ].map((w) => (
              <div
                key={w.t}
                className="pointer-events-none mb-2 select-none rounded-xl border border-card-border bg-card p-5 blur-[5px]"
              >
                <h3 className="mb-2 text-base font-bold">{w.t}</h3>
                <p className="text-sm text-muted">{w.d}</p>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 flex h-[70%] flex-col items-center justify-center bg-gradient-to-b from-transparent to-background text-center">
              <div className="mb-2 text-2xl">🔒</div>
              <p className="text-base font-bold">Unlock your personalized 30-day plan</p>
            </div>
          </div>
        </Section>

        {/* CTA: AW-LWAYS On Time */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-pink/60 bg-gradient-to-br from-card to-background p-8 text-center lg:p-12">
          <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(circle_at_center,rgba(249,38,114,0.12),transparent_60%)]" />
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-pink px-5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white">
              AW-LWAYS On Time
            </span>
            <h2 className="mx-auto mt-5 max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl">
              Stop Struggling With{" "}
              <span className="gradient-text">Social Media Graphics</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Your audit flagged gaps in visual consistency, posting frequency, or both.
              That&apos;s not a strategy problem, it&apos;s a{" "}
              <strong className="text-white">design bottleneck</strong>. Let AW Media handle
              the visuals so you can focus on running your business.
            </p>

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              {[
                {
                  icon: "🎨",
                  h: "Custom Graphics, On Brand",
                  p: "Carousels, YouTube thumbnails, lead gen designs, single posts, all tailored to your brand and audience",
                },
                {
                  icon: "⏱️",
                  h: "Delivered Like Clockwork",
                  p: "Weekly, fortnightly, or monthly, your dedicated design slot means content is always ready to post",
                },
                {
                  icon: "🔄",
                  h: "Flexible When You're Busy",
                  p: "Can't submit content this week? Swap your graphics for a 10-page PDF lead magnet or website design updates instead",
                },
                {
                  icon: "⭐",
                  h: "Award-Winning Team",
                  p: "Sheffield-based studio, founded 2016. 1,000+ happy clients. 500+ five-star reviews.",
                },
              ].map((f) => (
                <div
                  key={f.h}
                  className="flex gap-3.5 rounded-xl bg-white/[0.03] p-4"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-pink/15 text-xl">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold">{f.h}</h4>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{f.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  name: "Monthly",
                  price: "£110",
                  detail: "3x graphics per month",
                  saving: "Save £30 per graphic",
                  popular: false,
                },
                {
                  name: "Fortnightly",
                  price: "£190",
                  detail: "6x graphics per month (3x every 2 weeks)",
                  saving: "Save £40 per graphic",
                  popular: true,
                },
                {
                  name: "Weekly",
                  price: "£300",
                  detail: "12x graphics per month (3x every week)",
                  saving: "Save £50 per graphic",
                  popular: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-6 text-center transition-all ${
                    tier.popular
                      ? "border-pink bg-pink/10"
                      : "border-card-border bg-white/[0.03] hover:border-pink/40"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-pink px-3.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                  <h4 className="mb-3 text-base font-bold">{tier.name}</h4>
                  <div className="mb-2 text-3xl font-extrabold">
                    {tier.price}
                    <span className="text-sm font-medium text-muted">/mo</span>
                  </div>
                  <p className="mb-2 text-xs text-muted">{tier.detail}</p>
                  <p className="text-xs font-bold text-pink">{tier.saving}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-r-xl border-l-[3px] border-pink bg-pink/10 px-6 py-5 text-left">
              <p className="text-sm italic text-muted">
                No more stressing over design ideas, deadlines, or engagement, just
                consistent, scroll-stopping visuals that keep your brand looking sharp and
                performing strong.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <BookCallButton>Get Started</BookCallButton>
              <a
                href="mailto:alex@awmedia.marketing"
                className="text-sm font-medium text-pink hover:underline underline-offset-4"
              >
                or get in touch →
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              3 month minimum term. Custom packages available. Pay-in-full discounts up to
              £300 off.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <Section title="How It" accent="Works">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                h: "Research",
                p: "We understand your brand, audience, and content goals to ensure every graphic hits the mark.",
              },
              {
                n: "02",
                h: "Design",
                p: "Our team creates bespoke, eye-catching visuals that reflect your style and maximise engagement.",
              },
              {
                n: "03",
                h: "Delivery",
                p: "Finished graphics are delivered on time, every time, ready for you to post with zero hassle.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-card-border bg-card p-7"
              >
                <div className="mb-3 text-3xl font-extrabold text-pink">{s.n}</div>
                <h4 className="mb-2 text-base font-bold">{s.h}</h4>
                <p className="text-sm text-muted leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer recap */}
        <div className="mt-16 border-t border-card-border pt-12 text-center">
          <h3 className="text-xl font-bold">
            Your Score: <span className="text-pink">{results.overallScore}/100</span>
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            {results.overallScore < 60
              ? "Your social media is leaving money on the table. The quick wins alone could shift your results within a week, but the real transformation comes from having professional, on-brand graphics delivered like clockwork."
              : "You've got a decent foundation, now it's about consistency and polish. Professional graphics on demand is the difference between \"decent\" and \"can't stop scrolling.\""}
          </p>
          <div className="mt-6">
            <BookCallButton>Fix My Social Media</BookCallButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── small presentational helpers ──
function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">
        {title} <span className="text-pink">{accent}</span>
      </h2>
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <span className="block text-xl font-extrabold leading-tight">{value}</span>
      <span className="mt-0.5 block text-[0.7rem] uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[0.7rem] text-muted">
      {children}
    </span>
  );
}

void fmtNum;
