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
  search: string | null;
  address: string | null;
}

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
  search: null,
  address: null,
};

export interface PaginationSchema {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

interface SearchPropertyContextProps {
  properties: PropertyViewSchema[];
  availableFilters: AvailableFiltersFromDB; // DYNAMIC FILTER VALUES FROM DB
  selectedFilters: SelectedFilters; //SELECTED FILTERS BY THE USER
  draftFilters: SelectedFilters;
  hasActiveFilters: boolean; // DECIDE WHEN TO SHOW "CLEAN SEARCH" BUTTONS
  activeFiltersBadge: { label: string; key: keyof SelectedFilters }[]; // FOR UI BADGES ON HEADER
  pagination: PaginationSchema;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>; // STATE FOR USERS SELECTED FILTERS
  clearFilters: () => void; // QUERY CLEANUP
  cleanSpecificFilter: (key: keyof SelectedFilters) => void; // FULLY CLEAN ONE FILTER
  setListItem: (key: "typologies" | "amenities", id: string) => void; // CHANGE FILTER AND SEARCH
  setSingleItem: (key: keyof SelectedFilters, value: any) => void; // CHANGE FILTER AND SEARCH
  setSliderValue: (key: keyof SelectedFilters, value: number[]) => void; // CHANGE FILTER AND SEARCH
  applySpecificFilter: (key: keyof SelectedFilters, value: any) => void;
  applyFilters: (filtersToApply: SelectedFilters) => void;
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

  // WHAT'S IN THE URL/REALITY (SYNCHRONIZED WITH INITIALFILTERS)
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>(initialFilters);

  // THE DRAFT (IMMEDIATE UPDATE ON UI )
  const [draftFilters, setDraftFilters] =
    useState<SelectedFilters>(initialFilters);

  // SYNCHRONIZES STATES WHEN THE URL CHANGES
  useEffect(() => {
    setSelectedFilters(initialFilters);
    setDraftFilters(initialFilters);
    lastQueryRef.current = buildQueryParams(initialFilters);
  }, [initialFilters]);

  // CENTRALIZED FUNCTION TO APPLY FILTERS TO THE URL
  const applyFilters = (filtersToApply: SelectedFilters = draftFilters) => {
    setSelectedFilters(filtersToApply);
    const query = buildQueryParams(filtersToApply);

    // IF THE QUERY IF DIFFERENT FROM THE PREVIOUS ONE UPDATES IT
    if (query !== lastQueryRef.current) {
      lastQueryRef.current = query;
      replace(`${pathName}?${query}`, { scroll: false });
    }
  };

  // DECIDES TO UPDATE FILTER IMMEDIATELY OR WHEN CLICKED ON A BUTTON
  const updateDraft = (newFilters: SelectedFilters) => {
    setDraftFilters(newFilters);

    // ON DESKTOP, THE USER'S "WILL" IS REFLECTED IN THE URL INSTANTLY
    const isDesktop =
      typeof window !== "undefined" ? window.innerWidth > 1280 : false;
    if (isDesktop) {
      applyFilters(newFilters);
    }
  };

  // --------------------------- FILTERS UPDATE ------------------------------

  // FOR LISTS "TYPOLOGIES" | "AMENITIES"
  const setListItem = (key: "typologies" | "amenities", id: string) => {
    const current = draftFilters[key];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    updateDraft({ ...draftFilters, [key]: updated });
  };

  // SINGLE VALUES "BEDROOMS", "SUITES"
  const setSingleItem = (key: keyof SelectedFilters, value: any) => {
    const newValue = draftFilters[key] === value ? null : value;
    updateDraft({ ...draftFilters, [key]: newValue });
  };

  // SLIDER VALUES
  const setSliderValue = (key: keyof SelectedFilters, value: number[]) => {
    updateDraft({ ...draftFilters, [key]: { min: value[0], max: value[1] } });
  };

  // CLEAN ALL FILTERS
  function clearFilters() {
    setSelectedFilters(defaultSelectedFilters);
    replace("/properties");
  }

  // CLEAN SPECIFIC FILTER
  const cleanSpecificFilter = (key: keyof SelectedFilters) => {
    const resetValue = key === "typologies" || key === "amenities" ? [] : null;
    const updated = { ...draftFilters, [key]: resetValue };
    setDraftFilters(updated);
    applyFilters(updated);
  };

  // WE CREATED A SPECIFIC FUNCTION FOR "IMMEDIATE EXECUTION" CASES (LIKE SORT)
  const applySpecificFilter = (key: keyof SelectedFilters, value: any) => {
    const newValue = draftFilters[key] === value ? null : value;
    const updated = { ...draftFilters, [key]: newValue };

    setDraftFilters(updated);
    applyFilters(updated);
  };
  //-------------------------- MOUNTS THE URL FILTER QUERY ------------------------------

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

    // TEXT FILTER
    if (filters.search) {
      params.set("search", String(filters.search));
    }

    // ADDRESS FILTER
    if (filters.address) {
      params.set("address", String(filters.address));
    }

    // RETURNS FILTERED URL
    return params.toString();
  }

  // FETCH DATA WHEN ANY FILTER CHANGES
  useEffect(() => {
    const query = buildQueryParams(selectedFilters);
    const isDesktop =
      typeof window !== "undefined" ? window.innerWidth > 1280 : false;
    if (query !== lastQueryRef.current && isDesktop) {
      lastQueryRef.current = query;
      replace(`${pathName}?${query}`, { scroll: false });
    }
  }, [selectedFilters]);

  // DECIDES WHEN TO SHOW "CLEAN" BUTTONS
  const hasActiveFilters =
    selectedFilters.typologies.length > 0 ||
    selectedFilters.amenities.length > 0 ||
    selectedFilters.bedrooms !== null ||
    selectedFilters.bathrooms !== null ||
    selectedFilters.parkingSpaces !== null ||
    selectedFilters.deliveryStatus !== null ||
    selectedFilters.areaRange !== null ||
    selectedFilters.priceRange !== null ||
    (selectedFilters.search !== null && selectedFilters.search.trim() !== "") ||
    (selectedFilters.address !== null && selectedFilters.address.trim() !== "");

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

    if (selectedFilters.search && selectedFilters.search.trim() !== "") {
      active.push({
        label: `Busca: ${selectedFilters.search}`,
        key: "search",
      });
    }

    if (selectedFilters.address && selectedFilters.address.trim() !== "") {
      active.push({
        label: `Endereço: ${selectedFilters.address}`,
        key: "address",
      });
    }

    setActiveFiltersBadge(active);
  }

  // UPDATES FILTER BADGES WHEN A FILTER CHANGES
  useEffect(() => {
    getActiveFilters(selectedFilters);
  }, [selectedFilters]);

  //------------- CONTEXT VALUES ------------------
  const value = {
    availableFilters,
    selectedFilters,
    draftFilters,
    hasActiveFilters,
    properties,
    activeFiltersBadge,
    pagination,
    setSelectedFilters,
    clearFilters,
    setListItem,
    setSingleItem,
    setSliderValue,
    cleanSpecificFilter,
    applySpecificFilter,
    applyFilters,
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
