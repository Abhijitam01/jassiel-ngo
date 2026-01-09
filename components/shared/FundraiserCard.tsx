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
        <Skeleton variant="rectangular" height={200} className="w-full" />
        <div className="p-6 space-y-4">
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
          <div className="space-y-2">
            <Skeleton variant="rectangular" height={8} className="w-full rounded-full" />
            <div className="flex justify-between text-sm">
              <Skeleton variant="text" width={100} height={16} />
              <Skeleton variant="text" width={100} height={16} />
            </div>
          </div>
          <Skeleton variant="rectangular" height={44} className="w-full rounded-lg" />
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
      <div className="relative h-48 md:h-64 overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Tax Benefits Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-[#f97316] text-white px-3 py-1.5 rounded-md shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wide">Tax Benefits Available</span>
          </div>
        </div>
        
        {/* Days Left Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Clock size={14} className="text-primary" />
            <span className="text-sm font-semibold text-secondary">
              {daysLeft} {daysLeft === 1 ? "Day" : "Days"} Left
            </span>
          </div>
        </div>

        {/* Organization Badge */}
        {organization && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <span className="text-sm font-medium text-secondary">{organization}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Progress Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-secondary">
              {formatAmount(raised)} raised
            </span>
            <span className="text-gray-500">
              of {formatAmount(goal)} goal
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f97316] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Donations Count */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Users size={16} />
          <span>
            <span className="font-semibold">{donations}</span> {donations === 1 ? "Donation" : "Donations"}
          </span>
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="md"
          href={`/causes/${slug}`}
          className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 font-bold"
        >
          Donate Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

