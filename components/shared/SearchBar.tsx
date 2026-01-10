"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  debounceMs?: number;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  className,
  debounceMs = 300,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Execute search when debounced query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  }, [onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (onSearch) {
          onSearch(query);
        }
      }
    },
    [query, onSearch]
  );

  return (
    <div
      className={cn(
        "relative flex items-center w-full max-w-lg",
        className
      )}
    >
      <Search
        className="absolute left-3 text-gray-400"
        size={20}
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "transition-colors",
          "text-gray-900 placeholder-gray-500"
        )}
        aria-label="Search"
        aria-describedby="search-hint"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
      <span id="search-hint" className="sr-only">
        Enter to search, type to filter results
      </span>
    </div>
  );
}
