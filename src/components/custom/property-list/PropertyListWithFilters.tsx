"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Building2,
  MapPin,
  Loader2,
  X,
  ListFilter,
  BrushCleaning,
  CalendarClock,
  Search,
  Star,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNeighborhoodInput } from "@/hooks/use-neighborhood-input";
import {
  UsePropertyFilter,
  type SortOptions,
} from "@/hooks/properties/use-property-filter";
import type { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import type { DeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";
import { Label } from "@/components/ui/label";

type StatusFilter = "all" | "DRAFT" | "PUBLISHED";
type FeaturedFilter = "all" | "featured" | "not-featured";
type DeliveryFilter = "all" | DeliveryStatus;
type SortFilter = SortOptions;

type PropertyListWithFiltersProps = {
  standings: PropertyDetailSchema[];
  typologies: PropertyDetailSchema[];
  resultCountSlot: ReactNode;
  listSlot: ReactNode;
};

export function PropertyListWithFilters({
  standings,
  typologies,
  resultCountSlot,
  listSlot,
}: PropertyListWithFiltersProps) {
  const { filters, setFilter, clearFilters } = UsePropertyFilter();
  const titleFilter = filters.title ?? "";
  const neighborhoodFilter = filters.neighborhood ?? "";
  const standingFilter = filters.standing[0] ?? "all";
  const typologyFilter = filters.typology ?? "all";
  const statusFilter: StatusFilter = filters.status ?? "all";
  const featuredFilter: FeaturedFilter =
    filters.featured === null
      ? "all"
      : filters.featured
        ? "featured"
        : "not-featured";
  const deliveryFilter: DeliveryFilter = filters.deliveryStatus ?? "all";
  const sortFilter: SortFilter = filters.sortOption ?? "date_desc";
  const [titleDraft, setTitleDraft] = useState(titleFilter);

  const {
    neighborhoods,
    query: neighborhoodQuery,
    setQuery: setNeighborhoodQuery,
    loading: neighborhoodsLoading,
  } = useNeighborhoodInput((value) =>
    setFilter("neighborhood", value ? value : null),
  );

  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);
  const [delayedLoading, setDelayedLoading] = useState(false);
  const neighborhoodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitleDraft(titleFilter);
  }, [titleFilter]);

  useEffect(() => {
    const normalized = titleDraft.trim();
    const nextValue = normalized ? normalized : null;

    if (nextValue === filters.title) return;

    const timer = setTimeout(() => {
      setFilter("title", nextValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.title, setFilter, titleDraft]);

  useEffect(() => {
    setNeighborhoodQuery(neighborhoodFilter);
  }, [neighborhoodFilter, setNeighborhoodQuery]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (neighborhoodsLoading) {
      timer = setTimeout(() => {
        setDelayedLoading(true);
      }, 800);
    } else {
      setDelayedLoading(false);
    }
    return () => clearTimeout(timer);
  }, [neighborhoodsLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        neighborhoodRef.current &&
        !neighborhoodRef.current.contains(event.target as Node)
      ) {
        setIsNeighborhoodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNeighborhoodSelect = (name: string) => {
    setNeighborhoodQuery(name);
    setFilter("neighborhood", name);
    setIsNeighborhoodOpen(false);
  };

  const clearNeighborhood = () => {
    setNeighborhoodQuery("");
    setFilter("neighborhood", null);
    setIsNeighborhoodOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();
    setTitleDraft("");
    setNeighborhoodQuery("");
    setIsNeighborhoodOpen(false);
  };

  const hasActiveFilters =
    titleDraft.trim() ||
    neighborhoodFilter.trim() ||
    standingFilter !== "all" ||
    typologyFilter !== "all" ||
    statusFilter !== "all" ||
    featuredFilter !== "all" ||
    deliveryFilter !== "all" ||
    filters.sortOption !== null;

  return (
    <div className="space-y-6">
      {/* MAIN FILTER CARD  */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        {/* HEADER - TITLE + RESULT COUNTER + CLEAR BUTTON */}
        <div className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-admin-primary text-white">
              <ListFilter className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-none tracking-tight">
                Filtros
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Refine sua busca
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* PROPERTY QTY */}
            {resultCountSlot}

            {/* SORTING FILTER */}
            <Select
              value={sortFilter}
              onValueChange={(value) =>
                setFilter("sortOption", value as SortOptions)
              }
            >
              <SelectTrigger variant={"gray"}>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Mais recentes</SelectItem>
                <SelectItem value="date_asc">Mais antigos</SelectItem>
                <SelectItem value="price_asc">Menor preço</SelectItem>
                <SelectItem value="price_desc">Maior preço</SelectItem>
                <SelectItem value="area_asc">Menor área</SelectItem>
                <SelectItem value="area_desc">Maior área</SelectItem>
                <SelectItem value="launch">Lançamentos</SelectItem>
                <SelectItem value="ready">Prontos</SelectItem>
              </SelectContent>
            </Select>

            {/* CLEAR FILTERS BUTTON */}
            <Button
              onClick={handleClearFilters}
              variant={"outline"}
              disabled={!hasActiveFilters}
            >
              <BrushCleaning className="size-4" />
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* INPUT GRID */}
        <div className="grid gap-6 p-5 md:grid-cols-2 lg:grid-cols-3">
          {/* TITLE */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">
              Nome do Imóvel
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                variant={"gray"}
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* NEIGHBORHOOD WITH AUTOCOMPLETE */}
          <div className="space-y-2 relative" ref={neighborhoodRef}>
            <Label className="text-xs font-medium uppercase">Bairro</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite o bairro..."
                variant={"gray"}
                value={neighborhoodQuery}
                onChange={(e) => {
                  setNeighborhoodQuery(e.target.value);
                  if (e.target.value.length >= 2) setIsNeighborhoodOpen(true);
                  else setIsNeighborhoodOpen(false);
                }}
                onFocus={() => {
                  if (neighborhoodQuery.length >= 3)
                    setIsNeighborhoodOpen(true);
                }}
                className="pl-9 pr-8"
              />
              {neighborhoodQuery && (
                <button
                  type="button"
                  onClick={clearNeighborhood}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* NEIGHBORHOOD DROPDOWN */}
            {isNeighborhoodOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95">
                <div className="p-1">
                  {neighborhoods.length > 0 && (
                    <div className={neighborhoodsLoading ? "opacity-50" : ""}>
                      {neighborhoods.map((n) => (
                        <button
                          key={n._id}
                          type="button"
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleNeighborhoodSelect(n.name)}
                        >
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{n.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {!neighborhoodsLoading && neighborhoods.length === 0 && (
                    <p className="px-2 py-3 text-sm text-muted-foreground text-center">
                      Nenhum bairro encontrado.
                    </p>
                  )}
                  {delayedLoading && neighborhoods.length === 0 && (
                    <div className="flex items-center justify-center p-3 text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Buscando...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* IS FEATURED */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">Destaque</Label>
            <Select
              value={featuredFilter}
              onValueChange={(value) =>
                setFilter(
                  "featured",
                  value === "all" ? null : value === "featured",
                )
              }
            >
              <div className="relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <SelectTrigger className="pl-9 w-full" variant={"gray"}>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="featured">Em destaque</SelectItem>
                <SelectItem value="not-featured">Sem destaque</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-2 lg:grid-cols-4">
          {/* STANDING */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">Porte</Label>
            <Select
              value={standingFilter}
              onValueChange={(value) =>
                setFilter("standing", value === "all" ? [] : [value])
              }
            >
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <SelectTrigger className="pl-9 w-full" variant={"gray"}>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="undefined">Sem Porte</SelectItem>
                {standings.map((standing) => (
                  <SelectItem key={standing._id} value={standing._id}>
                    {standing.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TYPOLOGY */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">Tipologia</Label>
            <Select
              value={typologyFilter}
              onValueChange={(value) =>
                setFilter("typology", value === "all" ? null : value)
              }
            >
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <SelectTrigger className="pl-9 w-full" variant={"gray"}>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {typologies.map((typology) => (
                  <SelectItem key={typology._id} value={typology._id}>
                    {typology.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* STATUS - PUBLISHED | DRAFT */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">Status</Label>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setFilter(
                  "status",
                  value === "all" ? null : (value as "DRAFT" | "PUBLISHED"),
                )
              }
            >
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <SelectTrigger className="pl-9 w-full" variant={"gray"}>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="PUBLISHED">Publicado</SelectItem>
                <SelectItem value="DRAFT">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DELIVERY STATUS */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase">Entrega</Label>
            <Select
              value={deliveryFilter}
              onValueChange={(value) =>
                setFilter(
                  "deliveryStatus",
                  value === "all" ? null : (value as DeliveryStatus),
                )
              }
            >
              <div className="relative">
                <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <SelectTrigger className="pl-9 w-full" variant={"gray"}>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
              </div>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Lançamento">Lançamento</SelectItem>
                <SelectItem value="Pronto">Pronto</SelectItem>
                <SelectItem value="Sem data">Sem data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* PROPERTY LIST */}
      {listSlot}
    </div>
  );
}
