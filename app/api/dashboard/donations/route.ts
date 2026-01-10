import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/dashboard/donations
 * Fetch user's donation history
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const status = searchParams.get("status");

    const where: any = {
      donorId: session.user.id,
    };

    if (status) {
      where.paymentStatus = status;
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: {
          cause: {
            select: {
              id: true,
              title: true,
              slug: true,
              image: true,
            },
          },
        },
      }),
      prisma.donation.count({ where }),
    ]);

    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      amount: Number(donation.amount),
      currency: donation.currency,
      cause: donation.cause
        ? {
            id: donation.cause.id,
            title: donation.cause.title,
            slug: donation.cause.slug,
            image: donation.cause.image,
          }
        : null,
      paymentMethod: donation.paymentMethod,
      paymentStatus: donation.paymentStatus,
      receiptNumber: donation.receiptNumber,
      taxExemptStatus: donation.taxExemptStatus,
      anonymous: donation.anonymous,
      dedication: donation.dedication,
      createdAt: donation.createdAt.toISOString(),
      updatedAt: donation.updatedAt.toISOString(),
    }));

    // Calculate totals
    const totalDonated = donations
      .filter((d) => d.paymentStatus === "SUCCESSFUL")
      .reduce((sum, d) => sum + Number(d.amount), 0);

    return NextResponse.json({
      donations: formattedDonations,
      summary: {
        totalDonated,
        totalDonations: total,
        successfulDonations: donations.filter(
          (d) => d.paymentStatus === "SUCCESSFUL"
        ).length,
      },
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}

