# ENCORE: Private Karaoke Lounge Web Booking System

**Idea claim line:**
> ENCORE: online room booking for a private karaoke lounge in BGC. Main CRUD item: rooms (admin), with customer bookings.

---

## 1. Business Concept & Overview

**ENCORE** is an upscale, private boutique karaoke lounge located in Bonifacio Global City (BGC), Taguig, Metro Manila. Unlike traditional mass-market KTVs or open-floor bars, ENCORE provides private soundproof suites tailored for group gatherings—ranging from intimate 1–2 person vocal booths to 20-person VIP party suites with dedicated beverage stations and banquette seating.

The platform serves two user groups:
1. **Customers:** Discover room suites and curated 3-hour food & drink packages, reserve specific time slots online, place a 30% deposit via local Philippine payment rails (GCash, Maya, QRPH, Cards), and inspect booking history through a personal customer account.
2. **Venue Administrators:** Manage room inventory (Create, Read, Update, Delete) with real-time capacity and pricing adjustments, backed by strict integrity guards preventing deletion of rooms with active bookings, and audit all live customer reservations.

---

## 2. The Business Problem Being Solved

Boutique karaoke lounges in Metro Manila frequently suffer from **reservation chaos** caused by manual scheduling through messaging apps (Instagram DMs, Facebook Messenger, SMS):
- **Double-Bookings & Overlaps:** Manual staff bookkeeping frequently leads to two groups arriving for the same peak Friday night slot.
- **Unpaid Holds & Lost Revenue:** Customers request verbal reservations but fail to show up, stranding high-value rooms during peak hours.
- **Payment Inconvenience:** Manually validating GCash screenshots and receipts creates checkout friction and administrative overhead.

### How ENCORE Solves This:
1. **Atomic Slot Reservation:** Every 60-minute room slot generates a composite key (`roomId + slotStartUtc`) guarded by an Appwrite database unique index. Two concurrent customers attempting to reserve the same suite at the same time cannot double-book.
2. **15-Minute Guaranteed Hold:** Customers are granted a 15-minute checkout window with a live countdown while payment is processed. An automated background cleanup worker releases expired unconfirmed slots.
3. **Automated PayMongo Hosted Checkout:** Integrates PayMongo Hosted Checkout v2 supporting GCash, Maya, QRPH, and cards. Confirmed deposits (30% of room total, with a ₱100 PayMongo floor) trigger webhook verification and atomically finalize reservations.

---

## 3. System Features & Grading Rubric Alignment

### Part 1: Landing Page (15%)
- **Occasion-Led Presentation:** Built around the experience of singing with friends in BGC rather than technical equipment jargon.
- **Dynamic Inventory & Packages:** Showcases 4 suite tiers (Solo Booth, Duet Suite, Barkada Room, Party Suite) and 3 occasion bundles (Barkada Night, Birthday Bash, Date Night).
- **Interactive UI:** Double-Bezel glassmorphism cards, ambient glows, fluid floating pill navigation, and animated FAQs.
- **Mobile First:** Responsive layout tested at 375px mobile and 1280px desktop viewports with tap targets ≥ 44px.
- **Persistent CTAs:** "Book Now" buttons in the navigation bar, hero banner, room cards, package cards, and final footer strip.

### Part 2: Users & Authentication (20%)
- **Appwrite Identity Provider:** Server-side password hashing and authentication handled natively by Appwrite Auth (Argon2 server-side hashing; no plain-text passwords stored or logged).
- **Registration & Validation:** Validates full name (≥ 2 chars), valid email format, and password complexity (≥ 8 chars with letters and numbers). Friendly server-side field error feedback.
- **Secure Sessions:** Session tokens stored exclusively in **HttpOnly, Secure (in production), SameSite=Lax** cookies (`appwrite_session`). Never exposed to client-side JavaScript.
- **Role-Based Access Control:** Dual roles (`admin` vs `customer`) determined securely via Appwrite user labels. Public registration is locked to `customer`; administrative elevation cannot be self-registered.
- **Route Guards:** Next.js 16 request interceptor (`src/proxy.ts`) for fast interception, backed by server-side verification (`getCurrentUser`, `requireUser`, `requireAdmin`) on every page and Server Action.
- **Customer Account (`/account`):** View and update display name; view personal booking history gated by email verification to safeguard customer privacy.

### Part 3: CRUD – Room Management (25%)
- **Full CRUD on Rooms (Admin Only):**
  - **Create (`/admin/rooms/new`):** Add new karaoke suites with name, unique slug, guest capacities (1–50), base weekday hourly rate, description, and active status.
  - **Read (`/admin/rooms`):** Formatted list of all rooms with guest ranges, formatted PHP hourly rates (`₱2,200`), active status indicators, and actions.
  - **Update (`/admin/rooms/[id]/edit`):** Edit room parameters with input preservation and validation error feedback.
  - **Delete:** Accessible confirmation dialog naming the room, protected by an **Integrity Guard** that refuses deletion if active or upcoming bookings exist.
- **Audit Register (`/admin/bookings`):** Read-only table for administrators to inspect customer booking references, guest counts, schedule intervals, and payment statuses.
- **Zero Schema Modifications:** Operates entirely within the existing `rooms` collection schema in `appwrite.json`.

---

## 4. Technology Stack

- **Framework:** Next.js 16.3.6 (App Router, Turbopack, Server Actions, Next.js Proxy)
- **Frontend Core:** React 19.2.8, TypeScript 5, Tailwind CSS v4, Motion 13
- **Design System:** Base UI & Double-Bezel UI architecture, Space Grotesk & Inter typography
- **Backend & Database:** Appwrite Cloud / Self-hosted (Auth, Databases, User Labels)
- **Payment Gateway:** PayMongo Hosted Checkout v2 (GCash, Maya, Cards, QRPH)
- **Testing & Execution:** `tsx`, Node.js native `assert` test suite

---

## 5. Prerequisites & Setup Instructions

### Prerequisites
- **Node.js:** `v20.x` or higher (tested on Node.js 20 and 22)
- **npm:** `v10.x` or higher
- **Appwrite Instance:** Free account at [Appwrite Cloud](https://cloud.appwrite.io) or local Docker container.

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd karaoke_web_booking
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and provide your credentials (do NOT commit this file):
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`: Your Appwrite endpoint (default `https://cloud.appwrite.io/v1`)
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`: Your Appwrite project ID
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`: Database ID (default `karaoke_db`)
   - `APPWRITE_API_KEY`: Server API key with `databases.read`, `databases.write`, `users.read`, `users.write` scopes
   - `PAYMONGO_SECRET_KEY`: PayMongo test secret key (`sk_test_...`)
   - `PAYMONGO_PUBLIC_KEY`: PayMongo test public key (`pk_test_...`)
   - `PAYMONGO_WEBHOOK_SECRET`: PayMongo test webhook secret (`whsec_...`)

4. **Provision the Appwrite database schema:**
   Run the schema initialization script to create the collections (`venues`, `rooms`, `pricing_rules`, `addons`, `slots`, `bookings`) and unique indexes:
   ```bash
   npm run setup:db
   ```

5. **Seed the demo user accounts:**
   Run the idempotent test account provisioning script:
   ```bash
   npm run seed:accounts
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

7. **Run verification test suites:**
   ```bash
   # Run booking engine core test suite
   npm test

   # Run application validation, safe redirects, role guards & integrity tests
   npm run test:app
   ```

---

## 6. Demo Test Accounts

The following pre-verified test credentials are created by `npm run seed:accounts` for grading and demonstration:

| Role | Email | Password | Access Privileges |
|---|---|---|---|
| **Admin** | `admin@encore.test` | `Admin#Demo2026` | Full access to `/admin`, Room CRUD, and Bookings audit register |
| **Customer** | `customer@encore.test` | `Customer#Demo2026` | Access to `/account`, profile management, and verified booking history |

> *Note: These credentials are strictly for demonstration and testing purposes.*

---

## 7. Payments & Booking Sandbox

ENCORE supports two payment testing workflows:

1. **PayMongo Test Mode (Production-like):**
   When configured with PayMongo test API keys (`sk_test_...`), customer checkout redirects to PayMongo's official hosted test checkout page where mock GCash or test cards (`4242...`) can be submitted.
2. **Local Checkout Sandbox (`/book/checkout-mock`):**
   For offline or grader testing without an active PayMongo merchant account, visiting `/book/checkout-mock` allows simulating instant deposit payments and webhook triggers directly on `localhost:3000`.

---

## 8. AI Tools Disclosure

As required by the project guidelines, AI tools assisted during the development of this submission:
- **Claude (Anthropic Claude Code):**
  - **Landing Page Redesign:** Replaced technical audio specs with occasion-driven copy, packages, pricing rules, and responsive layouts.
  - **User Authentication:** Architecture of Appwrite session client, HttpOnly cookie management, server action validation, and Next.js 16 proxy request interception.
  - **Room CRUD Implementation:** Admin dashboard, server validation, booking conflict integrity guard, and room management UI.
  - **Test Suite & Verification:** Development of `tests/app-validation.test.ts` covering form validators, open-redirect prevention, and integrity guard assertions.
  - **Documentation:** Authoring `README.md`, `docs/CODE_WALKTHROUGH.md`, and `docs/AI_PROMPTS.md`.
- `TODO(student): add any other AI tools you used`

---

## 9. Known Limitations & Architecture Notes

1. **Email Delivery Configuration:** Appwrite Auth email verification requires an active SMTP service or Appwrite Cloud email limits. If running against an Appwrite project without configured custom SMTP, the `/verify` flow may not send actual emails; the seeded demo accounts (`admin@encore.test` and `customer@encore.test`) are pre-verified to allow immediate inspection of bookings.
2. **Booking Wizard Fallback:** The live booking wizard (`/book`) reads initial room presets from `@/lib/mock-data.ts` due to Frozen Core constraints preventing modification of core client booking files. Newly created rooms in Appwrite Admin CRUD are stored and persisted in Appwrite (`rooms` collection).
3. **Venue Policy Placeholders:** Certain policy details (e.g. outside corkage fees, late checkout penalties) are marked with `TODO(owner): confirm policy` pending physical venue operational sign-off.
