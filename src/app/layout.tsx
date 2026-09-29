import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { BRAND } from "@/lib/design/brand";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} · ${BRAND.tagline}`,
  description:
    "Reserve a private karaoke room in under two minutes. No account needed. Instant slot locking with GCash, Maya, GrabPay, card, or QR Ph.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
