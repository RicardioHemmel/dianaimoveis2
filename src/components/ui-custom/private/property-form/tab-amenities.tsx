"use client";

//Next | React
import { useMemo, useState } from "react";

// Shadcnui
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import { Sparkles, SearchIcon, X } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

interface TabAmenitiesProps {
  amenities?: PropertySelectOption[];
}

export default function TabAmenities({ amenities }: TabAmenitiesProps) {
  // Shows content based on the type
  const [propertyType, setPropertyType] = useState<string>("apartamento");

  // Filter for the amenities search bar
  const [amenitiesFilter, setAmenitiesFilter] = useState<string>("");

  // Amenities that were found by the filter
  const filteredAmenities = useMemo(() => {
    return amenities?.filter((amenity) =>
      amenity.name.toLowerCase().includes(amenitiesFilter.toLowerCase())
    );
  }, [amenities, amenitiesFilter]);

  const allAmenitiesIds = amenities?.map((a) => a._id) ?? [];

  // Selected amenities by the user
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <TabsContent value="amenities" className="space-y-4">
      {propertyType === "apartamento" || propertyType === "casa" ? (
        <div className="space-y-4">
          <div className="flex justify-between gap-4 my-5 w-full">
            <h3 className="text-lg font-semibold text-foreground">
              Selecione as Comodidades
            </h3>
            <div className="flex gap-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedAmenities(allAmenitiesIds)}
              >
                Selecionar Todos
              </Button>

              <Button
                variant={"outline"}
                disabled={selectedAmenities.length === 0}
                onClick={() => {
                  setSelectedAmenities([]);
                }}
              >
                Limpar Seleção
              </Button>
            </div>
          </div>
          <div className="relative">
            <InputGroup>
              <InputGroupInput
                onChange={(e) => setAmenitiesFilter(e.target.value)}
                value={amenitiesFilter}
                placeholder="Buscar comodidade..."
              />
              <InputGroupAddon>
                <SearchIcon className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
            {amenitiesFilter && (
              <button
                onClick={() => setAmenitiesFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
              >
                <X />
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {filteredAmenities?.map((amenity) => (
              <button
                key={amenity._id}
                type="button"
                onClick={() => toggleAmenity(amenity._id)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer ${
                  selectedAmenities.includes(amenity._id)
                    ? "border-[var(--bg-selected)] bg-[var(--bg-selected)] text-primary-foreground"
                    : "hover:border-[var(--bg-selected-hover)] hover:bg-[var(--bg-selected-hover)] hover:text-white text-foreground"
                }`}
              >
                {amenity.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Comodidades disponíveis apenas para apartamentos e casas.</p>
        </div>
      )}
    </TabsContent>
  );
}
