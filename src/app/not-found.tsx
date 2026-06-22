"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import MagneticButton from "@/components/MagneticButton";

const POPULAR = [
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink/10 blur-[160px]" />

        <div className="mx-auto max-w-xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[6rem] font-extrabold leading-none tracking-tight gradient-text sm:text-[8rem]"
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-2xl font-bold sm:text-3xl"
          >
            This page has gone missing.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-md text-muted leading-relaxed"
          >
            The link might be old, or the page has moved. Let&apos;s get you back
            to something useful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton href="/">Back to Home</MagneticButton>
            <MagneticButton href="/work" variant="secondary">
              View Our Work
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <p className="text-xs uppercase tracking-widest text-muted">
              Popular pages
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {POPULAR.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-pink/30 hover:text-white"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
