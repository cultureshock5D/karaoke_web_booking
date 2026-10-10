"use client";

import React from "react";
import Link from "next/link";
import { TRUST_LINES } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function CtaSection() {
  return (
    <section className="relative w-full bg-[#050507] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-white/[0.06]">
      {/* Background Radial Amber Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full opacity-20 blur-[150px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,85,31,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <FluidReveal delayMs={100}>
          <DoubleBezel
            variant="accent"
            size="xl"
            glowColor="orange"
            className="w-full"
            innerClassName="p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center bg-gradient-to-b from-[#110d0d] via-[#090809] to-[#060608] relative overflow-hidden"
          >
            <div className="space-y-6 max-w-2xl">
              <LuxuryBadge pulse pulseColor="orange" variant="orange">
                Instant Room Reservation
              </LuxuryBadge>

              <h2
                className="font-heading font-bold uppercase tracking-[-0.035em] text-white leading-[0.92]"
                style={{ fontSize: "clamp(32px, 5.5vw, 76px)" }}
              >
                Ready for your <span className="text-[#ff773d]">night out?</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#a0a1b0] leading-relaxed max-w-xl mx-auto">
                Pick your room, choose your time, and lock your slot in under 2 minutes. No phone calls required.
              </p>

              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <Link href="/book" className="w-full sm:w-auto">
                  <Button
                    variant="default"
                    size="xl"
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
                    className="w-full sm:w-auto px-8 min-h-[48px] text-sm font-semibold uppercase tracking-wider shadow-[0_10px_30px_rgba(255,85,31,0.35)]"
                  >
                    Book a room
                  </Button>
                </Link>

                <p className="text-xs text-[#8f909e] font-mono mt-2">
                  🔒 {TRUST_LINES.holdGuarantee}
                </p>
              </div>
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
