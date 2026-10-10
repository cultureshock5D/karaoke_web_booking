"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { Button } from "@/components/ui/button";

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Account error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050507] text-[#f4f4f6]">
      <div className="w-full max-w-md">
        <DoubleBezel variant="glow" size="lg" className="w-full" innerClassName="p-8 text-center space-y-6 bg-[#08080c]/95">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">
              Account Error
            </span>
            <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
              Unable to load account
            </h1>
            <p className="text-xs text-[#8f909e] leading-relaxed">
              We encountered an issue loading your profile or reservation data. Please retry or return to the home page.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              size="default"
              onClick={() => reset()}
              className="flex-1 text-xs font-semibold uppercase tracking-wider min-h-[44px]"
            >
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="default" size="default" className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]">
                Return Home
              </Button>
            </Link>
          </div>
        </DoubleBezel>
      </div>
    </div>
  );
}
