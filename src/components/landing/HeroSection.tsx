"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/design/brand";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { AudioVisualizer } from "@/components/ui/AudioVisualizer";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#050507] pt-28 pb-20 sm:py-36 px-4 sm:px-6 lg:px-8 select-none">
      {/* Dynamic Background Mesh Orbs */}
      <AmbientGlow variant="hero" />

      {/* Background Architectural Atmosphere Image with Deep OLED Vignette */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-30 mix-blend-luminosity">
        <Image
          src="/images/hero-ktv.jpg"
          alt="Audiophile private karaoke suite with ambient lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-90 contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(5,5,7,0.4) 0%, rgba(5,5,7,0.95) 80%, #050507 100%)",
          }}
        />
      </div>

      {/* Giant Architectural Faint Outline Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-black uppercase tracking-tighter text-white/[0.025] z-0 text-center leading-none"
        style={{
          fontSize: "clamp(120px, 26vw, 420px)",
        }}
      >
        ACOUSTIC
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Micro-Badge */}
        <FluidReveal delayMs={100}>
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Manila’s Premier Private Soundstage
            </LuxuryBadge>
          </div>
        </FluidReveal>

        {/* Cinematic Headline */}
        <FluidReveal delayMs={200}>
          <h1
            className="font-heading font-bold uppercase tracking-[-0.035em] text-white leading-[0.92] text-balance max-w-5xl"
            style={{
              fontSize: "clamp(42px, 7.5vw, 104px)",
            }}
          >
            Studio Acoustics.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ffffff 0%, #ff8a5c 50%, #ff551f 100%)",
              }}
            >
              Private VIP Stages.
            </span>
          </h1>
        </FluidReveal>

        {/* Subtitle with High-Contrast Editorial Cadence */}
        <FluidReveal delayMs={300}>
          <p className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-[#a0a1b0] leading-relaxed font-normal">
            Decoupled STC 65 recording studio soundproofing, Shure Axient
            digital wireless telemetry, Genelec nearfield monitoring, and
            bespoke mixology. Reserve your private suite with atomic slot locking in under 90 seconds.
          </p>
        </FluidReveal>

        {/* Interactive Double-Bezel Soundwave & Live Telemetry Pill */}
        <FluidReveal delayMs={400} className="w-full max-w-xl mt-8 sm:mt-10">
          <DoubleBezel
            variant="glass"
            size="md"
            className="w-full"
            innerClassName="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 bg-[#08080c]/90"
          >
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex h-3 w-3 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" />
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#ff773d]">
                  Telemetry Frequency
                </div>
                <div className="font-mono text-xs font-semibold text-white">
                  24-BIT / 96KHZ LOSSLESS
                </div>
              </div>
            </div>

            {/* Embedded Live Audio Visualizer Canvas */}
            <div className="w-full sm:w-56 h-10">
              <AudioVisualizer barCount={28} height={40} colorScheme="orange" />
            </div>

            <div className="hidden sm:block text-right shrink-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#8f909e]">
                Acoustic Isolation
              </div>
              <div className="font-mono text-xs font-semibold text-emerald-400">
                STC 65 CERTIFIED
              </div>
            </div>
          </DoubleBezel>
        </FluidReveal>

        {/* Dual Island Button CTAs with Button-in-Button Architecture */}
        <FluidReveal delayMs={500}>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
            <Link href="/book" className="w-full sm:w-auto">
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
                className="w-full sm:w-auto font-semibold uppercase tracking-wider text-xs sm:text-sm h-13 px-8 shadow-[0_0_35px_rgba(255,85,31,0.45)]"
              >
                Reserve Private Suite
              </Button>
            </Link>

            <Link href="/#acoustics" className="w-full sm:w-auto">
              <Button
                variant="glass"
                size="lg"
                trailingIcon={
                  <svg
                    className="w-4 h-4 text-[#d1d2db]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                }
                className="w-full sm:w-auto font-semibold uppercase tracking-wider text-xs sm:text-sm h-13 px-7"
              >
                Inspect Audio Rig
              </Button>
            </Link>
          </div>
        </FluidReveal>

        {/* Micro-Features Strip */}
        <FluidReveal delayMs={600} className="mt-14 sm:mt-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.06] text-left">
            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span className="text-[#ff551f]">✓</span> 0 Double-Bookings
              </div>
              <p className="text-[11px] text-[#8f909e] leading-snug">
                Atomic DB composite lock
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span className="text-[#ff551f]">✓</span> 15-Min Slot Lock
              </div>
              <p className="text-[11px] text-[#8f909e] leading-snug">
                Guaranteed checkout hold
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span className="text-[#ff551f]">✓</span> Martin Audio Coaxial
              </div>
              <p className="text-[11px] text-[#8f909e] leading-snug">
                Concert vocal clarity
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span className="text-[#ff551f]">✓</span> Instant E-Wallets
              </div>
              <p className="text-[11px] text-[#8f909e] leading-snug">
                GCash, Maya, QR Ph, Card
              </p>
            </div>
          </div>
        </FluidReveal>
      </div>
    </section>
  );
}
