import React from "react";
import Link from "next/link";
import { createAdminAuthClient } from "@/lib/auth/appwrite-auth";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/design/brand";

interface VerifyPageProps {
  searchParams: Promise<{
    userId?: string;
    secret?: string;
  }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const { userId, secret } = params;

  let success = false;
  let errorMessage = "";

  if (userId && secret) {
    try {
      const { account } = createAdminAuthClient();
      await account.updateVerification(userId, secret);
      success = true;
    } catch (err: any) {
      errorMessage = err.message || "Failed to verify email. The verification link may have expired.";
    }
  } else {
    errorMessage = "Invalid verification link. Missing verification tokens.";
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050507] p-4 sm:p-6 select-none relative">
      <div className="w-full max-w-md relative z-10 space-y-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff551f] font-mono text-xs font-bold text-white shadow-[0_0_12px_#ff551f]">
            E
          </span>
          <span className="font-heading text-2xl font-bold tracking-tight text-white uppercase">
            {BRAND.name}
          </span>
        </Link>

        <DoubleBezel
          variant="default"
          size="lg"
          className="w-full"
          innerClassName="p-6 sm:p-8 bg-[#08080c] text-center space-y-6"
        >
          {success ? (
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10b981]/20 text-[#10b981] mx-auto text-2xl font-bold">
                ✓
              </div>
              <h1 className="font-heading text-2xl font-bold text-white uppercase">
                Email Verified
              </h1>
              <p className="text-xs text-[#a0a1b0] leading-relaxed">
                Your email has been confirmed. You can now access your full booking history in your customer account.
              </p>
              <div className="pt-2">
                <Link href="/account">
                  <Button variant="default" size="default" className="w-full uppercase text-xs font-semibold">
                    Go to My Account →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-red-400 mx-auto text-xl font-bold">
                ✕
              </div>
              <h1 className="font-heading text-2xl font-bold text-white uppercase">
                Verification Failed
              </h1>
              <p className="text-xs text-red-400 leading-relaxed">
                {errorMessage}
              </p>
              <div className="pt-2">
                <Link href="/account">
                  <Button variant="secondary" size="default" className="w-full uppercase text-xs font-semibold">
                    Return to Account
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DoubleBezel>
      </div>
    </div>
  );
}
