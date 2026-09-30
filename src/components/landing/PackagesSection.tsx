"use client";

import React from "react";
import Link from "next/link";
import { AddOn } from "@/types";
import { LUXURY_PACKAGES } from "@/lib/design/packages-data";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

interface PackagesSectionProps {
  addOns?: AddOn[];
}

export function PackagesSection({ addOns = [] }: PackagesSectionProps) {
  return (
    <section
      id="packages"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Curated Nightlife Experiences
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              VIP Packages & <span className="text-[#ff773d]">Bottle Service.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            All packages include reserved soundstage hours, dedicated table
            service, chilled welcome champagne, and signature tapas prepared to
            order.
          </FluidReveal>
        </div>

        {/* 3 Staggered Double-Bezel Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {LUXURY_PACKAGES.map((pkg, idx) => (
            <FluidReveal key={pkg.id} delayMs={150 * (idx + 1)}>
              <DoubleBezel
                variant={pkg.isPopular ? "accent" : "default"}
                size="lg"
                interactive
                glowColor={pkg.isPopular ? "orange" : "none"}
                className="h-full"
                innerClassName={`p-6 sm:p-8 flex flex-col justify-between h-full ${
                  pkg.isPopular ? "bg-[#0d0909]" : "bg-[#08080c]"
                }`}
              >
                <div className="space-y-6">
                  {/* Top Header Badge & Tagline */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                      TIER 0{idx + 1}
                    </span>
                    {pkg.badge && (
                      <span className="rounded-full bg-[#ff551f]/15 border border-[#ff551f]/40 px-3 py-1 font-mono text-[9px] font-bold text-[#ff8759] shadow-[0_0_12px_rgba(255,85,31,0.25)]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#a0a1b0] leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="border-y border-white/[0.06] py-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-3xl sm:text-4xl font-bold text-white font-tabular">
                        {pkg.pricePerSession}
                      </span>
                      <span className="font-mono text-xs text-[#8f909e]">
                        / session
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#d1d2db]">
                      <span>{pkg.duration}</span>
                      <span>·</span>
                      <span>{pkg.capacity}</span>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Included In Package:
                    </div>
                    <ul className="space-y-2 text-xs text-[#d1d2db]">
                      {pkg.inclusions.map((inc, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5">
                          <span className="text-[#ff551f] shrink-0 font-bold">✓</span>
                          <span className="leading-snug">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div className="pt-8 mt-8 border-t border-white/[0.06] space-y-3">
                  <div className="text-[10px] text-[#8f909e] text-center">
                    {pkg.recommendedFor}
                  </div>

                  <Link href="/book" className="block w-full">
                    <Button
                      variant={pkg.isPopular ? "default" : "secondary"}
                      size="default"
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
                      className="w-full font-semibold uppercase tracking-wider text-xs"
                    >
                      Book With This Package
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
