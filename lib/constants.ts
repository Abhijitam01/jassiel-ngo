/**
 * Application constants
 * Centralized constants for consistent use across the app
 */

export const QUICK_DONATION_AMOUNTS = [500, 1000, 2500, 5000, 10000] as const;

export const CAUSE_CATEGORIES = [
  "Education",
  "Health",
  "Empowerment",
  "Care",
  "Training",
] as const;

export const EVENT_CATEGORIES = [
  "Education",
  "Health",
  "Empowerment",
  "Community",
  "Awareness",
] as const;

export const BLOG_CATEGORIES = [
  "Poverty",
  "Health",
  "Education",
  "Empowerment",
  "Community",
  "Success Stories",
] as const;

export const PAYMENT_METHODS = {
  RAZORPAY: "Razorpay",
  STRIPE: "Stripe",
  BANK_TRANSFER: "Bank Transfer",
  CHEQUE: "Cheque",
  CASH: "Cash",
  UPI: "UPI",
} as const;

export const DONATION_STATUSES = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SUCCESSFUL: "Successful",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
} as const;

export const VOLUNTEER_STATUSES = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
} as const;

export const PAGINATION_DEFAULTS = {
  LIMIT: 10,
  OFFSET: 0,
  MAX_LIMIT: 100,
} as const;

export const API_ENDPOINTS = {
  CAUSES: "/api/causes",
  EVENTS: "/api/events",
  BLOG: "/api/blog",
  DONATIONS: "/api/dashboard/donations",
  VOLUNTEER: "/api/dashboard/volunteer",
  PAYMENT_CREATE_ORDER: "/api/payment/create-order",
  PAYMENT_VERIFY: "/api/payment/verify",
  CONTACT: "/api/contact",
  FEEDBACK: "/api/feedback",
  NEWSLETTER: "/api/newsletter",
} as const;

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CAUSES: "/causes",
  EVENTS: "/events",
  BLOG: "/blog",
  DONATE: "/donate",
  VOLUNTEER: "/volunteer",
  CONTACT: "/contact",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  DASHBOARD_DONATIONS: "/dashboard/donations",
  DASHBOARD_VOLUNTEER: "/dashboard/volunteer",
  DASHBOARD_EVENTS: "/dashboard/events",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_SETTINGS: "/dashboard/settings",
} as const;

export const SESSION_CONFIG = {
  MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
  UPDATE_AGE: 24 * 60 * 60, // 1 day in seconds
} as const;

