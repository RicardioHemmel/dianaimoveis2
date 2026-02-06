import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";

export type SortOptions =
  | "date_asc"
  | "area_asc"
  | "price_asc"
  | "price_desc"
  | "date_desc"
  | "area_desc"
  | "launch"
  | "ready";

export interface Filters {
  title: string | null;
  neighborhood: string | null;
  standing: string[];
  typology: string | null;
  status: "DRAFT" | "PUBLISHED" | null;
  featured: boolean | null;
  deliveryStatus: DeliveryStatus | null;
  constructionCompany: string | null;
  sortOption: SortOptions | null;
}

const DELIVERY_STATUS_VALUES: DeliveryStatus[] = [
  "Lançamento",
  "Pronto",
  "Sem data",
];

const SORT_OPTIONS: SortOptions[] = [
  "date_asc",
  "area_asc",
  "price_asc",
  "price_desc",
  "date_desc",
  "area_desc",
  "launch",
  "ready",
];

const isStatus = (value: string | null): value is Filters["status"] =>
  value === "DRAFT" || value === "PUBLISHED";

const isDeliveryStatus = (
  value: string | null,
): value is Filters["deliveryStatus"] =>
  !!value && DELIVERY_STATUS_VALUES.includes(value as DeliveryStatus);

const isSortOption = (value: string | null): value is Filters["sortOption"] =>
  !!value && SORT_OPTIONS.includes(value as SortOptions);

const parseFilters = (params: URLSearchParams): Filters => {
  const standingParam = params.get("standing");
  const standing = standingParam
    ? standingParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const featuredParam = params.get("featured");
  const featured =
    featuredParam === null
      ? null
      : featuredParam === "true"
        ? true
        : featuredParam === "false"
          ? false
          : null;

  const statusParam = params.get("status");
  const deliveryStatusParam = params.get("deliveryStatus");
  const constructionCompanyParam = params.get("constructionCompany");
  const sortParam = params.get("sortOption");

  return {
    title: params.get("title") || null,
    neighborhood: params.get("neighborhood") || null,
    standing,
    typology: params.get("typology") || null,
    status: isStatus(statusParam) ? statusParam : null,
    featured,
    deliveryStatus: isDeliveryStatus(deliveryStatusParam)
      ? deliveryStatusParam
      : null,
    constructionCompany: constructionCompanyParam || null,
    sortOption: isSortOption(sortParam) ? sortParam : null,
  };
};

export function UsePropertyFilter() {
  const { replace } = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const buildQueryParams = useCallback((nextFilters: Filters) => {
    const params = new URLSearchParams();

    if (nextFilters.title) {
      params.set("title", String(nextFilters.title));
    }

    if (nextFilters.neighborhood) {
      params.set("neighborhood", String(nextFilters.neighborhood));
    }

    if (nextFilters.standing?.length) {
      params.set("standing", nextFilters.standing.join(","));
    }

    if (nextFilters.typology) {
      params.set("typology", String(nextFilters.typology));
    }

    if (nextFilters.status) {
      params.set("status", String(nextFilters.status));
    }

    if (nextFilters.featured !== null) {
      params.set("featured", String(nextFilters.featured));
    }

    if (nextFilters.deliveryStatus) {
      params.set("deliveryStatus", nextFilters.deliveryStatus);
    }

    if (nextFilters.constructionCompany) {
      params.set("constructionCompany", nextFilters.constructionCompany);
    }

    if (nextFilters.sortOption) {
      params.set("sortOption", nextFilters.sortOption);
    }

    return params.toString();
  }, []);

  const updateFilters = useCallback(
    (next: Filters | ((current: Filters) => Filters)) => {
      const resolved = typeof next === "function" ? next(filters) : next;
      const query = buildQueryParams(resolved);
      const nextUrl = query ? `${pathName}?${query}` : pathName;
      replace(nextUrl, { scroll: false });
    },
    [buildQueryParams, filters, pathName, replace],
  );

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      updateFilters({ ...filters, [key]: value });
    },
    [filters, updateFilters],
  );

  const clearFilters = useCallback(() => {
    replace(pathName, { scroll: false });
  }, [pathName, replace]);

  return {
    filters,
    buildQueryParams,
    updateFilters,
    setFilter,
    clearFilters,
  };
}
