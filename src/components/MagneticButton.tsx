"use client";

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-20, 20], [5, -5]);
  const rotateY = useTransform(springX, [-20, 20], [-5, 5]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    variant === "primary"
      ? "bg-pink text-white hover:shadow-[0_0_40px_rgba(249,38,114,0.4)]"
      : "border border-card-border text-white hover:border-pink/50 hover:shadow-[0_0_30px_rgba(249,38,114,0.15)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, rotateX, rotateY }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block rounded-full px-8 py-3.5 text-sm font-semibold transition-shadow duration-300 ${baseClass} ${className}`}
    >
      {children}
    </motion.a>
  );
}
