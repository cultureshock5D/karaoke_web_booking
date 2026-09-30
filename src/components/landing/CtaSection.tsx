"use client";

import React from "react";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function CtaSection() {
  return (
    <section className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-white/[0.06]">
      {/* Background Radial Amber Orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[900px] rounded-full opacity-20 blur-[150px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,85,31,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <FluidReveal delayMs={100}>
          <DoubleBezel
            variant="accent"
            size="xl"
            glowColor="orange"
            className="w-full"
            innerClassName="p-8 sm:p-14 lg:p-20 text-center flex flex-col items-center bg-gradient-to-b from-[#110d0d] via-[#090809] to-[#060608] relative overflow-hidden"
          >
            <div className="space-y-6 max-w-3xl">
              <LuxuryBadge pulse pulseColor="orange" variant="orange">
                Immediate Slot Allocation
              </LuxuryBadge>

              <h2
                className="font-heading font-bold uppercase tracking-[-0.035em] text-white leading-[0.92]"
                style={{ fontSize: "clamp(36px, 6vw, 84px)" }}
              >
                Your Private Stage Is{" "}
                <span className="text-[#ff773d]">Awaiting You.</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#a0a1b0] leading-relaxed max-w-2xl mx-auto">
                No phone calls, no waiting for confirmation, and zero
                double-bookings. Secure your studio-grade suite with a 20%
                deposit in under 90 seconds.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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
                    className="w-full sm:w-auto font-semibold uppercase tracking-wider text-xs sm:text-sm px-8 shadow-[0_0_40px_rgba(255,85,31,0.5)]"
                  >
                    Enter Live Reservation Studio
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#8f909e]">
                <span>✓ STC 65 Acoustic Envelope</span>
                <span>·</span>
                <span>✓ 15-Minute Guaranteed Slot Hold</span>
                <span>·</span>
                <span>✓ Instant QR / Apple Wallet Pass</span>
              </div>
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
