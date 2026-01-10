import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { rateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { sanitizeEmail } from "@/lib/sanitize";
import { prisma } from "@/lib/prisma";

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

    // Get source from headers (referer or query param)
    const referer = request.headers.get("referer") || "";
    const source = body.source || referer || "website";

    // Validate with Zod schema
    const validatedData = newsletterSchema.parse({
      email: sanitizeEmail(body.email),
      preferences: body.preferences || {},
      source: source,
    });

    // Check if already subscribed
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email: validatedData.email },
    });

    if (existing && existing.status === "ACTIVE") {
      return NextResponse.json(
        { message: "You are already subscribed to our newsletter!" },
        { status: 200 }
      );
    }

    // Upsert subscription (handle resubscription)
    const subscription = await prisma.newsletterSubscription.upsert({
      where: { email: validatedData.email },
      update: {
        status: "ACTIVE",
        preferences: validatedData.preferences || {},
        source: validatedData.source || undefined,
        subscribedAt: new Date(),
        unsubscribedAt: null,
      },
      create: {
        email: validatedData.email,
        status: "ACTIVE",
        preferences: validatedData.preferences || {},
        source: validatedData.source || undefined,
      },
    });

    // TODO: Send confirmation email
    // TODO: Add to email marketing service (Mailchimp, ConvertKit, etc.)

    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter subscription saved:", subscription.id);
    }

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

