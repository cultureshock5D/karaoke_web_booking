import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { RoomsSection } from "@/components/landing/RoomsSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { InEveryRoomStrip } from "@/components/landing/InEveryRoomStrip";
import { MobileRentalSection } from "@/components/landing/MobileRentalSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { getCurrentUser } from "@/lib/auth/session";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#f4f4f6]">
      <Navbar user={user} />
      <main className="flex-1">
        <HeroSection />
        <StatsStrip />
        <RoomsSection />
        <PackagesSection />
        <HowItWorksSection />
        <InEveryRoomStrip />
        <MobileRentalSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
