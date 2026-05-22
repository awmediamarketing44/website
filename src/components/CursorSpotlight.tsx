"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        left: springX,
        top: springY,
        background:
          "radial-gradient(circle, rgba(249,38,114,0.22) 0%, rgba(168,85,247,0.12) 30%, transparent 65%)",
      }}
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-[1] mix-blend-screen blur-2xl hidden lg:block"
    />
  );
}
