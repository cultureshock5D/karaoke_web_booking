export type BookingStatus = 'holding' | 'confirmed' | 'cancelled' | 'completed' | 'expired';

export type SlotStatus = 'held' | 'confirmed' | 'released';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethodType = 'gcash' | 'card' | 'paymaya' | 'grab_pay' | 'qrph';

export type DepositType = 'percentage' | 'fixed';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingAddOnItem {
  addOnId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BookingPricingBreakdown {
  baseRatePerHour: number;
  durationHours: number;
  roomTotal: number;
  addOnsTotal: number;
  discount: number;
  grandTotal: number;
  depositRequired: number;
  depositPaid: number;
  balanceRemaining: number;
}

export interface PaymentDetails {
  provider: 'paymongo';
  status: PaymentStatus;
  checkoutSessionId?: string;
  paymentIntentId?: string;
  checkoutUrl?: string;
  amount: number; // In PHP
  depositAmount: number;
  paidAt?: string;
  paymentMethod?: PaymentMethodType;
  referenceNumber?: string;
}

export interface Venue {
  $id: string;
  teamId: string;
  name: string;
  slug: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  timezone: string; // e.g. "Asia/Manila"
  currency: 'PHP';
  depositType: DepositType;
  depositValue: number; // e.g. 20 (percent) or 300 (fixed PHP)
  holdDurationMinutes: number; // e.g. 15-20 min
  openingHour: number; // 0-23 (e.g. 14 for 2 PM)
  closingHour: number; // 0-23 (e.g. 2 for 2 AM next day)
  slotIntervalMinutes: number; // standard 30 or 60 min blocks
  logoUrl?: string;
  coverImageUrl?: string;
  isActive: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Room {
  $id: string;
  venueId: string;
  name: string;
  slug?: string;
  capacityMin: number;
  capacityMax: number;
  baseHourlyRate: number; // in PHP
  description: string;
  photos: string[];
  features: string[];
  isActive: boolean;
  sortOrder: number;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface PricingRule {
  $id: string;
  venueId: string;
  name: string;
  ruleType: 'peak' | 'off_peak' | 'weekend' | 'holiday';
  dayOfWeek: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  startHour: number; // 0-23
  endHour: number; // 0-23
  rateMultiplier?: number; // e.g. 1.25 (+25%)
  overrideHourlyRate?: number; // e.g. 800 PHP fixed
  minHours: number; // minimum required booking duration for this window
  isActive: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface BlackoutDate {
  $id: string;
  venueId: string;
  roomId?: string | null; // null means entire venue blocked
  startDate: string; // ISO 8601 UTC
  endDate: string; // ISO 8601 UTC
  reason: string;
  $createdAt?: string;
}

export interface AddOn {
  $id: string;
  venueId: string;
  name: string;
  description: string;
  price: number; // in PHP
  maxQuantity: number;
  category?: 'equipment' | 'food' | 'beverage' | 'party_props';
  isActive: boolean;
  sortOrder: number;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Slot {
  $id: string;
  slotKey: string; // UNIQUE INDEX: `${roomId}_${slotStartUtc}`
  roomId: string;
  venueId: string;
  bookingId: string;
  slotStart: string; // ISO 8601 UTC
  slotEnd: string; // ISO 8601 UTC
  status: SlotStatus;
  heldUntil: string; // ISO 8601 UTC
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Booking {
  $id: string;
  venueId: string;
  roomId: string;
  bookingReference: string; // Friendly code e.g. KTV-8921-X
  status: BookingStatus;
  startDateTime: string; // ISO 8601 UTC
  endDateTime: string; // ISO 8601 UTC
  durationHours: number;
  guestCount: number;
  customer: CustomerInfo;
  addOns: BookingAddOnItem[];
  pricing: BookingPricingBreakdown;
  payment: PaymentDetails;
  heldUntil: string; // ISO 8601 UTC
  magicLinkToken: string;
  cancellationReason?: string;
  notes?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface CreateBookingRequest {
  venueId: string;
  roomId: string;
  startDateTime: string; // ISO string in UTC or formatted local with timezone
  durationHours: number;
  guestCount: number;
  customer: CustomerInfo;
  addOns?: { addOnId: string; quantity: number }[];
}

export interface CreateBookingResponse {
  success: boolean;
  bookingId?: string;
  bookingReference?: string;
  checkoutUrl?: string;
  heldUntil?: string;
  error?: string;
  conflictSlots?: string[];
}
