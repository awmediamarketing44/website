"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";
import { trackLead } from "@/lib/track";
import { QUIZ_QUESTIONS, computeResult, type ScoreResult } from "@/data/ai-score";
import { BrainMap, ScoreGauge, AreaBars, StatTiles } from "./visuals";

type Phase = "intro" | "quiz" | "calculating" | "gate" | "results";

const CALC_STEPS = [
  "Reading your answers",
  "Scoring your opportunity areas",
  "Building your breakdown",
];

export default function AiScoreClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [calcStep, setCalcStep] = useState(0);
  const [result, setResult] = useState<ScoreResult | null>(null);

  // Lead gate form state, mirrors the audit tools (incl. honeypot).
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    marketingOptIn: false,
    company: "", // honeypot: must stay empty; bots fill it, humans never see it
  });
  const [gateSending, setGateSending] = useState(false);
  const [gateError, setGateError] = useState("");

  const quizRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(
    () => Math.round((step / QUIZ_QUESTIONS.length) * 100),
    [step]
  );

  function scrollToQuiz() {
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function start() {
    setPicked([]);
    setStep(0);
    setResult(null);
    setPhase("quiz");
    scrollToQuiz();
  }

  function pick(optionIndex: number) {
    const next = [...picked];
    next[step] = optionIndex;
    setPicked(next);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }

    // Last answer in: run the short calculating sequence, then show the gate.
    const computed = computeResult(next);
    setPhase("calculating");
    setCalcStep(0);
    scrollToQuiz();
    setTimeout(() => setCalcStep(1), 900);
    setTimeout(() => setCalcStep(2), 1800);
    setTimeout(() => {
      setResult(computed);
      setPhase("gate");
      scrollToQuiz();
    }, 2700);
  }

  function back() {
    if (step > 0) setStep(step - 1);
    else setPhase("intro");
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setGateError("");

    if (!lead.name.trim() || !lead.email.trim()) {
      setGateError("Please enter your name and email.");
      return;
    }
    const phoneDigits = lead.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setGateError("Please enter a valid mobile number.");
      return;
    }

    setGateSending(true);
    try {
      const res = await fetch("/api/ai-score/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          marketingOptIn: lead.marketingOptIn,
          company: lead.company,
          score: result.score,
          band: result.band.label,
          hoursPerWeek: result.hoursPerWeek,
          answers: result.answers,
          topAreas: result.topAreas.map((a) => ({
            title: a.title,
            outcome: a.outcome,
            insights: a.insights,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      trackLead("ai-score", { score: result.score });

      setPhase("results");
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

  const question = QUIZ_QUESTIONS[step];

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="Free 2-Minute Test"
          title="What could AI actually"
          titleAccent="do for your business?"
          description="Eleven quick questions about how your business runs. We'll score the opportunity out of 100 and show you the three places AI would pay off first. No jargon, no obligation."
        />

        <section className="pb-24">
          <div
            ref={quizRef}
            className={`mx-auto scroll-mt-28 px-6 ${
              phase === "results" ? "max-w-3xl" : "max-w-2xl"
            }`}
          >
            <AnimatePresence mode="wait">
              {/* Intro: the vision, then the start card */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <BrainMap className="max-w-[480px]" />
                  <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted leading-relaxed">
                    One AI core, plugged into every corner of your business:
                    support that never sleeps, a CRM that chases every lead,
                    bookings, quotes and marketing that run themselves.
                    <span className="font-semibold text-white/90">
                      {" "}
                      Most owners we test find 10+ hours a week they could hand
                      over.
                    </span>{" "}
                    The test shows you where yours are hiding.
                  </p>

                  <div className="mt-8 rounded-2xl border border-card-border bg-card p-8 text-center sm:p-10">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      Get your <span className="gradient-text">AI Opportunity Score</span>
                    </h2>
                    <p className="mt-4 text-sm text-muted leading-relaxed">
                      Everyone&apos;s being sold AI hype. This test does the opposite:
                      it looks at how your business actually runs and tells you where
                      AI is genuinely worth it, and where it isn&apos;t.
                    </p>
                    <ul className="mx-auto mt-6 max-w-sm space-y-3 text-left">
                      {[
                        "11 quick questions, all multiple choice",
                        "Scored instantly, out of 100",
                        "How many hours a week you could win back",
                        "Your top 3 opportunities, explained in plain English",
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-muted">
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={start}
                      className="mt-8 w-full rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] sm:w-auto"
                    >
                      Start the test
                    </button>
                    <p className="mt-4 text-xs text-muted/70">
                      Takes about 2 minutes. Free, no obligation.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Quiz */}
              {phase === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-card-border bg-card p-8 sm:p-10"
                >
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted">
                      <span>
                        Question {step + 1} of {QUIZ_QUESTIONS.length}
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-background">
                      <motion.div
                        className="h-full rounded-full bg-pink"
                        animate={{ width: `${Math.max(progress, 4)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl font-bold sm:text-2xl">{question.question}</h2>
                      {question.help && (
                        <p className="mt-2 text-sm text-muted">{question.help}</p>
                      )}
                      <div className="mt-6 space-y-3">
                        {question.options.map((opt, i) => (
                          <button
                            key={opt.label}
                            onClick={() => pick(i)}
                            className={`w-full rounded-xl border px-5 py-4 text-left text-sm transition-all duration-200 hover:border-pink/50 hover:bg-pink/5 ${
                              picked[step] === i
                                ? "border-pink/60 bg-pink/10 text-white"
                                : "border-card-border bg-background text-white/90"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <button
                    onClick={back}
                    className="mt-6 text-sm text-muted transition-colors hover:text-white"
                  >
                    ← Back
                  </button>
                </motion.div>
              )}

              {/* Calculating: the brain lights up while the score builds */}
              {phase === "calculating" && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-card-border bg-card p-8 text-center sm:p-10"
                >
                  <BrainMap className="max-w-[340px]" />
                  <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                    Scoring your business...
                  </h2>
                  <div className="mx-auto mt-6 max-w-xs space-y-3 text-left">
                    {CALC_STEPS.map((label, i) => (
                      <div
                        key={label}
                        className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                          i <= calcStep ? "text-white" : "text-muted/50"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 flex-shrink-0 rounded-full ${
                            i < calcStep
                              ? "bg-pink"
                              : i === calcStep
                                ? "animate-pulse bg-pink"
                                : "bg-card-border"
                          }`}
                        />
                        {label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Score teaser + lead gate */}
              {phase === "gate" && result && (
                <motion.div
                  key="gate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* The score itself is free: they see the number, the
                      breakdown is what the gate unlocks. */}
                  <div className="rounded-2xl border border-card-border bg-card p-8 text-center sm:p-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink">
                      Your AI Opportunity Score
                    </p>
                    <div className="mt-6">
                      <ScoreGauge score={result.score} />
                    </div>
                    <p className="mt-5 text-lg font-semibold">{result.band.label}</p>
                    <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                      {result.band.headline}
                    </p>
                    {result.hoursPerWeek > 0 && (
                      <p className="mx-auto mt-4 max-w-md rounded-xl border border-pink/25 bg-pink/5 px-5 py-3 text-sm leading-relaxed">
                        We found around{" "}
                        <span className="font-bold text-pink">
                          {result.hoursPerWeek} hours a week
                        </span>{" "}
                        of automatable work in your answers. Unlock the breakdown
                        to see where it&apos;s hiding.
                      </p>
                    )}
                  </div>

                  {/* Locked breakdown preview */}
                  <div className="relative mt-6">
                    <div
                      className="pointer-events-none select-none space-y-4 blur-[6px]"
                      aria-hidden="true"
                    >
                      <div className="rounded-2xl border border-card-border bg-card p-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-pink">
                          Your business, mapped
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="h-20 rounded-xl bg-background/60" />
                          <div className="h-20 rounded-xl bg-background/60" />
                        </div>
                      </div>
                      {result.topAreas.map((area, i) => (
                        <div
                          key={area.id}
                          className="rounded-2xl border border-card-border bg-card p-6"
                        >
                          <p className="text-xs font-bold uppercase tracking-widest text-pink">
                            Opportunity {i + 1}
                          </p>
                          <h3 className="mt-2 text-lg font-bold">{area.title}</h3>
                          <p className="mt-2 text-sm text-muted">{area.outcome}</p>
                        </div>
                      ))}
                    </div>

                    {/* Gate card overlaid on the blurred breakdown */}
                    <div className="absolute inset-0 flex items-center justify-center px-2">
                      <div className="w-full max-w-lg rounded-2xl border border-pink/30 bg-card/95 p-8 text-center shadow-2xl backdrop-blur sm:p-10">
                        <h3 className="text-xl font-bold sm:text-2xl">
                          Your breakdown is <span className="gradient-text">ready</span>
                        </h3>
                        <p className="mt-3 text-sm text-muted leading-relaxed">
                          Your business mapped, the hours AI could hand back, and
                          your top 3 opportunities in plain English. Enter your
                          details to unlock it all right here, and we&apos;ll email
                          you a copy too.
                        </p>

                        <form onSubmit={submitGate} className="mt-7 space-y-4 text-left" noValidate>
                          {/* Honeypot: hidden from humans, catches bots. Not a real field. */}
                          <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            value={lead.company}
                            onChange={(e) => setLead({ ...lead, company: e.target.value })}
                            className="absolute left-[-9999px] h-0 w-0 opacity-0"
                          />
                          <div>
                            <label className="mb-2 block text-sm font-medium">Name</label>
                            <input
                              type="text"
                              required
                              value={lead.name}
                              onChange={(e) => setLead({ ...lead, name: e.target.value })}
                              className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 transition-colors focus:border-pink/50 focus:outline-none"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Email</label>
                            <input
                              type="email"
                              required
                              value={lead.email}
                              onChange={(e) => setLead({ ...lead, email: e.target.value })}
                              className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 transition-colors focus:border-pink/50 focus:outline-none"
                              placeholder="you@email.com"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Best mobile number
                            </label>
                            <input
                              type="tel"
                              required
                              value={lead.phone}
                              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                              className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 transition-colors focus:border-pink/50 focus:outline-none"
                              placeholder="07123 456789"
                            />
                            <p className="mt-1.5 text-xs text-muted/70">
                              We&apos;ll message you as soon as your results land.
                            </p>
                          </div>

                          <label className="group flex cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={lead.marketingOptIn}
                              onChange={(e) =>
                                setLead({ ...lead, marketingOptIn: e.target.checked })
                              }
                              className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded border-card-border bg-background text-pink accent-pink focus:ring-pink/50"
                            />
                            <span className="text-sm text-muted leading-relaxed transition-colors group-hover:text-white/80">
                              Keep me in the loop: send me the occasional AI and web
                              design tip, offer and update from AW Media. No spam,
                              unsubscribe anytime.
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
                            className="w-full rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {gateSending ? "Unlocking your breakdown..." : "Unlock My Breakdown"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Full results */}
              {phase === "results" && result && (
                <motion.div
                  key="results"
                  ref={resultsRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="scroll-mt-28"
                >
                  {/* Score + headline stats */}
                  <div className="rounded-2xl border border-card-border bg-card p-8 sm:p-10">
                    <div className="grid items-center gap-8 sm:grid-cols-2">
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-pink">
                          Your AI Opportunity Score
                        </p>
                        <div className="mt-5">
                          <ScoreGauge score={result.score} />
                        </div>
                        <p className="mt-4 text-lg font-semibold">{result.band.label}</p>
                      </div>
                      <div>
                        <StatTiles
                          hoursPerWeek={result.hoursPerWeek}
                          daysPerYear={result.daysPerYear}
                        />
                        <p className="mt-4 text-sm text-muted leading-relaxed">
                          {result.band.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The brain: their business mapped */}
                  <div className="mt-6 rounded-2xl border border-card-border bg-card p-6 sm:p-8">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-pink">
                        Your business, mapped
                      </p>
                      <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                        Where AI plugs in <span className="gradient-text">for you</span>
                      </h3>
                    </div>
                    <BrainMap areas={result.areaStats} className="mt-4" />
                    <p className="mx-auto max-w-md text-center text-xs text-muted leading-relaxed">
                      The brighter the node, the bigger the opportunity your answers
                      point at. Pink nodes made your top three.
                    </p>

                    <div className="mx-auto mt-8 max-w-xl">
                      <AreaBars areas={result.areaStats} />
                    </div>
                  </div>

                  {/* Top three, in plain English */}
                  <div className="mt-6 space-y-4">
                    {result.topAreas.map((area, i) => (
                      <motion.div
                        key={area.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-card-border bg-card p-6 sm:p-8"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-bold uppercase tracking-widest text-pink">
                            Opportunity {i + 1}
                          </p>
                          {area.hoursPerWeek > 0 && (
                            <span className="rounded-full border border-pink/30 bg-pink/10 px-3 py-1 text-xs font-bold text-pink">
                              ~{area.hoursPerWeek} hrs a week back
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-xl font-bold">{area.title}</h3>
                        <p className="mt-1 text-base font-medium text-white/90">
                          {area.outcome}
                        </p>
                        <p className="mt-3 text-sm text-muted leading-relaxed">{area.body}</p>
                        {area.insights.length > 0 && (
                          <div className="mt-4 rounded-xl border-l-2 border-pink bg-background/60 p-4">
                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
                              From your answers
                            </p>
                            <ul className="space-y-2">
                              {area.insights.map((insight) => (
                                <li
                                  key={insight}
                                  className="text-sm text-muted leading-relaxed"
                                >
                                  {insight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    className="mt-10 rounded-2xl border border-pink/30 bg-card p-8 text-center sm:p-10"
                  >
                    <h3 className="text-xl font-bold sm:text-2xl">
                      Want these three <span className="gradient-text">actually built?</span>
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-muted leading-relaxed">
                      We build this for businesses like yours: AI support that answers
                      while you sleep, follow-up that never slips, and marketing that
                      runs itself.
                      {result.hoursPerWeek > 0 && (
                        <>
                          {" "}
                          That&apos;s how you get those{" "}
                          <span className="font-semibold text-white/90">
                            {result.hoursPerWeek} hours a week
                          </span>{" "}
                          back.
                        </>
                      )}{" "}
                      Book a free call and we&apos;ll walk through your results
                      together.
                    </p>
                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <BookCallButton>Book a FREE Call</BookCallButton>
                      <span className="text-sm text-muted">
                        or{" "}
                        <Link
                          href="/enquiry"
                          className="whitespace-nowrap font-medium text-pink underline-offset-4 hover:underline"
                        >
                          send a quick enquiry →
                        </Link>
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
