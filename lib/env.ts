/**
 * Environment variable validation
 * Ensures all required environment variables are set
 */

import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // NextAuth
  NEXTAUTH_URL: z.string().url().optional().or(z.literal("")),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),

  // CSRF
  CSRF_SECRET: z.string().optional(),
  ENABLE_CSRF: z.string().optional(),

  // Email (optional in development)
  EMAIL_SERVICE: z.enum(["resend", "sendgrid", "mock"]).optional().default("mock"),
  EMAIL_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),

  // Payment (optional in development)
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().optional(),

  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Analytics (optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

  // API URL (optional)
  NEXT_PUBLIC_API_URL: z.string().url().optional().or(z.literal("")),
});

type EnvSchema = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * Throws error if required variables are missing
 */
export function validateEnv(): EnvSchema {
  try {
    return envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      CSRF_SECRET: process.env.CSRF_SECRET,
      ENABLE_CSRF: process.env.ENABLE_CSRF,
      EMAIL_SERVICE: process.env.EMAIL_SERVICE,
      EMAIL_API_KEY: process.env.EMAIL_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
      throw new Error(
        `Missing or invalid environment variables:\n${missing.join("\n")}`
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 * Only validates in production or when explicitly requested
 */
export function getEnv(force: boolean = false): Partial<EnvSchema> {
  if (process.env.NODE_ENV === "production" || force) {
    return validateEnv();
  }

  // In development, return partial env with defaults
  return {
    DATABASE_URL: process.env.DATABASE_URL || "",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
    CSRF_SECRET: process.env.CSRF_SECRET,
    ENABLE_CSRF: process.env.ENABLE_CSRF || "false",
    EMAIL_SERVICE: (process.env.EMAIL_SERVICE as any) || "mock",
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NODE_ENV: (process.env.NODE_ENV as any) || "development",
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  };
}
