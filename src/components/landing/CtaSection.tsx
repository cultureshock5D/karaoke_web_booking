import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="w-full bg-[#0d0d0d] border-t-[3px] border-accent py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2
          className="font-heading font-bold uppercase text-foreground tracking-tight leading-none"
          style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
        >
          YOUR ROOM IS WAITING
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
          Pick a room, choose your hours, and lock it in with a small deposit.
        </p>

        <div className="pt-2">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold text-sm uppercase tracking-wider rounded-[2px] transition-all duration-150 hover:bg-accent/90 hover:translate-x-0.5 shadow-xl"
          >
            <span>Book a room</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-mono pt-4">
          Private Rooms · Food & Drinks · GCash · Maya · QR Ph
        </p>
      </div>
    </section>
  );
}
