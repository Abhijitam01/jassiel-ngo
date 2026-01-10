import { NextRequest, NextResponse } from "next/server";
import { feedbackFormSchema } from "@/lib/validations";
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, {
      windowMs: 60000, // 1 minute
      maxRequests: 5, // 5 requests per minute
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
            "Retry-After": Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const body = await request.json();

    const body = await request.json();

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name, 100),
      email: sanitizeEmail(body.email),
      phone: body.phone ? sanitizePhone(body.phone) : undefined,
      subject: body.subject ? sanitizeInput(body.subject, 200) : undefined,
      message: sanitizeInput(body.message, 5000),
      rating: body.rating ? Number(body.rating) : undefined,
      category: body.category ? sanitizeInput(body.category, 50) : undefined,
    };

    // Validate with Zod schema
    const validatedData = feedbackFormSchema.parse(sanitizedData);

    // Get session if user is logged in
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;

    // Save to database
    const feedbackSubmission = await prisma.feedbackSubmission.create({
      data: {
        userId: userId || undefined,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        subject: validatedData.subject || undefined,
        message: validatedData.message,
        rating: validatedData.rating || undefined,
        category: validatedData.category || undefined,
        status: "NEW",
      },
    });

    // TODO: Send email notification
    // In production, send email to admin team

    if (process.env.NODE_ENV === "development") {
      console.log("Feedback submission saved:", feedbackSubmission.id);
    }

    return NextResponse.json(
      { message: "Thank you for your feedback! We appreciate your input." },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
        },
      }
    );
  } catch (error: any) {
    console.error("Feedback form error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    if (error.message?.includes("Invalid") || error.message?.includes("exceeds")) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

