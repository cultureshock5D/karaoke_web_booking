"use client";

import React from "react";
import { STATS } from "@/lib/design/marketing";
import { CountUp } from "@/components/ui/CountUp";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function StatsStrip() {
  return (
    <section className="relative w-full bg-[#050507] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <FluidReveal delayMs={100}>
          <DoubleBezel
            variant="default"
            size="lg"
            className="w-full"
            innerClassName="p-6 sm:p-10 bg-[#08080c]/90 backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-between ${
                    idx > 0 ? "pt-5 sm:pt-0 sm:pl-6" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={1.4}
                      />
                    </span>
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#ff773d]">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-[#8f909e] leading-snug">
                      {stat.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
