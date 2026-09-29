import { Client, Databases, Permission, Role, OrderBy } from 'node-appwrite';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'karaoke_db';
const API_KEY = process.env.APPWRITE_API_KEY || '';

if (!PROJECT_ID || !API_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID or APPWRITE_API_KEY in environment.');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDatabase() {
  console.log(`Checking database: ${DATABASE_ID}...`);
  try {
    await databases.get(DATABASE_ID);
    console.log(`✓ Database '${DATABASE_ID}' already exists.`);
  } catch (err: any) {
    if (err.code === 404) {
      console.log(`Creating database '${DATABASE_ID}'...`);
      await databases.create(DATABASE_ID, 'Karaoke Booking DB');
      console.log(`✓ Database '${DATABASE_ID}' created.`);
    } else {
      throw err;
    }
  }
}

async function ensureCollection(
  collectionId: string,
  name: string,
  permissions: string[] = []
) {
  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`✓ Collection '${name}' (${collectionId}) already exists.`);
  } catch (err: any) {
    if (err.code === 404) {
      console.log(`Creating collection '${name}' (${collectionId})...`);
      await databases.createCollection(
        DATABASE_ID,
        collectionId,
        name,
        permissions,
        true // documentSecurity: allow row/document-level permissions
      );
      console.log(`✓ Collection '${name}' created.`);
    } else {
      throw err;
    }
  }
}

async function createStringAttr(collectionId: string, key: string, size: number, required: boolean, def?: string) {
  try {
    await databases.createStringAttribute(DATABASE_ID, collectionId, key, size, required, def);
    console.log(`  + String attribute '${key}' created.`);
    await sleep(200);
  } catch (err: any) {
    if (err.code !== 409) console.warn(`  ! Attr '${key}': ${err.message}`);
  }
}

async function createIntegerAttr(collectionId: string, key: string, required: boolean, min?: number, max?: number, def?: number) {
  try {
    await databases.createIntegerAttribute(DATABASE_ID, collectionId, key, required, min, max, def);
    console.log(`  + Integer attribute '${key}' created.`);
    await sleep(200);
  } catch (err: any) {
    if (err.code !== 409) console.warn(`  ! Attr '${key}': ${err.message}`);
  }
}

async function createFloatAttr(collectionId: string, key: string, required: boolean, min?: number, max?: number, def?: number) {
  try {
    await databases.createFloatAttribute(DATABASE_ID, collectionId, key, required, min, max, def);
    console.log(`  + Float attribute '${key}' created.`);
    await sleep(200);
  } catch (err: any) {
    if (err.code !== 409) console.warn(`  ! Attr '${key}': ${err.message}`);
  }
}

async function createBooleanAttr(collectionId: string, key: string, required: boolean, def?: boolean) {
  try {
    await databases.createBooleanAttribute(DATABASE_ID, collectionId, key, required, def);
    console.log(`  + Boolean attribute '${key}' created.`);
    await sleep(200);
  } catch (err: any) {
    if (err.code !== 409) console.warn(`  ! Attr '${key}': ${err.message}`);
  }
}

async function createIndex(collectionId: string, key: string, type: 'key' | 'unique' | 'fulltext', attributes: string[], orders: OrderBy[] = [OrderBy.Asc]) {
  try {
    await databases.createIndex(DATABASE_ID, collectionId, key, type as any, attributes, orders);
    console.log(`  * Index '${key}' (${type}) created on [${attributes.join(', ')}].`);
    await sleep(300);
  } catch (err: any) {
    if (err.code !== 409) console.warn(`  ! Index '${key}': ${err.message}`);
  }
}

export async function setupSchema() {
  console.log('🚀 Starting Appwrite TablesDB Schema Provisioning...\n');
  await ensureDatabase();

  // 1. VENUES
  await ensureCollection('venues', 'Venues', [
    Permission.read(Role.any()), // Public can read venue details for booking
  ]);
  await createStringAttr('venues', 'teamId', 64, true);
  await createStringAttr('venues', 'name', 128, true);
  await createStringAttr('venues', 'slug', 64, true);
  await createStringAttr('venues', 'contactEmail', 128, true);
  await createStringAttr('venues', 'contactPhone', 32, true);
  await createStringAttr('venues', 'address', 255, true);
  await createStringAttr('venues', 'timezone', 64, false, 'Asia/Manila');
  await createStringAttr('venues', 'currency', 10, false, 'PHP');
  await createStringAttr('venues', 'depositType', 16, false, 'fixed');
  await createFloatAttr('venues', 'depositValue', false, 0, undefined, 300);
  await createIntegerAttr('venues', 'holdDurationMinutes', false, 10, 60, 15);
  await createIntegerAttr('venues', 'openingHour', false, 0, 23, 13);
  await createIntegerAttr('venues', 'closingHour', false, 0, 23, 2);
  await createIntegerAttr('venues', 'slotIntervalMinutes', false, 15, 120, 60);
  await createStringAttr('venues', 'logoUrl', 512, false);
  await createStringAttr('venues', 'coverImageUrl', 512, false);
  await createBooleanAttr('venues', 'isActive', false, true);
  await createIndex('venues', 'idx_venues_slug', 'unique', ['slug']);

  // 2. ROOMS
  await ensureCollection('rooms', 'Rooms', [
    Permission.read(Role.any()),
  ]);
  await createStringAttr('rooms', 'venueId', 64, true);
  await createStringAttr('rooms', 'name', 100, true);
  await createStringAttr('rooms', 'slug', 64, false);
  await createIntegerAttr('rooms', 'capacityMin', false, 1, 100, 1);
  await createIntegerAttr('rooms', 'capacityMax', true, 1, 100);
  await createFloatAttr('rooms', 'baseHourlyRate', true, 0);
  await createStringAttr('rooms', 'description', 1000, false);
  await createBooleanAttr('rooms', 'isActive', false, true);
  await createIntegerAttr('rooms', 'sortOrder', false, 0, undefined, 0);
  await createIndex('rooms', 'idx_rooms_venue', 'key', ['venueId']);

  // 3. PRICING RULES
  await ensureCollection('pricing_rules', 'Pricing Rules', [
    Permission.read(Role.any()),
  ]);
  await createStringAttr('pricing_rules', 'venueId', 64, true);
  await createStringAttr('pricing_rules', 'name', 100, true);
  await createStringAttr('pricing_rules', 'ruleType', 32, true);
  await createIntegerAttr('pricing_rules', 'startHour', true, 0, 23);
  await createIntegerAttr('pricing_rules', 'endHour', true, 0, 23);
  await createFloatAttr('pricing_rules', 'rateMultiplier', false, 0);
  await createFloatAttr('pricing_rules', 'overrideHourlyRate', false, 0);
  await createIntegerAttr('pricing_rules', 'minHours', false, 1, 12, 1);
  await createBooleanAttr('pricing_rules', 'isActive', false, true);
  await createIndex('pricing_rules', 'idx_rules_venue', 'key', ['venueId']);

  // 4. BLACKOUT DATES
  await ensureCollection('blackout_dates', 'Blackout Dates', [
    Permission.read(Role.any()),
  ]);
  await createStringAttr('blackout_dates', 'venueId', 64, true);
  await createStringAttr('blackout_dates', 'roomId', 64, false);
  await createStringAttr('blackout_dates', 'startDate', 64, true);
  await createStringAttr('blackout_dates', 'endDate', 64, true);
  await createStringAttr('blackout_dates', 'reason', 255, false);
  await createIndex('blackout_dates', 'idx_blackout_venue', 'key', ['venueId']);

  // 5. ADD-ONS
  await ensureCollection('addons', 'Add-Ons', [
    Permission.read(Role.any()),
  ]);
  await createStringAttr('addons', 'venueId', 64, true);
  await createStringAttr('addons', 'name', 100, true);
  await createStringAttr('addons', 'description', 500, false);
  await createFloatAttr('addons', 'price', true, 0);
  await createIntegerAttr('addons', 'maxQuantity', false, 1, 50, 10);
  await createStringAttr('addons', 'category', 32, false, 'equipment');
  await createBooleanAttr('addons', 'isActive', false, true);
  await createIntegerAttr('addons', 'sortOrder', false, 0, undefined, 0);
  await createIndex('addons', 'idx_addons_venue', 'key', ['venueId']);

  // 6. SLOTS (THE DOUBLE-BOOKING GUARANTEE LAYER)
  await ensureCollection('slots', 'Slots', [
    Permission.read(Role.any()), // Customers can view slot availability in realtime
  ]);
  await createStringAttr('slots', 'slotKey', 128, true); // roomId + slotStart
  await createStringAttr('slots', 'roomId', 64, true);
  await createStringAttr('slots', 'venueId', 64, true);
  await createStringAttr('slots', 'bookingId', 64, true);
  await createStringAttr('slots', 'slotStart', 64, true);
  await createStringAttr('slots', 'slotEnd', 64, true);
  await createStringAttr('slots', 'status', 32, true); // 'held' | 'confirmed' | 'released'
  await createStringAttr('slots', 'heldUntil', 64, true);
  
  // PRIMARY DOUBLE-BOOKING DEFENSE: UNIQUE INDEX ON slotKey
  await createIndex('slots', 'idx_unique_slot_key', 'unique', ['slotKey']);
  await createIndex('slots', 'idx_slots_room_time', 'key', ['roomId', 'slotStart']);
  await createIndex('slots', 'idx_slots_held_until', 'key', ['heldUntil', 'status']);

  // 7. BOOKINGS
  await ensureCollection('bookings', 'Bookings', []);
  await createStringAttr('bookings', 'venueId', 64, true);
  await createStringAttr('bookings', 'roomId', 64, true);
  await createStringAttr('bookings', 'bookingReference', 64, true);
  await createStringAttr('bookings', 'status', 32, true);
  await createStringAttr('bookings', 'startDateTime', 64, true);
  await createStringAttr('bookings', 'endDateTime', 64, true);
  await createFloatAttr('bookings', 'durationHours', true, 1, 24);
  await createIntegerAttr('bookings', 'guestCount', true, 1, 100);
  await createStringAttr('bookings', 'customer', 2000, true); // Serialized JSON
  await createStringAttr('bookings', 'addOns', 4000, false, '[]'); // Serialized JSON
  await createStringAttr('bookings', 'pricing', 2000, true); // Serialized JSON
  await createStringAttr('bookings', 'payment', 2000, true); // Serialized JSON
  await createStringAttr('bookings', 'heldUntil', 64, true);
  await createStringAttr('bookings', 'magicLinkToken', 128, true);
  await createStringAttr('bookings', 'cancellationReason', 500, false);
  await createStringAttr('bookings', 'notes', 1000, false);

  await createIndex('bookings', 'idx_booking_ref', 'unique', ['bookingReference']);
  await createIndex('bookings', 'idx_booking_magic_link', 'unique', ['magicLinkToken']);
  await createIndex('bookings', 'idx_bookings_venue_status', 'key', ['venueId', 'status']);

  console.log('\n✅ All collections, attributes, and unique indexes are defined!');
}

if (require.main === module) {
  setupSchema().catch((err) => {
    console.error('Fatal schema setup error:', err);
    process.exit(1);
  });
}
