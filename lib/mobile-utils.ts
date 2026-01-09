/**
 * Mobile-specific utility functions
 */

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Get appropriate input type for mobile devices
 */
export function getMobileInputType(type: string): string {
  if (typeof window === "undefined") return type;
  
  if (isMobile()) {
    // Use mobile-optimized input types
    switch (type) {
      case "tel":
        return "tel";
      case "email":
        return "email";
      case "number":
        return "number";
      default:
        return type;
    }
  }
  return type;
}

/**
 * Format phone number for mobile input
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Format as XXX-XXX-XXXX
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

