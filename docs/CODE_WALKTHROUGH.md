# ENCORE System Code Walkthrough & Student Defense Guide

This document is written in plain language to help you understand and explain the complete architecture, request flows, security boundaries, and design choices of the ENCORE web booking system.

---

## 1. Project Folder Map

```
karaoke_web_booking/
├── src/
│   ├── app/
│   │   ├── (auth)/                # Public authentication routes
│   │   │   ├── actions.ts         # Server Actions: register, login, logout, verification
│   │   │   ├── login/page.tsx     # Sign in page (with Suspense for query params)
│   │   │   ├── register/page.tsx  # Sign up page (friendly field feedback)
│   │   │   └── verify/page.tsx    # Email verification confirmation landing
│   │   ├── account/               # Protected customer account
│   │   │   ├── actions.ts         # Profile display name update action
│   │   │   ├── error.tsx          # Account error boundary
│   │   │   ├── page.tsx           # Account dashboard & email-verified bookings
│   │   │   └── AccountClient.tsx  # Interactive profile form & verification trigger
│   │   ├── admin/                 # Protected admin portal (role: "admin" required)
│   │   │   ├── error.tsx          # Admin error boundary
│   │   │   ├── forbidden/page.tsx # Friendly 403 Access Forbidden page
│   │   │   ├── page.tsx           # Admin overview & operations dashboard
│   │   │   ├── bookings/page.tsx  # Read-only audit table of customer reservations
│   │   │   └── rooms/             # CRUD on Karaoke Suites
│   │   │       ├── actions.ts     # Server Actions: create, update, delete rooms
│   │   │       ├── page.tsx       # Read: list of rooms
│   │   │       ├── new/page.tsx   # Create: new room form page
│   │   │       ├── [id]/edit/page.tsx # Update: edit existing room
│   │   │       ├── RoomFormClient.tsx # Client form with field validation preservation
│   │   │       └── RoomListClient.tsx # Table with accessible delete confirmation dialog
│   │   ├── book/                  # Booking wizard & checkout flows
│   │   ├── globals.css            # Styling tokens & Tailwind directives
│   │   ├── layout.tsx             # Root layout, metadata & fonts
│   │   └── page.tsx               # Main public landing page
│   ├── components/
│   │   ├── landing/               # Occasion-driven landing sections
│   │   ├── layout/                # Global Navbar (with auth state) and Footer
│   │   └── ui/                    # Double-Bezel, buttons, badges
│   ├── lib/
│   │   ├── admin/                 # Admin data access & room validators
│   │   │   ├── rooms.ts           # Appwrite database operations & integrity guard
│   │   │   └── room-validation.ts # Room name, slug, capacity, and rate validation
│   │   ├── auth/                  # Authentication infrastructure
│   │   │   ├── appwrite-auth.ts   # Node-Appwrite admin & session client factories
│   │   │   ├── session.ts         # getCurrentUser, requireUser, requireAdmin
│   │   │   └── validation.ts      # User register, login & redirect sanitizers
│   │   └── design/                # Brand constants and marketing copy
│   ├── proxy.ts                   # Next.js 16 request interceptor for fast redirects
│   └── types/
│       ├── auth.ts                # AppUser, UserRole, AuthActionResult
│       └── room-admin.ts          # AdminRoom, RoomInputData, RoomActionResult
├── tests/
│   └── app-validation.test.ts     # Zero-dependency test suite (assert)
├── tools/
│   └── seed-test-accounts.ts      # Idempotent script creating admin & customer test accounts
├── scripts/                       # Database schema provisioning (Frozen Core)
├── appwrite.json                  # Collection schemas and indexes
└── package.json                   # Scripts and dependencies
```

---

## 2. How Requests Flow Through the System

### Flow A: Customer Registration & Login
1. User enters name, email, and password on `/register`.
2. Form submits to `registerAction` in `src/app/(auth)/actions.ts`.
3. Server executes `validateRegisterInput`: validates that name has at least 2 characters, email matches format, and password is ≥ 8 characters with both letters and numbers.
4. Server calls Appwrite's `users.create` using the admin client. **Crucial:** User is created with NO labels (defaulting them to `customer`). Public registration can never assign an `admin` label.
5. Server signs the user in via `account.createEmailPasswordSession` to get a session secret.
6. Server sets an **HttpOnly, Secure (in production), SameSite=Lax** cookie named `appwrite_session`.
7. User is redirected to `/account` using `sanitizeRedirectPath` (which prevents open-redirect attacks).

### Flow B: Visiting a Protected Page (`/admin` or `/account`)
1. **First Line of Defense (Fast Intercept):** Next.js 16 `src/proxy.ts` checks incoming requests for the `appwrite_session` cookie. If missing, it immediately redirects to `/login?next=...`.
2. **Second Line of Defense (Server Page Guard):** Inside `/admin/page.tsx` or `/account/page.tsx`, the page calls `await requireAdmin()` or `await requireUser()`.
3. `requireUser()` calls Appwrite's `account.get()` using the session secret from the cookie. If valid, it returns the user object; if invalid, it redirects to `/login`.
4. `requireAdmin()` inspects `user.labels`. If `labels.includes("admin")` is false, it halts execution and redirects to `/admin/forbidden` (a friendly 403 page). Customers can never access administrative pages or actions.

### Flow C: Creating a Room (Admin CRUD)
1. Admin navigates to `/admin/rooms/new` and fills out the suite form.
2. Form submits to `createRoomAction` in `src/app/admin/rooms/actions.ts`.
3. Server invokes `requireAdmin()` to verify the caller has administrative privileges.
4. Server runs `validateRoomInput` (checks name length 2–60, valid lowercase hyphenated slug, capacity 1–50, hourly rate ₱100–₱100,000).
5. Server calls `isSlugTaken` against Appwrite to ensure the slug is unique.
6. Server inserts the document into Appwrite's `rooms` collection via `createRoom` in `src/lib/admin/rooms.ts`.
7. Next.js revalidates cached paths (`revalidatePath("/admin/rooms")`) and redirects back to the room catalog.

### Flow D: Deleting a Room with the Booking Integrity Guard
1. Admin clicks "Delete" on a room card.
2. The UI displays an accessible "Are you sure?" modal dialog explicitly naming the room.
3. Upon confirmation, `deleteRoomAction(roomId)` executes on the server.
4. Server executes `requireAdmin()`.
5. Before deleting, `checkRoomHasActiveBookings(roomId)` queries the Appwrite `bookings` collection for any reservations where `status` is `holding` or `confirmed`, or `startDateTime` is in the future.
6. If active or future bookings exist: deletion is **blocked**, and the server returns a friendly error message ("This room has active or upcoming bookings and cannot be deleted").
7. If no active bookings exist: document is deleted from Appwrite and the table is updated.

---

## 3. Where Core Logic Lives

| Decision / Logic | File Location | Mechanism |
|---|---|---|
| Role Determination | `src/lib/auth/session.ts` | Checks if Appwrite user labels contains `"admin"`. Otherwise defaults to `"customer"`. |
| User Input Validation | `src/lib/auth/validation.ts` | Hand-written validators for name, email regex, password criteria, and safe redirect URLs. |
| Room Input Validation | `src/lib/admin/room-validation.ts` | Validates room name, slug format, guest capacities (1–50), and base rate (₱100–₱100,000). |
| Booking Integrity Guard | `src/lib/admin/rooms.ts` | `checkRoomHasActiveBookings` scans `bookings` collection before any delete operation. |
| Email-Gated Privacy | `src/app/account/page.tsx` | Queries customer bookings only if `user.emailVerification === true`. |
| Session Token Security | `src/app/(auth)/actions.ts` | Saves session secret in an `HttpOnly, SameSite=Lax` cookie. |

---

## 4. The Frozen Core: Why and How It Was Preserved

The original repository contained production-critical business logic:
- `src/lib/booking-engine.ts` (atomic slot key generation and pricing mathematics)
- `src/lib/datetime.ts` (time zone and interval calculations)
- `src/lib/paymongo.ts` (payment gateway client and webhook HMAC-SHA256 signature verification)
- `src/lib/appwrite/**` (original server connection helpers)
- `src/lib/mock-data.ts` (offline demo fallbacks)
- `src/app/api/**` (existing webhook and booking routes)
- `src/types/index.ts` (original data types)
- `scripts/**` (database schema provisioning scripts)

### How new work was added cleanly:
1. **Additive Architecture:** New authentication and CRUD logic uses **Next.js Server Actions** inside route directories instead of adding new endpoints under `src/app/api/**`.
2. **Isolated Types & Clients:** New types live in `src/types/auth.ts` and `src/types/room-admin.ts`. New Appwrite client helpers live in `src/lib/auth/appwrite-auth.ts`.
3. **No Database Schema Changes:** Room CRUD uses the exact attributes already defined in `appwrite.json` (`venueId`, `name`, `slug`, `capacityMin`, `capacityMax`, `baseHourlyRate`, `description`, `isActive`, `sortOrder`). No new attributes were created.
4. **Verification:** All 5 tests in `scripts/test-booking-engine.ts` continue to pass with unchanged output, and `git diff --stat` confirms 0 modifications to Frozen Core files.

---

## 5. Ten Common Professor Defense Questions & Short Answers

### Q1: "How are user passwords hashed and stored?"
> **Answer:** Passwords are never stored in plain text and our code does not write custom hashing algorithms. Passwords are sent over HTTPS directly to Appwrite Auth, which hashes them server-side using **Argon2**, an industry-standard memory-hard hashing algorithm. Neither our application database nor server logs ever touch plain-text passwords.

### Q2: "How do you prevent a regular customer from opening `/admin`?"
> **Answer:** Through two layers: First, Next.js 16's `src/proxy.ts` intercepts unauthenticated requests before page render. Second, every admin page and Server Action calls `await requireAdmin()`, which reads the session cookie, asks Appwrite for the authenticated user, and verifies that `user.labels` contains `"admin"`. If not, it halts execution and redirects to `/admin/forbidden` (HTTP 403).

### Q3: "What prevents a user from registering themselves as an admin?"
> **Answer:** The public registration Server Action (`registerAction` in `src/app/(auth)/actions.ts`) calls `users.create()` without specifying any labels. In Appwrite, labels can only be modified by a client with the administrative `APPWRITE_API_KEY`. There is no client-facing parameter or API that allows assigning the `admin` label during self-registration.

### Q4: "Where is the user session stored, and how is it protected against XSS?"
> **Answer:** When a user logs in, Appwrite returns a session secret token. We store this token in an **`HttpOnly`** cookie named `appwrite_session` with `SameSite=Lax` and `Secure` enabled in production. Because the cookie is marked `HttpOnly`, browser JavaScript cannot read or steal it through Cross-Site Scripting (XSS).

### Q5: "What happens if two customers attempt to book the exact same room and time slot simultaneously?"
> **Answer:** The booking engine generates a discrete 60-minute composite key: `roomId + slotStartUtc` (e.g., `room_vip_1_2026-10-15T11:00:00.000Z`). In Appwrite, the `slots` collection enforces a **Unique Index** on `slotKey`. If two requests arrive at the exact same millisecond, the database accepts the first transaction and immediately rejects the second with a unique constraint conflict (HTTP 409), preventing any double-booking.

### Q6: "Why is email verification required before a customer can view their bookings in `/account`?"
> **Answer:** Bookings are associated with the customer's email address. If an unverified user could see bookings by typing an email address, an attacker could register someone else's email and spy on their reservations. Restricting booking visibility to verified users (`user.emailVerification === true`) ensures that customers only view their own private data.

### Q7: "What is the Booking Integrity Guard on room deletion?"
> **Answer:** In `src/lib/admin/rooms.ts`, the `deleteRoom` function calls `checkRoomHasActiveBookings(roomId)` before deleting the document. If any booking is in `holding` or `confirmed` status, or is scheduled in the future, the action rejects the deletion with a clear error message. This prevents deleting a room that customers have already paid a deposit for.

### Q8: "How do you protect against Open Redirect vulnerabilities?"
> **Answer:** When users log in with a `?next=/some-path` query parameter, our server calls `sanitizeRedirectPath(nextPath, defaultRoute)` in `src/lib/auth/validation.ts`. It strictly requires the path to begin with a single `/` and forbids protocol strings (`http://`, `https://`, `//`, `javascript:`), ensuring attackers cannot redirect users to phishing websites.

### Q9: "Why did you use Next.js Server Actions instead of traditional API routes?"
> **Answer:** In modern Next.js App Router (version 16), Server Actions provide type-safe, direct server-side mutations that eliminate the need for boilerplate API route handlers, simplify form handling with `useActionState`, and allow revalidating server cache (`revalidatePath`) in one atomic operation. Furthermore, it strictly adhered to the Frozen Core rule forbidding changes under `src/app/api/**`.

### Q10: "What testing did you implement to verify the system?"
> **Answer:** We have two independent test suites:
> 1. `npm test` runs the core booking engine test suite verifying slot intervals, pricing math, PayMongo deposit floor clamping, and HMAC signature verification.
> 2. `npm run test:app` runs our application test suite in `tests/app-validation.test.ts`, asserting that registration validation, login validation, open-redirect prevention, room CRUD boundaries, role derivation, and room deletion integrity guards all pass.
