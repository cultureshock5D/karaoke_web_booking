"use client";

import React from "react";
import { IN_EVERY_ROOM_SPECS } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function InEveryRoomStrip() {
  return (
    <section className="relative w-full bg-[#050507] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <FluidReveal delayMs={100}>
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Standard Inclusions
            </LuxuryBadge>
          </FluidReveal>
          <FluidReveal delayMs={150}>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Included in <span className="text-[#ff773d]">every private room.</span>
            </h2>
          </FluidReveal>
          <FluidReveal delayMs={200}>
            <p className="text-xs sm:text-sm text-[#8f909e]">
              No hidden upgrade fees for essentials. Every booking comes standard with full room amenities.
            </p>
          </FluidReveal>
        </div>

        <FluidReveal delayMs={250}>
          <DoubleBezel
            variant="default"
            size="lg"
            className="w-full"
            innerClassName="p-6 sm:p-10 bg-[#08080c]/90"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
              {IN_EVERY_ROOM_SPECS.map((spec, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between space-y-3 ${
                    idx > 0 ? "pt-5 sm:pt-0 sm:pl-6" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff551f]/20 font-mono text-[10px] font-bold text-[#ff8759]">
                      ✓
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                      {spec.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#a0a1b0] leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
