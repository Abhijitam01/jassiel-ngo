import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Events - Jaasiel Foundation",
  description: "Upcoming and past events organized by Jaasiel Foundation.",
};

// Cache events page for 1 hour
export const revalidate = 3600;

export default function EventsPage() {
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-white" size={32} />
            <span className="text-lg font-semibold">Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Events</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join us for our upcoming events and programs
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} hover className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <Button variant="outline" size="sm" href={`/events/${event.slug}`}>
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className={`py-16 md:py-24 ${upcomingEvents.length > 0 ? 'bg-gray-50' : ''}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} hover className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <Button variant="outline" size="sm" href={`/events/${event.slug}`}>
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

