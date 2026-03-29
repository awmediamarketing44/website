"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function FloatingOrbs() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Large pink orb - slow parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px]"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-pink/10 blur-[100px]"
        />
      </motion.div>

      {/* Purple orb - medium parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -left-48 w-[400px] h-[400px]"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            x: [0, 40, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-purple-500/8 blur-[80px]"
        />
      </motion.div>

      {/* Small accent orb - fast parallax */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-2/3 right-1/4 w-[200px] h-[200px]"
      >
        <motion.div
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-pink/15 blur-[60px]"
        />
      </motion.div>

      {/* 3D Rotating rings with parallax */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[15%] left-[10%] w-[300px] h-[300px]"
      >
        <div className="w-full h-full rounded-full border border-pink/[0.07]" style={{ transform: "rotateX(60deg)" }} />
      </motion.div>

      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[55%] right-[8%] w-[220px] h-[220px]"
      >
        <div className="w-full h-full rounded-full border border-white/[0.04]" style={{ transform: "rotateX(70deg) rotateY(20deg)" }} />
      </motion.div>

      <motion.div
        style={{ y: y3, rotate: rotate1 }}
        className="absolute top-[80%] left-[30%] w-[180px] h-[180px]"
      >
        <div className="w-full h-full rounded-full border border-pink/[0.05]" style={{ transform: "rotateX(50deg) rotateZ(30deg)" }} />
      </motion.div>

      {/* Floating dots grid — depth layer */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-pink/20"
          style={{
            left: `${8 + (i % 4) * 25}%`,
            top: `${5 + Math.floor(i / 4) * 35}%`,
          }}
          animate={{
            y: [0, -20 - (i % 3) * 15, 10, 0],
            x: [0, 10 + (i % 2) * 10, -5, 0],
            opacity: [0.1, 0.35, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i * 0.7,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid lines — perspective depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,38,114,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,38,114,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center 120%",
        }}
      />
    </div>
  );
}
