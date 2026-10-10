"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#050507] pt-24 pb-16 sm:py-32 px-4 sm:px-6 lg:px-8 select-none">
      {/* Dynamic Background Mesh Orbs */}
      <AmbientGlow variant="hero" />

      {/* Background Atmosphere Image with OLED Vignette */}
      {/* TODO(owner): replace with photo of guests mid-song having fun */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-25 mix-blend-luminosity">
        <Image
          src="/images/hero-ktv.jpg"
          alt="ENCORE private karaoke suite in BGC"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-90 contrast-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(5,5,7,0.35) 0%, rgba(5,5,7,0.92) 75%, #050507 100%)",
          }}
        />
      </div>

      {/* Giant Faint Outline Background Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-heading font-black uppercase tracking-tighter text-white/[0.025] z-0 text-center leading-none"
        style={{
          fontSize: "clamp(100px, 24vw, 360px)",
        }}
      >
        SING
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Micro-Badge */}
        <FluidReveal delayMs={100}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Private Soundproof Rooms · Bonifacio Global City
            </LuxuryBadge>
          </div>
        </FluidReveal>

        {/* Occasion-Led Headline */}
        <FluidReveal delayMs={200}>
          <h1
            className="font-heading font-bold uppercase tracking-[-0.035em] text-white leading-[0.92] text-balance max-w-4xl"
            style={{
              fontSize: "clamp(36px, 7vw, 92px)",
            }}
          >
            Your private room in BGC.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ffffff 0%, #ff8a5c 50%, #ff551f 100%)",
              }}
            >
              Your friends. Your night.
            </span>
          </h1>
        </FluidReveal>

        {/* Subtitle with Price Anchor */}
        <FluidReveal delayMs={300}>
          <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-[#a0a1b0] leading-relaxed font-normal">
            Private rooms with quality sound, twin wireless mics, and a massive 50,000+ song catalog.
            <span className="block text-white font-medium mt-1">
              Rooms from ₱600/hr. Pay a deposit with GCash or Maya.
            </span>
          </p>
        </FluidReveal>

        {/* Primary CTA and Secondary Link */}
        <FluidReveal delayMs={400} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
              className="w-full sm:w-auto min-h-[48px] px-8 text-sm font-semibold uppercase tracking-wider shadow-[0_10px_30px_rgba(255,85,31,0.35)]"
            >
              Book a room
            </Button>
          </Link>

          <Link
            href="/#rental"
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-[#8f909e] hover:text-white transition-colors duration-300 py-2.5 px-4 rounded-full hover:bg-white/[0.04]"
          >
            Looking for mobile rental? Explore Encore to Go ↓
          </Link>
        </FluidReveal>

        {/* Reassurance Micro-Strip */}
        <FluidReveal delayMs={500} className="w-full max-w-xl mt-8 sm:mt-10">
          <DoubleBezel
            variant="glass"
            size="md"
            className="w-full"
            innerClassName="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-around gap-2.5 sm:gap-4 bg-[#08080c]/90 text-center sm:text-left"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-xs text-white font-medium">
                15-Min Instant Slot Lock
              </span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/10" />
            <div className="text-xs text-[#8f909e] font-mono">
              GCash · Maya · Cards · QRPH
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/10" />
            <div className="text-xs text-[#ff8759] font-mono font-medium">
              Fits 1 to 20 Guests
            </div>
          </DoubleBezel>
        </FluidReveal>
      </div>
    </section>
  );
}
