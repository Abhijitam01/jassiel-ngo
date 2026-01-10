import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/events
 * Fetch events with optional filtering
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const upcoming = searchParams.get("upcoming") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (upcoming) {
      where.date = { gte: new Date() };
      where.status = "UPCOMING";
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: [{ date: "asc" }],
        take: limit,
        skip: offset,
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              volunteerRegistrations: true,
            },
          },
        },
      }),
      prisma.event.count({ where }),
    ]);

    type EventWithOrganizer = (typeof events)[0];
    const formattedEvents = events.map((event: EventWithOrganizer) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      description: event.description,
      fullDescription: event.fullDescription,
      image: event.image,
      date: event.date.toISOString(),
      location: event.location,
      time: event.time,
      category: event.category,
      status: event.status,
      maxParticipants: event.maxParticipants,
      registeredParticipants: event.registeredParticipants,
      volunteersCount: event._count.volunteerRegistrations,
      organizer: event.organizer
        ? {
            id: event.organizer.id,
            name: event.organizer.name,
            email: event.organizer.email,
          }
        : null,
      requirements: event.requirements,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }));

    // Add caching headers
    const response = NextResponse.json({
      events: formattedEvents,
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
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

