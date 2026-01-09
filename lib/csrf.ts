/**
 * CSRF token generation and validation
 * Simple implementation - in production, use a more robust solution
 */

import { randomBytes, createHash } from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || "change-me-in-production";

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  const token = randomBytes(32).toString("hex");
  const timestamp = Date.now();
  const data = `${token}:${timestamp}:${CSRF_SECRET}`;
  const hash = createHash("sha256").update(data).digest("hex");
  return `${token}:${timestamp}:${hash}`;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string, maxAge: number = 3600000): boolean {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return false;

    const [tokenPart, timestampStr, hash] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check if token is expired
    if (Date.now() - timestamp > maxAge) {
      return false;
    }

    // Verify hash
    const data = `${tokenPart}:${timestamp}:${CSRF_SECRET}`;
    const expectedHash = createHash("sha256").update(data).digest("hex");

    return hash === expectedHash;
  } catch {
    return false;
  }
}

/**
 * Get CSRF token from request headers
 */
export function getCSRFTokenFromHeader(headers: Headers): string | null {
  return headers.get("X-CSRF-Token") || headers.get("csrf-token");
}

