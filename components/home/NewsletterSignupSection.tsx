"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, MessageSquare } from "lucide-react";
import Button from "@/components/shared/Button";
import toast from "react-hot-toast";

const newsletterSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterSignupSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thank you for subscribing to our newsletter!");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-primary/5 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 rounded-full">
              <Mail className="text-primary" size={20} />
              <span className="text-primary font-semibold text-sm sm:text-base uppercase tracking-wide">
                Stay Connected
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-secondary px-2">
              Sign up for our mailing list
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto font-medium px-4">
              Get updates on our programs, impact stories, and ways you can help transform lives
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-lg hover:shadow-xl transition-all py-3 sm:py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* SMS Subscription Option */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="text-primary" size={20} />
                  <span className="text-sm sm:text-base font-medium">
                    Text <span className="font-bold text-primary">CARE</span> to <span className="font-bold text-primary">227387</span> to stay connected
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a> apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

