"use client";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { ReactNode } from "react";

export default function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

