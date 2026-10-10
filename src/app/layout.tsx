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
  title: `${BRAND.name} · ${BRAND.tagline} | Book Private Rooms Online`,
  description:
    "Private soundproof karaoke rooms in Bonifacio Global City. Rooms from ₱600/hr for 1 to 20 guests. 15-minute guaranteed slot hold with GCash, Maya, and cards.",
  keywords: [
    "karaoke bgc",
    "private ktv manila",
    "private karaoke rooms bgc",
    "barkada karaoke taguig",
    "karaoke birthday party bgc",
    "encore karaoke booking",
  ],
  openGraph: {
    title: `${BRAND.name} — Private Karaoke Rooms in BGC`,
    description:
      "Private soundproof karaoke rooms for friends, birthdays, and parties in BGC. Rooms from ₱600/hr with instant online booking.",
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
