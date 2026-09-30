export interface LuxuryPackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  pricePerSession: string;
  duration: string;
  capacity: string;
  inclusions: string[];
  drinksAndDining: string;
  soundEngineering: string;
  recommendedFor: string;
  isPopular?: boolean;
}

export const LUXURY_PACKAGES: LuxuryPackage[] = [
  {
    id: "after-hours",
    name: "The After-Hours Salon",
    tagline: "Unwind in pristine audiophile intimacy",
    pricePerSession: "₱4,500",
    duration: "2 Hours Minimum",
    capacity: "Up to 3 Guests",
    inclusions: [
      "Access to The Cozy Duo Suite with Genelec mastering monitors",
      "Two Shure KSM9 vocal transmitters with custom DSP presets",
      "Welcome bottle of chilled Prosecco or premium green tea service",
      "Gourmet truffle popcorn & artisanal chocolates",
      "Instant slot locking with GCash, Maya, or Card",
    ],
    drinksAndDining: "Curated welcome beverage + sweet & savory bar snacks",
    soundEngineering: "Mastering-grade Genelec coaxial monitors with auto-calibration",
    recommendedFor: "Late-night vocalists, couples, and sound design purists",
    isPopular: false,
  },
  {
    id: "sovereign-vip",
    name: "The Sovereign VIP",
    tagline: "The premier nightlife experience in Metro Manila",
    badge: "MOST POPULAR",
    pricePerSession: "₱12,500",
    duration: "3 Hours Included",
    capacity: "Up to 10 Guests",
    inclusions: [
      "Exclusive access to the VIP Galactic Suite (STC 65 isolated)",
      "Four Shure Axient Digital wireless mics with zero RF dropout",
      "Choice of Moët & Chandon Brut Imperial or Roku Japanese Gin (700ml)",
      "Premium Wagyu sliders & Spanish charcuterie board",
      "Dedicated suite server with discreet service button",
      "Custom DMX room lighting presets synced to song tempo",
    ],
    drinksAndDining: "Premium bottle service + warm chef-prepared tapas platter",
    soundEngineering: "Martin Audio BlacklineX coaxial arrays + 18' sub-bass punch",
    recommendedFor: "Birthdays, high-stakes celebrations, and private VIP gatherings",
    isPopular: true,
  },
  {
    id: "imperial-gala",
    name: "Imperial Soundstage Gala",
    tagline: "The concert stadium reserved exclusively for your circle",
    badge: "PRIVATE BALLROOM",
    pricePerSession: "₱28,000",
    duration: "4 Hours Included",
    capacity: "Up to 30 Guests",
    inclusions: [
      "Full private access to the Mega Starlight Hall (96 sqm)",
      "Martin Audio Wavefront concert line array & 165' MicroLED wall",
      "Dedicated on-site mixologist crafting bespoke cocktails all night",
      "Assigned front-of-house audio engineer optimizing vocal dynamics",
      "Dom Pérignon Vintage champagne welcome + Caviar service",
      "Two rounds of gourmet hot dining (Wagyu skewers, Iberico pork, sushi)",
      "Private en-suite luxury restroom and keyless biometric entry",
    ],
    drinksAndDining: "Unlimited craft cocktail mixologist + full dining course banquet",
    soundEngineering: "Dedicated live sound engineer balancing monitors & effects in real time",
    recommendedFor: "Corporate milestones, celebrity gatherings, and epic private galas",
    isPopular: false,
  },
];
