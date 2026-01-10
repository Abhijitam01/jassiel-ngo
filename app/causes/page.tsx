"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FundraiserCard from "@/components/shared/FundraiserCard";
import SearchBar from "@/components/shared/SearchBar";
import FilterBar, { FilterOption } from "@/components/shared/FilterBar";
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading";
import { ErrorState } from "@/components/ui/error-boundary";
import Section, { SectionHeader } from "@/components/ui/section";
import { fetchCauses } from "@/lib/api-client";
import { Ribbon } from "lucide-react";

interface Cause {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  goal: number | null;
  raised: number;
  donorsCount: number;
  donationsCount: number;
  category: string;
  status: string;
}

export default function CausesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [causes, setCauses] = useState<Cause[]>([]);
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
    { value: "Care", label: "Care" },
    { value: "Training", label: "Training" },
  ];

  const statuses: FilterOption[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "COMPLETED", label: "Completed" },
    { value: "ARCHIVED", label: "Archived" },
  ];

  const loadCauses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCauses({
        status: selectedFilters.status[0] || "ACTIVE",
        category: selectedFilters.category[0] || undefined,
        search: searchQuery || undefined,
        limit: 20,
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setCauses(response.data.causes);
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
      setError(err instanceof Error ? err.message : "Failed to load causes");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedFilters, router]);

  useEffect(() => {
    loadCauses();
  }, [loadCauses]);

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
    <Section variant="default" padding="lg" id="causes">
      <SectionHeader
        title="Support a Cause"
        subtitle="Causes"
        description="Choose a cause that resonates with you and make a difference in the lives of those in need."
        align="center"
      />

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar
            placeholder="Search causes..."
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
          onReset={() => loadCauses()}
          className="my-8"
        />
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : causes.length === 0 ? (
        <div className="text-center py-12">
          <Ribbon className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No causes found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={handleClearAll}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {causes.map((cause) => (
              <FundraiserCard
                key={cause.id}
                id={cause.id}
                title={cause.title}
                description={cause.description}
                image={cause.image}
                goal={cause.goal ?? 0}
                raised={cause.raised}
                donations={cause.donationsCount || 0}
                daysLeft={30}
                slug={cause.slug}
                organization="Jaasiel Foundation"
              />
            ))}
          </div>

          {/* Pagination would go here */}
        </>
      )}
    </Section>
  );
}
