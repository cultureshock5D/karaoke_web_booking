"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

const GUARANTEES = [
  {
    title: "Atomic Cryptographic Lock",
    desc: "Composite database constraint prevents overlapping bookings at the database kernel level.",
  },
  {
    title: "15-Minute Guaranteed Hold",
    desc: "Your room cannot be poached by walk-ins or other browsers while you complete checkout.",
  },
  {
    title: "Zero Forced Account Creation",
    desc: "Fast guest reservation. Receive your confirmation and digital pass directly to your phone.",
  },
  {
    title: "Instant Philippine Gateways",
    desc: "Direct integration with PayMongo for GCash, Maya, GrabPay, Visa/Mastercard, and QR Ph.",
  },
];

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* 
          The Editorial Split Layout (Section 3.B.3):
          Massive typography block on the left, interactive cards & imagery on the right
          Graceful mobile collapse to w-full stack
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Massive Editorial Typography & Narrative (col-span-6) */}
          <FluidReveal delayMs={100} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <LuxuryBadge pulse pulseColor="emerald" variant="glass">
                Architectural Integrity
              </LuxuryBadge>
              <h2
                className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.92]"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                No Double-Bookings.{" "}
                <span className="text-[#ff773d]">Ever.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#a0a1b0] leading-relaxed">
              <p>
                Legacy karaoke venues still rely on messy paper logs, WhatsApp
                groups, and verbal promises that inevitably lead to awkward
                conflicts at the door.
              </p>
              <p>
                At Encore, every room availability query runs against an ACID-compliant
                composite unique index. When you select a slot, it is locked
                instantly for 15 minutes while your payment settles.
              </p>
            </div>

            {/* Checklist Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {GUARANTEES.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#10b981] font-bold text-xs">✓</span>
                    <span className="text-xs font-semibold text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8f909e] leading-snug pl-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/book">
                <Button
                  variant="default"
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
                  className="font-semibold uppercase tracking-wider text-xs"
                >
                  Experience Flawless Booking
                </Button>
              </Link>
            </div>
          </FluidReveal>

          {/* Right Column: Double-Bezel Architectural Visual (col-span-6) */}
          <FluidReveal delayMs={250} className="lg:col-span-6">
            <DoubleBezel
              variant="default"
              size="xl"
              interactive
              glowColor="orange"
              innerClassName="p-3 bg-[#08080c] relative"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(2rem-0.75rem)]">
                <Image
                  src="/images/why-us-ktv.jpg"
                  alt="Encore VIP suite guests enjoying high-fidelity sound"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.2) 50%, transparent 100%)",
                  }}
                />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[#ff773d]">
                      Database Isolation Protocol
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      Cryptographic Slot Lock Active
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">
                    100% Guaranteed
                  </span>
                </div>
              </div>
            </DoubleBezel>
          </FluidReveal>
        </div>
      </div>
    </section>
  );
}
