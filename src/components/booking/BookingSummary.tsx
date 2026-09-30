"use client";

import React from "react";
import { AddOn, Room, Venue } from "@/types";
import { Button } from "@/components/ui/button";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

interface BookingSummaryProps {
  venue: Venue;
  room: Room;
  selectedDate: string;
  selectedTime: string;
  durationHours: number;
  addOns: AddOn[];
  selectedAddOnQuantities: Record<string, number>;
  onProceedToPayment: () => void;
  isLoading: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  venue,
  room,
  selectedDate,
  selectedTime,
  durationHours,
  addOns,
  selectedAddOnQuantities,
  onProceedToPayment,
  isLoading,
}) => {
  // Compute pricing
  const hourlyRate = room.baseHourlyRate;
  const roomTotal = hourlyRate * durationHours;

  const selectedItems = addOns
    .filter((a) => (selectedAddOnQuantities[a.$id] || 0) > 0)
    .map((a) => {
      const qty = selectedAddOnQuantities[a.$id];
      return {
        name: a.name,
        qty,
        total: a.price * qty,
      };
    });

  const addOnsTotal = selectedItems.reduce((sum, item) => sum + item.total, 0);
  const grandTotal = roomTotal + addOnsTotal;

  let deposit = 0;
  if (venue.depositType === "percentage") {
    deposit = Math.round(grandTotal * (venue.depositValue / 100));
  } else {
    deposit = venue.depositValue;
  }
  // Minimum PayMongo deposit is ₱100
  deposit = Math.max(100, Math.min(deposit, grandTotal));
  const balanceDue = grandTotal - deposit;

  // Calculate session time window
  const startHourNum = parseInt(selectedTime.split(":")[0], 10) || 19;
  const endHourNum = (startHourNum + durationHours) % 24;
  const periodStart = startHourNum >= 12 ? "PM" : "AM";
  const displayStart = startHourNum % 12 === 0 ? 12 : startHourNum % 12;
  const periodEnd = endHourNum >= 12 ? "PM" : "AM";
  const displayEnd = endHourNum % 12 === 0 ? 12 : endHourNum % 12;

  // TODO: Live hold countdown derived from existing hold expiry data if wizard exposes it

  return (
    <DoubleBezel
      variant="default"
      size="lg"
      className="w-full sticky top-28"
      innerClassName="p-6 sm:p-7 bg-[#08080c] space-y-6"
    >
      {/* Receipt Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff773d]">
            Reservation Docket
          </div>
          <h3 className="font-heading text-xl font-bold tracking-tight text-white uppercase">
            Booking Summary
          </h3>
        </div>
        <LuxuryBadge pulse pulseColor="emerald" variant="default" className="text-[9px]">
          15-Min Hold Active
        </LuxuryBadge>
      </div>

      {/* Selected Room & Session Block */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-white uppercase">
            {room.name}
          </span>
          <span className="font-mono text-xs text-[#ff8759] font-tabular">
            ₱{hourlyRate.toLocaleString("en-PH")}/hr
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8f909e] pt-1">
          <span>Date:</span>
          <span className="text-white">{selectedDate}</span>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8f909e]">
          <span>Session Hours:</span>
          <span className="text-white">
            {displayStart}:00 {periodStart} – {displayEnd}:00 {periodEnd} ({durationHours}h)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8f909e]">
          <span>Room Subtotal:</span>
          <span className="text-white font-tabular">
            ₱{roomTotal.toLocaleString("en-PH")}
          </span>
        </div>
      </div>

      {/* Add-ons List */}
      {selectedItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
            Pre-Ordered Hospitality Items:
          </div>
          <div className="space-y-1.5 text-xs">
            {selectedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1 border-b border-white/[0.04]"
              >
                <span className="text-[#d1d2db] truncate">
                  {item.qty}x {item.name}
                </span>
                <span className="font-mono text-white font-tabular shrink-0 pl-2">
                  ₱{item.total.toLocaleString("en-PH")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Totals & Deposit Callout */}
      <div className="space-y-3 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between text-xs text-[#8f909e]">
          <span>Estimated Total Bill:</span>
          <span className="font-mono text-sm text-white font-bold font-tabular">
            ₱{grandTotal.toLocaleString("en-PH")}
          </span>
        </div>

        <div className="rounded-2xl bg-[#ff551f]/10 border border-[#ff551f]/30 p-4 space-y-1 shadow-[0_0_20px_rgba(255,85,31,0.15)]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-[#ff8759]">
              Deposit Due Today (To Lock Slot)
            </span>
            <span className="font-heading font-bold text-2xl text-white font-tabular">
              ₱{deposit.toLocaleString("en-PH")}
            </span>
          </div>
          <div className="text-[10px] text-[#a0a1b0] leading-snug">
            Minimum ₱100 PayMongo lock fee. Deducted in full from your bill.
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#8f909e] px-1">
          <span>Remaining Balance Due at Venue:</span>
          <span className="font-tabular text-[#d1d2db]">
            ₱{balanceDue.toLocaleString("en-PH")}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <Button
          variant="default"
          size="lg"
          disabled={isLoading}
          onClick={onProceedToPayment}
          trailingIcon={
            isLoading ? (
              <span className="animate-spin text-xs">⟳</span>
            ) : (
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
            )
          }
          className="w-full font-semibold uppercase tracking-wider text-xs h-13 shadow-[0_0_25px_rgba(255,85,31,0.4)]"
        >
          {isLoading ? "Locking Atomic Slot..." : "Proceed To Secure Checkout"}
        </Button>
      </div>

      {/* Payment Security Seal */}
      <div className="text-center space-y-1 text-[10px] font-mono text-[#8f909e] pt-1">
        <div className="text-white/60">
          Encrypted 256-Bit SSL via PayMongo
        </div>
        <div>GCash · Maya · GrabPay · Cards · QR Ph</div>
      </div>
    </DoubleBezel>
  );
};
