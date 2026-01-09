import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { sanitizeEmail } from "@/lib/sanitize";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (stricter for newsletter to prevent spam)
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, {
      windowMs: 300000, // 5 minutes
      maxRequests: 3, // 3 requests per 5 minutes
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many subscription attempts. Please try again later.",
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "3",
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

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(body.email);

    // Validate with Zod schema
    const validatedData = newsletterSchema.parse({ email: sanitizedEmail });

    // In production, you would:
    // 1. Save to newsletter database
    // 2. Add to email marketing service
    // 3. Send confirmation email

    console.log("Newsletter subscription:", validatedData);

    return NextResponse.json(
      { message: "Thank you for subscribing to our newsletter!" },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
        },
      }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (error.message?.includes("Invalid")) {
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

