"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
import PageHeader from "@/components/shared/PageHeader";
import Footer from "@/components/Footer";
import BookCallButton from "@/components/BookCallButton";
import { trackLead } from "@/lib/track";

const COPY: Record<string, { title: string; accent: string; message: string }> = {
  contact: {
    title: "Message received.",
    accent: "We'll be in touch.",
    message:
      "Thanks for getting in touch. One of the team will get back to you shortly, usually the same working day.",
  },
  default: {
    title: "Thank you.",
    accent: "We've got it.",
    message:
      "Your submission came through. One of the team will be in touch shortly.",
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const form = searchParams.get("form") || "general";
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackLead(form, { page: "thank_you" });
  }, [form]);

  const copy = COPY[form] ?? COPY.default;

  return (
    <>
      <FloatingParticles count={20} />
      <Navbar />
      <main>
        <PageHeader tag="Thank you" title={copy.title} titleAccent={copy.accent} />
        <section className="pb-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-muted text-lg"
            >
              {copy.message}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <BookCallButton>Book a FREE Call</BookCallButton>
              <Link
                href="/work"
                className="rounded-full border border-card-border px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-pink/30"
              >
                See our work
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <Link href="/" className="text-sm text-muted hover:text-pink transition-colors duration-200">
                &larr; Back to home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
