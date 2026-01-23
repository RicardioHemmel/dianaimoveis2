// COMPONENTS
import { SearchHeader } from "@/components/custom/search-results-page/SearchHeader";
import { SearchFilters } from "@/components/custom/search-results-page/SearchFilters";
import { MobileFiltersDrawer } from "@/components/custom/search-results-page/MobileFiltersDrawer";
import { SearchResults } from "@/components/custom/search-results-page/SearchResults";

// SERVICES
import {
  getFilteredProperties,
  getPropertyFilterValues,
} from "@/lib/services/properties/queries/searchPage/filtered-properties.service";

// PROVIDER
import {
  DeliveryStatus,
  DetailsQty,
  SearchPropertyProvider,
  SelectedFilters,
  SortOptions,
} from "@/context/SearchPropertyContext";

interface SearchResultsPageProps {
  searchParams: Promise<{
    typologies?: string;
    amenities?: string;
    bedrooms?: DetailsQty;
    bathrooms?: DetailsQty;
    parkingSpaces?: DetailsQty;
    deliveryStatus?: DeliveryStatus;
    sortOption?: SortOptions;
  }>;
}
export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  // AWAIT THE URL PARAMS
  const resolvedParams = await searchParams;

  //----------- TRANSFORMS PARAMETERS FROM URL INTO ARRAYS FOR DB QUERY --------
  const typologies = resolvedParams?.typologies
    ? resolvedParams.typologies.split(",")
    : [];

  const amenities = resolvedParams?.amenities
    ? resolvedParams.amenities.split(",")
    : [];

  //------------- SINGULAR VALUES -------

  // BEDROOMS -> "0", "1" , "2"
  const bedrooms = resolvedParams?.bedrooms ? resolvedParams?.bedrooms : null;

  // BATHROOMS -> "0", "1" , "2"
  const bathrooms = resolvedParams?.bathrooms
    ? resolvedParams?.bathrooms
    : null;

  // PARKING SPACES -> "0", "1" , "2"
  const parkingSpaces = resolvedParams?.parkingSpaces
    ? resolvedParams?.parkingSpaces
    : null;

  // DELIVERY STATUS -> "PRONTO", "LANÇAMENTO"
  const deliveryStatus = resolvedParams?.deliveryStatus
    ? resolvedParams?.deliveryStatus
    : null;

  // DELIVERY STATUS -> "PRONTO", "LANÇAMENTO"
  const sortOption: SortOptions = resolvedParams?.sortOption
    ? resolvedParams?.sortOption
    : "date_desc";

  // SETS ALL FILTER OPTIONS
  const selectedFilters: SelectedFilters = {
    typologies,
    amenities,
    bedrooms,
    bathrooms,
    parkingSpaces,
    deliveryStatus,
    sortOption,
  };

  // FETCHES FILTERED PROPERTIES
  const properties = await getFilteredProperties(selectedFilters);

  // FILTER VALUES TO POPULATE UI
  const availableFilters = await getPropertyFilterValues();

  return (
    <SearchPropertyProvider
      properties={properties}
      availableFilters={availableFilters}
      initialFilters={selectedFilters}
    >
      <div className="min-h-screen bg-background">
        <main>
          <SearchHeader />
          <MobileFiltersDrawer />
          <div className="w-11/12 mx-auto px-6 py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center md:items-start">
              <aside className="hidden w-full xl:block lg:w-[320px] shrink-0">
                <SearchFilters />
              </aside>
              <div className="w-full sm:w-[80%] md:w-full">
                {properties.length > 0 ? (
                  <SearchResults />
                ) : (
                  <div>
                    <h1>tem nada aqui não uai</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SearchPropertyProvider>
  );
}
