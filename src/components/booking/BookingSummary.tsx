'use client';

import React from 'react';
import { AddOn, Room, Venue } from '@/types';
import { ShieldCheck, CreditCard, Clock, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const roomTotal = room.baseHourlyRate * durationHours;

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
  if (venue.depositType === 'percentage') {
    deposit = Math.round(grandTotal * (venue.depositValue / 100));
  } else {
    deposit = venue.depositValue;
  }
  // Minimum PayMongo deposit is ₱100
  deposit = Math.max(100, Math.min(deposit, grandTotal));
  const balanceDue = grandTotal - deposit;

  // Calculate session time window
  const startHourNum = parseInt(selectedTime.split(':')[0], 10) || 19;
  const endHourNum = (startHourNum + durationHours) % 24;
  const timeWindow = `${selectedTime} – ${String(endHourNum).padStart(2, '0')}:00 PHT`;

  // TODO: Add live hold countdown timer once the booking engine exposes heldUntil in wizard state

  return (
    <div className="bg-surface border border-border rounded-[2px] p-6 shadow-xl space-y-6">
      {/* Receipt Header */}
      <div className="border-b border-border pb-4 space-y-1">
        <span className="eyebrow text-accent block">Receipt Overview</span>
        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-foreground">
          Reservation Summary
        </h3>
        <p className="text-xs text-muted-foreground font-mono">{venue.name}</p>
      </div>

      {/* Selected Room & Schedule */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-foreground">
          <span className="text-muted-foreground uppercase tracking-wider font-mono">Room:</span>
          <span className="font-heading font-bold text-sm uppercase">{room.name}</span>
        </div>

        <div className="flex justify-between items-center text-foreground">
          <span className="text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" /> Date:
          </span>
          <span className="font-mono text-foreground font-semibold">{selectedDate}</span>
        </div>

        <div className="flex justify-between items-center text-foreground">
          <span className="text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" /> Schedule:
          </span>
          <span className="font-mono text-foreground font-semibold">{timeWindow}</span>
        </div>

        <div className="flex justify-between items-center text-foreground">
          <span className="text-muted-foreground uppercase tracking-wider font-mono">Duration:</span>
          <span className="font-mono text-foreground font-semibold">
            {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'}
          </span>
        </div>
      </div>

      {/* Itemized Line Items */}
      <div className="pt-4 border-t border-border space-y-2 text-xs">
        <div className="flex justify-between items-center text-foreground">
          <span className="text-muted-foreground">
            Room Rental ({durationHours}h × ₱{room.baseHourlyRate.toLocaleString()})
          </span>
          <span className="font-mono font-medium text-foreground font-tabular">
            ₱{roomTotal.toLocaleString()}
          </span>
        </div>

        {selectedItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-muted-foreground">
            <span>
              {item.name} <span className="text-foreground font-mono">(×{item.qty})</span>
            </span>
            <span className="font-mono font-medium text-foreground font-tabular">
              ₱{item.total.toLocaleString()}
            </span>
          </div>
        ))}

        <div className="pt-3 border-t border-border/60 flex justify-between items-center text-sm font-semibold text-foreground">
          <span className="uppercase tracking-wider font-mono text-xs">Total Bill</span>
          <span className="font-heading font-bold text-base font-tabular">
            ₱{grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Deposit Callout - Dark Editorial Box */}
      <div className="bg-[#111111] border border-accent/40 rounded-[2px] p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[11px] font-bold text-accent uppercase tracking-[0.14em]">
            Deposit Due Now
          </span>
          <span className="font-heading font-bold text-3xl text-accent font-tabular">
            ₱{deposit.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-1 border-t border-border/40 font-mono">
          <span>Balance due at venue:</span>
          <span className="font-medium text-foreground font-tabular">₱{balanceDue.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Badges (No trademarked assets) */}
      <div className="space-y-2 text-center pt-1">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">
          PayMongo Instant Checkout
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider">
          <span className="px-2 py-0.5 rounded-[2px] bg-surface-raised text-foreground border border-border">
            GCash
          </span>
          <span className="px-2 py-0.5 rounded-[2px] bg-surface-raised text-foreground border border-border">
            Maya
          </span>
          <span className="px-2 py-0.5 rounded-[2px] bg-surface-raised text-foreground border border-border">
            QR Ph
          </span>
          <span className="px-2 py-0.5 rounded-[2px] bg-surface-raised text-foreground border border-border">
            GrabPay
          </span>
          <span className="px-2 py-0.5 rounded-[2px] bg-surface-raised text-foreground border border-border">
            Card
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onProceedToPayment}
        disabled={isLoading}
        className="w-full h-14 bg-accent text-background hover:bg-accent/90 text-sm font-bold uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Locking Slot & Connecting PayMongo...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Pay ₱{deposit.toLocaleString()} Deposit</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>

      {/* 15-minute slot hold notice */}
      <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5 font-light">
        <ShieldCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
        <span>Slot is locked for 15 minutes while completing checkout.</span>
      </p>
    </div>
  );
};
