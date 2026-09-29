'use client';

import React from 'react';
import Image from 'next/image';
import { Room } from '@/types';
import { Users, Check } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (room: Room) => void;
}

const LOCAL_ROOM_IMAGES: Record<string, string> = {
  room_cozy_duo: '/images/room-cozy-duo.jpg',
  room_vip_lounge: '/images/room-vip-suite.jpg',
  room_penthouse_party: '/images/room-starlight-hall.jpg',
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, isSelected, onSelect }) => {
  const imageSrc = LOCAL_ROOM_IMAGES[room.$id] || '/images/hero-ktv.jpg';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${room.name}`}
      onClick={() => onSelect(room)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(room);
        }
      }}
      className={`relative cursor-pointer rounded-[2px] border transition-all duration-150 overflow-hidden bg-surface text-foreground outline-none focus-visible:ring-1 focus-visible:ring-accent ${
        isSelected
          ? 'border-2 border-accent bg-surface-raised'
          : 'border-border hover:border-border/90 hover:bg-surface-raised'
      }`}
    >
      {/* Corner check badge when selected */}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 z-20 bg-accent text-background p-1 rounded-[2px] shadow">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      )}

      {/* Room Photo */}
      <div className="relative h-44 w-full overflow-hidden bg-[#111111] border-b border-border">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-200 hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Capacity badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-[#111111]/90 backdrop-blur-md border border-border text-foreground px-2 py-0.5 rounded-[2px] text-xs font-medium flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-accent" />
          <span>{room.capacityMin}–{room.capacityMax} Guests</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading font-bold text-lg leading-tight uppercase tracking-tight text-foreground">
            {room.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 pt-1">
          <span className="font-heading font-bold text-2xl text-accent font-tabular">
            ₱{room.baseHourlyRate.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground font-mono uppercase">
            / hour
          </span>
        </div>

        {/* Amenity tags as 10px uppercase bordered chips */}
        {room.features && room.features.length > 0 && (
          <div className="pt-2.5 border-t border-border/60 flex flex-wrap gap-1.5">
            {room.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-[10px] uppercase tracking-wider bg-surface border border-border text-muted-foreground px-2 py-0.5 rounded-[2px]"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="text-[10px] font-mono text-muted-foreground self-center pl-1">
                +{room.features.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
