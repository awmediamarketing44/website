"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCalendly } from "@/components/CalendlyProvider";
import { REVIEW_STATS } from "@/data/review-stats";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/awmedia.marketing/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.39 2.13c.66.66 1.34 1.07 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/awmedianmarketing",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  },
  {
    name: "Threads",
    href: "https://www.threads.net/@awmedia.marketing",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 4.379 3.616 6.499 3.535 9.95l.011 2.099c.081 3.45.772 5.57 2.119 7.117 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.36-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alex-whitehead-193549109/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
  },
];

interface LinkItem {
  label: string;
  sub?: string;
  href?: string;
  action?: "calendly";
  primary?: boolean;
}

// The two that matter. Everything else on this page is quieter than these.
const PRIMARY: LinkItem[] = [
  { label: "Book a Free Call", sub: "20 mins, no pressure", action: "calendly", primary: true },
  { label: "Free Website Audit", sub: "Instant Google-powered scores", href: "/website-audit" },
];

// The other two freebies, side by side so they stop competing with the audit above.
const TILES: LinkItem[] = [
  { label: "Social Audit", sub: "Your profiles reviewed", href: "/social-audit" },
  { label: "AI Score", sub: "Where AI saves you time", href: "/ai-score" },
];

const SECONDARY: LinkItem[] = [
  { label: "See Our Work", sub: "Recent websites + branding", href: "/work" },
  { label: "Start an Enquiry", sub: "Tell us about your project", href: "/contact" },
];

const CHEVRON = (
  <svg className="h-4 w-4 flex-shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function LinksClient() {
  const { openCalendly } = useCalendly();

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay },
  });

  const rowClass = (item: LinkItem) =>
    "block w-full rounded-2xl px-5 py-4 transition-all duration-300 " +
    (item.primary
      ? "bg-pink text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.45)]"
      : "border border-card-border bg-card hover:border-pink/40 hover:bg-card/80");

  const rowInner = (item: LinkItem) => (
    <span className="flex items-center justify-between gap-3">
      <span className="flex flex-col text-left">
        <span className={item.primary ? "text-base font-semibold" : "text-sm font-semibold"}>{item.label}</span>
        {item.sub && (
          <span className={item.primary ? "text-xs text-white/85" : "text-xs text-muted"}>{item.sub}</span>
        )}
      </span>
      {CHEVRON}
    </span>
  );

  const renderRow = (item: LinkItem, delay: number) => {
    if (item.action === "calendly") {
      return (
        <motion.button key={item.label} {...reveal(delay)} onClick={() => openCalendly()} className={rowClass(item)}>
          {rowInner(item)}
        </motion.button>
      );
    }
    const isInternal = item.href!.startsWith("/");
    return (
      <motion.div key={item.label} {...reveal(delay)}>
        {isInternal ? (
          <Link href={item.href!} className={rowClass(item)}>
            {rowInner(item)}
          </Link>
        ) : (
          <a href={item.href!} className={rowClass(item)}>
            {rowInner(item)}
          </a>
        )}
      </motion.div>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white">
      {/* Pink glow backdrop */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink/20 blur-[130px]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-14">
        {/* Photo, name, what we do */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-pink/25">
              <Image
                src="/images/team/alex-selfie.jpg"
                alt="Alex Whitehead, Director at AW Media & Marketing"
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-background">
              <div className="relative h-6 w-6">
                <Image src="/images/aw-logo-website.png" alt="" fill className="object-contain" />
              </div>
            </div>
          </div>

          <h1 className="mt-4 text-lg font-semibold">Alex Whitehead</h1>
          <p className="text-sm text-pink">AW Media &amp; Marketing</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Web. Brand. Socials. Systems. AI.
          </p>

          {/* Straight to Alex's phone, not the shared inbox */}
          <a
            href="https://wa.me/447932815405"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-xs font-semibold transition-colors duration-200 hover:border-[#25D366]/50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#25D366]" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span>WhatsApp</span>
            <span className="font-normal text-muted">+44 7932 815405</span>
          </a>

          {/* Proof, not another button */}
          <Link
            href="/reviews"
            className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5 text-xs text-muted transition-colors duration-200 hover:border-pink/30"
          >
            <span className="text-pink" aria-hidden>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
            <span>
              {REVIEW_STATS.trustpilot.count} on Trustpilot, {REVIEW_STATS.google.count} on Google
            </span>
          </Link>
        </motion.div>

        {/* The two that matter */}
        <div className="mt-9 flex w-full flex-col gap-3">
          {PRIMARY.map((item, i) => renderRow(item, 0.1 + i * 0.05))}
        </div>

        {/* Smaller freebies, two up */}
        <div className="mt-3 grid w-full grid-cols-2 gap-3">
          {TILES.map((item, i) => (
            <motion.div key={item.label} {...reveal(0.2 + i * 0.05)}>
              <Link
                href={item.href!}
                className="flex h-full flex-col rounded-2xl border border-card-border bg-card px-4 py-3 transition-all duration-300 hover:border-pink/40 hover:bg-card/80"
              >
                <span className="text-sm font-semibold">{item.label}</span>
                <span className="mt-0.5 text-[11px] leading-snug text-muted">{item.sub}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex w-full flex-col gap-3">
          {SECONDARY.map((item, i) => renderRow(item, 0.3 + i * 0.05))}
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-9 flex gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card text-muted transition-colors duration-200 hover:border-pink/30 hover:text-pink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[11px] text-muted/60">
          &copy; 2026 AW Media &amp; Marketing Ltd
        </p>
      </div>
    </main>
  );
}
