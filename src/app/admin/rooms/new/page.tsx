import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { RoomFormClient } from "../RoomFormClient";

export const metadata = {
  title: "New Karaoke Room | ENCORE Admin",
  description: "Create a new private karaoke suite with custom guest capacity and rates.",
};

export default async function NewRoomPage() {
  await requireAdmin("/admin/rooms/new");

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6]">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#08080c]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/rooms" className="text-xs text-[#8f909e] hover:text-white transition-colors">
              ← Rooms
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-heading text-sm font-bold uppercase tracking-tight text-white">
              Create Room
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <RoomFormClient isEdit={false} />
      </main>
    </div>
  );
}
