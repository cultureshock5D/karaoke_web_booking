"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DoubleBezelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "glass" | "subtle" | "glow";
  size?: "sm" | "md" | "lg" | "xl";
  outerClassName?: string;
  innerClassName?: string;
  glowColor?: "orange" | "purple" | "emerald" | "none";
  interactive?: boolean;
}

const variantStyles = {
  default: {
    outer: "bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]",
    inner: "bg-[#09090d] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
  },
  accent: {
    outer: "bg-[#ff551f]/[0.08] border border-[#ff551f]/30 shadow-[0_25px_60px_-15px_rgba(255,85,31,0.2)]",
    inner: "bg-[#0d0909] shadow-[inset_0_1px_1px_0_rgba(255,85,31,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.8)]",
  },
  glass: {
    outer: "bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]",
    inner: "bg-[#08080c]/85 backdrop-blur-xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18)]",
  },
  subtle: {
    outer: "bg-white/[0.02] border border-white/[0.05] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.7)]",
    inner: "bg-[#07070a] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08)]",
  },
  glow: {
    outer: "bg-white/[0.05] border border-white/[0.15] shadow-[0_0_50px_-10px_rgba(255,85,31,0.25)]",
    inner: "bg-[#0a0a0f] shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.2)]",
  },
};

const sizeConfig = {
  sm: {
    outerRadius: "rounded-[1.25rem]",
    padding: "p-1",
    innerRadius: "rounded-[calc(1.25rem-0.25rem)]",
  },
  md: {
    outerRadius: "rounded-[1.75rem]",
    padding: "p-1.5",
    innerRadius: "rounded-[calc(1.75rem-0.375rem)]",
  },
  lg: {
    outerRadius: "rounded-[2rem]",
    padding: "p-1.5",
    innerRadius: "rounded-[calc(2rem-0.375rem)]",
  },
  xl: {
    outerRadius: "rounded-[2.5rem]",
    padding: "p-2",
    innerRadius: "rounded-[calc(2.5rem-0.5rem)]",
  },
};

export const DoubleBezel = forwardRef<HTMLDivElement, DoubleBezelProps>(
  (
    {
      children,
      variant = "default",
      size = "lg",
      outerClassName,
      innerClassName,
      glowColor = "none",
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    const selectedVariant = variantStyles[variant];
    const selectedSize = sizeConfig[size];

    return (
      <div
        ref={ref}
        className={cn(
          "group relative transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          selectedSize.outerRadius,
          selectedSize.padding,
          selectedVariant.outer,
          interactive &&
            "hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(255,85,31,0.12),0_0_1px_1px_rgba(255,255,255,0.1)] active:scale-[0.995]",
          outerClassName,
          className
        )}
        {...props}
      >
        {/* Optional Ambient Radial Highlight behind the card */}
        {glowColor === "orange" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-[#ff551f]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {glowColor === "purple" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-[#8b5cf6]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {glowColor === "emerald" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-[#10b981]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {/* Inner Concentric Core */}
        <div
          className={cn(
            "relative w-full h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            selectedSize.innerRadius,
            selectedVariant.inner,
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

DoubleBezel.displayName = "DoubleBezel";
