"use client";

//NEXT | REACT
import { useMemo, useState } from "react";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

// ICONS
import { Sparkles, SearchIcon, X } from "lucide-react";

// CONTEXT
import { usePropertyFormContext } from "@/context/PropertyFormContext";

export default function TabAmenities() {
  const { form, propertyDetails } = usePropertyFormContext();

  const amenitiesList = propertyDetails?.amenities;

  // SHOWS CONTENT BASED ON THE TYPE
  const { propertyType } = form.watch();

  // FILTER FOR THE AMENITIES SEARCH BAR
  const [amenitiesFilter, setAmenitiesFilter] = useState<string>("");

  // AMENITIES THAT WERE FOUND BY THE FILTER
  const filteredAmenities = useMemo(() => {
    return amenitiesList?.filter((amenity) =>
      amenity.name.toLowerCase().includes(amenitiesFilter.toLowerCase())
    );
  }, [amenitiesList, amenitiesFilter]);

  // USED FOR SETTING ALL AMENITIES AS SELECTED
  const allAmenitiesIds = amenitiesList?.map((a) => a._id) ?? [];

  // ADD OR REMOVE AMENITIES
  const toggleAmenity = (amenityId: string) => {
    // AMENITIES REGISTERED ON THE RHF
    const currentAmenities = form.getValues("propertyAmenities");

    if (!currentAmenities) return;

    const updatedAmenities = currentAmenities?.includes(amenityId)
      ? currentAmenities.filter((a) => a !== amenityId)
      : [...currentAmenities, amenityId];

    form.setValue("propertyAmenities", updatedAmenities);
  };

  return (
    <TabsContent value="amenities" className="space-y-4">
      {propertyType?.name === "Apartamento" || propertyType?.name === "Casa" ? (
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
                  form.setValue("propertyAmenities", allAmenitiesIds)
                }
              >
                Selecionar Todos
              </Button>

              <Button
                variant={"outline"}
                disabled={form.getValues("propertyAmenities")?.length === 0}
                onClick={() => {
                  form.setValue("propertyAmenities", []);
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
                  form.getValues("propertyAmenities")?.includes(amenity._id)
                    ? "border-nav-bg-active bg-nav-bg-active text-primary-foreground"
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
