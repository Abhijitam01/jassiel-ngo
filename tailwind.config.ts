import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          redDark: "#B91C1C",
          redLight: "#EF4444",
        },
        primary: {
          DEFAULT: "#DC2626", // Red - primary brand color
          dark: "#B91C1C",
          light: "#EF4444",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#7f1d1d",
        },
        secondary: {
          DEFAULT: "#1f2937", // Dark gray for text
          dark: "#111827",
          light: "#374151",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#1f2937",
          600: "#111827",
          700: "#111827",
        },
        accent: {
          DEFAULT: "#f97316", // Orange - warmth and action (give.do style)
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
        success: {
          DEFAULT: "#10b981", // Green - growth and vitality (give.do style)
          light: "#34d399",
          dark: "#059669",
        },
        teal: {
          DEFAULT: "#14b8a6",
          light: "#5eead4",
          dark: "#0d9488",
        },
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
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.75',
            fontWeight: '400',
            h1: {
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontWeight: '700',
              lineHeight: '1.25',
              letterSpacing: '-0.01em',
            },
            h3: {
              fontWeight: '700',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

