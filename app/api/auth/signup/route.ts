import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // In production, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save to database
    // 4. Send verification email

    if (process.env.NODE_ENV === "development") {
      console.warn("Signup request:", { ...validatedData, password: "***" });
    }

    // Mock: Check if user exists (in production, query database)
    // For now, we'll just return success

    return NextResponse.json(
      { message: "Account created successfully! Please login." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

