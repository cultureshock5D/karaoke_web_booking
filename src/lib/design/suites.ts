export interface SuiteDetail {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  capacityRange: string;
  squareMeters: number;
  acousticIsolation: string;
  soundSystem: string;
  microphones: string;
  visualSystem: string;
  lightingModes: string[];
  signatureAmenity: string;
  vibe: string;
  image: string;
  accentColor: string;
}

export const SUITE_DETAILS: Record<string, SuiteDetail> = {
  "room-1": {
    id: "room-1",
    name: "The Cozy Duo",
    codename: "ONYX SOUNDSTAGE 01",
    tagline: "Intimate High-Fidelity Vocal Chamber",
    capacityRange: "1–2 Guests (Max 3)",
    squareMeters: 18,
    acousticIsolation: "STC 62 Decoupled Enclosure",
    soundSystem: "Genelec 8341A SAM The Ones Coaxial Studio Monitors + 7380A Subwoofer",
    microphones: "2x Shure KSM9 Handheld Wireless Transmitters",
    visualSystem: "65-inch OLED 120Hz Ultra-Low Latency Display",
    lightingModes: ["Velvet Noir", "Cyber Tokyo", "Warm Amber 2200K"],
    signatureAmenity: "Complimentary artisanal Japanese green tea & chilled sparkling water",
    vibe: "Intimate, razor-sharp vocal acoustics designed for acoustic duets and audiophiles.",
    image: "/images/room-cozy-duo.jpg",
    accentColor: "#ff773d",
  },
  "room-2": {
    id: "room-2",
    name: "VIP Galactic Suite",
    codename: "NEBULA SOUNDSTAGE 02",
    tagline: "Ultra-Luxe Private Lounge & Stage",
    capacityRange: "4–8 Guests (Max 10)",
    squareMeters: 42,
    acousticIsolation: "STC 65 Multi-Leaf Studio Isolation",
    soundSystem: "Martin Audio BlacklineX 12 Coaxial Arrays + Dual 18-inch Subwoofers",
    microphones: "4x Shure Axient Digital Wireless with Beta 87A Supercardioid Capsules",
    visualSystem: "98-inch 4K HDR Sony BRAVIA Professional Cinema Display",
    lightingModes: ["Ultra Violet", "Cyber Tokyo", "Emerald Speakeasy", "Velvet Noir"],
    signatureAmenity: "Private dedicated sommelier bar & custom ice sphere press",
    vibe: "Sleek velvet banquettes, custom champagne trough, and thunderous low-end response.",
    image: "/images/room-vip-suite.jpg",
    accentColor: "#8b5cf6",
  },
  "room-3": {
    id: "room-3",
    name: "Mega Starlight Hall",
    codename: "IMPERIAL ARENA 03",
    tagline: "Concert-Grade Soundstage & Private Ballroom",
    capacityRange: "12–25 Guests (Max 30)",
    squareMeters: 96,
    acousticIsolation: "STC 68 Heavy Double-Stud Isolated Concrete Floor",
    soundSystem: "Full Martin Audio Wavefront Precision Line Array & Quad 21-inch Sub-Bass",
    microphones: "6x Shure Axient Digital Frequency Diversity + 2 Wireless Lavalier Packs",
    visualSystem: "165-inch 4K UHD MicroLED Video Wall with DMX Concert Strobes",
    lightingModes: ["All 5 Architect Presets + Full DMX Soundwave Reactive Lighting"],
    signatureAmenity: "Full cocktail bar with personal mixologist & private en-suite restroom",
    vibe: "The ultimate private party stadium for corporate milestones, album launches, and grand celebrations.",
    image: "/images/room-starlight-hall.jpg",
    accentColor: "#10b981",
  },
};
