"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  height?: number;
  mode?: "wave" | "spectrum" | "circular" | "ambient";
  colorScheme?: "orange" | "violet" | "emerald" | "monochrome";
  interactive?: boolean;
}

export function AudioVisualizer({
  className,
  barCount = 36,
  height = 70,
  mode = "spectrum",
  colorScheme = "orange",
  interactive = true,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const bars: number[] = new Array(barCount).fill(0.2);

    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, h);

      const barWidth = width / barCount;
      const gap = Math.max(2, barWidth * 0.25);
      const effectiveBarWidth = Math.max(2, barWidth - gap);

      // Interpolate bar target heights
      for (let i = 0; i < barCount; i++) {
        const normalizedIndex = i / barCount;
        // Harmonic waves
        const wave1 = Math.sin(time * 1.8 + i * 0.25);
        const wave2 = Math.cos(time * 0.9 - i * 0.15);
        const wave3 = Math.sin(time * 3.2 + i * 0.4);

        const bellCurve = Math.sin(normalizedIndex * Math.PI);
        const energyMultiplier = isHovered ? 1.6 : 1.0;

        const target = Math.max(
          0.1,
          (0.25 + 0.35 * wave1 + 0.25 * wave2 + 0.15 * wave3) *
            bellCurve *
            energyMultiplier
        );

        bars[i] += (target - bars[i]) * 0.15;

        const currentHeight = Math.min(h * 0.95, Math.max(4, bars[i] * h));
        const x = i * barWidth + gap / 2;
        const y = h - currentHeight;

        // Gradient coloring
        const gradient = ctx.createLinearGradient(0, y, 0, h);
        if (colorScheme === "orange") {
          gradient.addColorStop(0, "#ff773d");
          gradient.addColorStop(0.5, "#ff551f");
          gradient.addColorStop(1, "rgba(255, 85, 31, 0.15)");
        } else if (colorScheme === "violet") {
          gradient.addColorStop(0, "#c084fc");
          gradient.addColorStop(0.5, "#8b5cf6");
          gradient.addColorStop(1, "rgba(139, 92, 246, 0.15)");
        } else if (colorScheme === "emerald") {
          gradient.addColorStop(0, "#34d399");
          gradient.addColorStop(0.5, "#10b981");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.15)");
        } else {
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(0.5, "#a1a1aa");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
        }

        ctx.fillStyle = gradient;
        // Smooth rounded pill caps
        ctx.beginPath();
        const radius = effectiveBarWidth / 2;
        ctx.roundRect(x, y, effectiveBarWidth, currentHeight, [
          radius,
          radius,
          0,
          0,
        ]);
        ctx.fill();

        // High frequency glow dot above the peak
        if (isHovered && i % 3 === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(x + effectiveBarWidth / 2, Math.max(2, y - 4), 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [barCount, colorScheme, isHovered]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] select-none",
        interactive && "cursor-pointer hover:opacity-100",
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={360}
        height={height}
        className="w-full h-auto block"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
