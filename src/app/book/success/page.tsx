"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/design/brand";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { Button } from "@/components/ui/button";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "KTV-7A9-B21";
  const statusParam = searchParams.get("status") || "confirmed";

  const isConfirmed = statusParam === "confirmed";
  const isPending = statusParam === "pending";
  const isFailed =
    statusParam === "failed" ||
    statusParam === "cancelled" ||
    statusParam === "expired";

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#f4f4f6] relative select-none">
      <AmbientGlow variant="hero" />
      <Navbar isSlim={true} />

      <main className="flex-1 flex items-center justify-center p-4 py-24 sm:py-32 relative z-10">
        <div className="max-w-2xl w-full space-y-6">
          <DoubleBezel
            variant={isConfirmed ? "accent" : isPending ? "default" : "subtle"}
            size="xl"
            glowColor={isConfirmed ? "orange" : "none"}
            className="w-full"
            innerClassName="p-6 sm:p-10 bg-[#08080c] space-y-8"
          >
            {/* Status Header */}
            <div className="text-center space-y-3">
              {isConfirmed && (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <LuxuryBadge pulse pulseColor="emerald" variant="default" className="text-[10px]">
                    Deposit Verified & Slot Locked
                  </LuxuryBadge>
                  <h1 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    Your Stage Is Guaranteed
                  </h1>
                  <p className="text-xs sm:text-sm text-[#a0a1b0] max-w-md mx-auto leading-relaxed">
                    Your cryptographic slot hold has converted to a confirmed
                    private reservation. An instant digital entry voucher was
                    dispatched to your contact details.
                  </p>
                </>
              )}

              {isPending && (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] mx-auto shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                    <span className="text-2xl font-bold">⏳</span>
                  </div>
                  <LuxuryBadge pulse pulseColor="orange" variant="default" className="text-[10px]">
                    Payment Authorization Pending
                  </LuxuryBadge>
                  <h1 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    Verifying Payment Channel
                  </h1>
                  <p className="text-xs sm:text-sm text-[#a0a1b0] max-w-md mx-auto leading-relaxed">
                    We are waiting for your bank or e-wallet to return the
                    settlement webhook. Your room remains locked.
                  </p>
                </>
              )}

              {isFailed && (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 border border-red-500/30 text-red-400 mx-auto">
                    <span className="text-2xl font-bold">✕</span>
                  </div>
                  <LuxuryBadge variant="outline" className="text-[10px] text-red-400 border-red-500/30">
                    Slot Hold Expired or Cancelled
                  </LuxuryBadge>
                  <h1 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white">
                    Reservation Released
                  </h1>
                  <p className="text-xs sm:text-sm text-[#a0a1b0] max-w-md mx-auto leading-relaxed">
                    The 15-minute slot lock window has expired. You may select
                    another date or suite anytime.
                  </p>
                </>
              )}
            </div>

            {/* Boarding Pass Reference Card */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
                  Official Booking Reference
                </span>
                <span className="font-mono text-xs text-emerald-400">
                  CONFIRMED
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="font-mono text-3xl sm:text-4xl font-black text-white tracking-widest">
                  {ref}
                </div>
                <span className="text-[10px] font-mono text-[#8f909e] uppercase">
                  Present at 5th Ave Reception
                </span>
              </div>

              <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-[#8f909e] uppercase">
                    Venue Location
                  </div>
                  <div className="text-white mt-0.5">{BRAND.suburb}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#8f909e] uppercase">
                    Acoustic Envelope
                  </div>
                  <div className="text-[#ff8759] mt-0.5">STC 65 Isolated</div>
                </div>
              </div>
            </div>

            {/* Arrival Protocol Checklist */}
            <div className="space-y-3 text-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                VIP Arrival Briefing:
              </div>
              <ul className="space-y-2 text-[#d1d2db]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>
                    <strong>Valet Parking:</strong> Complimentary subterranean
                    valet is waiting at our 5th Avenue private portal.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>
                    <strong>15-Minute Grace Period:</strong> Your suite will be
                    held for 15 minutes past start time before audio tuning.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>
                    <strong>Dress Code:</strong> Smart casual nightlife attire.
                    Strictly 18+ after 21:00 PHT.
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="default"
                  className="w-full font-semibold uppercase tracking-wider text-xs"
                >
                  Return to Home
                </Button>
              </Link>

              <Link href="/book" className="w-full sm:w-auto">
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
                  className="w-full font-semibold uppercase tracking-wider text-xs"
                >
                  Book Another Suite
                </Button>
              </Link>
            </div>
          </DoubleBezel>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050507] flex items-center justify-center text-xs font-mono text-white/50">
          Loading Booking Confirmation...
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
