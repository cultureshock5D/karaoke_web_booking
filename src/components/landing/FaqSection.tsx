'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  tag?: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the reservation deposit work?",
    answer:
      "A small deposit is required to lock your room slot in our database. The deposit is deducted from your final bill, and the remaining balance is settled directly at the venue reception upon checkout.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept instant digital payments via GCash, Maya, GrabPay, QR Ph bank transfers, and Visa/Mastercard through PayMongo Hosted Checkout.",
  },
  {
    question: "What is the cancellation or rescheduling policy?",
    answer:
      "Hold slots expire automatically after 15 minutes if unpaid. For confirmed bookings, please use your magic link or notify venue staff at least 4 hours prior. (TODO: confirm with venue exact cancellation refund policy).",
    tag: "TODO: confirm with venue",
  },
  {
    question: "What time should we arrive for our booking?",
    answer:
      "Please arrive 10 to 15 minutes before your reserved start time. Present your booking reference code or mobile number at reception for immediate room escort. (TODO: confirm with venue grace period policy).",
    tag: "TODO: confirm with venue",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-center">
          <span className="eyebrow text-accent block">Common Questions</span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left focus-visible:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-lg sm:text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 border border-border rounded-[2px] transition-transform duration-150 ${isOpen ? 'rotate-180 bg-surface-raised text-accent' : 'text-muted-foreground'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed space-y-2">
                    <p>{faq.answer}</p>
                    {faq.tag && (
                      <span className="inline-block text-[10px] uppercase font-mono text-accent/90 border border-accent/30 bg-accent/5 px-2 py-0.5 rounded-[2px]">
                        {faq.tag}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
