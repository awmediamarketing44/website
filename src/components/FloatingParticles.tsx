"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingParticles({ count = 30 }: { count?: number }) {
  const isDesktop = useIsDesktop();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isDesktop) return;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.05,
      }))
    );
  }, [count, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? `rgba(249, 38, 114, ${p.opacity})`
                : `rgba(255, 255, 255, ${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -80, 20, -40, 0],
            x: [0, 30, -20, 40, 0],
            scale: [1, 1.5, 0.8, 1.2, 1],
            opacity: [p.opacity, p.opacity * 2, p.opacity * 0.5, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-pink/10 rounded-lg"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
            width: 40 + i * 10,
            height: 40 + i * 10,
          }}
          animate={{
            rotate: [0, 180, 360],
            y: [0, -50, 0],
            x: [0, 20, -20, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 20 + i * 3,
            delay: i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
