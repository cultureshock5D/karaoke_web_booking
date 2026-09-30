import React from "react";
import { SAMPLE_ADDONS, SAMPLE_ROOMS, SAMPLE_VENUE } from "@/lib/mock-data";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/design/brand";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export const metadata = {
  title: "Live Booking Studio | ENCORE Soundstage & VIP Suites",
  description:
    "Real-time atomic slot reservation for private audiophile karaoke suites in Metro Manila. 15-minute guaranteed hold with GCash, Maya, and QR Ph.",
};

export default function BookPage() {
  const venue = SAMPLE_VENUE;
  const rooms = SAMPLE_ROOMS;
  const addOns = SAMPLE_ADDONS;

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#f4f4f6] relative">
      <AmbientGlow variant="subtle" />
      <Navbar isSlim={true} />

      {/* Floating Header Banner */}
      <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        <DoubleBezel
          variant="glass"
          size="md"
          className="w-full"
          innerClassName="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#08080c]/90"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <LuxuryBadge pulse pulseColor="emerald" variant="default" className="py-0.5 px-2.5 text-[9px]">
                LIVE BOOKING ENGINE ONLINE
              </LuxuryBadge>
              <span className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                {venue.name}
              </span>
            </div>
            <p className="text-xs text-[#8f909e] flex items-center gap-1.5 font-normal">
              <span>{BRAND.fullAddress}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-[#8f909e]">
            <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-white">
              ✓ 15-MIN CRYPTOGRAPHIC LOCK
            </span>
            <span className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-emerald-400">
              ✓ ZERO DOUBLE-BOOKINGS
            </span>
          </div>
        </DoubleBezel>
      </div>

      {/* Main Booking Wizard */}
      <main className="flex-1 pb-16">
        <BookingWizard venue={venue} rooms={rooms} addOns={addOns} />
      </main>

      <Footer />
    </div>
  );
}
