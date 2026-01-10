"use client";

import { TrendingUp, Globe, Users, Shield } from "lucide-react";
import Card from "@/components/shared/Card";

interface TrustIndicator {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  gradient: string;
}

const indicators: TrustIndicator[] = [
  {
    icon: TrendingUp,
    title: "We're efficient",
    value: "90%",
    description: "of all expenses go directly to program services",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Globe,
    title: "We're far-reaching",
    value: "10+",
    description: "years of service across India's most vulnerable communities",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "We're locally led",
    value: "97%",
    description: "of our team members are from the communities we serve",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "We're trusted",
    value: "2014",
    description: "Registered NGO with a proven track record of transparency",
    gradient: "from-orange-500 to-red-600",
  },
];

export default function TrustIndicators() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-secondary px-2">
            Every day, together with you, we save lives and transform communities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Our commitment to transparency, efficiency, and local leadership ensures your support makes the maximum impact
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <Card
                key={index}
                hover
                variant="elevated"
                className="group relative overflow-hidden border border-gray-100 bg-white p-6 sm:p-7 md:p-8 transition-all duration-300 hover:shadow-xl"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${indicator.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center p-3 sm:p-4 mb-4 sm:mb-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${indicator.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className="text-white" size={28} />
                  </div>

                  {/* Value */}
                  <div className="mb-2 sm:mb-3">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">
                      {indicator.value}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                    {indicator.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {indicator.description}
                  </p>
                </div>

                {/* Decorative corner element */}
                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${indicator.gradient} opacity-0 group-hover:opacity-10 rounded-tl-full transition-opacity duration-300`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

