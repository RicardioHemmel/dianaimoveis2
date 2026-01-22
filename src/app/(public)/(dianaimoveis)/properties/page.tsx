// COMPONENTS
import { SearchHeader } from "@/components/custom/search-results-page/SearchHeader";
import { SearchFilters } from "@/components/custom/search-results-page/SearchFilters";
import { SearchResultsGrid } from "@/components/custom/search-results-page/SearchResultsGrid";

// SERVICES
import { getAllPropertiesToView } from "@/lib/services/properties/queries/properties-query.service";

export default async function SearchResultsPage() {
  const properties = await getAllPropertiesToView();

  if (!properties.length) {
    return "peniz";
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <SearchHeader />
        <div className="w-11/12 mx-auto px-6 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center md:items-start">
            <aside className="hidden w-full xl:block lg:w-[320px] shrink-0">
              <SearchFilters />
            </aside>
            <div className="flex-1 min-w-0">
              <SearchResultsGrid properties={properties} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
