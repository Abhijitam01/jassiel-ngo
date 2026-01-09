/**
 * Centralized Design Tokens
 * Unified design system for consistent spacing, colors, typography, and styling
 * Inspired by give.do and care.org design principles
 */

export const colors = {
  // Brand Colors
  brand: {
    red: "#DC2626", // Primary brand color for logo and key CTAs
    redDark: "#B91C1C",
    redLight: "#EF4444",
  },
  // Trust & Reliability
  primary: {
    DEFAULT: "#2563eb", // Blue - trust and reliability
    dark: "#1d4ed8",
    light: "#3b82f6",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#2563eb",
    600: "#1d4ed8",
    700: "#1e40af",
    800: "#1e3a8a",
    900: "#1e3a8a",
  },
  // Text & Content
  secondary: {
    DEFAULT: "#1e293b", // Dark blue-gray for text
    dark: "#0f172a",
    light: "#334155",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#1e293b",
    600: "#0f172a",
    700: "#0f172a",
  },
  // Action & Warmth
  accent: {
    DEFAULT: "#f97316", // Orange - warmth and action
    dark: "#ea580c",
    light: "#fb923c",
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
  },
  // Success & Growth
  success: {
    DEFAULT: "#10b981", // Green - growth and vitality
    light: "#34d399",
    dark: "#059669",
  },
  // Neutral Grays
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  // Semantic Colors
  white: "#ffffff",
  black: "#000000",
} as const;

export const spacing = {
  // Base unit: 4px
  0: "0",
  1: "4px",   // 0.25rem
  2: "8px",   // 0.5rem
  3: "12px",  // 0.75rem
  4: "16px",  // 1rem
  5: "20px",  // 1.25rem
  6: "24px",  // 1.5rem
  8: "32px",  // 2rem
  10: "40px", // 2.5rem
  12: "48px", // 3rem
  16: "64px", // 4rem
  20: "80px", // 5rem
  24: "96px", // 6rem
} as const;

export const typography = {
  fontFamily: {
    sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    mono: ["Courier New", "Courier", "monospace"],
  },
  fontSize: {
    xs: ["12px", { lineHeight: "1.5", letterSpacing: "0" }],
    sm: ["14px", { lineHeight: "1.5", letterSpacing: "0" }],
    base: ["16px", { lineHeight: "1.75", letterSpacing: "0" }],
    lg: ["18px", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
    xl: ["20px", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
    "2xl": ["24px", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
    "3xl": ["28px", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
    "4xl": ["32px", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
    "5xl": ["36px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
    "6xl": ["44px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
    "7xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
    "8xl": ["56px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const borderRadius = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
  lg: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
  xl: "0 8px 24px 0 rgba(0, 0, 0, 0.12)",
  "2xl": "0 12px 32px 0 rgba(0, 0, 0, 0.15)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const transitions = {
  fast: "150ms ease",
  normal: "200ms ease",
  slow: "300ms ease",
  slower: "500ms ease",
} as const;

// Section spacing standards
export const sectionSpacing = {
  mobile: {
    vertical: "80px", // 5rem
    horizontal: "24px", // 1.5rem
  },
  desktop: {
    vertical: "120px", // 7.5rem
    horizontal: "24px", // 1.5rem
  },
} as const;

// Container max width
export const container = {
  maxWidth: "1280px",
  padding: {
    mobile: "24px",
    desktop: "24px",
  },
} as const;
