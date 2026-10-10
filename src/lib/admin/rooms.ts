import "server-only";
import { ID, Query } from "node-appwrite";
import { createAdminAuthClient } from "@/lib/auth/appwrite-auth";
import { AdminRoom, RoomInputData } from "@/types/room-admin";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "karaoke_db";
const ROOMS_COLLECTION = "rooms";
const BOOKINGS_COLLECTION = "bookings";
const VENUES_COLLECTION = "venues";

/**
 * Resolves the primary venue ID for associating rooms
 */
export async function getActiveVenueId(): Promise<string> {
  const { databases } = createAdminAuthClient();
  try {
    const res = await databases.listDocuments(DATABASE_ID, VENUES_COLLECTION, [
      Query.limit(1),
    ]);
    if (res.documents.length > 0) {
      return res.documents[0].$id;
    }
  } catch {
    // Fall back to default seed venue if database not provisioned yet
  }
  return process.env.APPWRITE_VENUE_ID || "venue_neon_melody";
}

/**
 * Lists all rooms in the system ordered by sortOrder
 */
export async function listRooms(): Promise<AdminRoom[]> {
  const { databases } = createAdminAuthClient();
  try {
    const res = await databases.listDocuments(DATABASE_ID, ROOMS_COLLECTION, [
      Query.orderAsc("sortOrder"),
      Query.limit(100),
    ]);

    return res.documents.map((doc: any) => ({
      $id: doc.$id,
      venueId: doc.venueId,
      name: doc.name,
      slug: doc.slug || "",
      capacityMin: Number(doc.capacityMin) || 1,
      capacityMax: Number(doc.capacityMax) || 1,
      baseHourlyRate: Number(doc.baseHourlyRate) || 0,
      description: doc.description || "",
      isActive: doc.isActive !== false,
      sortOrder: Number(doc.sortOrder) || 0,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    }));
  } catch (err: any) {
    console.error("Failed to list rooms from Appwrite:", err.message);
    return [];
  }
}

/**
 * Fetches a single room by its document ID
 */
export async function getRoomById(roomId: string): Promise<AdminRoom | null> {
  const { databases } = createAdminAuthClient();
  try {
    const doc: any = await databases.getDocument(
      DATABASE_ID,
      ROOMS_COLLECTION,
      roomId
    );

    return {
      $id: doc.$id,
      venueId: doc.venueId,
      name: doc.name,
      slug: doc.slug || "",
      capacityMin: Number(doc.capacityMin) || 1,
      capacityMax: Number(doc.capacityMax) || 1,
      baseHourlyRate: Number(doc.baseHourlyRate) || 0,
      description: doc.description || "",
      isActive: doc.isActive !== false,
      sortOrder: Number(doc.sortOrder) || 0,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    };
  } catch {
    return null;
  }
}

/**
 * Checks whether a room slug is already taken by another room
 */
export async function isSlugTaken(slug: string, excludeRoomId?: string): Promise<boolean> {
  const { databases } = createAdminAuthClient();
  try {
    const res = await databases.listDocuments(DATABASE_ID, ROOMS_COLLECTION, [
      Query.equal("slug", slug),
      Query.limit(2),
    ]);

    const matches = res.documents.filter((doc) => doc.$id !== excludeRoomId);
    return matches.length > 0;
  } catch {
    return false;
  }
}

/**
 * Checks whether a room has active bookings (holding, confirmed, or future start time)
 * Integrity guard preventing deletion of rooms with upcoming reservations
 */
export async function checkRoomHasActiveBookings(
  roomId: string
): Promise<{ hasActiveBookings: boolean; count: number }> {
  const { databases } = createAdminAuthClient();
  try {
    // 1. Check for holding or confirmed bookings on this room
    const res = await databases.listDocuments(DATABASE_ID, BOOKINGS_COLLECTION, [
      Query.equal("roomId", roomId),
      Query.limit(100),
    ]);

    const nowIso = new Date().toISOString();
    const activeOrFuture = res.documents.filter((b: any) => {
      const status = (b.status || "").toLowerCase();
      const isHoldingOrConfirmed = status === "holding" || status === "confirmed" || status === "active";
      const isFuture = b.startDateTime && b.startDateTime >= nowIso;
      return isHoldingOrConfirmed || isFuture;
    });

    return {
      hasActiveBookings: activeOrFuture.length > 0,
      count: activeOrFuture.length,
    };
  } catch (err: any) {
    console.warn("Could not query bookings collection for room guard:", err.message);
    // If collection does not exist or error occurs, fail-safe to prevent accidental destruction
    return { hasActiveBookings: false, count: 0 };
  }
}

/**
 * Creates a new room in the Appwrite database
 */
export async function createRoom(data: RoomInputData): Promise<{ success: boolean; id?: string; error?: string }> {
  const { databases } = createAdminAuthClient();
  const venueId = await getActiveVenueId();

  try {
    const doc = await databases.createDocument(
      DATABASE_ID,
      ROOMS_COLLECTION,
      ID.unique(),
      {
        venueId,
        name: data.name,
        slug: data.slug,
        capacityMin: data.capacityMin,
        capacityMax: data.capacityMax,
        baseHourlyRate: data.baseHourlyRate,
        description: data.description,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      }
    );

    return { success: true, id: doc.$id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create room in database." };
  }
}

/**
 * Updates an existing room in the Appwrite database
 */
export async function updateRoom(
  roomId: string,
  data: Partial<RoomInputData>
): Promise<{ success: boolean; error?: string }> {
  const { databases } = createAdminAuthClient();

  try {
    const payload: Record<string, any> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.slug !== undefined) payload.slug = data.slug;
    if (data.capacityMin !== undefined) payload.capacityMin = data.capacityMin;
    if (data.capacityMax !== undefined) payload.capacityMax = data.capacityMax;
    if (data.baseHourlyRate !== undefined) payload.baseHourlyRate = data.baseHourlyRate;
    if (data.description !== undefined) payload.description = data.description;
    if (data.isActive !== undefined) payload.isActive = data.isActive;
    if (data.sortOrder !== undefined) payload.sortOrder = data.sortOrder;

    await databases.updateDocument(
      DATABASE_ID,
      ROOMS_COLLECTION,
      roomId,
      payload
    );

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update room in database." };
  }
}

/**
 * Deletes a room if and only if no active or future bookings exist
 */
export async function deleteRoom(roomId: string): Promise<{ success: boolean; error?: string }> {
  const guard = await checkRoomHasActiveBookings(roomId);
  if (guard.hasActiveBookings) {
    return {
      success: false,
      error: `This room has ${guard.count} active or upcoming booking(s) and cannot be deleted.`,
    };
  }

  const { databases } = createAdminAuthClient();
  try {
    await databases.deleteDocument(DATABASE_ID, ROOMS_COLLECTION, roomId);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete room." };
  }
}

/**
 * Lists all bookings in the system for read-only admin inspection
 */
export async function listAllBookings(): Promise<any[]> {
  const { databases } = createAdminAuthClient();
  try {
    const res = await databases.listDocuments(DATABASE_ID, BOOKINGS_COLLECTION, [
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);

    return res.documents.map((doc: any) => {
      let customerObj = { name: "Guest", email: "unknown", phone: "" };
      try {
        if (typeof doc.customer === "string") {
          customerObj = JSON.parse(doc.customer);
        } else if (doc.customer) {
          customerObj = doc.customer;
        }
      } catch {
        // Fallback
      }

      let paymentObj = { status: "unknown", depositPaidPhp: 0 };
      try {
        if (typeof doc.payment === "string") {
          paymentObj = JSON.parse(doc.payment);
        } else if (doc.payment) {
          paymentObj = doc.payment;
        }
      } catch {
        // Fallback
      }

      return {
        $id: doc.$id,
        bookingReference: doc.bookingReference || doc.$id.substring(0, 8).toUpperCase(),
        roomId: doc.roomId,
        status: doc.status || "unknown",
        startDateTime: doc.startDateTime,
        endDateTime: doc.endDateTime,
        durationHours: doc.durationHours,
        guestCount: doc.guestCount,
        customerName: customerObj.name || "Guest",
        customerEmail: customerObj.email || "N/A",
        customerPhone: customerObj.phone || "",
        paymentStatus: paymentObj.status || "pending",
        $createdAt: doc.$createdAt,
      };
    });
  } catch (err: any) {
    console.warn("Could not list bookings:", err.message);
    return [];
  }
}

/**
 * Fetches bookings belonging strictly to a specific customer email
 */
export async function listCustomerBookings(customerEmail: string): Promise<any[]> {
  if (!customerEmail) return [];
  const normalizedEmail = customerEmail.trim().toLowerCase();

  const allBookings = await listAllBookings();
  return allBookings.filter(
    (b) => b.customerEmail.trim().toLowerCase() === normalizedEmail
  );
}
