"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface BentoCardProps {
  Icon?: LucideIcon;
  name: string;
  description: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: ReactNode;
  image?: string;
  title?: string;
  children?: ReactNode;
}

export function BentoCard({
  Icon,
  name,
  description,
  href,
  cta = "Learn more",
  className,
  background,
  image,
  title,
  children,
}: BentoCardProps) {
  const hasImage = !!image;
  const displayTitle = title || name;

  const content = (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl min-h-[280px] sm:min-h-[320px] md:min-h-[400px]",
        hasImage && "p-0",
        className
      )}
    >
      {background && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          {background}
        </div>
      )}
      
      {image && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt={displayTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          {/* Icon overlay */}
          {Icon && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10">
              <div className="inline-flex items-center justify-center rounded-md md:rounded-lg bg-white/20 backdrop-blur-sm p-2 sm:p-2.5 md:p-3 group-hover:bg-white/30 transition-colors">
                <Icon className="text-white" size={18} />
              </div>
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "relative z-10 flex flex-col h-full",
        hasImage ? "justify-end p-4 sm:p-6 md:p-8" : background ? "justify-between" : "justify-between"
      )}>
          {!hasImage && Icon && (
          <div className="mb-3 sm:mb-4">
            <div className="inline-flex items-center justify-center rounded-md md:rounded-lg bg-[#DC2626]/10 p-2 sm:p-2.5 md:p-3 group-hover:bg-[#DC2626]/20 transition-colors">
              <Icon className="text-[#DC2626]" size={18} />
            </div>
          </div>
        )}

        <div className={cn(
          "flex-1",
          background && "mb-3 sm:mb-4"
        )}>
          <h3 className={cn(
            "font-bold mb-2 sm:mb-3 transition-colors",
            hasImage 
              ? "text-lg sm:text-xl md:text-2xl lg:text-3xl text-white" 
              : "text-lg sm:text-xl text-[#DC2626]"
          )}>
            {displayTitle}
          </h3>
          {!background && (
            <p className={cn(
              "leading-relaxed",
              hasImage 
                ? "text-sm sm:text-base text-gray-200" 
                : "text-xs sm:text-sm text-gray-600"
            )}>
              {description}
            </p>
          )}
          {children && (
            <>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                {description}
              </p>
              {children}
            </>
          )}
        </div>

        {href && (
          <div className={cn(
            background ? "mt-3 sm:mt-4" : "mt-4 sm:mt-6",
            hasImage && "mt-3 sm:mt-4"
          )}>
            <div className={cn(
              "inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold transition-all",
              hasImage
                ? "text-white hover:text-gray-200"
                : "text-[#DC2626] group-hover:gap-2 sm:group-hover:gap-3"
            )}>
              {cta}
              <ArrowRight size={14} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  );
}

