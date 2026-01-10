"use client";

import HeroSlider from "@/components/home/HeroSlider";
import GiveMonthlySection from "@/components/home/GiveMonthlySection";
import TrustIndicators from "@/components/home/TrustIndicators";
import NewsletterSignupSection from "@/components/home/NewsletterSignupSection";
import AboutSection from "@/components/home/AboutSection";
import DonationFeed from "@/components/home/DonationFeed";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImpactStats from "@/components/home/ImpactStats";
import CausesSection from "@/components/home/CausesSection";
import MissionSection from "@/components/home/MissionSection";
import FeaturedStories from "@/components/home/FeaturedStories";
import SupportersSection from "@/components/home/SupportersSection";
import TrustBadges from "@/components/home/TrustBadges";
import TrustedPartners from "@/components/home/TrustedPartners";
import FAQSection from "@/components/home/FAQSection";
import ContactForm from "@/components/home/ContactForm";

export default function NormalLandingPage() {
  return (
    <>
      <HeroSlider />
      <TrustBadges />
      <GiveMonthlySection />
      <TrustIndicators />
      <NewsletterSignupSection />
      <AboutSection />
      <DonationFeed />
      <FeaturesSection />
      <ImpactStats />
      <CausesSection />
      <MissionSection />
      <FeaturedStories />
      <SupportersSection />
      <TrustedPartners />
      <FAQSection />
      <ContactForm />
    </>
  );
}

