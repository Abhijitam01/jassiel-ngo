import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isDatabaseConnectionError, getDatabaseErrorMessage } from "@/lib/db-error-handler";

/**
 * GET /api/dashboard/volunteer
 * Fetch user's volunteer activities
 */
export const dynamic = "force-dynamic";

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
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    const [activities, total] = await Promise.all([
      prisma.volunteerRegistration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
        include: {
          event: {
            select: {
              id: true,
              title: true,
              slug: true,
              date: true,
              location: true,
            },
          },
        },
      }),
      prisma.volunteerRegistration.count({ where }),
    ]);

    type ActivityWithEvent = (typeof activities)[0];
    const formattedActivities = activities.map((activity: ActivityWithEvent) => ({
      id: activity.id,
      event: activity.event
        ? {
            id: activity.event.id,
            title: activity.event.title,
            slug: activity.event.slug,
            date: activity.event.date.toISOString(),
            location: activity.event.location,
          }
        : null,
      status: activity.status,
      hoursLogged: activity.hoursLogged,
      tasksCompleted: activity.tasksCompleted,
      skills: activity.skills,
      interests: activity.interests,
      notes: activity.notes,
      createdAt: activity.createdAt.toISOString(),
      updatedAt: activity.updatedAt.toISOString(),
    }));

    // Calculate totals
    type ActivityType = (typeof activities)[0];
    const totalHours = activities.reduce((sum: number, a: ActivityType) => sum + a.hoursLogged, 0);
    const approvedActivities = activities.filter(
      (a: ActivityType) => a.status === "APPROVED" || a.status === "COMPLETED"
    ).length;

    return NextResponse.json({
      activities: formattedActivities,
      summary: {
        totalHours,
        totalActivities: total,
        approvedActivities,
        pendingActivities: activities.filter(
          (a: ActivityType) => a.status === "PENDING"
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
    // Handle database connection errors gracefully
    if (isDatabaseConnectionError(error)) {
      if (process.env.NODE_ENV === "development") {
        console.error("Database connection error:", getDatabaseErrorMessage(error));
      }
      
      // Return empty activities when database is unavailable
      return NextResponse.json({
        activities: [],
        summary: {
          totalHours: 0,
          totalActivities: 0,
          approvedActivities: 0,
          pendingActivities: 0,
        },
        pagination: {
          total: 0,
          limit: parseInt(request.nextUrl.searchParams.get("limit") || "10"),
          offset: parseInt(request.nextUrl.searchParams.get("offset") || "0"),
          hasMore: false,
        },
      });
    }

    // Log other errors only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching volunteer activities:", error);
    }
    
    return NextResponse.json(
      { error: "Failed to fetch volunteer activities" },
      { status: 500 }
    );
  }
}

