import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { BRAND } from '@/lib/design/brand';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#111111] border-b border-border">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ktv.jpg"
          alt="Neon-lit private karaoke room with friends singing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.78) 52%, rgba(17,17,17,0.30) 100%)',
          }}
        />
      </div>

      {/* Giant Faint Background Word "SING" */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-heading font-bold text-accent uppercase leading-none z-[1]"
        style={{
          fontSize: 'clamp(200px, 28vw, 420px)',
          opacity: 0.04,
        }}
      >
        SING
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col justify-center">
        <div className="max-w-3xl space-y-7 pl-0 lg:pl-[4vw]">
          {/* Eyebrow */}
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 text-accent text-[11px] font-bold uppercase tracking-[0.14em]">
              <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block" />
              <span>{BRAND.tagline}</span>
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold uppercase text-foreground tracking-tight leading-[0.9] text-balance"
              style={{
                fontSize: 'clamp(46px, 7vw, 100px)',
              }}
            >
              BOOK THE ROOM.
              <br />
              <span className="text-accent">OWN THE NIGHT.</span>
            </h1>
          </FadeUp>

          {/* Subtitle */}
          <FadeUp delay={0.25}>
            <p className="text-base sm:text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
              Reserve a private karaoke room in under two minutes. No account needed.
              Pay a deposit via GCash, Maya, GrabPay, card, or QR Ph and your slot is locked.
            </p>
          </FadeUp>

          {/* Call to Actions */}
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-background font-bold text-sm uppercase tracking-wider rounded-[2px] transition-all duration-150 hover:bg-accent/90 hover:translate-x-0.5 shadow-lg"
              >
                <span>Book a room</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#rooms"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-border text-foreground font-medium text-sm uppercase tracking-wider rounded-[2px] transition-colors duration-150 hover:bg-surface-raised hover:border-foreground/40"
              >
                View rooms
              </a>
            </div>
          </FadeUp>

          {/* Floating Stat Chips */}
          <FadeUp delay={0.55}>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111]/80 backdrop-blur-md border border-border text-xs text-foreground/90 rounded-[2px]">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>No double-bookings</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111]/80 backdrop-blur-md border border-border text-xs text-foreground/90 rounded-[2px]">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>15-min slot hold</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111]/80 backdrop-blur-md border border-border text-xs text-foreground/90 rounded-[2px]">
                <CreditCard className="w-3.5 h-3.5 text-accent" />
                <span>GCash / Maya / QR Ph</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
