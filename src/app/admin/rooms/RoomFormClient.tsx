"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AdminRoom, RoomActionResult } from "@/types/room-admin";
import { Button } from "@/components/ui/button";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { createRoomAction, updateRoomAction } from "./actions";

interface RoomFormClientProps {
  initialData?: AdminRoom;
  isEdit?: boolean;
}

export function RoomFormClient({ initialData, isEdit = false }: RoomFormClientProps) {
  const formActionWrapper = isEdit && initialData
    ? updateRoomAction.bind(null, initialData.$id)
    : createRoomAction;

  const [state, formAction, isPending] = useActionState<RoomActionResult | null, FormData>(
    formActionWrapper,
    null
  );

  return (
    <div className="max-w-2xl mx-auto">
      <DoubleBezel variant="glow" size="lg" className="w-full" innerClassName="p-6 sm:p-10 bg-[#08080c]/95 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff773d]">
            {isEdit ? "Update Suite" : "New Inventory Item"}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            {isEdit ? `Edit Room: ${initialData?.name}` : "Create New Karaoke Room"}
          </h1>
          <p className="text-xs text-[#8f909e]">
            {isEdit
              ? "Modify room specs, capacity limits, and weekday base rates."
              : "Define room attributes, guest ranges, and base hourly rates."}
          </p>
        </div>

        {/* Global Error Banner */}
        {state?.error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-xs text-red-300 flex items-center gap-2">
            <span>⚠</span>
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Room Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
              Room Name <span className="text-[#ff551f]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={initialData?.name ?? ""}
              placeholder="e.g. Barkada Suite"
              className={`w-full rounded-xl bg-white/[0.04] border px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-300 min-h-[44px] ${
                state?.fieldErrors?.name
                  ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.name ? (
              <p className="text-[11px] text-red-400">{state.fieldErrors.name}</p>
            ) : (
              <p className="text-[10px] text-[#8f909e]">Between 2 and 60 characters.</p>
            )}
          </div>

          {/* URL Slug */}
          <div className="space-y-1.5">
            <label htmlFor="slug" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
              URL Slug <span className="text-[#ff551f]">*</span>
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              required
              defaultValue={initialData?.slug ?? ""}
              placeholder="e.g. barkada-suite"
              className={`w-full rounded-xl bg-white/[0.04] border px-4 py-2.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none transition-all duration-300 min-h-[44px] ${
                state?.fieldErrors?.slug
                  ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.slug ? (
              <p className="text-[11px] text-red-400">{state.fieldErrors.slug}</p>
            ) : (
              <p className="text-[10px] text-[#8f909e]">
                Lowercase letters, numbers, and single hyphens. Must be unique.
              </p>
            )}
          </div>

          {/* Capacity Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="capacityMin" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
                Min Guests <span className="text-[#ff551f]">*</span>
              </label>
              <input
                id="capacityMin"
                name="capacityMin"
                type="number"
                min="1"
                max="50"
                required
                defaultValue={initialData?.capacityMin ?? 1}
                className={`w-full rounded-xl bg-white/[0.04] border px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-300 min-h-[44px] ${
                  state?.fieldErrors?.capacityMin
                    ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                    : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
                }`}
              />
              {state?.fieldErrors?.capacityMin && (
                <p className="text-[11px] text-red-400">{state.fieldErrors.capacityMin}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="capacityMax" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
                Max Guests <span className="text-[#ff551f]">*</span>
              </label>
              <input
                id="capacityMax"
                name="capacityMax"
                type="number"
                min="1"
                max="50"
                required
                defaultValue={initialData?.capacityMax ?? 10}
                className={`w-full rounded-xl bg-white/[0.04] border px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-300 min-h-[44px] ${
                  state?.fieldErrors?.capacityMax
                    ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                    : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
                }`}
              />
              {state?.fieldErrors?.capacityMax && (
                <p className="text-[11px] text-red-400">{state.fieldErrors.capacityMax}</p>
              )}
            </div>
          </div>

          {/* Base Hourly Rate (PHP) */}
          <div className="space-y-1.5">
            <label htmlFor="baseHourlyRate" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
              Base Hourly Rate (PHP) <span className="text-[#ff551f]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-[#8f909e]">
                ₱
              </span>
              <input
                id="baseHourlyRate"
                name="baseHourlyRate"
                type="number"
                min="100"
                max="100000"
                step="50"
                required
                defaultValue={initialData?.baseHourlyRate ?? 2200}
                className={`w-full rounded-xl bg-white/[0.04] border pl-8 pr-4 py-2.5 text-sm font-mono text-white placeholder-white/20 focus:outline-none transition-all duration-300 min-h-[44px] ${
                  state?.fieldErrors?.baseHourlyRate
                    ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                    : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
                }`}
              />
            </div>
            {state?.fieldErrors?.baseHourlyRate ? (
              <p className="text-[11px] text-red-400">{state.fieldErrors.baseHourlyRate}</p>
            ) : (
              <p className="text-[10px] text-[#8f909e]">
                Standard weekday base rate. Peak multiplier (+25%) is calculated at checkout.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-[#d1d2db]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              maxLength={500}
              defaultValue={initialData?.description ?? ""}
              placeholder="e.g. Intimate private room with dual wireless mics, 65-inch 4K screen, and plush booth seating."
              className={`w-full rounded-xl bg-white/[0.04] border px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-300 ${
                state?.fieldErrors?.description
                  ? "border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  : "border-white/10 focus:border-[#ff551f] focus:ring-1 focus:ring-[#ff551f]"
              }`}
            />
            {state?.fieldErrors?.description ? (
              <p className="text-[11px] text-red-400">{state.fieldErrors.description}</p>
            ) : (
              <p className="text-[10px] text-[#8f909e]">Up to 500 characters.</p>
            )}
          </div>

          {/* Active Status & Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-3 pt-2">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                defaultChecked={initialData ? initialData.isActive : true}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.05] text-[#ff551f] focus:ring-[#ff551f] focus:ring-offset-0"
              />
              <label htmlFor="isActive" className="text-xs text-white select-none">
                Active for public bookings
              </label>
            </div>

            <div className="space-y-1">
              <label htmlFor="sortOrder" className="block text-xs text-[#8f909e]">
                Display Order
              </label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min="0"
                defaultValue={initialData?.sortOrder ?? 0}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff551f]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-white/[0.08]">
            <Link href="/admin/rooms" className="flex-1">
              <Button
                type="button"
                variant="secondary"
                size="default"
                className="w-full text-xs font-semibold uppercase tracking-wider min-h-[44px]"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="default"
              size="default"
              disabled={isPending}
              className="flex-1 text-xs font-semibold uppercase tracking-wider min-h-[44px]"
            >
              {isPending
                ? "Saving Room..."
                : isEdit
                ? "Save Changes"
                : "Create Room"}
            </Button>
          </div>
        </form>
      </DoubleBezel>
    </div>
  );
}
