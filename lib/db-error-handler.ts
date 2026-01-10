import { Prisma } from "@prisma/client";

/**
 * Check if an error is a database connection error
 */
export function isDatabaseConnectionError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    "meta" in error
  ) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    // P1001: Can't reach database server
    // P1000: Authentication failed
    // P1003: Database does not exist
    return (
      prismaError.code === "P1001" ||
      prismaError.code === "P1000" ||
      prismaError.code === "P1003" ||
      prismaError.code === "P1017"
    );
  }
  return false;
}

/**
 * Get user-friendly error message for database errors
 */
export function getDatabaseErrorMessage(error: unknown): string {
  if (isDatabaseConnectionError(error)) {
    if (process.env.NODE_ENV === "development") {
      return "Database connection error. Please ensure PostgreSQL is running and DATABASE_URL is configured correctly.";
    }
    return "Service temporarily unavailable. Please try again later.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

/**
 * Safe database query wrapper
 * Returns null if database is unavailable (for read operations)
 */
export async function safeDbQuery<T>(
  query: () => Promise<T>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await query();
    return { data, error: null };
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return {
        data: null,
        error: getDatabaseErrorMessage(error),
      };
    }
    // Re-throw other errors to be handled normally
    throw error;
  }
}

