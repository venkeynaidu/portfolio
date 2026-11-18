"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Cpu, Activity, CheckCircle, Wifi, Play, Pause } from "lucide-react";

// ─── 1. POULTRY FARM ANIMATED BANNER (Godrej & Central Poultry) ───────────────
export function PoultryAnimatedBanner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f + 1) % 1000), 50);
    return () => clearInterval(timer);
  }, []);

  // Cycle states
  const eggWobble = Math.sin(frame * 0.25) * 8;
  const eggOpen = (Math.sin(frame * 0.08) + 1) * 0.5; // 0 to 1
  const chickBob = Math.abs(Math.sin(frame * 0.3)) * 6;
  const henPeck = Math.max(0, Math.sin(frame * 0.2)) * 14;
  const conveyorOffset = (frame * 3) % 240;

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#0b1f14] via-[#091a10] to-[#040d08] rounded-t-xl overflow-hidden border-b border-emerald-900/60 select-none">
      {/* Background Farm Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/15 via-transparent to-transparent" />
      
      {/* Wooden Barn Beams in Background */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#78350f]/40 border-b border-[#92400e]/30 flex justify-between px-6">
        <div className="w-3 h-20 bg-[#78350f]/30" />
        <div className="w-3 h-20 bg-[#78350f]/30" />
        <div className="w-3 h-20 bg-[#78350f]/30" />
      </div>

      {/* Live IoT Farm Telemetry Pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-emerald-950/90 text-emerald-300 border-emerald-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          GODREJ &amp; CENTRAL POULTRY &bull; LIVE HATCHERY
        </Badge>
        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          Temp: 32.5&deg;C &bull; Humidity: 65%
        </span>
      </div>

      {/* Main Animated SVG Canvas */}
      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* Grass / Ground Bedding */}
        <path d="M 0 190 Q 150 185 300 190 T 600 190 L 600 240 L 0 240 Z" fill="#062817" />
        <path d="M 0 205 L 600 205 L 600 240 L 0 240 Z" fill="#031a0e" />

        {/* Straw Particles on Ground */}
        {[-30, 80, 180, 290, 410, 520].map((x, i) => (
          <path key={i} d={`M ${x} 200 L ${x + 24} 196 M ${x + 8} 198 L ${x + 30} 202`} stroke="#d97706" strokeWidth="2.5" opacity="0.65" />
        ))}

        {/* ─── 1. MOTHER HEN (Walking & Pecking) ─── */}
        <g transform={`translate(${110 + Math.sin(frame * 0.05) * 20}, ${150 + henPeck * 0.2})`}>
          {/* Hen Body */}
          <ellipse cx="40" cy="25" rx="30" ry="22" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Wing */}
          <path d="M 25 22 Q 40 34 52 22 Q 40 14 25 22 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          {/* Tail */}
          <path d="M 12 20 L 0 8 L 8 28 Z" fill="#e2e8f0" />
          
          {/* Neck & Head with Pecking rotation */}
          <g transform={`rotate(${henPeck}, 62, 10)`}>
            <ellipse cx="62" cy="10" rx="14" ry="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Red Comb */}
            <path d="M 58 -2 Q 62 -10 66 -2 Q 70 -10 74 2" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
            {/* Beak */}
            <polygon points="74,10 88,14 74,18" fill="#f59e0b" />
            {/* Eye */}
            <circle cx="68" cy="8" r="2.5" fill="#0f172a" />
            {/* Wattle */}
            <path d="M 72 18 Q 74 26 68 24 Z" fill="#ef4444" />
          </g>

          {/* Legs */}
          <line x1="32" y1="44" x2="32" y2="58" stroke="#f59e0b" strokeWidth="3" />
          <line x1="32" y1="58" x2="42" y2="58" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="46" y1="44" x2="46" y2="58" stroke="#f59e0b" strokeWidth="3" />
          <line x1="46" y1="58" x2="56" y2="58" stroke="#f59e0b" strokeWidth="2.5" />
        </g>

        {/* ─── 2. HATCHING NESTING AREA & CRACKING EGG ─── */}
        <g transform="translate(290, 142)">
          {/* Golden Straw Nest */}
          <ellipse cx="45" cy="46" rx="55" ry="16" fill="#b45309" opacity="0.9" />
          <ellipse cx="45" cy="42" rx="48" ry="12" fill="#d97706" />

          {/* Wobbling Cracking Egg */}
          <g transform={`rotate(${eggWobble}, 45, 30)`}>
            {/* Bottom Half of Eggshell */}
            <path d="M 22 28 C 22 48 68 48 68 28 L 60 26 L 52 30 L 45 25 L 38 30 L 30 25 Z" fill="#fef3c7" stroke="#fde68a" strokeWidth="1.5" />
            
            {/* Baby Chick Popping Out */}
            <g transform={`translate(0, ${-eggOpen * 18 - chickBob})`}>
              {/* Chick Body */}
              <circle cx="45" cy="22" r="14" fill="#facc15" stroke="#eab308" strokeWidth="1" />
              {/* Head */}
              <circle cx="45" cy="10" r="10" fill="#fde047" stroke="#eab308" strokeWidth="1" />
              {/* Cute Eyes */}
              <circle cx="41" cy="9" r="1.8" fill="#000000" />
              <circle cx="49" cy="9" r="1.8" fill="#000000" />
              {/* Tiny Orange Beak */}
              <polygon points="45,11 48,14 45,16 42,14" fill="#f97316" />
              {/* Tiny Wing Flap */}
              <ellipse cx="32" cy="22" rx="4" ry="7" fill="#fde047" transform={`rotate(${Math.sin(frame * 0.4) * 20}, 32, 22)`} />
              <ellipse cx="58" cy="22" rx="4" ry="7" fill="#fde047" transform={`rotate(${-Math.sin(frame * 0.4) * 20}, 58, 22)`} />
            </g>

            {/* Top Shell Lifting / Cracking */}
            <g transform={`translate(0, ${-eggOpen * 24}) rotate(${-eggOpen * 18}, 45, 10)`}>
              <path d="M 22 26 C 22 4 68 4 68 26 L 60 22 L 52 26 L 45 20 L 38 26 L 30 20 Z" fill="#fef3c7" stroke="#fde68a" strokeWidth="1.5" />
            </g>
          </g>

          {/* Intact Golden Eggs in Nest */}
          <ellipse cx="18" cy="38" rx="8" ry="12" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" transform="rotate(-25, 18, 38)" />
          <ellipse cx="72" cy="40" rx="8" ry="12" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" transform="rotate(30, 72, 40)" />
        </g>

        {/* ─── 3. BABY CHICKS HOPPING ─── */}
        <g transform={`translate(${450 + Math.sin(frame * 0.1) * 15}, ${165 - Math.abs(Math.sin(frame * 0.35)) * 12})`}>
          <circle cx="15" cy="18" r="10" fill="#facc15" stroke="#eab308" strokeWidth="1" />
          <circle cx="22" cy="12" r="7" fill="#fde047" />
          <polygon points="28,12 34,14 28,16" fill="#f97316" />
          <circle cx="24" cy="10" r="1.5" fill="#000" />
          <line x1="12" y1="26" x2="12" y2="34" stroke="#f97316" strokeWidth="2" />
          <line x1="18" y1="26" x2="18" y2="34" stroke="#f97316" strokeWidth="2" />
        </g>

        {/* ─── 4. AUTOMATED EGG CONVEYOR BELT (BOTTOM TRACK) ─── */}
        <g transform="translate(0, 206)">
          {/* Conveyor Bed */}
          <rect x="0" y="0" width="600" height="20" fill="#1e293b" />
          <rect x="0" y="2" width="600" height="4" fill="#0284c7" opacity="0.6" />
          
          {/* Moving Eggs on Conveyor */}
          {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540].map((baseX, idx) => {
            const curX = (baseX + conveyorOffset) % 600;
            return (
              <g key={idx} transform={`translate(${curX}, 2)`}>
                <ellipse cx="14" cy="6" rx="9" ry="6" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-black/75 px-3 py-1.5 rounded-lg border border-emerald-800/60 backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Hatchability Index: <strong>98.4%</strong></span>
        </span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>Broiler FCR: <strong>1.42 Target Met</strong></span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-emerald-400 font-bold">42,800 Eggs Sorted/Day</span>
      </div>
    </div>
  );
}

// ─── 2. DEFENSE AEROSPACE RADAR & AI COMMS (ADA VCS & PMS) ───────────────────
export function DefenseAnimatedBanner() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setAngle((a) => (a + 3) % 360), 30);
    return () => clearInterval(timer);
  }, []);

  // Radar sweep line coordinates
  const rad = (angle * Math.PI) / 180;
  const cx = 300;
  const cy = 120;
  const r = 98;
  const sweepX = cx + r * Math.cos(rad);
  const sweepY = cy + r * Math.sin(rad);

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#02131b] via-[#031d28] to-[#010b10] rounded-t-xl overflow-hidden border-b border-cyan-900/60 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />

      {/* Defense Clearance Banner */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-cyan-950/90 text-cyan-300 border-cyan-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Shield className="h-3 w-3 text-cyan-400" />
          AERONAUTICAL DEVELOPMENT AGENCY &bull; DEFENSE SECURE
        </Badge>
        <Badge className="bg-emerald-950/80 text-emerald-300 border-emerald-700/50 text-[10px] font-mono">
          AIR-GAPPED: 0.0.0.0/0 BLOCKED
        </Badge>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* Tactical Grid Background */}
        <defs>
          <pattern id="defense-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0e7490" strokeWidth="0.5" opacity="0.25" />
          </pattern>
          <linearGradient id="sweep-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="600" height="240" fill="url(#defense-grid)" />

        {/* ─── RADAR DISPLAY CENTER ─── */}
        {/* Outer Phosphor Screen & Concentric Range Rings */}
        <circle cx={cx} cy={cy} r={r} fill="#02212b" stroke="#06b6d4" strokeWidth="2" opacity="0.85" />
        <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <circle cx={cx} cy={cy} r={r * 0.44} fill="none" stroke="#0891b2" strokeWidth="1" opacity="0.6" />
        <circle cx={cx} cy={cy} r={r * 0.18} fill="none" stroke="#0891b2" strokeWidth="1" opacity="0.6" />

        {/* Crosshair Axes */}
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#0e7490" strokeWidth="1" opacity="0.5" />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#0e7490" strokeWidth="1" opacity="0.5" />

        {/* Rotating Radar Sweep Line */}
        <line x1={cx} y1={cy} x2={sweepX} y2={sweepY} stroke="#22d3ee" strokeWidth="2.5" />
        {/* Sweep Glow Cone Sector */}
        <path
          d={`M ${cx} ${cy} L ${sweepX} ${sweepY} A ${r} ${r} 0 0 0 ${cx + r * Math.cos(rad - 0.5)} ${cy + r * Math.sin(rad - 0.5)} Z`}
          fill="url(#sweep-gradient)"
          opacity="0.45"
        />

        {/* Target Aircraft Blips */}
        <g transform={`translate(${cx + 45}, ${cy - 38})`}>
          <circle cx="0" cy="0" r="3.5" fill="#facc15" className="animate-ping" />
          <circle cx="0" cy="0" r="3.5" fill="#facc15" />
          <text x="8" y="4" fill="#fde047" fontSize="9" fontFamily="monospace">ADA-LCA#204</text>
        </g>

        <g transform={`translate(${cx - 55}, ${cy + 30})`}>
          <circle cx="0" cy="0" r="3" fill="#38bdf8" />
          <text x="7" y="3" fill="#38bdf8" fontSize="8" fontFamily="monospace">NODE_KAFKA_01</text>
        </g>

        {/* ─── LEFT: AIR-GAPPED WEBRTC AUDIO & WHISPER AI MoM ENGINE ─── */}
        <g transform="translate(30, 70)">
          <rect width="130" height="110" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="1" opacity="0.8" />
          <text x="12" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">JITSI WEBRTC</text>
          <text x="12" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace">Audio Bitrate: 128kbps</text>
          <text x="12" y="58" fill="#94a3b8" fontSize="9" fontFamily="monospace">Latency: &lt;14ms</text>
          <text x="12" y="78" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">&bull; AI MoM ACTIVE</text>
          <text x="12" y="94" fill="#facc15" fontSize="8" fontFamily="monospace">Local Whisper Offline</text>
        </g>

        {/* ─── RIGHT: PMS TASK SPRINT & KAFKA EVENT STREAM ─── */}
        <g transform="translate(440, 70)">
          <rect width="130" height="110" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="1" opacity="0.8" />
          <text x="12" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">PMS SPRINT CORE</text>
          <text x="12" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace">Queue: 148 Tickets</text>
          <text x="12" y="58" fill="#94a3b8" fontSize="9" fontFamily="monospace">Sync: Apache Kafka</text>
          <text x="12" y="78" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">&bull; PLAYWRIGHT E2E</text>
          <text x="12" y="94" fill="#38bdf8" fontSize="8" fontFamily="monospace">100% Automated Pass</text>
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-cyan-300 bg-black/80 px-3 py-1.5 rounded-lg border border-cyan-800/60 backdrop-blur-md">
        <span>Aeronautical Development Agency (Offsite)</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>FastAPI + Django REST + MySQL</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-emerald-400 font-bold">100% Defense Secure</span>
      </div>
    </div>
  );
}

// ─── 3. BEVERAGE PRODUCTION & BOTTLING (SBL Food and Beverage) ────────────────
export function BeverageAnimatedBanner() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setOffset((o) => (o + 2.5) % 300), 40);
    return () => clearInterval(timer);
  }, []);

  const liquidPour = Math.abs(Math.sin(offset * 0.1)) > 0.3;

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#082032] via-[#0c2e47] to-[#04131f] rounded-t-xl overflow-hidden border-b border-sky-900/60 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent" />

      {/* Header Pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-sky-950/90 text-sky-300 border-sky-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Activity className="h-3 w-3 text-sky-400" />
          SRI BHAGYA LAKSHMI (SBL) FOOD &amp; BEVERAGE &bull; BOTTLING LINE
        </Badge>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          Throughput: 12,500 Bottles/Hr
        </span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* Factory Background Columns */}
        {[-20, 140, 300, 460, 620].map((x, i) => (
          <rect key={i} x={x} y="0" width="16" height="240" fill="#0f172a" opacity="0.3" />
        ))}

        {/* ─── CONVEYOR BELT TRACK ─── */}
        <rect x="0" y="160" width="600" height="24" fill="#334155" />
        <rect x="0" y="164" width="600" height="4" fill="#0284c7" />
        <line x1="0" y1="184" x2="600" y2="184" stroke="#475569" strokeWidth="2" />

        {/* ─── MOVING BEVERAGE BOTTLES ─── */}
        {[
          { color: "#f97316", fillH: 42, label: "Orange Juice" },
          { color: "#06b6d4", fillH: 40, label: "Sparkling" },
          { color: "#10b981", fillH: 44, label: "Lime Soda" },
          { color: "#8b5cf6", fillH: 38, label: "Berry Fizz" },
          { color: "#ef4444", fillH: 42, label: "Punch" },
          { color: "#f59e0b", fillH: 45, label: "Mango" },
          { color: "#3b82f6", fillH: 40, label: "Sport" },
          { color: "#ec4899", fillH: 42, label: "Guava" },
        ].map((bottle, idx) => {
          const x = (idx * 75 + offset) % 600;
          return (
            <g key={idx} transform={`translate(${x}, 105)`}>
              {/* Outer Glass Bottle Silhouette */}
              <rect x="8" y="15" width="24" height="42" rx="4" fill="#ffffff" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="1.2" />
              {/* Bottle Neck */}
              <rect x="15" y="4" width="10" height="12" fill="#ffffff" fillOpacity="0.25" stroke="#bae6fd" strokeWidth="1" />
              {/* Bottle Cap */}
              <rect x="13" y="1" width="14" height="4" rx="1" fill="#ef4444" />
              {/* Inside Liquid */}
              <rect x="10" y={57 - bottle.fillH * 0.8} width="20" height={bottle.fillH * 0.8} rx="2" fill={bottle.color} fillOpacity="0.85" />
              {/* Label */}
              <rect x="9" y="28" width="22" height="14" fill="#ffffff" fillOpacity="0.8" />
              <text x="20" y="38" fontSize="6" fill="#0f172a" fontWeight="bold" textAnchor="middle">SBL</text>
            </g>
          );
        })}

        {/* ─── AUTOMATED LIQUID FILLING NOZZLE (CENTER) ─── */}
        <g transform="translate(285, 20)">
          {/* Overhead Dispenser Machine Tank */}
          <rect x="-30" y="0" width="90" height="45" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="15" y="28" fontSize="10" fill="#38bdf8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FILLER #02</text>
          {/* Nozzle Cylinder */}
          <rect x="10" y="45" width="10" height="35" fill="#64748b" />
          {/* Liquid Jet Pouring */}
          {liquidPour && (
            <rect x="13" y="80" width="4" height="40" fill="#f59e0b" opacity="0.9" className="animate-pulse" />
          )}
        </g>

        {/* ─── LASER QUALITY-CONTROL SCANNER (RIGHT) ─── */}
        <g transform="translate(450, 40)">
          <rect x="0" y="0" width="30" height="20" rx="3" fill="#0369a1" />
          <line x1="15" y1="20" x2="15" y2="160" stroke="#ef4444" strokeWidth="2" opacity="0.85" />
          <circle cx="15" cy="140" r="4" fill="#ef4444" className="animate-ping" />
          <text x="36" y="15" fontSize="9" fill="#ef4444" fontWeight="bold" fontFamily="monospace">QC SCAN PASS</text>
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-sky-300 bg-black/80 px-3 py-1.5 rounded-lg border border-sky-800/60 backdrop-blur-md">
        <span>Multi-Plant MySQL TCL Sync</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>Kafka Real-Time Distribution</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-emerald-400 font-bold">Closed-Loop Bottle Recycling</span>
      </div>
    </div>
  );
}

// ─── 4. E-COMMERCE RETAIL & SHOPPING (Cartel) ──────────────────────────────────
export function EcommerceAnimatedBanner() {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPos((p) => (p + 1) % 400), 30);
    return () => clearInterval(timer);
  }, []);

  const cartX = 80 + Math.sin(pos * 0.05) * 40;

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#15102a] via-[#1a1435] to-[#0a0817] rounded-t-xl overflow-hidden border-b border-purple-900/60 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/15 via-transparent to-transparent" />

      {/* Header Pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-purple-950/90 text-purple-300 border-purple-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-purple-400" />
          CARTEL &bull; MULTI-TENANT E-COMMERCE &amp; FLEET
        </Badge>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          Razorpay Gateway 200 OK
        </span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* Showroom Floor Grid */}
        <line x1="0" y1="180" x2="600" y2="180" stroke="#4c1d95" strokeWidth="2" />
        
        {/* ─── ANIMATED ROLLING SHOPPING CART ─── */}
        <g transform={`translate(${cartX}, 100)`}>
          {/* Wire Basket */}
          <path d="M 0 10 L 15 10 L 30 50 L 75 50 L 90 15 L 20 15" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M 35 15 L 42 50 M 50 15 L 54 50 M 65 15 L 66 50 M 80 15 L 75 50" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
          {/* Items inside cart */}
          <rect x="28" y="24" width="18" height="18" rx="3" fill="#ec4899" />
          <rect x="48" y="18" width="16" height="24" rx="3" fill="#a855f7" />
          <rect x="66" y="26" width="14" height="16" rx="2" fill="#10b981" />
          {/* Cart Handle */}
          <line x1="0" y1="10" x2="-8" y2="0" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="36" cy="62" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="70" cy="62" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* ─── FLOATING PRODUCT PEDESTALS ─── */}
        {/* Product 1: Sneakers */}
        <g transform="translate(260, 80)">
          {/* Glowing Pedestal */}
          <ellipse cx="40" cy="90" rx="36" ry="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
          {/* Floating Sneaker */}
          <g transform={`translate(15, ${35 + Math.sin(pos * 0.1) * 6})`}>
            <path d="M 0 30 Q 15 20 30 18 Q 45 12 55 24 L 52 35 L 0 35 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="0" y="32" width="54" height="6" rx="2" fill="#ffffff" />
            <path d="M 12 26 Q 28 22 40 18" stroke="#f59e0b" strokeWidth="2" fill="none" />
          </g>
          <text x="40" y="112" fontSize="9" fill="#a5b4fc" fontWeight="bold" fontFamily="monospace" textAnchor="middle">NIKE AIR MAX</text>
        </g>

        {/* Product 2: Luxury Watch */}
        <g transform="translate(420, 75)">
          <ellipse cx="40" cy="95" rx="36" ry="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
          {/* Floating Watch */}
          <g transform={`translate(24, ${35 + Math.cos(pos * 0.1) * 6})`}>
            <circle cx="16" cy="18" r="16" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />
            <circle cx="16" cy="18" r="12" fill="#1e293b" />
            <line x1="16" y1="18" x2="16" y2="10" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="18" x2="22" y2="18" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Strap */}
            <rect x="11" y="-6" width="10" height="8" fill="#78350f" rx="1" />
            <rect x="11" y="34" width="10" height="8" fill="#78350f" rx="1" />
          </g>
          <text x="40" y="117" fontSize="9" fill="#a5b4fc" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CHRONO LUXE</text>
        </g>

        {/* ─── PAYMENT CHECKMARK HALO ─── */}
        <g transform="translate(530, 45)">
          <circle cx="20" cy="20" r="18" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="animate-pulse" />
          <path d="M 12 20 L 18 26 L 28 14" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
          <text x="20" y="48" fontSize="8" fill="#34d399" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PAID</text>
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-purple-300 bg-black/80 px-3 py-1.5 rounded-lg border border-purple-800/60 backdrop-blur-md">
        <span>Groceries, Apparel &amp; Fleet Logistics</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>Razorpay SDK + SMS Triggers</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-emerald-400 font-bold">Android Companion REST API</span>
      </div>
    </div>
  );
}

// ─── 5. COMMUNITY MATRIMONY (Catholica Kalyanavedhika) ─────────────────────────
export function MatrimonyAnimatedBanner() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => (p + 1) % 360), 35);
    return () => clearInterval(timer);
  }, []);

  const ringGlow = Math.sin((pulse * Math.PI) / 180) * 0.3 + 0.7;

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#240d1e] via-[#2d1127] to-[#12050e] rounded-t-xl overflow-hidden border-b border-rose-900/60 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/15 via-transparent to-transparent" />

      {/* Header Pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-rose-950/90 text-rose-300 border-rose-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Shield className="h-3 w-3 text-rose-400" />
          CATHOLICA KALYANAVEDHIKA &bull; COMMUNITY MATRIMONY
        </Badge>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          RBAC Security Verified
        </span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* Connecting Match Bridge */}
        <path d="M 120 120 Q 300 40 480 120" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

        {/* ─── INTERLOCKING GOLDEN WEDDING RINGS (CENTER) ─── */}
        <g transform="translate(300, 115)">
          {/* Ring 1 */}
          <circle cx="-16" cy="0" r="32" fill="none" stroke="#fbbf24" strokeWidth="6" opacity={ringGlow} />
          {/* Ring 2 */}
          <circle cx="16" cy="0" r="32" fill="none" stroke="#f59e0b" strokeWidth="6" opacity={ringGlow} />
          {/* Sparkling Diamond Solitaire */}
          <polygon points="16,-34 22,-24 16,-18 10,-24" fill="#38bdf8" className="animate-ping" />
          <polygon points="16,-34 22,-24 16,-18 10,-24" fill="#ffffff" />
        </g>

        {/* ─── LEFT: VERIFIED GROOM PROFILE CARD ─── */}
        <g transform="translate(60, 65)">
          <rect width="115" height="110" rx="8" fill="#1c1917" stroke="#fb7185" strokeWidth="1.2" opacity="0.9" />
          <circle cx="57" cy="40" r="22" fill="#0284c7" />
          <circle cx="57" cy="34" r="9" fill="#f8fafc" />
          <path d="M 42 56 Q 57 44 72 56 Z" fill="#f8fafc" />
          <text x="57" y="78" fontSize="10" fill="#f8fafc" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VERIFIED</text>
          <text x="57" y="94" fontSize="8" fill="#34d399" fontFamily="monospace" textAnchor="middle">&bull; ELIGIBLE</text>
        </g>

        {/* ─── RIGHT: VERIFIED BRIDE PROFILE CARD ─── */}
        <g transform="translate(425, 65)">
          <rect width="115" height="110" rx="8" fill="#1c1917" stroke="#fb7185" strokeWidth="1.2" opacity="0.9" />
          <circle cx="57" cy="40" r="22" fill="#ec4899" />
          <circle cx="57" cy="34" r="9" fill="#f8fafc" />
          <path d="M 42 56 Q 57 44 72 56 Z" fill="#f8fafc" />
          <text x="57" y="78" fontSize="10" fill="#f8fafc" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VERIFIED</text>
          <text x="57" y="94" fontSize="8" fill="#34d399" fontFamily="monospace" textAnchor="middle">&bull; ELIGIBLE</text>
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-rose-300 bg-black/80 px-3 py-1.5 rounded-lg border border-rose-800/60 backdrop-blur-md">
        <span>Role-Based Access Control (RBAC)</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>Django Secure Auth + MySQL</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-emerald-400 font-bold">100% Privacy Protected</span>
      </div>
    </div>
  );
}

// ─── 6. EMBEDDED SERVO & ZIGBEE (Sri Prakash College of Engineering) ───────────
export function HardwareAnimatedBanner() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setAngle((a) => (a + 4) % 360), 30);
    return () => clearInterval(timer);
  }, []);

  // Oscillate servo arm 0 to 180 degrees
  const servoAngle = (Math.sin((angle * Math.PI) / 180) + 1) * 90; // 0 to 180
  const rad = (servoAngle * Math.PI) / 180;
  const armLen = 42;
  const armX = 140 + armLen * Math.cos(-rad);
  const armY = 140 + armLen * Math.sin(-rad);

  return (
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-[#061e16] via-[#092b1f] to-[#04140e] rounded-t-xl overflow-hidden border-b border-emerald-900/60 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />

      {/* Header Pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <Badge className="bg-emerald-950/90 text-emerald-300 border-emerald-700/60 text-[10px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md">
          <Cpu className="h-3 w-3 text-emerald-400" />
          SRI PRAKASH COLLEGE &bull; EMBEDDED DC SERVO &amp; ZIGBEE
        </Badge>
        <span className="text-[10px] font-mono text-yellow-300 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-800/40">
          PWM: 50.0Hz &bull; Angle: {Math.round(servoAngle)}&deg;
        </span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
        {/* PCB Circuit Traces */}
        <path d="M 40 180 L 120 180 L 140 160 L 220 160" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M 240 160 L 320 160 L 340 180 L 420 180" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* ─── DC SERVO MOTOR WITH ROTATING HORN (LEFT) ─── */}
        <g transform="translate(60, 45)">
          {/* Black Servo Motor Case */}
          <rect x="20" y="55" width="120" height="85" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="80" y="115" fontSize="10" fill="#94a3b8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SERVO MOTOR</text>
          
          {/* Protractor Arc Scale */}
          <path d="M 38 65 A 42 42 0 0 1 122 65" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
          
          {/* Rotating Horn Spline */}
          <circle cx="80" cy="65" r="14" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
          {/* Rotating Arm */}
          <line
            x1="80"
            y1="65"
            x2={80 + 38 * Math.cos(-rad)}
            y2={65 + 38 * Math.sin(-rad)}
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="80" cy="65" r="4" fill="#ffffff" />
        </g>

        {/* ─── DIGITAL OSCILLOSCOPE SCREEN (CENTER) ─── */}
        <g transform="translate(250, 50)">
          <rect width="145" height="110" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
          {/* Scope Grid */}
          <line x1="0" y1="55" x2="145" y2="55" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="72" y1="0" x2="72" y2="110" stroke="#065f46" strokeWidth="1" strokeDasharray="2 2" />
          {/* Pulsing PWM Square Wave */}
          <path
            d="M 10 55 L 25 55 L 25 25 L 55 25 L 55 55 L 85 55 L 85 25 L 115 25 L 115 55 L 135 55"
            stroke="#34d399"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <text x="12" y="90" fontSize="8" fill="#34d399" fontFamily="monospace">CH1: PWM 50.0Hz</text>
          <text x="12" y="102" fontSize="8" fill="#facc15" fontFamily="monospace">Duty Cycle: 62.5%</text>
        </g>

        {/* ─── ARDUINO UNO & ZIGBEE WIRELESS RF BEAMS (RIGHT) ─── */}
        <g transform="translate(435, 60)">
          {/* Arduino Board */}
          <rect width="130" height="95" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <text x="65" y="45" fontSize="11" fill="#ffffff" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ARDUINO UNO</text>
          
          {/* ATMega Chip */}
          <rect x="40" y="55" width="50" height="18" rx="2" fill="#0f172a" />
          <text x="65" y="68" fontSize="7" fill="#94a3b8" fontFamily="monospace" textAnchor="middle">ATmega328P</text>

          {/* Glowing Status LEDs */}
          <circle cx="20" cy="20" r="3" fill="#10b981" className="animate-ping" />
          <circle cx="20" cy="20" r="3" fill="#10b981" />
          <circle cx="32" cy="20" r="3" fill="#f59e0b" />

          {/* Zigbee Wireless RF Pulse Waves */}
          <path d="M 115 15 A 12 12 0 0 1 115 35" fill="none" stroke="#34d399" strokeWidth="2" className="animate-pulse" />
          <path d="M 120 10 A 18 18 0 0 1 120 40" fill="none" stroke="#34d399" strokeWidth="2" className="animate-pulse" />
          <text x="65" y="88" fontSize="8" fill="#fef08a" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ZIGBEE WIRELESS TX/RX</text>
        </g>
      </svg>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-2 inset-x-3 z-10 flex items-center justify-between text-[11px] font-mono text-emerald-300 bg-black/80 px-3 py-1.5 rounded-lg border border-emerald-800/60 backdrop-blur-md">
        <span>B.Tech Thesis Project &bull; SPCE</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span>Wireless Zigbee vs Wired Latency Benchmark</span>
        <span className="text-slate-400 hidden sm:inline">&bull;</span>
        <span className="text-yellow-400 font-bold">Latency: 18ms</span>
      </div>
    </div>
  );
}
