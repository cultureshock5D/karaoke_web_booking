import React from 'react';
import Link from 'next/link';
import { Room } from '@/types';
import { Users, ArrowRight } from 'lucide-react';

interface RoomsSectionProps {
  rooms: Room[];
}

export function RoomsSection({ rooms }: RoomsSectionProps) {
  return (
    <section id="rooms" className="py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-border">
          <div className="space-y-2">
            <span className="eyebrow text-accent block">The Spaces</span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
              Pick Your Room
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Acoustically treated suites with independent climate control, high-grade wireless mics, and discrete booking holds.
          </p>
        </div>

        {/* Hover-Raise Rows */}
        <div className="divide-y divide-border border-b border-border">
          {rooms.map((room) => (
            <Link
              key={room.$id}
              href="/book"
              className="group block py-8 px-4 sm:px-6 transition-all duration-150 hover:bg-surface-raised focus-visible:outline-none focus-visible:bg-surface-raised"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Room Title */}
                <div className="space-y-1.5 lg:w-1/3">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-mono">
                    Room 0{room.sortOrder}
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors duration-150">
                    {room.name}
                  </h3>
                </div>

                {/* Center: Details & Amenities */}
                <div className="space-y-3 lg:w-1/2">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-foreground bg-surface border border-border rounded-[2px]">
                      <Users className="w-3.5 h-3.5 text-accent" />
                      <span>{room.capacityMin}–{room.capacityMax} Guests</span>
                    </span>
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] uppercase tracking-wider text-muted-foreground bg-surface border border-border rounded-[2px]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Pricing & Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0 border-t border-border/40 lg:border-t-0">
                  <div className="text-left lg:text-right">
                    <span className="text-2xl sm:text-3xl font-heading font-bold text-foreground font-tabular">
                      ₱{room.baseHourlyRate.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground block -mt-1 font-mono uppercase">
                      / hour
                    </span>
                  </div>

                  <div className="w-10 h-10 border border-border flex items-center justify-center rounded-[2px] text-accent group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-150">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
