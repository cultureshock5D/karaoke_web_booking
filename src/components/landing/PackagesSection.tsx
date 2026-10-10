"use client";

import React from "react";
import Link from "next/link";
import { OCCASION_PACKAGES } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function PackagesSection() {
  return (
    <section
      id="packages"
      className="relative w-full bg-[#050507] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              All-Inclusive Occasion Packages
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Bundled rooms, <span className="text-[#ff773d]">food & drinks.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Take the hassle out of planning. Every occasion package includes 3 full hours of private singing, hot party platters, and in-room drink service.
          </FluidReveal>
        </div>

        {/* 4 Cards Grid: 3 Packages + 1 Corporate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {OCCASION_PACKAGES.map((pkg, idx) => (
            <FluidReveal key={pkg.id} delayMs={120 * (idx + 1)}>
              <DoubleBezel
                variant={pkg.isPopular ? "accent" : "default"}
                size="lg"
                interactive
                glowColor={pkg.isPopular ? "orange" : "none"}
                className="h-full"
                innerClassName={`p-6 sm:p-7 flex flex-col justify-between h-full relative ${
                  pkg.isPopular ? "bg-[#0d0909]" : "bg-[#08080c]"
                }`}
              >
                <div className="space-y-5">
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between min-h-[24px]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d] font-bold">
                      {pkg.duration}
                    </span>
                    {pkg.isPopular && (
                      <span className="rounded-full bg-[#ff551f]/20 border border-[#ff551f]/50 px-2.5 py-0.5 font-mono text-[9px] font-bold text-[#ff8759]">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Name & Target Audience */}
                  <div className="space-y-1.5">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#a0a1b0] leading-snug">
                      {pkg.targetAudience}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 pb-1 border-y border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Total Price (Room Included)
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                      {pkg.price}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      What's Included:
                    </div>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-[#d1d2db] flex items-start gap-2 leading-relaxed">
                          <span className="text-[#ff773d] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <Link href={pkg.actionHref} className="block w-full">
                    <Button
                      variant={pkg.isPopular ? "default" : "secondary"}
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
                      className="w-full text-xs font-semibold uppercase tracking-wider min-h-[40px]"
                    >
                      {pkg.actionText}
                    </Button>
                  </Link>
                </div>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
