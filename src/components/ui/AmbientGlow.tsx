"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
  variant?: "hero" | "subtle" | "split" | "amber" | "violet";
}

export function AmbientGlow({
  className,
  variant = "hero",
}: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none",
        className
      )}
    >
      {variant === "hero" && (
        <>
          {/* Primary Warm Amber / Electric Orange Neon Orb */}
          <div
            className="animate-orb-1 absolute -top-[25%] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full opacity-35 blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,85,31,0.55) 0%, rgba(255,119,61,0.2) 45%, transparent 70%)",
            }}
          />

          {/* Secondary Deep Ultraviolet / Violet Acoustic Glow */}
          <div
            className="animate-orb-2 absolute top-[30%] -left-[10%] h-[550px] w-[550px] rounded-full opacity-25 blur-[150px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)",
            }}
          />

          {/* Tertiary Emerald Accent in bottom right corner */}
          <div
            className="absolute top-[65%] -right-[5%] h-[480px] w-[480px] rounded-full opacity-20 blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(5,150,105,0.1) 50%, transparent 70%)",
            }}
          />
        </>
      )}

      {variant === "amber" && (
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,85,31,0.45) 0%, transparent 70%)",
          }}
        />
      )}

      {variant === "violet" && (
        <div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)",
          }}
        />
      )}

      {variant === "subtle" && (
        <div
          className="absolute top-0 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, rgba(255,85,31,0.08) 40%, transparent 70%)",
          }}
        />
      )}

      {variant === "split" && (
        <>
          <div
            className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,85,31,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
            }}
          />
        </>
      )}
    </div>
  );
}
