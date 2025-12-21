import { PropertyCardHorizontal } from "@/components/private/HorizontalPropertyCard";
import { getAllProperties } from "@/lib/server-actions/properties/fetch-properties";
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
