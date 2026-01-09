/**
 * Analytics utility functions
 * Placeholder for Google Analytics 4 integration
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
  // Fallback: log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics Event:", eventName, eventParams);
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}

export function trackFormSubmission(formName: string, formData?: Record<string, any>) {
  trackEvent("form_submit", {
    form_name: formName,
    ...formData,
  });
}

export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent("button_click", {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
}

export function trackDonationAttempt(amount: number, causeId?: string) {
  trackEvent("donation_attempt", {
    value: amount,
    currency: "INR",
    cause_id: causeId,
  });
}

export function trackSearch(searchQuery: string, resultsCount?: number) {
  trackEvent("search", {
    search_term: searchQuery,
    results_count: resultsCount,
  });
}

