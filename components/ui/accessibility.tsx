/**
 * Accessibility utilities and components
 */

import { KeyboardEvent, ReactNode } from "react";

/**
 * Handle Enter key press for accessibility
 */
export function handleKeyPress(
  e: KeyboardEvent<HTMLElement>,
  callback: () => void,
  keys: string[] = ["Enter", " "]
) {
  if (keys.includes(e.key)) {
    e.preventDefault();
    callback();
  }
}

/**
 * Skip to main content link
 */
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}

/**
 * Screen reader only text
 */
export function SrOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Visually hidden but accessible text
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      aria-hidden="false"
    >
      {children}
    </span>
  );
}

/**
 * Live region for announcements
 */
export function LiveRegion({ 
  children, 
  level = "polite" 
}: { 
  children: ReactNode; 
  level?: "polite" | "assertive" | "off" 
}) {
  return (
    <div
      role="status"
      aria-live={level}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

