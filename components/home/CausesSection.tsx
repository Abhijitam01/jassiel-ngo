"use client";

import { useEffect, useState } from "react";
import FundraiserCard from "@/components/shared/FundraiserCard";
import Button from "@/components/shared/Button";
import { Ribbon } from "lucide-react";
import { fetchCauses } from "@/lib/api-client";
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading";
import { ErrorState } from "@/components/ui/error-boundary";
import Section, { SectionHeader } from "@/components/ui/section";

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
}

export default function CausesSection() {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCauses() {
      try {
        setLoading(true);
        const response = await fetchCauses({
          status: "ACTIVE",
          limit: 3,
        });

        if (response.error) {
          setError(response.error);
        } else if (response.data) {
          setCauses(response.data.causes);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load causes");
      } finally {
        setLoading(false);
      }
    }

    loadCauses();
  }, []);

  if (error) {
    return (
      <Section variant="secondary" padding="lg">
        <ErrorState message={error} />
      </Section>
    );
  }

  return (
    <Section variant="secondary" padding="lg" id="causes">
      <SectionHeader
        title="Pick a cause close to your heart"
        subtitle="Support a Fundraiser"
        description="We believe that everything in this world is inter-dependent, and if we wish to live in a better world then it is important to care for it and protect it on every ground. So reach out and give a hand…"
        align="center"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
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
                daysLeft={30} // Calculate based on endDate if available
                slug={cause.slug}
                organization="Jaasiel Foundation"
              />
            ))}
          </div>

          {causes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No active causes at the moment.</p>
            </div>
          )}
        </>
      )}

      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          href="/causes"
          className="bg-primary hover:bg-primary-dark text-white border-0 shadow-lg hover:shadow-xl transition-shadow px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg w-full sm:w-auto"
          aria-label="See more fundraisers"
        >
          See More Fundraisers
        </Button>
      </div>
    </Section>
  );
}
