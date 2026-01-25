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

// SEARCH PARAM VALUES
interface SearchResultsPageProps {
  searchParams: Promise<{
    typologies?: string;
    amenities?: string;
    bedrooms?: DetailsQty;
    bathrooms?: DetailsQty;
    parkingSpaces?: DetailsQty;
    deliveryStatus?: DeliveryStatus;
    sortOption?: SortOptions;
    page?: string;
    areaMin?: string;
    areaMax?: string;
    priceMin?: string;
    priceMax?: string;
    search?: string;
    neighborhood?: string;
  }>;
}
export default async function SearchResultsPage({
  searchParams,
}: SearchResultsPageProps) {
  // FILTER VALUES TO POPULATE UI
  const availableFilters = await getPropertyFilterValues();

  // AWAIT THE URL PARAMS
  const resolvedParams = await searchParams;

  //----------- TRANSFORMS PARAMETERS FROM URL INTO ARRAYS FOR DB QUERY --------

  //---------- TYPOLOGIES
  const typologies = resolvedParams?.typologies
    ? resolvedParams.typologies.split(",")
    : [];

  //---------- AMENITIES
  const amenities = resolvedParams?.amenities
    ? resolvedParams.amenities.split(",")
    : [];

  //---------- BEDROOMS -> "0", "1" , "2"
  const bedrooms = resolvedParams?.bedrooms ? resolvedParams?.bedrooms : null;

  //---------- BATHROOMS -> "0", "1" , "2"
  const bathrooms = resolvedParams?.bathrooms
    ? resolvedParams?.bathrooms
    : null;

  //---------- PARKING SPACES -> "0", "1" , "2"
  const parkingSpaces = resolvedParams?.parkingSpaces
    ? resolvedParams?.parkingSpaces
    : null;

  //---------- DELIVERY STATUS -> "PRONTO", "LANÇAMENTO"
  const deliveryStatus = resolvedParams?.deliveryStatus
    ? resolvedParams?.deliveryStatus
    : null;

  //---------- DELIVERY STATUS -> "PRONTO", "LANÇAMENTO"
  const sortOption = resolvedParams?.sortOption
    ? resolvedParams?.sortOption
    : null;

  //---------- DELIVERY STATUS -> "PRONTO", "LANÇAMENTO"
  const page = resolvedParams?.page ? Number(resolvedParams?.page) : 1;

  //---------- AREA RANGE
  const areaMin = resolvedParams?.areaMin
    ? Number(resolvedParams?.areaMin)
    : null;

  const areaMax = resolvedParams?.areaMax
    ? Number(resolvedParams?.areaMax)
    : null;

  const areaRange =
    areaMin !== null && areaMax !== null
      ? { min: areaMin, max: areaMax }
      : null;

  //------- PRICE RANGE
  const priceMin = resolvedParams?.priceMin
    ? Number(resolvedParams?.priceMin)
    : null;

  const priceMax = resolvedParams?.priceMax
    ? Number(resolvedParams?.priceMax)
    : null;

  const priceRange =
    priceMin !== null && priceMax !== null
      ? { min: priceMin, max: priceMax }
      : null;

  // --------- PROPERTY TITLE | CONSTRUCTION COMPANY
  const search = resolvedParams.search ? resolvedParams.search : null;

  // --------- NEIGHBORHOOD FILTER
  const neighborhood = resolvedParams.neighborhood
    ? resolvedParams.neighborhood
    : null;

  // SETS ALL FILTER OPTIONS
  const selectedFilters: SelectedFilters = {
    typologies,
    amenities,
    bedrooms,
    bathrooms,
    parkingSpaces,
    deliveryStatus,
    sortOption,
    areaRange,
    priceRange,
    search,
    neighborhood,
  };

  // FETCHES FILTERED PROPERTIES WITH PAGINATION
  const res = await getFilteredProperties(selectedFilters, {
    page: page,
    limit: 9,
  });

  // FILTERED PROPERTIES
  const properties = res.properties;

  // PAGINATION
  const pagination = res.pagination;

  return (
    <SearchPropertyProvider
      properties={properties}
      availableFilters={availableFilters}
      initialFilters={selectedFilters}
      pagination={pagination}
    >
      <div className="min-h-screen bg-background">
        <main>
          <SearchHeader />
          <MobileFiltersDrawer />
          <div className="w-11/12 mx-auto px-6 py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center md:items-stretch">
              <aside className="hidden w-full xl:block lg:w-[320px] shrink-0">
                <SearchFilters />
              </aside>
              <div className="w-full sm:w-[80%] md:w-full">
                <SearchResults />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SearchPropertyProvider>
  );
}
