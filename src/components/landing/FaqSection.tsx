"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/design/marketing";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { FluidReveal } from "@/components/ui/FluidReveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#050507] py-20 sm:py-32 px-4 sm:px-6 lg:px-8 select-none border-t border-white/[0.06]"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <FluidReveal delayMs={100}>
            <LuxuryBadge pulse pulseColor="orange" variant="orange">
              Frequently Asked Questions
            </LuxuryBadge>
          </FluidReveal>

          <FluidReveal delayMs={200}>
            <h2
              className="font-heading font-bold uppercase tracking-[-0.03em] text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}
            >
              Everything you need <span className="text-[#ff773d]">to know.</span>
            </h2>
          </FluidReveal>

          <FluidReveal delayMs={300}>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#8f909e] leading-relaxed">
              Clear answers on rates, group sizes, online deposits, food policies, and cancellations.
            </p>
          </FluidReveal>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <FluidReveal key={idx} delayMs={100 * (idx + 1)}>
                <DoubleBezel
                  variant={isOpen ? "accent" : "default"}
                  size="md"
                  className="w-full transition-all duration-300"
                  innerClassName={`p-5 sm:p-6 transition-colors duration-300 ${
                    isOpen ? "bg-[#0c0808]" : "bg-[#08080c]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-transform duration-300 ${
                        isOpen
                          ? "border-[#ff551f] bg-[#ff551f] text-white rotate-45"
                          : "border-white/10 bg-white/[0.04] text-[#8f909e]"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-[#a0a1b0] leading-relaxed space-y-2">
                      <p>{faq.answer}</p>
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
