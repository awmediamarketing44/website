"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useCalendly } from "./CalendlyProvider";
import { projects } from "@/data/projects";

/* Services mega menu. Grouped on Alex's call 20 Sep 2026: "the services nav
   needs to be more like a mega menu", "so it shows it easier for user". The
   flat eight item list buried everything, and Systems was not in it at all. */
const serviceGroups: { heading: string; items: { label: string; blurb: string; href: string }[] }[] = [
  {
    heading: "Websites",
    items: [
      { label: "Web Design & Development", blurb: "Custom sites built to bring enquiries in", href: "/services/web-design" },
      { label: "Shopify & E-Commerce", blurb: "Shops built to sell, not just list", href: "/services/ecommerce" },
      { label: "Landing Pages & Ads", blurb: "One page, one job, built to convert", href: "/services/landing-pages" },
      { label: "AI-Powered Web Design", blurb: "The same custom design, live in weeks", href: "/services/ai-design" },
    ],
  },
  {
    heading: "Brand & content",
    items: [
      { label: "Logo Design & Branding", blurb: "Identity that matches the work behind it", href: "/services/branding" },
      { label: "Social Media Graphics", blurb: "Your own design slot, every week", href: "/services/social-media" },
      { label: "SEO & Monthly Support", blurb: "Get found, and stay looked after", href: "/services/seo-support" },
    ],
  },
  {
    heading: "Systems & AI",
    items: [
      { label: "Bespoke Systems & Software", blurb: "CRMs, portals and booking systems", href: "/services/systems" },
      { label: "AI for Your Business", blurb: "Set up round how you already work", href: "/services/ai-business-support" },
      { label: "Custom Apps", blurb: "On your team's phones, or your clients'", href: "/custom-app-development-uk" },
    ],
  },
];

/* The case studies shown in the Work mega menu, newest first. Update this list
   when a new case study ships. */
const WORK_MENU_SLUGS = ["pt-business-blueprint", "pt-desk", "adept-heating", "full-tray"];

const workMenu = WORK_MENU_SLUGS.map((slug) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Work menu project not found: ${slug}`);
  return { slug: p.slug, title: p.title, industry: p.client.industry, hero: p.heroImage };
});

/* Systems has NO top level item on purpose: measured at 1024px the centre nav
   already overlapped the CTA cluster by 26px with six links, and a seventh took
   it to 58px. It leads the "Systems & AI" column of the mega menu instead,
   which answers Alex on 20 Sep 2026: "it is hard to find". */
const navLinks: { label: string; href: string; menu?: "services" | "work" }[] = [
  { label: "Work", href: "/work", menu: "work" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "work" | null>(null);
  const [mobileMenu, setMobileMenu] = useState<"services" | "work" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const glassTint = useTransform(scrollY, [0, 100], [0.04, 0.08]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openCalendly } = useCalendly();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass layers */}
      <div className="absolute inset-0 backdrop-blur-2xl pointer-events-none">
        {/* Persistent glass tint (visible at top of page too) */}
        <motion.div
          style={{
            background: useTransform(
              glassTint,
              (v) =>
                `linear-gradient(to bottom, rgba(255,255,255,${v}) 0%, rgba(255,255,255,${v * 0.4}) 60%, transparent 100%)`
            ),
          }}
          className="absolute inset-0"
        />
        {/* Scroll-deepened opacity layer for readability */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-background/70"
        />
        {/* Top inner highlight (iOS-style glass edge) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        {/* Bottom edge */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Reading progress. Driven by the document scroll timeline in CSS, so
          there is no scroll listener and no state behind this. Works on
          mobile as well as desktop. */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-[2px] overflow-hidden pointer-events-none"
      >
        <div className="aw-progress-bar h-full w-full bg-gradient-to-r from-pink via-pink to-purple-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="AW Media home">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <motion.div
              animate={{ height: scrolled ? 26 : 32 }}
              transition={{ duration: 0.3 }}
              className="relative"
              style={{ aspectRatio: "200 / 79" }}
            >
              <Image
                src="/images/aw-logo-website.png"
                alt="AW Media"
                fill
                priority
                sizes="120px"
                className="object-contain"
              />
            </motion.div>
          </motion.span>
        </Link>

        {/* Desktop nav, centred. Both mega menus hang off this container rather
            than off each item, so a wide panel stays centred on the viewport
            instead of running off the left edge under "Work". */}
        <div
          className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          ref={menuRef}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="relative"
            >
              {link.menu ? (
                <button
                  onClick={() => setOpenMenu(openMenu === link.menu ? null : link.menu!)}
                  onMouseEnter={() => setOpenMenu(link.menu!)}
                  aria-expanded={openMenu === link.menu}
                  className={`flex items-center gap-1 text-sm transition-colors duration-200 hover:text-pink ${
                    openMenu === link.menu ? "text-pink" : "text-muted"
                  }`}
                >
                  {link.label}
                  <motion.svg
                    animate={{ rotate: openMenu === link.menu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-pink"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-pink"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              )}
            </motion.div>
          ))}

          <AnimatePresence>
            {openMenu && (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                /* pt-4 not mt-4: the padding keeps the hover path from the
                   button into the panel unbroken, so it does not flicker shut
                   on the way down. */
                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
              >
                <div
                  className={`rounded-2xl border border-card-border bg-[#0d0d0f]/97 backdrop-blur-xl shadow-2xl p-5 ${
                    openMenu === "services" ? "w-[min(92vw,940px)]" : "w-[min(92vw,820px)]"
                  }`}
                >
                  {openMenu === "services" ? (
                    <>
                      <div className="grid grid-cols-4 gap-5">
                        {serviceGroups.map((group) => (
                          <div key={group.heading}>
                            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.12em] text-pink">
                              {group.heading}
                            </p>
                            <div className="flex flex-col">
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-pink/10"
                                >
                                  <span className="block text-[13.5px] font-semibold text-white/90 group-hover:text-white">
                                    {item.label}
                                  </span>
                                  <span className="block text-xs leading-snug text-muted">{item.blurb}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* Feature panel. Systems is the thing people never find,
                            so it gets the corner of the menu with the real estate. */}
                        <Link
                          href="/services/systems"
                          onClick={() => setOpenMenu(null)}
                          className="flex flex-col justify-between rounded-xl border border-pink/25 bg-gradient-to-br from-pink/15 to-purple-500/10 p-4 transition-colors duration-200 hover:border-pink/50"
                        >
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-pink">Built for you</p>
                            <p className="mt-2 text-sm font-semibold text-white">Bespoke systems &amp; software</p>
                            <p className="mt-1.5 text-xs leading-snug text-muted">
                              There is a spreadsheet doing the job your software could not. We build CRMs, portals and
                              booking systems round how you already work.
                            </p>
                          </div>
                          <span className="mt-4 text-xs font-semibold text-pink">See what we build &rarr;</span>
                        </Link>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-card-border pt-3">
                        <span className="text-xs text-muted">Not sure which one you need? We will tell you straight.</span>
                        <Link
                          href="/services"
                          onClick={() => setOpenMenu(null)}
                          className="text-sm font-medium text-pink hover:text-white transition-colors"
                        >
                          View all services &rarr;
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-4 gap-4">
                        {workMenu.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/work/${item.slug}`}
                            onClick={() => setOpenMenu(null)}
                            className="group"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-card-border">
                              <Image
                                src={item.hero}
                                alt={item.title}
                                fill
                                sizes="200px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                            </div>
                            <p className="mt-2 text-[13.5px] font-semibold text-white/90 group-hover:text-white">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted">{item.industry}</p>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-card-border pt-3">
                        <span className="text-xs text-muted">450+ builds since 2016. These are the latest.</span>
                        <Link
                          href="/work"
                          onClick={() => setOpenMenu(null)}
                          className="text-sm font-medium text-pink hover:text-white transition-colors"
                        >
                          View all work &rarr;
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop CTAs.
            AI Portal and Free Resources are held back until xl (1280px) ON
            PURPOSE. The centre nav is absolutely centred, so below that it runs
            straight underneath this cluster.

            THIS STAYS EVEN THOUGH SYSTEMS HAS GONE BACK OUT OF THE NAV. The
            overlap is NOT something Systems caused: measured in a real 1024px
            viewport it was already 26px with the original six links, and went to
            58px with Systems added. Dropping back to six links returns it to 26px,
            which is still broken. Tightening the gaps cannot fix it either (they
            would need to drop to about 4px).

            Both links stay in the mobile menu and the footer, so nothing is lost.
            Book a Call stays at every size because it is the actual CTA. */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            href="/portal"
            className="hidden xl:inline text-sm text-muted hover:text-white transition-colors duration-200"
          >
            AI Portal
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            href="/free-resources"
            className="hidden xl:inline text-sm text-muted hover:text-white transition-colors duration-200"
          >
            Free Resources
          </motion.a>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,38,114,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={openCalendly}
            className="rounded-full bg-pink px-5 py-2 text-sm font-semibold text-white"
          >
            Book a Call
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-card-border"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <div key={link.label}>
                  {link.menu ? (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setMobileMenu(mobileMenu === link.menu ? null : link.menu!)}
                        className="flex items-center justify-between w-full text-2xl font-semibold text-muted hover:text-white transition-colors"
                      >
                        {link.label}
                        <motion.svg
                          animate={{ rotate: mobileMenu === link.menu ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </motion.svg>
                      </motion.button>
                      <AnimatePresence>
                        {mobileMenu === link.menu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {link.menu === "services" ? (
                              <div className="pl-1 pt-3 pb-1 flex flex-col gap-4">
                                {serviceGroups.map((group) => (
                                  <div key={group.heading}>
                                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-pink">
                                      {group.heading}
                                    </p>
                                    <div className="flex flex-col">
                                      {group.items.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="py-1.5 text-base text-muted hover:text-pink transition-colors"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <Link
                                  href="/services"
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base font-medium text-pink"
                                >
                                  View all services &rarr;
                                </Link>
                              </div>
                            ) : (
                              <div className="pl-1 pt-3 pb-1 flex flex-col gap-3">
                                {workMenu.map((item) => (
                                  <Link
                                    key={item.slug}
                                    href={`/work/${item.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3"
                                  >
                                    <span className="relative h-12 w-20 flex-none overflow-hidden rounded-lg border border-card-border">
                                      <Image src={item.hero} alt={item.title} fill sizes="80px" className="object-cover" />
                                    </span>
                                    <span>
                                      <span className="block text-base text-white/90">{item.title}</span>
                                      <span className="block text-xs text-muted">{item.industry}</span>
                                    </span>
                                  </Link>
                                ))}
                                <Link
                                  href="/work"
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base font-medium text-pink"
                                >
                                  View all work &rarr;
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-semibold text-muted hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Extra mobile links not in the main nav */}
              {[
                { label: "AI Portal", href: "/portal" },
                { label: "Free Resources", href: "/free-resources" },
                { label: "Free Audit", href: "/free-audit" },
                { label: "Reviews", href: "/reviews" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + i) * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-semibold text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  setMobileOpen(false);
                  openCalendly();
                }}
                className="mt-4 rounded-full bg-pink px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Book a Call
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
