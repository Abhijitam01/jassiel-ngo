import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
  withProgress?: boolean;
  progress?: number;
  badge?: ReactNode;
}

export default function Card({ 
  children, 
  className, 
  hover = false,
  variant = "default",
  withProgress = false,
  progress = 0,
  badge
}: CardProps) {
  const variants = {
    default: "bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
    elevated: "bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
    outlined: "bg-white rounded-xl border-2 border-gray-200",
  };

  return (
    <div
      className={cn(
        variants[variant],
        "overflow-hidden relative p-6",
        hover && "transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          {badge}
        </div>
      )}
      {children}
      {withProgress && (
        <div className="w-full h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

