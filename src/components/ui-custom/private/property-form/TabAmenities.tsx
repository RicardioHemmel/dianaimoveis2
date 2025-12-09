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

import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "@/lib/schemas/property/property.schema";
import { PropertySelectOption } from "@/lib/schemas/property/property-select-option";

interface TabAmenitiesProps {
  form: UseFormReturn<PropertyFormData>;
  amenitiesList?: PropertySelectOption[];
}

export default function TabAmenities({
  form,
  amenitiesList,
}: TabAmenitiesProps) {
  // Shows content based on the type
  const { propertyTypeSlug } = form.watch();

  // Filter for the amenities search bar
  const [amenitiesFilter, setAmenitiesFilter] = useState<string>("");

  // Amenities that were found by the filter
  const filteredAmenities = useMemo(() => {
    return amenitiesList?.filter((amenity) =>
      amenity.name.toLowerCase().includes(amenitiesFilter.toLowerCase())
    );
  }, [amenitiesList, amenitiesFilter]);

  // Used for setting all amenities as selected
  const allAmenitiesIds = amenitiesList?.map((a) => a._id) ?? [];

  // Add or Remove amenities
  const toggleAmenity = (amenity: string) => {
    // Amenities registered on the RHF
    const currentAmenities = form.getValues("propertyAmenitiesId");

    if (!currentAmenities) return;

    const updatedAmenities = currentAmenities?.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    form.setValue("propertyAmenitiesId", updatedAmenities);
  };

  return (
    <TabsContent value="amenities" className="space-y-4">
      {propertyTypeSlug === "apartamento" || propertyTypeSlug === "casa" ? (
        <div className="space-y-4">
          <div className="flex justify-between gap-4 my-5 w-full">
            <h3 className="text-lg font-semibold text-foreground">
              Selecione as Comodidades
            </h3>
            <div className="flex gap-5">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  form.setValue("propertyAmenitiesId", allAmenitiesIds)
                }
              >
                Selecionar Todos
              </Button>

              <Button
                variant={"outline"}
                disabled={form.getValues("propertyAmenitiesId")?.length === 0}
                onClick={() => {
                  form.setValue("propertyAmenitiesId", []);
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
                  form.getValues("propertyAmenitiesId")?.includes(amenity._id)
                    ? "border-[var(--bg-selected)] bg-[var(--bg-selected)] text-primary-foreground"
                    : " hover:bg-neutral-200 text-foreground"
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
