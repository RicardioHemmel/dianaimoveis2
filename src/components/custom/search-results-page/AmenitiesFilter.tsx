import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { FilterItem } from "./Filters";
import { Search, Sparkles, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chip } from "./SearchFilterChips";
import { PropertyDetailSchema } from "@/lib/schemas/property/property.schema";
import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useMemo, useState } from "react";

interface AmenitiesFilterProps {
  amenitiesList: PropertyDetailSchema[];
  initialLimit?: number; // Permite customizar o limite inicial via props
}

export function AmenitiesFilter({
  amenitiesList,
  initialLimit = 10,
}: AmenitiesFilterProps) {
  const { setListItem, draftFilters } = useSearchPropertyContext();
  const [amenitiesFilter, setAmenitiesFilter] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. Filtro de busca textual
  const filteredResults = useMemo(() => {
    if (!amenitiesFilter.trim()) return amenitiesList;
    const search = amenitiesFilter.toLowerCase();
    return amenitiesList.filter((a) => a.name.toLowerCase().includes(search));
  }, [amenitiesFilter, amenitiesList]);

  // 2. Lógica de exibição com limite
  const visibleAmenities = useMemo(() => {
    // Se o usuário está digitando, mostramos tudo que combina com a busca
    if (amenitiesFilter.trim()) return filteredResults;
    // Se expandido, mostra tudo. Se não, corta no limite inicial.
    return isExpanded
      ? filteredResults
      : filteredResults.slice(0, initialLimit);
  }, [filteredResults, isExpanded, amenitiesFilter, initialLimit]);

  const hasMore = filteredResults.length > initialLimit;

  return (
    <FilterItem Icon={Sparkles} label="Características">
      {/* INPUT DE BUSCA */}
      <div className="relative mb-4">
        <InputGroup>
          <Input
            className="border-none bg-muted/40"
            placeholder="Filtrar lazeres"
            value={amenitiesFilter}
            onChange={(e) => {
              setAmenitiesFilter(e.target.value);
              // Opcional: expandir automaticamente ao começar a digitar
              if (e.target.value) setIsExpanded(true);
            }}
          />
          <InputGroupAddon>
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* LISTA DE CHIPS */}
      <div className="flex flex-wrap gap-2 transition-all duration-300">
        {visibleAmenities.map((item) => (
          <Chip
            key={item._id}
            label={item.name}
            selected={draftFilters.amenities.includes(item._id)}
            onClick={() => setListItem("amenities", item._id)}
          />
        ))}
      </div>

      {/* BOTÃO DE ALTERNÂNCIA (MOSTRAR MAIS / MOSTRAR MENOS) */}
      {!amenitiesFilter && hasMore && (
        <div className="mt-4 pt-2 border-t border-border/50">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-bold text-action-primary hover:opacity-80 transition-opacity cursor-pointer uppercase tracking-wider"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-4" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="size-4" />
                Mostrar mais ({amenitiesList.length - initialLimit} itens
                ocultos)
              </>
            )}
          </button>
        </div>
      )}
    </FilterItem>
  );
}
