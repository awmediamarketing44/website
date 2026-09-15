"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import FloatingParticles from "@/components/FloatingParticles";
import CrmEmbed from "@/components/CrmEmbed";
import BookCallButton from "@/components/BookCallButton";
import { packages, type Lane } from "@/data/packages";
import { getDownload, magnetFormUrl } from "@/data/resources";
import { getProjectBySlug } from "@/data/projects";
import { REVIEW_STATS } from "@/data/review-stats";
import { TRUSTPILOT_REVIEWS, TRUSTPILOT_URL } from "@/data/trustpilot";

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
interface WorkItem {
  slug: string;
  name: string;
  trade: string;
  domain: string;
  line: string;
  /** Defaults to desktop.jpg. Set it when that file is not the public site. */
  img?: string;
  /** Set ONLY when the build is not live yet, so the card cannot imply it is. */
  status?: string;
}

// Every word on this page used to be us talking about us. A stranger off a cold
// ad has no reason to believe any of it, so the client's own voice goes on.
//
// QUOTES ARE READ FROM src/data/projects.ts, NEVER RETYPED, the same rule the
// prices follow. They are real and they are verbatim. If a client is not in
// there, their card gets no quote: an invented line under a real business name
// is not proof, it is a liability.
function realQuote(slug: string, maxChars?: number) {
  const t = getProjectBySlug(slug)?.testimonial;
  if (!t?.quote) return null;
  // Length is a LAYOUT gate, never an editing one. The cards sit in a grid, so
  // one 489 character review stretched its whole row and left Kensington and
  // Apex with half a card of dead space under them. A long quote is dropped
  // from the card and heard in full in the band below instead.
  // DO NOT SOLVE THIS BY TRIMMING THE QUOTE. A cut-down review under a real
  // business name is not their words any more.
  if (maxChars && t.quote.length > maxChars) return null;
  return { quote: t.quote, name: t.name, role: t.role };
}

/** Short enough to sit in a card without stretching the row. */
const CARD_QUOTE_MAX = 160;

/** Cross-trade proof, so the page is not six fitness-adjacent businesses and a
 *  claim. Picked for what a website buyer is actually nervous about: does it
 *  bring work in (Nick Firth names a result), do they stick around (ten years),
 *  do they answer the phone, and can they do a shop and not just a brochure.
 *  All verbatim from projects.ts. */
const PROOF_SLUGS = [
  "nick-firth-tiles",
  "thecoachconsultant",
  "br-accountancy",
  "jic",
  "quickfit-ev",
];

const WORK: WorkItem[] = [
  {
    slug: "kensington-scott",
    name: "Kensington Scott",
    trade: "Kitchens",
    domain: "kensingtonscott.co.uk",
    // The REDESIGN, captured from the showcase build, not the old landing page.
    // It is NOT live: kensingtonscott.co.uk and the bespoke subdomain both still
    // serve the old page, and the redesign only exists as a client preview. So
    // the card says so rather than letting the browser frame imply otherwise.
    img: "redesign-desktop.jpg",
    status: "Finished, not launched yet",
    line: "Twenty five pages behind five tabs, and a builder that prices a kitchen before anyone rings.",
  },
  {
    slug: "apex-gym-glasgow",
    name: "Apex Gym Glasgow",
    trade: "Gym",
    domain: "apexgymglasgow.com",
    line: "Groups of six, every session coached, and the six week trial starts in two taps on a phone.",
  },
  {
    slug: "dr-shabri",
    name: "Dr Shabri",
    trade: "Dentistry and aesthetics",
    domain: "drshabri.com",
    line: "Sixty six pages of treatments, three separate booking systems behind them, and a patient never lands in the wrong one.",
  },
  {
    slug: "blood-clinic",
    name: "The Blood Clinic UK",
    trade: "Clinic",
    domain: "thebloodclinic.uk",
    // Not desktop.jpg. That one is the logged-in patient portal, a results
    // dashboard with health markers on it, which is neither the public site nor
    // something that belongs on an ad lander. site-home.jpg is the homepage.
    img: "site-home.jpg",
    line: "Sixty five clinics, every test priced, and booking that finishes in one run.",
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

// The three guides that fit a websites push, in the order they matter to
// somebody who came off a websites ad. Copy is NOT retyped here: it is read from
// src/data/resources.ts so these cards cannot drift from /free-resources, and
// each one posts into its own CRM magnet form which does the email capture.
//
// These sit at the very bottom on purpose. A free thing next to a paid thing
// gives people a cheaper action, and some who would have enquired will take the
// freebie instead. Last means it only catches the ones already leaving.
const FREEBIES = [
  "what-a-website-should-cost",
  "website-that-sells-checklist",
  "local-seo-starter",
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

// The enquiry goes into the CRM, not /api/contact.
//
// Everything of Alex's runs through crm.awmedia.marketing now: the pipeline,
// partials, contracts and booking. A form posting to /api/contact would email
// him and tag ActiveCampaign but never appear in the pipeline, and the CRM only
// saves a partial once a name and number are in, which is the warmest list in
// the funnel. So this embeds the CRM's own "Website enquiry" form, exactly as
// /website-concept embeds its own.
//
// ActiveCampaign is unchanged and still the email list. It is Typeform, Calendly
// and SignWell that the CRM replaced, not AC.
//
// NOTE for attribution: this is the shared /web-design form, so these leads land
// under the same tag as every other website enquiry. If this campaign needs to be
// measured on its own, make a /websites form in the CRM and change this one line.
// Its OWN form, not the shared /web-design one, and that is the point.
// /web-design is SEVENTEEN questions and tells the visitor it takes two
// minutes. This page prints every price and argues that the number is not held
// back for a call, so sending cold ad traffic into a quote brief was the page
// contradicting its own button. 366 views and no enquiries is what that looked
// like. /websites is four questions plus the opt-in, and it carries its own
// ac_tag (lead-websites-lander) so this campaign can be measured on its own.
const FORM_URL = "https://crm.awmedia.marketing/websites";

function QuoteForm() {
  return (
    <div
      id="quote"
      className="scroll-mt-24 rounded-3xl bg-white p-3 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:p-5"
    >
      <CrmEmbed
        src={FORM_URL}
        title="Website enquiry"
        autoHeight
        minHeight={560}
      />
    </div>
  );
}

/* The proof carousel.
 *
 * This band used to be a multi-column masonry. The five reviews run 240 to 606
 * characters, so the columns packed them at wildly different heights and the
 * whole thing read as scattered rather than as proof. Alex, 8/9/2026:
 * "looks random at moment".
 *
 * One at a time fixes it: every quote gets the same box, so the eye has one
 * thing to read instead of five competing shapes.
 *
 * The box is min-height'd, NOT the quote. A carousel that resizes to its
 * content makes the page jump under the reader's thumb every time it advances,
 * and the CTA below it moves. The height is set by the longest review on file,
 * and shorter ones sit centred in it.
 *
 * QUOTES ARE STILL READ FROM projects.ts AND ARE STILL VERBATIM. Nothing here
 * trims one to make it fit.
 */
function ProofCarousel({ slugs }: { slugs: string[] }) {
  // Two sources, one list. projects.ts holds the reviews attached to a build we
  // can name; trustpilot.ts holds the ones that are just as real but have no
  // project page behind them. Both are verbatim and neither is retyped here.
  const said: { quote: string; name: string; role?: string }[] = [
    ...(slugs.map((slug) => realQuote(slug)).filter(Boolean) as {
      quote: string;
      name: string;
      role?: string;
    }[]),
    ...TRUSTPILOT_REVIEWS.map((r) => ({
      quote: r.quote,
      name: r.name,
      role: `Trustpilot, ${r.date}`,
    })),
  ];

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = said.length;

  // The box height is MEASURED off the slide that is actually mounted, then
  // animated to. A `layout` prop was tried first and does not work here: with
  // AnimatePresence mode="wait" the height went straight from 422px to 784px
  // on a 390px phone with nothing in between, which is a snap, not a
  // transition. Proven by sampling the height every 60ms through a change.
  const innerRef = useRef<HTMLDivElement>(null);
  const [boxH, setBoxH] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setBoxH(el.offsetHeight);
    update();
    // Fires on a font swap and on rotate as well as on a slide change, so the
    // height cannot get stuck at whatever it was when the slide first mounted.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [i]);

  const go = (next: number) => setI(((next % count) + count) % count);

  // Auto-advance, but never while somebody is reading it. Pausing on hover and
  // on keyboard focus matters here because the longest review is 606
  // characters, which is longer than seven seconds for most people.
  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(() => setI((v) => (v + 1) % count), 7000);
    return () => clearTimeout(t);
  }, [i, paused, count]);

  if (count === 0) return null;
  const item = said[i];

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Capped and centred. Full width, the card is a very wide box with a
          narrow column of text floating in the middle of it, which reads as
          empty rather than as considered. */}
      {/* MEASURED, NOT GUESSED. First pass I picked these minimums by eye and
          the box still jumped: 322-375px on desktop, 362-433 on tablet and
          422-784 on a 390px phone, because the same words reflow to twice the
          height in a narrow column.
          Desktop and tablet minimums are now set above the tallest review on
          file, so those two never move at all. A phone cannot be solved that
          way, 800px would leave half a screen of dead air under the short ones,
          so there the height animates instead of snapping.
          If a longer review is ever added, RE-MEASURE. These numbers are only
          right for the reviews currently in the list. */}
      <motion.div
        animate={boxH ? { height: boxH } : undefined}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-card-border bg-card"
      >
        <div
          ref={innerRef}
          className="relative flex min-h-[420px] items-center px-6 py-10 sm:min-h-[440px] sm:px-12 lg:min-h-[380px]"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full text-center"
            >
              <svg
                className="mx-auto h-7 w-7 text-pink/60"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 5.5C6.5 7 5 9.5 5 13v5.5h6V12H8.2c.2-2 1.3-3.4 3.3-4.3L9.5 5.5zm9 0C15.5 7 14 9.5 14 13v5.5h6V12h-2.8c.2-2 1.3-3.4 3.3-4.3L18.5 5.5z" />
              </svg>
              <blockquote className="mt-5 text-lg leading-relaxed text-white/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted">
                <span className="text-white/80">{item.name}</span>
                {item.role ? ` · ${item.role}` : ""}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls sit under the card, not on top of the words. */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(i - 1)}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-muted transition-colors duration-200 hover:border-pink/40 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {said.map((_, d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={`Review ${d + 1} of ${count}`}
              aria-current={d === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                d === i ? "w-6 bg-pink" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(i + 1)}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-muted transition-colors duration-200 hover:border-pink/40 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* The count is read from review-stats.ts, the one place it lives. A
          stranger can go and check the lot, which is the point of saying it. */}
      <p className="mt-5 text-center text-xs text-muted">
        <a
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-pink"
        >
          Read all {REVIEW_STATS.trustpilot.count} on Trustpilot
        </a>
      </p>
    </div>
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
function SiteCard({ item }: { item: WorkItem }) {
  const said = realQuote(item.slug, CARD_QUOTE_MAX);
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
          src={`/images/projects/${item.slug}/${item.img ?? "desktop.jpg"}`}
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
        {item.status && (
          <span className="mt-2 inline-block rounded-full border border-pink/30 bg-pink/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-pink">
            {item.status}
          </span>
        )}
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.line}</p>
        {said && (
          <figure className="mt-4 border-t border-card-border pt-4">
            <blockquote className="text-sm leading-relaxed text-white/85">
              &ldquo;{said.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-[10px] uppercase tracking-widest text-muted">
              {said.name} &middot; {said.role}
            </figcaption>
          </figure>
        )}
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
            <Link href="/" className="flex items-center" aria-label="AW Media and Marketing">
              {/* Same logo file and aspect ratio the main Navbar uses, so it
                  cannot drift away from the rest of the site. */}
              <span className="relative block h-8" style={{ aspectRatio: "200 / 79" }}>
                <Image
                  src="/images/aw-logo-website.png"
                  alt="AW Media and Marketing"
                  fill
                  priority
                  sizes="120px"
                  className="object-contain"
                />
              </span>
            </Link>
            {/* No town on this page. The ads run UK-wide, and naming a city
                tells everyone outside it the page is not for them. */}
            <span className="text-xs text-muted">UK wide</span>
          </div>
        </div>

        {/* ── Hero + form ───────────────────────────────────────────────── */}
        <section className="relative py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                  A proper website,
                  <br />
                  <span className="gradient-text">and the price up front.</span>
                </h1>

                {/* Alex's WhatsApp and review pills, lifted from /links so they
                    are the same pills, not a lookalike. Cold traffic that is not
                    ready to fill a form in will still message a person, and the
                    star line is proof rather than another button.
                    Both are py-2 here because they sit side by side, and the
                    review count is read from src/data/review-stats.ts.
                    /reviews opens in a new tab so the page we paid for stays. */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://wa.me/447932815405"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-xs font-semibold transition-colors duration-200 hover:border-[#25D366]/50"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp</span>
                    <span className="font-normal text-muted">+44 7932 815405</span>
                  </a>

                  <Link
                    href="/reviews"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-xs text-muted transition-colors duration-200 hover:border-pink/30"
                  >
                    <span className="text-pink" aria-hidden>
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </span>
                    <span>
                      {REVIEW_STATS.trustpilot.count} on Trustpilot,{" "}
                      {REVIEW_STATS.google.count} on Google
                    </span>
                  </Link>
                </div>

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
              Six we have built.
              <br />
              <span className="gradient-text">Five you can go and look at.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Different trades, different budgets, same standard. Open any of
              them on your phone and have a proper look. The sixth is Kensington
              Scott&apos;s new site, finished and waiting to go live.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORK.map((item) => (
                <SiteCard key={item.slug} item={item} />
              ))}
            </div>

            <BackToForm />
          </div>
        </section>

        {/* ── What they said ────────────────────────────────────────────────
            Real, verbatim, read from projects.ts. Everything else on this page
            is us talking about us, which is worth nothing to somebody who has
            known us for thirty seconds. NEVER put a line under a real business
            name that they did not say. ──────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Not our words.
              <br />
              <span className="gradient-text">Theirs.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              A tiler, an accountant, an industrial firm, an EV installer and
              a coach, plus a few off Trustpilot. Different trades, different
              budgets, and not one of them left wondering where we had got to.
            </p>

            <ProofCarousel slugs={PROOF_SLUGS} />

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

        {/* ── Rather talk to somebody ───────────────────────────────────── */}
        {/* Second door, same intent. Plenty of people will not fill a form in
            but will happily put twenty minutes in a diary, and we have already
            paid for the click either way. */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Would you rather
              <span className="gradient-text"> just talk it through?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Twenty minutes, no pitch. Tell us what the business does and what
              is not working, and we will tell you straight what we would build
              and what it would cost. If we are not the right fit we will say so.
            </p>
            <div className="mt-8 flex justify-center">
              <BookCallButton>Book a call</BookCallButton>
            </div>
          </div>
        </section>

        {/* ── Freebies, last on the page ────────────────────────────────── */}
        <section className="border-t border-card-border py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">
              Not ready yet?
              <span className="gradient-text"> Take something useful with you.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              No cost and nothing to cancel. The first one has our own prices in
              it, so you can hold them against whatever else you get quoted.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {FREEBIES.map((slug) => {
                const d = getDownload(slug);
                if (!d) return null;
                return (
                  <motion.a
                    key={slug}
                    href={magnetFormUrl(slug)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col rounded-2xl border border-card-border bg-card p-7 transition-colors duration-300 hover:border-pink/30"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-pink">
                        {d.kicker}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted">
                        {d.format}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug">
                      {d.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {d.description}
                    </p>
                    <span className="mt-6 text-sm font-semibold text-pink">
                      {d.cta}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="border-t border-card-border py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-xs text-muted">
            <span className="font-black tracking-tight text-white">AW MEDIA</span>
            <span>Websites, branding and social graphics. Built for businesses across the UK.</span>
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
