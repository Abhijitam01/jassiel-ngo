import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature, getPaymentDetails } from "@/lib/payment";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = verifyPaymentSchema.parse(body);

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      validatedData.razorpay_order_id,
      validatedData.razorpay_payment_id,
      validatedData.razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get payment details from Razorpay
    const paymentDetails = await getPaymentDetails(
      validatedData.razorpay_payment_id
    );

    // Find donation by order ID (stored as transactionId during order creation)
    const donation = await prisma.donation.findFirst({
      where: {
        transactionId: validatedData.razorpay_order_id,
      },
      include: {
        donor: true,
        cause: true,
      },
    });

    if (donation) {
      // Update donation status if it already existed
      const updatedDonation = await prisma.donation.update({
        where: { id: donation.id },
        data: {
          transactionId: validatedData.razorpay_payment_id,
          paymentStatus:
            paymentDetails.status === "captured" ||
            paymentDetails.status === "authorized"
              ? "SUCCESSFUL"
              : "FAILED",
          receiptNumber:
            donation.receiptNumber ||
            `REC-${Date.now()}-${donation.id.slice(0, 8)}`,
        },
      });

      // Update cause raised amount if donation is successful
      if (
        updatedDonation.paymentStatus === "SUCCESSFUL" &&
        updatedDonation.causeId
      ) {
        await prisma.cause.update({
          where: { id: updatedDonation.causeId },
          data: {
            raised: {
              increment: updatedDonation.amount,
            },
            donorsCount: {
              increment: 1,
            },
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: validatedData.razorpay_payment_id,
      status: paymentDetails.status,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}

