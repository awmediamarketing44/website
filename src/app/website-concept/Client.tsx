"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import FloatingParticles from "@/components/FloatingParticles";
import CrmEmbed from "@/components/CrmEmbed";

// ─────────────────────────────────────────────────────────────────────────────
// This is a cold-traffic ad lander, so it breaks from the rest of the site on
// purpose:
//
//  1. The form sits in the hero, not four screens down. Meta traffic is almost
//     all mobile and almost none of it scrolls to the bottom of a page it did
//     not go looking for.
//  2. No Navbar. The site nav is eight ways off a page we paid to land them on.
//     A logo bar keeps the trust without the exits.
//  3. No scarcity and no picking. Everyone who fills this in gets a concept, so
//     the page must not read as an audition.
//
// The turnaround promise lives here so it changes in one place. It is also said
// in the CRM form's confirm_p, so change both together.
const TURNAROUND = "within 48 hours";
// ─────────────────────────────────────────────────────────────────────────────

const FORM_URL = "https://crm.awmedia.marketing/website-concept";

const HERO_POINTS = [
  "A real page in a browser, not a flat mockup",
  "Built around your business, not a template",
  `Yours to look at ${TURNAROUND}`,
];

const GET = [
  {
    title: "A real page, not a picture of one",
    body: "Your concept runs live in a browser. Open it on your phone, scroll it, click it, show it to whoever you make decisions with. Most people have seen a flat mockup. Almost nobody has been handed a working version of their own website.",
  },
  {
    title: "How it would actually get built",
    body: "The project laid out phase by phase, what happens in each one, what we need from you and how long the whole thing takes. No mystery, no vague timescales.",
  },
  {
    title: "The exact price",
    body: "Not a range, not a starting from, and not a call you have to sit through first. The real number for the site you are looking at, on the same page.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "You tell us about the business",
    body: "Two minutes of questions. What you do, what the site needs to bring you, and what you have got at the moment.",
  },
  {
    n: "02",
    title: "We design it",
    body: "A proper homepage written and built around what you actually do. Same team and same standard as the paid work further down this page.",
  },
  {
    n: "03",
    title: "It lands on your phone",
    body: `A private link ${TURNAROUND}, and we message you on WhatsApp when it is ready. Yours to sit on for 30 days.`,
  },
];

const FOR_YOU = [
  "You have got a business that is going somewhere and a website that is holding it back",
  "You have never had a website and cannot picture what yours would even look like",
  "You have had a quote before and could not tell what you were actually paying for",
  "You want to see the thing before you spend anything on it",
];

const NOT_FOR_YOU = [
  "You want free design work to hand to somebody cheaper",
  "You are after a template with your logo dropped on it",
  "You need it live next week",
];

// Alex picked these three (24 Aug 2026). Deliberately not three of the same
// thing: a gym, a coaching brand and a courier firm, so a cold visitor from any
// industry sees at least one business that is not miles from their own.
const PROOF = [
  { name: "Apex Gym Glasgow", slug: "apex-gym-glasgow" },
  { name: "Physique Method", slug: "physique-method" },
  { name: "Dixons Dispatch", slug: "dixons-dispatch" },
];

const FAQS = [
  {
    q: "Is it actually free?",
    a: "Yes. No card, no deposit, nothing to cancel. You fill the form in, we build it, you have a look.",
  },
  {
    q: "Why would you do that for nothing?",
    a: "Because showing you beats telling you. Most people cannot picture what their website could be, so we stopped trying to describe it and started building it instead. Some people hire us after they have seen theirs. That is the whole business case, and it is a better advert than anything we could write.",
  },
  {
    q: "What is the catch?",
    a: "There is not one, but here is the honest bit. What you get free is the concept, not the finished website, so the files themselves come with the build. If you do not go ahead you keep your concept link for 30 days and we will not chase you.",
  },
  {
    q: "What if I do not like it?",
    a: "Tell us and we will say thanks for the honesty. You have lost two minutes on a form. We would rather find out now than three weeks into a paid project.",
  },
  {
    q: "What does the real thing cost?",
    a: "You get the exact number with your concept, on the same page, for the site you are actually looking at. We would rather price what we have built you than quote you a range that means nothing.",
  },
];

function Check() {
  return (
    <svg
      className="w-4 h-4 mt-1 flex-shrink-0 text-pink"
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

function Cross() {
  return (
    <svg
      className="w-4 h-4 mt-1 flex-shrink-0 text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// The form card. Rendered once in the hero; the CTAs further down scroll back
// to it rather than repeating the embed, so there is only ever one form on the
// page and only one thing for the CRM to track.
function FormCard() {
  return (
    <div
      id="apply"
      className="scroll-mt-24 rounded-3xl bg-white p-3 sm:p-5 shadow-2xl shadow-black/40 ring-1 ring-white/10"
    >
      <CrmEmbed
        src={FORM_URL}
        title="Free website concept"
        autoHeight
        minHeight={520}
      />
    </div>
  );
}

// Every CTA on this page is this one button and it always scrolls back to the
// single form in the hero. On a phone the form is off screen for four sections
// after the hero, so there has to be a way back to it before the very bottom.
function BackToForm() {
  return (
    <div className="mt-14 text-center">
      <a
        href="#apply"
        className="inline-block rounded-full bg-pink px-8 py-4 font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        Get my free concept
      </a>
      <p className="mt-3 text-xs text-muted">
        Two minutes. No card, no obligation.
      </p>
    </div>
  );
}

export default function Client() {
  return (
    <>
      <FloatingParticles count={16} />

      {/* Logo bar. Deliberately not the site Navbar: this is paid traffic and
          every nav link is a way off the page before they have done anything. */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center px-6 py-6">
        <span className="relative block" style={{ width: 104, aspectRatio: "200 / 79" }}>
          <Image
            src="/images/aw-logo-website.png"
            alt="AW Media"
            fill
            priority
            sizes="104px"
            className="object-contain"
          />
        </span>
      </header>

      <main>
        {/* ── Hero + form ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pb-20 pt-6 lg:pt-12">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/10 blur-[120px]"
          />

          <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* Pitch */}
            <div className="lg:pt-6">
              <span className="anim-fade-up inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink">
                Free website concept
              </span>

              <h1 className="anim-fade-up mt-6 text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Ever wondered what your website{" "}
                <span className="gradient-text">could actually look like?</span>
              </h1>

              <p
                className="anim-fade-up mt-5 max-w-xl text-lg leading-relaxed text-muted"
                style={{ animationDelay: "0.12s" }}
              >
                We will design you one for free. Not a mockup, a real page you can
                open on your phone. Fill the form in and we will get started.
              </p>

              <ul
                className="anim-fade-up mt-7 space-y-3"
                style={{ animationDelay: "0.2s" }}
              >
                {HERO_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p
                className="anim-fade-up mt-7 text-xs text-muted"
                style={{ animationDelay: "0.28s" }}
              >
                No card, no obligation, no sitting through a call first.
              </p>
            </div>

            {/* Form */}
            <div className="anim-fade-up lg:sticky lg:top-8" style={{ animationDelay: "0.16s" }}>
              <FormCard />
              <p className="mt-4 text-center text-xs text-muted">
                Trouble with the form?{" "}
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-pink underline-offset-4 hover:underline"
                >
                  Open it in a new tab
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Proof ───────────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              These all started as a concept
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Real businesses, real sites, all live. Have a look at what came out
              the other end.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {PROOF.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-card-border bg-card px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:border-pink/40"
                >
                  {p.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── What you get ────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              What actually lands on your phone
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {GET.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-card-border bg-card p-8"
                >
                  <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-pink font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold uppercase tracking-wide leading-snug">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{g.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-card-border bg-card p-8"
                >
                  <span className="text-4xl font-extrabold text-pink/30">{s.n}</span>
                  <h3 className="mt-3 text-lg font-bold uppercase tracking-wide">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
            <BackToForm />
          </div>
        </section>

        {/* ── Who it is for ───────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-card-border bg-card p-8">
                <h3 className="text-lg font-bold uppercase tracking-wide">This is for you if</h3>
                <ul className="mt-6 space-y-4">
                  {FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted">
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-card-border bg-card p-8">
                <h3 className="text-lg font-bold uppercase tracking-wide">It is not for you if</h3>
                <ul className="mt-6 space-y-4">
                  {NOT_FOR_YOU.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted">
                      <Cross />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-muted">
                  We would rather say that up front than build something for
                  somebody who was never going to use it.
                </p>
              </div>
            </div>
            <BackToForm />
          </div>
        </section>

        {/* ── FAQs ────────────────────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              Before you ask
            </h2>
            <div className="mt-10 space-y-4">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-card-border bg-card p-6"
                >
                  <h3 className="font-bold tracking-wide">{f.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              ))}
            </div>

            <BackToForm />
          </div>
        </section>
      </main>
    </>
  );
}
