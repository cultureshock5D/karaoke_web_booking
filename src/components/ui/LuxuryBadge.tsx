"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LuxuryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pulse?: boolean;
  pulseColor?: "orange" | "emerald" | "purple" | "cyan";
  variant?: "default" | "orange" | "glass" | "outline";
}

export function LuxuryBadge({
  children,
  pulse = false,
  pulseColor = "orange",
  variant = "default",
  className,
  ...props
}: LuxuryBadgeProps) {
  const pulseColors = {
    orange: "bg-[#ff551f] shadow-[0_0_8px_#ff551f]",
    emerald: "bg-[#10b981] shadow-[0_0_8px_#10b981]",
    purple: "bg-[#a855f7] shadow-[0_0_8px_#a855f7]",
    cyan: "bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]",
  };

  const variants = {
    default:
      "bg-white/[0.04] border border-white/[0.08] text-[#d1d2db] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
    orange:
      "bg-[#ff551f]/10 border border-[#ff551f]/25 text-[#ff8759] shadow-[0_0_15px_rgba(255,85,31,0.15)]",
    glass:
      "bg-white/[0.06] backdrop-blur-md border border-white/[0.12] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
    outline:
      "bg-transparent border border-white/[0.14] text-[#a0a1b0]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              pulseColors[pulseColor]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              pulseColors[pulseColor]
            )}
          />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
