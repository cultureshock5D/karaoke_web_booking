"use client";

import React, { useState } from "react";
import { DoubleBezel } from "./DoubleBezel";

interface EqPreset {
  id: string;
  name: string;
  subtitle: string;
  points: { hz: string; db: number }[];
  pathD: string;
}

const EQ_PRESETS: EqPreset[] = [
  {
    id: "mastering-flat",
    name: "Mastering Studio Flat",
    subtitle: "Reference monitoring tuned to Genelec 8341A SAM specifications",
    points: [
      { hz: "20Hz", db: 0 },
      { hz: "100Hz", db: 0 },
      { hz: "1kHz", db: 0 },
      { hz: "5kHz", db: +0.5 },
      { hz: "20kHz", db: 0 },
    ],
    pathD: "M 0 100 Q 150 100, 300 100 T 600 100",
  },
  {
    id: "vocal-presence",
    name: "Vocal Clarity Boost",
    subtitle: "+3dB presence lift at 3.5kHz for effortless vocal projection",
    points: [
      { hz: "20Hz", db: -1 },
      { hz: "100Hz", db: +0.5 },
      { hz: "1kHz", db: +1.5 },
      { hz: "3.5kHz", db: +3.2 },
      { hz: "20kHz", db: +1.0 },
    ],
    pathD: "M 0 105 Q 120 95, 250 85 Q 400 45, 500 75 T 600 88",
  },
  {
    id: "club-bass",
    name: "Martin Audio Soundstage",
    subtitle: "Punchy sub-bass contour with controlled 35Hz extension",
    points: [
      { hz: "35Hz", db: +4.5 },
      { hz: "120Hz", db: +3.0 },
      { hz: "1kHz", db: 0 },
      { hz: "8kHz", db: +1.8 },
      { hz: "20kHz", db: +0.5 },
    ],
    pathD: "M 0 45 Q 100 55, 220 90 Q 380 100, 480 82 T 600 95",
  },
  {
    id: "warm-tube",
    name: "Vintage Analog Tube",
    subtitle: "Silky top end roll-off with 2nd-order harmonic richness",
    points: [
      { hz: "20Hz", db: +1.5 },
      { hz: "250Hz", db: +2.0 },
      { hz: "1kHz", db: +0.5 },
      { hz: "6kHz", db: -0.5 },
      { hz: "18kHz", db: -2.5 },
    ],
    pathD: "M 0 80 Q 140 68, 280 95 Q 420 105, 520 120 T 600 135",
  },
];

export function AcousticFrequencyCurve() {
  const [activeEq, setActiveEq] = useState<EqPreset>(EQ_PRESETS[1]);

  return (
    <DoubleBezel
      variant="default"
      size="xl"
      className="w-full"
      innerClassName="p-6 sm:p-10 bg-[#08080c] space-y-6 select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff773d]">
            DIGITAL SIGNAL PROCESSING // DSP CURVE
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
            Real-Time Acoustic EQ Tuning
          </h3>
        </div>

        {/* EQ Preset Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.02] border border-white/[0.06] p-1 rounded-full">
          {EQ_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActiveEq(preset)}
              className={`rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-all duration-500 cursor-pointer ${
                activeEq.id === preset.id
                  ? "bg-[#ff551f] text-white shadow-[0_0_12px_rgba(255,85,31,0.4)]"
                  : "text-[#8f909e] hover:text-white"
              }`}
            >
              {preset.name.split(" ")[0]} {preset.name.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-[#a0a1b0] max-w-xl">
        {activeEq.subtitle}
      </div>

      {/* SVG Frequency Response Graph Canvas */}
      <div className="relative h-44 sm:h-56 w-full rounded-2xl bg-white/[0.01] border border-white/[0.06] overflow-hidden p-4">
        {/* Horizontal dB Grid lines */}
        <div className="absolute inset-x-0 top-1/4 border-b border-white/[0.04]" />
        <div className="absolute inset-x-0 top-1/2 border-b border-white/[0.08]" />
        <div className="absolute inset-x-0 top-3/4 border-b border-white/[0.04]" />

        {/* dB labels */}
        <div className="absolute left-3 top-2 font-mono text-[9px] text-[#8f909e]">
          +6 dB
        </div>
        <div className="absolute left-3 top-[48%] font-mono text-[9px] text-white/50">
          0 dB (Reference)
        </div>
        <div className="absolute left-3 bottom-2 font-mono text-[9px] text-[#8f909e]">
          -6 dB
        </div>

        {/* Responsive SVG Curve */}
        <svg
          viewBox="0 0 600 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Shaded Area under curve */}
          <path
            d={`${activeEq.pathD} L 600 200 L 0 200 Z`}
            fill="url(#eqGlowGradient)"
            className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />

          {/* Stroke Line */}
          <path
            d={activeEq.pathD}
            fill="none"
            stroke="#ff551f"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            filter="url(#glowFilter)"
          />

          <defs>
            <linearGradient id="eqGlowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff551f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff551f" stopOpacity="0" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Frequency Points at bottom */}
        <div className="absolute inset-x-8 bottom-2 flex justify-between font-mono text-[9px] text-[#8f909e]">
          <span>20 Hz</span>
          <span>100 Hz</span>
          <span>500 Hz</span>
          <span>1 kHz</span>
          <span>4 kHz</span>
          <span>10 kHz</span>
          <span>20 kHz</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8f909e] pt-2">
        <span>Latency: &lt; 1.2ms (Dante Digital Network)</span>
        <span className="text-emerald-400">Feedback Notch Filter: Auto-Active</span>
      </div>
    </DoubleBezel>
  );
}
