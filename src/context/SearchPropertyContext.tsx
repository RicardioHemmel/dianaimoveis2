"use client";

// REACT | NEXT
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// SCHEMAS
import {
  PropertyDetailSchema,
  PropertyViewSchema,
} from "@/lib/schemas/property/property.schema";
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";

// PROPERTY DELIVERY STATUS FILTER
export type Range = { min: number; max: number };

// PROPERTY DETAILS QTY FILTER
export type DetailsQty = "1" | "2" | "3" | "4" | "5+";

// PROPERTY DELIVERY STATUS FILTER
export type DeliveryStatus = "Pronto" | "Lançamento";

// SORT ITEMS
export type SortOptions =
  | "date_asc"
  | "area_asc"
  | "price_asc"
  | "price_desc"
  | "date_desc"
  | "area_desc"
  | "launch"
  | "ready";

// FOR RENDERING ON UI
export const DETAILS_QTY_OPTIONS: DetailsQty[] = ["1", "2", "3", "4", "5+"];
export const DELIVERY_STATUS_OPTIONS: DeliveryStatus[] = [
  "Pronto",
  "Lançamento",
];

// FILTERS VALUES FROM DB
export interface AvailableFiltersFromDB {
  typologies: PropertyDetailSchema[];
  amenities: PropertyDetailSchema[];
  areaRange: Range;
  priceRange: Range;
}

// POSSIBLE FILTER VALUES USER CAN SELECT
export interface SelectedFilters {
  typologies: string[];
  amenities: string[];
  bedrooms: DetailsQty | null;
  bathrooms: DetailsQty | null;
  parkingSpaces: DetailsQty | null;
  deliveryStatus: DeliveryStatus | null;
  sortOption: SortOptions | null;
  areaRange: Range | null;
  priceRange: Range | null;
}

// neighborhood: string | null;

// DEFAULT VALUE FOR THE FILTERS
export const defaultSelectedFilters: SelectedFilters = {
  typologies: [],
  amenities: [],
  bedrooms: null,
  bathrooms: null,
  parkingSpaces: null,
  deliveryStatus: null,
  sortOption: null,
  areaRange: null,
  priceRange: null,
};

export interface PaginationSchema {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

// neighborhood: null,

interface SearchPropertyContextProps {
  properties: PropertyViewSchema[];
  availableFilters: AvailableFiltersFromDB; // DYNAMIC FILTER VALUES FROM DB
  selectedFilters: SelectedFilters; //SELECTED FILTERS BY THE USER
  hasActiveFilters: boolean; // DECIDE WHEN TO SHOW "CLEAN SEARCH" BUTTONS
  activeFiltersBadge: { label: string; key: keyof SelectedFilters }[]; // FOR UI BADGES ON HEADER
  pagination: PaginationSchema;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>; // STATE FOR USERS SELECTED FILTERS
  clearFilters: () => void; // QUERY CLEANUP
  cleanSpecificFilter: (key: keyof SelectedFilters) => void; // FULLY CLEAN ONE FILTER
  toggleListItem: (key: "typologies" | "amenities", id: string) => void; // CHANGE FILTER AND SEARCH
  toggleSingleItem: (key: keyof SelectedFilters, value: any) => void; // CHANGE FILTER AND SEARCH
  setSliderValue: (key: keyof SelectedFilters, value: number[]) => void; // CHANGE FILTER AND SEARCH
}

const SearchPropertyContext = createContext<SearchPropertyContextProps | null>(
  null,
);

interface ProviderProps {
  children: ReactNode;
  properties: PropertyViewSchema[];
  availableFilters: AvailableFiltersFromDB;
  initialFilters: SelectedFilters;
  pagination: PaginationSchema;
}

export function SearchPropertyProvider({
  children,
  properties,
  availableFilters,
  initialFilters,
  pagination,
}: ProviderProps) {
  // INSTANCES FOR QUERY FILTER USING URL
  const pathName = usePathname();
  const { replace } = useRouter();
  const lastQueryRef = useRef<string>(""); // USED TO COMPARE IF THERE WERE CHANGES TO UPDATE URL

  // SELECTED VALUES BY THE USER
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>(initialFilters);

  useEffect(() => {
    const isSame =
      JSON.stringify(selectedFilters) === JSON.stringify(initialFilters);

    if (!isSame) {
      setSelectedFilters(initialFilters);
    }
  }, [initialFilters]);

  // MOUNTS THE URL FILTER QUERY
  function buildQueryParams(filters: SelectedFilters): string {
    const params = new URLSearchParams();

    // TYPOLOGIES
    if (filters.typologies?.length) {
      params.set("typologies", filters.typologies.map((t) => t).join(","));
    }

    // AMENITIES
    if (filters.amenities?.length) {
      params.set("amenities", filters.amenities.map((a) => a).join(","));
    }

    // BEDROOMS
    if (filters.bedrooms) {
      params.set("bedrooms", filters.bedrooms);
    }

    // BATHROOMS
    if (filters.bathrooms) {
      params.set("bathrooms", filters.bathrooms);
    }

    // PARKING SPACES
    if (filters.parkingSpaces) {
      params.set("parkingSpaces", filters.parkingSpaces);
    }

    // DELIVERY STATUS
    if (filters.deliveryStatus) {
      params.set("deliveryStatus", filters.deliveryStatus);
    }

    // SORT
    if (filters.sortOption) {
      params.set("sortOption", filters.sortOption);
    }

    // AREA RANGE
    if (filters.areaRange) {
      params.set("areaMin", String(filters.areaRange.min));
      params.set("areaMax", String(filters.areaRange.max));
    }

    // PRICE RANGE
    if (filters.priceRange) {
      params.set("priceMin", String(filters.priceRange.min));
      params.set("priceMax", String(filters.priceRange.max));
    }

    // RETURNS FILTERED URL
    return params.toString();
  }

  // FETCH DATA WHEN ANY FILTER CHANGES
  useEffect(() => {
    const query = buildQueryParams(selectedFilters);

    // AVOID INFINITE REPLACE IF THE URL IS ALREADY THE SAME
    if (query !== lastQueryRef.current) {
      lastQueryRef.current = query;
      replace(`${pathName}?${query}`, { scroll: false });
    }
  }, [selectedFilters]);

  // CLEAN URL
  function clearFilters() {
    setSelectedFilters(defaultSelectedFilters);
    replace("/properties");
  }

  // --------------------------- FILTERS UPDATE ------------------------------

  // FOR LISTS "TYPOLOGIES" | "AMENITIES"
  const toggleListItem = (key: "typologies" | "amenities", id: string) => {
    // UPDATES THE LIST ADDING OR REMOVING THE CLICKED ITEM
    const currentList = selectedFilters[key];
    const updatedList = currentList.includes(id)
      ? currentList.filter((item) => item !== id)
      : [...currentList, id];

    setSelectedFilters({
      ...selectedFilters,
      [key]: updatedList,
    });
  };

  // SINGLE VALUES "BEDROOMS", "SUITES"
  const toggleSingleItem = (key: keyof SelectedFilters, value: any) => {
    // TOGGLE BETWEEN ADDING THE VALUE OR SETTING NULL
    const newValue = selectedFilters[key] === value ? null : value;

    setSelectedFilters({
      ...selectedFilters,
      [key]: newValue,
    });
  };

  // SLIDER VALUES
  const setSliderValue = (key: keyof SelectedFilters, value: number[]) => {
    setSelectedFilters({
      ...selectedFilters,
      [key]: { min: value[0], max: value[1] },
    });
  };

  // DECIDES WHEN TO SHOW "CLEAN" BUTTONS
  const hasActiveFilters =
    selectedFilters.typologies.length > 0 ||
    selectedFilters.amenities.length > 0 ||
    selectedFilters.bedrooms !== null ||
    selectedFilters.bathrooms !== null ||
    selectedFilters.parkingSpaces !== null ||
    selectedFilters.deliveryStatus !== null ||
    selectedFilters.areaRange !== null ||
    selectedFilters.priceRange !== null;

  //------------ MOUNTS ALL FILTER BADGES -------------
  const [activeFiltersBadge, setActiveFiltersBadge] = useState<
    { label: string; key: keyof SelectedFilters }[]
  >([]);
  function getActiveFilters(selectedFilters: SelectedFilters) {
    const active: { label: string; key: keyof SelectedFilters }[] = [];
    if (selectedFilters.typologies.length) {
      active.push({
        label: `Tipologias ${selectedFilters.typologies.length}`,
        key: "typologies",
      });
    }

    if (selectedFilters.amenities.length) {
      active.push({
        label: `Lazeres ${selectedFilters.amenities.length}`,
        key: "amenities",
      });
    }

    if (selectedFilters.bedrooms !== null) {
      active.push({
        label: `Quartos ${selectedFilters.bedrooms}`,
        key: "bedrooms",
      });
    }

    if (selectedFilters.bathrooms !== null) {
      active.push({
        label: `Banheiros ${selectedFilters.bathrooms}`,
        key: "bathrooms",
      });
    }

    if (selectedFilters.parkingSpaces !== null) {
      active.push({
        label: `Vagas ${selectedFilters.parkingSpaces}`,
        key: "parkingSpaces",
      });
    }

    if (selectedFilters.deliveryStatus !== null) {
      active.push({
        label: `${selectedFilters.deliveryStatus}`,
        key: "deliveryStatus",
      });
    }

    if (selectedFilters.areaRange !== null) {
      active.push({
        label: `Metragem: ${selectedFilters.areaRange.min} - ${selectedFilters.areaRange.max} m²`,
        key: "areaRange",
      });
    }

    if (selectedFilters.priceRange !== null) {
      active.push({
        label: `R$ ${formattedPrice(selectedFilters.priceRange.min, false, false)} - ${formattedPrice(selectedFilters.priceRange.max, false, false)}`,
        key: "priceRange",
      });
    }

    setActiveFiltersBadge(active);
  }

  // UPDATES FILTER BADGES WHEN A FILTER CHANGES
  useEffect(() => {
    getActiveFilters(selectedFilters);
  }, [selectedFilters]);

  // CLEAN SPECIFIC FILTER
  function cleanSpecificFilter(key: keyof SelectedFilters) {
    setSelectedFilters((prev) => {
      switch (key) {
        case "typologies":
        case "amenities":
          return {
            ...prev,
            [key]: [],
          };

        case "bedrooms":
        case "bathrooms":
        case "parkingSpaces":
        case "deliveryStatus":
        case "areaRange":
        case "priceRange":
          return {
            ...prev,
            [key]: null,
          };

        default:
          return prev;
      }
    });
  }

  //------------- CONTEXT VALUES ------------------
  const value = {
    availableFilters,
    selectedFilters,
    hasActiveFilters,
    properties,
    activeFiltersBadge,
    pagination,
    setSelectedFilters,
    clearFilters,
    toggleListItem,
    toggleSingleItem,
    setSliderValue,
    cleanSpecificFilter,
  };

  return (
    <SearchPropertyContext.Provider value={value}>
      {children}
    </SearchPropertyContext.Provider>
  );
}

export function useSearchPropertyContext() {
  const context = useContext(SearchPropertyContext);
  if (!context) {
    throw new Error(
      "useSearchPropertyContext deve ser usado dentro de um SearchPropertyProvider",
    );
  }
  return context;
}
