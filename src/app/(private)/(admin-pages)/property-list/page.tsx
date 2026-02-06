import { Suspense } from "react";
import { getAllPropertiesToView } from "@/lib/services/properties/queries/properties-query.service";
import { getStandings } from "@/lib/services/properties/property-details/property-standings.service";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies.service";
import { getCompanies } from "@/lib/services/properties/property-details/property-construction-company.service";
import { PropertyListWithFilters } from "@/components/custom/property-list/PropertyListWithFilters";
import {
  PropertyListResultCount,
  PropertyListResults,
} from "@/components/custom/property-list/PropertyListResults";
import { PropertyListSkeleton } from "@/components/custom/property-list/PropertyListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type SearchParams = Record<string, string | string[] | undefined>;

type PropertiesListPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function PropertiesListPage({
  searchParams,
}: PropertiesListPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const propertiesPromise = getAllPropertiesToView();
  const [standings, typologies, constructionCompanies] = await Promise.all([
    getStandings(),
    getTypologies(),
    getCompanies(),
  ]);

  return (
    <PropertyListWithFilters
      standings={standings}
      typologies={typologies}
      constructionCompanies={constructionCompanies}
      resultCountSlot={
        <Suspense fallback={<ResultCountSkeleton />}>
          <PropertyListResultCount
            propertiesPromise={propertiesPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>
      }
      listSlot={
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyListResults
            propertiesPromise={propertiesPromise}
            searchParams={resolvedSearchParams}
          />
        </Suspense>
      }
    />
  );
}

function ResultCountSkeleton() {
  return <Skeleton className="h-9 w-28 rounded-full" />;
}
