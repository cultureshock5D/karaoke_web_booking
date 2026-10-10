"use client";

import React, { useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../actions";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/design/brand";

function LoginForm() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "";

  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <DoubleBezel
      variant="default"
      size="lg"
      className="w-full"
      innerClassName="p-6 sm:p-8 bg-[#08080c] relative"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
            Sign In
          </h1>
          <p className="text-xs text-[#8f909e]">
            Access your room bookings or administrative suite controls.
          </p>
        </div>

        {state?.error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="e.g. guest@example.ph"
              className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff551f] transition-colors"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isPending}
              className="w-full font-semibold uppercase tracking-wider text-xs min-h-[44px]"
            >
              {isPending ? "Authenticating..." : "Sign In →"}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-[#8f909e]">
          Don&apos;t have an account yet?{" "}
          <Link
            href={nextPath ? `/register?next=${encodeURIComponent(nextPath)}` : "/register"}
            className="text-[#ff8759] hover:text-[#ff551f] font-semibold underline underline-offset-4"
          >
            Register here
          </Link>
        </div>
      </div>
    </DoubleBezel>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050507] p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,85,31,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 focus:outline-none">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff551f] font-mono text-xs font-bold text-white shadow-[0_0_12px_#ff551f]">
              E
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">
              {BRAND.name}
            </span>
          </Link>
          <div className="flex justify-center">
            <LuxuryBadge variant="orange" className="py-0.5 px-3 text-[9px]">
              Customer & Staff Portal
            </LuxuryBadge>
          </div>
        </div>

        {/* Suspense-wrapped form */}
        <Suspense fallback={
          <div className="rounded-2xl border border-white/10 bg-[#08080c] p-8 text-center text-xs text-[#8f909e]">
            Loading sign in portal...
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Demo Credentials Helper Pill */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 text-center text-[11px] text-[#8f909e]">
          <span className="font-mono text-[#ff8759] font-semibold">Demo Accounts:</span> admin@encore.test (Admin) · customer@encore.test (Customer)
        </div>
      </div>
    </div>
  );
}
