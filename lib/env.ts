/**
 * Environment variable validation utility
 * Validates required environment variables on startup
 */

interface EnvConfig {
  NEXTAUTH_URL?: string;
  NEXTAUTH_SECRET?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_FACEBOOK_URL?: string;
  NEXT_PUBLIC_TWITTER_URL?: string;
  NEXT_PUBLIC_INSTAGRAM_URL?: string;
  NEXT_PUBLIC_LINKEDIN_URL?: string;
}

const requiredEnvVars = {
  production: ["NEXTAUTH_URL", "NEXTAUTH_SECRET", "NEXT_PUBLIC_SITE_URL"],
  development: ["NEXTAUTH_SECRET"],
};

export function validateEnvVars() {
  const env = process.env.NODE_ENV || "development";
  const required = requiredEnvVars[env as keyof typeof requiredEnvVars] || requiredEnvVars.development;
  const missing: string[] = [];

  required.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    const errorMessage = `
Missing required environment variables:
${missing.map((v) => `  - ${v}`).join("\n")}

Please add these to your .env.local file.
    `.trim();

    if (env === "production") {
      throw new Error(errorMessage);
    } else {
      console.warn(`⚠️  ${errorMessage}`);
    }
  }

  return true;
}

export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is not set and no default value provided`);
  }
  return value || defaultValue || "";
}

// Validate on module load (only in Node.js environment)
if (typeof window === "undefined") {
  try {
    validateEnvVars();
  } catch (error) {
    // In development, just warn; in production, this will throw
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
  }
}

