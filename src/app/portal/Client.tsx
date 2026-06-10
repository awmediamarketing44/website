"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import BookCallButton from "@/components/BookCallButton";
import Footer from "@/components/Footer";

const PORTAL_JOIN_URL = "https://portal.awmedia.marketing/join.php";
const PORTAL_LOGIN_URL = "https://portal.awmedia.marketing/";

const tools = [
  {
    tag: "Review",
    title: "Carousel Reviewer",
    description:
      "Upload your slides or paste a post link and get a scored, slide-by-slide review before you publish. Hooks, flow, design, copy, the lot.",
  },
  {
    tag: "Audit",
    title: "Social Media Audit",
    description:
      "A full review of your Instagram profile: setup, content, consistency and engagement, with a prioritised list of what to fix first.",
  },
  {
    tag: "Rewrite",
    title: "Improve Your Copy",
    description:
      "Paste a caption, bio or email and get it rewritten properly. Pick the tone, keep your voice, lose the waffle.",
  },
  {
    tag: "Research",
    title: "Content Researcher",
    description:
      "Ten ranked, postable content ideas in your niche, researched fresh from the web, each with a source, a format and an angle.",
  },
  {
    tag: "Compare",
    title: "Competitor Analysis",
    description:
      "Your profile against a competitor's, side by side. What they do better, what you do better, and five specific ideas worth stealing.",
  },
  {
    tag: "Chat",
    title: "Ask Alex",
    description:
      "Chat with an AI trained on a decade of real agency experience. Instant, straight answers on content, design and what to post.",
  },
];

const included = [
  "All six AI tools, ready to use the minute you log in",
  "The Coach Prompt Library and practical how-to guides",
  "New tools added as we release them, at no extra cost",
  "Cancel anytime from your own billing page",
];

const steps = [
  {
    step: "01",
    title: "Sign up",
    description:
      "Secure checkout through Stripe. £29 a month, no contract, takes about two minutes.",
  },
  {
    step: "02",
    title: "Set your password",
    description:
      "We email you a link straight after checkout. Click it, set a password, done.",
  },
  {
    step: "03",
    title: "Start using the tools",
    description:
      "Log in and everything is there waiting. Run your first audit or review today.",
  },
];

export default function PortalClient() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader
          tag="AI Portal"
          title="Your AI content toolkit,"
          titleAccent="for £29 a month."
          description="The same AI tools our agency clients use every week: carousel reviews, social audits, copy rewrites, content research, competitor analysis and an AI you can actually ask things. One login, one low monthly price."
        />

        {/* Tools grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-2xl border border-card-border bg-card p-8 transition-all duration-500 hover:border-pink/30"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-pink">
                    {tool.tag}
                  </span>
                  <h2 className="mt-3 text-xl font-bold">{tool.title}</h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl lg:text-4xl font-bold"
            >
              In the portal <span className="gradient-text">within minutes.</span>
            </motion.h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-card-border bg-card p-8"
                >
                  <span className="text-sm font-bold text-pink">{step.step}</span>
                  <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing card */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-pink/30 bg-card p-10 lg:p-14 text-center"
            >
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-pink/15 rounded-full blur-[100px]" />
              <div className="relative">
                <span className="inline-block rounded-full border border-pink/30 bg-pink/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pink">
                  Membership
                </span>
                <div className="mt-6 flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-extrabold">£29</span>
                  <span className="text-lg text-muted">/month</span>
                </div>
                <p className="mt-3 text-sm text-muted">
                  No contract. No setup fee. Cancel anytime.
                </p>

                <ul className="mt-8 space-y-3 text-left max-w-md mx-auto">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink"
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
                  ))}
                </ul>

                <a
                  href={PORTAL_JOIN_URL}
                  className="mt-10 inline-block rounded-full bg-pink px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
                >
                  Get instant access
                </a>
                <p className="mt-4 text-sm text-muted">
                  Already a member?{" "}
                  <a
                    href={PORTAL_LOGIN_URL}
                    className="text-pink font-medium hover:underline underline-offset-4"
                  >
                    Log in here
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-16 text-center"
            >
              <p className="text-muted mb-6">
                Rather have us do the content for you? That&apos;s our
                done-for-you design subscription.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <BookCallButton>Book a FREE Call</BookCallButton>
                <span className="text-sm text-muted">
                  or{" "}
                  <Link
                    href="/enquiry"
                    className="whitespace-nowrap text-pink font-medium hover:underline underline-offset-4"
                  >
                    send a quick enquiry →
                  </Link>
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
