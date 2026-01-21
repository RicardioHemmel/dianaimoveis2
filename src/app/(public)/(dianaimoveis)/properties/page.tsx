"use client";

import { SearchHeader } from "@/components/custom/search-results-page/SearchHeader";
import { SearchFilters } from "@/components/custom/search-results-page/SearchFilters";
import { SearchResultsGrid } from "@/components/custom/search-results-page/SearchResultsGrid";

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <SearchHeader />
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <aside className="w-full lg:w-[320px] shrink-0">
              <SearchFilters />
            </aside>
            <div className="flex-1 min-w-0">
              <SearchResultsGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
