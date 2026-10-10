"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { validateRoomInput } from "@/lib/admin/room-validation";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  isSlugTaken,
} from "@/lib/admin/rooms";
import { RoomActionResult } from "@/types/room-admin";

export async function createRoomAction(
  _prevState: RoomActionResult | null,
  formData: FormData
): Promise<RoomActionResult> {
  // 1. Authorize: Admin only
  await requireAdmin("/admin/rooms/new");

  const name = (formData.get("name") as string) || "";
  const slug = (formData.get("slug") as string) || "";
  const capacityMin = formData.get("capacityMin") as string;
  const capacityMax = formData.get("capacityMax") as string;
  const baseHourlyRate = formData.get("baseHourlyRate") as string;
  const description = (formData.get("description") as string) || "";
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";
  const sortOrder = Number(formData.get("sortOrder")) || 0;

  // 2. Validate input
  const validation = validateRoomInput({
    name,
    slug,
    capacityMin,
    capacityMax,
    baseHourlyRate,
    description,
  });

  if (!validation.isValid) {
    return {
      success: false,
      fieldErrors: validation.errors,
      error: "Please correct the highlighted fields.",
    };
  }

  // 3. Uniqueness check for slug
  const slugConflict = await isSlugTaken(validation.sanitized.slug);
  if (slugConflict) {
    return {
      success: false,
      fieldErrors: { slug: "A room with this slug already exists." },
      error: "A room with this slug already exists. Please choose a different slug.",
    };
  }

  // 4. Persistence
  const createRes = await createRoom({
    ...validation.sanitized,
    isActive,
    sortOrder,
  });

  if (!createRes.success) {
    return {
      success: false,
      error: createRes.error || "Failed to create room.",
    };
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  redirect("/admin/rooms?created=1");
}

export async function updateRoomAction(
  roomId: string,
  _prevState: RoomActionResult | null,
  formData: FormData
): Promise<RoomActionResult> {
  // 1. Authorize: Admin only
  await requireAdmin(`/admin/rooms/${roomId}/edit`);

  const name = (formData.get("name") as string) || "";
  const slug = (formData.get("slug") as string) || "";
  const capacityMin = formData.get("capacityMin") as string;
  const capacityMax = formData.get("capacityMax") as string;
  const baseHourlyRate = formData.get("baseHourlyRate") as string;
  const description = (formData.get("description") as string) || "";
  const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true";
  const sortOrder = Number(formData.get("sortOrder")) || 0;

  // 2. Validate input
  const validation = validateRoomInput({
    name,
    slug,
    capacityMin,
    capacityMax,
    baseHourlyRate,
    description,
  });

  if (!validation.isValid) {
    return {
      success: false,
      fieldErrors: validation.errors,
      error: "Please correct the highlighted fields.",
    };
  }

  // 3. Uniqueness check for slug
  const slugConflict = await isSlugTaken(validation.sanitized.slug, roomId);
  if (slugConflict) {
    return {
      success: false,
      fieldErrors: { slug: "A room with this slug already exists." },
      error: "A room with this slug already exists. Please choose a different slug.",
    };
  }

  // 4. Update
  const updateRes = await updateRoom(roomId, {
    ...validation.sanitized,
    isActive,
    sortOrder,
  });

  if (!updateRes.success) {
    return {
      success: false,
      error: updateRes.error || "Failed to update room.",
    };
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  redirect("/admin/rooms?updated=1");
}

export async function deleteRoomAction(roomId: string): Promise<RoomActionResult> {
  // 1. Authorize: Admin only
  await requireAdmin("/admin/rooms");

  if (!roomId) {
    return { success: false, error: "Room ID is required." };
  }

  // 2. Delete with booking integrity guard
  const res = await deleteRoom(roomId);
  if (!res.success) {
    return {
      success: false,
      error: res.error || "Failed to delete room.",
    };
  }

  revalidatePath("/admin/rooms");
  revalidatePath("/admin");
  return { success: true };
}
