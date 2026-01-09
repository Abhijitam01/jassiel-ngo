/**
 * Logger utility for consistent logging across the application
 * In production, this can be extended to send logs to external services
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  context?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";

  private formatMessage(level: LogLevel, message: string, data?: any, context?: string): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) {
      return true; // Log everything in development
    }

    // In production, only log warnings and errors
    if (this.isProduction) {
      return level === "warn" || level === "error";
    }

    return true;
  }

  private log(level: LogLevel, message: string, data?: any, context?: string) {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.formatMessage(level, message, data, context);

    // In production, you might want to send this to an external service
    // For now, we'll use console methods
    switch (level) {
      case "debug":
        if (this.isDevelopment) {
          console.debug(`[DEBUG] ${message}`, data || "");
        }
        break;
      case "info":
        console.info(`[INFO] ${message}`, data || "");
        break;
      case "warn":
        console.warn(`[WARN] ${message}`, data || "");
        break;
      case "error":
        console.error(`[ERROR] ${message}`, data || "");
        // In production, send to error tracking service
        if (this.isProduction) {
          // Example: sendToErrorTracking(entry);
        }
        break;
    }
  }

  debug(message: string, data?: any, context?: string) {
    this.log("debug", message, data, context);
  }

  info(message: string, data?: any, context?: string) {
    this.log("info", message, data, context);
  }

  warn(message: string, data?: any, context?: string) {
    this.log("warn", message, data, context);
  }

  error(message: string, error?: Error | any, context?: string) {
    const errorData = error instanceof Error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : error;

    this.log("error", message, errorData, context);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing
export { Logger };

