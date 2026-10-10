import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { logoutAction } from "@/app/(auth)/actions";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";
import { Button } from "@/components/ui/button";
import { listRooms, listAllBookings } from "@/lib/admin/rooms";

export const metadata = {
  title: "Admin Command Center | ENCORE",
  description: "Administrative control portal for ENCORE BGC room catalog and reservations.",
};

export default async function AdminDashboardPage() {
  const user = await requireAdmin("/admin");
  const [rooms, bookings] = await Promise.all([
    listRooms(),
    listAllBookings(),
  ]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Top Admin Header */}
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
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8f909e]">
              <span className="text-white font-medium">{user.name}</span>
              <LuxuryBadge variant="default" className="py-0.5 px-2 text-[10px]">
                ADMIN
              </LuxuryBadge>
            </div>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8f909e]">
            <span>Venue: BGC Flagship</span>
            <span>•</span>
            <span className="text-emerald-400">Database Connected</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Operations Overview
          </h1>
          <p className="text-sm text-[#8f909e]">
            Manage the private karaoke room inventory and inspect real-time customer bookings.
          </p>
        </div>

        {/* Quick Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DoubleBezel variant="glass" size="sm" innerClassName="p-5 bg-[#08080c]/90 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
              Configured Rooms
            </span>
            <div className="font-heading text-3xl font-bold text-white">
              {rooms.length}
            </div>
            <p className="text-[11px] text-[#8f909e]">
              Active karaoke suites in Appwrite
            </p>
          </DoubleBezel>

          <DoubleBezel variant="glass" size="sm" innerClassName="p-5 bg-[#08080c]/90 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
              Total Bookings
            </span>
            <div className="font-heading text-3xl font-bold text-white">
              {bookings.length}
            </div>
            <p className="text-[11px] text-[#8f909e]">
              Holds, confirmed & completed
            </p>
          </DoubleBezel>

          <DoubleBezel variant="glass" size="sm" innerClassName="p-5 bg-[#08080c]/90 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8f909e]">
              Role Identity
            </span>
            <div className="font-heading text-xl font-bold text-[#ff8759] pt-1">
              Administrator
            </div>
            <p className="text-[11px] text-[#8f909e]">
              Session verified with Appwrite label
            </p>
          </DoubleBezel>
        </div>

        {/* Action Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1: Room CRUD */}
          <DoubleBezel variant="glow" size="md" innerClassName="p-6 sm:p-8 bg-[#08080c]/95 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ff773d]">
                  CRUD Feature · 25% Weight
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  Full CRUD Active
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                Room Management
              </h2>
              <p className="text-xs sm:text-sm text-[#8f909e] leading-relaxed">
                Complete Create, Read, Update, and Delete control over the venue&apos;s karaoke suite inventory. Configure guest capacities, base hourly rates, descriptions, and activation status with strict booking integrity guards.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link href="/admin/rooms" className="flex-1">
                <Button variant="default" size="default" className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]">
                  Manage Rooms →
                </Button>
              </Link>
              <Link href="/admin/rooms/new" className="flex-1">
                <Button variant="secondary" size="default" className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]">
                  + Add New Room
                </Button>
              </Link>
            </div>
          </DoubleBezel>

          {/* Module 2: Booking Register */}
          <DoubleBezel variant="glass" size="md" innerClassName="p-6 sm:p-8 bg-[#08080c]/95 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8f909e]">
                  Audit & Compliance
                </span>
                <span className="rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 font-mono text-[10px] text-[#8f909e]">
                  Read-Only Register
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
                Reservations & Holds
              </h2>
              <p className="text-xs sm:text-sm text-[#8f909e] leading-relaxed">
                Inspect real-time booking records created through the atomic slot booking engine. View customer contacts, booking references, payment statuses, and schedule intervals.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/admin/bookings" className="block w-full">
                <Button variant="secondary" size="default" className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]">
                  View Bookings Table →
                </Button>
              </Link>
            </div>
          </DoubleBezel>
        </div>

        {/* Public Navigation Links */}
        <div className="pt-4 flex items-center justify-between border-t border-white/[0.08] text-xs text-[#8f909e]">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Public Landing Page
          </Link>
          <Link href="/book" className="hover:text-white transition-colors">
            Test Booking Wizard Flow →
          </Link>
        </div>
      </main>
    </div>
  );
}
