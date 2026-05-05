"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useCalendly } from "./CalendlyProvider";

const serviceLinks = [
  { label: "Web Design & Development", href: "/services/web-design" },
  { label: "Logo Design & Branding", href: "/services/branding" },
  { label: "Social Media Graphics", href: "/services/social-media" },
  { label: "SEO & Monthly Support", href: "/services/seo-support" },
  { label: "Shopify & E-Commerce", href: "/services/ecommerce" },
  { label: "Landing Pages & Ads", href: "/services/landing-pages" },
  { label: "AI-Powered Web Design", href: "/services/ai-design" },
];

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openCalendly } = useCalendly();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsub;
  }, [scrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-card-border"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <motion.span
              animate={scrolled ? { fontSize: "1.125rem" } : { fontSize: "1.25rem" }}
              transition={{ duration: 0.3 }}
              className="font-bold tracking-tight"
            >
              aw<span className="text-pink">media.</span>
            </motion.span>
          </motion.span>
        </Link>

        {/* Desktop nav - centered */}
        <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => (
            <div key={link.label} className="relative" ref={link.hasDropdown ? dropdownRef : undefined}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="relative"
              >
                {link.hasDropdown ? (
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className="flex items-center gap-1 text-sm text-muted transition-colors duration-200 hover:text-pink group"
                  >
                    {link.label}
                    <motion.svg
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
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
                    className="text-sm text-muted transition-colors duration-200 hover:text-pink group"
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

              {/* Services dropdown */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl border border-card-border bg-[#111111]/95 backdrop-blur-xl p-2 shadow-2xl"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#111111] border-l border-t border-card-border" />

                      {serviceLinks.map((service, j) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-pink/10 transition-colors duration-150"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.03 }}
                          >
                            {service.label}
                          </motion.span>
                        </Link>
                      ))}

                      <div className="border-t border-card-border mt-1 pt-1">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-4 py-2.5 text-sm text-pink font-medium hover:bg-pink/10 transition-colors duration-150"
                        >
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            href="/contact"
            className="text-sm text-muted hover:text-white transition-colors duration-200"
          >
            Free Review
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
                  {link.hasDropdown ? (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full text-2xl font-semibold text-muted hover:text-white transition-colors"
                      >
                        {link.label}
                        <motion.svg
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
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
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-3 pb-1 flex flex-col gap-2">
                              {serviceLinks.map((service, j) => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base text-muted hover:text-pink transition-colors py-1"
                                >
                                  {service.label}
                                </Link>
                              ))}
                              <Link
                                href="/services"
                                onClick={() => setMobileOpen(false)}
                                className="text-base text-pink font-medium pt-1"
                              >
                                View all services →
                              </Link>
                            </div>
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
