"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, FileText, Calendar, Heart } from "lucide-react";
import Link from "next/link";
import Card from "@/components/shared/Card";
import { blogPosts } from "@/data/blog";
import { events } from "@/data/events";
import { causes } from "@/data/causes";
import { EmptySearchResults } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import { trackSearch } from "@/lib/analytics";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<{
    blog: typeof blogPosts;
    events: typeof events;
    causes: typeof causes;
  }>({
    blog: [],
    events: [],
    causes: [],
  });

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
      setResults({ blog: [], events: [], causes: [] });
      return;
    }

    const blogResults = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content?.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term)
    );

    const eventResults = events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
    );

    const causeResults = causes.filter(
      (cause) =>
        cause.title.toLowerCase().includes(term) ||
        cause.description.toLowerCase().includes(term) ||
        cause.category.toLowerCase().includes(term)
    );

    setResults({
      blog: blogResults,
      events: eventResults,
      causes: causeResults,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
      performSearch(query);
      trackSearch(query, totalResults);
    }
  };

  const totalResults = results.blog.length + results.events.length + results.causes.length;

  return (
    <div className="py-16 md:py-24">
      {/* Search Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Search className="text-white" size={32} />
              <span className="text-lg font-semibold">Search</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Search Our Website</h1>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for blog posts, events, causes..."
                className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={24} />
              </button>
            </form>
            {query && (
              <p className="text-center mt-4 text-white/80">
                Found {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{query}&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {query ? (
        totalResults > 0 ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              {/* Blog Results */}
              {results.blog.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold">
                      Blog Posts ({results.blog.length})
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.blog.map((post) => (
                      <Card key={post.id} hover className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-sm text-gray-600 mb-2">
                            {formatDate(post.date)} • {post.author}
                          </div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary font-semibold hover:underline"
                          >
                            Read More →
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Results */}
              {results.events.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold">
                      Events ({results.events.length})
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.events.map((event) => (
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
                          <div className="text-sm text-primary mb-2">
                            {formatDate(event.date)}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                          <Link
                            href={`/events/${event.slug}`}
                            className="text-primary font-semibold hover:underline"
                          >
                            View Details →
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Cause Results */}
              {results.causes.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Heart className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold">
                      Causes ({results.causes.length})
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.causes.map((cause) => (
                      <Card key={cause.id} hover className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={cause.image}
                            alt={cause.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-sm text-primary mb-2">{cause.category}</div>
                          <h3 className="text-xl font-bold mb-2">{cause.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{cause.description}</p>
                          <Link
                            href={`/causes/${cause.slug}`}
                            className="text-primary font-semibold hover:underline"
                          >
                            Learn More →
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <EmptySearchResults query={query} />
            </div>
          </section>
        )
      ) : (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 text-lg">
              Enter a search term above to find blog posts, events, and causes.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

