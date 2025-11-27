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
  const amenities = useAmenities();
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
      price: 0,

      propertyType: "apartamento",
      propertyStatus: "",
      propertyPurpose: "",

      street: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",

      area: 0,
      roomsQty: 0,
      suitesQty: 0,
      bathroomsQty: 0,
      parkingSpacesQty: 0,

      floorEnd: 0,
      floorStart: 0,

      isFurnished: true,
      isPetFriendly: true,
    },
  });

  function onSubmit() {
    console.log(form.getValues());
  }

  return {
    form,
    onSubmit,
    amenities: amenities.data,
    propertyPurposes: propertyPurposes.data,
    propertyStatus: propertyStatus.data,
    propertyStandings: propertyStandings.data,
    propertyTypologies: propertyTypologies.data,
  };
}
