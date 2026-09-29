import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/design/brand';

export function Footer() {
  return (
    <footer id="contact" className="w-full border-t border-border bg-[#0d0d0d] text-foreground py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Wordmark & Tagline */}
        <div className="space-y-2">
          <Link
            href="/"
            className="font-heading font-bold text-2xl tracking-tight text-accent uppercase"
          >
            {BRAND.name}
          </Link>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            {BRAND.tagline}. High-fidelity acoustics, private VIP lounges, and zero-friction guest reservations.
          </p>
        </div>

        {/* Center: Social Placeholders */}
        <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Facebook
          </a>
          <span className="text-border">·</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <span className="text-border">·</span>
          <a
            href="mailto:bookings@encorektv.ph"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-[11px] text-muted-foreground/80 font-mono tracking-wider">
          © 2026 {BRAND.name} · Private KTV · {BRAND.city}
        </div>
      </div>
    </footer>
  );
}
