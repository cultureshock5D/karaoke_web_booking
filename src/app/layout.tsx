import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { BRAND } from "@/lib/design/brand";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${BRAND.name} · ${BRAND.tagline} | Audiophile Soundstage & VIP Karaoke`,
  description:
    "Manila's premier private acoustics sanctuary. Precision Genelec monitoring, Martin Audio soundstage, Shure Axient wireless telemetry, and bespoke mixology. Reserve your private suite in 90 seconds.",
  keywords: [
    "luxury karaoke manila",
    "private soundstage",
    "audiophile karaoke suite",
    "vip ktv bento",
    "martin audio karaoke",
    "genelec monitoring room",
    "high-end nightlife manila",
  ],
  openGraph: {
    title: `${BRAND.name} — Private Soundstage & VIP Suites`,
    description:
      "Acoustically isolated private suites engineered to STC 65 studio standard with Shure Axient wireless microphones and Martin Audio arrays.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050507] text-[#f4f4f6] selection:bg-[#ff551f] selection:text-white">
        <GrainOverlay />
        <div className="relative z-10 flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
