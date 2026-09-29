import React from 'react';
import { SAMPLE_ADDONS, SAMPLE_ROOMS, SAMPLE_VENUE } from '@/lib/mock-data';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Book a Private Room | ENCORE KTV Lounge',
  description: 'Reserve your private karaoke room in seconds. Live slot availability, instant deposit.',
};

export default function BookPage() {
  const venue = SAMPLE_VENUE;
  const rooms = SAMPLE_ROOMS;
  const addOns = SAMPLE_ADDONS;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Slim Navbar for checkout flow */}
      <Navbar isSlim={true} />

      {/* Venue Header Strip */}
      <div className="border-b border-border bg-[#0d0d0d] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
              <h1 className="font-heading font-bold text-lg sm:text-xl uppercase tracking-tight text-foreground">
                {venue.name}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light">
              <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>{venue.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.14em] font-mono text-muted-foreground bg-surface border border-border px-2.5 py-1 rounded-[2px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Atomic 15-Min Slot Protection</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Booking Wizard */}
      <main className="flex-1">
        <BookingWizard venue={venue} rooms={rooms} addOns={addOns} />
      </main>

      <Footer />
    </div>
  );
}
