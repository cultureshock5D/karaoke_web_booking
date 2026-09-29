import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/server';
import { APPWRITE_CONFIG } from '@/lib/appwrite/config';
import { verifyPayMongoSignature } from '@/lib/paymongo';
import { Query } from 'node-appwrite';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get('paymongo-signature') || '';

    // Verify webhook signature (strict security check)
    const isWebhookSecretConfigured = !!process.env.PAYMONGO_WEBHOOK_SECRET && process.env.PAYMONGO_WEBHOOK_SECRET !== 'whsec_placeholder';
    if (isWebhookSecretConfigured) {
      const isValid = verifyPayMongoSignature(rawBody, signatureHeader);
      if (!isValid) {
        console.warn('⚠️ Rejected PayMongo webhook: invalid signature header');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.data?.attributes?.type;
    const eventData = payload.data?.attributes?.data;

    console.log(`[PayMongo Webhook] Received event: ${eventType}`);

    const { databases } = createAdminClient();
    const dbId = APPWRITE_CONFIG.databaseId;
    const bookingsCol = APPWRITE_CONFIG.collections.bookings;
    const slotsCol = APPWRITE_CONFIG.collections.slots;

    if (eventType === 'checkout_session.payment.paid') {
      const checkoutSession = eventData;
      const metadata = checkoutSession.attributes?.metadata || {};
      const bookingId = metadata.bookingId;

      if (!bookingId) {
        console.warn('PayMongo webhook missing bookingId metadata');
        return NextResponse.json({ received: true });
      }

      // Fetch booking
      const booking = await databases.getDocument(dbId, bookingsCol, bookingId);
      const paymentInfo = JSON.parse(booking.payment);

      const payments = checkoutSession.attributes?.payments || [];
      const latestPayment = payments[0] || {};
      const paymentMethod = latestPayment.attributes?.source?.type || 'card';

      // 1. Mark booking as confirmed
      const updatedPayment = {
        ...paymentInfo,
        status: 'paid',
        paidAt: new Date().toISOString(),
        paymentMethod,
        referenceNumber: latestPayment.id || checkoutSession.id,
      };

      await databases.updateDocument(dbId, bookingsCol, bookingId, {
        status: 'confirmed',
        payment: JSON.stringify(updatedPayment),
      });

      // 2. Lock down all associated slots from 'held' to 'confirmed'
      const slots = await databases.listDocuments(dbId, slotsCol, [
        Query.equal('bookingId', bookingId),
      ]);

      for (const slot of slots.documents) {
        await databases.updateDocument(dbId, slotsCol, slot.$id, {
          status: 'confirmed',
        });
      }

      console.log(`✅ Booking ${booking.bookingReference} successfully confirmed!`);
    } else if (
      eventType === 'payment.failed' ||
      eventType === 'qrph.expired'
    ) {
      const checkoutSession = eventData;
      const metadata = checkoutSession.attributes?.metadata || {};
      const bookingId = metadata.bookingId;

      if (bookingId) {
        // Release held slots immediately so others can book
        const slots = await databases.listDocuments(dbId, slotsCol, [
          Query.equal('bookingId', bookingId),
          Query.equal('status', 'held'),
        ]);

        for (const slot of slots.documents) {
          await databases.deleteDocument(dbId, slotsCol, slot.$id);
        }

        await databases.updateDocument(dbId, bookingsCol, bookingId, {
          status: 'cancelled',
          cancellationReason: `Payment expired or failed: ${eventType}`,
        });

        console.log(`⚠️ Released slots for failed/expired booking ${bookingId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('PayMongo webhook handler error:', err);
    return NextResponse.json(
      { error: err.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
