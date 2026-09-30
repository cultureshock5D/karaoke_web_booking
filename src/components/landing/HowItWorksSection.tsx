"use client";

import React from "react";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";

const STEPS = [
  {
    num: "01",
    phase: "SUITE SELECTION",
    title: "Curate Your Stage",
    desc: "Explore studio-grade chambers from intimate duo mastering rooms to 30-person private ballrooms with Martin Audio concert arrays.",
    telemetry: "Acoustic envelope & specs verified",
  },
  {
    num: "02",
    phase: "CALENDAR & DURATION",
    title: "Claim Real-Time Slot",
    desc: "Choose date, start time, and session length. Our database immediately places an atomic 15-minute lock on your selected suite.",
    telemetry: "Zero double-booking guarantee",
  },
  {
    num: "03",
    phase: "HOSPITALITY PAIRING",
    title: "Pre-Stock Bottles & Tapas",
    desc: "Select chilled Moët champagne, rare Japanese whiskies, and gourmet Wagyu tapas to be prepared and waiting the moment you step in.",
    telemetry: "Discreet butler notification queued",
  },
  {
    num: "04",
    phase: "INSTANT DEPOSIT",
    title: "Lock Reservation",
    desc: "Settle a 20% deposit via GCash, Maya, GrabPay, Visa/Mastercard, or QR Ph. Receive instant Apple Wallet & QR entry passes.",
    telemetry: "Cryptographic reference issued",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Seamless VIP Flow
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Reserved In Under <span className="text-[#ff773d]">90 Seconds.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            No endless phone calls, no waiting for manual confirmation, and zero
            queue at the venue entrance.
          </FluidReveal>
        </div>

        {/* 4 Connected Step Capsules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => (
            <FluidReveal key={step.num} delayMs={120 * (idx + 1)}>
              <DoubleBezel
                variant="default"
                size="lg"
                interactive
                glowColor="orange"
                className="h-full"
                innerClassName="p-6 sm:p-8 bg-[#08080c] flex flex-col justify-between h-full relative overflow-hidden"
              >
                {/* Large Background Faded Number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 -bottom-5 font-heading font-black text-white/[0.03] select-none text-8xl"
                >
                  {step.num}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff551f]/10 border border-[#ff551f]/30 font-mono text-xs font-bold text-[#ff8759] shadow-[0_0_12px_rgba(255,85,31,0.2)]">
                      {step.num}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8f909e]">
                      {step.phase}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-emerald-400 relative z-10">
                  <span>✓ {step.telemetry}</span>
                </div>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
