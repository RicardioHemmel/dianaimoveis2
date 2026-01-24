"use client";

// ICONS
import {
  Home,
  Bed,
  DollarSign,
  Maximize,
  Sparkles,
  Car,
  Bath,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";

// COMPONENTS
import { Slider } from "@/components/ui/slider";
import {
  Chip,
  NumberChip,
} from "@/components/custom/search-results-page/SearchFilterChips";
import {
  FilterItem,
  FilterGroup,
} from "@/components/custom/search-results-page/Filters";
import { SliderFilter } from "@/components/custom/search-results-page/SliderFilter";

// CONTEXT
import {
  DELIVERY_STATUS_OPTIONS,
  DETAILS_QTY_OPTIONS,
  useSearchPropertyContext,
} from "@/context/SearchPropertyContext";

// FORMATTERS
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";

export function SearchFilters() {
  // SEARCH CONTEXT
  const {
    availableFilters,
    selectedFilters,
    clearFilters,
    hasActiveFilters,
    toggleListItem,
    toggleSingleItem,
  } = useSearchPropertyContext();

  // FILTER VALUES FROM DB
  const { amenities, typologies, areaRange, priceRange } = availableFilters;

  return (
    <div className="rounded-2xl border border-border/30 shadow-lg sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden flex flex-col">
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
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/*  TYPOLOGIES  */}
        <FilterGroup id="typologies" title="O que você procura?">
          <FilterItem Icon={Home} label="Tipologias">
            <div className="flex flex-wrap gap-2">
              {typologies.map((item) => (
                <Chip
                  key={item._id}
                  label={item.name}
                  selected={selectedFilters.typologies.includes(item._id)}
                  onClick={() => toggleListItem("typologies", item._id)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>

        {/* PROPERTY DETAILS */}
        <FilterGroup id="details" title="Características do Imóvel">
          <div className="flex flex-col gap-y-9">
            <FilterItem Icon={Bed} label="Quartos">
              <div className="flex gap-2">
                {DETAILS_QTY_OPTIONS.map((opt) => (
                  <NumberChip
                    key={opt}
                    value={opt}
                    selected={selectedFilters.bedrooms === opt}
                    onClick={() => toggleSingleItem("bedrooms", opt)}
                  />
                ))}
              </div>
            </FilterItem>

            <FilterItem Icon={Bath} label="Banheiros">
              <div className="flex gap-2">
                {DETAILS_QTY_OPTIONS.map((opt) => (
                  <NumberChip
                    key={opt}
                    value={opt}
                    selected={selectedFilters.bathrooms === opt}
                    onClick={() => toggleSingleItem("bathrooms", opt)}
                  />
                ))}
              </div>
            </FilterItem>

            <FilterItem Icon={Car} label="Vagas">
              <div className="flex gap-2">
                {DETAILS_QTY_OPTIONS.map((opt) => (
                  <NumberChip
                    key={opt}
                    value={opt}
                    selected={selectedFilters.parkingSpaces === opt}
                    onClick={() => toggleSingleItem("parkingSpaces", opt)}
                  />
                ))}
              </div>
            </FilterItem>
          </div>

          {/* AREA FILTER */}
          <SliderFilter
            Icon={Maximize}
            filterKey="areaRange"
            label="Área (m²)"
            inputLimits={areaRange}
            filterRange={selectedFilters.areaRange}
            key={`areaRange-${selectedFilters.areaRange?.min ?? "min"}-${selectedFilters.areaRange?.max ?? "max"}`}
          />
        </FilterGroup>

        <FilterGroup id="values" title="Valores e Status">
          {/* PRICE FILTER */}
          <SliderFilter
            Icon={Maximize}
            filterKey="priceRange"
            label="Faixa de Preço"
            inputLimits={priceRange}
            filterRange={selectedFilters.priceRange}
            key={`priceRange-${selectedFilters.priceRange?.min ?? "min"}-${selectedFilters.priceRange?.max ?? "max"}`}
          />

          <FilterItem Icon={Calendar} label="Status do Imóvel">
            <div className="flex flex-wrap gap-2">
              {DELIVERY_STATUS_OPTIONS.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={selectedFilters.deliveryStatus === item}
                  onClick={() => toggleSingleItem("deliveryStatus", item)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>

        {/* AMENITIES */}
        <FilterGroup id="amenities" title="Lazeres">
          <FilterItem Icon={Sparkles} label="Características">
            <div className="flex flex-wrap gap-2">
              {amenities.map((item) => (
                <Chip
                  key={item._id}
                  label={item.name}
                  selected={selectedFilters.amenities.includes(item._id)}
                  onClick={() => toggleListItem("amenities", item._id)}
                />
              ))}
            </div>
          </FilterItem>
        </FilterGroup>
      </div>
    </div>
  );
}
