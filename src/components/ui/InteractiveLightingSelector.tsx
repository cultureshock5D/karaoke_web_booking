"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface LightingPreset {
  id: string;
  name: string;
  subtitle: string;
  colors: [string, string];
  glow: string;
  description: string;
}

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "cyber-tokyo",
    name: "Cyber Tokyo",
    subtitle: "High-Energy Pop & EDM",
    colors: ["#ff007f", "#00f0ff"],
    glow: "rgba(255, 0, 127, 0.4)",
    description: "Pulsing dual neon pink and cyan wash with soundwave reactive strobing.",
  },
  {
    id: "velvet-noir",
    name: "Velvet Noir",
    subtitle: "Intimate Soul & Jazz",
    colors: ["#ff8a00", "#e52e71"],
    glow: "rgba(255, 138, 0, 0.35)",
    description: "Deep 2200K vintage warm tungsten glow with smoked amber perimeter halo.",
  },
  {
    id: "ultraviolet",
    name: "Ultra Violet",
    subtitle: "R&B & Late-Night Vibes",
    colors: ["#8b5cf6", "#d946ef"],
    glow: "rgba(139, 92, 246, 0.4)",
    description: "Cinematic 395nm blacklight diffusion paired with vibrant violet accents.",
  },
  {
    id: "emerald-speakeasy",
    name: "Emerald Speakeasy",
    subtitle: "Whiskey & Classic Rock",
    colors: ["#10b981", "#047857"],
    glow: "rgba(16, 185, 129, 0.35)",
    description: "Lush botanical jade ambiance with brushed brass architectural downlights.",
  },
  {
    id: "starlight-salon",
    name: "Starlight Salon",
    subtitle: "Audiophile Critical Listening",
    colors: ["#ffffff", "#64748b"],
    glow: "rgba(255, 255, 255, 0.25)",
    description: "Minimalist 4000K neutral diffused architectural light with acoustic ceiling glow.",
  },
];

interface InteractiveLightingSelectorProps {
  onSelect?: (preset: LightingPreset) => void;
  className?: string;
  showPreviewBox?: boolean;
}

export function InteractiveLightingSelector({
  onSelect,
  className,
  showPreviewBox = true,
}: InteractiveLightingSelectorProps) {
  const [activePreset, setActivePreset] = useState<LightingPreset>(
    LIGHTING_PRESETS[0]
  );

  const handleSelect = (preset: LightingPreset) => {
    setActivePreset(preset);
    onSelect?.(preset);
  };

  return (
    <div className={cn("space-y-4 select-none", className)}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f909e]">
          Ambient Room Lighting Matrix
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#d1d2db] font-mono">
          <span
            className="inline-block h-2 w-2 rounded-full transition-all duration-700"
            style={{ backgroundColor: activePreset.colors[0], boxShadow: `0 0 8px ${activePreset.colors[0]}` }}
          />
          {activePreset.name}
        </div>
      </div>

      {/* Preset Pill Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {LIGHTING_PRESETS.map((preset) => {
          const isSelected = activePreset.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelect(preset)}
              className={cn(
                "group relative rounded-xl p-2.5 text-left border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer",
                isSelected
                  ? "bg-white/[0.08] border-white/30 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex -space-x-1">
                  <span
                    className="h-3 w-3 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: preset.colors[0] }}
                  />
                  <span
                    className="h-3 w-3 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: preset.colors[1] }}
                  />
                </div>
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                )}
              </div>
              <div className="text-xs font-semibold text-white tracking-wide">
                {preset.name}
              </div>
              <div className="text-[10px] text-[#8f909e] truncate mt-0.5">
                {preset.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Simulation of the selected light profile */}
      {showPreviewBox && (
        <div
          className="relative h-20 w-full overflow-hidden rounded-xl border border-white/[0.08] p-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            background: `radial-gradient(ellipse at 50% 120%, ${activePreset.glow} 0%, rgba(13, 13, 18, 0.95) 75%)`,
          }}
        >
          <div className="relative z-10 flex items-center justify-between h-full">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                Live Acoustic Synchronizer
              </div>
              <div className="text-xs text-[#d1d2db] mt-1 max-w-md">
                {activePreset.description}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-white/40">
              <span>DMX 512</span>
              <span>·</span>
              <span>SOUND-REACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
