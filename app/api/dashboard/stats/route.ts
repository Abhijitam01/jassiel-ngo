import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isDatabaseConnectionError, getDatabaseErrorMessage } from "@/lib/db-error-handler";

/**
 * GET /api/dashboard/stats
 * Fetch user dashboard statistics
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch all stats in parallel for better performance
    const [
      donations,
      volunteerActivities,
      upcomingEvents,
      totalDonated,
      totalHours,
    ] = await Promise.all([
      // Recent donations
      prisma.donation.findMany({
        where: { donorId: userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          cause: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      // Recent volunteer activities
      prisma.volunteerRegistration.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
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
      // Upcoming events
      prisma.event.findMany({
        where: {
          date: { gte: new Date() },
          status: "UPCOMING",
        },
        orderBy: { date: "asc" },
        take: 3,
      }),
      // Total donated (successful donations only)
      prisma.donation.aggregate({
        where: {
          donorId: userId,
          paymentStatus: "SUCCESSFUL",
        },
        _sum: {
          amount: true,
        },
        _count: {
          id: true,
        },
      }),
      // Total volunteer hours
      prisma.volunteerRegistration.aggregate({
        where: { userId },
        _sum: {
          hoursLogged: true,
        },
        _count: {
          id: true,
        },
      }),
    ]);

    // Define types for map functions
    type DonationType = (typeof donations)[0];
    type ActivityType = (typeof volunteerActivities)[0];
    type EventType = (typeof upcomingEvents)[0];

    return NextResponse.json({
      stats: {
        totalDonated: Number(totalDonated._sum.amount || 0),
        totalDonations: totalDonated._count.id,
        totalHours: totalHours._sum.hoursLogged || 0,
        totalActivities: totalHours._count.id,
        upcomingEventsCount: upcomingEvents.length,
      },
      recentDonations: donations.map((d: DonationType) => ({
        id: d.id,
        amount: Number(d.amount),
        currency: d.currency,
        cause: d.cause
          ? {
              id: d.cause.id,
              title: d.cause.title,
              slug: d.cause.slug,
            }
          : null,
        paymentStatus: d.paymentStatus,
        receiptNumber: d.receiptNumber,
        createdAt: d.createdAt.toISOString(),
      })),
      recentActivities: volunteerActivities.map((a: ActivityType) => ({
        id: a.id,
        event: a.event
          ? {
              id: a.event.id,
              title: a.event.title,
              slug: a.event.slug,
              date: a.event.date.toISOString(),
              location: a.event.location,
            }
          : null,
        status: a.status,
        hoursLogged: a.hoursLogged,
        createdAt: a.createdAt.toISOString(),
      })),
      upcomingEvents: upcomingEvents.map((e: EventType) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        date: e.date.toISOString(),
        location: e.location,
        time: e.time,
      })),
    });
  } catch (error) {
    // Handle database connection errors gracefully
    if (isDatabaseConnectionError(error)) {
      if (process.env.NODE_ENV === "development") {
        console.error("Database connection error:", getDatabaseErrorMessage(error));
      }
      
      // Return empty stats when database is unavailable
      return NextResponse.json({
        stats: {
          totalDonated: 0,
          totalDonations: 0,
          totalHours: 0,
          totalActivities: 0,
          upcomingEventsCount: 0,
        },
        recentDonations: [],
        recentActivities: [],
        upcomingEvents: [],
      });
    }

    // Log other errors only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching dashboard stats:", error);
    }
    
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}

