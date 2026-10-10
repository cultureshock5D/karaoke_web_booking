# Seed Reference: ENCORE Rooms, Pricing Rules, & Packages

This document contains reference definitions matching the marketing surfaces in `src/lib/design/marketing.ts`. Venue administrators can enter these records directly into the Appwrite console under the `karaoke_db` database without code modifications.

---

## 1. Rooms Collection (`rooms`)

| Room Name | Slug | Capacity Min | Capacity Max | Base Hourly Rate (PHP) | Sort Order | Suggested Features & Amenities |
|---|---|---|---|---|---|---|
| Solo Booth | `solo-booth` | 1 | 2 | ₱600 | 1 | 1-2 Singers, Twin Wireless Mics, HD Touchscreen Songbook, Soundproof Booth |
| Duet Suite | `duet-suite` | 2 | 4 | ₱1,200 | 2 | 2-4 Guests, Lounge Seating, Soft Drink Bar Access, Dual Wireless Mics |
| Barkada Room | `barkada-room` | 5 | 10 | ₱2,200 | 3 | 5-10 Guests, Spacious U-Banquette, Dynamic Party Lighting, Dual Mics |
| Party Suite | `party-suite` | 11 | 20 | ₱4,000 | 4 | 11-20 Guests, Giant 4K Display, In-Room Bar Counter, Party Lighting |

### Appwrite Document Template (JSON)
```json
[
  {
    "name": "Solo Booth",
    "slug": "solo-booth",
    "capacityMin": 1,
    "capacityMax": 2,
    "baseHourlyRate": 600,
    "description": "Perfect for personal practice, vocal warmup, or an intimate duet session.",
    "features": ["1-2 Singers", "Twin Wireless Mics", "HD Touchscreen Songbook"],
    "photos": ["/images/room-cozy-duo.jpg"],
    "sortOrder": 1,
    "isActive": true
  },
  {
    "name": "Duet Suite",
    "slug": "duet-suite",
    "capacityMin": 2,
    "capacityMax": 4,
    "baseHourlyRate": 1200,
    "description": "Cozy private room for couples, double dates, and close friend hangouts.",
    "features": ["2-4 Guests", "Lounge Seating", "Soft Drink Bar Access"],
    "photos": ["/images/room-cozy-duo.jpg"],
    "sortOrder": 2,
    "isActive": true
  },
  {
    "name": "Barkada Room",
    "slug": "barkada-room",
    "capacityMin": 5,
    "capacityMax": 10,
    "baseHourlyRate": 2200,
    "description": "The Friday night headquarters for your core group to sing and let loose.",
    "features": ["5-10 Guests", "Spacious U-Banquette", "Dynamic Party Lighting"],
    "photos": ["/images/room-vip-suite.jpg"],
    "sortOrder": 3,
    "isActive": true
  },
  {
    "name": "Party Suite",
    "slug": "party-suite",
    "capacityMin": 11,
    "capacityMax": 20,
    "baseHourlyRate": 4000,
    "description": "Our largest private room for milestone birthdays, send-offs, and company celebrations.",
    "features": ["11-20 Guests", "Giant 4K Display", "Private In-Room Bar Counter"],
    "photos": ["/images/room-starlight-hall.jpg"],
    "sortOrder": 4,
    "isActive": true
  }
]
```

---

## 2. Pricing Rules Collection (`pricing_rules`)

| Rule Name | Rule Type | Days of Week | Start Hour (PHT) | End Hour (PHT) | Rate Multiplier | Min Hours | Description |
|---|---|---|---|---|---|---|---|
| Weekend Evening Peak | `peak` | `[5, 6]` (Fri, Sat) | 18 (6:00 PM) | 4 (4:00 AM) | `1.25` (+25%) | 2 | Prime evening weekend rate with 2-hour minimum duration |
| Weekday Daytime Early Bird | `off_peak` | `[1, 2, 3, 4, 5]` (Mon-Fri) | 14 (2:00 PM) | 17 (5:00 PM) | `0.80` (-20%) | 1 | 20% discount on weekday afternoons before 5:00 PM |

---

## 3. Occasion Packages & Add-ons (`addons`)

| Package / Add-On Name | Category | Price (PHP) | Max Qty | Description & Inclusions |
|---|---|---|---|---|
| Barkada Night Package (3 hrs) | `food` | ₱7,500 | 1 | 3 hours in Barkada Room, signature sliders & skewers platter, first drink round, unlimited soft drinks |
| Birthday Bash Package (3 hrs) | `food` | ₱14,500 | 1 | 3 hours in Party Suite, party food banquet platter, drink rounds, cake table setup, party lighting |
| Date Night Package (3 hrs) | `food` | ₱4,000 | 1 | 3 hours in Duet Suite, 2 signature craft drinks, artisanal dessert tasting platter |
| Corporate / Custom Buyout | `equipment` | ₱0 | 1 | Custom inquiry for multi-room bookings or full venue buyout with tailored catering (quoted via concierge) |

---

## 4. Venue Policies Configuration (`venues`)

- **Deposit Requirement**: `percentage` = `30%` (Minimum ₱100 PayMongo floor automatically enforced by booking engine).
- **Hold Duration**: `15 minutes` (Automated cron cleanup frees unconfirmed holds).
- **Payment Rails**: PayMongo Hosted Checkout v2 supporting GCash, Maya, Cards, GrabPay, and QRPH.
- **Operating Hours**: 14:00 (2:00 PM) to 04:00 (4:00 AM) PHT.
