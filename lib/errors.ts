/**
 * Centralized error handling and error types
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Insufficient permissions") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
    this.name = "ConflictError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Rate limit exceeded", resetTime?: number) {
    super(message, 429, "RATE_LIMIT_ERROR", { resetTime });
    this.name = "RateLimitError";
  }
}

export class PaymentError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 402, "PAYMENT_ERROR", details);
    this.name = "PaymentError";
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): {
  status: number;
  error: string;
  details?: any;
} {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      error: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    console.error("Unexpected error:", error);
    return {
      status: 500,
      error: process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : error.message,
    };
  }

  return {
    status: 500,
    error: "An unknown error occurred",
  };
}

/**
 * Safe async handler wrapper for API routes
 */
import { NextResponse } from "next/server";

export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      const { status, error: errorMessage, details } = handleApiError(error);
      return NextResponse.json(
        { error: errorMessage, ...(details && { details }) },
        { status }
      );
    }
  };
}

