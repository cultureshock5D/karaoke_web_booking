export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates registration form inputs:
 * - name: required, trimmed length >= 2
 * - email: valid email syntax
 * - password: min 8 characters, at least 1 letter, at least 1 number
 */
export function validateRegisterInput(input: RegisterInput): ValidationResult {
  const errors: Record<string, string> = {};

  const name = (input.name || "").trim();
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "Full name must be 80 characters or fewer.";
  }

  const email = (input.email || "").trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const password = input.password || "";
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      errors.password = "Password must contain at least one letter and one number.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates login input presence
 */
export function validateLoginInput(email?: string, password?: string): ValidationResult {
  const errors: Record<string, string> = {};
  if (!email || !email.trim()) {
    errors.email = "Email is required.";
  }
  if (!password || !password.trim()) {
    errors.password = "Password is required.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates redirect target to ensure it is a safe, same-site relative path.
 * Blocks protocol-relative URLs (//evil.com), javascript:, and external schemes.
 */
export function sanitizeRedirectPath(path?: string | null, fallback = "/"): string {
  if (!path || typeof path !== "string") {
    return fallback;
  }

  const trimmed = path.trim();
  // Must start with '/' and must NOT start with '//' or contain protocol separators
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("\\")) {
    return trimmed;
  }

  return fallback;
}
