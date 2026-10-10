import React from "react";
import Link from "next/link";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Access Restricted | ENCORE Admin",
  description: "Administrative access restricted to authorized personnel.",
};

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050507] text-[#f4f4f6]">
      <div className="w-full max-w-md">
        <DoubleBezel variant="glow" size="lg" className="w-full" innerClassName="p-8 text-center space-y-6 bg-[#08080c]/95">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff551f]/10 border border-[#ff551f]/20 text-[#ff551f]">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff773d]">
              HTTP 403 · Access Forbidden
            </span>
            <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
              Admin Access Required
            </h1>
            <p className="text-xs text-[#8f909e] leading-relaxed">
              Your account is currently signed in as a <span className="text-white font-medium">Customer</span>. The administration portal is restricted to authorized ENCORE venue managers and staff.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/account" className="flex-1">
              <Button variant="secondary" size="default" className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]">
                My Account
              </Button>
            </Link>
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
