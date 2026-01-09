import { PropertyCardHorizontal } from "@/components/custom/HorizontalPropertyCard";
import { getProperties } from "@/lib/services/properties/properties";

export default async function PropertiesListPage() {
  const properties = await getProperties();

  return (
    <div className="flex flex-col gap-6">
      {properties.length > 0 &&
        properties.map((property) => (
          <PropertyCardHorizontal property={property} key={property._id} />
        ))}
    </div>
  );
}
