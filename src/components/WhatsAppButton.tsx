"use client";

import { motion } from "motion/react";

// Floating WhatsApp button — direct chat to Alex. Static-friendly (just a
// wa.me link). The "Ask Alex" AI chat will replace/augment this post-launch.
const WHATSAPP_NUMBER = "447932815405"; // +44 7932 815405
const PREFILL = encodeURIComponent(
  "Hi mate, just on your website and got some more questions"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILL}`;

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat to Alex on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 sm:pr-4 shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.5)] transition-shadow duration-300"
    >
      {/* Live pulse ring */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Online status dot */}
      <span className="absolute -top-0.5 -right-0.5 z-10 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-[#0a0a0a]" />
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 flex-shrink-0 fill-white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:pr-1">
        Chat to Alex
      </span>
    </motion.a>
  );
}
