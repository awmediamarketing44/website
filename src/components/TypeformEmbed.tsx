"use client";

import { useEffect } from "react";

// Reusable Typeform "live" embed. Loads the Typeform embed script once and
// renders the target div. Works on static hosting (20i) since it's all
// client-side. Pass the data-tf-live ID from the Typeform share/embed snippet.
export default function TypeformEmbed({ id }: { id: string }) {
  useEffect(() => {
    const SRC = "https://embed.typeform.com/next/embed.js";
    // Avoid loading the script more than once across navigations.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`
    );
    if (existing) {
      // Script already present — Typeform auto-scans on load, but re-trigger
      // for client-side route changes.
      // @ts-expect-error - tf is attached to window by the embed script
      window.tf?.load?.();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [id]);

  return (
    <div
      data-tf-live={id}
      className="min-h-[520px] w-full overflow-hidden rounded-2xl"
    />
  );
}
