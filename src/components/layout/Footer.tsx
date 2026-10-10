"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/design/brand";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

export function Footer() {
  const [manilaTime, setManilaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setManilaTime(`${formatted} PHT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative w-full border-t border-white/[0.08] bg-[#050507] pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full opacity-15 blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,85,31,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Top Tier: Venue Info, Contact, and Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: Brand & Nightlife Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff551f] font-mono text-xs font-bold text-white shadow-[0_0_12px_#ff551f]">
                E
              </span>
              <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">
                {BRAND.name}
              </span>
            </div>
            <p className="text-xs text-[#8f909e] leading-relaxed max-w-sm">
              Private soundproof karaoke rooms in Bonifacio Global City. Built for friend groups, birthdays, and effortless nights out.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <LuxuryBadge pulse pulseColor="emerald" variant="default" className="text-[9px]">
                {manilaTime || "14:00 - 04:00 PHT"}
              </LuxuryBadge>
            </div>
          </div>

          {/* Col 2: Location & Valet */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff773d]">
              Location & Valet
            </div>
            <div className="text-xs text-[#d1d2db] leading-relaxed">
              {BRAND.fullAddress}
            </div>
            <div className="font-mono text-[11px] text-[#8f909e]">
              Coordinates: {BRAND.coordinates}
            </div>
            <div className="text-xs text-[#10b981] pt-1">
              ✓ {BRAND.valetService}
            </div>
          </div>

          {/* Col 3: Direct Contact Channels */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff773d]">
              Reservations & Concierge
            </div>
            <div className="space-y-1 text-xs">
              <div className="text-[#8f909e]">Phone:</div>
              <a
                href={`tel:${BRAND.vipConciergePhone}`}
                className="font-mono text-white hover:text-[#ff8759] transition-colors block"
              >
                {BRAND.vipConciergePhone}
              </a>
            </div>
            <div className="space-y-1 text-xs">
              <div className="text-[#8f909e]">WhatsApp Concierge:</div>
              <a
                href={`https://wa.me/${BRAND.whatsappConcierge.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-white hover:text-[#ff8759] transition-colors block"
              >
                {BRAND.whatsappConcierge}
              </a>
            </div>
            <div className="text-[11px] text-[#8f909e] pt-1">
              Dress Code: {BRAND.dressCode}
            </div>
          </div>

          {/* Col 4: Operating Hours & Booking Reassurance */}
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff773d]">
              Hours & Booking
            </div>
            <div className="space-y-2 text-xs text-[#d1d2db]">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                <span>Operating Hours</span>
                <span className="font-mono text-[11px] text-white">2:00 PM – 4:00 AM</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                <span>Slot Protection</span>
                <span className="font-mono text-[11px] text-emerald-400">15-Min Hold</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                <span>Online Deposit</span>
                <span className="font-mono text-[11px] text-white">30% via GCash/Maya</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Room Rates</span>
                <span className="font-mono text-[11px] text-[#ff8759]">From ₱600/hr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier: Floating Navigation Strip */}
        <DoubleBezel
          variant="glass"
          size="md"
          className="w-full"
          innerClassName="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono uppercase tracking-wider text-[#8f909e]">
            <Link href="/#rooms" className="hover:text-white transition-colors">
              Rooms
            </Link>
            <span>·</span>
            <Link href="/#packages" className="hover:text-white transition-colors">
              Packages
            </Link>
            <span>·</span>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <span>·</span>
            <Link href="/#rental" className="hover:text-white transition-colors">
              Encore to Go
            </Link>
            <span>·</span>
            <Link href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span>·</span>
            <Link href="/book" className="text-[#ff8759] hover:text-[#ff773d] transition-colors font-semibold">
              Book a Room ↗
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#d1d2db] transition-all duration-500 hover:bg-white/[0.1] hover:text-white cursor-pointer active:scale-95"
          >
            <span>Back to Top</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-500 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </DoubleBezel>

        {/* Bottom Tier: Gateways & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06] text-[11px] text-[#8f909e]">
          <div className="flex items-center gap-3">
            <span className="font-mono uppercase tracking-wider text-[#5f606e]">
              Accepted Payment Gateways:
            </span>
            <span className="font-mono text-white/60">GCash · Maya · Cards · GrabPay · QRPH</span>
          </div>

          <div className="font-mono tracking-wider">
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
