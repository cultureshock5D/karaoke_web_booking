"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";
import { Button } from "@/components/ui/button";
import {
  InteractiveLightingSelector,
  LightingPreset,
  LIGHTING_PRESETS,
} from "@/components/ui/InteractiveLightingSelector";

export function AtmosphereSection() {
  const [activeLighting, setActiveLighting] = useState<LightingPreset>(
    LIGHTING_PRESETS[1]
  );

  return (
    <section
      id="atmosphere"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="purple" variant="glass">
              Sensory Nightlife & Hospitality
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Lighting Synced To <span className="text-[#a855f7]">Your Tempo.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Every suite features programmable DMX architectural fixtures,
            independent medical-grade HEPA ventilation, and custom bottle
            service delivered with silent precision.
          </FluidReveal>
        </div>

        {/* Interactive Lighting & Atmosphere Double-Bezel Console */}
        <FluidReveal delayMs={300}>
          <DoubleBezel
            variant="default"
            size="xl"
            className="w-full"
            innerClassName="p-6 sm:p-10 lg:p-12 bg-[#09090d] relative overflow-hidden"
          >
            {/* Dynamic Room Wash Simulation */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full blur-[160px] opacity-30 transition-all duration-700"
              style={{ backgroundColor: activeLighting.colors[0] }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Interactive Lighting Controller (col-span-6) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#a855f7]">
                    DMX 512 Architecture
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Custom Chromatic Profiles
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                    Select a vibe below to simulate the automated architectural
                    lighting transforms inside our private soundstages. Transitions
                    are fluid, flicker-free, and reactive to your vocals.
                  </p>
                </div>

                <InteractiveLightingSelector
                  onSelect={setActiveLighting}
                  showPreviewBox={true}
                />
              </div>

              {/* Right Column: Culinary & Mixology Highlights (col-span-6) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/images/why-us-ktv.jpg"
                    alt="Sensory lounge atmosphere and bottle service"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(9,9,13,0.95) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#ff773d]">
                        In-Suite Dining
                      </div>
                      <div className="text-sm font-bold text-white">
                        Artisanal Wagyu & Smoked Yuzu Highballs
                      </div>
                    </div>
                    <span className="font-mono text-xs text-emerald-400">
                      Discreet Butler Call
                    </span>
                  </div>
                </div>

                {/* Hospitality Features List */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                    <div className="text-[10px] font-mono uppercase text-[#8f909e]">
                      Climate & Air
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      HEPA-13 Pure Air Exchange
                    </div>
                    <div className="text-[10px] text-[#8f909e] mt-1">
                      100% fresh intake every 4 minutes
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                    <div className="text-[10px] font-mono uppercase text-[#8f909e]">
                      Acoustic Isolation
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      Silent HVAC Duct Silencers
                    </div>
                    <div className="text-[10px] text-[#8f909e] mt-1">
                      Zero background air conditioning hiss
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
