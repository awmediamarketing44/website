"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/Footer";

const inbox = [
  {
    title: "The fix that just worked on a real job",
    body: "Something we changed on a live site last week and what it did to their enquiries. Not theory, the actual before and after.",
  },
  {
    title: "Why your quiet website is quiet",
    body: "The unglamorous reasons good businesses get skipped online, and the version of your page that gets picked instead.",
  },
  {
    title: "What things should cost",
    body: "Straight numbers on websites, branding and support, so you can tell when a quote is fair and when you are being had.",
  },
  {
    title: "Where AI genuinely saves you time",
    body: "The bits we hand to AI, the bits we still do by hand, and how to tell the difference when someone sells you the fast version.",
  },
  {
    title: "First look at anything new",
    body: "Free tools, guides and offers go out to the list before they go anywhere else.",
  },
];

const notThis = [
  "No 40 minute read that could have been a paragraph.",
  "No jargon you would need to Google halfway through.",
  "No pitch bolted onto the end of every single email.",
  "No handing your details to anyone else, ever.",
  "No hoops to leave. One click at the bottom and you are off the list.",
];

function Tick() {
  return (
    <svg
      className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-pink/30 bg-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink/10">
          <svg
            className="h-6 w-6 text-pink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-5 text-xl font-bold">You are on the list</h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Check your inbox, there is a welcome email on its way. The first
          proper one lands with the next send.
        </p>
        <Link
          href="/free-resources"
          className="mt-6 inline-block rounded-full border border-card-border px-6 py-3 text-sm font-semibold transition-colors hover:border-pink/40 hover:text-pink"
        >
          Grab a free guide while you wait
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card p-8">
      <h2 className="text-xl font-bold">Join the list</h2>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Two fields, and you are on. Free, and it stays free.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        {/* Honeypot: hidden from humans, catches bots. Not a real field. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <div>
          <label htmlFor="nl-name" className="block text-sm font-medium mb-2">
            First name
          </label>
          <input
            id="nl-name"
            type="text"
            required
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="nl-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white placeholder-muted/50 focus:border-pink/50 focus:outline-none transition-colors"
            placeholder="you@email.com"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Signing you up..." : "Send me the emails"}
        </button>

        <p className="text-xs text-muted leading-relaxed">
          By signing up you are happy for us to email you tips, updates and the
          odd offer. We will not pass your details to anyone and you can leave
          in one click. See our{" "}
          <Link
            href="/privacy-policy"
            className="text-pink hover:underline underline-offset-4"
          >
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

export default function NewsletterClient() {
  return (
    <>
      <FloatingParticles count={16} />
      <Navbar />
      <main>
        <PageHeader
          tag="Newsletter"
          title="The stuff that gets you picked"
          titleAccent="over the other lot."
          description="Short emails on what actually makes a small business website bring in work. They go out when there is something worth sending, not to fill a slot. Written for owners, not marketers. Free, and you can leave whenever you want."
        />

        {/* ---------- Signup + what lands ---------- */}
        <section id="signup" className="pb-16 scroll-mt-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
              {/* What lands in your inbox */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-pink">
                  What lands in your inbox
                </span>
                <h2 className="mt-3 text-2xl lg:text-3xl font-bold">
                  Things you can use on Monday morning
                </h2>

                <ul className="mt-8 space-y-6">
                  {inbox.map((item, i) => (
                    <motion.li
                      key={item.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <Tick />
                      <div>
                        <p className="font-semibold leading-snug">{item.title}</p>
                        <p className="mt-1.5 text-sm text-muted leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Form. Sits first on mobile so the signup is the first thing
                  under the hero, then back to the right column on desktop. */}
              <div className="order-first lg:order-none lg:sticky lg:top-28">
                <SignupForm />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- What it is not ---------- */}
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-pink">
                  The small print, in plain English
                </span>
                <h2 className="mt-3 text-2xl lg:text-3xl font-bold">
                  What you will not get
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  We run this list the way we would want to be on one. If an
                  email is not worth your two minutes, it does not go out.
                </p>
              </div>

              <ul className="space-y-4">
                {notThis.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-muted">
                    <Tick />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-card-border bg-card p-10 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Ten years of doing this, sent to your inbox
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-muted leading-relaxed">
                We have built over 450 websites and brands since 2016. Everything
                that keeps working goes in the emails. Everything that stopped
                working does too, so you do not waste a year finding out.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#signup"
                  className="rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300"
                >
                  Join the list
                </a>
                <Link
                  href="/free-resources"
                  className="rounded-full border border-card-border px-8 py-3.5 text-sm font-semibold transition-colors hover:border-pink/40 hover:text-pink"
                >
                  See the free guides
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
