import { PropertyCardHorizontal } from "@/components/custom/HorizontalPropertyCard";
// import { getAllProperties } from "@/lib/actions/properties/fetch-properties";
import { notFound } from "next/navigation";

export default async function PropertiesListPage() {
  // const properties = await getAllProperties();

  // if (!properties) {
  //   notFound();
  // }

  // return properties.map((property) => (
  //   <PropertyCardHorizontal property={property} key={property._id} />
  // ));

  return <h1>listing page</h1>
}
