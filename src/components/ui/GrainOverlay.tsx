"use client";

import React from "react";

/**
 * Optical Film-Grain Overlay
 * Enforces the high-end-visual-design skill guideline:
 * - Applied exclusively to a fixed, pointer-events-none element (z-index 50)
 * - Ultra-low opacity (0.028) simulating physical tactile surface depth
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 select-none opacity-[0.028]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
