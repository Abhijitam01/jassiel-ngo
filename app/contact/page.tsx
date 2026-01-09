"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import Button from "@/components/shared/Button";
import FormField from "@/components/ui/FormField";
import SuccessAnimation from "@/components/ui/SuccessAnimation";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import { cn } from "@/lib/utils";
import { trackFormSubmission } from "@/lib/analytics";
import { formatPhoneNumber } from "@/lib/mobile-utils";

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
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
        trackFormSubmission("contact", { hasMessage: !!data.message });
        setShowSuccess(true);
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
    <div className="py-16 md:py-24">
      <SuccessAnimation
        show={showSuccess}
        message="Message sent successfully!"
        onComplete={() => setShowSuccess(false)}
      />
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="text-white" size={32} />
            <span className="text-lg font-semibold">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  label="Name"
                  error={errors.name?.message}
                  required
                  icon={<User size={16} />}
                  id="contact-name"
                >
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                      errors.name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    )}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                </FormField>

                <FormField
                  label="Email"
                  error={errors.email?.message}
                  required
                  icon={<Mail size={16} />}
                  id="contact-email"
                >
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    className={cn(
                      "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    )}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                </FormField>

                <FormField
                  label="Phone"
                  error={errors.phone?.message}
                  required
                  icon={<Phone size={16} />}
                  id="contact-phone"
                  hint="10 digits minimum"
                >
                  <input
                    id="contact-phone"
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
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    placeholder="123-456-7890"
                  />
                </FormField>

                <FormField
                  label="Message"
                  error={errors.message?.message}
                  icon={<MessageSquare size={16} />}
                  id="contact-message"
                >
                  <textarea
                    id="contact-message"
                    {...register("message")}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none",
                      errors.message
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    )}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                </FormField>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-700">
                      B-19, Dwarka, New Delhi,<br />
                      India - 110045
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+987-0986-0987" className="text-gray-700 hover:text-primary">
                      987-0986-0987
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:support@jaasielfoundation.com" className="text-gray-700 hover:text-primary">
                      support@jaasielfoundation.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <MapPlaceholder address="B-19, Dwarka, New Delhi, India - 110045" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

