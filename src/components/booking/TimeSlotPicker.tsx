'use client';

import React, { useMemo } from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import { Clock, Calendar as CalendarIcon, Ban } from 'lucide-react';
import { localToUtcIso } from '@/lib/datetime';

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
        dateStr: format(d, 'yyyy-MM-dd'),
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : format(d, 'EEE'),
        dayNumber: format(d, 'd'),
        monthName: format(d, 'MMM'),
      };
    });
  }, []);

  // Generate available hourly slots based on venue opening/closing
  const timeSlots = useMemo(() => {
    const slots: { time24: string; label: string; isUnavailable: boolean }[] = [];
    const currentHour = openingHour;
    const endHour = closingHour < openingHour ? closingHour + 24 : closingHour;

    for (let h = currentHour; h < endHour; h++) {
      const normalizedHour = h % 24;
      const time24 = `${String(normalizedHour).padStart(2, '0')}:00`;
      const period = normalizedHour >= 12 ? 'PM' : 'AM';
      const displayHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
      const label = `${displayHour}:00 ${period}`;

      let isUnavailable = false;
      if (roomId && selectedDate) {
        try {
          const slotStartUtc = localToUtcIso(`${selectedDate} ${time24}`);
          const slotKey = `${roomId}_${slotStartUtc}`;
          if (unavailableSlotKeys.includes(slotKey)) {
            isUnavailable = true;
          }
        } catch {
          // ignore date conversion errors
        }
      }

      slots.push({ time24, label, isUnavailable });
    }
    return slots;
  }, [openingHour, closingHour, selectedDate, roomId, unavailableSlotKeys]);

  return (
    <div className="space-y-6">
      {/* 1. Date Selector Tabs */}
      <div className="space-y-2.5">
        <label className="text-xs uppercase tracking-[0.14em] font-semibold text-foreground flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-accent" />
          <span>Select Date</span>
        </label>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {upcomingDays.map((day) => {
            const isSelected = selectedDate === day.dateStr;
            return (
              <button
                key={day.dateStr}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onDateChange(day.dateStr)}
                className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[76px] py-3 px-3 rounded-[2px] border transition-all duration-150 text-center outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  isSelected
                    ? 'border-accent bg-accent text-background font-bold shadow'
                    : 'border-border bg-surface hover:bg-surface-raised text-foreground'
                }`}
              >
                <span className={`text-[10px] uppercase font-mono tracking-wider ${isSelected ? 'text-background/90' : 'text-muted-foreground'}`}>
                  {day.dayName}
                </span>
                <span className="text-xl font-heading font-bold my-0.5 font-tabular">
                  {day.dayNumber}
                </span>
                <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-background/90' : 'text-muted-foreground'}`}>
                  {day.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Duration Selector (Segmented Control: 1h · 2h · 3h · 4h) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Duration (Segmented Hours)</span>
          </label>
          <span className="text-[11px] font-mono text-muted-foreground">Standard 1–4 Hour Blocks</span>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 bg-surface border border-border rounded-[2px]" role="radiogroup" aria-label="Booking duration">
          {[1, 2, 3, 4].map((hours) => {
            const isSelected = durationHours === hours;
            return (
              <button
                key={hours}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onDurationChange(hours)}
                className={`py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[2px] transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  isSelected
                    ? 'bg-accent text-background shadow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
                }`}
              >
                {hours}h
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Start Time Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Start Time</span>
          </label>
          <span className="text-[11px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-[2px]">
            Asia/Manila (PHT)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time24;
            const disabled = slot.isUnavailable;

            return (
              <button
                key={slot.time24}
                type="button"
                disabled={disabled}
                aria-disabled={disabled}
                aria-pressed={isSelected}
                onClick={() => onTimeChange(slot.time24)}
                className={`relative py-3 px-2 rounded-[2px] text-xs font-heading font-medium border text-center transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  disabled
                    ? 'border-border/40 bg-surface/50 text-muted-foreground/40 cursor-not-allowed line-through'
                    : isSelected
                    ? 'border-accent bg-accent text-background font-bold shadow'
                    : 'border-border bg-surface text-foreground hover:border-border/90 hover:bg-surface-raised'
                }`}
              >
                <span className="font-tabular">{slot.label}</span>
                {disabled && (
                  <span className="block text-[9px] uppercase tracking-wider font-mono text-destructive/80 no-underline mt-0.5">
                    <Ban className="w-2.5 h-2.5 inline mr-1" />
                    Held
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
