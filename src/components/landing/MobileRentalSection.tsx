"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/design/brand";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function MobileRentalSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Birthday / Private Gathering",
    location: "BGC / Metro Manila",
    guestEstimate: "10–30 Guests",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Encore! I'd like to inquire about Encore to Go mobile karaoke machine rental for my event."
  );
  const whatsappUrl = `https://wa.me/${BRAND.whatsappConcierge.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`;

  return (
    <section
      id="rental"
      className="relative w-full bg-[#050507] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="purple" variant="glass">
              Off-Site Event Rental · Metro Manila
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Encore to Go. <span className="text-[#a855f7]">Delivered to your door.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Hosting a house party, birthday, or corporate celebration? Rent our professional mobile karaoke unit with twin wireless mics, sound system, and touchscreen songbook delivered and set up anywhere in Metro Manila.
          </FluidReveal>
        </div>

        {/* 2-Column Grid: Rental Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: What's Included & WhatsApp Line */}
          <FluidReveal delayMs={150} className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] font-bold">
                Package Inclusions
              </span>
              <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                Turnkey Mobile Karaoke Setup
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                Everything you need for an unforgettable singing night at home, your office, or a rented event space:
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "Touchscreen smart karaoke terminal with 50,000+ songs (English, OPM, K-Pop, J-Pop)",
                  "2 Professional anti-feedback wireless microphones",
                  "High-clarity portable active PA speaker with deep bass",
                  "Full delivery, on-site setup, and next-day pickup across Metro Manila",
                  "HDMI connection to your existing TV or projector",
                ].map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#d1d2db] flex items-start gap-2.5">
                    <span className="text-[#a855f7] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
                  Instant WhatsApp Booking Concierge
                </div>
                <div className="font-mono text-sm text-white font-bold mt-0.5">
                  {BRAND.whatsappConcierge}
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto font-semibold uppercase tracking-wider text-xs"
                >
                  Chat On WhatsApp ↗
                </Button>
              </a>
            </div>
          </FluidReveal>

          {/* Right Column: Inquiry Form */}
          <FluidReveal delayMs={250} className="lg:col-span-6">
            <DoubleBezel
              variant="default"
              size="xl"
              className="w-full"
              innerClassName="p-6 sm:p-8 bg-[#08080c] relative"
            >
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10b981]/20 text-[#10b981] mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase">
                    Rental Inquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8f909e] max-w-sm mx-auto leading-relaxed">
                    Our team will contact you within 2 business hours with machine availability and custom delivery pricing.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a855f7]">
                      ENCORE TO GO
                    </span>
                    <h4 className="font-heading text-xl font-bold text-white uppercase">
                      Inquire for Event Delivery
                    </h4>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maria@example.ph"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Phone / Mobile
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+63 9XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Event Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Birthday / House Party"
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Makati / BGC / QC"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Event Date & Details
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Target date, hours, special requests..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 text-xs text-white placeholder-white/20 outline-none focus:border-[#a855f7] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className="w-full uppercase font-semibold tracking-wider text-xs bg-[#a855f7] hover:bg-[#9333ea] border-none text-white min-h-[42px]"
                  >
                    Submit Rental Inquiry
                  </Button>
                </form>
              )}
            </DoubleBezel>
          </FluidReveal>
        </div>
      </div>
    </section>
  );
}
