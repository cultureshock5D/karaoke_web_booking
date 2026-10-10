"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { createAdminAuthClient, createSessionAuthClient } from "@/lib/auth/appwrite-auth";
import { SESSION_COOKIE_NAME, getCurrentUser } from "@/lib/auth/session";
import {
  validateRegisterInput,
  validateLoginInput,
  sanitizeRedirectPath,
} from "@/lib/auth/validation";
import { AuthActionResult } from "@/types/auth";

export async function registerAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nextPath = formData.get("next") as string;

  const validation = validateRegisterInput({ name, email, password });
  if (!validation.isValid) {
    return {
      success: false,
      fieldErrors: validation.errors,
      error: "Please fix the errors below.",
    };
  }

  const { users, account } = createAdminAuthClient();

  try {
    // 1. Create Appwrite user (never assign admin label on self-registration)
    await users.create(
      ID.unique(),
      email.trim().toLowerCase(),
      undefined, // phone
      password,
      name.trim()
    );

    // 2. Create email-password session
    const session = await account.createEmailPasswordSession(
      email.trim().toLowerCase(),
      password
    );

    // 3. Set HttpOnly session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  } catch (err: any) {
    if (err.code === 409) {
      return {
        success: false,
        fieldErrors: { email: "An account with this email address already exists." },
        error: "An account with this email address already exists.",
      };
    }
    return {
      success: false,
      error: err.message || "Failed to create account. Please try again.",
    };
  }

  const destination = sanitizeRedirectPath(nextPath, "/account");
  redirect(destination);
}

export async function loginAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nextPath = formData.get("next") as string;

  const validation = validateLoginInput(email, password);
  if (!validation.isValid) {
    return {
      success: false,
      fieldErrors: validation.errors,
      error: "Email and password are required.",
    };
  }

  const { account } = createAdminAuthClient();
  let sessionSecret = "";
  let isAdmin = false;

  try {
    const session = await account.createEmailPasswordSession(
      email.trim().toLowerCase(),
      password
    );
    sessionSecret = session.secret;

    // Check role for intelligent redirect
    const userClient = createSessionAuthClient(sessionSecret);
    const user = await userClient.account.get();
    const labels = Array.isArray(user.labels) ? user.labels : [];
    isAdmin = labels.includes("admin");

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (err: any) {
    // Prevent credential enumeration: generic message
    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }

  // Determine landing route
  const defaultRoute = isAdmin ? "/admin" : "/account";
  const destination = sanitizeRedirectPath(nextPath, defaultRoute);
  redirect(destination);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const sessionSecret = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionSecret) {
    try {
      const { account } = createSessionAuthClient(sessionSecret);
      await account.deleteSession("current");
    } catch {
      // Ignore if session was already destroyed
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

export async function sendVerificationEmailAction(): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "You must be signed in to verify your email." };
  }

  const cookieStore = await cookies();
  const sessionSecret = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionSecret) {
    return { success: false, message: "Active session required." };
  }

  try {
    const { account } = createSessionAuthClient(sessionSecret);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await account.createVerification(`${appUrl}/verify`);
    return {
      success: true,
      message: "Verification email sent. Please check your inbox.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Unable to send verification email at this time.",
    };
  }
}
