'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/design/brand';
import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  isSlim?: boolean;
}

export function Navbar({ isSlim = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#111111]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-heading font-bold text-2xl tracking-tight text-accent uppercase transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            {BRAND.name}
          </Link>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80 border-l border-border pl-4">
            {BRAND.tagline}
          </span>
        </div>

        {/* Slim Mode (for /book routes) */}
        {isSlim ? (
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border/80 hover:border-border rounded-[2px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/#rooms"
                className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Rooms
              </Link>
              <Link
                href="/#how-it-works"
                className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#why-us"
                className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Why Us
              </Link>
              <Link
                href="/#packages"
                className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Packages
              </Link>
              <Link
                href="/#contact"
                className="text-xs uppercase tracking-[0.14em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all hover:bg-accent/90 hover:translate-x-0.5"
              >
                <span>Book a room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-background font-bold text-xs uppercase tracking-wider rounded-[2px]"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground border border-border rounded-[2px] hover:bg-surface-raised transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Slide-down Panel */}
      {!isSlim && mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-[#111111] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
            >
              Rooms
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
            >
              How It Works
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
            >
              Why Us
            </Link>
            <Link
              href="/#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
            >
              Packages
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-background font-bold text-xs uppercase tracking-widest rounded-[2px]"
              >
                <span>Book a room</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
