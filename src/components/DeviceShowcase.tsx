"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Interactive desktop/mobile viewer for case studies. Instead of a live iframe
// (which many client sites block via X-Frame-Options / CSP, and which tanks the
// page's Core Web Vitals), we scroll a full-page screenshot inside a browser or
// phone frame. Gives the "browse the whole live site, both views" feel, but
// stays fast and never renders a blank box. The URL bar links to the real site.

interface DeviceShowcaseProps {
  title: string;
  desktopSrc: string; // ideally a full-page tall grab (desktop-full.jpg)
  mobileSrc?: string;
  website?: string; // live URL — powers the clickable URL bar + "Visit live site"
}

function domainFrom(url?: string): string {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function DeviceShowcase({
  title,
  desktopSrc,
  mobileSrc,
  website,
}: DeviceShowcaseProps) {
  const hasMobile = Boolean(mobileSrc);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const domain = domainFrom(website);

  return (
    <div className="w-full">
      {/* Toggle + live link row */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {hasMobile ? (
          <div className="inline-flex items-center gap-1 rounded-full border border-card-border bg-card p-1">
            {(["desktop", "mobile"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  view === v ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {view === v && (
                  <motion.span
                    layoutId="device-toggle-pill"
                    className="absolute inset-0 rounded-full bg-pink/90"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {v === "desktop" ? <DesktopIcon /> : <MobileIcon />}
                  {v === "desktop" ? "Desktop" : "Mobile"}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted">Desktop view</span>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink hover:gap-3 transition-all duration-200"
          >
            Visit live site
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "desktop" || !hasMobile ? (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Browser frame */}
            <div className="relative mx-auto w-full max-w-[1200px] rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_120px_-25px_rgba(249,38,114,0.35)] overflow-hidden">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 h-11 px-4 border-b border-white/10 bg-white/[0.03]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="flex-1 mx-3 h-6 rounded-md bg-white/5 border border-white/10 flex items-center px-3 text-[10px] sm:text-xs text-muted font-mono truncate">
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-pink transition-colors truncate"
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#28c840] animate-pulse" />
                      <span className="text-pink/70">https://</span>
                      <span className="truncate">{domain}</span>
                    </a>
                  ) : (
                    <span className="truncate">{title}</span>
                  )}
                </div>
              </div>
              {/* Scrollable full-page screenshot */}
              <div className="relative">
                <div className="aw-device-scroll max-h-[540px] overflow-y-auto overscroll-contain bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={desktopSrc}
                    alt={`${title} — desktop`}
                    className="block w-full select-none"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Scroll inside the window to explore, or open the live site.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Phone frame with scrollable screen */}
            <div
              className="relative w-full max-w-[300px]"
              style={{ aspectRatio: "9 / 19.5" }}
            >
              <div
                className="absolute inset-0 rounded-[13%/6%] bg-[#0a0a0c]"
                style={{
                  padding: "2.2%",
                  boxShadow:
                    "0 30px 80px -25px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 0 1.5px rgba(255,255,255,0.03)",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[11%/5%] bg-black">
                  {/* Scrollable screen (below the status bar zone) */}
                  <div
                    className="aw-device-scroll absolute left-0 right-0 bottom-0 overflow-y-auto overscroll-contain"
                    style={{ top: "4.5%" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mobileSrc}
                      alt={`${title} — mobile`}
                      className="block w-full select-none"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                  {/* Status bar zone with dynamic island */}
                  <div
                    className="absolute top-0 left-0 right-0 flex items-center justify-center bg-black z-10"
                    style={{ height: "4.5%" }}
                  >
                    <div
                      className="rounded-full bg-black"
                      style={{
                        width: "30%",
                        height: "62%",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Scroll inside the phone to explore the mobile layout.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
