"use client";

import { useEffect, useRef } from "react";

// Official Trustpilot TrustBox widget — pulls live reviews, auto-updates.
// Get the Business Unit ID from Trustpilot → Integrate (or the TrustBox snippet).
// Template IDs: carousel "53aa8912dec7e10d38f59f36", grid "539ad60defb9600b94d7df2c",
// mini "53aa8807dec7e10d38f59f32".
export const TRUSTPILOT_BUSINESS_UNIT_ID = "REPLACE_WITH_BUSINESS_UNIT_ID";
export const TRUSTPILOT_PROFILE_URL =
  "https://uk.trustpilot.com/review/awmedia.marketing";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

export default function TrustpilotWidget({
  templateId = "53aa8912dec7e10d38f59f36", // carousel
  height = "240px",
  theme = "dark",
}: {
  templateId?: string;
  height?: string;
  theme?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    const render = () => {
      if (ref.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    };
    if (window.Trustpilot) {
      render();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", render);
    return () => script?.removeEventListener("load", render);
  }, [templateId]);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-GB"
      data-template-id={templateId}
      data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
      data-style-height={height}
      data-style-width="100%"
      data-theme={theme}
    >
      <a href={TRUSTPILOT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
