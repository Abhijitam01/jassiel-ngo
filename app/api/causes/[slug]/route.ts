import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDatabaseConnectionError, getDatabaseErrorMessage } from "@/lib/db-error-handler";

/**
 * GET /api/causes/[slug]
 * Fetch a single cause by slug
 */
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cause = await prisma.cause.findUnique({
      where: { slug: params.slug },
      include: {
        _count: {
          select: {
            donations: true,
            updates: true,
          },
        },
        updates: {
          where: { published: true },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!cause) {
      return NextResponse.json(
        { error: "Cause not found" },
        { status: 404 }
      );
    }

    type CauseUpdate = (typeof cause.updates)[0];
    const formattedCause = {
      id: cause.id,
      slug: cause.slug,
      title: cause.title,
      description: cause.description,
      fullDescription: cause.fullDescription,
      image: cause.image,
      category: cause.category,
      status: cause.status,
      goal: cause.goal ? Number(cause.goal) : null,
      raised: Number(cause.raised),
      donorsCount: cause.donorsCount,
      donationsCount: cause._count.donations,
      updatesCount: cause._count.updates,
      startDate: cause.startDate?.toISOString() || null,
      endDate: cause.endDate?.toISOString() || null,
      targetBeneficiaries: cause.targetBeneficiaries,
      organizationDetails: cause.organizationDetails,
      updates: cause.updates.map((update: CauseUpdate) => ({
        id: update.id,
        title: update.title,
        content: update.content,
        image: update.image,
        createdAt: update.createdAt.toISOString(),
      })),
      createdAt: cause.createdAt.toISOString(),
      updatedAt: cause.updatedAt.toISOString(),
    };

    return NextResponse.json({ cause: formattedCause });
  } catch (error) {
    // Handle database connection errors gracefully
    if (isDatabaseConnectionError(error)) {
      if (process.env.NODE_ENV === "development") {
        console.error("Database connection error:", getDatabaseErrorMessage(error));
      }
      
      return NextResponse.json(
        { error: "Cause not found" },
        { status: 404 }
      );
    }

    // Log other errors only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching cause:", error);
    }
    
    return NextResponse.json(
      { error: "Failed to fetch cause" },
      { status: 500 }
    );
  }
}

