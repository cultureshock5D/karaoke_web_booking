'use client';

import React from 'react';
import { CustomerInfo } from '@/types';
import { User, Mail, Phone, FileText, ShieldCheck } from 'lucide-react';

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
    <div className="space-y-5">
      {/* Zero Friction Notice */}
      <div className="bg-surface border border-accent/30 rounded-[2px] p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground uppercase tracking-wider font-semibold">
            Frictionless Guest Checkout:{' '}
          </strong>
          No account registration or password required. An instant magic link will be sent via SMS and email to manage your reservation.
        </div>
      </div>

      {/* Guest Count */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-guest-count"
          className="text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] block"
        >
          Party Size (Maximum {maxCapacity} Guests)
        </label>
        <div className="flex items-center gap-3">
          <input
            id="customer-guest-count"
            type="number"
            min={1}
            max={maxCapacity}
            value={guestCount}
            onChange={(e) =>
              onGuestCountChange(
                Math.max(1, Math.min(maxCapacity, parseInt(e.target.value) || 1))
              )
            }
            className="w-24 px-3 py-2.5 rounded-[2px] border border-border bg-surface text-foreground font-heading font-bold text-center text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
          <span className="text-xs text-muted-foreground font-mono">
            people attending
          </span>
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-name"
          className="text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] block"
        >
          Full Name <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            id="customer-name"
            type="text"
            required
            placeholder="e.g. Juan dela Cruz"
            value={customer.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-[2px] border border-border bg-surface text-foreground text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-muted-foreground/50 transition-colors"
          />
        </div>
      </div>

      {/* Mobile Number */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-phone"
          className="text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] block"
        >
          Mobile Number (Philippine) <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            id="customer-phone"
            type="tel"
            required
            placeholder="0917 123 4567"
            value={customer.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-[2px] border border-border bg-surface text-foreground text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-muted-foreground/50 transition-colors font-mono"
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-mono">
          Required for SMS reservation token and PayMongo GCash/Maya checkout receipts.
        </p>
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-email"
          className="text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] block"
        >
          Email Address <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            id="customer-email"
            type="email"
            required
            placeholder="juan@gmail.com"
            value={customer.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-[2px] border border-border bg-surface text-foreground text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-muted-foreground/50 transition-colors"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1.5">
        <label
          htmlFor="customer-notes"
          className="text-[11px] font-semibold text-foreground uppercase tracking-[0.14em] block"
        >
          Special Requests / Venue Notes (Optional)
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
          <textarea
            id="customer-notes"
            rows={2}
            placeholder="e.g. Birthday party, please prepare cake table."
            value={customer.notes || ''}
            onChange={(e) => updateField('notes', e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 rounded-[2px] border border-border bg-surface text-foreground text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-muted-foreground/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
