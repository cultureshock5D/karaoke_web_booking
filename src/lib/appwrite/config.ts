export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'karaoke_db',
  apiKey: process.env.APPWRITE_API_KEY || '',
  collections: {
    venues: 'venues',
    rooms: 'rooms',
    pricingRules: 'pricing_rules',
    blackoutDates: 'blackout_dates',
    addOns: 'addons',
    slots: 'slots',
    bookings: 'bookings',
  },
  buckets: {
    media: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MEDIA || 'venue_media',
  },
} as const;

export const APP_CONFIG = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  defaultTimezone: process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || 'Asia/Manila',
  holdDurationMinutes: Number(process.env.SLOT_HOLD_MINUTES) || 15,
  minDepositPhp: Number(process.env.MINIMUM_BOOKING_DEPOSIT_PHP) || 100,
} as const;
