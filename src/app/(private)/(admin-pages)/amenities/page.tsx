import { getAmenitiesWithLinkedProperties } from "@/lib/services/properties/property-details/property-amenities.service";

import { AmenitiesList } from "@/components/custom/amenities-page/AmentiesList";
import { CreateAmenityCard } from "@/components/custom/amenities-page/CreateAmenityCard";

export default async function AmenitiesPage() {
  const amenities = await getAmenitiesWithLinkedProperties();

  return (
    <>
      <div className="container space-y-6 mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comodidades</h1>
          <p className="text-muted-foreground">
            Gerencie as comodidades disponíveis para os imóveis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* CREATE PROPERTY CARD */}
          <CreateAmenityCard />

          {/* LIST OF AMENITIES */}
          <AmenitiesList amenities={amenities} />
        </div>
      </div>
    </>
  );
}
