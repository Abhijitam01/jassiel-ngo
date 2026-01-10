"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/shared/Card";
import { BookOpen, Calendar, User, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import SearchBar from "@/components/shared/SearchBar";
import FilterBar, { FilterOption } from "@/components/shared/FilterBar";
import { LoadingSpinner, CardSkeleton } from "@/components/ui/loading";
import { ErrorState } from "@/components/ui/error-boundary";
import Section, { SectionHeader } from "@/components/ui/section";
import { fetchBlogPosts } from "@/lib/api-client";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
  date: string;
  category: string;
  tags: string[];
  viewCount: number;
  featured: boolean;
}

function BlogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: searchParams.get("category")?.split(",") || [],
    tag: searchParams.get("tag")?.split(",") || [],
  });

  const categories: FilterOption[] = [
    { value: "Poverty", label: "Poverty" },
    { value: "Health", label: "Health" },
    { value: "Education", label: "Education" },
    { value: "Empowerment", label: "Empowerment" },
    { value: "Community", label: "Community" },
    { value: "Success Stories", label: "Success Stories" },
  ];

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchBlogPosts({
        category: selectedFilters.category[0] || undefined,
        tag: selectedFilters.tag[0] || undefined,
        search: searchQuery || undefined,
        limit: 20,
      });

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setPosts(response.data.posts);
      }

      // Update URL with current filters
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (selectedFilters.category.length > 0)
        params.set("category", selectedFilters.category.join(","));
      if (selectedFilters.tag.length > 0)
        params.set("tag", selectedFilters.tag.join(","));
      
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedFilters, router]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleFilterChange = useCallback((key: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedFilters({ category: [], tag: [] });
    setSearchQuery("");
  }, []);

  return (
    <>
      <Section variant="primary" padding="lg" className="text-white">
        <SectionHeader
          title="Our Blog"
          subtitle="Blog"
          description="Stories, updates, and insights from our work"
          align="center"
          className="text-white [&_h2]:text-white [&_p]:text-white/90"
        />
      </Section>

      <Section variant="default" padding="lg" id="blog">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <SearchBar
              placeholder="Search blog posts..."
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
            onReset={() => loadPosts()}
            className="my-8"
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No blog posts found
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
            {posts.map((post) => (
              <Card
                key={post.id}
                hover
                className="overflow-hidden group h-full flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block flex-1 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="text-primary" size={16} />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="text-primary" size={16} />
                        <span>{post.author.name}</span>
                      </div>
                      {post.viewCount > 0 && (
                        <span className="text-gray-500">
                          {post.viewCount} views
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            <Tag size={12} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <span className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                        Read More
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <>
        <Section variant="primary" padding="lg" className="text-white">
          <SectionHeader
            title="Our Blog"
            subtitle="Blog"
            description="Loading..."
            align="center"
            className="text-white [&_h2]:text-white [&_p]:text-white/90"
          />
        </Section>
        <Section variant="default" padding="lg">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </Section>
      </>
    }>
      <BlogPageContent />
    </Suspense>
  );
}

