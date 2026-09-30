"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center font-medium select-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#ff551f] text-white hover:bg-[#ff6836] shadow-[0_0_24px_rgba(255,85,31,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-[#ff7a4d]/50",
        secondary:
          "bg-white/[0.06] text-[#f4f4f6] hover:bg-white/[0.1] hover:text-white border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
        outline:
          "bg-transparent text-[#f4f4f6] hover:bg-white/[0.04] hover:text-white border border-white/[0.14]",
        ghost:
          "bg-transparent text-[#8f909e] hover:text-white hover:bg-white/[0.05]",
        glass:
          "bg-white/[0.05] backdrop-blur-xl text-white border border-white/[0.14] hover:border-white/25 hover:bg-white/[0.09] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]",
        destructive:
          "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 hover:text-white",
        bezel:
          "p-1 rounded-full bg-white/[0.04] border border-white/[0.1] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.7)] hover:border-white/[0.2]",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-xs tracking-wider gap-2",
        default: "h-12 rounded-full px-6 py-3 text-sm tracking-wide gap-3",
        lg: "h-14 rounded-full px-7 py-3.5 text-base tracking-wide gap-3.5",
        xl: "h-16 rounded-full px-8 py-4 text-base tracking-wider gap-4",
        icon: "h-11 w-11 rounded-full p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  trailingIcon?: React.ReactNode;
  iconCircleClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      trailingIcon,
      iconCircleClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span>{children}</span>

        {trailingIcon && (
          <span
            className={cn(
              "flex items-center justify-center rounded-full shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105",
              size === "sm" && "w-6 h-6 -mr-1.5",
              size === "default" && "w-8 h-8 -mr-2",
              size === "lg" && "w-9 h-9 -mr-2.5",
              size === "xl" && "w-10 h-10 -mr-3",
              variant === "default"
                ? "bg-black/20 text-white"
                : "bg-white/10 text-white",
              iconCircleClassName
            )}
          >
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
