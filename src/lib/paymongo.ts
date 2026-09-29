import crypto from 'crypto';
import { Booking, Venue } from '@/types';
import { APP_CONFIG } from './appwrite/config';

const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';

export interface PayMongoCheckoutSessionResponse {
  id: string;
  type: string;
  attributes: {
    checkout_url: string;
    status: string;
    payment_intent?: {
      id: string;
      attributes: {
        status: string;
      };
    };
    payments?: any[];
  };
}

/**
 * Creates a PayMongo Hosted Checkout Session (v2).
 * Amount must be specified in Philippine centavos (1 PHP = 100 centavos).
 */
export async function createCheckoutSession(
  booking: Booking,
  venue: Venue,
  roomName: string
): Promise<{ checkoutUrl: string; checkoutSessionId: string }> {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  if (!secretKey) {
    throw new Error('PAYMONGO_SECRET_KEY is not configured in environment variables.');
  }

  const depositAmountPhp = booking.pricing.depositRequired;
  if (depositAmountPhp < APP_CONFIG.minDepositPhp) {
    throw new Error(`PayMongo requires a minimum transaction of ₱${APP_CONFIG.minDepositPhp}.`);
  }

  // PayMongo expects amounts in centavos
  const amountInCentavos = Math.round(depositAmountPhp * 100);

  const authHeader = `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`;

  const payload = {
    data: {
      attributes: {
        send_email_receipt: true,
        show_description: true,
        show_line_items: true,
        description: `Reservation Deposit for ${roomName} at ${venue.name} (${booking.bookingReference})`,
        line_items: [
          {
            currency: 'PHP',
            amount: amountInCentavos,
            name: `${venue.name} - ${roomName} Deposit`,
            quantity: 1,
            description: `Reference: ${booking.bookingReference} | Held for ${venue.holdDurationMinutes || 15} mins`,
          },
        ],
        payment_method_types: [
          'card',
          'gcash',
          'paymaya',
          'grab_pay',
          'qrph',
        ],
        success_url: `${APP_CONFIG.url}/book/success?token=${booking.magicLinkToken}&ref=${booking.bookingReference}`,
        cancel_url: `${APP_CONFIG.url}/book/cancelled?token=${booking.magicLinkToken}&ref=${booking.bookingReference}`,
        metadata: {
          bookingId: booking.$id,
          bookingReference: booking.bookingReference,
          venueId: venue.$id,
          magicLinkToken: booking.magicLinkToken,
        },
      },
    },
  };

  const res = await fetch(`${PAYMONGO_API_URL}/checkout_sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('PayMongo checkout session creation failed:', json);
    throw new Error(json.errors?.[0]?.detail || 'Failed to create PayMongo checkout session');
  }

  return {
    checkoutUrl: json.data.attributes.checkout_url,
    checkoutSessionId: json.data.id,
  };
}

/**
 * Validates the PayMongo webhook signature header.
 * PayMongo headers format: "t=1498524670,te=...,li=..."
 */
export function verifyPayMongoSignature(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string = process.env.PAYMONGO_WEBHOOK_SECRET || ''
): boolean {
  if (!signatureHeader || !webhookSecret) return false;

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let testSignature = '';
  let liveSignature = '';

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 't') timestamp = value;
    else if (key === 'te') testSignature = value;
    else if (key === 'li') liveSignature = value;
  }

  if (!timestamp) return false;

  // PayMongo signs `${timestamp}.${rawBody}`
  const signaturePayload = `${timestamp}.${rawBody}`;
  const computedHash = crypto
    .createHmac('sha256', webhookSecret)
    .update(signaturePayload)
    .digest('hex');

  const safeCompare = (a: string, b: string): boolean => {
    try {
      const bufA = Buffer.from(a);
      const bufB = Buffer.from(b);
      if (bufA.byteLength !== bufB.byteLength) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  };

  // Match either test or live signature
  if (testSignature && safeCompare(computedHash, testSignature)) {
    return true;
  }
  if (liveSignature && safeCompare(computedHash, liveSignature)) {
    return true;
  }

  return false;
}
