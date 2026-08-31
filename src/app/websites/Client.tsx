"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import FloatingParticles from "@/components/FloatingParticles";
import { packages, type Lane } from "@/data/packages";

// ─────────────────────────────────────────────────────────────────────────────
// Websites lander. Cold Meta traffic, so it breaks from the rest of the site
// the same way /website-concept does, and for the same reasons:
//
//  1. The form sits in the hero. Almost none of this traffic scrolls to the
//     bottom of a page it did not go looking for.
//  2. No Navbar. The site nav is eight ways off a page we paid to land on.
//  3. One form on the page. Every CTA below scrolls back to it, so there is
//     only ever one thing to measure.
//
// Two things this page does that the concept lander deliberately does not:
//  4. It carries the price. Alex's call, 31/8/2026. Every number is read from
//     src/data/packages.ts, so pricing changes in one place and this page
//     cannot drift away from the quotes that go out.
//  5. It shows finished client work. Every site in the rail is LIVE, shot from
//     the existing project images, with its real domain in the browser bar.
//     Nothing in here is a concept or a mockup, because a page selling
//     websites must not show work that was never built.
// ─────────────────────────────────────────────────────────────────────────────

// The showcase rail. Images and URLs both come from what is already in the
// repo (public/images/projects + src/data/projects.ts), so swapping a site in
// or out is one entry here and nothing else.
const WORK = [
  {
    slug: "kensington-scott",
    name: "Kensington Scott",
    trade: "Kitchens",
    domain: "kensingtonscott.co.uk",
    line: "Twenty five pages behind five tabs, and a builder that prices a kitchen live before anyone rings.",
  },
  {
    slug: "hotchen-construction",
    name: "Hotchen Construction",
    trade: "Construction",
    domain: "hotchenconstruction.com",
    line: "The work does the selling. Projects up front, so a stranger can see the standard before they read a word.",
  },
  {
    slug: "br-accountancy",
    name: "BR Accountancy",
    trade: "Accountancy",
    domain: "braccountancy.co.uk",
    line: "No logo, no brand and no site when we started. Accountancy is a trust business, so we built the trust first.",
  },
  {
    slug: "blood-clinic",
    name: "The Blood Clinic UK",
    trade: "Clinic",
    domain: "thebloodclinic.uk",
    line: "Tests, prices and booking in one run, so nobody has to ring up to find out what anything costs.",
  },
  {
    slug: "dixons-dispatch",
    name: "Dixons Dispatch",
    trade: "Logistics",
    domain: "dixonsdispatch.co.uk",
    line: "A site that explains a service most people have to be talked through, without anyone doing the talking.",
  },
  {
    slug: "calibre-coaching",
    name: "Calibre Coaching",
    trade: "Coaching",
    domain: "calibre-coaching.com",
    line: "One job on the page, get the right people enquiring, and the rest of it built to stay out of the way.",
  },
];

const HERO_POINTS = [
  "Custom designed, never a template",
  "Live in 2 to 10 weeks depending on the build",
  "The price is on this page, not held back for a call",
];

const GET = [
  {
    title: "A site built round what you actually do",
    body: "We start with what the business needs the site to bring in, then design to that. Not a theme with your logo dropped in the corner and your words poured into somebody else's layout.",
  },
  {
    title: "It works on a phone properly",
    body: "Most of your visitors are on one. Every build is designed for that screen first and checked on real devices, rather than shrunk down at the end and hoped for.",
  },
  {
    title: "Found on Google, and set up to be measured",
    body: "On-page SEO, schema where it helps, Analytics and Search Console wired in from day one. So you can see where an enquiry came from instead of guessing.",
  },
  {
    title: "You are not left with it",
    body: "Support after launch, and a person on WhatsApp rather than a ticket queue. If something needs changing, give us a shout and we will get it sorted.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "You tell us about the business",
    body: "What you do, who buys from you, and what the site has to bring in. A form now, then a proper conversation.",
  },
  {
    n: "02",
    title: "We design it",
    body: "You see the design before anything gets built, and your revisions happen there. Nothing goes into build until you are happy with how it looks.",
  },
  {
    n: "03",
    title: "We build it and you check it",
    body: "Built, filled in, tested on real phones. You get a link, have a proper look, and tell us what needs changing.",
  },
  {
    n: "04",
    title: "It goes live",
    body: "We handle the launch, the redirects and the search setup. Then you have got us for a fortnight or a month, depending on the lane.",
  },
];

const FAQS = [
  {
    q: "What is the difference between the two lanes?",
    a: "AI-accelerated is quicker and cheaper because we use AI to get through the exploration and the first drafts, then our team refines it. Bespoke gets a strategy session, a custom design system and human-written copy. Both are designed for you and neither is a template. The lane changes how we get there and how long it takes, not whether it is custom.",
  },
  {
    q: "Is that the real price?",
    a: "Yes, and it excludes VAT. If your job needs something outside what is listed we will tell you what it adds before you commit to anything. What we will not do is quote you one number and invoice you another.",
  },
  {
    q: "What about hosting and the domain?",
    a: "Charged separately, or you keep them where they are if you would rather. We are happy either way and we will tell you honestly which works out better for you.",
  },
  {
    q: "How much of my time does this take?",
    a: "Less than you think. The content sheet is the big one and most people do it in a sitting. After that it is looking at things and telling us what you think.",
  },
  {
    q: "What if I do not know what I want?",
    a: "That is normal, and it is our job not yours. Tell us what the business does and what is not working, and we will come back with what we would build and why. Ask as many questions as you want along the way, even the ones you think are daft.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function QuoteForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lane: "",
    service: "website",
    message: "",
    marketingOptIn: false,
    company: "", // honeypot — must stay empty; bots fill it, humans never see it
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      router.push("/thank-you?form=websites");
    } catch {
      setError(
        "Something went wrong. Try again, or email office@awmedia.marketing and we will pick it up."
      );
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-muted focus:border-pink/60";

  return (
    <form
      id="quote"
      onSubmit={handleSubmit}
      className="scroll-mt-24 space-y-4 rounded-3xl border border-card-border bg-card p-6 shadow-2xl shadow-black/40 sm:p-8"
    >
      <div>
        <h2 className="text-xl font-black tracking-tight">Get a price</h2>
        <p className="mt-1 text-sm text-muted">
          Two minutes. We come back to you with what we would build and what it
          costs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={field}
        />
        <input
          required
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={field}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className={field}
          aria-label="What you need"
        >
          <option value="landing-page">Landing page</option>
          <option value="website">Website</option>
          <option value="online-store">Online store</option>
          <option value="other">Not sure yet</option>
        </select>
        <select
          value={formData.lane}
          onChange={(e) => setFormData({ ...formData, lane: e.target.value })}
          className={field}
          aria-label="Which lane"
        >
          <option value="">Which lane, if you know</option>
          <option value="ai">AI-accelerated</option>
          <option value="bespoke">Bespoke</option>
        </select>
      </div>

      <textarea
        rows={3}
        placeholder="What does the business do, and what is not working at the moment?"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={field}
      />

      {/* Honeypot. Visually hidden, never focusable, never announced. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-3 text-xs text-muted">
        <input
          type="checkbox"
          checked={formData.marketingOptIn}
          onChange={(e) =>
            setFormData({ ...formData, marketingOptIn: e.target.checked })
          }
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-pink"
        />
        <span>
          Send us the odd email about websites and what is working. No spam, and
          you can drop off whenever you want.
        </span>
      </label>

      {error && <p className="text-sm text-pink">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-pink px-8 py-4 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {sending ? "Sending..." : "Get my price"}
      </button>

      <p className="text-center text-xs text-muted">
        No card, no obligation, and we will not ring you out of the blue.
      </p>
    </form>
  );
}

function BackToForm({ label = "Get my price" }: { label?: string }) {
  return (
    <div className="mt-14 text-center">
      <a
        href="#quote"
        className="inline-block rounded-full bg-pink px-8 py-4 font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        {label}
      </a>
      <p className="mt-3 text-xs text-muted">
        Two minutes. No card, no obligation.
      </p>
    </div>
  );
}

// A live client site in a browser frame. The domain is real and the site is
// live, so the bar can carry it. Nothing in this rail is a concept.
function SiteCard({ item }: { item: (typeof WORK)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-2xl border border-card-border bg-card transition-colors duration-300 hover:border-pink/30"
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-card-border bg-white/[0.03] px-3">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="mx-2 flex h-4 flex-1 items-center rounded border border-white/10 bg-white/5 px-2 font-mono text-[9px] text-muted">
          {item.domain}
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full bg-black">
        <Image
          src={`/images/projects/${item.slug}/desktop.jpg`}
          alt={`${item.name} website`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-bold">{item.name}</h3>
          <span className="text-[10px] uppercase tracking-widest text-muted">
            {item.trade}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.line}</p>
      </div>
    </motion.div>
  );
}

function PriceCard({
  tierName,
  lane,
  variant,
  highlight,
}: {
  tierName: string;
  lane: Lane;
  variant: (typeof packages)[number]["ai"];
  highlight?: boolean;
}) {
  const isAI = lane === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 lg:p-8 ${
        highlight
          ? "border-pink/40 bg-gradient-to-b from-pink/[0.04] to-card hover:border-pink/60"
          : "border-card-border bg-card hover:border-pink/20"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-pink px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          Most popular
        </span>
      )}

      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span
          className={`text-xs font-bold uppercase tracking-widest ${
            isAI ? "text-pink" : "text-white"
          }`}
        >
          {isAI ? "AI" : "Bespoke"} {tierName}
        </span>
        <span className="text-xs text-muted">{variant.turnaround}</span>
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {variant.price}
        </span>
        <span className="text-xs text-muted">+ VAT</span>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted">{variant.tagline}</p>

      <ul className="mb-8 flex-1 space-y-2.5">
        {[...variant.features, variant.revisions, variant.support].map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
          >
            <svg
              className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                isAI ? "text-pink" : "text-white"
              }`}
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
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#quote"
        className={`mt-auto block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 ${
          highlight
            ? "bg-pink text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
            : "border border-card-border bg-background text-white hover:border-pink/50 hover:text-pink"
        }`}
      >
        Get this priced up
      </a>
    </motion.div>
  );
}

export default function WebsitesClient() {
  const [lane, setLane] = useState<Lane>("ai");

  return (
    <>
      <FloatingParticles count={20} />

      {/* No overflow-x-hidden on main. Hiding one axis forces the other to
          compute to auto, which turns main into a scroll container and stops
          the whileInView reveals ever firing. */}
      <main>
        {/* Logo bar. Keeps the trust, without giving cold traffic eight exits. */}
        <div className="border-b border-card-border">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-sm font-black tracking-tight">
              AW MEDIA
            </Link>
            <span className="text-xs text-muted">Sheffield</span>
          </div>
        </div>

        {/* ── Hero + form ───────────────────────────────────────────────── */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                  Websites
                </span>

                <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                  A proper website,
                  <br />
                  <span className="gradient-text">and the price up front.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                  We build websites for businesses that need one doing properly.
                  Designed round what you actually do, live in weeks rather than
                  months, and you can see what it costs without sitting through a
                  call first.
                </p>

                <ul className="mt-8 space-y-3">
                  {HERO_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-pink"
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
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <QuoteForm />
            </div>
          </div>
        </section>

        {/* ── The work ──────────────────────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              These are all live,
              <br />
              <span className="gradient-text">and you can go and look.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Different trades, different budgets, same standard. Open any of
              them on your phone and have a proper look.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORK.map((item) => (
                <SiteCard key={item.slug} item={item} />
              ))}
            </div>

            <BackToForm />
          </div>
        </section>

        {/* ── What you get ──────────────────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              What you actually
              <span className="gradient-text"> get.</span>
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {GET.map((g) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-card-border bg-card p-7"
                >
                  <h3 className="text-lg font-bold">{g.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{g.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              The prices,
              <span className="gradient-text"> all of them.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Two lanes on every build. AI-accelerated is quicker and cheaper.
              Bespoke gets a strategy session and a custom design system. Both
              are designed for you, neither is a template.
            </p>

            {/* Lane toggle */}
            <div className="mt-8 inline-flex rounded-full border border-card-border bg-card p-1">
              {(["ai", "bespoke"] as Lane[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLane(l)}
                  aria-pressed={lane === l}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                    lane === l ? "bg-pink text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {l === "ai" ? "AI-accelerated" : "Bespoke"}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {packages.map((tier) => (
                <PriceCard
                  key={tier.slug}
                  tierName={tier.name}
                  lane={lane}
                  variant={tier[lane]}
                  highlight={tier.slug === "website"}
                />
              ))}
            </div>

            <p className="mt-8 text-sm text-muted">
              All prices exclude VAT. Hosting and the domain are charged
              separately, or you keep them where they are.
            </p>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              How it
              <span className="gradient-text"> goes.</span>
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-card-border bg-card p-6"
                >
                  <span className="text-xs font-bold tracking-widest text-pink">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <BackToForm />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Questions people
              <span className="gradient-text"> actually ask.</span>
            </h2>

            <div className="mt-10 space-y-4">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-card-border bg-card p-6"
                >
                  <summary className="cursor-pointer list-none font-bold">
                    <span className="flex items-start justify-between gap-4">
                      {f.q}
                      <span className="mt-1 flex-shrink-0 text-pink transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>

            <BackToForm label="Right, price mine up" />
          </div>
        </section>

        <footer className="border-t border-card-border py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-xs text-muted">
            <span className="font-black tracking-tight text-white">AW MEDIA</span>
            <span>Websites, branding and social graphics. Sheffield.</span>
            <div className="mt-2 flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
