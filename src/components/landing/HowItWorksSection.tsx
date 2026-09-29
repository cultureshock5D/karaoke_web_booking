import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const STEPS = [
  {
    num: "01",
    title: "Choose a room",
    desc: "Browse our private soundproof suites scaled from cozy duos to 30-person starlight party halls.",
  },
  {
    num: "02",
    title: "Pick your time",
    desc: "Select your date, start hour, and session duration. Slots are checked live against our database index.",
  },
  {
    num: "03",
    title: "Add food & drinks",
    desc: "Pre-order ice buckets, party platters, and extra wireless microphones ready upon your arrival.",
  },
  {
    num: "04",
    title: "Pay the deposit",
    desc: "Lock your reservation instantly with a small deposit via GCash, Maya, QR Ph, GrabPay, or credit card.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0d0d0d] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <span className="eyebrow text-accent block">The Flow</span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
            Book In Four Steps
          </h2>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <FadeUp key={step.num} delay={idx * 0.12} className="relative">
              <div className="relative p-6 bg-surface border border-border rounded-[2px] h-full overflow-hidden flex flex-col justify-between">
                {/* Large Faded Orange Numeral Behind Content */}
                <span
                  aria-hidden="true"
                  className="absolute right-2 -bottom-4 font-heading font-bold text-accent select-none pointer-events-none"
                  style={{
                    fontSize: '110px',
                    opacity: 0.06,
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="w-8 h-8 flex items-center justify-center border border-accent text-accent font-heading font-bold text-xs rounded-[2px]">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
