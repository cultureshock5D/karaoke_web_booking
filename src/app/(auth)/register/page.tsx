"use client";

import React, { useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registerAction } from "../actions";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/design/brand";

function RegisterForm() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "";

  const [state, formAction, isPending] = useActionState(registerAction, null);

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
            Create Account
          </h1>
          <p className="text-xs text-[#8f909e]">
            Track all your room reservations, add-ons, and payment receipts.
          </p>
        </div>

        {state?.error && !state.fieldErrors && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Maria Santos"
              className={`w-full h-11 rounded-xl bg-white/[0.03] border px-3.5 text-xs text-white placeholder-white/20 outline-none transition-colors ${
                state?.fieldErrors?.name
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/[0.08] focus:border-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.name && (
              <p className="text-[11px] text-red-400 font-mono">
                {state.fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. maria@example.ph"
              className={`w-full h-11 rounded-xl bg-white/[0.03] border px-3.5 text-xs text-white placeholder-white/20 outline-none transition-colors ${
                state?.fieldErrors?.email
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/[0.08] focus:border-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.email && (
              <p className="text-[11px] text-red-400 font-mono">
                {state.fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8f909e]">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Minimum 8 characters (letters & numbers)"
              className={`w-full h-11 rounded-xl bg-white/[0.03] border px-3.5 text-xs text-white placeholder-white/20 outline-none transition-colors ${
                state?.fieldErrors?.password
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/[0.08] focus:border-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.password ? (
              <p className="text-[11px] text-red-400 font-mono">
                {state.fieldErrors.password}
              </p>
            ) : (
              <p className="text-[10px] text-[#8f909e]">
                Must be at least 8 characters with at least one letter and one number.
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isPending}
              className="w-full font-semibold uppercase tracking-wider text-xs min-h-[44px]"
            >
              {isPending ? "Creating Account..." : "Create Account →"}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-[#8f909e]">
          Already have an account?{" "}
          <Link
            href={nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login"}
            className="text-[#ff8759] hover:text-[#ff551f] font-semibold underline underline-offset-4"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </DoubleBezel>
  );
}

export default function RegisterPage() {
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
              Customer Membership
            </LuxuryBadge>
          </div>
        </div>

        {/* Suspense-wrapped form */}
        <Suspense fallback={
          <div className="rounded-2xl border border-white/10 bg-[#08080c] p-8 text-center text-xs text-[#8f909e]">
            Loading registration portal...
          </div>
        }>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
