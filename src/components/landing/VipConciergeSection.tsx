"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/design/brand";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function VipConciergeSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Corporate Soundstage Buyout",
    guestEstimate: "20-40 Guests",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="concierge"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.06] pb-8">
          <FluidReveal delayMs={100} className="max-w-2xl space-y-4">
            <LuxuryBadge pulse pulseColor="purple" variant="glass">
              Bespoke Private Events & Venue Buyouts
            </LuxuryBadge>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
            >
              Exclusive Buyouts & <span className="text-[#a855f7]">Celebrity Riders.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={200} className="max-w-md text-xs sm:text-sm text-[#8f909e] leading-relaxed">
            Planning a private album listening gala, high-profile corporate
            celebration, or full soundstage buyout? Our Senior Hospitality
            Director curates bespoke audio, dining, and security riders.
          </FluidReveal>
        </div>

        {/* 2-Column Split: Concierge Specs & Direct Inquiry Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hospitality Perks & Direct VIP Line (col-span-6) */}
          <FluidReveal delayMs={150} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Turnkey Private Entertainment
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                When you buyout Encore or reserve our grand soundstage, our entire
                venue operates as your private sanctuary. Dedicated subterranean
                valet portals, biometric discreet entry, private culinary team,
                and dedicated front-of-house sound engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#a855f7]">
                  Private Access
                </div>
                <div className="text-sm font-semibold text-white">
                  Subterranean Valet Portal
                </div>
                <p className="text-[11px] text-[#8f909e]">
                  Discreet arrival bypassing public areas
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff773d]">
                  Live Sound Crew
                </div>
                <div className="text-sm font-semibold text-white">
                  Dedicated Audio Engineer
                </div>
                <p className="text-[11px] text-[#8f909e]">
                  Live vocal mixing & monitor balancing
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#10b981]">
                  Culinary Chef
                </div>
                <div className="text-sm font-semibold text-white">
                  Custom Tapas & Raw Bar
                </div>
                <p className="text-[11px] text-[#8f909e]">
                  Bespoke omakase & wagyu dining courses
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8]">
                  Beverage Director
                </div>
                <div className="text-sm font-semibold text-white">
                  Private Sommelier & Bar
                </div>
                <p className="text-[11px] text-[#8f909e]">
                  Rare Japanese whisky & champagne pairings
                </p>
              </div>
            </div>

            {/* Direct Instant Channels */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
                  Immediate Concierge Assistance
                </div>
                <div className="font-mono text-sm text-white font-bold mt-0.5">
                  {BRAND.whatsappConcierge}
                </div>
              </div>

              <a
                href={`https://wa.me/${BRAND.whatsappConcierge.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-semibold uppercase tracking-wider text-xs"
                >
                  Chat On WhatsApp ↗
                </Button>
              </a>
            </div>
          </FluidReveal>

          {/* Right Column: Double-Bezel VIP Inquiry Form (col-span-6) */}
          <FluidReveal delayMs={300} className="lg:col-span-6">
            <DoubleBezel
              variant="default"
              size="xl"
              className="w-full"
              innerClassName="p-6 sm:p-10 bg-[#08080c] relative"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/20 text-[#10b981] mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white uppercase">
                    Inquiry Transmitted
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8f909e] max-w-sm mx-auto leading-relaxed">
                    Our Senior Hospitality Director will contact you within 2 hours
                    to discuss room configurations, rider requests, and custom
                    tasting menus.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff773d]">
                      VIP DOSSIER
                    </span>
                    <h4 className="font-heading text-xl font-bold text-white uppercase">
                      Request Bespoke Proposal
                    </h4>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atty. Christian Santos"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="christian@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0917 888 0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
                        className="w-full h-11 rounded-xl bg-[#09090d] border border-white/[0.08] px-3 text-xs text-white outline-none focus:border-[#ff551f]"
                      >
                        <option>Full Venue Buyout</option>
                        <option>Mega Starlight Ball Gala</option>
                        <option>Album Listening Party</option>
                        <option>Executive Milestone Dinner</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                        Estimated Guest Count
                      </label>
                      <select
                        value={formData.guestEstimate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guestEstimate: e.target.value,
                          })
                        }
                        className="w-full h-11 rounded-xl bg-[#09090d] border border-white/[0.08] px-3 text-xs text-white outline-none focus:border-[#ff551f]"
                      >
                        <option>10–20 Guests</option>
                        <option>20–40 Guests</option>
                        <option>40–80 Guests (Full Buyout)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                      Bespoke Rider Requests / Culinary Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Specific Japanese whiskies, audio recording setup, security protocol."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="default"
                      size="default"
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
                      className="w-full font-semibold uppercase tracking-wider text-xs h-12"
                    >
                      Transmit Dossier to Concierge
                    </Button>
                  </div>
                </form>
              )}
            </DoubleBezel>
          </FluidReveal>
        </div>
      </div>
    </section>
  );
}
