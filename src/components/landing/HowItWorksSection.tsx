"use client";

import React from "react";
import Link from "next/link";
import { HOW_IT_WORKS_STEPS } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function HowItWorksSection() {
  const paymentMethods = ["GCash", "Maya", "Visa & Mastercard", "GrabPay", "QRPH"];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#050507] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Fast 3-Step Booking
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              How it works. <span className="text-[#ff773d]">Zero phone calls.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Reserve your private room in under 2 minutes. When you pick a time, our system holds your slot for 15 minutes so no one else can take it while you pay.
          </FluidReveal>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <FluidReveal key={step.step} delayMs={150 * (idx + 1)}>
              <DoubleBezel
                variant="default"
                size="lg"
                interactive
                className="h-full"
                innerClassName="p-6 sm:p-8 bg-[#08080c] flex flex-col justify-between h-full relative"
              >
                <div className="space-y-6">
                  {/* Step Numeral */}
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white/20">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff773d]">
                      STEP 0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Extra Context */}
                <div className="pt-6 border-t border-white/[0.06] mt-6">
                  {idx === 0 && (
                    <span className="font-mono text-[10px] text-[#8f909e]">
                      ✓ Calendar displays live Manila (PHT) slots
                    </span>
                  )}
                  {idx === 1 && (
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#8f909e] block">
                        Accepted Payment Methods:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {paymentMethods.map((pm, pIdx) => (
                          <span
                            key={pIdx}
                            className="rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 font-mono text-[9px] text-[#d1d2db]"
                          >
                            {pm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {idx === 2 && (
                    <span className="font-mono text-[10px] text-emerald-400">
                      ✓ Instant email confirmation receipt issued
                    </span>
                  )}
                </div>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>

        {/* CTA Banner */}
        <FluidReveal delayMs={300} className="text-center pt-2">
          <Link href="/book">
            <Button
              variant="default"
              size="lg"
              trailingIcon={
                <svg
                  className="w-4 h-4"
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
              className="text-xs font-semibold uppercase tracking-wider min-h-[44px] px-8"
            >
              Book a room now
            </Button>
          </Link>
        </FluidReveal>
      </div>
    </section>
  );
}
