"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, User, Mail, Phone, Users } from "lucide-react";
import Button from "@/components/shared/Button";
import toast from "react-hot-toast";

const eventRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  numberOfAttendees: z.number().min(1, "At least 1 attendee required").max(10, "Maximum 10 attendees"),
  specialRequirements: z.string().optional(),
});

type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  className?: string;
}

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  eventDate,
  className = "",
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventRegistrationFormData>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      numberOfAttendees: 1,
    },
  });

  const onSubmit = async (data: EventRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // In production, this would call an API endpoint
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Event registration:", {
        eventId,
        eventTitle,
        eventDate,
        ...data,
      });

      toast.success("Registration successful! We'll send you a confirmation email shortly.");
      setIsSubmitted(true);
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Confirmed!</h3>
          <p className="text-gray-700 mb-4">
            Thank you for registering for <strong>{eventTitle}</strong>
          </p>
          <p className="text-sm text-gray-600">
            We've sent a confirmation email with event details. See you on {new Date(eventDate).toLocaleDateString()}!
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          onClick={() => setIsSubmitted(false)}
        >
          Register Another Person
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-primary" size={24} />
        <h3 className="text-xl font-bold">Register for This Event</h3>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Event:</p>
        <p className="font-semibold text-gray-900">{eventTitle}</p>
        <p className="text-sm text-gray-600 mt-2">
          Date: {new Date(eventDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <User size={16} />
            Full Name *
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Mail size={16} />
            Email Address *
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Phone size={16} />
            Phone Number *
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <Users size={16} />
            Number of Attendees *
          </label>
          <input
            type="number"
            {...register("numberOfAttendees", { valueAsNumber: true })}
            min={1}
            max={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="1"
          />
          {errors.numberOfAttendees && (
            <p className="text-red-500 text-sm mt-1">{errors.numberOfAttendees.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Maximum 10 attendees per registration</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            {...register("specialRequirements")}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Any dietary requirements, accessibility needs, etc."
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Registering..." : "Register Now"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By registering, you agree to receive event-related communications from us.
        </p>
      </form>
    </div>
  );
}

