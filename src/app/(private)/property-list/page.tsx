import { PropertyCardHorizontal } from "@/components/custom/HorizontalPropertyCard";
import { getProperties } from "@/lib/services/properties/properties";

export default async function PropertiesListPage() {
  const properties = await getProperties();

  return (
    <>
      {properties.length > 0 &&
        properties.map((property) => (
          <PropertyCardHorizontal property={property} key={property._id} />
        ))}
    </>
  );

  // <>
  //   <div>
  //     {" "}
  //     <h1 className="text-4xl text-green-500">
  //       {property.propertyType?.name ?? "propertyType"}
  //     </h1>
  //   </div>
  //   <div>
  //     {" "}
  //     <h1 className="text-4xl text-green-500">
  //       {property.propertyPurpose?.name ?? "propertyPurpose"}
  //     </h1>
  //   </div>
  //   <div>
  //     {" "}
  //     <h1 className="text-4xl text-green-500">
  //       {property.propertyStanding?.name ?? "propertyStanding"}
  //     </h1>
  //   </div>
  //   <div>
  //     {" "}
  //     <h1 className="text-4xl text-green-500">
  //       {property.propertyStatus?.name ?? "propertyStatus"}
  //     </h1>
  //   </div>
  //   <div>
  //     {" "}
  //     <h1 className="text-4xl text-green-500">
  //       {property.propertyTypology?.name ?? "propertyTypology"}
  //     </h1>
  //     {property.propertyAmenities ? (
  //       property.propertyAmenities.map((amenity) => (
  //         <h1 className="text-4xl text-green-500">{amenity.name}</h1>
  //       ))
  //     ) : (
  //       <h1 className="text-4xl text-green-500">propertyAmenities</h1>
  //     )}
  //   </div>
  // </>
}
