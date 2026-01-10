import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});

export const volunteerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  interests: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

export const donationFormSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  anonymous: z.boolean().optional(),
  causeId: z.string().optional(),
  dedication: z.string().optional(),
});

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const recoverPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const feedbackFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.number().min(1).max(5).optional(),
  category: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  preferences: z.record(z.any()).optional(),
  source: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
export type DonationFormData = z.infer<typeof donationFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>;
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;

