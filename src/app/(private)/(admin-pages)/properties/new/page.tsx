import PropertyFormWrapper from "@/components/custom/property-form/PropertyFormWrapper";
import { getAllPropertyDetails } from "@/lib/services/properties/properties-query.service";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastrar imóvel",
};

export default async function NewPropertyPage() {
  // TO POPULATE SELECTS
  const propertyDetails = await getAllPropertyDetails();

  return (
    <PropertyFormWrapper formMode="create" propertyDetails={propertyDetails} />
  );
}
