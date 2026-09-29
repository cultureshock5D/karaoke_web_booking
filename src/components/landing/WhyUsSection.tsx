import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

const CHECKPOINTS = [
  "Atomic slot locking",
  "15-minute payment hold",
  "Guest checkout",
  "Local payment channels",
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="eyebrow text-accent block">Engine Reliability</span>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-foreground leading-[0.95]">
                No Double-Bookings.
                <br />
                <span className="text-accent">No Drama.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              <p>
                Traditional karaoke bookings rely on phone calls, notebook reservations, and manual confirmation chats that inevitably result in overlaps. Our platform uses composite database-level indexing to lock slots atomically at the millisecond of selection.
              </p>
              <p>
                Unpaid slot holds automatically release after exactly 15 minutes, ensuring real inventory is always available. You reserve your room as a guest without creating an account, and pay instantly through GCash, Maya, QR Ph, or card.
              </p>
            </div>

            {/* Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CHECKPOINTS.map((checkpoint, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[2px] bg-accent/10 border border-accent flex items-center justify-center flex-shrink-0 text-accent">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-medium text-foreground">
                    {checkpoint}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border rounded-[2px]">
              <Image
                src="/images/why-us-ktv.jpg"
                alt="Friends laughing around a private KTV table with microphones and drinks"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#111111]/90 backdrop-blur-md border border-border text-[11px] uppercase tracking-wider text-muted-foreground flex justify-between items-center font-mono">
                <span>Encore Lounge · Private Suite</span>
                <span className="text-accent">Guaranteed Reservation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
