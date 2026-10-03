# Japanese KTV Redesign & Mobile Machine Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the ENCORE web application from an audiophile/studio recording aesthetic into a clean Japanese/Asian-style private karaoke lounge and introduce a mobile karaoke machine rental and event delivery service.

**Architecture:** Update brand constants and navigation, build a consolidated 3-pillar `ExperienceSection`, create a `MobileRentalSection` with an interactive `RentalInquiryModal` and WhatsApp concierge integration, realign `HeroSection`, `StatsStrip`, and `FaqSection`, and reassemble `src/app/page.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React / SVG icons.

**Spec:** [`docs/superpowers/specs/2026-10-03-japanese-ktv-redesign-and-delivery-design.md`](file:///c:/Users/koi/Documents/repositories/karaoke_web_booking/docs/superpowers/specs/2026-10-03-japanese-ktv-redesign-and-delivery-design.md)

## Global Constraints

- Preserve all frozen files: `src/lib/booking-engine.ts`, `src/lib/datetime.ts`, `src/lib/paymongo.ts`, `src/lib/appwrite/**`, `src/lib/mock-data.ts`, `src/app/api/**`, and `src/types/index.ts`.
- In-venue booking links must route to `/book`.
- Mobile machine rental must support both an interactive on-page modal and a direct WhatsApp concierge link.
- Maintain dark Japanese nightlife aesthetic with electric orange (`#ff551f` / `#ff773d`) accents.

## Review Focus

- Empty modal fields in `RentalInquiryModal` must show validation errors without breaking.
- Anchor links (`#rooms`, `#experience`, `#rental`, `#packages`, `#faq`) must resolve cleanly without page reload errors.
- Pre-filled WhatsApp link must properly encode Philippine phone number and event message parameters.
- Mobile responsive layout must render the new sections smoothly without horizontal overflow.
- Production build (`npm run build`) must succeed with 0 TypeScript or lint errors.

---

### Task 1: Brand & Terminology Constants Update

**Files:**
- Modify: `src/lib/design/brand.ts`
- Test: `tests/brand.test.ts` (or node verification check)

**Interfaces:**
- Produces: `BRAND.tagline = "Private Karaoke Suites & Lounge"`, `BRAND.legalName = "Encore Private Karaoke Lounge Inc."`, `BRAND.category = "Private Soundproof Suites & Event Karaoke Delivery"`

- [ ] **Step 1: Write test for brand constants**
Create a test or sanity check verifying `BRAND` fields match the spec values.

- [ ] **Step 2: Run verification to observe failure**
Verify that existing `brand.ts` still has `"Audiophile Soundstage & VIP Suites"`.

- [ ] **Step 3: Update `src/lib/design/brand.ts`**
Update `tagline`, `legalName`, and add category/rental highlights.

- [ ] **Step 4: Verify test passes**
Confirm brand values reflect Japanese KTV positioning.

- [ ] **Step 5: Commit**
```bash
git add src/lib/design/brand.ts
git commit -m "feat(brand): update brand constants to japanese private ktv positioning"
```

---

### Task 2: ExperienceSection Component Implementation

**Files:**
- Create: `src/components/landing/ExperienceSection.tsx`

**Interfaces:**
- Consumes: `LuxuryBadge`, `AmbientGlow` (optional), brand tokens.
- Produces: `<ExperienceSection />` Server/Client Component with 3 pillars:
  1. Touchscreen Songbook (50k+ multi-language songs, QR mobile remote).
  2. Vocal Audio & Soundproof Privacy (decoupled soundproof booths, dual anti-feedback mics).
  3. Soft Drink Bar & In-Room Dining (all-inclusive self-serve drink station, Japanese snack platters).

- [ ] **Step 1: Create `src/components/landing/ExperienceSection.tsx`**
Implement the 3-pillar feature grid with clean typography, iconography, and section anchor `id="experience"`.

- [ ] **Step 2: Run type check**
Run `npx tsc --noEmit` to verify syntax and props.

- [ ] **Step 3: Commit**
```bash
git add src/components/landing/ExperienceSection.tsx
git commit -m "feat(landing): implement 3-pillar japanese ktv experience section"
```

---

### Task 3: RentalInquiryModal & MobileRentalSection Implementation

**Files:**
- Create: `src/components/landing/RentalInquiryModal.tsx`
- Create: `src/components/landing/MobileRentalSection.tsx`

**Interfaces:**
- Consumes: `BRAND.whatsappConcierge`, `Button`, `LuxuryBadge`.
- Produces:
  - `<RentalInquiryModal isOpen={isOpen} onClose={...} />` with form inputs (name, phone, date, event type, location, notes) and WhatsApp link handoff.
  - `<MobileRentalSection />` with section anchor `id="rental"` featuring kit specs, coverage zones, and action buttons for modal and direct WhatsApp inquiry.

- [ ] **Step 1: Implement `RentalInquiryModal.tsx`**
Build accessible dialog modal with input validation, success summary, and auto-generated WhatsApp inquiry launcher.

- [ ] **Step 2: Implement `MobileRentalSection.tsx`**
Build delivery showcase component highlighting equipment specs (touchscreen machine, 2 wireless mics, 400W speaker, technician setup), service areas in Metro Manila, and modal triggers.

- [ ] **Step 3: Verify TypeScript compilation**
Run `npx tsc --noEmit` to ensure clean interfaces.

- [ ] **Step 4: Commit**
```bash
git add src/components/landing/RentalInquiryModal.tsx src/components/landing/MobileRentalSection.tsx
git commit -m "feat(rental): implement mobile karaoke delivery section and inquiry modal"
```

---

### Task 4: HeroSection, StatsStrip, and FaqSection Alignment

**Files:**
- Modify: `src/components/landing/HeroSection.tsx`
- Modify: `src/components/landing/StatsStrip.tsx`
- Modify: `src/components/landing/FaqSection.tsx`

**Interfaces:**
- Consumes: `BRAND`, `Button`, `LuxuryBadge`.
- Produces: Updated components aligned with Japanese KTV and physical machine rental.

- [ ] **Step 1: Update `HeroSection.tsx`**
Replace watermark `"ACOUSTIC"` with `"KARAOKE"`, update headline to `"Private Soundproof Suites. Instant Online Booking."`, replace telemetry visualizer with 3-chip feature pills (`50,000+ Songs`, `Soundproof Private Boxes`, `Included Soft Drink Bar`), and update CTAs.

- [ ] **Step 2: Update `StatsStrip.tsx`**
Update stats to `50,000+ Songs`, `100% Soundproof Boxes`, `2 Wireless Mics`, `90s Instant Booking`.

- [ ] **Step 3: Update `FaqSection.tsx`**
Replace studio audio questions with Japanese KTV and event delivery FAQs (song languages, drink bar, outside cake/food, machine delivery logistics, deposit rules).

- [ ] **Step 4: Verify type checks**
Run `npx tsc --noEmit`.

- [ ] **Step 5: Commit**
```bash
git add src/components/landing/HeroSection.tsx src/components/landing/StatsStrip.tsx src/components/landing/FaqSection.tsx
git commit -m "feat(landing): align hero, stats strip, and faqs with japanese ktv messaging"
```

---

### Task 5: Navbar & Landing Page Assembly

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: All updated landing components.
- Produces: Unified Next.js home page with smooth anchor navigation.

- [ ] **Step 1: Update `Navbar.tsx`**
Update desktop and mobile navigation links:
  - `Rooms` (`/#rooms`)
  - `Experience` (`/#experience`)
  - `Machine Rental` (`/#rental`)
  - `Packages` (`/#packages`)
  - `FAQ` (`/#faq`)
Update CTA button text to `"Reserve Room"`.

- [ ] **Step 2: Update `src/app/page.tsx`**
Import `ExperienceSection` and `MobileRentalSection`. Unmount retired sections (`SoundSystemSection`, `AsymmetricBentoSection`, `AtmosphereSection`, `VipConciergeSection`).

- [ ] **Step 3: Verify page layout**
Run `npx tsc --noEmit`.

- [ ] **Step 4: Commit**
```bash
git add src/components/layout/Navbar.tsx src/app/page.tsx
git commit -m "feat(landing): update navbar links and assemble streamlined ktv landing page"
```

---

### Task 6: Verification & Full Build Test

**Files:**
- All modified and created files.

- [ ] **Step 1: Run unit tests**
Run `npm test` to verify the frozen booking engine tests continue to pass without regression.

- [ ] **Step 2: Run production build**
Run `npm run build` to confirm all routes and components compile successfully.

- [ ] **Step 3: Commit final verification adjustments (if any)**
```bash
git status
```
