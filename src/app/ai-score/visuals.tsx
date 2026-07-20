"use client";

// Animated visuals for the AI Opportunity Score: the AI brain network map,
// the score gauge, the per-area bars and the count-up stat tiles. All
// deterministic, driven by the quiz result, no chart libraries.

import { useEffect, useState } from "react";
import { motion, animate, useReducedMotion } from "motion/react";
import { AREA_ORDER, AREA_LABELS, type AreaStat } from "@/data/ai-score";

const PINK = "#F92672";
const PURPLE = "#a855f7";

/* ── Count-up hook ───────────────────────────────────────────────────── */

export function useCountUp(target: number, duration = 1.4, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration, delay]);
  return value;
}

/* ── Score gauge: animated ring + count-up hero number ───────────────── */

export function ScoreGauge({ score, size = 190 }: { score: number; size?: number }) {
  const display = useCountUp(score, 1.6, 0.3);
  const r = 84;
  const track = 11;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={PINK} />
            <stop offset="100%" stopColor={PURPLE} />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={track}
        />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={track}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: score / 100 }}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 12px rgba(249,38,114,0.45))` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black tabular-nums gradient-text leading-none">
          {display}
        </span>
        <span className="mt-1 text-xs font-semibold text-muted">out of 100</span>
      </div>
    </div>
  );
}

/* ── AI brain network map ────────────────────────────────────────────── */
// A central AI core with the five business areas as orbiting nodes, pulses
// travelling out along the connections. In `ambient` mode (intro/calculating)
// all nodes glow evenly; with `areas` data, node size and glow scale with the
// visitor's own answers and the top three light up pink.

const CX = 260;
const CY = 235;
const RING = 168;

function nodePos(i: number) {
  const angle = ((i * 72 - 90) * Math.PI) / 180;
  return { x: CX + RING * Math.cos(angle), y: CY + RING * Math.sin(angle) };
}

export function BrainMap({
  areas,
  className = "",
}: {
  areas?: AreaStat[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const stats: AreaStat[] =
    areas ??
    AREA_ORDER.map((id) => ({ id, label: AREA_LABELS[id], pct: 60, hot: true }));

  return (
    <svg
      viewBox="0 0 520 470"
      className={`mx-auto w-full max-w-[520px] ${className}`}
      role="img"
      aria-label="Map of the business areas AI can plug into: support, lead follow-up, marketing, admin and visibility, all connected to one AI core"
    >
      <defs>
        <radialGradient id="coreGrad">
          <stop offset="0%" stopColor={PINK} stopOpacity="0.9" />
          <stop offset="70%" stopColor={PINK} stopOpacity="0.35" />
          <stop offset="100%" stopColor={PINK} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coreRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PINK} />
          <stop offset="100%" stopColor={PURPLE} />
        </linearGradient>
      </defs>

      {/* Connections + pulses */}
      {stats.map((area, i) => {
        const p = nodePos(i);
        const strength = area.pct / 100;
        return (
          <g key={`line-${area.id}`}>
            <line
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1.2"
            />
            <motion.line
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke={area.hot ? PINK : "rgba(255,255,255,0.35)"}
              strokeWidth="1.4"
              strokeOpacity={0.15 + strength * 0.45}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: "easeOut" }}
            />
            {!reduced && (
              <motion.circle
                r="3.2"
                fill={area.hot ? PINK : "rgba(255,255,255,0.5)"}
                style={{ filter: `drop-shadow(0 0 6px ${PINK})` }}
                initial={{ cx: CX, cy: CY, opacity: 0 }}
                animate={{ cx: [CX, p.x], cy: [CY, p.y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.8,
                  delay: 0.8 + i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        );
      })}

      {/* Core */}
      <circle cx={CX} cy={CY} r="86" fill="url(#coreGrad)" opacity="0.35" />
      {!reduced && (
        <motion.circle
          cx={CX}
          cy={CY}
          fill="none"
          stroke={PINK}
          strokeWidth="1"
          initial={{ r: 44, opacity: 0.5 }}
          animate={{ r: [44, 68], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.circle
        cx={CX}
        cy={CY}
        r="44"
        fill="#141016"
        stroke="url(#coreRing)"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          filter: "drop-shadow(0 0 24px rgba(249,38,114,0.5))",
        }}
      />
      <text
        x={CX}
        y={CY + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize="20"
        fontWeight="800"
        fontFamily="inherit"
      >
        AI
      </text>

      {/* Area nodes */}
      {stats.map((area, i) => {
        const p = nodePos(i);
        const strength = area.pct / 100;
        const nodeR = 9 + strength * 10;
        const above = p.y < CY;
        const labelY = above ? p.y - nodeR - 14 : p.y + nodeR + 22;
        return (
          <g key={`node-${area.id}`}>
            {area.hot && (
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeR + 12}
                fill={PINK}
                opacity={0.1 + strength * 0.12}
              />
            )}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={nodeR}
              fill={area.hot ? PINK : "rgba(255,255,255,0.18)"}
              stroke={area.hot ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)"}
              strokeWidth="1.4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: "backOut" }}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                filter: area.hot
                  ? "drop-shadow(0 0 10px rgba(249,38,114,0.7))"
                  : "none",
              }}
            />
            <text
              x={p.x}
              y={labelY}
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="12.5"
              fontWeight="700"
              letterSpacing="0.08em"
              fontFamily="inherit"
              style={{ textTransform: "uppercase" }}
            >
              {area.label.toUpperCase()}
            </text>
            {areas && (
              <text
                x={p.x}
                y={labelY + (above ? -14 : 15)}
                textAnchor="middle"
                fill={area.hot ? PINK : "rgba(255,255,255,0.45)"}
                fontSize="11.5"
                fontWeight="700"
                fontFamily="inherit"
              >
                {area.pct}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Per-area animated bars ──────────────────────────────────────────── */

export function AreaBars({ areas }: { areas: AreaStat[] }) {
  const sorted = [...areas].sort((a, b) => b.pct - a.pct);
  return (
    <div className="space-y-4">
      {sorted.map((area, i) => (
        <div key={area.id} className="flex items-center gap-3 sm:gap-4">
          <span className="w-28 flex-shrink-0 text-right text-[11px] font-bold uppercase tracking-wider text-muted sm:w-32 sm:text-xs">
            {area.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: area.hot
                  ? `linear-gradient(90deg, ${PINK}, ${PURPLE})`
                  : "rgba(255,255,255,0.22)",
                boxShadow: area.hot ? "0 0 10px rgba(249,38,114,0.5)" : "none",
              }}
              initial={{ width: "0%" }}
              whileInView={{ width: `${Math.max(area.pct, 3)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            />
          </div>
          <span className="w-10 flex-shrink-0 text-xs font-semibold tabular-nums text-white/80">
            {area.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Count-up stat tiles ─────────────────────────────────────────────── */

function StatTile({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const display = useCountUp(value, 1.5, delay);
  return (
    <div className="rounded-2xl border border-card-border bg-background/60 p-5 text-center">
      <p className="text-4xl font-black tabular-nums gradient-text leading-none">
        {display}
        <span className="text-2xl text-pink">{suffix}</span>
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-muted leading-relaxed">
        {label}
      </p>
    </div>
  );
}

export function StatTiles({
  hoursPerWeek,
  daysPerYear,
}: {
  hoursPerWeek: number;
  daysPerYear: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatTile
        value={hoursPerWeek}
        suffix="hrs"
        label="A week of automatable work"
        delay={0.5}
      />
      <StatTile
        value={daysPerYear}
        suffix=" days"
        label="A year you could win back"
        delay={0.7}
      />
    </div>
  );
}
