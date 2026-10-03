# Design Spec: Japanese-Style KTV Redesign & Mobile Machine Delivery

- **Date**: 2026-10-03
- **Status**: Approved Design (Ready for Implementation Planning)
- **Target Venue**: ENCORE Private Karaoke Lounge (BGC, Metro Manila)

---

## 1. Overview & Goals

This specification details the transformation of the ENCORE web presence from an audiophile/studio recording theme into a clean, modern Japanese/Asian-style private karaoke (KTV) booking platform, and adds a mobile physical karaoke machine rental and delivery service for off-site events.

### Primary Goals
1. **Realign Brand Identity**: Pivot messaging from acoustic studio jargon ("STC 65 telemetry", "nearfield Genelec monitoring", "Bento Matrix") to a welcoming, high-end Japanese-style private karaoke box ("Private Soundproof Suites", "50,000+ Multi-Language Songbook", "Complimentary Soft Drink Bar").
2. **Streamline Landing Page**: Consolidate redundant technical sections into an engaging 8-section layout focused on rooms, song selection, vocal audio clarity, and packages.
3. **Introduce Mobile Karaoke Rental & Delivery ("Encore to Go")**: Add a dedicated service showcasing physical karaoke equipment rental for birthdays, house parties, and corporate events across Metro Manila, featuring both an interactive on-page inquiry modal and direct WhatsApp concierge booking.
4. **Preserve the Frozen Core**: Keep `src/lib/booking-engine.ts`, `src/lib/datetime.ts`, `src/lib/paymongo.ts`, `src/lib/appwrite/**`, `src/lib/mock-data.ts`, `src/app/api/**`, and `src/types/index.ts` completely untouched.

---

## 2. Brand & Terminology System

### 2.1 Brand Constants (`src/lib/design/brand.ts`)
- **Venue Name**: `ENCORE`
- **Tagline**: `"Private Karaoke Suites & Lounge"`
- **Legal Name**: `"Encore Private Karaoke Lounge Inc."`
- **Feature Badge**: `"Soundproof Private Suites · Multi-Language Catalog · Event Delivery"`
- **Contact Channels**: Preserves WhatsApp concierge, phone, and venue address in BGC, Taguig.

### 2.2 Terminology Translation Table
| Deprecated Audiophile Jargon | Modern Japanese KTV Equivalent |
|---|---|
| Audiophile Soundstage / Acoustic Laboratory | Private Karaoke Lounge / Soundproof Suites |
| STC 65 Recording Studio Soundproofing | Acoustically Isolated Private Rooms |
| Shure Axient Digital Wireless Telemetry | Dual Anti-Feedback Wireless Microphones |
| Genelec Nearfield Mastering Monitors | Balanced Vocal Audio System |
| 24-Bit / 96kHz Lossless Frequency Pill | 50,000+ Song Catalog (J-Pop, K-Pop, OPM, English) |
| Bento Matrix | All-Inclusive Drink Bar & In-Room Dining |

---

## 3. Architecture & Section Hierarchy

The landing page (`src/app/page.tsx`) will be structured as follows:

```
src/app/page.tsx
 ├── Navbar (Rooms, Experience, Machine Rental, Packages, FAQ + "Reserve Room" CTA)
 ├── HeroSection (Atmosphere background, clean headline, 3-chip feature row, booking CTAs)
 ├── StatsStrip (50,000+ Songs, 100% Soundproof, 2 Wireless Mics, 90s Instant Booking)
 ├── RoomsSection (Cozy Duo, VIP Suite, Mega Party Hall)
 ├── ExperienceSection (3 Pillars: Touchscreen Songbook, Vocal Audio Quality, Soft Drink Bar)
 ├── MobileRentalSection (Physical Karaoke Machine Delivery & Event Rental)
 ├── PackagesSection (Party platters, all-inclusive drink upgrades, celebration add-ons)
 ├── HowItWorksSection (4 Steps: Room -> Time Slot -> Add-ons -> Instant Deposit)
 ├── FaqSection (Songbook updates, drink bar inclusions, outside food, deposits)
 ├── CtaSection (Final in-venue booking prompt)
 └── Footer (Operating hours, BGC location, socials, copyright)
```

### Component Changes:
- **Created**:
  - `src/components/landing/ExperienceSection.tsx`: Replaces `SoundSystemSection`, `AsymmetricBentoSection`, and `AtmosphereSection`.
  - `src/components/landing/MobileRentalSection.tsx`: Showcases the "Encore to Go" delivery service.
  - `src/components/landing/RentalInquiryModal.tsx`: Interactive modal for event machine rental requests.
- **Updated**:
  - `src/lib/design/brand.ts`: Updated brand constants and marketing copy.
  - `src/components/layout/Navbar.tsx`: Updated navigation links, anchor tags, and mobile drawer.
  - `src/components/landing/HeroSection.tsx`: Replaced watermark from `"ACOUSTIC"` to `"KARAOKE"`, updated headline/subtitles, replaced audio visualizer with clean feature badges.
  - `src/components/landing/StatsStrip.tsx`: Aligned statistics with karaoke metrics.
  - `src/components/landing/RoomsSection.tsx`: Emphasized singing capacities and room amenities.
  - `src/components/landing/FaqSection.tsx`: Replaced studio questions with customer karaoke questions.
  - `src/app/page.tsx`: Reassembled page using the streamlined section set.
- **Retired from `page.tsx`**:
  - `SoundSystemSection.tsx`, `AsymmetricBentoSection.tsx`, `AtmosphereSection.tsx`, `VipConciergeSection.tsx`.

---

## 4. Feature Detail: Mobile Machine Rental ("Encore to Go")

### 4.1 Rental Kit Specifications
- **Hardware**: Commercial touchscreen karaoke unit with built-in digital vocal mixer and real-time pitch scoring.
- **Songbook**: 50,000+ preloaded licensed tracks (English, J-Pop/Anime, K-Pop, OPM, Mandopop) running offline with zero buffering.
- **Audio Output**: 400W active high-clarity PA speaker + 2 UHF digital wireless microphones with frequency hopping and anti-howling filters.
- **Setup & Logistics**: Delivery, cable dressing, audio calibration, and post-event pickup handled by an Encore field technician.
- **Coverage**: Bonifacio Global City, Makati, Ortigas, Mandaluyong, Pasay, San Juan, and Quezon City.

### 4.2 Booking Channels
1. **Interactive Modal (`RentalInquiryModal.tsx`)**:
   - Collects: Full Name, Contact Number/WhatsApp, Event Date, Event Type (Birthday, House Party, Corporate, Wedding), Delivery Address / City, and Notes.
   - Generates an instant booking summary with confirmation notice and triggers an instant WhatsApp concierge pre-fill.
2. **Direct WhatsApp Concierge Link**:
   - Pre-formatted link to `BRAND.whatsappConcierge` with auto-filled text: `"Hi Encore, I would like to inquire about renting a karaoke machine for an event on [Date] in [Location]."`

---

## 5. Testing & Verification Plan

1. **TypeScript Verification**: Run `npx tsc --noEmit` to confirm zero type errors.
2. **Next.js Production Build**: Run `npm run build` to confirm all routes and static pages compile cleanly.
3. **Core Engine Integrity**: Run `npm test` to ensure existing booking engine test suites pass unchanged.
4. **Interactive Navigation Verification**: Test anchor scroll targets (`#rooms`, `#experience`, `#rental`, `#packages`, `#faq`) and `/book` redirection.
5. **Modal & Form Verification**: Verify the event rental modal opens, validates inputs, and triggers the WhatsApp handoff correctly.
