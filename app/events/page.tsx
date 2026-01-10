"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/shared/SearchBar";
import FilterBar, { FilterOption } from "@/components/shared/FilterBar";
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading";
import { ErrorState } from "@/components/ui/error-boundary";
import Section, { SectionHeader } from "@/components/ui/section";
import { fetchEvents } from "@/lib/api-client";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  time: string | null;
  category: string;
  status: string;
}

function EventsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: searchParams.get("category")?.split(",") || [],
    status: searchParams.get("status")?.split(",") || [],
  });

  const categories: FilterOption[] = [
    { value: "Education", label: "Education" },
    { value: "Health", label: "Health" },
    { value: "Empowerment", label: "Empowerment" },
    { value: "Community", label: "Community" },
    { value: "Awareness", label: "Awareness" },
  ];

  const statuses: FilterOption[] = [
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ONGOING", label: "Ongoing" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchEvents({
        status: selectedFilters.status[0] || undefined,
        category: selectedFilters.category[0] || undefined,
        search: searchQuery || undefined,
        limit: 20,
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setEvents(response.data.events);
      }

      // Update URL with current filters
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (selectedFilters.category.length > 0)
        params.set("category", selectedFilters.category.join(","));
      if (selectedFilters.status.length > 0)
        params.set("status", selectedFilters.status.join(","));
      
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedFilters, router]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleFilterChange = useCallback((key: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedFilters({ category: [], status: [] });
    setSearchQuery("");
  }, []);

  return (
    <Section variant="default" padding="lg" id="events">
      <SectionHeader
        title="Upcoming Events"
        subtitle="Events"
        description="Join us for events and activities that make a difference in the community."
        align="center"
      />

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar
            placeholder="Search events..."
            onSearch={setSearchQuery}
            className="w-full sm:max-w-md"
          />
          <FilterBar
            filters={[
              {
                label: "Category",
                key: "category",
                options: categories,
              },
              {
                label: "Status",
                key: "status",
                options: statuses,
              },
            ]}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      {error && (
        <ErrorState
          message={error}
          onReset={() => loadEvents()}
          className="my-8"
        />
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={handleClearAll}
            className="text-primary hover:text-primary-dark font-medium"
            aria-label="Clear all filters"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate > new Date();
            
            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary"
                aria-label={`View event: ${event.title}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "UPCOMING"
                          ? "bg-primary text-white"
                          : event.status === "ONGOING"
                          ? "bg-accent text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  {isUpcoming && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary" size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary" size={16} />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="text-primary" size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-primary font-semibold text-sm group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Section>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <Section variant="default" padding="lg">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </Section>
    }>
      <EventsPageContent />
    </Suspense>
  );
}
