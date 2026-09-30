export interface AudioGearItem {
  category: string;
  brand: string;
  model: string;
  specs: string;
  highlight: string;
}

export const SOUND_SPECIFICATIONS: AudioGearItem[] = [
  {
    category: "Vocal Transducers",
    brand: "Shure",
    model: "Axient Digital ADX2FD with KSM9 Capsule",
    specs: "Dual-channel frequency diversity, Quadversity RF reception, 24-bit/48kHz audio",
    highlight: "Studio-grade clarity with zero interference in ultra-dense wireless environments.",
  },
  {
    category: "Acoustic Loudspeakers",
    brand: "Martin Audio",
    model: "BlacklineX Series Coaxial Arrays",
    specs: "128dB Peak SPL, 80° x 50° user-rotatable differential dispersion horn",
    highlight: "Concert-grade vocal projection without harsh high-frequency ear fatigue.",
  },
  {
    category: "Sub-Bass Architecture",
    brand: "Martin Audio & Genelec",
    model: "SX118 Dual Sub-Bass Chamber",
    specs: "18-inch ultra-long excursion driver, 35Hz-150Hz frequency response",
    highlight: "Physical sub-bass punch tuned to resonate through seating without wall rattling.",
  },
  {
    category: "Studio Master Monitoring",
    brand: "Genelec",
    model: "8341A SAM 'The Ones' Coaxial",
    specs: "Tri-amplified point-source acoustic alignment, GLM auto-calibration",
    highlight: "Unmatched stereo imaging allowing singers to hear pitch with mastering-grade precision.",
  },
  {
    category: "Audio Processing & DSP",
    brand: "BSS Soundweb & Lexicon",
    model: "London BLU-100 & Lexicon Studio FX",
    specs: "Ultra-low 1.2ms analog-to-analog latency, multiband acoustic feedback suppression",
    highlight: "Instant zero-howl automatic feedback notch filtering and rich studio plate reverb.",
  },
  {
    category: "Acoustic Room Isolation",
    brand: "Kinetics Noise Control",
    model: "Floating Slab & Staggered Stud STC 65",
    specs: "Triple 5/8' Type-X gypsum with Green Glue damping, neoprene elastomer mounts",
    highlight: "115dB singing inside remains completely inaudible in adjacent VIP suites.",
  },
];

export const VENUE_ACOUSTIC_CERTIFICATIONS = [
  {
    title: "STC 65 Acoustic Envelope",
    value: "65 dB",
    badge: "Laboratory Certified",
    description: "Multi-leaf wall construction decoupled with Kinetics isolation hangers.",
  },
  {
    title: "RT60 Reverberation Time",
    value: "0.32s",
    badge: "Broadband Flat",
    description: "Tuned absorption panels yield a crisp, intelligible vocal decay across all octave bands.",
  },
  {
    title: "System Latency",
    value: "< 1.4ms",
    badge: "Imperceptible",
    description: "Digital audio networking over redundant Dante protocol ensures instantaneous mic response.",
  },
  {
    title: "Dynamic Headroom",
    value: "28 dB",
    badge: "Clean Crest Factor",
    description: "Amplifiers operate at 40% capacity under full voice volume, eliminating clipping distortion.",
  },
];
