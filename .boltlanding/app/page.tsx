"use client";

import React from 'react';
import HeroSection from '@/components/hero-section';
import ValuePropStrip from '@/components/value-prop-strip';
import RegionShowcase from '@/components/region-showcase';
import FeaturedWalks from '@/components/featured-walks';
import CommunityStories from '@/components/community-stories';
import SafetyWeather from '@/components/safety-weather';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <HeroSection />
      <ValuePropStrip />
      <RegionShowcase />
      <FeaturedWalks />
      <CommunityStories />
      <SafetyWeather />
      <Footer />
    </main>
  );
}