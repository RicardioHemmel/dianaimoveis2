import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { VerticalCardCarouselListing } from "@/components/custom/property-cards/listing/VerticalCardCarouselListing";

export function PropertyListingHighEndCarousel({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <section className="py-20 bg-muted/30 -mt-24 pt-44">
      <div className="w-[94%] 2xl:w-[80%] mx-auto">
        <div className="text-center mb-0 md:mb-6">
          <h2 className="title-section mb-3">
            Residências de Luxo e Alto Padrão
          </h2>
          <p className="subtitle-section">
            Curadoria exclusiva dos imóveis mais sofisticados nas localizações
            mais nobres de São Paulo.
          </p>
        </div>
        <div className="flex justify-center">
          <VerticalCardCarouselListing properties={properties} />
        </div>
      </div>
    </section>
  );
}
