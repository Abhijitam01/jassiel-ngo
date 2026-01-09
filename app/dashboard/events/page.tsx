"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// Mock events data
const upcomingEvents = [
  { id: 1, title: "Summer Education Camp", date: "2024-06-01", location: "Delhi", time: "9:00 AM" },
  { id: 2, title: "Health Checkup Drive", date: "2024-06-15", location: "Mumbai", time: "10:00 AM" },
  { id: 3, title: "Community Cleanup", date: "2024-07-01", location: "Bangalore", time: "8:00 AM" },
];

const registeredEvents = [
  { id: 1, title: "Summer Education Camp", date: "2024-06-01", location: "Delhi" },
];

export default function DashboardEventsPage() {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
          <p className="text-gray-600">View upcoming events and your registrations</p>
        </div>

        {/* Registered Events */}
        {registeredEvents.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Registered Events</h2>
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" href={`/events/${event.id}`}>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Upcoming Events */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" href={`/events/${event.id}`} className="flex-1">
                    Register
                  </Button>
                  <Button variant="outline" size="sm" href={`/events/${event.id}`}>
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

