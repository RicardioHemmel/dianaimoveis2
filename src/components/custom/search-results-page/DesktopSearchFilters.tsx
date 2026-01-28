"use client";

// REACT | NEXT
import { useEffect, useRef } from "react";

// ICONS
import { SlidersHorizontal } from "lucide-react";

// COMPONENTS
import { FiltersContent } from "@/components/custom/search-results-page/FilterContent";

// CONTEXT
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";

export function DesktopSearchFilters() {
  // SEARCH CONTEXT
  const { clearFilters, hasActiveFilters } = useSearchPropertyContext();

  return (
    <div className="rounded-2xl border border-border/30 shadow-lg sticky top-4 h-full overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="bg-linear-to-r from-hero-bg to-hero-to px-5 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-9 rounded-xl bg-action-primary/20 flex items-center justify-center">
              <SlidersHorizontal className="size-4 text-action-primary" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-primary-foreground">
                Filtros
              </h3>
              <p className="text-primary-foreground/70 text-xs">
                Encontre seu imóvel ideal
              </p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-white rounded-2xl bg-action-primary px-4 py-1 cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* SCROLLABLE FILTERS CONTENT */}
      <div className="flex-1 overflow-y-auto pl-4 pe-2 py-4">
        <FiltersContent />
      </div>
    </div>
  );
}
