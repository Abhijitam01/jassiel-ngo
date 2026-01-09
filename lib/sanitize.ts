import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
    ALLOWED_ATTR: ["href"],
  });
}

/**
 * Sanitize plain text by removing HTML tags and encoding special characters
 */
export function sanitizeText(text: string): string {
  // Remove HTML tags
  const withoutTags = text.replace(/<[^>]*>/g, "");
  // Encode special characters
  return withoutTags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * Validate and sanitize input with length limits
 */
export function sanitizeInput(
  input: string,
  maxLength: number = 1000
): string {
  if (input.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }
  return sanitizeText(input.trim());
}

/**
 * Validate email format
 */
export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmed = email.trim().toLowerCase();
  if (!emailRegex.test(trimmed)) {
    throw new Error("Invalid email format");
  }
  return trimmed;
}

/**
 * Validate phone number format (basic validation)
 */
export function sanitizePhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    throw new Error("Invalid phone number format");
  }
  return digits;
}

