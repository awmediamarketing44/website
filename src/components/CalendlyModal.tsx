"use client";

import { motion, AnimatePresence } from "motion/react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-card-border bg-[#0a0a0a] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
              <div>
                <h3 className="text-lg font-bold">Book a FREE Discovery Call</h3>
                <p className="text-sm text-muted">15 minutes. No obligation. No jargon.</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border text-muted hover:text-pink hover:border-pink/30 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Calendly iframe */}
            <div className="relative" style={{ height: "630px" }}>
              <iframe
                src="https://calendly.com/awmedia-marketing/aw-discovery-call?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a call with AW Media"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
