"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ExitIntentPopupProps {
  onBookCall: () => void;
}

export default function ExitIntentPopup({ onBookCall }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (dismissed) return;
      // Only trigger when cursor moves toward the top of the viewport (closing tab / back button)
      if (e.clientY <= 5 && e.relatedTarget === null) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    // Don't show on mobile (no mouse leave) or if already dismissed this session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("aw-exit-dismissed")) {
      setDismissed(true);
      return;
    }

    // Wait a bit before enabling — don't fire on immediate page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("aw-exit-dismissed", "1");
  };

  const handleBookCall = () => {
    dismiss();
    onBookCall();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99] flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md rounded-2xl border border-card-border bg-[#0a0a0a] p-8 text-center shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-card-border text-muted hover:text-pink hover:border-pink/30 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-3xl">&#128075;</span>
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">Wait — before you go.</h3>
            <p className="text-muted leading-relaxed mb-6">
              Most fitness businesses lose clients to a website that doesn&apos;t convert.
              Book a free 15-minute call and we&apos;ll show you exactly what&apos;s holding
              yours back.
            </p>

            <button
              onClick={handleBookCall}
              className="inline-block rounded-full bg-pink px-8 py-3.5 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)] transition-shadow duration-300 mb-3 w-full"
            >
              Book a FREE Call
            </button>

            <button
              onClick={dismiss}
              className="text-xs text-muted hover:text-white transition-colors duration-200"
            >
              No thanks, I&apos;m good
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
