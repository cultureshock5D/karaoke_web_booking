"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { requireUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { createSessionAuthClient } from "@/lib/auth/appwrite-auth";

export async function updateDisplayNameAction(
  _prevState: { success: boolean; error?: string; message?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string; message?: string }> {
  const user = await requireUser("/account");
  const name = (formData.get("name") as string)?.trim() || "";

  if (!name || name.length < 2) {
    return { success: false, error: "Display name must be at least 2 characters." };
  }
  if (name.length > 60) {
    return { success: false, error: "Display name cannot exceed 60 characters." };
  }

  const cookieStore = await cookies();
  const sessionSecret = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionSecret) {
    return { success: false, error: "Active session required." };
  }

  try {
    const { account } = createSessionAuthClient(sessionSecret);
    await account.updateName(name);

    revalidatePath("/account");
    revalidatePath("/admin");
    return { success: true, message: "Display name updated successfully." };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to update display name.",
    };
  }
}
