import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { FilterItem } from "./Filters";
import { Search, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chip } from "./SearchFilterChips";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useMemo, useState } from "react";

interface AmenitiesFilterProps {
  amenitiesList: PropertyDetailSchema[];
}

export function AmenitiesFilter({ amenitiesList }: AmenitiesFilterProps) {
  // CONTEXT
  const { setListItem, selectedFilters } = useSearchPropertyContext();

  // TEXT FILTER FOR AMENITIES
  const [amenitiesFilter, setAmenitiesFilter] = useState("");

  // LIST OF FILTERED AMENITIES (ONLY RUNS WHEN "amenitiesList" OR "amenitiesFilter" changes)
  const amenitiesFilteredList = useMemo(() => {
    if (!amenitiesFilter.trim()) return amenitiesList;
    const search = amenitiesFilter.toLowerCase();
    return amenitiesList.filter((a) => a.name.toLowerCase().includes(search));
  }, [amenitiesFilter, amenitiesList]);

  return (
    <FilterItem Icon={Sparkles} label="Características">
      <div className="relative">
        <InputGroup>
          <Input
            className="border-none"
            placeholder="Filtrar lazeres"
            value={amenitiesFilter}
            onChange={(e) => setAmenitiesFilter(e.target.value)}
          />
          <InputGroupAddon>
            <Search className="size-4" />
          </InputGroupAddon>
        </InputGroup>
        {amenitiesFilter && (
          <button
            onClick={() => setAmenitiesFilter("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {amenitiesFilteredList.map((item) => (
          <Chip
            key={item._id}
            label={item.name}
            selected={selectedFilters.amenities.includes(item._id)}
            onClick={() => setListItem("amenities", item._id)}
          />
        ))}
      </div>
    </FilterItem>
  );
}
