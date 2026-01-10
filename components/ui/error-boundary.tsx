"use client";

/**
 * Error boundary and error state components
 */

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/shared/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorState
          error={this.state.error}
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorStateProps {
  error?: Error | null;
  message?: string;
  onReset?: () => void;
  className?: string;
}

export function ErrorState({
  error,
  message,
  onReset,
  className,
}: ErrorStateProps) {
  const errorMessage =
    message || error?.message || "Something went wrong. Please try again.";

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className || ""}`}
    >
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
      <p className="text-gray-600 mb-6 max-w-md">{errorMessage}</p>
      {onReset && (
        <Button onClick={onReset} variant="primary">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      className={`flex items-center gap-2 text-red-600 text-sm ${className || ""}`}
      role="alert"
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

