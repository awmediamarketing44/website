"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCalendly } from "@/components/CalendlyProvider";

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

const LINKS: LinkItem[] = [
  { label: "Book a Free Call", sub: "20 mins, no pressure", action: "calendly", primary: true },
  { label: "Free Website Audit", sub: "Instant Google-powered scores", href: "/website-audit" },
  { label: "Free Social Media Audit", sub: "Your profiles, professionally reviewed", href: "/social-audit" },
  { label: "Start an Enquiry", sub: "Tell us about your project", href: "/contact" },
  { label: "See Our Work", sub: "Recent websites + branding", href: "/work" },
  { label: "Our Services", sub: "Web, branding, SEO + more", href: "/services" },
  { label: "Read Our Reviews", sub: "What clients say", href: "/reviews" },
  { label: "Visit awmedia.marketing", sub: "The full website", href: "/" },
];

export default function LinksClient() {
  const { openCalendly } = useCalendly();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white">
      {/* Pink glow backdrop */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink/20 blur-[130px]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-14">
        {/* Logo + identity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative h-20 w-20">
            <Image src="/images/aw-logo-website.png" alt="AW Media & Marketing" fill className="object-contain" priority />
          </div>
        </motion.div>

        {/* Link buttons */}
        <div className="mt-9 flex w-full flex-col gap-3">
          {LINKS.map((item, i) => {
            const inner = (
              <span className="flex items-center justify-between gap-3">
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold">{item.label}</span>
                  {item.sub && (
                    <span className={item.primary ? "text-xs text-white/85" : "text-xs text-muted"}>
                      {item.sub}
                    </span>
                  )}
                </span>
                <svg className="h-4 w-4 flex-shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            );
            const base =
              "block w-full rounded-2xl px-5 py-4 transition-all duration-300 " +
              (item.primary
                ? "bg-pink text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.45)]"
                : "border border-card-border bg-card hover:border-pink/40 hover:bg-card/80");
            const motionProps = {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: 0.1 + i * 0.05 },
            };

            if (item.action === "calendly") {
              return (
                <motion.button key={item.label} {...motionProps} onClick={() => openCalendly()} className={base}>
                  {inner}
                </motion.button>
              );
            }
            const isInternal = item.href!.startsWith("/");
            return (
              <motion.div key={item.label} {...motionProps}>
                {isInternal ? (
                  <Link href={item.href!} className={base}>
                    {inner}
                  </Link>
                ) : (
                  <a href={item.href!} className={base}>
                    {inner}
                  </a>
                )}
              </motion.div>
            );
          })}
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
          &copy; {2026} AW Media &amp; Marketing Ltd
        </p>
      </div>
    </main>
  );
}
