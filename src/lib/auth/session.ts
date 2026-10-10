import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppUser, UserRole } from "@/types/auth";
import { createSessionAuthClient } from "./appwrite-auth";

export const SESSION_COOKIE_NAME = "appwrite_session";

/**
 * Retrieves the currently authenticated AppUser from the HttpOnly session cookie.
 * Returns null if the user is unauthenticated or if the session has expired.
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  const cookieStore = await cookies();
  const sessionSecret = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionSecret) {
    return null;
  }

  try {
    const { account } = createSessionAuthClient(sessionSecret);
    const user = await account.get();

    const labels = Array.isArray(user.labels) ? user.labels : [];
    const role: UserRole = labels.includes("admin") ? "admin" : "customer";

    return {
      $id: user.$id,
      name: user.name || "Guest",
      email: user.email,
      emailVerification: !!user.emailVerification,
      role,
      labels,
      $createdAt: user.$createdAt,
    };
  } catch (err: any) {
    // If the session token is expired or revoked in Appwrite, silently invalidate
    return null;
  }
}

/**
 * Enforces authentication. If not signed in, redirects to the login route
 * preserving the return path in the `next` search parameter.
 */
export async function requireUser(currentPath = "/account"): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) {
    const nextParam = encodeURIComponent(currentPath);
    redirect(`/login?next=${nextParam}`);
  }
  return user;
}

/**
 * Enforces admin authorization.
 * If unauthenticated: redirects to login.
 * If signed in as customer: redirects to friendly 403 page /admin/forbidden.
 */
export async function requireAdmin(currentPath = "/admin"): Promise<AppUser> {
  const user = await requireUser(currentPath);
  if (user.role !== "admin") {
    redirect("/admin/forbidden");
  }
  return user;
}
