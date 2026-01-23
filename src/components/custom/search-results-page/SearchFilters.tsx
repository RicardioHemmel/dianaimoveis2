"use client";

// REACT | NEXT
import { useState } from "react";

// ICONS
import {
  Home,
  Bed,
  DollarSign,
  Maximize,
  Sparkles,
  X,
  Building2,
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

  const [priceRange, setPriceRange] = useState([500000, 3000000]);
  const [areaRange, setAreaRange] = useState([30, 200]);

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
              className="flex items-center gap-1 text-xs text-white rounded-2xl bg-action-primary pl-2 px-3 py-1 cursor-pointer"
            >
              <X className="size-3" />
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
              {availableFilters.typologies.map((item) => (
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

        {/* PROPERTY FEATURES */}
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

          <FilterItem Icon={Maximize} label="Área (m²)">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-muted rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-muted-foreground block">
                    Min
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {areaRange[0]}m²
                  </span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-border" />
                <div className="bg-muted rounded-lg px-2.5 py-1.5 text-right">
                  <span className="text-[10px] text-muted-foreground block">
                    Max
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {areaRange[1]}m²
                  </span>
                </div>
              </div>
              <Slider
                value={areaRange}
                onValueChange={setAreaRange}
                min={20}
                max={500}
                step={10}
                className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-2 [&_[role=slider]]:border-secondary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg [&_.relative]:bg-muted [&_.absolute]:bg-secondary"
              />
            </div>
          </FilterItem>
        </FilterGroup>

        {/* Grupo: Valores e Status */}
        <FilterGroup id="values" title="Valores e Status">
          <FilterItem Icon={DollarSign} label="Faixa de Preço">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="bg-muted rounded-lg px-2.5 py-1.5">
                  <span className="text-[10px] text-muted-foreground block">
                    Min
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {formattedPrice(priceRange[0], false)}
                  </span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-border" />
                <div className="bg-muted rounded-lg px-2.5 py-1.5 text-right">
                  <span className="text-[10px] text-muted-foreground block">
                    Max
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {formattedPrice(priceRange[1], false)}
                  </span>
                </div>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={100000}
                max={10000000}
                step={50000}
                className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-2 [&_[role=slider]]:border-secondary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:shadow-lg [&_.relative]:bg-muted [&_.absolute]:bg-secondary"
              />
            </div>
          </FilterItem>

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
              {availableFilters.amenities.map((item) => (
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
