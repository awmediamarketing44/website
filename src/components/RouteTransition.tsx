"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Page transitions, without touching the first paint.
 *
 * Why it is built this way:
 *
 * - Next's own `experimental.viewTransition` docs say outright not to use it
 *   in production, so it is off the table for a live shopfront.
 * - Wrapping {children} in an animated element is not an option either: body
 *   is `flex flex-col`, so an extra wrapper collapses main and footer into a
 *   single flex item and breaks the sticky-footer layout.
 * - Animating `main` unconditionally in CSS would replay on the very first
 *   load as well, and fading the hero up from opacity 0 pushes out LCP. The
 *   whole point of this work is that the speed numbers do not move.
 *
 * So: this flags the document only when the PATHNAME CHANGES, never on the
 * initial mount. CSS keys the entrance off that attribute (see .aw-route in
 * motion.css), which means a real transition on every client navigation and
 * exactly nothing on first paint.
 *
 * Cost is one attribute write per navigation. No wrapper, no layout shift,
 * no new dependency.
 */
const ATTR = "data-route-enter";
const DURATION_MS = 480;

export default function RouteTransition() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial mount. First paint must stay untouched.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const root = document.documentElement;

    // Clear then set on the next frame so the animation restarts even when
    // two navigations land inside one duration.
    root.removeAttribute(ATTR);
    const raf = requestAnimationFrame(() => root.setAttribute(ATTR, ""));
    const timer = window.setTimeout(() => root.removeAttribute(ATTR), DURATION_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      root.removeAttribute(ATTR);
    };
  }, [pathname]);

  return null;
}
