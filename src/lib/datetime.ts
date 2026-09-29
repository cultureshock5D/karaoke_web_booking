import { format, parseISO, addMinutes, addHours, isBefore, isAfter, areIntervalsOverlapping } from 'date-fns';
import { toZonedTime, fromZonedTime, formatInTimeZone } from 'date-fns-tz';

export const DEFAULT_TIMEZONE = process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || 'Asia/Manila';

/**
 * Converts a UTC ISO string into formatted display text in the target timezone.
 * e.g. "Sat, Oct 12, 2026 - 7:00 PM"
 */
export function formatLocalTime(
  utcIsoString: string,
  formatPattern: string = 'EEE, MMM d, yyyy • h:mm a',
  timeZone: string = DEFAULT_TIMEZONE
): string {
  try {
    return formatInTimeZone(parseISO(utcIsoString), timeZone, formatPattern);
  } catch {
    return utcIsoString;
  }
}

/**
 * Format a start and end time range for customer display.
 * e.g. "Saturday, Oct 12, 2026 • 7:00 PM - 10:00 PM"
 */
export function formatBookingInterval(
  startUtcIso: string,
  endUtcIso: string,
  timeZone: string = DEFAULT_TIMEZONE
): string {
  try {
    const startDate = parseISO(startUtcIso);
    const endDate = parseISO(endUtcIso);
    const datePart = formatInTimeZone(startDate, timeZone, 'EEEE, MMMM d, yyyy');
    const startTimePart = formatInTimeZone(startDate, timeZone, 'h:mm a');
    const endTimePart = formatInTimeZone(endDate, timeZone, 'h:mm a');
    return `${datePart} • ${startTimePart} – ${endTimePart}`;
  } catch {
    return `${startUtcIso} - ${endUtcIso}`;
  }
}

/**
 * Converts a local date string (e.g. "2026-10-15 19:00") in the venue's timezone to a UTC ISO string for database storage.
 */
export function localToUtcIso(localDateTimeString: string, timeZone: string = DEFAULT_TIMEZONE): string {
  const zonedDate = fromZonedTime(localDateTimeString, timeZone);
  return zonedDate.toISOString();
}

/**
 * Generates discrete slot time boundaries for a booking.
 * For example, a 2-hour booking starting at 19:00 with 60-min interval will return 2 slots:
 * [19:00 - 20:00, 20:00 - 21:00].
 */
export interface GeneratedSlot {
  slotStart: string; // ISO UTC
  slotEnd: string; // ISO UTC
  slotKey: string; // Unique identifier: `${roomId}_${slotStartUtc}`
}

export function generateSlotsForBooking(
  roomId: string,
  startUtcIso: string,
  durationHours: number,
  intervalMinutes: number = 60
): GeneratedSlot[] {
  const startDate = parseISO(startUtcIso);
  const totalMinutes = durationHours * 60;
  const slotCount = Math.ceil(totalMinutes / intervalMinutes);
  const slots: GeneratedSlot[] = [];

  for (let i = 0; i < slotCount; i++) {
    const currentSlotStart = addMinutes(startDate, i * intervalMinutes);
    const currentSlotEnd = addMinutes(currentSlotStart, intervalMinutes);
    const startIso = currentSlotStart.toISOString();
    const endIso = currentSlotEnd.toISOString();

    slots.push({
      slotStart: startIso,
      slotEnd: endIso,
      slotKey: `${roomId}_${startIso}`,
    });
  }

  return slots;
}

/**
 * Calculates the hold expiry timestamp (e.g., 15 minutes from now in UTC).
 */
export function calculateHoldExpiration(holdMinutes: number = 15): string {
  const now = new Date();
  const expiresAt = addMinutes(now, holdMinutes);
  return expiresAt.toISOString();
}

/**
 * Checks if a slot hold is currently expired.
 */
export function isHoldExpired(heldUntilUtcIso?: string): boolean {
  if (!heldUntilUtcIso) return true;
  return isBefore(parseISO(heldUntilUtcIso), new Date());
}
