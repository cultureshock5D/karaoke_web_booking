"use client";

import React from "react";
import Image from "next/image";
import { Room } from "@/types";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { SUITE_DETAILS } from "@/lib/design/suites";

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (room: Room) => void;
}

const LOCAL_ROOM_IMAGES: Record<string, string> = {
  room_cozy_duo: "/images/room-cozy-duo.jpg",
  room_vip_lounge: "/images/room-vip-suite.jpg",
  room_penthouse_party: "/images/room-starlight-hall.jpg",
  "room-1": "/images/room-cozy-duo.jpg",
  "room-2": "/images/room-vip-suite.jpg",
  "room-3": "/images/room-starlight-hall.jpg",
};

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected,
  onSelect,
}) => {
  const imageSrc =
    LOCAL_ROOM_IMAGES[room.$id] ||
    LOCAL_ROOM_IMAGES[room.name.toLowerCase().replace(/\s+/g, "_")] ||
    "/images/hero-ktv.jpg";

  const suiteMeta = SUITE_DETAILS[room.$id];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${room.name}`}
      onClick={() => onSelect(room)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(room);
        }
      }}
      className="outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#ff551f] rounded-[1.75rem]"
    >
      <DoubleBezel
        variant={isSelected ? "accent" : "default"}
        size="md"
        interactive
        glowColor={isSelected ? "orange" : "none"}
        className="w-full"
        innerClassName={`transition-colors duration-500 ${
          isSelected ? "bg-[#0f0b0a]" : "bg-[#08080c]"
        }`}
      >
        {/* Selected Checkmark Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff551f] text-white shadow-[0_0_12px_#ff551f]">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        )}

        {/* Room Photo & Capacity Strip */}
        <div className="relative h-48 w-full overflow-hidden bg-[#050507]">
          <Image
            src={imageSrc}
            alt={room.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent pointer-events-none" />

          {/* Capacity Pill on Image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 font-mono text-[10px] text-white flex items-center gap-1.5">
              <span>👤</span>
              <span>
                {room.capacityMin}–{room.capacityMax} Guests
              </span>
            </span>

            {suiteMeta && (
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[9px] text-emerald-400">
                {suiteMeta.acousticIsolation.split(" ")[0]} {suiteMeta.acousticIsolation.split(" ")[1]}
              </span>
            )}
          </div>
        </div>

        {/* Room Details & Pricing */}
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#ff773d]">
              SUITE 0{room.sortOrder || 1}
            </div>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white uppercase">
              {room.name}
            </h3>
            <p className="text-xs text-[#8f909e] line-clamp-2 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 pt-2 border-t border-white/[0.06]">
            <span className="font-heading text-2xl font-bold text-white font-tabular">
              ₱{room.baseHourlyRate.toLocaleString()}
            </span>
            <span className="font-mono text-xs text-[#8f909e]">
              / hour
            </span>
          </div>

          {/* Feature Badges */}
          {room.features && room.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {room.features.slice(0, 3).map((feat, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 text-[10px] font-mono text-[#d1d2db]"
                >
                  ✓ {feat}
                </span>
              ))}
              {room.features.length > 3 && (
                <span className="self-center font-mono text-[10px] text-[#8f909e] pl-1">
                  +{room.features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </DoubleBezel>
    </div>
  );
};
