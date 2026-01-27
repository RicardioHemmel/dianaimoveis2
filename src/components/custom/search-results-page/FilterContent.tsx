"use client";

import {
  Home,
  Bed,
  Maximize,
  Car,
  Bath,
  Calendar,
  Search,
  MapPin,
} from "lucide-react";

import {
  Chip,
  NumberChip,
} from "@/components/custom/search-results-page/SearchFilterChips";
import {
  FilterItem,
  FilterGroup,
} from "@/components/custom/search-results-page/Filters";
import { SliderFilter } from "@/components/custom/search-results-page/SliderFilter";
import { AmenitiesFilter } from "@/components/custom/search-results-page/AmenitiesFilter";
import { SearchFilter } from "@/components/custom/search-results-page/TextSearchFilter";
import { NeighborhoodFilter } from "@/components/custom/search-results-page/AddressFilter";
import {
  DELIVERY_STATUS_OPTIONS,
  DETAILS_QTY_OPTIONS,
  useSearchPropertyContext,
} from "@/context/SearchPropertyContext";

export function FiltersContent() {
  const { availableFilters, selectedFilters, setListItem, setSingleItem } =
    useSearchPropertyContext();

  const { amenities, typologies, areaRange, priceRange } = availableFilters;

  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      <FilterGroup id="typologies" title="O que você procura?">
        {/* CONSTRUTORA */}
        <FilterItem Icon={Search} label="Empreendimento / Construtora">
          <div className="flex flex-wrap gap-2">
            <SearchFilter />
          </div>
        </FilterItem>

        {/* BAIRRO */}
        <FilterItem Icon={MapPin} label="Bairro">
          <div className="flex flex-wrap gap-2">
            <NeighborhoodFilter />
          </div>
        </FilterItem>

        {/* TIPOLOGIAS */}
        <FilterItem Icon={Home} label="Tipologias">
          <div className="flex flex-wrap gap-2">
            {typologies.map((item) => (
              <Chip
                key={item._id}
                label={item.name}
                selected={selectedFilters.typologies.includes(item._id)}
                onClick={() => setListItem("typologies", item._id)}
              />
            ))}
          </div>
        </FilterItem>
      </FilterGroup>

      {/* DETALHES */}
      <FilterGroup id="details" title="Características do Imóvel">
        <div className="flex flex-col gap-y-9">
          <FilterItem Icon={Bed} label="Quartos">
            <div className="flex gap-2">
              {DETAILS_QTY_OPTIONS.map((opt) => (
                <NumberChip
                  key={opt}
                  value={opt}
                  selected={selectedFilters.bedrooms === opt}
                  onClick={() => setSingleItem("bedrooms", opt)}
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
                  onClick={() => setSingleItem("bathrooms", opt)}
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
                  onClick={() => setSingleItem("parkingSpaces", opt)}
                />
              ))}
            </div>
          </FilterItem>
        </div>

        {/* AREA */}
        <SliderFilter
          Icon={Maximize}
          filterKey="areaRange"
          label="Área (m²)"
          inputLimits={areaRange}
          filterRange={selectedFilters.areaRange}
          key={`areaRange-${selectedFilters.areaRange?.min}-${selectedFilters.areaRange?.max}`}
        />
      </FilterGroup>

      {/* VALORES E STATUS */}
      <FilterGroup id="values" title="Valores e Status">
        <SliderFilter
          Icon={Maximize}
          filterKey="priceRange"
          label="Faixa de Preço"
          inputLimits={priceRange}
          filterRange={selectedFilters.priceRange}
          key={`priceRange-${selectedFilters.priceRange?.min}-${selectedFilters.priceRange?.max}`}
        />

        <FilterItem Icon={Calendar} label="Status do Imóvel">
          <div className="flex flex-wrap gap-2">
            {DELIVERY_STATUS_OPTIONS.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={selectedFilters.deliveryStatus === item}
                onClick={() => setSingleItem("deliveryStatus", item)}
              />
            ))}
          </div>
        </FilterItem>
      </FilterGroup>

      {/* AMENITIES */}
      <FilterGroup id="amenities" title="Lazeres">
        <AmenitiesFilter amenitiesList={amenities} />
      </FilterGroup>
    </div>
  );
}
