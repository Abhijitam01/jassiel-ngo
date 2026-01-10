import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/causes
 * Fetch causes with optional filtering
 * Includes caching headers for better performance
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    } else {
      where.status = "ACTIVE"; // Default to active causes only
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { fullDescription: { contains: search, mode: "insensitive" } },
      ];
    }

    const [causes, total] = await Promise.all([
      prisma.cause.findMany({
        where,
        orderBy: [
          { createdAt: "desc" },
        ],
        take: limit,
        skip: offset,
        include: {
          _count: {
            select: { donations: true },
          },
        },
      }),
      prisma.cause.count({ where }),
    ]);

    // Format response
    const formattedCauses = causes.map((cause) => ({
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
      startDate: cause.startDate?.toISOString() || null,
      endDate: cause.endDate?.toISOString() || null,
      targetBeneficiaries: cause.targetBeneficiaries,
      createdAt: cause.createdAt.toISOString(),
      updatedAt: cause.updatedAt.toISOString(),
    }));

    // Add caching headers
    const response = NextResponse.json({
      causes: formattedCauses,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

    // Cache for 5 minutes
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching causes:", error);
    return NextResponse.json(
      { error: "Failed to fetch causes" },
      { status: 500 }
    );
  }
}
