"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Room } from "@/types";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";
import { SUITE_DETAILS } from "@/lib/design/suites";
import { LIGHTING_PRESETS, LightingPreset } from "@/components/ui/InteractiveLightingSelector";

interface RoomsSectionProps {
  rooms: Room[];
}

export function RoomsSection({ rooms }: RoomsSectionProps) {
  const [selectedLighting, setSelectedLighting] = useState<
    Record<string, LightingPreset>
  >({});

  const handlePresetChange = (roomId: string, preset: LightingPreset) => {
    setSelectedLighting((prev) => ({ ...prev, [roomId]: preset }));
  };

  return (
    <section
      id="rooms"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Private Soundstage Directory
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Curated Private <span className="text-[#ff773d]">Acoustic Chambers.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            From intimate mastering-grade duo suites to 30-person private concert
            halls with dedicated cocktail bars and front-of-house sound
            engineers.
          </FluidReveal>
        </div>

        {/* Room Suites Stacked as Luxury Double-Bezel Showcases */}
        <div className="space-y-12 sm:space-y-16">
          {rooms.map((room, idx) => {
            const suiteMeta = SUITE_DETAILS[room.$id] || {
              codename: `SOUNDSTAGE 0${idx + 1}`,
              tagline: "Private Acoustic Suite",
              squareMeters: 30,
              acousticIsolation: "STC 65 Studio Sealed",
              soundSystem: "Martin Audio Coaxial Soundstage",
              microphones: "Shure Axient Digital Transmitters",
              visualSystem: "4K HDR Cinema Display",
              signatureAmenity: "Dedicated sommelier service & craft bar",
              image: "/images/hero-ktv.jpg",
            };

            const currentLighting =
              selectedLighting[room.$id] || LIGHTING_PRESETS[idx % LIGHTING_PRESETS.length];

            return (
              <FluidReveal key={room.$id} delayMs={150 * (idx + 1)}>
                <DoubleBezel
                  variant="default"
                  size="xl"
                  interactive
                  glowColor={idx === 1 ? "purple" : "orange"}
                  className="w-full"
                  innerClassName="bg-[#08080c] p-6 sm:p-10 lg:p-12 relative overflow-hidden"
                >
                  {/* Dynamic Atmospheric Wash from selected lighting preset */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
                    style={{ backgroundColor: currentLighting.colors[0] }}
                  />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Col: High-Res Suite Image & Lighting Controller (col-span-5) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]">
                        <Image
                          src={room.photos?.[0] || suiteMeta.image}
                          alt={room.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(8,8,12,0.9) 0%, transparent 60%)",
                          }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 font-mono text-[10px] text-white">
                            {suiteMeta.codename}
                          </span>
                        </div>

                        {/* Bottom Tagline on Image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <span className="font-mono text-[11px] text-emerald-400">
                            ✓ {suiteMeta.acousticIsolation}
                          </span>
                          <span className="font-mono text-xs font-bold text-white">
                            {suiteMeta.squareMeters} m²
                          </span>
                        </div>
                      </div>

                      {/* Lighting Preset Micro-Bar */}
                      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 flex items-center justify-between">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                          Mood Lighting:
                        </div>
                        <div className="flex items-center gap-1.5">
                          {LIGHTING_PRESETS.slice(0, 4).map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => handlePresetChange(room.$id, preset)}
                              title={preset.name}
                              className={`h-4 w-4 rounded-full border transition-all ${
                                currentLighting.id === preset.id
                                  ? "scale-125 border-white ring-2 ring-white/20"
                                  : "border-black/50 opacity-60 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: preset.colors[0] }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Col: Acoustic Details, Rates, and Reservation Trigger (col-span-7) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff773d]">
                            SUITE 0{room.sortOrder}
                          </span>
                          <span className="text-white/20">·</span>
                          <span className="font-mono text-xs text-[#8f909e]">
                            {room.capacityMin}–{room.capacityMax} Guests (Max{" "}
                            {room.capacityMax})
                          </span>
                        </div>

                        <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                          {room.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed pt-1">
                          {room.description}
                        </p>
                      </div>

                      {/* Audio & Hardware Spec Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                            Sound Stage Reinforcement
                          </div>
                          <div className="font-semibold text-white mt-0.5">
                            {suiteMeta.soundSystem}
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                            Microphone Telemetry
                          </div>
                          <div className="font-semibold text-white mt-0.5">
                            {suiteMeta.microphones}
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                            Display & Projection
                          </div>
                          <div className="font-semibold text-white mt-0.5">
                            {suiteMeta.visualSystem}
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                            Hospitality Pairing
                          </div>
                          <div className="font-semibold text-[#ff8759] mt-0.5">
                            {suiteMeta.signatureAmenity}
                          </div>
                        </div>
                      </div>

                      {/* Inclusions Chips */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {room.features.map((feature, fIdx) => (
                          <span
                            key={fIdx}
                            className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-[11px] font-mono text-[#d1d2db]"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price & Action Button Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
                            Standard Session Rate
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-heading text-2xl sm:text-3xl font-bold text-white font-tabular">
                              ₱{room.baseHourlyRate.toLocaleString("en-PH")}
                            </span>
                            <span className="font-mono text-xs text-[#8f909e]">
                              / hour
                            </span>
                          </div>
                        </div>

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
                            className="w-full sm:w-auto font-semibold uppercase tracking-wider text-xs sm:text-sm h-12 px-6"
                          >
                            Select & Lock Slot
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </DoubleBezel>
              </FluidReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
