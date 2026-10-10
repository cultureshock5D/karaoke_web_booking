"use client";

import React, { useState, useTransition, useActionState } from "react";
import Link from "next/link";
import { AppUser } from "@/types/auth";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { Button } from "@/components/ui/button";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { updateDisplayNameAction } from "./actions";
import { sendVerificationEmailAction } from "@/app/(auth)/actions";

interface AccountClientProps {
  user: AppUser;
  bookings: any[];
}

export function AccountClient({ user, bookings }: AccountClientProps) {
  const [profileState, profileAction, isUpdatingName] = useActionState(
    updateDisplayNameAction,
    null
  );

  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);
  const [isSendingVerify, startVerifyTransition] = useTransition();

  const handleSendVerification = () => {
    setVerifyNotice(null);
    startVerifyTransition(async () => {
      const res = await sendVerificationEmailAction();
      setVerifyNotice(res.message);
    });
  };

  return (
    <div className="space-y-8">
      {/* Email Verification Warning Banner */}
      {!user.emailVerification ? (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 sm:p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">⚠</span>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-amber-200">
                  Email Verification Required
                </h3>
              </div>
              <p className="text-xs text-amber-300/80 leading-relaxed max-w-2xl">
                To protect customer privacy, past and upcoming booking confirmations are visible only after confirming ownership of your email address ({user.email}).
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              disabled={isSendingVerify}
              onClick={handleSendVerification}
              className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider min-h-[40px] bg-[#ff551f] hover:bg-[#ff773d]"
            >
              {isSendingVerify ? "Sending Link..." : "Send Verification Email"}
            </Button>
          </div>

          {verifyNotice && (
            <div className="rounded-lg bg-black/40 border border-amber-500/30 p-2.5 text-xs text-amber-200">
              {verifyNotice}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Your email address ({user.email}) is verified and secured.</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
            VERIFIED
          </span>
        </div>
      )}

      {/* Profile & Name Card */}
      <DoubleBezel variant="glass" size="md" innerClassName="p-6 sm:p-8 bg-[#08080c]/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
              Customer Profile
            </span>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white">
              Account Details
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <LuxuryBadge variant="default" className="py-0.5 px-2.5 text-[10px]">
              {user.role === "admin" ? "ADMINISTRATOR" : "CUSTOMER"}
            </LuxuryBadge>
          </div>
        </div>

        {/* Profile Feedback */}
        {profileState?.error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-300">
            {profileState.error}
          </div>
        )}
        {profileState?.message && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300">
            {profileState.message}
          </div>
        )}

        <form action={profileAction} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#8f909e]">
              Email Address (Login Identity)
            </label>
            <input
              id="email"
              type="email"
              disabled
              value={user.email}
              className="w-full rounded-xl bg-white/[0.02] border border-white/[0.08] px-4 py-2 text-sm font-mono text-[#8f909e] cursor-not-allowed min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
              Display Name
            </label>
            <div className="flex gap-3">
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user.name}
                placeholder="Your Name"
                className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff551f] min-h-[44px]"
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={isUpdatingName}
                className="text-xs uppercase tracking-wider font-semibold min-h-[44px] px-5"
              >
                {isUpdatingName ? "Saving..." : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </DoubleBezel>

      {/* My Bookings Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
              Reservations
            </span>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white">
              My Bookings
            </h2>
          </div>
          <Link href="/book">
            <Button variant="default" size="sm" className="text-xs uppercase tracking-wider font-semibold">
              + Book Another Room
            </Button>
          </Link>
        </div>

        {!user.emailVerification ? (
          <DoubleBezel variant="glass" size="md" innerClassName="p-10 text-center space-y-3 bg-[#08080c]/90">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-heading text-base font-bold uppercase tracking-tight text-white">
              Bookings are locked
            </h3>
            <p className="text-xs text-[#8f909e] max-w-sm mx-auto">
              Please verify your email address using the button above to unlock your booking records.
            </p>
          </DoubleBezel>
        ) : bookings.length === 0 ? (
          <DoubleBezel variant="glass" size="md" innerClassName="p-10 text-center space-y-3 bg-[#08080c]/90">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-[#8f909e]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-heading text-base font-bold uppercase tracking-tight text-white">
              No reservations found
            </h3>
            <p className="text-xs text-[#8f909e] max-w-sm mx-auto">
              You do not have any active or previous karaoke room bookings under {user.email}.
            </p>
            <div className="pt-2">
              <Link href="/book">
                <Button variant="default" size="sm" className="text-xs uppercase tracking-wider font-semibold">
                  Book a Room Now
                </Button>
              </Link>
            </div>
          </DoubleBezel>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#08080c]/80 backdrop-blur-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] bg-white/[0.02] text-[#8f909e] uppercase font-mono tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Reference</th>
                  <th className="py-3.5 px-4">Room & Guests</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {bookings.map((booking) => (
                  <tr key={booking.$id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-white whitespace-nowrap">
                      {booking.bookingReference}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#d1d2db]">
                      <div className="font-medium text-white">{booking.roomId}</div>
                      <div className="text-[11px] text-[#8f909e]">{booking.guestCount} guests</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#d1d2db]">
                      <div className="text-xs">
                        {booking.startDateTime
                          ? new Date(booking.startDateTime).toLocaleDateString("en-PH", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </div>
                      <div className="text-[11px] text-[#8f909e]">
                        {booking.durationHours} hours
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono capitalize ${
                          booking.status === "confirmed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : booking.status === "holding"
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-white/[0.04] text-[#8f909e] border border-white/[0.08]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono capitalize ${
                          booking.paymentStatus === "paid" || booking.paymentStatus === "captured"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-white/[0.04] text-[#8f909e] border border-white/[0.08]"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
