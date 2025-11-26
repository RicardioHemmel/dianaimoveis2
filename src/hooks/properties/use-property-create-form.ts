// React | Next
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Hooks
import { useAmenities } from "@/hooks/properties/use-property-amenities";
import { useDeliveryStatus } from "@/hooks/properties/use-property-delivery-status";
import { usePurposes } from "@/hooks/properties/use-property-purposes";
import { useStandings } from "@/hooks/properties/use-property-standings";
import { useTypes } from "@/hooks/properties/use-property-types";
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

  // Form manager
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  return {
    form,
    amenities: amenities.data,
    propertyPurposes: propertyPurposes.data,
  };
}
