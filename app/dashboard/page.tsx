"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Heart, Users, Calendar, TrendingUp } from "lucide-react";
import Card from "@/components/shared/Card";
import Link from "next/link";
import Button from "@/components/shared/Button";

// Mock data
const mockDonations = [
  { id: 1, amount: 5000, date: "2024-01-15", cause: "Education for Children" },
  { id: 2, amount: 2500, date: "2024-02-20", cause: "Healthcare Support" },
  { id: 3, amount: 10000, date: "2024-03-10", cause: "Food Distribution" },
];

const mockVolunteerActivities = [
  { id: 1, activity: "Teaching Session", date: "2024-03-15", hours: 4 },
  { id: 2, activity: "Food Distribution", date: "2024-03-20", hours: 6 },
  { id: 3, activity: "Community Outreach", date: "2024-03-25", hours: 3 },
];

const upcomingEvents = [
  { id: 1, title: "Summer Education Camp", date: "2024-06-01", location: "Delhi" },
  { id: 2, title: "Health Checkup Drive", date: "2024-06-15", location: "Mumbai" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalHours = mockVolunteerActivities.reduce((sum, v) => sum + v.hours, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your activities and contributions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalDonated.toLocaleString()}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Heart className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Volunteer Hours</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Donations Made</p>
                <p className="text-2xl font-bold text-gray-900">{mockDonations.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="text-primary" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
            <Link href="/dashboard/donations">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockDonations.slice(0, 3).map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{donation.cause}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-bold text-primary">
                  ₹{donation.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Volunteer Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Volunteer Activities</h2>
            <Link href="/dashboard/volunteer">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockVolunteerActivities.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{activity.activity}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(activity.date).toLocaleDateString()} • {activity.hours} hours
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/dashboard/events">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} • {event.location}
                  </p>
                </div>
                <Button variant="outline" size="sm" href={`/events/${event.id}`}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

