// Display copy only. Billing is computed by booking-engine from Appwrite data. Keep these in sync.

export interface MarketingRoom {
  name: string;
  slug: string;
  guests: string;
  minGuests: number;
  maxGuests: number;
  weekdayRate: number;
  weekdayRateFormatted: string;
  peakRate: number;
  peakRateFormatted: string;
  vibe: string;
  amenities: string[];
  image: string;
}

export const MARKETING_ROOMS: MarketingRoom[] = [
  {
    name: "Solo Booth",
    slug: "solo-booth",
    guests: "1–2",
    minGuests: 1,
    maxGuests: 2,
    weekdayRate: 600,
    weekdayRateFormatted: "₱600",
    peakRate: 750,
    peakRateFormatted: "₱750",
    vibe: "Perfect for personal practice, vocal warmup, or an intimate duet session.",
    amenities: ["1–2 Singers", "Twin Wireless Mics", "HD Touchscreen Songbook"],
    image: "/images/room-cozy-duo.jpg", // TODO(owner): replace with photo of guests
  },
  {
    name: "Duet Suite",
    slug: "duet-suite",
    guests: "2–4",
    minGuests: 2,
    maxGuests: 4,
    weekdayRate: 1200,
    weekdayRateFormatted: "₱1,200",
    peakRate: 1500,
    peakRateFormatted: "₱1,500",
    vibe: "Cozy private room for couples, double dates, and close friend hangouts.",
    amenities: ["2–4 Guests", "Lounge Seating", "Complimentary Drink Bar"],
    image: "/images/room-cozy-duo.jpg", // TODO(owner): replace with photo of guests
  },
  {
    name: "Barkada Room",
    slug: "barkada-room",
    guests: "5–10",
    minGuests: 5,
    maxGuests: 10,
    weekdayRate: 2200,
    weekdayRateFormatted: "₱2,200",
    peakRate: 2750,
    peakRateFormatted: "₱2,750",
    vibe: "The Friday night headquarters for your core group to sing and let loose.",
    amenities: ["5–10 Guests", "Spacious U-Banquette", "Dynamic Party Lighting"],
    image: "/images/room-vip-suite.jpg", // TODO(owner): replace with photo of guests
  },
  {
    name: "Party Suite",
    slug: "party-suite",
    guests: "11–20",
    minGuests: 11,
    maxGuests: 20,
    weekdayRate: 4000,
    weekdayRateFormatted: "₱4,000",
    peakRate: 5000,
    peakRateFormatted: "₱5,000",
    vibe: "Our largest private room for milestone birthdays, send-offs, and company celebrations.",
    amenities: ["11–20 Guests", "Giant 4K Screen", "Private In-Room Bar Counter"],
    image: "/images/room-starlight-hall.jpg", // TODO(owner): replace with photo of guests
  },
];

export const PRICING_RULES_DISPLAY = {
  peakPolicy: "Fri–Sat from 6:00 PM to close is +25% peak rate (2-hour minimum).",
  weekdayDiscount: "Weekday daytime (before 5:00 PM) is 20% off base rate.",
  depositRequirement: "30% room deposit paid online to hold your slot; remaining balance settled at the venue.",
  paymentChannels: "Pay online with GCash, Maya, cards, GrabPay, or QRPH via PayMongo.",
  holdDuration: "15 minutes guaranteed slot lock while you complete checkout.",
};

export interface OccasionPackage {
  id: string;
  name: string;
  targetAudience: string;
  duration: string;
  includes: string[];
  price: string;
  isPopular?: boolean;
  isCorporate?: boolean;
  actionText: string;
  actionHref: string;
}

export const OCCASION_PACKAGES: OccasionPackage[] = [
  {
    id: "barkada-night",
    name: "Barkada Night",
    targetAudience: "Friend groups & weekend celebrations (5–10 guests)",
    duration: "3 Hours Room Included",
    includes: [
      "3 full hours in our spacious Barkada Room",
      "Signature party food platter (sliders, skewers & truffle fries)",
      "First drink round included for everyone",
      "Unlimited access to the soft drink bar",
    ],
    price: "₱7,500",
    isPopular: true,
    actionText: "Book this package",
    actionHref: "/book",
  },
  {
    id: "birthday-bash",
    name: "Birthday Bash",
    targetAudience: "Milestone birthdays & big gatherings (11–20 guests)",
    duration: "3 Hours Room Included",
    includes: [
      "3 hours in the flagship Party Suite with giant display",
      "Curated party food banquet platter",
      "Drink rounds & celebratory cocktail / mocktail setup",
      "Dedicated cake table setup & party lighting mode",
    ],
    price: "₱14,500",
    actionText: "Book this package",
    actionHref: "/book",
  },
  {
    id: "date-night",
    name: "Date Night",
    targetAudience: "Couples & duet pairs (2 guests)",
    duration: "3 Hours Room Included",
    includes: [
      "3 intimate hours in the Duet Suite",
      "2 signature craft cocktails, mocktails, or wine glasses",
      "Artisanal dessert tasting platter",
      "Comfortable ambient lighting & privacy",
    ],
    price: "₱4,000",
    actionText: "Book this package",
    actionHref: "/book",
  },
  {
    id: "corporate-custom",
    name: "Corporate & Team Outings",
    targetAudience: "Company celebrations, department socials & off-sites",
    duration: "Flexible Half-Day / Evening Sessions",
    includes: [
      "Multi-room booking or full private floor reservation",
      "Custom buffet catering, bar tab, and dietary accommodations",
      "Wireless mic setup for team speeches and presentations",
      "Dedicated event host & coordinator throughout your stay",
    ],
    price: "Ask us",
    isCorporate: true,
    actionText: "Ask our events concierge",
    actionHref: "#rental",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Pick your room & time",
    description: "Choose the room that fits your group, select your date, and pick your start time.",
  },
  {
    step: "02",
    title: "Pay a 30% deposit",
    description: "Hold your slot instantly for 15 minutes. Pay securely with GCash, Maya, cards, or QRPH.",
  },
  {
    step: "03",
    title: "Show up & sing",
    description: "Walk in, check in, settle your remaining balance at the venue, and enjoy your private night.",
  },
];

export const IN_EVERY_ROOM_SPECS = [
  {
    title: "Soundproof Private Suites",
    description: "Every room is fully isolated with solid doors. Sing your heart out with zero outside distraction.",
  },
  {
    title: "50,000+ Multi-Language Songs",
    description: "English classics, OPM anthems, K-Pop, and J-Pop updated weekly on high-resolution touchscreens.",
  },
  {
    title: "Complimentary Soft Drink Bar",
    description: "Free-flowing chilled sodas, iced tea, and filtered water included for all guests. (TODO(owner): confirm policy)",
  },
  {
    title: "Dual Wireless Microphones",
    description: "High-clarity wireless mics in every room tuned for balanced vocal warmth with anti-howling feedback control.",
  },
];

export const STATS = [
  { value: 4, label: "Private Rooms", suffix: "", detail: "Solo Booth to 20-Person Party Suite" },
  { value: 1, label: "Fits 1 to 20 Guests", suffix: "–20", detail: "Room sizes tailored to every group" },
  { value: 600, label: "From ₱600/hr", suffix: "₱", detail: "Weekday rates with no hidden fees" },
  { value: 2, label: "Book Under 2 Min", suffix: "m", detail: "Fast online reservation with zero phone calls" },
  { value: 30, label: "Online Deposit", suffix: "%", detail: "Pay via GCash, Maya, cards, or QRPH" },
  { value: 15, label: "Minute Slot Hold", suffix: "m", detail: "Guaranteed room protection during checkout" },
] as const;

export interface FaqItem {
  question: string;
  answer: string;
  category: "pricing" | "groups" | "payments" | "policies";
}

export const FAQS: FaqItem[] = [
  {
    category: "pricing",
    question: "How much does a private karaoke room cost?",
    answer: "Rooms start at ₱600/hr for the Solo Booth (1–2 guests), ₱1,200/hr for the Duet Suite (2–4 guests), ₱2,200/hr for the Barkada Room (5–10 guests), and ₱4,000/hr for the Party Suite (11–20 guests). Friday and Saturday evenings from 6:00 PM are +25% peak rate with a 2-hour minimum.",
  },
  {
    category: "groups",
    question: "How big a group can you accommodate?",
    answer: "We have rooms for every group size from 1 singer up to 20 guests in our flagship Party Suite. For larger corporate gatherings or full venue buyouts (up to 60+ guests), reach out to our event concierge via Encore to Go / WhatsApp.",
  },
  {
    category: "payments",
    question: "How does the deposit and booking work?",
    answer: "When you select your time, our system holds your slot for 15 minutes so no one else can book it. You pay a 30% deposit online via GCash, Maya, cards, GrabPay, or QRPH. The remaining balance is paid at the venue when you check in.",
  },
  {
    category: "policies",
    question: "What if I'm running late or need to cancel?",
    answer: "Your room remains reserved for you even if you arrive late, though sessions finish at the scheduled end time if another group is booked after. Cancellations made at least 24 hours in advance receive a full deposit credit or reschedule. // TODO(owner): confirm policy",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "For your online deposit, we accept GCash, Maya, Visa/Mastercard credit & debit cards, GrabPay, and QRPH via PayMongo. At the venue, you can settle your remaining balance using cash, credit/debit cards, or e-wallets.",
  },
  {
    category: "policies",
    question: "Can I bring my own outside food or drinks?",
    answer: "We offer hot party snacks, platters, and in-room bar service. Outside celebration cakes are welcome free of charge. Other outside food or alcoholic beverages may be subject to a corkage fee. // TODO(owner): confirm policy",
  },
];

export const TRUST_LINES = {
  holdGuarantee: "Your room is held for 15 minutes while you pay.",
  noDoubleBooking: "Zero double-bookings with instant slot lock.",
  priceAnchor: "Rooms from ₱600/hr. Pay a deposit with GCash or Maya.",
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  suite: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Booked the Barkada Room for my birthday and it was the easiest night out to plan. Instant GCash deposit, zero waiting when we arrived, and the sound was incredible.",
    author: "Camille Reyes",
    role: "Birthday Host",
    suite: "Barkada Room",
    rating: 5,
  },
  {
    quote:
      "Our team had an absolute blast in the Party Suite. The 4K screen and dual wireless mics kept everyone singing for three straight hours.",
    author: "Marc Ramos",
    role: "Tech Team Lead",
    suite: "Party Suite",
    rating: 5,
  },
  {
    quote:
      "Best private karaoke experience in BGC. The rooms are actually private, clean, and the booking system took literally two minutes.",
    author: "Anton & Bea",
    role: "Regular Guests",
    suite: "Duet Suite",
    rating: 5,
  },
];
