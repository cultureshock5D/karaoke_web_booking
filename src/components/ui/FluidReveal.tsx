"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FluidRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  durationMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  once?: boolean;
}

export function FluidReveal({
  children,
  delayMs = 0,
  durationMs = 800,
  direction = "up",
  threshold = 0.15,
  once = true,
  className,
  ...props
}: FluidRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getTransformStyles = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100 blur-0";

    switch (direction) {
      case "up":
        return "translate-y-14 opacity-0 blur-sm";
      case "down":
        return "-translate-y-14 opacity-0 blur-sm";
      case "left":
        return "translate-x-14 opacity-0 blur-sm";
      case "right":
        return "-translate-x-14 opacity-0 blur-sm";
      case "none":
        return "opacity-0 blur-sm";
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[transform,opacity,filter]",
        getTransformStyles(),
        className
      )}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
