export type UserRole = "admin" | "customer";

export interface AppUser {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  role: UserRole;
  labels: string[];
  $createdAt: string;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}
