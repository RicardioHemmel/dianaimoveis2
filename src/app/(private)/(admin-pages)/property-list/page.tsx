import { getAllPropertiesToView } from "@/lib/services/properties/queries/properties-query.service";
import { getStandings } from "@/lib/services/properties/property-details/property-standings.service";
import { getTypologies } from "@/lib/services/properties/property-details/property-typologies.service";
import { PropertyListWithFilters } from "@/components/custom/property-list/PropertyListWithFilters";

export default async function PropertiesListPage() {
  const [properties, standings, typologies] = await Promise.all([
    getAllPropertiesToView(),
    getStandings(),
    getTypologies(),
  ]);

  return (
    <PropertyListWithFilters
      properties={properties}
      standings={standings}
      typologies={typologies}
    />
  );
}
