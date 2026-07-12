"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import { trackLead } from "@/lib/track";
import Footer from "@/components/Footer";

/* ── Types mirroring the API (src/app/api/geo-audit/analysis.ts) ── */
type CheckStatus = "pass" | "warn" | "fail";
interface GeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  note: string;
}
interface GeoPillar {
  id: string;
  label: string;
  score: number;
  max: number;
  checks: GeoCheck[];
}
interface GeoResult {
  url: string;
  overall: number;
  grade: string;
  pillars: GeoPillar[];
  schemaTypes: string[];
  issues: string[];
  quickWins: string[];
  insight: string[];
}

const howSteps = [
  {
    number: "1",
    title: "Enter your website",
    body: "Paste your homepage. We check the real, live site the way an AI engine sees it.",
  },
  {
    number: "2",
    title: "We test AI visibility",
    body: "We scan AI crawler access, your llms.txt, structured data, and how answer-ready your content is for ChatGPT, Perplexity and Google's AI.",
  },
  {
    number: "3",
    title: "Get your GEO score",
    body: "See your score out of 100, the gaps that are hiding you from AI search, and the quick wins, in plain English.",
  },
];

const loadingSteps = [
  "Reading the live site",
  "Checking AI crawler access",
  "Scanning structured data",
  "Scoring AI visibility",
];

function scoreColor(val: number): string {
  if (val >= 75) return "#28c840";
  if (val >= 50) return "#febc2e";
  return "#ff5c7a";
}

const statusDot: Record<CheckStatus, string> = {
  pass: "#28c840",
  warn: "#febc2e",
  fail: "#ff5c7a",
};

function ScoreRing({ value, grade }: { value: number; grade: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = scoreColor(value);
  return (
    <div className="relative w-[180px] h-[180px]">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black tabular-nums" style={{ color }}>
          {value}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted mt-1">
          Grade {grade}
        </span>
      </div>
    </div>
  );
}

export default function GeoAuditClient() {
  const [urlValue, setUrlValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [pending, setPending] = useState<GeoResult | null>(null);
  const [result, setResult] = useState<GeoResult | null>(null);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    marketingOptIn: false,
    company: "", // honeypot — humans never see this
  });
  const [gateSending, setGateSending] = useState(false);
  const [gateError, setGateError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!urlValue.trim()) {
      setError("Please enter your website address.");
      return;
    }
    setLoading(true);
    setActiveStep(0);
    setResult(null);
    setPending(null);

    const stepTimer = setInterval(
      () => setActiveStep((s) => Math.min(s + 1, loadingSteps.length - 1)),
      1400,
    );

    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed.");
      setPending(data as GeoResult);
      trackLead("geo_audit_run", { url: urlValue });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
    }
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    if (!lead.name.trim() || !lead.email.trim()) {
      setGateError("Please add your name and email.");
      return;
    }
    setGateSending(true);
    try {
      const res = await fetch("/api/geo-audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          marketingOptIn: lead.marketingOptIn,
          company: lead.company,
          results: pending,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send.");
      trackLead("geo_audit_lead", { url: pending?.url });
      setResult(pending);
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    } catch (err) {
      setGateError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setGateSending(false);
    }
  }

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free GEO Audit"
          title="Is your business"
          titleAccent="invisible to AI?"
          description="When someone asks ChatGPT, Perplexity or Google's AI for a recommendation, can it even see you? Run a free GEO audit and find out in seconds."
        />

        {/* ── Input ── */}
        <section className="pb-10">
          <div className="mx-auto max-w-2xl px-6">
            <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                inputMode="url"
                placeholder="yourwebsite.com"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                className="flex-1 rounded-full border border-card-border bg-card px-6 py-4 text-base outline-none focus:border-pink/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-pink px-8 py-4 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? "Auditing…" : "Run free audit"}
              </button>
            </form>
            {error && <p className="mt-3 text-sm text-[#ff5c7a]">{error}</p>}

            <AnimatePresence>
              {loading && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-2"
                >
                  {loadingSteps.map((s, i) => (
                    <li
                      key={s}
                      className={`flex items-center gap-3 text-sm transition-colors ${
                        i <= activeStep ? "text-white" : "text-muted/50"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          i < activeStep
                            ? "bg-[#28c840]"
                            : i === activeStep
                              ? "bg-pink animate-pulse"
                              : "bg-white/15"
                        }`}
                      />
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Lead gate (score visible, detail locked) ── */}
        <AnimatePresence>
          {pending && !result && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-20"
            >
              <div className="mx-auto max-w-2xl px-6">
                <div className="rounded-3xl border border-card-border bg-card p-8 sm:p-10 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted mb-6">
                    {pending.url}
                  </p>
                  <div className="flex justify-center">
                    <ScoreRing value={pending.overall} grade={pending.grade} />
                  </div>
                  <h2 className="mt-8 text-2xl font-bold">
                    Your full GEO report is ready
                  </h2>
                  <p className="mt-2 text-muted text-sm max-w-md mx-auto">
                    See every gap, the quick wins, and what it means for getting
                    recommended by AI. Pop your details in and it&apos;s yours,
                    plus a copy in your inbox.
                  </p>

                  <form onSubmit={submitGate} className="mt-7 space-y-3 text-left">
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={lead.company}
                      onChange={(e) => setLead({ ...lead, company: e.target.value })}
                      className="hidden"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:border-pink/50"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:border-pink/50"
                    />
                    <label className="flex items-start gap-2 text-xs text-muted">
                      <input
                        type="checkbox"
                        checked={lead.marketingOptIn}
                        onChange={(e) =>
                          setLead({ ...lead, marketingOptIn: e.target.checked })
                        }
                        className="mt-0.5 accent-pink"
                      />
                      Send me occasional tips on getting found by AI and search. No spam.
                    </label>
                    {gateError && (
                      <p className="text-sm text-[#ff5c7a]">{gateError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={gateSending}
                      className="w-full rounded-full bg-pink px-8 py-4 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {gateSending ? "Unlocking…" : "Reveal my full report"}
                    </button>
                  </form>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Full report ── */}
        {result && (
          <section ref={resultsRef} className="pb-24">
            <div className="mx-auto max-w-4xl px-6">
              <div className="rounded-3xl border border-card-border bg-card p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <ScoreRing value={result.overall} grade={result.grade} />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs uppercase tracking-widest text-muted">
                      GEO score for
                    </p>
                    <p className="text-lg font-bold break-all">{result.url}</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {result.insight[0]}
                    </p>
                  </div>
                </div>

                {/* Pillars */}
                <div className="mt-10 space-y-5">
                  {result.pillars.map((p) => {
                    const pct = Math.round((p.score / p.max) * 100);
                    return (
                      <div key={p.id} className="border-t border-card-border pt-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">{p.label}</h3>
                          <span
                            className="text-sm font-bold tabular-nums"
                            style={{ color: scoreColor(pct) }}
                          >
                            {p.score}/{p.max}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {p.checks.map((c) => (
                            <li key={c.id} className="flex items-start gap-3 text-sm">
                              <span
                                className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                                style={{ background: statusDot[c.status] }}
                              />
                              <span className="text-muted">
                                <span className="text-white font-medium">
                                  {c.label}.
                                </span>{" "}
                                {c.note}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {result.issues.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-[#ff5c7a]/30 bg-[#ff5c7a]/5 p-6">
                    <p className="text-xs uppercase tracking-widest text-[#ff5c7a] mb-3">
                      Biggest gaps
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      {result.issues.map((i, idx) => (
                        <li key={idx}>• {i}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10 text-center">
                  <p className="text-lg font-semibold">
                    Want us to fix all of this for you?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    We&apos;ll make your site visible to AI search, so it
                    recommends you, not your competitors.
                  </p>
                  <div className="mt-5 flex justify-center">
                    <BookCallButton>Book a free GEO call</BookCallButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── How it works ── */}
        {!pending && !loading && (
          <section className="pb-24">
            <div className="mx-auto max-w-5xl px-6">
              <div className="grid sm:grid-cols-3 gap-6">
                {howSteps.map((s) => (
                  <div
                    key={s.number}
                    className="rounded-2xl border border-card-border bg-card p-7"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink/10 text-pink font-bold">
                      {s.number}
                    </span>
                    <h3 className="mt-4 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
