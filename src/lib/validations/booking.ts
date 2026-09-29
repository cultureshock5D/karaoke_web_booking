import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(16, 'Phone number too long')
    .regex(/^(?:\+63|0)?9\d{9}$/, 'Please enter a valid Philippine mobile number (e.g., 09171234567 or +639171234567)'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export const addOnSelectionSchema = z.object({
  addOnId: z.string().min(1, 'Add-on ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(20, 'Max quantity exceeded'),
});

export const createBookingSchema = z.object({
  venueId: z.string().min(1, 'Venue ID is required'),
  roomId: z.string().min(1, 'Room ID is required'),
  startDateTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid start date and time format',
  }),
  durationHours: z
    .number()
    .min(1, 'Minimum booking duration is 1 hour')
    .max(12, 'Maximum booking duration is 12 hours'),
  guestCount: z.number().int().min(1, 'At least 1 guest is required').max(100, 'Invalid guest count'),
  customer: customerSchema,
  addOns: z.array(addOnSelectionSchema).optional().default([]),
});

export const venueSetupSchema = z.object({
  name: z.string().min(2, 'Venue name is required').max(100),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and dashes'),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(7),
  address: z.string().min(5),
  timezone: z.string().default('Asia/Manila'),
  depositType: z.enum(['percentage', 'fixed']).default('fixed'),
  depositValue: z.number().min(100, 'Minimum deposit for PayMongo is ₱100').default(300),
  holdDurationMinutes: z.number().min(10).max(60).default(15),
  openingHour: z.number().int().min(0).max(23).default(13), // 1 PM
  closingHour: z.number().int().min(0).max(23).default(2), // 2 AM next day
  slotIntervalMinutes: z.union([z.literal(30), z.literal(60)]).default(60),
});

export const roomSchema = z.object({
  venueId: z.string().min(1),
  name: z.string().min(2).max(100),
  capacityMin: z.number().int().min(1).default(1),
  capacityMax: z.number().int().min(1).max(100),
  baseHourlyRate: z.number().min(0, 'Hourly rate cannot be negative'),
  description: z.string().max(1000).default(''),
  photos: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type CustomerSchemaInput = z.infer<typeof customerSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type VenueSetupInput = z.infer<typeof venueSetupSchema>;
export type RoomInput = z.infer<typeof roomSchema>;
