"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { AudioVisualizer } from "@/components/ui/AudioVisualizer";
import { FluidReveal } from "@/components/ui/FluidReveal";
import { Button } from "@/components/ui/button";

export function AsymmetricBentoSection() {
  return (
    <section
      id="amenities"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header with Eyebrow and Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="purple" variant="glass">
              Hardware Architecture & Sensory Amenities
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              Engineered For The{" "}
              <span className="text-[#ff773d]">Acoustic Purist.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Every square centimeter of Encore is decoupled, dampened, and
            calibrated to eliminate acoustic resonance. We replaced generic
            karaoke components with touring-grade gear.
          </FluidReveal>
        </div>

        {/* 
          The Asymmetrical Bento Grid (Section 3.B.1)
          col-span-8 row-span-2 next to stacked col-span-4 cards
          Aggressive mobile collapse to grid-cols-1 below md:
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Bento Item 1: Master Acoustic Soundstage (col-span-8, row-span-2) */}
          <FluidReveal
            delayMs={150}
            className="col-span-1 md:col-span-12 lg:col-span-8 lg:row-span-2"
          >
            <DoubleBezel
              variant="default"
              size="xl"
              interactive
              glowColor="orange"
              className="h-full"
              innerClassName="p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-[#0e0e14] to-[#07070a] relative overflow-hidden"
            >
              {/* Background Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#ff551f]/10 blur-[100px] pointer-events-none"
              />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff773d]">
                    Master Sound Architecture 01
                  </span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-[10px] text-emerald-400">
                    STC 65 STUDIO RATED
                  </span>
                </div>

                <div className="space-y-3 max-w-xl">
                  <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-none">
                    Martin Audio BlacklineX Coaxial Arrays
                  </h3>
                  <p className="text-sm sm:text-base text-[#a0a1b0] leading-relaxed">
                    Unlike standard party speakers that distort at high volumes,
                    our custom Martin Audio differential dispersion horns
                    deliver 128dB peak SPL with studio-grade vocal intimacy.
                    Every note is pure, clean, and physically impactful.
                  </p>
                </div>

                {/* Real-time Spectrum Visualizer */}
                <div className="pt-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8f909e] mb-2">
                    <span>Acoustic Frequency Spectrum (20Hz - 20kHz)</span>
                    <span className="text-[#ff773d]">LIVE INTERPOLATION</span>
                  </div>
                  <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4">
                    <AudioVisualizer barCount={44} height={90} colorScheme="orange" />
                  </div>
                </div>
              </div>

              {/* Hardware Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/[0.06] relative z-10">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8f909e]">
                    Vocal Feedback Suppression
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Zero-Howl DSP
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8f909e]">
                    Sub-Excursion
                  </div>
                  <div className="text-sm font-bold text-[#ff8759] mt-0.5">
                    Dual 18' Low End
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#8f909e]">
                    Acoustic Envelope
                  </div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    100% Floating Slab
                  </div>
                </div>
              </div>
            </DoubleBezel>
          </FluidReveal>

          {/* Bento Item 2: Private Sommelier & Bottle Service (col-span-4) */}
          <FluidReveal
            delayMs={250}
            className="col-span-1 md:col-span-6 lg:col-span-4"
          >
            <DoubleBezel
              variant="default"
              size="lg"
              interactive
              glowColor="purple"
              className="h-full"
              innerClassName="p-6 sm:p-8 flex flex-col justify-between bg-[#09090d] relative"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#a855f7]">
                  Cellar & Bar 02
                </span>
                <h4 className="font-heading text-2xl font-bold tracking-tight text-white leading-tight">
                  Private Sommelier & Rare Whiskies
                </h4>
                <p className="text-xs text-[#8f909e] leading-relaxed">
                  Every suite is equipped with a chilled champagne trough,
                  custom ice sphere press, and dedicated mixologist button.
                  Sip Hibiki 21, Dom Pérignon, or bespoke smoked yuzu cocktails.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[#d1d2db] font-medium">Bottle Service Menu</span>
                <span className="font-mono text-[#a855f7]">Chilled to Order ↗</span>
              </div>
            </DoubleBezel>
          </FluidReveal>

          {/* Bento Item 3: Shure Axient Digital Telemetry (col-span-4) */}
          <FluidReveal
            delayMs={350}
            className="col-span-1 md:col-span-6 lg:col-span-4"
          >
            <DoubleBezel
              variant="default"
              size="lg"
              interactive
              glowColor="orange"
              className="h-full"
              innerClassName="p-6 sm:p-8 flex flex-col justify-between bg-[#09090d] relative"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff773d]">
                  Transducers 03
                </span>
                <h4 className="font-heading text-2xl font-bold tracking-tight text-white leading-tight">
                  Shure Axient Digital Wireless Mics
                </h4>
                <p className="text-xs text-[#8f909e] leading-relaxed">
                  Fitted with KSM9 dual-diaphragm condenser capsules.
                  Quadversity RF antennas guarantee zero dropouts or static, even
                  when roaming across private rooms.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono">24-bit Lossless RF</span>
                <span className="font-mono text-[#8f909e]">&lt; 1.4ms Latency</span>
              </div>
            </DoubleBezel>
          </FluidReveal>

          {/* Bento Item 4: 4K Laser Projection & MicroLED (col-span-6) */}
          <FluidReveal
            delayMs={450}
            className="col-span-1 md:col-span-6 lg:col-span-6"
          >
            <DoubleBezel
              variant="default"
              size="lg"
              interactive
              className="h-full"
              innerClassName="p-6 sm:p-8 flex flex-col justify-between bg-[#09090d] relative"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#38bdf8]">
                  Visual Matrix 04
                </span>
                <h4 className="font-heading text-2xl font-bold tracking-tight text-white leading-tight">
                  165-inch Cinema Video Wall
                </h4>
                <p className="text-xs text-[#8f909e] leading-relaxed">
                  Ultra-low latency 120Hz 4K displays with direct Apple AirPlay
                  and HDMI lossless inputs. Lyrics render with razor-sharp
                  anti-aliased typography in five international languages.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8f909e]">
                <span>HDR10+ / Dolby Vision</span>
                <span>400,000+ Lossless Tracks</span>
              </div>
            </DoubleBezel>
          </FluidReveal>

          {/* Bento Item 5: Biometric Keyless Entry & Instant Hold (col-span-6) */}
          <FluidReveal
            delayMs={550}
            className="col-span-1 md:col-span-6 lg:col-span-6"
          >
            <DoubleBezel
              variant="accent"
              size="lg"
              interactive
              className="h-full"
              innerClassName="p-6 sm:p-8 flex flex-col justify-between bg-[#0d0909] relative"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff773d]">
                  Seamless Hospitality 05
                </span>
                <h4 className="font-heading text-2xl font-bold tracking-tight text-white leading-tight">
                  Atomic 15-Minute Slot Hold Guarantee
                </h4>
                <p className="text-xs text-[#a0a1b0] leading-relaxed">
                  Our database engine ensures that the moment you choose your room,
                  it is reserved exclusively for you. Walk in through our private
                  valet entrance with your digital Apple Wallet or QR pass.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ff551f]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-[#ff8759]">
                  Zero Reception Queue
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
                    className="h-8 px-4 text-xs font-semibold uppercase tracking-wider"
                  >
                    Lock Slot Now
                  </Button>
                </Link>
              </div>
            </DoubleBezel>
          </FluidReveal>
        </div>
      </div>
    </section>
  );
}
