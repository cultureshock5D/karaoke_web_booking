import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';
import { APPWRITE_CONFIG } from '@/lib/appwrite/config';
import { createBookingSchema } from '@/lib/validations/booking';
import { attemptBookingHold } from '@/lib/booking-engine';
import { createCheckoutSession } from '@/lib/paymongo';
import { AddOn, BookingAddOnItem, Room, Venue } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = createBookingSchema.safeParse(json);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { databases } = createAdminClient();
    const dbId = APPWRITE_CONFIG.databaseId;

    // Fetch Venue
    let venue: Venue;
    try {
      const venueDoc = await databases.getDocument(
        dbId,
        APPWRITE_CONFIG.collections.venues,
        validated.data.venueId
      );
      venue = venueDoc as unknown as Venue;
    } catch {
      return NextResponse.json({ success: false, error: 'Venue not found' }, { status: 404 });
    }

    // Fetch Room
    let room: Room;
    try {
      const roomDoc = await databases.getDocument(
        dbId,
        APPWRITE_CONFIG.collections.rooms,
        validated.data.roomId
      );
      room = roomDoc as unknown as Room;
    } catch {
      return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
    }

    // Verify room belongs to venue
    if (room.venueId !== venue.$id) {
      return NextResponse.json({ success: false, error: 'Room does not belong to specified venue' }, { status: 400 });
    }

    // Verify guest count is within capacity
    if (validated.data.guestCount > room.capacityMax) {
      return NextResponse.json(
        { success: false, error: `Guest count exceeds room maximum capacity of ${room.capacityMax}` },
        { status: 400 }
      );
    }

    // Fetch and resolve selected add-ons
    const resolvedAddOns: BookingAddOnItem[] = [];
    if (validated.data.addOns && validated.data.addOns.length > 0) {
      for (const item of validated.data.addOns) {
        try {
          const addOnDoc = (await databases.getDocument(
            dbId,
            APPWRITE_CONFIG.collections.addOns,
            item.addOnId
          )) as unknown as AddOn;

          if (addOnDoc.venueId === venue.$id && addOnDoc.isActive) {
            resolvedAddOns.push({
              addOnId: addOnDoc.$id,
              name: addOnDoc.name,
              quantity: item.quantity,
              unitPrice: addOnDoc.price,
              totalPrice: addOnDoc.price * item.quantity,
            });
          }
        } catch {
          // Skip invalid add-ons
        }
      }
    }

    // Execute Atomic Slot Hold Gatekeeper
    const holdResult = await attemptBookingHold(validated.data, venue, room, resolvedAddOns);

    if (!holdResult.success || !holdResult.bookingId) {
      return NextResponse.json(
        {
          success: false,
          error: holdResult.error || 'Failed to hold requested slots',
          conflictSlots: holdResult.conflictSlots,
        },
        { status: 409 }
      );
    }

    // Retrieve the created booking document
    const bookingDoc = await databases.getDocument(
      dbId,
      APPWRITE_CONFIG.collections.bookings,
      holdResult.bookingId
    );
    const bookingData = {
      ...bookingDoc,
      pricing: JSON.parse(bookingDoc.pricing),
      payment: JSON.parse(bookingDoc.payment),
      customer: JSON.parse(bookingDoc.customer),
      addOns: JSON.parse(bookingDoc.addOns || '[]'),
    } as any;

    // Generate PayMongo Hosted Checkout v2 Session
    let checkoutUrl = '';
    try {
      const checkout = await createCheckoutSession(bookingData, venue, room.name);
      checkoutUrl = checkout.checkoutUrl;

      // Update booking with payment reference
      const updatedPayment = {
        ...bookingData.payment,
        checkoutSessionId: checkout.checkoutSessionId,
        checkoutUrl: checkout.checkoutUrl,
      };

      await databases.updateDocument(
        dbId,
        APPWRITE_CONFIG.collections.bookings,
        holdResult.bookingId,
        {
          payment: JSON.stringify(updatedPayment),
        }
      );
    } catch (paymongoErr: any) {
      console.error('PayMongo checkout creation error:', paymongoErr);
      // Even if PayMongo test keys are unconfigured, we return bookingId with fallback
      checkoutUrl = `/book/checkout-mock?bookingId=${holdResult.bookingId}&ref=${holdResult.bookingReference}`;
    }

    return NextResponse.json({
      success: true,
      bookingId: holdResult.bookingId,
      bookingReference: holdResult.bookingReference,
      checkoutUrl,
      heldUntil: holdResult.heldUntil,
    });
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
