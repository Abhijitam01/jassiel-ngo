"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/shared/Card";
import { Users, Clock, Calendar, Award } from "lucide-react";

// Mock volunteer data
const mockActivities = [
  { id: 1, activity: "Teaching Session", date: "2024-03-15", hours: 4, location: "Delhi" },
  { id: 2, activity: "Food Distribution", date: "2024-03-20", hours: 6, location: "Mumbai" },
  { id: 3, activity: "Community Outreach", date: "2024-03-25", hours: 3, location: "Delhi" },
  { id: 4, activity: "Health Camp Support", date: "2024-04-01", hours: 5, location: "Bangalore" },
];

export default function VolunteerPage() {
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

  const totalHours = mockActivities.reduce((sum, a) => sum + a.hours, 0);
  const activitiesThisMonth = mockActivities.filter(
    (a) => new Date(a.date).getMonth() === new Date().getMonth()
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Activities</h1>
          <p className="text-gray-600">Track your volunteer hours and activities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Activities</p>
                <p className="text-2xl font-bold text-gray-900">{mockActivities.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{activitiesThisMonth}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="text-primary" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Activities List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <button className="text-primary hover:underline text-sm font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{activity.activity}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {activity.hours} hours
                    </span>
                    <span>{activity.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resources */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Volunteer Resources</h2>
          </div>
          <div className="space-y-3">
            <a
              href="#"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Volunteer Handbook</h3>
              <p className="text-sm text-gray-600">Guidelines and best practices for volunteers</p>
            </a>
            <a
              href="#"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Training Materials</h3>
              <p className="text-sm text-gray-600">Access training resources and materials</p>
            </a>
            <a
              href="#"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Upcoming Events</h3>
              <p className="text-sm text-gray-600">View and register for upcoming volunteer events</p>
            </a>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

