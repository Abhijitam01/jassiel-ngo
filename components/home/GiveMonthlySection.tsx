"use client";

import { useState } from "react";
import Image from "next/image";
import { monthlyMissions } from "@/data/monthlyMissions";
import Skeleton, { SkeletonCard } from "@/components/ui/Skeleton";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { 
  Heart, 
  Shield, 
  Droplet, 
  Circle, 
  PawPrint, 
  Utensils, 
  Wind, 
  Recycle, 
  GraduationCap,
  Calendar,
  Users,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  shield: Shield,
  droplet: Droplet,
  circle: Circle,
  paw: PawPrint,
  utensils: Utensils,
  wind: Wind,
  recycle: Recycle,
  "graduation-cap": GraduationCap,
};

export default function GiveMonthlySection() {
  const [isLoading, setIsLoading] = useState(false);
  const featuredMissions = monthlyMissions.filter(m => m.featured);

  // Create bento grid features with different layouts
  const bentoFeatures = [
    // Large featured card with image
    {
      Icon: Heart,
      name: featuredMissions[0]?.title || "No Child Orphaned",
      description: featuredMissions[0]?.description || "Support orphaned children with education, healthcare, and a loving home environment.",
      href: `/donate?mission=${featuredMissions[0]?.slug || "no-child-orphaned"}`,
      cta: "Support Monthly",
      className: "col-span-1 md:col-span-2 lg:col-span-2",
      image: featuredMissions[0]?.image,
      title: featuredMissions[0]?.title,
    },
    // Medium card with icon
    {
      Icon: Shield,
      name: featuredMissions[1]?.title || "Protect Abandoned Elders",
      description: featuredMissions[1]?.description || "Provide care, shelter, and dignity to abandoned elderly individuals.",
      href: `/donate?mission=${featuredMissions[1]?.slug || "protect-abandoned-elders"}`,
      cta: "Support Monthly",
      className: "col-span-1",
      image: featuredMissions[1]?.image,
      title: featuredMissions[1]?.title,
    },
    // Medium card with icon
    {
      Icon: Droplet,
      name: featuredMissions[2]?.title || "Safe Water for All",
      description: featuredMissions[2]?.description || "Ensure access to clean, safe drinking water for underprivileged communities.",
      href: `/donate?mission=${featuredMissions[2]?.slug || "safe-water-for-all"}`,
      cta: "Support Monthly",
      className: "col-span-1",
      image: featuredMissions[2]?.image,
      title: featuredMissions[2]?.title,
    },
    // Stats card
    {
      Icon: TrendingUp,
      name: "Impact Metrics",
      description: "Track the real-time impact of your monthly support across all our programs.",
      href: "/impact-stories",
      cta: "View Impact",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      children: (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full mt-3 sm:mt-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626] mb-1">1.6M+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626] mb-1">10+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Years Service</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626] mb-1">4K+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Verified NGOs</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626] mb-1">50K+</div>
              <div className="text-[10px] sm:text-xs text-gray-600">Donors</div>
            </div>
        </div>
      ),
    },
    // Additional mission cards
    ...featuredMissions.slice(3, 5).map((mission) => {
      const IconComponent = iconMap[mission.icon] || Heart;
      return {
        Icon: IconComponent,
        name: mission.title,
        description: mission.description,
        href: `/donate?mission=${mission.slug}`,
        cta: "Support Monthly",
        className: "col-span-1",
        image: mission.image,
        title: mission.title,
      };
    }),
  ];

  return (
    <section className="relative py-32 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[#f97316]/10 rounded-full">
            <Calendar className="text-[#f97316]" size={24} />
            <span className="text-[#f97316] font-semibold text-base uppercase tracking-wide">
              Give Monthly
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 text-secondary">
            Can they count on you every month?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed font-semibold mb-4">
            <span className="underline-important">Your monthly gift = a whole year of impact.</span>
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-full shadow-lg mb-4">
            <span className="text-sm md:text-base font-bold">✨ Limited Time: First 3 months 2X matched!</span>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Your gift provides families with essential resources year-round. Support verified projects. Get regular updates. Save tax. Cancel anytime.
          </p>
        </div>

        {/* Bento Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <BentoGrid className="mb-8 sm:mb-10 md:mb-12">
            {bentoFeatures.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        )}

      </div>
    </section>
  );
}

