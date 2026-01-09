"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { recentDonations, type Donation } from "@/data/donations";
import Skeleton from "@/components/ui/Skeleton";
import { Heart } from "lucide-react";

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

export default function DonationFeed() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedDonations, setDisplayedDonations] = useState<Donation[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setDonations(recentDonations);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize displayed donations - duplicate for seamless infinite scroll
  useEffect(() => {
    if (!isLoading && donations.length > 0) {
      // Duplicate donations array multiple times for seamless infinite scroll
      const duplicated = [...donations, ...donations, ...donations];
      setDisplayedDonations(duplicated);
    }
  }, [isLoading, donations]);

  // Load more donations for infinite scroll
  const loadMore = useCallback(() => {
    if (isLoading) return;

    // Add another copy of donations to maintain infinite scroll
    setDisplayedDonations((prev) => [...prev, ...donations]);
  }, [isLoading, donations]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, loadMore]);

  // Auto-scroll animation (right to left)
  useEffect(() => {
    if (isLoading || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching the end for seamless loop
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isLoading, displayedDonations.length]);

  // Auto-refresh donations every 30 seconds
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        // Simulate new donation
        const newDonation: Donation = {
          id: `donation-${Date.now()}`,
          donorName: recentDonations[Math.floor(Math.random() * recentDonations.length)].donorName,
          amount: [100, 300, 500, 1000, 2500, 3500, 5100][Math.floor(Math.random() * 7)],
          timestamp: new Date(),
        };
        setDonations((prev) => [newDonation, ...prev].slice(0, 50));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
              <Heart className="text-primary" size={16} />
              <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">
                Recent Donations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-secondary px-2">
              Making a Difference Together
            </h2>
          </div>

          {/* Horizontal Scrolling Donation Feed */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max px-2">
                {isLoading ? (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Skeleton variant="circular" width={40} height={40} />
                          <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="60%" height={16} />
                            <Skeleton variant="text" width="40%" height={14} />
                          </div>
                        </div>
                        <Skeleton variant="text" width="80px" height={20} />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {displayedDonations.map((donation, index) => (
                      <div
                        key={`${donation.id}-${index}`}
                        className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-slide-up"
                        style={{ animationDelay: `${(index % 10) * 0.05}s` }}
                      >
                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Heart className="text-primary" size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm md:text-base text-gray-800 font-semibold mb-1 truncate">
                              {donation.donorName}
                            </p>
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                              {formatTimeAgo(donation.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] sm:text-xs text-gray-600 mb-1">just donated</p>
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#DC2626]">
                            {formatAmount(donation.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {/* Loading trigger for infinite scroll */}
                    <div ref={loadingRef} className="flex-shrink-0 w-4 h-1" />
                  </>
                )}
              </div>
            </div>

            {/* Scroll gradient indicators */}
            <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-600 mt-6 sm:mt-8 text-xs sm:text-sm px-4">
            Join thousands of donors making a difference every day
          </p>
        </div>
    </section>
  );
}

