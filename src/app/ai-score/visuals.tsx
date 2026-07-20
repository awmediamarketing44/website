"use client";

// Animated visuals for the AI Opportunity Score: the AI brain network map,
// the score gauge, the per-area bars and the count-up stat tiles. All
// deterministic, driven by the quiz result, no chart libraries.

import { useEffect, useState } from "react";
import { motion, animate, useReducedMotion } from "motion/react";
import {
  AREA_ORDER,
  AREA_LABELS,
  AREA_SATELLITES,
  type AreaStat,
} from "@/data/ai-score";

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
// A central AI core, the five scored business areas as an inner ring, and an
// outer orbit of concrete capabilities (CRM, bookings, quotes, WhatsApp
// replies...) hanging off each area. Pulses run core -> area -> satellite,
// orbit rings slowly rotate, satellites drift. Without `areas` data it runs
// in ambient mode (intro/calculating); with data, node size, glow and the
// pink highlights follow the visitor's own answers.

const CX = 365;
const CY = 300;
const RING = 138;
const SAT_RING = 238;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function areaAngle(i: number) {
  return i * 72 - 90;
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
      viewBox="0 0 730 600"
      className={`mx-auto w-full max-w-[600px] ${className}`}
      role="img"
      aria-label="Map of everything AI can run in a business: 24/7 chat, WhatsApp replies, a CRM, follow-ups, bookings, quotes, invoicing, social posts, email campaigns, Google rankings and reviews, all connected to one AI core"
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

      {/* Slow-rotating orbit rings give the whole map constant motion */}
      {!reduced && (
        <>
          <motion.circle
            cx={CX}
            cy={CY}
            r={RING}
            fill="none"
            stroke="rgba(249,38,114,0.14)"
            strokeWidth="1"
            strokeDasharray="3 14"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <motion.circle
            cx={CX}
            cy={CY}
            r={SAT_RING}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
            strokeDasharray="2 16"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        </>
      )}

      {/* Connections: core -> area, area -> satellites, plus pulses */}
      {stats.map((area, i) => {
        const p = polar(CX, CY, RING, areaAngle(i));
        const strength = area.pct / 100;
        const sats = AREA_SATELLITES[area.id];
        return (
          <g key={`wires-${area.id}`}>
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
            {sats.map((label, j) => {
              const sp = polar(CX, CY, SAT_RING, areaAngle(i) + (j - 1) * 24);
              return (
                <motion.line
                  key={`sat-wire-${label}`}
                  x1={p.x}
                  y1={p.y}
                  x2={sp.x}
                  y2={sp.y}
                  stroke={area.hot ? PINK : "rgba(255,255,255,0.4)"}
                  strokeWidth="1"
                  strokeOpacity={0.08 + strength * 0.18}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.9 + i * 0.12 + j * 0.08,
                    ease: "easeOut",
                  }}
                />
              );
            })}
            {!reduced && (
              <>
                <motion.circle
                  r="3.2"
                  fill={area.hot ? PINK : "rgba(255,255,255,0.5)"}
                  style={{ filter: `drop-shadow(0 0 6px ${PINK})` }}
                  initial={{ cx: CX, cy: CY, opacity: 0 }}
                  animate={{ cx: [CX, p.x], cy: [CY, p.y], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1.6,
                    delay: 0.8 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: "easeInOut",
                  }}
                />
                {sats.map((label, j) => {
                  const sp = polar(CX, CY, SAT_RING, areaAngle(i) + (j - 1) * 24);
                  return (
                    <motion.circle
                      key={`sat-pulse-${label}`}
                      r="2.2"
                      fill={area.hot ? PINK : "rgba(255,255,255,0.55)"}
                      style={{ filter: `drop-shadow(0 0 4px ${PINK})` }}
                      initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                      animate={{
                        cx: [p.x, sp.x],
                        cy: [p.y, sp.y],
                        opacity: [0, 0.9, 0.9, 0],
                      }}
                      transition={{
                        duration: 1.3,
                        delay: 2.4 + i * 0.5 + j * 0.45,
                        repeat: Infinity,
                        repeatDelay: 3.6,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </>
            )}
          </g>
        );
      })}

      {/* Core: glow, expanding ping, radar sweep, badge */}
      <circle cx={CX} cy={CY} r="90" fill="url(#coreGrad)" opacity="0.35" />
      {!reduced && (
        <>
          <motion.circle
            cx={CX}
            cy={CY}
            fill="none"
            stroke={PINK}
            strokeWidth="1"
            initial={{ r: 44, opacity: 0.5 }}
            animate={{ r: [44, 70], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx={CX}
            cy={CY}
            r="54"
            fill="none"
            stroke="url(#coreRing)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px`, opacity: 0.8 }}
          />
        </>
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

      {/* Satellites: the outer orbit of concrete capabilities */}
      {stats.map((area, i) => {
        const strength = area.pct / 100;
        return AREA_SATELLITES[area.id].map((label, j) => {
          const deg = areaAngle(i) + (j - 1) * 24;
          const sp = polar(CX, CY, SAT_RING, deg);
          // Label sits radially outward from the satellite dot.
          const lp = polar(CX, CY, SAT_RING + 15, deg);
          const cos = Math.cos((deg * Math.PI) / 180);
          const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
          const dy = Math.abs(cos) > 0.35 ? 4 : Math.sin((deg * Math.PI) / 180) > 0 ? 12 : -6;
          const floatDelay = (i * 3 + j) * 0.4;
          return (
            <motion.g
              key={`sat-${label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.12 + j * 0.08 }}
            >
              <motion.g
                animate={reduced ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 3.4,
                  delay: floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <circle
                  cx={sp.x}
                  cy={sp.y}
                  r="10"
                  fill={PINK}
                  opacity={area.hot ? 0.07 + strength * 0.08 : 0}
                />
                <circle
                  cx={sp.x}
                  cy={sp.y}
                  r="4.5"
                  fill={area.hot ? PINK : "rgba(255,255,255,0.3)"}
                  stroke={
                    area.hot ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)"
                  }
                  strokeWidth="1"
                  opacity={0.55 + strength * 0.45}
                  style={{
                    filter: area.hot
                      ? "drop-shadow(0 0 6px rgba(249,38,114,0.6))"
                      : "none",
                  }}
                />
                <text
                  x={lp.x}
                  y={lp.y + dy}
                  textAnchor={anchor}
                  fill={
                    area.hot ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)"
                  }
                  fontSize="11.5"
                  fontWeight="600"
                  letterSpacing="0.04em"
                  fontFamily="inherit"
                >
                  {label}
                </text>
              </motion.g>
            </motion.g>
          );
        });
      })}

      {/* Area nodes (inner ring) */}
      {stats.map((area, i) => {
        const p = polar(CX, CY, RING, areaAngle(i));
        const strength = area.pct / 100;
        const nodeR = 9 + strength * 10;
        const above = p.y < CY;
        const labelY = above ? p.y - nodeR - 12 : p.y + nodeR + 20;
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
              animate={
                reduced || !area.hot
                  ? { scale: 1 }
                  : { scale: [1, 1.12, 1] }
              }
              transition={
                reduced || !area.hot
                  ? { duration: 0.5, delay: 0.5 + i * 0.12, ease: "backOut" }
                  : {
                      duration: 2.6,
                      delay: 0.5 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
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
              fill="rgba(255,255,255,0.9)"
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
                y={labelY + (above ? -13 : 14)}
                textAnchor="middle"
                fill={area.hot ? PINK : "rgba(255,255,255,0.45)"}
                fontSize="11"
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
      <p className="text-5xl font-black tabular-nums gradient-text leading-none">
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
