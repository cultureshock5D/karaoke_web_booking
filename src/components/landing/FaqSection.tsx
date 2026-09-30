"use client";

import React, { useState } from "react";
import { FAQ_ITEMS, FaqItem } from "@/lib/design/faq-data";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "booking", label: "Slot Lock Engine" },
    { id: "sound", label: "Acoustics & Gear" },
    { id: "hospitality", label: "Dining & Mixology" },
    { id: "policies", label: "Venue Etiquette" },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#050507] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <FluidReveal delayMs={100}>
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              VIP Concierge Knowledge Base
            </LuxuryBadge>
          </FluidReveal>

          <FluidReveal delayMs={200}>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}
            >
              Frequently Asked <span className="text-[#ff773d]">Inquiries.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={300}>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#8f909e] leading-relaxed">
              Everything you need to know about our cryptographic slot lock,
              studio acoustics, dress code, and arrival protocol.
            </p>
          </FluidReveal>
        </div>

        {/* Category Filter Pills */}
        <FluidReveal delayMs={350} className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#ff551f] text-white shadow-[0_0_15px_rgba(255,85,31,0.35)]"
                  : "bg-white/[0.03] border border-white/[0.08] text-[#8f909e] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </FluidReveal>

        {/* Double-Bezel FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FluidReveal key={idx} delayMs={50 * (idx + 1)}>
                <DoubleBezel
                  variant={isOpen ? "accent" : "default"}
                  size="md"
                  interactive
                  className="w-full"
                  innerClassName={`p-5 sm:p-6 transition-colors duration-500 ${
                    isOpen ? "bg-[#0d0909]" : "bg-[#08080c]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ff773d]">
                        CATEGORY // {faq.category.toUpperCase()}
                      </div>
                      <span className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#ff8759] transition-colors leading-snug block">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isOpen
                          ? "bg-[#ff551f] border-[#ff773d] text-white rotate-180 shadow-[0_0_12px_rgba(255,85,31,0.4)]"
                          : "bg-white/[0.05] border-white/[0.1] text-white/50 group-hover:text-white"
                      }`}
                    >
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-3 text-xs sm:text-sm text-[#a0a1b0] leading-relaxed">
                      <p>{faq.answer}</p>
                      {faq.detail && (
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-[#8f909e] font-mono leading-relaxed">
                          <span className="text-[#ff773d] font-bold">NOTE: </span>
                          {faq.detail}
                        </div>
                      )}
                    </div>
                  )}
                </DoubleBezel>
              </FluidReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
