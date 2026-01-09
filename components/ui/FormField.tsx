"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  hint?: string;
}

export default function FormField({
  label,
  error,
  required = false,
  icon,
  children,
  className = "",
  id,
  hint,
}: FormFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const hasError = !!error;
  const isValid = !hasError && !error;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
      >
        {icon && <span className="text-gray-500">{icon}</span>}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {children}
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="text-red-500" size={20} />
          </div>
        )}
        {isValid && !hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 className="text-green-500" size={20} />
          </div>
        )}
      </div>
      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

