/**
 * Loading state components
 */

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <Loader2
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
    />
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  className,
  variant = "rectangular",
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variantClasses[variant],
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Skeleton variant="rectangular" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <Skeleton variant="rectangular" className="h-10 w-1/3" />
    </div>
  );
}

export function DonationCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Skeleton variant="rectangular" className="h-8 w-1/2" />
      <Skeleton variant="rectangular" className="h-4 w-3/4" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-10 w-full" />
        <Skeleton variant="text" className="h-10 w-full" />
      </div>
      <Skeleton variant="rectangular" className="h-12 w-full" />
    </div>
  );
}

