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
      _id: "",
      title: "Apartamento legal 1",
      description: "Teste do apartamento 1",

      price: null,
      area: 78,
      bathroomsQty: 4,
      condominiumFee: 500,
      floorEnd: 10,
      floorStart: 5,
      parkingSpacesQty: 2,
      roomsQty: 4,
      suitesQty: 3,

      propertyTypeSlug: "apartamento",
      propertyStatusId: "69358e0c5d4b73fa0adff17b",
      propertyPurposeId: "69358e0c5d4b73fa0adff17f",
      propertyStandingId: "69358e0c5d4b73fa0adff183",
      propertyTypologyId: "69358e0c5d4b73fa0adff189",
      propertyAmenitiesId: [
        "69358e095d4b73fa0adff135",
        "69358e095d4b73fa0adff138",
        "69358e095d4b73fa0adff141",
        "69358e095d4b73fa0adff144",
      ],

      address: {
        street: "Rua da Tafinha",
        neighborhood: "Bairro da Tafinha",
        city: "São Paulo",
        state: "São Paulo",
        zipCode: "048888020",
      },

      videoUrl: "asaoifaufsahdisahfias",

      propertyGallery: [],

      isFurnished: true,
      isPetFriendly: true,
      isNearSubway: true,
      showSquareMeterPrice: true,

      userId: "6924d2341d7245e145b71fa8",
    },
  });

  async function onSubmit(data: PropertyFormData) {
    console.log(data);
  }

  async function saveDraft() {
    const data = form.getValues();
    console.log(data);

    const response = await fetch("/api/properties", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);

    if (result.success && result.draftProperty) {
      form.setValue("_id", result.draftProperty._id, {
        shouldDirty: false,
        shouldValidate: false,
      });

      if (result.draftProperty.propertyGallery) {
        form.setValue("propertyGallery", result.draftProperty.propertyGallery, {
          shouldDirty: false,
        });
      }

      console.log("Rascunho salvo com sucesso! ID:", result.draftProperty._id);
    }
  }

  return {
    form,
    onSubmit,
    saveDraft,
    amenitiesList: amenitiesList.data,
    propertyPurposes: propertyPurposes.data,
    propertyStatus: propertyStatus.data,
    propertyStandings: propertyStandings.data,
    propertyTypologies: propertyTypologies.data,
  };
}
