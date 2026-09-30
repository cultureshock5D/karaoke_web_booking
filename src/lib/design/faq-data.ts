export interface FaqItem {
  question: string;
  category: "booking" | "sound" | "hospitality" | "policies";
  answer: string;
  detail?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "booking",
    question: "How does the real-time 15-minute slot lock work?",
    answer:
      "When you select an available suite and time slot in our reservation wizard, our database immediately places an atomic cryptographic lock on that room for 15 minutes. No other guest or walk-in can claim or double-book your slot while you configure your add-ons and finalize your PayMongo checkout.",
    detail:
      "If you complete your deposit before the 15-minute timer expires, your reservation status changes from 'held' to 'confirmed' permanently with an instant SMS and email receipt.",
  },
  {
    category: "sound",
    question: "What makes Encore's sound quality radically different from standard karaoke lounges?",
    answer:
      "Standard karaoke rooms use cheap plastic PA speakers and distorted analog mics that cause vocal strain. Encore is engineered to recording studio specifications: decoupled concrete floors (STC 65 soundproofing), Genelec mastering monitors, Martin Audio concert arrays, and Shure Axient Digital wireless mics with KSM9 studio condenser capsules.",
    detail:
      "Our system features zero audible latency (< 1.4ms) and automatic digital feedback suppression so you never experience microphone howling.",
  },
  {
    category: "hospitality",
    question: "Can we order bottle service, craft cocktails, and food inside our private suite?",
    answer:
      "Yes. Every suite includes a digital tablet and discreet service button. Our kitchen prepares gourmet Japanese-Spanish tapas (Wagyu skewers, truffle fries, fresh sashimi), and our mixologists serve artisanal cocktails, rare Japanese whiskeys, and chilled vintage champagne directly to your table.",
    detail:
      "You can also pre-select your welcome bottles and food packages during online booking to have them chilled and ready the moment you walk through the door.",
  },
  {
    category: "policies",
    question: "What is your arrival grace period and deposit policy?",
    answer:
      "We hold your room for 15 minutes past your scheduled start time. We require a 20% deposit (minimum ₱100) via GCash, Maya, GrabPay, Visa/Mastercard, or QR Ph to lock in your date. The remaining balance can be settled at check-in via cash, card, or e-wallet.",
    detail:
      "Rescheduling is complimentary up to 24 hours prior to your reservation. Cancellations made at least 48 hours in advance are eligible for a 100% deposit refund.",
  },
  {
    category: "sound",
    question: "Can we connect our own phones, laptops, or custom backing tracks?",
    answer:
      "Absolutely. In addition to our 400,000+ lossless multi-language karaoke catalog (English, Tagalog, Korean, Japanese, Mandarin, Spanish), each suite features lossless Apple AirPlay, high-definition Bluetooth 5.3, and balanced 3.5mm/XLR inputs for musicians and DJs.",
    detail:
      "You can even stream directly from YouTube 4K, Spotify, or Apple Music Lossless on our cinema displays.",
  },
  {
    category: "hospitality",
    question: "What is the dress code and venue etiquette?",
    answer:
      "We cultivate an elevated nightlife atmosphere. The dress code is Smart Casual. We kindly ask guests to refrain from beachwear, athletic shorts, and open rubber flip-flops. We are strictly 18+ after 21:00 PHT.",
    detail:
      "Complimentary subterranean valet parking is provided for all reserved guests at our 5th Avenue private entrance.",
  },
];
