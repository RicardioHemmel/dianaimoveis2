// React | Next
import { useForm } from "react-hook-form";

// Hooks
import { useAmenities } from "@/hooks/properties/use-property-amenities";
import { useStatus } from "@/hooks/properties/use-property-status";
import { usePurposes } from "@/hooks/properties/use-property-purposes";
import { useStandings } from "@/hooks/properties/use-property-standings";
import { useTypologies } from "@/hooks/properties/use-property-typologies";

// Form control
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PropertySchema,
  PropertyFormData,
} from "@/lib/schemas/property/property.schema";

export default function usePropertyCreateForm() {
  const amenitiesList = useAmenities();
  const propertyPurposes = usePurposes();
  const propertyStatus = useStatus();
  const propertyStandings = useStandings();
  const propertyTypologies = useTypologies();

  // Form manager
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      title: "",
      description: "",

      propertyTypeSlug: "apartamento",
      propertyStatusId: "",
      propertyPurposeId: "",
      propertyStandingId: "",
      propertyTypologyId: "",
      propertyAmenitiesId: [],

      address: {
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },

      videoUrl: "",


      propertyGallery: [],

      isFurnished: false,
      isPetFriendly: false,
      isNearSubway: false,
      showSquareMeterPrice: false,
    },
  });

  async function onSubmit() {
    const data = form.getValues();

    console.log(data);
    const res = await fetch("/api/properties/property/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
  }

  return {
    form,
    onSubmit,
    amenitiesList: amenitiesList.data,
    propertyPurposes: propertyPurposes.data,
    propertyStatus: propertyStatus.data,
    propertyStandings: propertyStandings.data,
    propertyTypologies: propertyTypologies.data,
  };
}
