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
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-1 max-w-[95rem]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Shield className="text-primary" size={20} />
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            Our Trusted NGO Partners
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            We have been raising funds for credible nonprofits for 20+ years
          </p>
        </div>

        {/* Partners Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4 md:p-6">
                <Skeleton variant="rectangular" height={60} className="w-full md:h-20" />
                <Skeleton variant="text" width="80%" height={16} className="mx-auto mt-3 md:mt-4 md:h-5" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {partners.map((partner) => (
              <Card
                key={partner.id}
                hover
                variant="outlined"
                className="p-6 text-center group relative"
              >
                {partner.verified && (
                  <div className="absolute top-2 right-2" title="Verified Partner">
                    <CheckCircle2
                      className="text-success"
                      size={20}
                    />
                  </div>
                )}
                <div className="relative h-16 md:h-20 w-full mb-3 md:mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="object-contain max-h-16 md:max-h-20 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                  {partner.name}
                </h3>
                {partner.category && (
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">{partner.category}</p>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Trust Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 px-6 py-3 rounded-full">
            <Shield className="text-success" size={24} />
            <span className="text-success font-semibold">
              Verified & Trusted Since 2004
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

