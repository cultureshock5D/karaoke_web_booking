"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function TestimonialsSection() {
  return (
    <section
      id="endorsements"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Vocalist & Producer Endorsements
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Praised By <span className="text-[#ff773d]">Vocal Purists.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            From recording artists avoiding vocal fatigue to high-stakes VIP
            corporate celebrations that demand absolute acoustic isolation.
          </FluidReveal>
        </div>

        {/* 3 Testimonial Double-Bezel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <FluidReveal key={idx} delayMs={120 * (idx + 1)}>
              <DoubleBezel
                variant="default"
                size="lg"
                interactive
                glowColor={idx === 0 ? "orange" : "none"}
                className="h-full"
                innerClassName="p-6 sm:p-8 bg-[#08080c] flex flex-col justify-between h-full space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Rating & Verified Acoustic Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ff551f]">
                      {Array.from({ length: t.rating }).map((_, sIdx) => (
                        <span key={sIdx} className="text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                      ✓ Verified Guest
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#d1d2db] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-1">
                  <div className="font-heading font-bold text-sm text-white">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-[#ff773d]">{t.role}</div>
                  <div className="text-[10px] font-mono text-[#8f909e]">
                    Reserved: {t.suite}
                  </div>
                </div>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
