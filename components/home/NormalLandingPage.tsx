"use client";

import HeroSlider from "@/components/home/HeroSlider";
import GiveMonthlySection from "@/components/home/GiveMonthlySection";
import AboutSection from "@/components/home/AboutSection";
import DonationFeed from "@/components/home/DonationFeed";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImpactStats from "@/components/home/ImpactStats";
import CausesSection from "@/components/home/CausesSection";
import MissionSection from "@/components/home/MissionSection";
import SupportersSection from "@/components/home/SupportersSection";
import TrustedPartners from "@/components/home/TrustedPartners";
import ContactForm from "@/components/home/ContactForm";

export default function NormalLandingPage() {
  return (
    <>
      <HeroSlider />
      <GiveMonthlySection />
      <AboutSection />
      <DonationFeed />
      <FeaturesSection />
      <ImpactStats />
      <CausesSection />
      <MissionSection />
      <SupportersSection />
      <TrustedPartners />
      <ContactForm />
    </>
  );
}

