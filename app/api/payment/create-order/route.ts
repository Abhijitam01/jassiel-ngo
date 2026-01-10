import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/payment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  currency: z.string().default("INR"),
  causeId: z.string().optional(),
  anonymous: z.boolean().optional(),
  dedication: z.string().optional(),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  donorPhone: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const validatedData = createOrderSchema.parse(body);

    // Create or find donor user (for guest donations)
    let donorId = session?.user?.id;
    
    if (!donorId && validatedData.donorEmail) {
      // Check if user exists with this email
      let existingUser = await prisma.user.findUnique({
        where: { email: validatedData.donorEmail },
      });

      if (!existingUser) {
        // Import password hashing for guest user creation
        const { hashPassword } = await import("@/lib/password");
        
        // Create a temporary password - user can reset it later via email
        const tempPassword = await hashPassword(
          `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`
        );
        
        // Create guest user account (will be activated after email verification)
        existingUser = await prisma.user.create({
          data: {
            email: validatedData.donorEmail,
            phone: validatedData.donorPhone || null,
            name: validatedData.donorName || "Guest Donor",
            password: tempPassword,
            role: "USER",
            emailVerified: false,
          },
        });

        // TODO: Send welcome email with password reset link
      }
      
      donorId = existingUser.id;
    }

    // Create Razorpay order
    const order = await createOrder({
      amount: validatedData.amount,
      currency: validatedData.currency || "INR",
      receipt: `donation_${Date.now()}`,
      notes: {
        causeId: validatedData.causeId || "",
        anonymous: validatedData.anonymous ? "true" : "false",
        dedication: validatedData.dedication || "",
        donorId: donorId || "",
      },
      customer: validatedData.donorEmail
        ? {
            name: validatedData.donorName || session?.user?.name || "Anonymous",
            email: validatedData.donorEmail || session?.user?.email || "",
            contact: validatedData.donorPhone || "",
          }
        : session?.user
        ? {
            name: session.user.name || "Anonymous",
            email: session.user.email || "",
            contact: "",
          }
        : undefined,
    });

    // Save order to database (pending donation)
    // Create donation record with order ID as transaction ID (will be updated with payment ID after verification)
    if (donorId) {
      await prisma.donation.create({
        data: {
          amount: validatedData.amount,
          currency: validatedData.currency || "INR",
          donorId: donorId,
          causeId: validatedData.causeId || undefined,
          paymentMethod: "RAZORPAY",
          transactionId: order.id, // Order ID initially, will be updated to payment ID
          paymentStatus: "PENDING",
          anonymous: validatedData.anonymous || false,
          dedication: validatedData.dedication || undefined,
          metadata: {
            orderId: order.id,
            isGuest: !session?.user?.id,
          },
        },
      });
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

