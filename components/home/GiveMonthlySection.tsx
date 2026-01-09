"use client";

import { useState } from "react";
import Image from "next/image";
import { monthlyMissions } from "@/data/monthlyMissions";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import Skeleton, { SkeletonCard } from "@/components/ui/Skeleton";
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
  ArrowRight,
  type LucideIcon
} from "lucide-react";

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

  return (
    <section className="relative py-32 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-1 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-[#f97316]/10 rounded-full">
            <Calendar className="text-[#f97316]" size={24} />
            <span className="text-[#f97316] font-semibold text-base uppercase tracking-wide">
              Give Monthly
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-secondary">
            Create Sustained Impact
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-semibold">
            <span className="underline-important">Support verified projects. Get regular updates. Save tax. Cancel anytime.</span>
          </p>
        </div>

        {/* Mission Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {featuredMissions.map((mission) => {
              const IconComponent = iconMap[mission.icon] || Heart;
              return (
                <Card
                  key={mission.id}
                  hover
                  variant="elevated"
                  className="group relative overflow-hidden border border-gray-100"
                >
                  {/* Mission Image */}
                  {mission.image && (
                    <div className="relative h-64 md:h-72 w-full overflow-hidden">
                      <Image
                        src={mission.image}
                        alt={mission.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Icon overlay */}
                      <div className="absolute top-5 left-5 p-3.5 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-primary/30 transition-colors">
                        <IconComponent className="text-white" size={28} />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-7 md:p-8">
                    <div className="mb-5">
                      {!mission.image && (
                        <div className="flex items-center gap-4 mb-5">
                          <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="text-primary" size={32} />
                          </div>
                        </div>
                      )}
                      <h3 className="text-2xl md:text-3xl font-extrabold text-secondary mb-3 group-hover:text-primary transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {mission.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="md"
                      href={`/donate?mission=${mission.slug}`}
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors border-primary text-primary text-base py-3"
                    >
                      Support Monthly
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-8">
          <Button variant="primary" size="lg" href="/donate" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl font-bold text-lg px-8 py-4">
            View More Missions
          </Button>
        </div>
      </div>
    </section>
  );
}

