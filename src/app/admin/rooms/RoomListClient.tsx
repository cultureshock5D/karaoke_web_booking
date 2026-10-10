"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { AdminRoom } from "@/types/room-admin";
import { Button } from "@/components/ui/button";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { deleteRoomAction } from "./actions";

interface RoomListClientProps {
  initialRooms: AdminRoom[];
}

export function RoomListClient({ initialRooms }: RoomListClientProps) {
  const [rooms, setRooms] = useState<AdminRoom[]>(initialRooms);
  const [deleteTarget, setDeleteTarget] = useState<AdminRoom | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const res = await deleteRoomAction(deleteTarget.$id);
      if (res.success) {
        setRooms((prev) => prev.filter((r) => r.$id !== deleteTarget.$id));
        setSuccessMessage(`Room "${deleteTarget.name}" was successfully deleted.`);
        setDeleteTarget(null);
      } else {
        setErrorMessage(res.error || "Failed to delete room.");
        setDeleteTarget(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {successMessage && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <span>⚠</span>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Empty State */}
      {rooms.length === 0 ? (
        <DoubleBezel variant="glass" size="md" innerClassName="p-12 text-center space-y-4 bg-[#08080c]/90">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-[#8f909e]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
              No rooms yet
            </h3>
            <p className="text-xs text-[#8f909e]">
              Add your first karaoke room to begin taking customer reservations.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/admin/rooms/new">
              <Button variant="default" size="sm" className="text-xs font-semibold uppercase tracking-wider">
                + Add First Room
              </Button>
            </Link>
          </div>
        </DoubleBezel>
      ) : (
        /* Rooms Table / Cards */
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#08080c]/80 backdrop-blur-md">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] text-[#8f909e] uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Room Name & Slug</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Base Rate (PHP)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rooms.map((room) => (
                <tr key={room.$id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-heading font-bold text-sm text-white">
                      {room.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#ff773d]">
                      /{room.slug}
                    </div>
                    {room.description && (
                      <div className="text-[11px] text-[#8f909e] line-clamp-1 mt-0.5 max-w-xs">
                        {room.description}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-[#d1d2db]">
                    {room.capacityMin} – {room.capacityMax} guests
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap font-mono font-medium text-white">
                    ₱{room.baseHourlyRate.toLocaleString()}/hr
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {room.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[10px] font-mono text-[#8f909e]">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/rooms/${room.$id}/edit`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 px-3 text-[11px] uppercase tracking-wider"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(room)}
                        className="h-8 px-3 text-[11px] uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Accessible "Are you sure?" Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-md">
            <DoubleBezel variant="glow" size="md" className="w-full" innerClassName="p-6 sm:p-8 bg-[#08080c] space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
                  Confirm Deletion
                </span>
                <h3 id="delete-dialog-title" className="font-heading text-xl font-bold uppercase tracking-tight text-white">
                  Delete &ldquo;{deleteTarget.name}&rdquo;?
                </h3>
                <p className="text-xs text-[#8f909e] leading-relaxed">
                  Are you sure you want to permanently remove this karaoke room? This action cannot be undone.
                </p>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-[11px] text-amber-300">
                  <strong>Integrity Guard:</strong> The system will block deletion if this room has upcoming or holding reservations.
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="default"
                  disabled={isPending}
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 text-xs font-semibold uppercase tracking-wider min-h-[44px]"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="default"
                  disabled={isPending}
                  onClick={handleConfirmDelete}
                  className="flex-1 text-xs font-semibold uppercase tracking-wider min-h-[44px] bg-red-600 hover:bg-red-500 text-white"
                >
                  {isPending ? "Checking & Deleting..." : "Yes, Delete Room"}
                </Button>
              </div>
            </DoubleBezel>
          </div>
        </div>
      )}
    </div>
  );
}
