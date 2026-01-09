import Image from "next/image";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import Button from "@/components/shared/Button";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import EventRegistrationForm from "@/components/shared/EventRegistrationForm";
import ShareButtons from "@/components/ui/ShareButtons";
import { getEventSchema } from "@/lib/structured-data";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }
  return {
    title: `${event.title} - Jaasiel Foundation`,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  const isPastEvent = new Date(event.date) < new Date();
  const eventSchema = getEventSchema(event);

  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Back to Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Event Details</h2>
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
                <p className="text-gray-700 leading-relaxed">{event.fullDescription}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <ShareButtons
                  url={`/events/${event.slug}`}
                  title={event.title}
                  description={event.description}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Event Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Date</div>
                      <div className="text-gray-600">{formatDate(event.date)}</div>
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <div className="font-semibold">Time</div>
                        <div className="text-gray-600">{event.time}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-gray-600">{event.location}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">Category</div>
                    <span className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
              
              {!isPastEvent && (
                <div className="mt-6">
                  <EventRegistrationForm
                    eventId={event.id}
                    eventTitle={event.title}
                    eventDate={event.date}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </div>
  );
}

