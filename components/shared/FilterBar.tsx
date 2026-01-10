"use client";

import { useState, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/shared/Button";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  filters: {
    label: string;
    key: string;
    options: FilterOption[];
  }[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onClearAll?: () => void;
  className?: string;
}

export default function FilterBar({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(
    (key: string, value: string) => {
      const current = selectedFilters[key] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFilterChange(key, newValues);
    },
    [selectedFilters, onFilterChange]
  );

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  const handleClearAll = useCallback(() => {
    filters.forEach((filter) => {
      onFilterChange(filter.key, []);
    });
    if (onClearAll) {
      onClearAll();
    }
  }, [filters, onFilterChange, onClearAll]);

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 border rounded-lg",
            "hover:bg-gray-50 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            isOpen && "bg-primary/5 border-primary"
          )}
          aria-expanded={isOpen}
          aria-label="Toggle filters"
        >
          <Filter size={18} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-1"
            aria-label="Clear all filters"
          >
            <X size={16} />
            Clear All
          </Button>
        )}

        {/* Active filters display */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) =>
              (selectedFilters[filter.key] || []).map((value) => {
                const option = filter.options.find((o) => o.value === value);
                return (
                  <button
                    key={`${filter.key}-${value}`}
                    type="button"
                    onClick={() => handleToggle(filter.key, value)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                    aria-label={`Remove ${option?.label || value} filter`}
                  >
                    <span>{option?.label || value}</span>
                    <X size={14} />
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Filter dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 min-w-[200px] max-h-[400px] overflow-y-auto"
          role="menu"
          aria-label="Filter options"
        >
          {filters.map((filter) => (
            <div key={filter.key} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {filter.label}
              </h3>
              <div className="space-y-1">
                {filter.options.map((option) => {
                  const isSelected =
                    (selectedFilters[filter.key] || []).includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(filter.key, option.value)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        aria-label={`Filter by ${option.label}`}
                      />
                      <span className="text-sm text-gray-700 flex-1">
                        {option.label}
                      </span>
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-500">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

