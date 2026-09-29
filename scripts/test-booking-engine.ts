import assert from 'assert';
import crypto from 'crypto';
import {
  generateSlotsForBooking,
  calculateHoldExpiration,
  isHoldExpired,
  formatBookingInterval,
  localToUtcIso,
} from '../src/lib/datetime';
import { calculatePricing, generateBookingReference } from '../src/lib/booking-engine';
import { verifyPayMongoSignature } from '../src/lib/paymongo';
import { Room, Venue, BookingAddOnItem } from '../src/types';

console.log('🧪 Running Karaoke Booking System Core Logic Tests...\n');

// Test 1: generateSlotsForBooking creates exact discrete slot intervals and unique composite keys
{
  const roomId = 'room_vip_1';
  const startUtc = '2026-10-15T11:00:00.000Z'; // 11:00 UTC (7:00 PM Manila)
  const durationHours = 2;
  const intervalMinutes = 60;

  const slots = generateSlotsForBooking(roomId, startUtc, durationHours, intervalMinutes);
  assert.strictEqual(slots.length, 2, 'Should generate exactly 2 one-hour slots for a 2-hour duration');
  assert.strictEqual(slots[0].slotKey, `room_vip_1_2026-10-15T11:00:00.000Z`);
  assert.strictEqual(slots[1].slotKey, `room_vip_1_2026-10-15T12:00:00.000Z`);
  console.log('✓ Test 1 Passed: Discrete slot interval generation and unique composite keys');
}

// Test 2: calculatePricing and PayMongo ₱100 minimum deposit rule
{
  const mockVenue: Venue = {
    $id: 'v1',
    teamId: 't1',
    name: 'Test KTV',
    slug: 'test-ktv',
    contactEmail: 'test@ktv.com',
    contactPhone: '09171234567',
    address: 'Makati',
    timezone: 'Asia/Manila',
    currency: 'PHP',
    depositType: 'percentage',
    depositValue: 10, // 10% of total
    holdDurationMinutes: 15,
    openingHour: 13,
    closingHour: 2,
    slotIntervalMinutes: 60,
    isActive: true,
  };

  const mockRoom: Room = {
    $id: 'r1',
    venueId: 'v1',
    name: 'Small Room',
    capacityMin: 1,
    capacityMax: 4,
    baseHourlyRate: 350,
    description: '',
    photos: [],
    features: [],
    isActive: true,
    sortOrder: 1,
  };

  const addOns: BookingAddOnItem[] = [
    {
      addOnId: 'a1',
      name: 'Beer Bucket',
      quantity: 1,
      unitPrice: 450,
      totalPrice: 450,
    },
  ];

  // 1 hour room (350) + beer bucket (450) = 800 PHP total
  // 10% deposit would be 80 PHP, but PayMongo enforces minimum ₱100!
  const pricing = calculatePricing(mockRoom, 1, addOns, mockVenue);
  assert.strictEqual(pricing.roomTotal, 350);
  assert.strictEqual(pricing.addOnsTotal, 450);
  assert.strictEqual(pricing.grandTotal, 800);
  assert.strictEqual(pricing.depositRequired, 100, 'Deposit must be clamped to ₱100 minimum for PayMongo');
  assert.strictEqual(pricing.balanceRemaining, 800);
  console.log('✓ Test 2 Passed: Pricing calculations and PayMongo ₱100 minimum deposit clamping');
}

// Test 3: verifyPayMongoSignature with HMAC SHA-256
{
  const secret = 'whsec_test_secret_key_12345';
  const rawBody = JSON.stringify({ data: { id: 'evt_123', attributes: { type: 'checkout_session.payment.paid' } } });
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const payload = `${timestamp}.${rawBody}`;
  const validHash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const validHeader = `t=${timestamp},te=${validHash}`;

  const isVerified = verifyPayMongoSignature(rawBody, validHeader, secret);
  assert.strictEqual(isVerified, true, 'Valid signature should verify successfully');

  const tamperedHeader = `t=${timestamp},te=fakehash1234567890abcdef`;
  const isRejected = verifyPayMongoSignature(rawBody, tamperedHeader, secret);
  assert.strictEqual(isRejected, false, 'Forged signature must be rejected');

  console.log('✓ Test 3 Passed: PayMongo webhook HMAC-SHA256 signature verification');
}

// Test 4: generateBookingReference format
{
  const ref1 = generateBookingReference();
  const ref2 = generateBookingReference();
  assert.match(ref1, /^KTV-[A-Z0-9]{3}-[A-Z0-9]{3}$/, 'Booking reference format must match KTV-XXX-XXX');
  assert.notStrictEqual(ref1, ref2, 'Booking references should be distinct');
  console.log(`✓ Test 4 Passed: Booking reference format (${ref1})`);
}

// Test 5: Hold expiration detection
{
  const futureIso = new Date(Date.now() + 60 * 1000).toISOString();
  const pastIso = new Date(Date.now() - 60 * 1000).toISOString();
  assert.strictEqual(isHoldExpired(futureIso), false, 'Future timestamp should not be expired');
  assert.strictEqual(isHoldExpired(pastIso), true, 'Past timestamp must be marked expired');
  console.log('✓ Test 5 Passed: Slot hold expiration comparison');
}

console.log('\n🎉 ALL 5 SUITE TESTS PASSED SUCCESSFULLY!\n');
