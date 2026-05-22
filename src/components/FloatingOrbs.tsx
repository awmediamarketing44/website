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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
      {/* Large pink orb top-right — slow parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px]"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-pink blur-[120px]"
        />
      </motion.div>

      {/* Purple orb left — medium parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[30%] -left-32 w-[400px] h-[400px]"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 0.9, 1],
            x: [0, 60, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-purple-600 blur-[100px]"
        />
      </motion.div>

      {/* Small pink accent — fast parallax */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[65%] right-[20%] w-[250px] h-[250px]"
      >
        <motion.div
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-pink blur-[80px]"
        />
      </motion.div>

      {/* 3D Rotating rings — tilted to give depth */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[12%] left-[8%] w-[300px] h-[300px]"
      >
        <div
          className="w-full h-full rounded-full border border-pink/20"
          style={{ transform: "rotateX(60deg)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[50%] right-[5%] w-[250px] h-[250px]"
      >
        <div
          className="w-full h-full rounded-full border border-white/10"
          style={{ transform: "rotateX(70deg) rotateY(20deg)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3, rotate: rotate1 }}
        className="absolute top-[75%] left-[25%] w-[200px] h-[200px]"
      >
        <div
          className="w-full h-full rounded-full border border-pink/15"
          style={{ transform: "rotateX(50deg) rotateZ(30deg)" }}
        />
      </motion.div>

      {/* Floating dots — scattered depth particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-dot-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${5 + (i % 5) * 20}%`,
            top: `${3 + Math.floor(i / 5) * 33}%`,
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            background: i % 2 === 0 ? "rgba(249, 38, 114, 0.4)" : "rgba(255, 255, 255, 0.15)",
          }}
          animate={{
            y: [0, -30 - (i % 4) * 15, 15, 0],
            x: [0, 15 + (i % 3) * 10, -10, 0],
            opacity: [0.2, 0.6, 0.15, 0.2],
            scale: [1, 1.8, 0.8, 1],
          }}
          transition={{
            duration: 5 + i * 0.6,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Perspective grid floor — gives 3D depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60vh] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,38,114,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,38,114,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(400px) rotateX(65deg)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
    </div>
  );
}
