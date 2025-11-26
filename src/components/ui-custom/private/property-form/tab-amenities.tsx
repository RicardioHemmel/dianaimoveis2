"use client";

//Next | React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

// Lists
import { PROPERTY_AMENITIES } from "@/lib/constants/properties/property-amenities";

// Shadcnui
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

// lucide-react
import {
  Sparkles,
  SearchIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

const DRAFT_STORAGE_KEY = "property_draft";

export default function TabAmenities() {
  const [propertyType, setPropertyType] = useState<string>("apartamento");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const {
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      tipo: "apartamento",
      status: "disponivel",
    },
  });

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
          <div className="grid grid-cols-3 gap-4 items-center my-5">
            <h3 className="text-lg font-semibold text-foreground">
              Selecione as Comodidades
            </h3>
            <Button variant={"outline"}>Limpar</Button>
            <InputGroup>
              <InputGroupInput placeholder="Buscar comodidade..." />
              <InputGroupAddon>
                <SearchIcon className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {PROPERTY_AMENITIES.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer ${
                  selectedAmenities.includes(amenity)
                    ? "border-[var(--bg-selected)] bg-selected-btn text-primary-foreground"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {amenity}
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
