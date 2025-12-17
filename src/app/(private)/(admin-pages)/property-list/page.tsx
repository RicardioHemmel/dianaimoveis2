import { PropertyCardHorizontal } from "@/components/ui-custom/private/horizontalPropertyCard";
import { getAllProperties } from "@/lib/api/properties/property/fetch-properties";
import { notFound } from "next/navigation";

export default async function PropertiesListPage() {
  const properties = await getAllProperties();

  if (!properties) {
    notFound();
  }

  return properties.map((property) => (
    <PropertyCardHorizontal property={property} key={property._id} />
  ));
}
