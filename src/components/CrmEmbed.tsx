"use client";

import { useEffect, useRef, useState } from "react";

// Embeds a form hosted in our own CRM (crm.awmedia.marketing) as an iframe.
//
// Default behaviour is a fixed-height frame, same as it has always been.
//
// Pass autoHeight when the form is the point of the page rather than a block
// near the bottom of it. That adds ?embed=1 to the URL, which tells the CRM to
// drop its cover screen and step counter and post its content height back here,
// so the frame grows with the form instead of trapping it in a scrolling box
// inside a scrolling page. On a phone that inner scroll is the difference
// between filling a form in and giving up on it.
const CRM_ORIGIN = "https://crm.awmedia.marketing";

export default function CrmEmbed({
  src,
  title,
  autoHeight = false,
  minHeight = 640,
  lazy = false,
}: {
  src: string;
  title: string;
  autoHeight?: boolean;
  minHeight?: number;
  // Defer the frame until it is near the viewport. OFF by default and it must
  // stay that way: on /websites and /website-concept the form IS the hero, and
  // deferring it there would delay the one thing the page exists for. Turn it
  // on only where the form sits below the fold, like the service pages, where
  // an eager frame costs a DNS + TLS handshake to a second origin during the
  // initial load for something the visitor may never scroll to.
  lazy?: boolean;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  // Only becomes true once the CRM has actually reported a height. Until then
  // the frame keeps its own scrollbar, so if this page is ever live against a
  // CRM that does not know about embed mode the form is still usable rather
  // than clipped with no way to reach the rest of it.
  const [measured, setMeasured] = useState(false);
  const shrinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoHeight) return;
    function onMessage(e: MessageEvent) {
      if (e.origin !== CRM_ORIGIN) return;
      if (ref.current && e.source !== ref.current.contentWindow) return;
      const d = e.data as { awcrm?: string; h?: number } | null;
      if (!d || d.awcrm !== "height" || typeof d.h !== "number") return;
      // Clamp: a bad measurement should never collapse the form to nothing or
      // stretch the page to something silly.
      const next = Math.min(Math.max(Math.round(d.h), 260), 4000);
      setMeasured(true);
      // Grow at once so a tall question is never cut off mid-answer. Shrink on a
      // short delay, so stepping from a tall question to a short one settles in
      // one movement instead of snapping about while the slide animates.
      setHeight((cur) => {
        if (next > cur) {
          if (shrinkTimer.current) clearTimeout(shrinkTimer.current);
          return next;
        }
        if (shrinkTimer.current) clearTimeout(shrinkTimer.current);
        shrinkTimer.current = setTimeout(() => setHeight(next), 220);
        return cur;
      });
    }
    window.addEventListener("message", onMessage);

    // Ask, do not just listen. The iframe can finish loading and announce its
    // height before this component has hydrated and attached the listener
    // above, and the form only re-announces on a change, so that first message
    // would be the only one and we would miss it. Then the frame keeps its
    // fallback height and the form is cut off. Ask a few times while things
    // settle; the form answers with its current height.
    const ask = () => {
      try {
        ref.current?.contentWindow?.postMessage({ awcrm: "height?" }, CRM_ORIGIN);
      } catch {
        /* frame not ready yet */
      }
    };
    const asks = [0, 400, 1200, 2500].map((d) => setTimeout(ask, d));

    return () => {
      window.removeEventListener("message", onMessage);
      asks.forEach(clearTimeout);
      if (shrinkTimer.current) clearTimeout(shrinkTimer.current);
    };
  }, [autoHeight]);

  const url = autoHeight
    ? src + (src.includes("?") ? "&" : "?") + "embed=1"
    : src;

  return (
    <iframe
      ref={ref}
      src={url}
      title={title}
      loading={lazy ? "lazy" : undefined}
      width="100%"
      height={autoHeight ? height : minHeight}
      scrolling={autoHeight && measured ? "no" : undefined}
      onLoad={() => {
        if (!autoHeight) return;
        try {
          ref.current?.contentWindow?.postMessage({ awcrm: "height?" }, CRM_ORIGIN);
        } catch {
          /* ignore */
        }
      }}
      className="w-full rounded-2xl"
      // No CSS transition on height. It is only cosmetic, and a transition is
      // paused while a tab is in the background, which leaves the frame rendered
      // at a stale height until the visitor interacts with it. Snapping to the
      // right size is always correct; easing to it is not.
      style={{ border: 0, height: autoHeight ? height : minHeight }}
    />
  );
}
