"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AcousticGaugeProps {
  stcRating?: number; // Studio standard sound transmission class, e.g. 65
  maxWattage?: number; // e.g. 2400W
  dbLimit?: number; // e.g. 118 dB
  className?: string;
  variant?: "compact" | "full" | "pill";
}

export function AcousticGauge({
  stcRating = 65,
  maxWattage = 2800,
  dbLimit = 118,
  className,
  variant = "full",
}: AcousticGaugeProps) {
  // Calculate percentage of STC (range 40 - 75)
  const normalized = Math.min(100, Math.max(0, ((stcRating - 40) / 35) * 100));
  const strokeDashoffset = 100 - normalized;

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-xs select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
          className
        )}
      >
        <span className="flex h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
        <span className="font-mono text-[11px] font-semibold tracking-wider text-[#d1d2db]">
          STC {stcRating}
        </span>
        <span className="text-white/20">|</span>
        <span className="text-[11px] text-[#8f909e]">
          STUDIO SEALED ({dbLimit}dB SPL)
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-xs select-none",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-[#ff551f]/10 border border-[#ff551f]/20 flex items-center justify-center text-[#ff773d]">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8f909e]">
              Acoustic Isolation
            </div>
            <div className="font-mono text-xs font-semibold text-white">
              STC {stcRating} Studio Standard
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-[#8f909e]">
            Peak SPL
          </div>
          <div className="font-mono text-xs font-semibold text-[#ff8759]">
            {dbLimit} dB
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#ff551f] shadow-[0_0_8px_#ff551f]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d1d2db]">
            Acoustic Laboratory Telemetry
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
          Calibrated
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Metric 1: STC Rating */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <div className="text-[9px] uppercase tracking-wider text-[#8f909e] mb-1">
            Sound Isolation
          </div>
          <div className="font-mono text-xl font-bold tracking-tight text-white">
            STC {stcRating}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            Zero bleed-through
          </div>
        </div>

        {/* Metric 2: Soundstage Power */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <div className="text-[9px] uppercase tracking-wider text-[#8f909e] mb-1">
            Array Output
          </div>
          <div className="font-mono text-xl font-bold tracking-tight text-[#ff773d]">
            {maxWattage}W
          </div>
          <div className="text-[10px] text-[#8f909e] mt-0.5">
            Martin Audio bi-amp
          </div>
        </div>

        {/* Metric 3: Clean SPL */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3 text-center">
          <div className="text-[9px] uppercase tracking-wider text-[#8f909e] mb-1">
            Max Headroom
          </div>
          <div className="font-mono text-xl font-bold tracking-tight text-white">
            {dbLimit} <span className="text-xs font-normal text-white/50">dB</span>
          </div>
          <div className="text-[10px] text-[#8f909e] mt-0.5">
            THD &lt; 0.005%
          </div>
        </div>
      </div>
    </div>
  );
}
