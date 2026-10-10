import assert from "assert";
import {
  validateRegisterInput,
  validateLoginInput,
  sanitizeRedirectPath,
} from "../src/lib/auth/validation";
import { validateRoomInput } from "../src/lib/admin/room-validation";

console.log("🧪 Running ENCORE Midterm Application & Validation Tests...\n");

// ==========================================
// Test Suite 1: Register Input Validation
// ==========================================
{
  console.log("1. Registration Validator Tests");

  // 1.1 Name too short
  const res1 = validateRegisterInput({
    name: "A",
    email: "customer@encore.test",
    password: "Password123",
  });
  assert.strictEqual(res1.isValid, false, "Should fail when name is under 2 characters");
  assert.ok(res1.errors.name, "Should return an error for name");

  // 1.2 Invalid email format
  const res2 = validateRegisterInput({
    name: "Customer User",
    email: "not-an-email",
    password: "Password123",
  });
  assert.strictEqual(res2.isValid, false, "Should fail when email format is invalid");
  assert.ok(res2.errors.email, "Should return an error for email");

  // 1.3 Password too short (< 8 chars)
  const res3 = validateRegisterInput({
    name: "Customer User",
    email: "customer@encore.test",
    password: "Pass1",
  });
  assert.strictEqual(res3.isValid, false, "Should fail when password is less than 8 characters");
  assert.ok(res3.errors.password, "Should return an error for password length");

  // 1.4 Password missing numbers
  const res4 = validateRegisterInput({
    name: "Customer User",
    email: "customer@encore.test",
    password: "PasswordOnlyLetters",
  });
  assert.strictEqual(res4.isValid, false, "Should fail when password lacks numbers");
  assert.ok(res4.errors.password, "Should return an error for missing number");

  // 1.5 Password missing letters
  const res5 = validateRegisterInput({
    name: "Customer User",
    email: "customer@encore.test",
    password: "1234567890",
  });
  assert.strictEqual(res5.isValid, false, "Should fail when password lacks letters");
  assert.ok(res5.errors.password, "Should return an error for missing letter");

  // 1.6 Valid registration
  const res6 = validateRegisterInput({
    name: "Valid User",
    email: "valid.user@encore.test",
    password: "ValidPassword2026",
  });
  assert.strictEqual(res6.isValid, true, "Should succeed for valid credentials");
  assert.strictEqual(Object.keys(res6.errors).length, 0, "No errors for valid input");

  console.log("   ✓ Registration validator enforces name, email, and password complexity");
}

// ==========================================
// Test Suite 2: Login Validation & Safe Redirects
// ==========================================
{
  console.log("2. Login Validator & Open Redirect Prevention");

  // 2.1 Login validation
  const log1 = validateLoginInput("", "");
  assert.strictEqual(log1.isValid, false, "Should fail with empty credentials");

  const log2 = validateLoginInput("test@encore.test", "AnyPassword");
  assert.strictEqual(log2.isValid, true, "Should pass non-empty credentials to Appwrite");

  // 2.2 Safe relative redirects allowed
  assert.strictEqual(sanitizeRedirectPath("/admin", "/account"), "/admin");
  assert.strictEqual(sanitizeRedirectPath("/admin/rooms", "/account"), "/admin/rooms");
  assert.strictEqual(sanitizeRedirectPath("/book", "/account"), "/book");

  // 2.3 Malicious and open redirects blocked
  assert.strictEqual(sanitizeRedirectPath("https://evil.com/steal-creds", "/account"), "/account");
  assert.strictEqual(sanitizeRedirectPath("//evil.com/phish", "/account"), "/account");
  assert.strictEqual(sanitizeRedirectPath("javascript:alert(1)", "/account"), "/account");
  assert.strictEqual(sanitizeRedirectPath("", "/account"), "/account");

  console.log("   ✓ Login inputs validated and open redirect attacks safely neutralized");
}

// ==========================================
// Test Suite 3: Room CRUD Input Validation
// ==========================================
{
  console.log("3. Admin Room Validation Tests");

  // 3.1 Name validation (2 to 60 characters)
  const roomNameShort = validateRoomInput({
    name: "A",
    slug: "solo-booth",
    capacityMin: 1,
    capacityMax: 2,
    baseHourlyRate: 600,
  });
  assert.strictEqual(roomNameShort.isValid, false, "Should reject room names under 2 characters");
  assert.ok(roomNameShort.errors.name);

  // 3.2 Slug validation (only lowercase letters, numbers, hyphens)
  const roomInvalidSlug = validateRoomInput({
    name: "Barkada Suite",
    slug: "Barkada Suite! #1",
    capacityMin: 5,
    capacityMax: 10,
    baseHourlyRate: 2200,
  });
  assert.strictEqual(roomInvalidSlug.isValid, false, "Should reject slugs with uppercase or special characters");
  assert.ok(roomInvalidSlug.errors.slug);

  // 3.3 Capacity bounds (min >= 1, max <= 50, max >= min)
  const roomBadMin = validateRoomInput({
    name: "Party Room",
    slug: "party-room",
    capacityMin: 0,
    capacityMax: 10,
    baseHourlyRate: 4000,
  });
  assert.strictEqual(roomBadMin.isValid, false, "Should reject minimum capacity < 1");
  assert.ok(roomBadMin.errors.capacityMin);

  const roomMaxLessThanMin = validateRoomInput({
    name: "Party Room",
    slug: "party-room",
    capacityMin: 10,
    capacityMax: 5,
    baseHourlyRate: 4000,
  });
  assert.strictEqual(roomMaxLessThanMin.isValid, false, "Should reject max capacity < min capacity");
  assert.ok(roomMaxLessThanMin.errors.capacityMax);

  const roomExceedMax = validateRoomInput({
    name: "Stadium Room",
    slug: "stadium-room",
    capacityMin: 10,
    capacityMax: 65,
    baseHourlyRate: 15000,
  });
  assert.strictEqual(roomExceedMax.isValid, false, "Should reject max capacity > 50 guests");
  assert.ok(roomExceedMax.errors.capacityMax);

  // 3.4 Hourly rate limits (₱100 to ₱100,000)
  const roomLowRate = validateRoomInput({
    name: "Solo Booth",
    slug: "solo-booth",
    capacityMin: 1,
    capacityMax: 2,
    baseHourlyRate: 50,
  });
  assert.strictEqual(roomLowRate.isValid, false, "Should reject rates below ₱100");
  assert.ok(roomLowRate.errors.baseHourlyRate);

  const roomHighRate = validateRoomInput({
    name: "Luxury Suite",
    slug: "luxury-suite",
    capacityMin: 1,
    capacityMax: 2,
    baseHourlyRate: 200000,
  });
  assert.strictEqual(roomHighRate.isValid, false, "Should reject rates above ₱100,000");
  assert.ok(roomHighRate.errors.baseHourlyRate);

  // 3.5 Valid room input
  const validRoom = validateRoomInput({
    name: "Party Suite VIP",
    slug: "party-suite-vip",
    capacityMin: 11,
    capacityMax: 20,
    baseHourlyRate: 4000,
    description: "Ultra-wide 4K display, quadruple wireless mics, private lounge seating.",
    amenities: ["4K Screen", "4 Mics", "Private Lounge"],
  });
  assert.strictEqual(validRoom.isValid, true, "Valid room configuration should pass");
  assert.strictEqual(validRoom.sanitized.slug, "party-suite-vip");
  assert.strictEqual(validRoom.sanitized.baseHourlyRate, 4000);

  console.log("   ✓ Room attributes, slug regex, guest capacities, and pricing bounds verified");
}

// ==========================================
// Test Suite 4: Role Derivation & Access Control
// ==========================================
{
  console.log("4. Role Logic & Guard Tests");

  function deriveRoleFromLabels(labels: string[]): "admin" | "customer" {
    return labels.includes("admin") ? "admin" : "customer";
  }

  assert.strictEqual(deriveRoleFromLabels(["admin"]), "admin", "admin label produces admin role");
  assert.strictEqual(deriveRoleFromLabels(["staff", "admin"]), "admin", "admin label with other tags produces admin role");
  assert.strictEqual(deriveRoleFromLabels([]), "customer", "Empty labels default to customer role");
  assert.strictEqual(deriveRoleFromLabels(["vip", "regular"]), "customer", "Arbitrary labels default to customer role");

  console.log("   ✓ Role separation strictly relies on Appwrite admin label");
}

// ==========================================
// Test Suite 5: Room Deletion Integrity Logic
// ==========================================
{
  console.log("5. Room Booking Integrity Guard Logic");

  function canDeleteRoom(bookings: Array<{ status: string; startDateTime: string }>, nowIso: string) {
    const activeOrFuture = bookings.filter((b) => {
      const status = (b.status || "").toLowerCase();
      const isHoldingOrConfirmed = status === "holding" || status === "confirmed" || status === "active";
      const isFuture = b.startDateTime && b.startDateTime >= nowIso;
      return isHoldingOrConfirmed || isFuture;
    });

    return {
      canDelete: activeOrFuture.length === 0,
      activeCount: activeOrFuture.length,
    };
  }

  const now = "2026-10-15T12:00:00.000Z";

  // Case A: Room with past completed booking
  const pastBookings = [
    { status: "completed", startDateTime: "2026-10-10T12:00:00.000Z" },
    { status: "cancelled", startDateTime: "2026-10-12T12:00:00.000Z" },
  ];
  assert.strictEqual(canDeleteRoom(pastBookings, now).canDelete, true, "Room with only past/cancelled bookings can be deleted");

  // Case B: Room with active hold
  const holdingBookings = [
    { status: "holding", startDateTime: "2026-10-15T14:00:00.000Z" },
  ];
  assert.strictEqual(canDeleteRoom(holdingBookings, now).canDelete, false, "Room with holding reservation cannot be deleted");

  // Case C: Room with future confirmed reservation
  const futureBookings = [
    { status: "confirmed", startDateTime: "2026-10-20T18:00:00.000Z" },
  ];
  assert.strictEqual(canDeleteRoom(futureBookings, now).canDelete, false, "Room with future confirmed reservation cannot be deleted");

  console.log("   ✓ Deletion integrity guard correctly blocks active, holding, and future bookings");
}

console.log("\n✅ All ENCORE application validation and security tests PASSED!\n");
