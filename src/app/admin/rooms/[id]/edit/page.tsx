import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getRoomById } from "@/lib/admin/rooms";
import { RoomFormClient } from "../../RoomFormClient";

interface EditRoomPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Karaoke Room | ENCORE Admin",
  description: "Update room configurations, capacities, and base rates.",
};

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { id } = await params;
  await requireAdmin(`/admin/rooms/${id}/edit`);

  const room = await getRoomById(id);
  if (!room) {
    notFound();
  }

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
              Edit Room
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <RoomFormClient initialData={room} isEdit={true} />
      </main>
    </div>
  );
}
