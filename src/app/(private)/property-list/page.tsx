import { PropertyCardHorizontal } from "@/components/custom/HorizontalPropertyCard";
import { getProperties } from "@/lib/services/properties/properties";

export default async function PropertiesListPage() {
  const property = await getProperties();

  return (
    <>
      <div>                  <h1 className="text-4xl text-green-500">{property.propertyType?.name ?? "propertyType"}</h1>
      </div>
      <div>                  <h1 className="text-4xl text-green-500">{property.propertyPurpose?.name ?? "propertyPurpose"}</h1>
      </div>
      <div>                  <h1 className="text-4xl text-green-500">{property.propertyStanding?.name ?? "propertyStanding"}</h1>
      </div>
      <div>                  <h1 className="text-4xl text-green-500">{property.propertyStatus?.name ?? "propertyStatus"}</h1>
      </div>
      <div>                  <h1 className="text-4xl text-green-500">{property.propertyTypology?.name ?? "propertyTypology"}</h1>
      </div>
    </>
    // <PropertyCardHorizontal property={property} key={property._id}/>
  );

}
