# UI/UX Redesign Notes: `karaoke_web_booking`

## 1. Overview
The user interface has been transformed from a generic template into a **dark, bold, editorial design system** inspired by the high-end nightlife aesthetic. The booking engine, database schema, payments, cron, webhooks, and core data contracts remain untouched.

- **Branch**: `redesign/dark-editorial-ui`
- **Design Tokens**: Dark `#111111` background, `#f2f2f2` primary text, electric orange `#e85c1a` accent, `#1a1a1a` surface, sharp corners (`rounded-[2px]`), 1px borders, and 150ms transitions.
- **Typography**: Space Grotesk (500/700) for headlines, pricing, and tabular figures; Inter (300/400/500) for body and eyebrows with `0.14em` letter-spacing.

---

## 2. Commit History (Phase by Phase)
1. `00d2920` - `feat(design): implement design tokens, typography, brand, and layout foundation`
   - Added `motion` dependency.
   - Configured Space Grotesk and Inter in [layout.tsx](file:///src/app/layout.tsx).
   - Created design tokens in [globals.css](file:///src/app/globals.css).
   - Created [brand.ts](file:///src/lib/design/brand.ts) and [marketing.ts](file:///src/lib/design/marketing.ts).
   - Built shared [Navbar.tsx](file:///src/components/layout/Navbar.tsx), [Footer.tsx](file:///src/components/layout/Footer.tsx), [FadeUp.tsx](file:///src/components/ui/FadeUp.tsx), [CountUp.tsx](file:///src/components/ui/CountUp.tsx), and restyled [button.tsx](file:///src/components/ui/button.tsx).
2. `fc04267` - `feat(landing): rebuild landing page with dark editorial design system`
   - Built Server Component landing page in [page.tsx](file:///src/app/page.tsx).
   - Created Hero section with faint 4% opacity "SING" background, staggered motion, and local hero asset.
   - Built full-width electric orange stats strip with animated count-up.
   - Built hover-raise rooms table, 4-step booking process, "Why Us" split layout, package cards, FAQ disclosure, and 3px orange border CTA block.
3. `ef71ae3` - `feat(wizard): redesign booking wizard with dark editorial theme, sticky summary, and accessible controls`
   - Restyled [BookingWizard.tsx](file:///src/components/booking/BookingWizard.tsx) with horizontal step tracker (`01 Room · 02 Time · 03 Add-ons · 04 Details · 05 Pay`), sticky desktop two-column layout, and mobile drawer.
   - Restyled [RoomCard.tsx](file:///src/components/booking/RoomCard.tsx), [TimeSlotPicker.tsx](file:///src/components/booking/TimeSlotPicker.tsx) (Manila PHT indicators, segmented duration control, distinct slot availability states), [AddOnList.tsx](file:///src/components/booking/AddOnList.tsx) (categorized with 10px uppercase headers and steppers), [CustomerForm.tsx](file:///src/components/booking/CustomerForm.tsx) (dark inputs, orange focus rings), and [BookingSummary.tsx](file:///src/components/booking/BookingSummary.tsx) (receipt-style card with tabular deposit callout).
4. `3d0c09d` - `feat(checkout): redesign checkout sandbox simulator and booking confirmation pages`
   - Restyled [checkout-mock/page.tsx](file:///src/app/book/checkout-mock/page.tsx) with orange-striped sandbox warning header, selectable channel rows, and webhook simulator.
   - Restyled [success/page.tsx](file:///src/app/book/success/page.tsx) with large status badge, Space Grotesk tabular reference code, and venue details.
5. `1c7e0fa` - `fix(ui): optimize CountUp effect logic for strict react hooks rules`
   - Eliminated synchronous setState in effect body to satisfy React 19 strict hooks linter.

---

## 3. Files Changed & Added

### New Files
- `src/lib/design/brand.ts`: Central venue brand constants.
- `src/lib/design/marketing.ts`: Real guaranteed marketing statistics.
- `src/components/layout/Navbar.tsx`: Sticky navbar with anchor links, slim mode for `/book`, and mobile slide-down menu.
- `src/components/layout/Footer.tsx`: Minimalist footer with social links and copyright.
- `src/components/ui/FadeUp.tsx`: Client motion component with reduced-motion support.
- `src/components/ui/CountUp.tsx`: In-view number counter with reduced-motion fallback.
- `src/components/landing/HeroSection.tsx`: Editorial hero with gradient overlay and faint background typography.
- `src/components/landing/StatsStrip.tsx`: Full-width electric orange stats banner.
- `src/components/landing/RoomsSection.tsx`: Editorial hover-raise room rows.
- `src/components/landing/HowItWorksSection.tsx`: 4-step sequence with faded background numerals.
- `src/components/landing/WhyUsSection.tsx`: Split layout with engine guarantees and local photography.
- `src/components/landing/PackagesSection.tsx`: Surface-raised package cards.
- `src/components/landing/FaqSection.tsx`: Accessible FAQ accordion with marked TODO tags.
- `src/components/landing/CtaSection.tsx`: Full-width CTA block with orange accent border.
- `public/images/hero-ktv.jpg`: High-resolution local hero photography.
- `public/images/why-us-ktv.jpg`: High-resolution local atmosphere photography.
- `public/images/room-cozy-duo.jpg`: Local photography for Cozy Duo suite.
- `public/images/room-vip-suite.jpg`: Local photography for VIP Galactic suite.
- `public/images/room-starlight-hall.jpg`: Local photography for Mega Starlight party hall.

### Modified Files
- `package.json` & `package-lock.json`: Added `motion` dependency.
- `src/app/globals.css`: Dark editorial tokens (`@theme inline`, custom properties, tabular numbers, eyebrow styling).
- `src/app/layout.tsx`: Space Grotesk and Inter via `next/font/google`.
- `src/app/page.tsx`: Server Component assembling all landing sections.
- `src/app/book/page.tsx`: Slim navbar shell, venue header, and booking wizard.
- `src/app/book/checkout-mock/page.tsx`: Sandbox simulator interface.
- `src/app/book/success/page.tsx`: Booking confirmation and status receipt.
- `src/components/ui/button.tsx`: Sharp corners (`rounded-[2px]`), electric orange defaults, 150ms transitions.
- `src/components/booking/RoomCard.tsx`: Sharp surface card, local image support, keyboard accessibility.
- `src/components/booking/TimeSlotPicker.tsx`: PHT schedule grid, segmented duration, non-color-only slot states.
- `src/components/booking/AddOnList.tsx`: Categorized add-on groups with quantity steppers.
- `src/components/booking/CustomerForm.tsx`: Dark inputs with orange focus rings and validation preservation.
- `src/components/booking/BookingSummary.tsx`: Receipt panel with tabular deposit callout.
- `src/components/booking/BookingWizard.tsx`: Horizontal numbered stepper and desktop/mobile responsive layouts.

---

## 4. Frozen Zone Compliance Audit
Per Section 1.1 constraints, **none** of the following frozen files or subsystems were modified:
- `src/lib/booking-engine.ts` (0 edits)
- `src/lib/datetime.ts` (0 edits)
- `src/lib/paymongo.ts` (0 edits)
- `src/lib/appwrite/**` (0 edits)
- `src/lib/mock-data.ts` (0 edits)
- `src/app/api/**` (0 edits)
- `src/types/index.ts` (0 edits)
- `scripts/**` (0 edits)

All component props, callbacks, and data contracts between `BookingWizard`, `RoomCard`, `TimeSlotPicker`, `AddOnList`, `CustomerForm`, and `BookingSummary` were preserved exactly.

---

## 5. Items Skipped or Deferred
1. **Live Hold Countdown in BookingSummary**:
   - The brief noted: *"When a hold is active, show a hold countdown derived from the existing hold expiry data... If the countdown requires data the wizard doesn't currently expose, skip it and leave a TODO comment instead of touching the engine."*
   - `BookingSummaryProps` does not receive `heldUntil` or active hold timestamps from the engine prior to checkout redirection.
   - Per instructions, this was skipped and documented with a `TODO` comment in `BookingSummary.tsx` to keep the engine frozen.

2. **Room Param in `/book`**:
   - The brief noted: *"orange `→` linking to `/book?room={id}` only if `/book` already supports that param; otherwise link to `/book`."*
   - `/book` currently initializes state with `rooms[0]` and does not read URL search parameters. Therefore, links direct to `/book` to preserve current behavior.

---

## 6. Placeholder Assets & Copy Needing Real Venue Data
The following items use high-polish placeholders and should be updated with actual venue data before production launch:
1. **Brand Details**: `BRAND.name` ("ENCORE"), address, and contact email in `src/lib/design/brand.ts`.
2. **Photography**: All images in `public/images/` are generated local high-resolution editorial placeholders. Replace with real venue photography when available.
3. **Venue Policies**: In `src/components/landing/FaqSection.tsx`, exact cancellation refund terms and arrival grace period are tagged with `TODO: confirm with venue`.
4. **Social Links**: Social URLs in `src/components/layout/Footer.tsx` point to placeholder domains.

---

## 7. Verification Test Results
- `npx tsc --noEmit`: **0 errors**
- `npm run lint`: **0 new errors** (pre-existing lint errors in the frozen zone remain untouched; all modified UI files pass clean)
- `npm test`: **All 5 suite tests pass** (slot generation, PayMongo minimum deposit clamping, HMAC verification, reference format, hold expiration)
- `npm run build`: **Success** (Turbopack production build compiles all 8 routes)
- `curl / HTTP status`: **200 OK** across `/`, `/book`, `/book/checkout-mock`, and `/book/success`
