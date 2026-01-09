"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "default" | "compact";
  className?: string;
}

export default function SearchBar({ variant = "default", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("relative", className)}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </form>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 text-gray-600 hover:text-primary transition-colors",
          className
        )}
        aria-label="Open search"
        aria-expanded={isOpen}
        aria-controls="search-modal"
      >
        <Search size={20} aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="search-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg p-4"
          >
            <div className="container mx-auto max-w-2xl">
              <h2 id="search-title" className="sr-only">Search</h2>
              <form onSubmit={handleSubmit} className="relative" role="search">
                <label htmlFor="search-input" className="sr-only">
                  Search for blog posts, events, causes
                </label>
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for blog posts, events, causes..."
                  className="w-full px-6 py-4 pr-12 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  autoFocus
                  aria-describedby="search-hint"
                />
                <span id="search-hint" className="sr-only">
                  Search across blog posts, events, and causes
                </span>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Submit search"
                >
                  <Search size={24} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  aria-label="Close search dialog"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

