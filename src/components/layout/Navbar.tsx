"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/design/brand";
import { Button } from "@/components/ui/button";
import { AppUser } from "@/types/auth";
import { logoutAction } from "@/app/(auth)/actions";

interface NavbarProps {
  isSlim?: boolean;
  user?: AppUser | null;
}

export function Navbar({ isSlim = false, user = null }: NavbarProps) {
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
    { label: "Rooms", href: "/#rooms", detail: "Solo to 20-Person Party Suites" },
    { label: "Packages", href: "/#packages", detail: "3-Hour Food & Drinks Bundles" },
    { label: "How It Works", href: "/#how-it-works", detail: "Pick, Pay 30%, Show Up & Sing" },
    { label: "Encore to Go", href: "/#rental", detail: "Mobile Karaoke Machine Delivery" },
    { label: "FAQ", href: "/#faq", detail: "Pricing, Groups, Deposits & Policies" },
  ];

  return (
    <>
      {/* 
        Fluid Island Navbar:
        Detached floating pill strictly adhering to high-end-visual-design Section 5.A
      */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-40 mx-auto w-[calc(100%-2rem)] max-w-6xl select-none transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Double-Bezel Outer Ring */}
        <div
          className={`rounded-full p-1 border transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-white/[0.06] border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(255,85,31,0.12)]"
              : "bg-white/[0.03] border-white/10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Inner Core Glass Pill */}
          <div className="relative flex items-center justify-between rounded-full bg-[#08080c]/90 px-3.5 sm:px-6 py-2 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {/* Wordmark */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="group flex items-center gap-2 focus-visible:outline-none"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff551f] font-mono text-[10px] font-bold text-white shadow-[0_0_12px_#ff551f] transition-transform duration-500 group-hover:scale-105">
                  E
                </span>
                <span className="font-heading text-base sm:text-xl font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#ff8759]">
                  {BRAND.name}
                </span>
              </Link>
            </div>

            {/* Slim Mode Back Button or Desktop Navigation */}
            {isSlim ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.1] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#d1d2db] transition-all duration-500 hover:bg-white/[0.08] hover:text-white"
                >
                  <span className="transition-transform duration-500 group-hover:-translate-x-1">
                    ←
                  </span>
                  <span>Exit Booking</span>
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium uppercase tracking-[0.14em] text-[#8f909e] transition-colors duration-500 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Right Side Actions: Auth State & Persistent Book Now CTA */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Auth Actions (Desktop) */}
                  <div className="hidden sm:flex items-center gap-2 text-xs">
                    {user ? (
                      <div className="flex items-center gap-2">
                        {user.role === "admin" ? (
                          <Link
                            href="/admin"
                            className="font-semibold uppercase tracking-wider text-[#ff8759] hover:text-[#ffaa80] transition-colors px-2 py-1 rounded-full bg-[#ff551f]/10 border border-[#ff551f]/20"
                          >
                            Admin
                          </Link>
                        ) : (
                          <Link
                            href="/account"
                            className="font-semibold uppercase tracking-wider text-[#d1d2db] hover:text-white transition-colors px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]"
                          >
                            My Bookings
                          </Link>
                        )}
                        <form action={logoutAction}>
                          <button
                            type="submit"
                            className="text-[#8f909e] hover:text-white uppercase tracking-wider text-[11px] font-medium transition-colors px-2 py-1"
                          >
                            Log Out
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link
                          href="/login"
                          className="text-[#8f909e] hover:text-white uppercase tracking-wider text-[11px] font-semibold transition-colors px-2.5 py-1"
                        >
                          Log in
                        </Link>
                        <Link
                          href="/register"
                          className="text-[#d1d2db] hover:text-white uppercase tracking-wider text-[11px] font-semibold transition-colors px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Persistent Book Now CTA (Desktop & Mobile) */}
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
                      className="h-9 px-3.5 sm:px-4 text-[11px] sm:text-xs font-semibold uppercase tracking-wider min-h-[36px]"
                    >
                      Book Now
                    </Button>
                  </Link>

                  {/* Fluid Hamburger Button for mobile */}
                  <button
                    type="button"
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-white transition-all duration-500 hover:bg-white/[0.1] active:scale-95 lg:hidden min-h-[36px] min-w-[36px]"
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
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 
        Full-Screen Modal Expansion:
        Heavy glass effect (backdrop-blur-3xl bg-black/95) with staggered mask reveal
      */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto backdrop-blur-3xl bg-black/95"
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.15] text-white active:scale-95"
          >
            <div className="relative h-4 w-4">
              <span className="absolute top-1.5 left-0 h-0.5 w-4 bg-white rotate-45" />
              <span className="absolute top-1.5 left-0 h-0.5 w-4 bg-white -rotate-45" />
            </div>
          </button>
        </div>

        {/* Staggered Navigation Links */}
        <div className="my-auto space-y-4 py-6 overflow-y-auto">
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
                transitionDelay: `${100 + idx * 50}ms`,
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex flex-col py-1.5"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#ff8759]">
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

          {/* Mobile Auth Links */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8f909e]">
                  <span>Signed in as <strong className="text-white">{user.name}</strong></span>
                  <span className="text-[10px] font-mono uppercase text-[#ff773d]">{user.role}</span>
                </div>
                <div className="flex gap-2">
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2 rounded-xl bg-[#ff551f]/10 border border-[#ff551f]/20 text-[#ff8759] text-xs font-semibold uppercase tracking-wider"
                    >
                      Admin Portal
                    </Link>
                  ) : (
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      My Bookings
                    </Link>
                  )}
                  <form action={logoutAction} className="flex-1">
                    <button
                      type="submit"
                      className="w-full text-center py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#8f909e] text-xs font-semibold uppercase tracking-wider"
                    >
                      Log Out
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-xs font-semibold uppercase tracking-wider min-h-[44px] flex items-center justify-center"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-[#ff551f]/10 border border-[#ff551f]/20 text-[#ff8759] text-xs font-semibold uppercase tracking-wider min-h-[44px] flex items-center justify-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div
          className={`space-y-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100 delay-500"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-3 text-xs text-[#8f909e]">
            <div className="font-semibold text-white mb-0.5">
              BGC Flagship Lounge · Open 2:00 PM – 4:00 AM PHT
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
              className="w-full text-sm font-semibold uppercase tracking-wider min-h-[44px]"
            >
              Book a Room
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
