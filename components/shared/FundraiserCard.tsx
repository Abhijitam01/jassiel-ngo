"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import Skeleton from "@/components/ui/Skeleton";
import { Clock, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FundraiserCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  donations: number;
  daysLeft: number;
  organization?: string;
  slug: string;
  className?: string;
  loading?: boolean;
}

export default function FundraiserCard({
  id,
  title,
  description,
  image,
  goal,
  raised,
  donations,
  daysLeft,
  organization,
  slug,
  className,
  loading = false,
}: FundraiserCardProps) {
  const progress = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <Skeleton variant="rectangular" height={320} className="w-full" />
        <div className="p-6 sm:p-8 lg:p-10 space-y-4">
          <Skeleton variant="text" width="80%" height={32} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
          <div className="space-y-2">
            <Skeleton variant="rectangular" height={12} className="w-full rounded-full" />
            <div className="flex justify-between text-base">
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={120} height={20} />
            </div>
          </div>
          <Skeleton variant="rectangular" height={52} className="w-full rounded-lg" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      hover
      variant="elevated"
      withProgress
      progress={progress}
      className={cn("overflow-hidden border border-gray-100", className)}
    >
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Tax Benefits Badge - Top Left */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 max-w-[45%] sm:max-w-none z-10">
          <div className="bg-[#f97316]/85 backdrop-blur-sm text-white px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-md shadow-sm">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium uppercase tracking-wide leading-tight">Tax Benefits Available</span>
          </div>
        </div>

        {/* Days Left Badge - Top Right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <div className="bg-[#f97316]/85 backdrop-blur-sm text-white px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-md shadow-sm flex items-center gap-1 whitespace-nowrap">
            <Clock size={10} className="sm:w-[11px] sm:h-[11px] md:w-[12px] md:h-[12px] text-white flex-shrink-0" />
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium leading-tight">
              {daysLeft} {daysLeft === 1 ? "Day" : "Days"} Left
            </span>
          </div>
        </div>

        {/* Organization Badge */}
        {organization && (
          <div className="absolute bottom-5 left-5 z-10">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm sm:text-base font-medium text-secondary">{organization}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-3 sm:mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-black text-base sm:text-lg mb-5 sm:mb-6 line-clamp-3 leading-relaxed">{description}</p>

        {/* Progress Info */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center justify-between text-base sm:text-lg mb-3">
            <span className="font-semibold text-black">
              {formatAmount(raised)} raised
            </span>
            <span className="text-black">
              of {formatAmount(goal)} goal
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f97316] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Donations Count */}
        <div className="flex items-center gap-2 text-base sm:text-lg text-black mb-5 sm:mb-6">
          <Users size={20} />
          <span>
            <span className="font-semibold">{donations}</span> {donations === 1 ? "Donation" : "Donations"}
          </span>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          href={`/causes/${slug}`}
          className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 font-bold text-base sm:text-lg py-3 sm:py-4"
        >
          Donate Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}

