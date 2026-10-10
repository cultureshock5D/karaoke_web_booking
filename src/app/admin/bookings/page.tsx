import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { listAllBookings } from "@/lib/admin/rooms";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

export const metadata = {
  title: "Reservations & Holds | ENCORE Admin",
  description: "Read-only inspection of customer bookings, payment statuses, and schedules.",
};

export default async function AdminBookingsPage() {
  await requireAdmin("/admin/bookings");
  const bookings = await listAllBookings();

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-xs text-[#8f909e] hover:text-white transition-colors">
              ← Admin Portal
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-heading text-sm font-bold uppercase tracking-tight text-white">
              Reservations Register
            </span>
          </div>

          <LuxuryBadge variant="default" className="py-0.5 px-2 text-[10px]">
            READ-ONLY
          </LuxuryBadge>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
            Audit Log
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Customer Bookings ({bookings.length})
          </h1>
          <p className="text-xs text-[#8f909e]">
            Live feed of holds and confirmed reservations processed by the booking engine.
          </p>
        </div>

        {bookings.length === 0 ? (
          <DoubleBezel variant="glass" size="md" innerClassName="p-12 text-center space-y-3 bg-[#08080c]/90">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-[#8f909e]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
              No bookings recorded yet
            </h3>
            <p className="text-xs text-[#8f909e] max-w-sm mx-auto">
              Reservations placed through the online booking wizard or mobile flow will be listed here automatically.
            </p>
          </DoubleBezel>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#08080c]/80 backdrop-blur-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] bg-white/[0.02] text-[#8f909e] uppercase font-mono tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Reference</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Room & Guests</th>
                  <th className="py-3.5 px-4">Schedule</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {bookings.map((booking) => (
                  <tr key={booking.$id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-white">
                      {booking.bookingReference}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{booking.customerName}</div>
                      <div className="text-[11px] text-[#8f909e]">{booking.customerEmail}</div>
                      {booking.customerPhone && (
                        <div className="text-[10px] text-[#8f909e]">{booking.customerPhone}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#d1d2db]">
                      <div className="font-mono text-xs">{booking.roomId}</div>
                      <div className="text-[11px] text-[#8f909e]">{booking.guestCount} guests</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#d1d2db]">
                      <div className="text-xs">
                        {booking.startDateTime
                          ? new Date(booking.startDateTime).toLocaleDateString("en-PH", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </div>
                      <div className="text-[11px] text-[#8f909e]">
                        {booking.durationHours} hrs duration
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
      </main>
    </div>
  );
}
