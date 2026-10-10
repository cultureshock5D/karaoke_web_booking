# AI Prompts & Workflow Log

This document records the primary AI prompt directives executed during the development of the ENCORE web booking system.

---

### Prompt 1: Landing Page Redesign
- **Prompt:** "Reposition the ENCORE landing page to sell the experience, not the equipment. Rewrite marketing surfaces so they sell what happens in the room: the fun, group fit, price, and how easy it is to book in BGC. Respect Frozen Core rules."
- **Produced:**
  - `src/lib/design/brand.ts`: Updated BGC venue positioning and editorial tokens.
  - `src/lib/design/marketing.ts`: Source of truth for room suites, packages, pricing rules, steps, specs, and FAQs.
  - `src/components/landing/**`: Rewrote Hero, Stats, Rooms, Packages, How It Works, In Every Room, Encore to Go, FAQ, and CTA sections.

---

### Prompt 2: Midterm Submission Architecture (Users, Auth, and Roles)
- **Prompt:** "Implement Part 2: Users (20%). Use Appwrite Auth as identity provider, Argon2 server-side password hashing, HttpOnly session cookie, dual roles (admin via label, customer as default), Next.js 16 request interceptor (proxy.ts), session helpers (getCurrentUser, requireUser, requireAdmin), friendly validation errors, and idempotent test account seeding."
- **Produced:**
  - `src/types/auth.ts`: Auth interfaces.
  - `src/lib/auth/appwrite-auth.ts`: Node-Appwrite client factories.
  - `src/lib/auth/session.ts`: Session extraction and role enforcement guards.
  - `src/lib/auth/validation.ts`: Registration, login, and open-redirect validators.
  - `src/app/(auth)/**`: Server actions and UI pages for login, registration, and email verification.
  - `src/proxy.ts`: Next.js 16 request interceptor.
  - `tools/seed-test-accounts.ts`: Script to seed `admin@encore.test` and `customer@encore.test`.

---

### Prompt 3: Admin Room CRUD & Customer Account
- **Prompt:** "Implement Part 3: CRUD (25%) on Rooms and Part 4: Customer Account. Full Create, Read, Update, Delete for rooms against Appwrite rooms collection; server-side validation; accessible delete confirmation dialog; booking conflict integrity guard; read-only bookings register; customer account with display name update and email-verification gated booking history."
- **Produced:**
  - `src/types/room-admin.ts`: Room CRUD types.
  - `src/lib/admin/room-validation.ts`: Room attributes validation.
  - `src/lib/admin/rooms.ts`: Appwrite database operations and `checkRoomHasActiveBookings` guard.
  - `src/app/admin/**`: Admin overview, room list, create form, update form, read-only bookings register, and 403 forbidden page.
  - `src/app/account/**`: Customer account dashboard and display name update action.
  - `src/components/layout/Navbar.tsx`: Integrated auth states (Log in / Register vs User Role / My Bookings / Admin / Log out).

---

### Prompt 4: Testing & Documentation Sweep
- **Prompt:** "Implement application test suite (tests/app-validation.test.ts) covering validators, open-redirect prevention, and integrity guards. Verify npm test, npm run test:app, and npm run build. Confirm Frozen Core diff. Author README.md, docs/CODE_WALKTHROUGH.md, and docs/AI_PROMPTS.md."
- **Produced:**
  - `tests/app-validation.test.ts`: Zero-dependency test suite using Node.js `assert`.
  - `package.json`: Added `test:app` and `seed:accounts` scripts.
  - `README.md`: Complete project documentation with verbatim claim line, setup instructions, and demo credentials.
  - `docs/CODE_WALKTHROUGH.md`: Plain-language explanation of request flows and 10 defense questions.
  - `docs/AI_PROMPTS.md`: AI prompt disclosure log.

---
`TODO(student): add any other AI tools or prompts you used`
