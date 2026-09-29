import React from 'react';
import { STATS } from '@/lib/design/marketing';
import { CountUp } from '@/components/ui/CountUp';

export function StatsStrip() {
  return (
    <section className="w-full bg-accent text-[#111111] border-b border-border py-6 sm:py-0 sm:min-h-[88px] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#111111]/20">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-baseline sm:items-center justify-start sm:justify-center gap-2 sm:gap-3 ${
                idx > 0 ? 'pt-4 sm:pt-0 sm:px-4' : 'sm:pr-4'
              }`}
            >
              <span className="font-heading font-bold text-3xl sm:text-4xl text-[#111111] leading-none">
                <CountUp value={stat.value} suffix={stat.suffix} duration={1.2} />
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold text-[#111111]/85">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
