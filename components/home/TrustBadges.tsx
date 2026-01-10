"use client";

import { Shield, Award, TrendingUp, FileText } from "lucide-react";

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  value: string;
  description?: string;
}

const badges: TrustBadge[] = [
  {
    icon: TrendingUp,
    label: "90%",
    value: "to Program Services",
    description: "of all expenses go directly to programs",
  },
  {
    icon: Shield,
    label: "80G",
    value: "Tax Benefits",
    description: "Donations eligible for tax deduction",
  },
  {
    icon: Award,
    label: "Registered",
    value: "NGO Since 2014",
    description: "Trusted & verified organization",
  },
  {
    icon: FileText,
    label: "Transparent",
    value: "Financial Reports",
    description: "Annual reports publicly available",
  },
];

export default function TrustBadges() {
  return (
    <section className="relative py-12 sm:py-16 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 sm:p-5 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="mb-3 sm:mb-4 p-3 sm:p-3.5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent className="text-primary" size={24} />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-secondary mb-1 group-hover:text-primary transition-colors duration-300">
                  {badge.label}
                </div>
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                  {badge.value}
                </div>
                {badge.description && (
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    {badge.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

