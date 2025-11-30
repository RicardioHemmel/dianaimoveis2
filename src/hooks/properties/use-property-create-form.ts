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
  propertySchema,
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
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",

      propertyType: "apartamento",
      propertyStatus: "",
      propertyPurpose: "",
      propertyStanding: "",
      propertyTypology: "",

      street: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",

      youtubeURL: "",

      propertyAmenities: [],

      isFurnished: false,
      isPetFriendly: false,
      isNearSubway: false,
      showSquareMeterPrice: false,
    },
  });

  function onSubmit() {
    console.log(form.getValues());
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
