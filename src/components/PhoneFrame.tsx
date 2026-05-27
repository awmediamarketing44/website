"use client";

import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

// iPhone-style frame wrapper for mobile screenshots in case studies.
// Bezel + status bar zone (with dynamic island) + screen content area.
// Aspect locked to 9:19.5 (modern iPhone Pro).
export default function PhoneFrame({ src, alt, className = "" }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ aspectRatio: "9 / 19.5" }}>
      {/* Outer bezel + side frame */}
      <div
        className="absolute inset-0 rounded-[13%/6%] bg-[#0a0a0c]"
        style={{
          padding: "2.2%",
          boxShadow:
            "0 30px 80px -25px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 0 1.5px rgba(255,255,255,0.03)",
        }}
      >
        {/* Inner screen wrapper (rounded under the bezel) */}
        <div className="relative w-full h-full overflow-hidden rounded-[11%/5%] bg-black">
          {/* Screenshot — pushed down to make room for status bar */}
          <div
            className="absolute left-0 right-0 bottom-0 overflow-hidden"
            style={{ top: "4.5%" }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-cover object-top"
            />
          </div>

          {/* Status bar zone (black) — dynamic island lives here, doesn't overlap content */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-center bg-black"
            style={{ height: "4.5%" }}
          >
            <div
              className="rounded-full bg-black"
              style={{
                width: "30%",
                height: "62%",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Subtle screen reflection */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[11%/5%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.025) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
