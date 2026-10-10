import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { listRooms } from "@/lib/admin/rooms";
import { Button } from "@/components/ui/button";
import { RoomListClient } from "./RoomListClient";

export const metadata = {
  title: "Room Catalog | ENCORE Admin",
  description: "Manage private karaoke suite inventory, pricing, and guest capacities.",
};

export default async function AdminRoomsPage() {
  await requireAdmin("/admin/rooms");
  const rooms = await listRooms();

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Top Bar */}
      <header className="border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-xs text-[#8f909e] hover:text-white transition-colors">
              ← Admin Portal
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-heading text-sm font-bold uppercase tracking-tight text-white">
              Room Catalog
            </span>
          </div>

          <div>
            <Link href="/admin/rooms/new">
              <Button
                variant="default"
                size="sm"
                className="text-xs uppercase tracking-wider font-semibold"
              >
                + Add Room
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
              CRUD Inventory
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Karaoke Suites ({rooms.length})
            </h1>
            <p className="text-xs text-[#8f909e]">
              Create, inspect, modify, and manage room configurations in Appwrite.
            </p>
          </div>
        </div>

        <RoomListClient initialRooms={rooms} />
      </main>
    </div>
  );
}
