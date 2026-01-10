"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationFormSchema, type DonationFormData } from "@/lib/validations";
import Button from "@/components/shared/Button";
import FormField from "@/components/ui/FormField";
import { Heart, DollarSign, User, Mail, Phone, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { trackDonationAttempt, trackFormSubmission } from "@/lib/analytics";
import { formatPhoneNumber } from "@/lib/mobile-utils";
import { useEffect, useState } from "react";

// Razorpay script loading
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonationFormProps {
  causeId?: string;
  defaultAmount?: number;
}

export default function DonationForm({ causeId, defaultAmount = 0 }: DonationFormProps) {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: defaultAmount,
      causeId,
    },
  });

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => {
        toast.error("Failed to load payment gateway. Please refresh the page.");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else if (window.Razorpay) {
      setRazorpayLoaded(true);
    }
  }, []);

  const onSubmit = async (data: DonationFormData) => {
    if (!razorpayLoaded) {
      toast.error("Payment gateway is still loading. Please wait a moment.");
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      // Track donation attempt
      trackDonationAttempt(data.amount, data.causeId);
      trackFormSubmission("donation", { amount: data.amount });

      // Create order on server
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: "INR",
          causeId: data.causeId,
          anonymous: data.anonymous,
          dedication: data.dedication,
          donorName: data.name,
          donorEmail: data.email,
          donorPhone: data.phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      const orderData = await response.json();

      // Initialize Razorpay checkout
      const options = {
        key: orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Jaasiel Foundation",
        description: `Donation ${data.causeId ? "for cause" : ""}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              toast.success("Thank you for your donation! Payment successful.");
              reset();
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          causeId: data.causeId || "",
          anonymous: data.anonymous ? "true" : "false",
        },
        theme: {
          color: "#DC2626", // Primary brand color
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Donation error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsProcessingPayment(false);
    }
  };

  const quickAmounts = [500, 1000, 2500, 5000];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-primary" size={24} />
        <h3 className="text-xl font-bold">Make a Donation</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Amount (INR)"
          error={errors.amount?.message}
          required
          icon={<DollarSign size={16} />}
          id="donation-amount"
        >
          <div className="grid grid-cols-2 gap-2 mb-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setValue("amount", amount)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:border-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                ₹{amount}
              </button>
            ))}
          </div>
          <input
            id="donation-amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className={cn(
              "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
              errors.amount
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary focus:border-primary"
            )}
            placeholder="Enter amount"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "donation-amount-error" : undefined}
          />
        </FormField>

        <FormField
          label="Name"
          error={errors.name?.message}
          required
          icon={<User size={16} />}
          id="donation-name"
        >
          <input
            id="donation-name"
            type="text"
            {...register("name")}
            className={cn(
              "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
              errors.name
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary focus:border-primary"
            )}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "donation-name-error" : undefined}
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email?.message}
          required
          icon={<Mail size={16} />}
          id="donation-email"
        >
          <input
            id="donation-email"
            type="email"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
              errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary focus:border-primary"
            )}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "donation-email-error" : undefined}
          />
        </FormField>

        <FormField
          label="Phone"
          error={errors.phone?.message}
          required
          icon={<Phone size={16} />}
          id="donation-phone"
          hint="10 digits minimum"
        >
          <input
            id="donation-phone"
            type="tel"
            inputMode="tel"
            {...register("phone", {
              onChange: (e) => {
                const formatted = formatPhoneNumber(e.target.value);
                if (formatted !== e.target.value) {
                  e.target.value = formatted;
                }
              },
            })}
            className={cn(
              "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
              errors.phone
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary focus:border-primary"
            )}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "donation-phone-error" : undefined}
            placeholder="123-456-7890"
          />
        </FormField>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("anonymous")}
            className="mr-2"
          />
          <label className="text-sm text-gray-600">Donate anonymously</label>
        </div>

        <FormField
          label="Dedication (Optional)"
          error={errors.dedication?.message}
          hint="Add a personal message or dedication"
          id="donation-dedication"
        >
          <textarea
            id="donation-dedication"
            {...register("dedication")}
            rows={3}
            className={cn(
              "w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none",
              errors.dedication
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-primary focus:border-primary"
            )}
            placeholder="In memory of, In honor of, etc."
            aria-invalid={!!errors.dedication}
            aria-describedby={errors.dedication ? "donation-dedication-error" : undefined}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting || isProcessingPayment || !razorpayLoaded}
          className="w-full"
        >
          {isSubmitting || isProcessingPayment ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : !razorpayLoaded ? (
            "Loading payment gateway..."
          ) : (
            "Donate Now"
          )}
        </Button>
      </form>
    </div>
  );
}

