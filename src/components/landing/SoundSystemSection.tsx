"use client";

import React, { useState } from "react";
import { SOUND_SPECIFICATIONS, VENUE_ACOUSTIC_CERTIFICATIONS } from "@/lib/design/sound-specs";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { AcousticGauge } from "@/components/ui/AcousticGauge";
import { AcousticFrequencyCurve } from "@/components/ui/AcousticFrequencyCurve";
import { FluidReveal } from "@/components/ui/FluidReveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SoundSystemSection() {
  const [selectedGearIdx, setSelectedGearIdx] = useState<number>(0);
  const activeGear = SOUND_SPECIFICATIONS[selectedGearIdx];

  return (
    <section
      id="acoustics"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-white/[0.06]"
    >
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-15 blur-[160px]"
        style={{
          background: "radial-gradient(circle, #ff551f 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Audiophile Acoustic Engineering
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              The Gear Behind <span className="text-[#ff773d]">Flawless Vocals.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Standard karaoke machines use 50-cent preamps and plastic speakers
            that cause harsh vocal distortion. We built our suites to the same
            standard as Abbey Road and Capitol Records.
          </FluidReveal>
        </div>

        {/* Acoustic Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VENUE_ACOUSTIC_CERTIFICATIONS.map((cert, idx) => (
            <FluidReveal key={idx} delayMs={100 * (idx + 1)}>
              <DoubleBezel
                variant="subtle"
                size="md"
                className="h-full"
                innerClassName="p-6 bg-[#08080c] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff773d]">
                    {cert.badge}
                  </span>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 font-tabular">
                    {cert.value}
                  </div>
                  <div className="text-xs font-semibold text-[#d1d2db] mt-1">
                    {cert.title}
                  </div>
                </div>
                <p className="text-[11px] text-[#8f909e] mt-4 leading-relaxed border-t border-white/[0.06] pt-3">
                  {cert.description}
                </p>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>

        {/* Interactive Gear Inspector Double-Bezel Console */}
        <FluidReveal delayMs={300}>
          <DoubleBezel
            variant="default"
            size="xl"
            className="w-full"
            innerClassName="p-6 sm:p-10 lg:p-12 bg-[#09090d] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Gear Category Selector (col-span-5) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#8f909e] mb-2">
                  Touring Specification Deck
                </div>

                <div className="space-y-2">
                  {SOUND_SPECIFICATIONS.map((item, idx) => {
                    const isSelected = selectedGearIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedGearIdx(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-white/[0.08] border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff773d]">
                            {item.category}
                          </div>
                          <div className="text-sm font-bold text-white tracking-wide">
                            {item.brand} {item.model.split(" ")[0]}
                          </div>
                        </div>

                        <span
                          className={`font-mono text-xs transition-transform duration-500 ${
                            isSelected
                              ? "text-white translate-x-0"
                              : "text-white/20 -translate-x-1"
                          }`}
                        >
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Gear Deep Inspection (col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff773d]">
                      {activeGear.category}
                    </span>
                    <span className="rounded-full bg-white/[0.05] border border-white/[0.1] px-3 py-1 font-mono text-[10px] text-white">
                      {activeGear.brand}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                    {activeGear.model}
                  </h3>

                  <div className="space-y-2 border-y border-white/[0.06] py-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Engineering Specifications
                    </div>
                    <div className="text-sm text-[#d1d2db] font-mono leading-relaxed">
                      {activeGear.specs}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#10b981]">
                      Acoustic Experience Benefit
                    </div>
                    <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                      {activeGear.highlight}
                    </p>
                  </div>
                </div>

                {/* Live Acoustic Laboratory Telemetry Gauge */}
                <AcousticGauge
                  stcRating={65}
                  maxWattage={2800}
                  dbLimit={128}
                  variant="full"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#8f909e]">
                    Ready to sing with studio clarity?
                  </span>
                  <Link href="/book">
                    <Button
                      variant="default"
                      size="sm"
                      trailingIcon={
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      }
                      className="font-semibold uppercase tracking-wider text-xs"
                    >
                      Book A Room Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DoubleBezel>
        </FluidReveal>

        {/* Real-Time Acoustic DSP Frequency Response Tuning */}
        <FluidReveal delayMs={400}>
          <AcousticFrequencyCurve />
        </FluidReveal>
      </div>
    </section>
  );
}
