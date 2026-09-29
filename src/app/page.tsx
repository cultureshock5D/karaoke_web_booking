import React from 'react';
import { SAMPLE_ROOMS, SAMPLE_ADDONS } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsStrip } from '@/components/landing/StatsStrip';
import { RoomsSection } from '@/components/landing/RoomsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhyUsSection } from '@/components/landing/WhyUsSection';
import { PackagesSection } from '@/components/landing/PackagesSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';

export default function Home() {
  const rooms = SAMPLE_ROOMS;
  const addOns = SAMPLE_ADDONS;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsStrip />
        <RoomsSection rooms={rooms} />
        <HowItWorksSection />
        <WhyUsSection />
        <PackagesSection addOns={addOns} />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
