"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/design/brand";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isSlim?: boolean;
}

export function Navbar({ isSlim = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Suites", href: "/#rooms", detail: "Acoustically Isolated Private Chambers" },
    { label: "Acoustics & Gear", href: "/#acoustics", detail: "Martin Audio & Shure Axient" },
    { label: "Bento Matrix", href: "/#amenities", detail: "4K Laser & Private Sommelier" },
    { label: "Sensory Atmosphere", href: "/#atmosphere", detail: "DMX Lighting & Tapas" },
    { label: "VIP Packages", href: "/#packages", detail: "Curated Nightlife Tiers" },
    { label: "Concierge FAQ", href: "/#faq", detail: "Arrival, Grace Period & Policies" },
  ];

  return (
    <>
      {/* 
        Fluid Island Navbar:
        Detached floating pill strictly adhering to high-end-visual-design Section 5.A
      */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-40 mx-auto w-[calc(100%-2rem)] max-w-5xl select-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Double-Bezel Outer Ring */}
        <div
          className={`rounded-full p-1 border transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-white/[0.06] border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(255,85,31,0.12)]"
              : "bg-white/[0.03] border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Inner Core Glass Pill */}
          <div className="relative flex items-center justify-between rounded-full bg-[#08080c]/90 px-4 sm:px-6 py-2.5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {/* Wordmark & Live Telemetry Pill */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/"
                className="group flex items-center gap-2 focus-visible:outline-none"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff551f] font-mono text-[10px] font-bold text-white shadow-[0_0_12px_#ff551f] transition-transform duration-500 group-hover:scale-105">
                  E
                </span>
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#ff8759]">
                  {BRAND.name}
                </span>
              </Link>

              <div className="hidden lg:flex items-center">
                <LuxuryBadge
                  pulse
                  pulseColor="emerald"
                  variant="default"
                  className="py-0.5 px-2.5 text-[9px] bg-white/[0.03] border-white/[0.08]"
                >
                  STC 65 · 3 SUITES ONLINE
                </LuxuryBadge>
              </div>
            </div>

            {/* Slim Mode Back Button or Desktop Navigation */}
            {isSlim ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#d1d2db] transition-all duration-500 hover:bg-white/[0.08] hover:text-white"
                >
                  <span className="transition-transform duration-500 group-hover:-translate-x-1">
                    ←
                  </span>
                  <span>Exit Booking Studio</span>
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-7">
                  {navLinks.slice(0, 4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium uppercase tracking-[0.14em] text-[#8f909e] transition-colors duration-500 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Desktop Action & Button-in-Button CTA */}
                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/book">
                    <Button
                      variant="default"
                      size="sm"
                      trailingIcon={
                        <svg
                          className="w-3.5 h-3.5"
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
                      }
                      className="h-9 px-4 text-xs font-semibold uppercase tracking-wider"
                    >
                      Reserve Suite
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {/* Fluid Hamburger Button (Morphs to perfect 'X') */}
            {!isSlim && (
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-white transition-all duration-500 hover:bg-white/[0.1] active:scale-95 md:hidden"
              >
                <div className="relative h-4 w-4">
                  {/* Top Bar */}
                  <span
                    className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      mobileMenuOpen
                        ? "top-1.5 rotate-45"
                        : "top-0.5 rotate-0"
                    }`}
                  />
                  {/* Bottom Bar */}
                  <span
                    className={`absolute left-0 h-0.5 w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      mobileMenuOpen
                        ? "top-1.5 -rotate-45"
                        : "top-3 rotate-0"
                    }`}
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 
        Full-Screen Modal Expansion (Section 5.A):
        Heavy glass effect (backdrop-blur-3xl bg-black/90) with staggered mask reveal
      */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto backdrop-blur-3xl bg-black/90"
            : "opacity-0 pointer-events-none backdrop-blur-none bg-black/0"
        }`}
      >
        {/* Modal Top Bar with Close Morph */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff551f] font-mono text-[10px] font-bold text-white shadow-[0_0_12px_#ff551f]">
              E
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-white uppercase">
              {BRAND.name}
            </span>
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.15] text-white active:scale-95"
          >
            <div className="relative h-4 w-4">
              <span className="absolute top-1.5 left-0 h-0.5 w-4 bg-white rotate-45" />
              <span className="absolute top-1.5 left-0 h-0.5 w-4 bg-white -rotate-45" />
            </div>
          </button>
        </div>

        {/* Staggered Navigation Links */}
        <div className="my-auto space-y-4 py-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff773d] mb-4">
            Navigation Index
          </div>
          {navLinks.map((link, idx) => (
            <div
              key={link.href}
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${100 + idx * 60}ms`,
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex flex-col py-2"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-heading text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#ff8759]">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-white/30 group-hover:text-white/60">
                    0{idx + 1}
                  </span>
                </div>
                <span className="text-xs text-[#8f909e] mt-0.5">
                  {link.detail}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Modal Bottom CTA */}
        <div
          className={`space-y-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100 delay-500"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 text-xs text-[#8f909e]">
            <div className="font-semibold text-white mb-1">
              Live Venue Status: Open until 04:00 PHT
            </div>
            <div>{BRAND.fullAddress}</div>
          </div>

          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full"
          >
            <Button
              variant="default"
              size="lg"
              trailingIcon={
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
              }
              className="w-full text-sm font-semibold uppercase tracking-wider"
            >
              Enter Booking Studio
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
