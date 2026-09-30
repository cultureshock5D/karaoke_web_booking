"use client";

import React from "react";
import { CustomerInfo } from "@/types";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

interface CustomerFormProps {
  customer: CustomerInfo;
  onChange: (updated: CustomerInfo) => void;
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  maxCapacity: number;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onChange,
  guestCount,
  onGuestCountChange,
  maxCapacity,
}) => {
  const updateField = (field: keyof CustomerInfo, value: string) => {
    onChange({
      ...customer,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Zero Friction Notice */}
      <DoubleBezel
        variant="glass"
        size="sm"
        className="w-full"
        innerClassName="p-4 flex items-start gap-3 bg-[#0c0a0a]"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff551f]/20 text-[#ff8759] text-xs font-bold mt-0.5">
          ✓
        </span>
        <div className="text-xs text-[#a0a1b0] leading-relaxed">
          <strong className="text-white uppercase tracking-wider font-semibold">
            Instant Guest Reservation:{" "}
          </strong>
          No account registration or password required. Your digital QR boarding
          pass and booking receipt will be delivered instantly via SMS and email.
        </div>
      </DoubleBezel>

      {/* Guest Count Stepper */}
      <div className="space-y-2">
        <label
          htmlFor="customer-guest-count"
          className="text-xs font-semibold text-white uppercase tracking-[0.16em] flex items-center justify-between"
        >
          <span>Expected Party Size</span>
          <span className="font-mono text-[#8f909e] text-[11px]">
            Suite Capacity: Max {maxCapacity} Guests
          </span>
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onGuestCountChange(Math.max(1, guestCount - 1))}
            disabled={guestCount <= 1}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] disabled:opacity-30 cursor-pointer active:scale-95 transition-all text-base font-bold"
          >
            −
          </button>

          <div className="flex-1 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center font-heading text-xl font-bold text-white font-tabular">
            {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
          </div>

          <button
            type="button"
            onClick={() =>
              onGuestCountChange(Math.min(maxCapacity, guestCount + 1))
            }
            disabled={guestCount >= maxCapacity}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff551f] text-white hover:bg-[#ff6836] disabled:opacity-30 cursor-pointer active:scale-95 transition-all text-base font-bold shadow-[0_0_12px_rgba(255,85,31,0.4)]"
          >
            +
          </button>
        </div>
      </div>

      {/* Guest Contact Details Grid */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="customer-name"
            className="text-xs font-semibold text-white uppercase tracking-[0.16em] block"
          >
            Lead Guest Full Name <span className="text-[#ff551f]">*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            required
            placeholder="e.g. Sofia Valenciano"
            value={customer.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff551f] focus:ring-2 focus:ring-[#ff551f]/20 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="customer-email"
              className="text-xs font-semibold text-white uppercase tracking-[0.16em] block"
            >
              Email Address <span className="text-[#ff551f]">*</span>
            </label>
            <input
              id="customer-email"
              type="email"
              required
              placeholder="e.g. sofia@gmail.com"
              value={customer.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff551f] focus:ring-2 focus:ring-[#ff551f]/20 transition-all duration-300"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="customer-phone"
              className="text-xs font-semibold text-white uppercase tracking-[0.16em] block"
            >
              Mobile (GCash / SMS) <span className="text-[#ff551f]">*</span>
            </label>
            <input
              id="customer-phone"
              type="tel"
              required
              placeholder="0917 123 4567"
              value={customer.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff551f] focus:ring-2 focus:ring-[#ff551f]/20 transition-all duration-300 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="customer-notes"
            className="text-xs font-semibold text-white uppercase tracking-[0.16em] flex items-center justify-between"
          >
            <span>VIP Hospitality Requests (Optional)</span>
            <span className="font-mono text-[#8f909e] text-[10px]">
              Special occasions, song preferences, dietary needs
            </span>
          </label>
          <textarea
            id="customer-notes"
            rows={3}
            placeholder="e.g., Birthday celebration — please have champagne chilled with sparklers upon arrival."
            value={customer.notes || ""}
            onChange={(e) => updateField("notes", e.target.value)}
            className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 text-sm text-white placeholder-white/20 outline-none focus:border-[#ff551f] focus:ring-2 focus:ring-[#ff551f]/20 transition-all duration-300 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
