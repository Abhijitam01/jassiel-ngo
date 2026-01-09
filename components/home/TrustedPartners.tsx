"use client";

import { useState } from "react";
import Image from "next/image";
import { partners } from "@/data/partners";
import Skeleton from "@/components/ui/Skeleton";
import { CheckCircle2, Shield } from "lucide-react";
import Card from "@/components/shared/Card";

export default function TrustedPartners() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
            <Shield className="text-primary" size={16} />
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-secondary px-2">
            Our Trusted NGO Partners
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
            We have been raising funds for credible nonprofits for 20+ years
          </p>
        </div>

        {/* Partners Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-3 sm:p-4 md:p-6">
                <Skeleton variant="rectangular" height={50} className="w-full sm:h-16 md:h-20" />
                <Skeleton variant="text" width="80%" height={14} className="mx-auto mt-2 sm:mt-3 md:mt-4 sm:h-4 md:h-5" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {partners.map((partner) => (
              <Card
                key={partner.id}
                hover
                variant="outlined"
                className="p-4 sm:p-5 md:p-6 text-center group relative"
              >
                {partner.verified && (
                  <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2" title="Verified Partner">
                    <CheckCircle2
                      className="text-success"
                      size={16}
                    />
                  </div>
                )}
                <div className="relative h-14 sm:h-16 md:h-20 w-full mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-14 sm:max-h-16 md:max-h-20 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                  {partner.name}
                </h3>
                {partner.category && (
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 hidden md:block">{partner.category}</p>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Trust Indicator */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-success/10 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full">
            <Shield className="text-success" size={18} />
            <span className="text-success font-semibold text-xs sm:text-sm md:text-base">
              Verified & Trusted Since 2004
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

