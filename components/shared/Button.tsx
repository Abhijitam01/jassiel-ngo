import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "accent" | "success";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-[#DC2626]",
    secondary: "bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-[#2563eb]",
    accent: "bg-[#f97316] text-white hover:bg-[#ea580c] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-[#f97316]",
    outline: "border-2 border-[#DC2626] text-[#DC2626] bg-white hover:bg-[#DC2626] hover:text-white hover:scale-105 active:scale-95 focus:ring-[#DC2626]",
    success: "bg-[#10b981] text-white hover:bg-[#059669] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-[#10b981]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
  };

  const isDisabled = disabled || loading;
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      className={classes} 
      aria-label={props["aria-label"]} 
      disabled={isDisabled}
      {...props}
    >
      {content}
    </button>
  );
}

