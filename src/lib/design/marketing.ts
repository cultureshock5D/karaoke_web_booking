export const STATS = [
  { value: 0, label: "Double-Bookings", suffix: "", detail: "Guaranteed by composite DB unique slot index" },
  { value: 65, label: "Acoustic STC Rating", suffix: " dB", detail: "Multi-leaf sound isolation standard" },
  { value: 15, label: "Minute Slot Hold", suffix: "m", detail: "Real-time cryptographic hold window" },
  { value: 100, label: "Lossless Audio", suffix: "%", detail: "24-bit 96kHz digital sound processing" },
  { value: 5, label: "Instant Payment Channels", suffix: "", detail: "GCash, Maya, GrabPay, Visa/MC, QR Ph" },
  { value: 24, label: "Live Online Reservation", suffix: "/7", detail: "Automated instant confirmation engine" },
] as const;

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
      "As a recording artist, typical KTV rooms give me ear fatigue in thirty minutes. Encore's Martin Audio system and Shure Axient mics sound like a million-dollar tracking studio.",
    author: "Kiana Valenciano",
    role: "Vocalist & Producer",
    suite: "The Galactic VIP Salon",
    rating: 5,
  },
  {
    quote:
      "We hosted our tech company's quarterly celebration in the Mega Starlight Hall. The acoustic isolation is incredible—you couldn't hear a whisper outside the double doors.",
    author: "Marc Ramos",
    role: "Managing Director, Nexus Tech",
    suite: "The Starlight Soundstage",
    rating: 5,
  },
  {
    quote:
      "The booking took under two minutes with GCash, our cocktails were ready upon arrival, and the room lighting synced to the music. Manila nightlife elevated to true international standards.",
    author: "Bea Alonzo-Reyes",
    role: "Private Member",
    suite: "The Onyx Duo Suite",
    rating: 5,
  },
];
