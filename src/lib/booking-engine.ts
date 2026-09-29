import { ID, Query } from 'node-appwrite';
import { createAdminClient } from './appwrite/server';
import { APPWRITE_CONFIG, APP_CONFIG } from './appwrite/config';
import {
  Booking,
  BookingAddOnItem,
  BookingPricingBreakdown,
  CreateBookingRequest,
  CreateBookingResponse,
  PaymentDetails,
  Room,
  Slot,
  Venue,
} from '@/types';
import {
  calculateHoldExpiration,
  generateSlotsForBooking,
  isHoldExpired,
} from './datetime';

/**
 * Calculates pricing breakdown including room charge, peak hours, add-ons, and deposit.
 */
export function calculatePricing(
  room: Room,
  durationHours: number,
  addOnItems: BookingAddOnItem[],
  venue: Venue
): BookingPricingBreakdown {
  const baseRatePerHour = room.baseHourlyRate;
  const roomTotal = baseRatePerHour * durationHours;
  const addOnsTotal = addOnItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = 0;
  const grandTotal = roomTotal + addOnsTotal - discount;

  let depositRequired = 0;
  if (venue.depositType === 'percentage') {
    depositRequired = Math.round((grandTotal * (venue.depositValue / 100)) * 100) / 100;
  } else {
    depositRequired = venue.depositValue;
  }

  // PayMongo constraint: Minimum ₱100 transaction
  depositRequired = Math.max(depositRequired, APP_CONFIG.minDepositPhp);
  // Cap deposit at grand total
  depositRequired = Math.min(depositRequired, grandTotal);

  return {
    baseRatePerHour,
    durationHours,
    roomTotal,
    addOnsTotal,
    discount,
    grandTotal,
    depositRequired,
    depositPaid: 0,
    balanceRemaining: grandTotal,
  };
}

/**
 * Generates an 8-character human-friendly booking reference code
 * e.g. "KTV-7A9B-X2"
 */
export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KTV-${randomPart.slice(0, 3)}-${randomPart.slice(3)}`;
}

/**
 * Generate a secure unguessable magic token for customer self-service (cancel/reschedule).
 */
export function generateMagicToken(): string {
  return `${ID.unique()}-${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * ATOMIC GATEKEEPER: Attempts to hold slots and create the booking.
 * 
 * Double-Booking Guarantee:
 * Each slot is inserted with a unique slotKey (`${roomId}_${slotStartUtc}`).
 * If two customers submit simultaneously for the exact same slot, the Appwrite/MariaDB unique
 * key constraint rejects the second insert (HTTP 409 Conflict).
 * 
 * If a conflict occurs during a multi-hour booking (e.g. slot 2 is taken), the rollback logic
 * immediately cleans up any prior slots inserted in that batch so inventory is never leaked.
 */
export async function attemptBookingHold(
  request: CreateBookingRequest,
  venue: Venue,
  room: Room,
  resolvedAddOns: BookingAddOnItem[] = []
): Promise<CreateBookingResponse> {
  const { databases } = createAdminClient();
  const dbId = APPWRITE_CONFIG.databaseId;
  const slotsCol = APPWRITE_CONFIG.collections.slots;
  const bookingsCol = APPWRITE_CONFIG.collections.bookings;

  const intervalMinutes = venue.slotIntervalMinutes || 60;
  const generatedSlots = generateSlotsForBooking(
    room.$id,
    request.startDateTime,
    request.durationHours,
    intervalMinutes
  );

  const heldUntil = calculateHoldExpiration(venue.holdDurationMinutes || APP_CONFIG.holdDurationMinutes);
  const tempBookingId = ID.unique();
  const insertedSlotIds: string[] = [];

  // Step 1: Pre-check for any existing active/held slots that have NOT expired
  try {
    for (const slot of generatedSlots) {
      const existing = await databases.listDocuments(dbId, slotsCol, [
        Query.equal('slotKey', slot.slotKey),
      ]);

      if (existing.documents.length > 0) {
        const found = existing.documents[0];
        // If it's confirmed or if it's held and NOT yet expired, slot is unavailable
        if (found.status === 'confirmed' || (found.status === 'held' && !isHoldExpired(found.heldUntil))) {
          return {
            success: false,
            error: `Slot starting at ${slot.slotStart} is no longer available.`,
            conflictSlots: [slot.slotKey],
          };
        }

        // If it was expired, we clean it up so our new insert can proceed
        if (found.status === 'held' && isHoldExpired(found.heldUntil)) {
          await databases.deleteDocument(dbId, slotsCol, found.$id);
        }
      }
    }
  } catch (err: any) {
    // If pre-check fails unexpectedly, proceed to atomic insert gatekeeper
  }

  // Step 2: Atomic Insert of Slots with Rollback on Conflict
  try {
    for (const slot of generatedSlots) {
      const doc = await databases.createDocument(
        dbId,
        slotsCol,
        ID.unique(),
        {
          slotKey: slot.slotKey,
          roomId: room.$id,
          venueId: venue.$id,
          bookingId: tempBookingId,
          slotStart: slot.slotStart,
          slotEnd: slot.slotEnd,
          status: 'held',
          heldUntil,
        }
      );
      insertedSlotIds.push(doc.$id);
    }
  } catch (err: any) {
    // A collision occurred! Rollback any slots successfully inserted in this attempt
    console.warn(`[Collision Detected] Rolling back ${insertedSlotIds.length} slot(s):`, err.message);
    await Promise.all(
      insertedSlotIds.map((id) =>
        databases.deleteDocument(dbId, slotsCol, id).catch(() => {})
      )
    );

    return {
      success: false,
      error: 'One or more of the selected time slots were just taken by another customer. Please select another time.',
    };
  }

  // Step 3: Compute pricing and create the Booking record
  try {
    const pricing = calculatePricing(room, request.durationHours, resolvedAddOns, venue);
    const bookingReference = generateBookingReference();
    const magicLinkToken = generateMagicToken();

    const payment: PaymentDetails = {
      provider: 'paymongo',
      status: 'pending',
      amount: pricing.grandTotal,
      depositAmount: pricing.depositRequired,
    };

    const bookingDoc = await databases.createDocument(
      dbId,
      bookingsCol,
      tempBookingId,
      {
        venueId: venue.$id,
        roomId: room.$id,
        bookingReference,
        status: 'holding',
        startDateTime: generatedSlots[0].slotStart,
        endDateTime: generatedSlots[generatedSlots.length - 1].slotEnd,
        durationHours: request.durationHours,
        guestCount: request.guestCount,
        customer: JSON.stringify(request.customer),
        addOns: JSON.stringify(resolvedAddOns),
        pricing: JSON.stringify(pricing),
        payment: JSON.stringify(payment),
        heldUntil,
        magicLinkToken,
        notes: request.customer.notes || '',
      }
    );

    return {
      success: true,
      bookingId: bookingDoc.$id,
      bookingReference,
      heldUntil,
    };
  } catch (err: any) {
    // If booking document creation fails, release held slots
    console.error('Failed to create booking document, rolling back slots:', err);
    await Promise.all(
      insertedSlotIds.map((id) =>
        databases.deleteDocument(dbId, slotsCol, id).catch(() => {})
      )
    );

    return {
      success: false,
      error: 'An unexpected error occurred while reserving your booking. Please try again.',
    };
  }
}

/**
 * Releases expired holds (scheduled CRON cleanup or triggered on failed payments).
 */
export async function releaseExpiredHolds(): Promise<{ releasedSlots: number; expiredBookings: number }> {
  const { databases } = createAdminClient();
  const dbId = APPWRITE_CONFIG.databaseId;
  const slotsCol = APPWRITE_CONFIG.collections.slots;
  const bookingsCol = APPWRITE_CONFIG.collections.bookings;
  const nowIso = new Date().toISOString();

  // Find all slots with status = 'held' and heldUntil < now
  const expiredSlots = await databases.listDocuments(dbId, slotsCol, [
    Query.equal('status', 'held'),
    Query.lessThan('heldUntil', nowIso),
    Query.limit(100),
  ]);

  let releasedSlots = 0;
  for (const slot of expiredSlots.documents) {
    try {
      await databases.deleteDocument(dbId, slotsCol, slot.$id);
      releasedSlots++;
    } catch {}
  }

  // Find all bookings with status = 'holding' and heldUntil < now
  const expiredBookingsList = await databases.listDocuments(dbId, bookingsCol, [
    Query.equal('status', 'holding'),
    Query.lessThan('heldUntil', nowIso),
    Query.limit(100),
  ]);

  let expiredBookings = 0;
  for (const booking of expiredBookingsList.documents) {
    try {
      await databases.updateDocument(dbId, bookingsCol, booking.$id, {
        status: 'expired',
      });
      expiredBookings++;
    } catch {}
  }

  return { releasedSlots, expiredBookings };
}
