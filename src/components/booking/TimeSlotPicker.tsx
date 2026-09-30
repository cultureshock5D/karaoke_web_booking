"use client";

import React, { useMemo } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { localToUtcIso } from "@/lib/datetime";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { LuxuryBadge } from "@/components/ui/LuxuryBadge";

interface TimeSlotPickerProps {
  openingHour: number;
  closingHour: number;
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
  selectedTime: string; // "19:00"
  onTimeChange: (time: string) => void;
  durationHours: number;
  onDurationChange: (hours: number) => void;
  unavailableSlotKeys?: string[];
  roomId?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  openingHour,
  closingHour,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  durationHours,
  onDurationChange,
  unavailableSlotKeys = [],
  roomId,
}) => {
  // Generate next 7 days for quick date tabs
  const upcomingDays = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(today, i);
      return {
        dateStr: format(d, "yyyy-MM-dd"),
        dayName: i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(d, "EEE"),
        dayNumber: format(d, "d"),
        monthName: format(d, "MMM"),
      };
    });
  }, []);

  // Generate available hourly slots based on venue opening/closing
  const timeSlots = useMemo(() => {
    const slots: {
      time24: string;
      label: string;
      isUnavailable: boolean;
      isPeak: boolean;
    }[] = [];
    const currentHour = openingHour;
    const endHour = closingHour < openingHour ? closingHour + 24 : closingHour;

    for (let h = currentHour; h < endHour; h++) {
      const normalizedHour = h % 24;
      const time24 = `${String(normalizedHour).padStart(2, "0")}:00`;
      const period = normalizedHour >= 12 ? "PM" : "AM";
      const displayHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
      const label = `${displayHour}:00 ${period}`;
      const isPeak = normalizedHour >= 20 || normalizedHour < 2;

      let isUnavailable = false;
      if (roomId && selectedDate) {
        for (let d = 0; d < durationHours; d++) {
          const slotHour = (normalizedHour + d) % 24;
          const slotTime24 = `${String(slotHour).padStart(2, "0")}:00`;
          try {
            const startUtcIso = localToUtcIso(selectedDate, slotTime24);
            const slotKey = `${roomId}_${startUtcIso}`;
            if (unavailableSlotKeys.includes(slotKey)) {
              isUnavailable = true;
              break;
            }
          } catch {
            // fallback
          }
        }
      }

      slots.push({ time24, label, isUnavailable, isPeak });
    }

    return slots;
  }, [openingHour, closingHour, selectedDate, durationHours, roomId, unavailableSlotKeys]);

  const durations = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-8 select-none">
      {/* 1. Date Selection Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff773d]">
              Phase 01 // Select Date
            </span>
          </div>
          <LuxuryBadge pulse pulseColor="emerald" variant="default" className="text-[9px]">
            PHT (UTC+8) MANILA TIME
          </LuxuryBadge>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
          {upcomingDays.map((day) => {
            const isSelected = selectedDate === day.dateStr;
            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onDateChange(day.dateStr)}
                className={`group relative rounded-2xl p-3 text-center border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                  isSelected
                    ? "bg-[#ff551f] border-[#ff773d] text-white shadow-[0_0_20px_rgba(255,85,31,0.35)] scale-[1.02]"
                    : "bg-white/[0.02] border-white/[0.06] text-[#8f909e] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-medium opacity-80">
                  {day.dayName}
                </div>
                <div className="font-heading text-2xl font-bold tracking-tight my-1 text-white">
                  {day.dayNumber}
                </div>
                <div className="text-[10px] font-mono opacity-80">
                  {day.monthName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Duration Segmented Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff773d]">
            Phase 02 // Session Length
          </span>
          <span className="text-[11px] text-[#8f909e] font-mono">
            {durationHours} {durationHours === 1 ? "Hour" : "Hours"} Allocated
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-1.5">
          {durations.map((hrs) => {
            const isSelected = durationHours === hrs;
            return (
              <button
                key={hrs}
                type="button"
                onClick={() => onDurationChange(hrs)}
                className={`rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.1] border border-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    : "text-[#8f909e] hover:text-white"
                }`}
              >
                {hrs} {hrs === 1 ? "Hour" : "Hours"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Time Slots Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff773d]">
            Phase 03 // Start Time Slot
          </span>
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#8f909e]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff551f]" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" /> Peak Nightlife
            </span>
            <span className="flex items-center gap-1.5 opacity-40">
              <span className="h-2 w-2 rounded-full bg-white/20" /> Reserved
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time24;
            const isLocked = slot.isUnavailable;

            return (
              <button
                key={slot.time24}
                type="button"
                disabled={isLocked}
                onClick={() => onTimeChange(slot.time24)}
                className={`relative rounded-xl p-3 text-center border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isLocked
                    ? "border-white/[0.03] bg-white/[0.01] text-white/20 cursor-not-allowed line-through"
                    : isSelected
                    ? "bg-[#ff551f] border-[#ff773d] text-white shadow-[0_0_20px_rgba(255,85,31,0.4)] cursor-pointer scale-[1.02]"
                    : "bg-white/[0.02] border-white/[0.06] text-[#d1d2db] hover:bg-white/[0.06] hover:border-white/15 cursor-pointer"
                }`}
              >
                {slot.isPeak && !isLocked && !isSelected && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
                )}
                <div className="font-mono text-xs font-bold">{slot.label}</div>
                <div className="text-[9px] font-mono uppercase tracking-wider opacity-70 mt-0.5">
                  {isLocked ? "Unavailable" : slot.isPeak ? "Prime Hour" : "Standard"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
