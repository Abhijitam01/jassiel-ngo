/**
 * Payment gateway integration
 * Supports Razorpay for Indian market
 */

import Razorpay from "razorpay";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

let razorpayInstance: Razorpay | null = null;

function getRazorpayInstance(): Razorpay {
  if (!razorpayInstance) {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials are not configured");
    }
    razorpayInstance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
}

export interface CreateOrderOptions {
  amount: number; // Amount in paise (smallest currency unit)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  customer?: {
    name: string;
    email: string;
    contact: string;
  };
}

export interface OrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Create a Razorpay order
 */
export async function createOrder(
  options: CreateOrderOptions
): Promise<OrderResponse> {
  try {
    const razorpay = getRazorpayInstance();

    // Build order data according to Razorpay API
    const orderData: {
      amount: number;
      currency: string;
      receipt: string;
      notes: Record<string, string>;
    } = {
      amount: options.amount, // Already in paise if passed correctly, or convert: options.amount * 100
      currency: options.currency || "INR",
      receipt: options.receipt || `receipt_${Date.now()}`,
      notes: {
        ...(options.notes || {}),
        ...(options.customer && {
          customer_name: options.customer.name,
          customer_email: options.customer.email,
          customer_contact: options.customer.contact,
        }),
      },
    };

    const order = await razorpay.orders.create(orderData as any);

    return order as OrderResponse;
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    throw error;
  }
}

/**
 * Verify payment signature
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    const text = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    return generatedSignature === signature;
  } catch (error) {
    console.error("Payment signature verification error:", error);
    return false;
  }
}

/**
 * Get payment details from Razorpay
 */
export async function getPaymentDetails(
  paymentId: string
): Promise<any> {
  try {
    const razorpay = getRazorpayInstance();
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
}

/**
 * Refund a payment
 */
export async function refundPayment(
  paymentId: string,
  amount?: number,
  notes?: Record<string, string>
): Promise<any> {
  try {
    const razorpay = getRazorpayInstance();
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount ? amount * 100 : undefined, // Convert to paise
      notes: notes || {},
    });
    return refund;
  } catch (error) {
    console.error("Refund error:", error);
    throw error;
  }
}

/**
 * Format amount for display
 */
export function formatAmount(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Convert amount to paise (for Razorpay)
 */
export function toPaise(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert paise to amount
 */
export function fromPaise(paise: number): number {
  return paise / 100;
}

