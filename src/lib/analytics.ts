/**
 * Google Analytics 4 (GA4) helper for Buzzlok AI
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GA_MEASUREMENT_ID) ||
  "";

/**
 * Log page view to Google Analytics
 */
export function pageview(url: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

/**
 * Log specific custom event (e.g. search, category filter, tool upvote)
 */
export function trackEvent(
  action: string,
  params: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  } = {},
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, params);
  }
}
