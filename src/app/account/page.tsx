import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { logoutAction } from "@/app/(auth)/actions";
import { listCustomerBookings } from "@/lib/admin/rooms";
import { Button } from "@/components/ui/button";
import { AccountClient } from "./AccountClient";

export const metadata = {
  title: "My Account | ENCORE",
  description: "Manage your ENCORE profile and view private karaoke lounge reservations.",
};

export default async function AccountPage() {
  const user = await requireUser("/account");

  // Email verification privacy requirement:
  // Show bookings only when the user's email is verified
  const bookings = user.emailVerification
    ? await listCustomerBookings(user.email)
    : [];

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Header */}
      <header className="border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff551f] font-mono text-[10px] font-bold text-white shadow-[0_0_12px_#ff551f]">
                E
              </span>
              <span className="font-heading text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#ff8759] transition-colors">
                ENCORE
              </span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff773d]">
              Customer Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user.role === "admin" && (
              <Link href="/admin">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  Admin Portal →
                </Button>
              </Link>
            )}
            <form action={logoutAction}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-xs uppercase tracking-wider text-[#8f909e] hover:text-white"
              >
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AccountClient user={user} bookings={bookings} />
      </main>
    </div>
  );
}
