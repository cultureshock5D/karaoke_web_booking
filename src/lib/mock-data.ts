import { AddOn, PricingRule, Room, Venue } from '@/types';

export const SAMPLE_VENUE: Venue = {
  $id: 'venue_neon_melody',
  teamId: 'team_neon_melody',
  name: 'Neon Melody KTV Lounge',
  slug: 'neon-melody',
  contactEmail: 'bookings@neonmelody.ph',
  contactPhone: '+63 917 555 8899',
  address: '4th Floor, City Walk Mall, Bonifacio Global City, Taguig, Metro Manila',
  timezone: 'Asia/Manila',
  currency: 'PHP',
  depositType: 'fixed',
  depositValue: 300, // ₱300 deposit
  holdDurationMinutes: 15,
  openingHour: 13, // 1:00 PM
  closingHour: 3, // 3:00 AM next day
  slotIntervalMinutes: 60,
  logoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=160&auto=format&fit=crop&q=80',
  coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
  isActive: true,
};

export const SAMPLE_ROOMS: Room[] = [
  {
    $id: 'room_cozy_duo',
    venueId: 'venue_neon_melody',
    name: 'Neon Studio (Cozy Duo)',
    slug: 'neon-studio',
    capacityMin: 1,
    capacityMax: 4,
    baseHourlyRate: 350,
    description: 'Perfect for couples and small friend groups. Equipped with dual wireless mics and laser ambient lighting.',
    photos: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
    ],
    features: ['2 Wireless Mics', '55" 4K Smart Display', 'Touch Songbook Screen', 'Air Conditioned'],
    isActive: true,
    sortOrder: 1,
  },
  {
    $id: 'room_vip_lounge',
    venueId: 'venue_neon_melody',
    name: 'VIP Galactic Suite',
    slug: 'vip-galactic-suite',
    capacityMin: 5,
    capacityMax: 12,
    baseHourlyRate: 750,
    description: 'Our most popular room! Luxurious plush leather seating, soundproof acoustics, and customized disco lighting.',
    photos: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    ],
    features: ['4 Wireless Mics', '75" 4K OLED TV', 'JBL Pro Sound System', 'Private Intercom for Drinks', 'Dedicated Aircon'],
    isActive: true,
    sortOrder: 2,
  },
  {
    $id: 'room_penthouse_party',
    venueId: 'venue_neon_melody',
    name: 'The Mega Starlight Hall',
    slug: 'mega-starlight-hall',
    capacityMin: 10,
    capacityMax: 30,
    baseHourlyRate: 1500,
    description: 'The ultimate party destination for birthdays, corporate celebrations, and epic karaoke showdowns. Features private bar counter.',
    photos: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    ],
    features: ['6 Wireless Mics', 'Dual 85" Screens', 'Stage & Spotlight', 'Private Restroom', 'Beer Tap Bar Counter'],
    isActive: true,
    sortOrder: 3,
  },
];

export const SAMPLE_ADDONS: AddOn[] = [
  {
    $id: 'addon_beer_bucket',
    venueId: 'venue_neon_melody',
    name: 'San Mig Light Ice Bucket (6 Bottles)',
    description: 'Ice-cold bucket with complimentary bar peanuts.',
    price: 490,
    maxQuantity: 5,
    category: 'beverage',
    isActive: true,
    sortOrder: 1,
  },
  {
    $id: 'addon_crispy_pata_bundle',
    venueId: 'venue_neon_melody',
    name: 'Crispy Pata & Nacho Platter Combo',
    description: 'Jumbo deep-fried pork knuckle with loaded cheesy beef nachos.',
    price: 850,
    maxQuantity: 3,
    category: 'food',
    isActive: true,
    sortOrder: 2,
  },
  {
    $id: 'addon_extra_mic',
    venueId: 'venue_neon_melody',
    name: 'Extra Shure Wireless Microphone',
    description: 'Additional sanitized wireless microphone with fresh batteries.',
    price: 150,
    maxQuantity: 2,
    category: 'equipment',
    isActive: true,
    sortOrder: 3,
  },
  {
    $id: 'addon_party_props',
    venueId: 'venue_neon_melody',
    name: 'Party Glow Pack & Tambourines',
    description: '4 LED glow tambourines, party hats, and neon wristbands for your crew.',
    price: 250,
    maxQuantity: 4,
    category: 'party_props',
    isActive: true,
    sortOrder: 4,
  },
];

export const SAMPLE_PRICING_RULES: PricingRule[] = [
  {
    $id: 'rule_weekend_prime',
    venueId: 'venue_neon_melody',
    name: 'Friday & Saturday Peak',
    ruleType: 'peak',
    dayOfWeek: [5, 6], // Fri, Sat
    startHour: 18, // 6 PM
    endHour: 2, // 2 AM
    rateMultiplier: 1.2, // +20%
    minHours: 2, // 2-hour minimum
    isActive: true,
  },
];
