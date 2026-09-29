import React from 'react';
import Link from 'next/link';
import { AddOn } from '@/types';
import { ArrowRight, Utensils, Mic, Sparkles } from 'lucide-react';

interface PackagesSectionProps {
  addOns: AddOn[];
}

export function PackagesSection({ addOns }: PackagesSectionProps) {
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'food':
      case 'beverage':
        return <Utensils className="w-4 h-4 text-accent" />;
      case 'equipment':
        return <Mic className="w-4 h-4 text-accent" />;
      default:
        return <Sparkles className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <section id="packages" className="py-24 bg-[#0d0d0d] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-border">
          <div className="space-y-2">
            <span className="eyebrow text-accent block">Room Enhancements</span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
              Food, Drinks & Gear
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Add items during checkout so your table is stocked with chilled bottles and snacks when you step into the room.
          </p>
        </div>

        {/* 3-4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {addOns.slice(0, 3).map((addon) => (
            <div
              key={addon.$id}
              className="p-6 bg-surface-raised border border-border rounded-[2px] flex flex-col justify-between space-y-6 hover:border-border/80 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[2px] bg-surface border border-border flex items-center justify-center">
                    {getCategoryIcon(addon.category)}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">
                    {addon.category || 'Package'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-foreground">
                    {addon.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                    {addon.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-2xl text-accent font-tabular">
                    ₱{addon.price.toLocaleString()}
                  </span>
                </div>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-accent font-medium transition-colors"
                >
                  <span>Select in booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
