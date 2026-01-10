"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Heart, Users, Calendar, TrendingUp, Receipt } from "lucide-react";
import Card from "@/components/shared/Card";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading";
import { ErrorState } from "@/components/ui/error-boundary";
import { fetchUserDonations, fetchUserVolunteerActivities } from "@/lib/api-client";
import { fetchEvents } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  cause: { id: string; title: string; slug: string; image: string } | null;
  paymentStatus: string;
  receiptNumber: string | null;
  createdAt: string;
}

interface VolunteerActivity {
  id: string;
  event: { id: string; title: string; slug: string; date: string; location: string } | null;
  status: string;
  hoursLogged: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteerActivities, setVolunteerActivities] = useState<VolunteerActivity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    totalDonated: 0,
    totalDonations: 0,
    totalHours: 0,
    totalActivities: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!session?.user?.id || status !== "authenticated") return;

      try {
        setLoading(true);
        
        const [donationsRes, volunteerRes, eventsRes] = await Promise.all([
          fetchUserDonations({ limit: 5 }),
          fetchUserVolunteerActivities({ limit: 5 }),
          fetchEvents({ upcoming: true, limit: 3 }),
        ]);

        if (donationsRes.error || volunteerRes.error || eventsRes.error) {
          setError(donationsRes.error || volunteerRes.error || eventsRes.error || "Failed to load dashboard data");
        } else {
          if (donationsRes.data) {
            setDonations(donationsRes.data.donations || []);
            setSummary((prev) => ({
              ...prev,
              totalDonated: donationsRes.data?.summary?.totalDonated || 0,
              totalDonations: donationsRes.data?.summary?.totalDonations || 0,
            }));
          }

          if (volunteerRes.data) {
            setVolunteerActivities(volunteerRes.data.activities || []);
            setSummary((prev) => ({
              ...prev,
              totalHours: volunteerRes.data?.summary?.totalHours || 0,
              totalActivities: volunteerRes.data?.summary?.totalActivities || 0,
            }));
          }

          if (eventsRes.data) {
            setUpcomingEvents(eventsRes.data.events || []);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadDashboardData();
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState message={error} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your activities and contributions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Donated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary.totalDonated)}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg" aria-hidden="true">
                <Heart className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Volunteer Hours</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalHours}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg" aria-hidden="true">
                <Users className="text-primary" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Donations Made</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalDonations}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg" aria-hidden="true">
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
              <div className="bg-primary/10 p-3 rounded-lg" aria-hidden="true">
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
              <Button variant="outline" size="sm" aria-label="View all donations">
                View All
              </Button>
            </Link>
          </div>
          {donations.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No donations yet</p>
              <Link href="/donate">
                <Button variant="primary" size="sm" className="mt-4">
                  Make Your First Donation
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.slice(0, 3).map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {donation.cause?.title || "General Donation"}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-gray-600">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          donation.paymentStatus === "SUCCESSFUL"
                            ? "bg-green-100 text-green-800"
                            : donation.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {donation.paymentStatus}
                      </span>
                      {donation.receiptNumber && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Receipt size={12} />
                          {donation.receiptNumber}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(donation.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Volunteer Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Volunteer Activities</h2>
            <Link href="/dashboard/volunteer">
              <Button variant="outline" size="sm" aria-label="View all volunteer activities">
                View All
              </Button>
            </Link>
          </div>
          {volunteerActivities.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No volunteer activities yet</p>
              <Link href="/volunteer">
                <Button variant="primary" size="sm" className="mt-4">
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {volunteerActivities.slice(0, 3).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {activity.event?.title || "General Volunteer Work"}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-sm text-gray-600">
                        {new Date(activity.createdAt).toLocaleDateString()}
                        {activity.hoursLogged > 0 && ` • ${activity.hoursLogged} hours`}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "APPROVED" || activity.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/events">
              <Button variant="outline" size="sm" aria-label="View all events">
                View All
              </Button>
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600">No upcoming events</p>
              <Link href="/events">
                <Button variant="primary" size="sm" className="mt-4">
                  Browse Events
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                  <Link href={`/events/${event.slug}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

