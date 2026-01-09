/**
 * Spacing constants for consistent spacing throughout the application
 * Based on Tailwind's spacing scale
 */

export const spacing = {
  xs: "0.5rem",    // 8px
  sm: "0.75rem",   // 12px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
  "4xl": "6rem",   // 96px
} as const;

export const sectionSpacing = {
  mobile: spacing.xl,      // 32px on mobile
  tablet: spacing["2xl"],  // 48px on tablet
  desktop: spacing["3xl"], // 64px on desktop
} as const;

