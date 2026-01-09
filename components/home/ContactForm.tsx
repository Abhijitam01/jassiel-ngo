"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Button from "@/components/shared/Button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thank you for contacting us! We'll get back to you soon.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/home-four/bg-1.jpg"
          alt="Contact Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Heart className="text-white" size={18} />
              <span className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wide">Kindness Towards Humanity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-white drop-shadow-lg px-2">
              Help Change a Child&apos;s Life
            </h2>
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Get in touch with us and be part of the change
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-md p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-sm sm:text-base"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-sm sm:text-base"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-sm sm:text-base"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0 shadow-xl hover:shadow-2xl transition-all px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg font-bold w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Get in Touch →"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

