import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";

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

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name, 100),
      email: sanitizeEmail(body.email),
      phone: sanitizePhone(body.phone),
      message: sanitizeInput(body.message, 2000),
    };

    // Validate with Zod schema
    const validatedData = contactFormSchema.parse(sanitizedData);

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Track feedback analytics

    if (process.env.NODE_ENV === "development") {
      console.warn("Feedback submission:", validatedData);
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

