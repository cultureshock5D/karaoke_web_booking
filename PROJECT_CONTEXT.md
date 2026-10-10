# Project Context: ENCORE Private Karaoke Lounge (`karaoke_web_booking`)

## 1. Executive Summary
**ENCORE** is a full-stack web booking application for an upscale private karaoke (KTV) lounge located in Bonifacio Global City (BGC), Metro Manila, Philippines. The platform provides real-time room reservations, food and beverage add-on ordering, deposit payment processing, and event-based physical karaoke equipment delivery ("Encore to Go").

The system is designed with a strict **Frozen Core** architectural philosophy: critical business logic (slot reservations, hold lifecycle, pricing calculation, payment webhooks, and Appwrite schema) is isolated and guarded by automated tests, allowing the presentation layer and marketing surfaces to evolve independently without compromising booking integrity.

---

## 2. Technology Stack

### Frontend & Application Layer
- **Framework**: Next.js 16 (App Router, Turbopack enabled)
- **UI Runtime**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS custom properties (design tokens)
- **Component Primitives**: Base UI, Shadcn UI conventions, Lucide React icons
- **Animations & Micro-interactions**: Motion (`motion/react`) with reduced-motion fallback support
- **Fonts**: Space Grotesk (display, tabular pricing, reference codes) and Inter (body copy, metadata) loaded via Next.js Google Fonts

### Backend & Cloud Infrastructure
- **BaaS (Backend as a Service)**: Appwrite (Cloud / Self-hosted instance)
  - `node-appwrite` SDK for administrative server-side operations and API routes
  - `appwrite` SDK for client-side queries
  - Appwrite Databases: Relational-style document collections with unique indexes
  - Appwrite Storage: Bucket storage for room photos and venue media
- **Payment Processing**: PayMongo Hosted Checkout v2 (Philippines-centric payment gateway)
  - Payment rails supported: GCash, Maya (PayMaya), Credit/Debit Cards, GrabPay, and QRPH
  - HMAC SHA-256 webhook signature verification
- **Date & Timezone Utilities**: `date-fns` and `date-fns-tz` configured strictly for Asia/Manila (PHT, UTC+8)
- **Automation & Scripting**: `tsx` for TypeScript script execution without separate compilation

---

## 3. Repository Structure & Key Directories

```
karaoke_web_booking/
├── .env.example                     # Environment configuration reference
├── appwrite.json                    # Appwrite project configuration & schema declaration
├── package.json                     # Dependency manifests and scripts
├── scripts/
│   ├── setup-appwrite-schema.ts     # Automated Appwrite collection & index bootstrapper
│   └── test-booking-engine.ts       # Zero-dependency test suite for core logic
├── docs/
│   └── superpowers/
│       ├── specs/                   # Approved architectural & feature design specifications
│       └── plans/                   # Step-by-step implementation plans
├── public/
│   └── images/                      # High-resolution local venue and room photography
└── src/
    ├── app/                         # Next.js App Router routes
    │   ├── api/                     # Backend server routes
    │   │   ├── bookings/            # Booking initiation endpoint
    │   │   ├── cron/release-holds/  # Automated cleanup endpoint for expired slot holds
    │   │   └── webhooks/paymongo/   # Webhook handler for PayMongo payment confirmation
    │   ├── book/                    # Customer booking wizard pages
    │   │   ├── checkout-mock/       # Sandbox payment simulator for local testing
    │   │   ├── success/             # Post-payment confirmation receipt page
    │   │   └── page.tsx             # Booking shell and wizard container
    │   ├── globals.css              # Design system tokens and baseline styling
    │   ├── layout.tsx               # Root layout with font injection and metadata
    │   └── page.tsx                 # Main marketing landing page
    ├── components/
    │   ├── booking/                 # Wizard steps: RoomCard, TimeSlotPicker, AddOnList,
    │   │                            # CustomerForm, BookingSummary, BookingWizard
    │   ├── landing/                 # Modular marketing sections: Hero, Rooms, Stats,
    │   │                            # HowItWorks, Packages, FAQ, CTA, etc.
    │   ├── layout/                  # Shared navigation (Navbar) and Footer components
    │   └── ui/                      # Base buttons, animated wrappers, count-ups
    ├── lib/
    │   ├── appwrite/                # Appwrite client and server SDK instantiations
    │   ├── booking-engine.ts        # Core reservation logic, rate calculators, slot holds
    │   ├── datetime.ts              # Timezone translations, slot generation, hold timers
    │   ├── design/                  # Brand constants, marketing statistics, design tokens
    │   ├── mock-data.ts             # Fallback data for rooms, packages, and venue settings
    │   └── paymongo.ts              # PayMongo checkout session creation and signature checks
    └── types/
        └── index.ts                 # Authoritative TypeScript types across all subsystems
```

---

## 4. Domain Data Models & Database Architecture

The system uses Appwrite Database collections defined under the database identifier `karaoke_db`:

### 1. `venues`
Defines operational policies, hours, deposit rules, and brand data.
- Identifier, Name, Slug, Contact details, Address
- Timezone (default: Asia/Manila) and Currency (PHP)
- Deposit Strategy: Percentage-based or fixed PHP amount
- Hold Duration: Default 15 minutes
- Operating Schedule: Opening hour, closing hour, and slot interval duration (e.g., 60-minute blocks)

### 2. `rooms`
Physical soundproof suites available for reservation.
- Room identifier, Venue reference, Name, Slug, Description
- Capacity range: Minimum and maximum guest limits
- Base hourly rate in Philippine Pesos (PHP)
- Photos array and feature amenity tags

### 3. `slots`
Atomic reservation blocks representing reserved room intervals.
- **Slot Key**: Unique composite index formatted as `{roomId}_{slotStartUtc}`. This prevents race conditions and accidental double-bookings at the database level.
- Status: `held`, `confirmed`, or `released`
- `heldUntil`: Expiration timestamp for temporary reservation holds
- Associated booking reference

### 4. `bookings`
Comprehensive booking records tracking customer requests and lifecycles.
- Human-friendly booking reference code (e.g., `KTV-7A9B-X2`)
- Associated venue and room references
- Customer profile: Full name, email address, phone number, special requests
- Slot timing: Booking start time, end time, and duration in hours
- Pricing snapshot: Base rate, duration, room total, add-ons total, discounts, grand total, and required deposit
- Payment status: `pending`, `paid`, `failed`, or `refunded`
- Magic Link Token: Secure token for customer self-service status retrieval
- Booking status: `holding`, `confirmed`, `cancelled`, `completed`, or `expired`

### 5. `addons` & `pricing_rules`
- `addons`: Optional selections including party food platters, beverage packages, and specialized microphones.
- `pricing_rules`: Dynamic rate rules supporting peak-hour multipliers, weekend rates, and minimum hour requirements.
- `blackout_dates`: Date and time ranges reserved for venue maintenance or private buyouts.

---

## 5. Booking & Payment Lifecycle

### Step 1: Slot Selection & Holding
1. The customer selects a room, booking date, start time, and duration via the booking wizard.
2. The system queries existing slots to ensure no overlapping `held` (with active `heldUntil`) or `confirmed` records exist.
3. Upon form submission, the booking engine writes `held` records with an expiration timestamp calculated using `now + 15 minutes`.
4. A booking record is generated in the `holding` state with a calculated pricing breakdown.

### Step 2: Deposit Enforcement
- PayMongo enforces a hard platform floor of ₱100.00 for transactions.
- The booking engine automatically clamps required deposits: `Math.max(calculatedDeposit, ₱100)`, capped at the booking grand total.

### Step 3: Checkout Session Creation
- The server generates a PayMongo Hosted Checkout v2 session with amount specified in centavos (`amount * 100`).
- Metadata containing the `bookingId` and `bookingReference` is attached to the checkout session.
- The customer is redirected to the PayMongo checkout interface (or local sandbox mock in development).

### Step 4: Webhook Payment Reconciliation
- When the customer completes payment, PayMongo dispatches a `checkout_session.payment.paid` event to `/api/webhooks/paymongo`.
- The webhook endpoint verifies the `paymongo-signature` header using HMAC SHA-256 against `PAYMONGO_WEBHOOK_SECRET`.
- On valid verification:
  - The booking status updates to `confirmed`.
  - Associated slots update from `held` to `confirmed`.
  - Payment details (channel, transaction ID, payment timestamp) are committed to the booking document.

### Step 5: Automated Hold Release (Cron Engine)
- If a customer abandons the checkout session, the temporary hold expires after 15 minutes.
- The endpoint `/api/cron/release-holds` is queried periodically.
- It scans for `held` slots where `heldUntil < current_timestamp`, deletes or marks them `released`, and transitions abandoned bookings from `holding` to `expired`.

---

## 6. The "Frozen Core" Architecture
To prevent regressions during visual redesigns, a strict boundary separates user interface components from business logic:

### Frozen Subsystems (No modifications permitted without explicit engine upgrades)
- Core Booking Engine: `src/lib/booking-engine.ts`
- Timezone and Date Operations: `src/lib/datetime.ts`
- Payment Gateway Handler: `src/lib/paymongo.ts`
- Appwrite Database Configurations: `src/lib/appwrite/**`
- System Mock Data: `src/lib/mock-data.ts`
- Server API Routes: `src/app/api/**`
- Authoritative Type Contracts: `src/types/index.ts`
- Setup & Test Scripts: `scripts/**`

### Mutable Subsystems
- Landing page presentation and marketing sections (`src/components/landing/**`)
- Navigation and footer layouts (`src/components/layout/**`)
- Visual design tokens and themes (`src/app/globals.css`, `src/lib/design/**`)
- Wizard UI presentation layers consuming existing component prop interfaces (`src/components/booking/**`)

---

## 7. Verification & Testing Framework
The repository uses a zero-dependency, assertion-based test runner executed via `npm test` (`tsx scripts/test-booking-engine.ts`).

The suite guarantees:
1. **Discrete Slot Generation**: Proper division of multi-hour reservations into individual slot records with unique composite keys.
2. **Deposit Clamping**: Correct percentage calculations and enforcement of the ₱100 PayMongo transaction minimum.
3. **HMAC Webhook Security**: Correct verification of valid PayMongo signatures and immediate rejection of forged payloads.
4. **Human-Friendly References**: Verification that booking reference strings match format requirements (`KTV-XXXX-XX`).
5. **Hold Expiration Math**: Precise identification of active versus expired temporary slot holds across timezone boundaries.

---

## 8. Current State & Active Roadmap
1. **Visual Style**: Successfully upgraded to a dark editorial nightlife theme utilizing Space Grotesk and Inter typography with electric orange accents.
2. **Current Specifications**: An approved design specification and implementation plan exist under `docs/superpowers/` outlining:
   - Modern Japanese KTV brand alignment (soundproof private suites, 50,000+ song catalog, complimentary drink bar).
   - "Encore to Go" mobile karaoke equipment rental and setup service across Metro Manila, featuring inquiry capture modals and direct WhatsApp concierge communication.
