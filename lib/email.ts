/**
 * Email service utility
 * Supports Resend and SendGrid
 */

type EmailService = "resend" | "sendgrid" | "mock";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

const EMAIL_SERVICE: EmailService =
  (process.env.EMAIL_SERVICE as EmailService) || "mock";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@jaasielfoundation.com";
const EMAIL_FROM_NAME =
  process.env.EMAIL_FROM_NAME || "Jaasiel Foundation";

/**
 * Send email using configured service
 */
export async function sendEmail(
  options: EmailOptions
): Promise<EmailResponse> {
  if (EMAIL_SERVICE === "mock" || !EMAIL_API_KEY) {
    // Mock email sending in development
    if (process.env.NODE_ENV === "development") {
      console.log("📧 [MOCK EMAIL]", {
        to: options.to,
        subject: options.subject,
        from: options.from || EMAIL_FROM,
      });
    }
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    };
  }

  try {
    switch (EMAIL_SERVICE) {
      case "resend":
        return await sendViaResend(options);
      case "sendgrid":
        return await sendViaSendGrid(options);
      default:
        throw new Error(`Unsupported email service: ${EMAIL_SERVICE}`);
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}

/**
 * Send email via Resend
 */
async function sendViaResend(options: EmailOptions): Promise<EmailResponse> {
  try {
    const { Resend } = await import("resend");

    if (!EMAIL_API_KEY) {
      throw new Error("EMAIL_API_KEY is not configured");
    }

    const resend = new Resend(EMAIL_API_KEY);

    const emailData: {
      from: string;
      to: string[];
      subject: string;
      html?: string;
      text?: string;
      replyTo?: string;
    } = {
      from: options.from || `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
    };

    if (options.html) {
      emailData.html = options.html;
    }
    if (options.text) {
      emailData.text = options.text;
    }
    if (options.replyTo) {
      emailData.replyTo = options.replyTo;
    }

    const result = await resend.emails.send(emailData as any);

    if (result.error) {
      throw new Error(result.error.message || "Failed to send email");
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to send email via Resend"
    );
  }
}

/**
 * Send email via SendGrid
 * Note: Requires @sendgrid/mail package to be installed
 */
async function sendViaSendGrid(options: EmailOptions): Promise<EmailResponse> {
  throw new Error(
    "SendGrid is not configured. To use SendGrid, install @sendgrid/mail package."
  );
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to Jaasiel Foundation!",
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining Jaasiel Foundation. We're excited to have you on board!</p>
      <p>Together, we can make a difference in the lives of underprivileged children and communities.</p>
      <p>Best regards,<br>The Jaasiel Foundation Team</p>
    `,
    text: `Welcome, ${name}! Thank you for joining Jaasiel Foundation.`,
  });
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

  return sendEmail({
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Hi ${name},</p>
      <p>Please click the link below to verify your email address:</p>
      <p><a href="${verificationUrl}">Verify Email</a></p>
      <p>Or copy and paste this link into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, please ignore this email.</p>
    `,
    text: `Hi ${name}, Please verify your email by visiting: ${verificationUrl}`,
  });
}

/**
 * Send contact form notification
 */
export async function sendContactNotification(
  contactData: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
) {
  return sendEmail({
    to: process.env.ADMIN_EMAIL || EMAIL_FROM,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ""}
      ${contactData.message ? `<p><strong>Message:</strong><br>${contactData.message}</p>` : ""}
    `,
    text: `New contact from ${contactData.name} (${contactData.email})`,
    replyTo: contactData.email,
  });
}

/**
 * Send newsletter confirmation
 */
export async function sendNewsletterConfirmation(email: string) {
  return sendEmail({
    to: email,
    subject: "You're subscribed to our newsletter!",
    html: `
      <h1>Thank you for subscribing!</h1>
      <p>You've successfully subscribed to the Jaasiel Foundation newsletter.</p>
      <p>You'll receive updates about our programs, events, and impact stories.</p>
      <p>Best regards,<br>The Jaasiel Foundation Team</p>
    `,
    text: "Thank you for subscribing to our newsletter!",
  });
}

