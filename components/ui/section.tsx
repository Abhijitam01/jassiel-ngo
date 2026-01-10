/**
 * Standardized Section component
 * Uses design tokens for consistent spacing
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sectionSpacing } from "@/lib/design-tokens";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "accent" | "primary";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  id?: string;
}

const variantClasses = {
  default: "bg-white",
  secondary: "bg-gray-50",
  accent: "bg-primary/5",
  primary: "bg-primary text-white",
};

const paddingClasses = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export default function Section({
  children,
  className,
  variant = "default",
  padding = "lg",
  maxWidth = "2xl",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      <div className={cn("container mx-auto px-4", maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-12", alignClasses[align], className)}>
      {subtitle && (
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

