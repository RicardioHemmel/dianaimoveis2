import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { BorderLessCardsGridListing } from "@/components/custom/property-cards/listing/BorderLessCardGridListing";

export function PropertyListingGrid({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section mb-3">Descubra seu novo lar</h2>
          <p className="subtitle-section">
            Apartamentos cuidadosamente selecionados para você
          </p>
        </div>

        {/* PROPERTY CAROUSEL */}
        <div className="w-full 2xl:w-[80%] mx-auto">
          <BorderLessCardsGridListing initialData={properties} />
        </div>
      </div>
    </section>
  );
}
