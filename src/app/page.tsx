import React from "react";
import { SAMPLE_ROOMS, SAMPLE_ADDONS } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { AsymmetricBentoSection } from "@/components/landing/AsymmetricBentoSection";
import { RoomsSection } from "@/components/landing/RoomsSection";
import { SoundSystemSection } from "@/components/landing/SoundSystemSection";
import { AtmosphereSection } from "@/components/landing/AtmosphereSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { VipConciergeSection } from "@/components/landing/VipConciergeSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";

export default function Home() {
  const rooms = SAMPLE_ROOMS;
  const addOns = SAMPLE_ADDONS;

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#f4f4f6]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsStrip />
        <AsymmetricBentoSection />
        <RoomsSection rooms={rooms} />
        <SoundSystemSection />
        <AtmosphereSection />
        <HowItWorksSection />
        <WhyUsSection />
        <PackagesSection addOns={addOns} />
        <TestimonialsSection />
        <VipConciergeSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
