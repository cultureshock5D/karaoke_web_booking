"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MARKETING_ROOMS, PRICING_RULES_DISPLAY } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function RoomsSection() {
  return (
    <section
      id="rooms"
      className="relative w-full bg-[#050507] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Private Room Directory
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Rooms built for <span className="text-[#ff773d]">your crew.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            From quick solo warmups to 20-person weekend takeovers. Every room includes soundproofing, twin wireless microphones, and full touchscreen songbook access.
          </FluidReveal>
        </div>

        {/* Pricing Rules Banner */}
        <FluidReveal delayMs={150}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff773d] font-bold">
                Transparent Rates
              </span>
              <p className="text-[#a0a1b0]">
                {PRICING_RULES_DISPLAY.peakPolicy} {PRICING_RULES_DISPLAY.weekdayDiscount}
              </p>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
              ✓ Only 30% deposit required online
            </div>
          </div>
        </FluidReveal>

        {/* 4 Room Cards: Smallest to Largest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {MARKETING_ROOMS.map((room, idx) => (
            <FluidReveal key={room.slug} delayMs={150 * (idx + 1)}>
              <DoubleBezel
                variant="default"
                size="xl"
                interactive
                glowColor={idx === 2 ? "orange" : "none"}
                className="h-full"
                innerClassName="bg-[#08080c] p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Photo with Guest Capacity Pill */}
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-white/[0.08]">
                    {/* TODO(owner): replace with photo of guests */}
                    <Image
                      src={room.image}
                      alt={`${room.name} private karaoke room at ENCORE BGC`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold text-white">
                        👥 Fits {room.guests} Guests
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <span className="font-heading text-2xl font-bold uppercase tracking-tight text-white drop-shadow-md">
                        {room.name}
                      </span>
                    </div>
                  </div>

                  {/* Vibe & Description */}
                  <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                    {room.vibe}
                  </p>

                  {/* Amenity Tags */}
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, aIdx) => (
                      <span
                        key={aIdx}
                        className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 font-mono text-[10px] text-[#d1d2db]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Weekday Rate
                      </div>
                      <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {room.weekdayRateFormatted}
                        <span className="text-xs font-normal text-[#8f909e]">/hr</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff773d]">
                        Fri–Sat Peak (6pm+)
                      </div>
                      <div className="font-heading text-xl sm:text-2xl font-bold text-[#ff8759] tracking-tight">
                        {room.peakRateFormatted}
                        <span className="text-xs font-normal text-[#8f909e]">/hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Button (Links to /book) */}
                <div className="pt-6">
                  <Link href="/book" className="block w-full">
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
                      className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]"
                    >
                      Book this room
                    </Button>
                  </Link>
                </div>
              </DoubleBezel>
            </FluidReveal>
          ))}
        </div>

        {/* Repeated CTA after rooms */}
        <FluidReveal delayMs={300} className="text-center pt-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <span className="text-xs sm:text-sm text-[#d1d2db]">
              Need help deciding which room fits your group?
            </span>
            <Link href="/book">
              <Button variant="secondary" size="sm" className="text-xs uppercase font-semibold">
                Explore Available Times in Booking Engine →
              </Button>
            </Link>
          </div>
        </FluidReveal>
      </div>
    </section>
  );
}
