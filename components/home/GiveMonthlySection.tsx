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
  ArrowRight
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#f97316]/10 rounded-full">
            <Calendar className="text-[#f97316]" size={20} />
            <span className="text-[#f97316] font-semibold text-sm uppercase tracking-wide">
              Give Monthly
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-secondary">
            Create Sustained Impact
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed font-semibold">
            <span className="underline-important">Support verified projects. Get regular updates. Save tax. Cancel anytime.</span>
          </p>
        </div>

        {/* Mission Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
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
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={mission.image}
                        alt={mission.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      {/* Icon overlay */}
                      <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-primary/30 transition-colors">
                        <IconComponent className="text-white" size={24} />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="mb-4">
                      {!mission.image && (
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="text-primary" size={28} />
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-extrabold text-secondary mb-2 group-hover:text-primary transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {mission.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      href={`/donate?mission=${mission.slug}`}
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors border-primary text-primary"
                    >
                      Support Monthly
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* View More Button */}
        <div className="text-center">
          <Button variant="primary" size="lg" href="/donate" className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl font-bold">
            View More Missions
          </Button>
        </div>
      </div>
    </section>
  );
}

