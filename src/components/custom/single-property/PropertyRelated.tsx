"use client";

import { Button } from "@/components/ui/button";
import { BorderLessPropertyCard } from "@/components/custom/property-cards/BorderLessPropertyCard";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyRelated({
  relatedProperties,
}: {
  relatedProperties: PropertyViewSchema[];
}) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Imóveis Similares</h2>
          <p className="subtitle-section">
            Outros empreendimentos que podem te interessar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProperties.map((property) => (
            <BorderLessPropertyCard property={property} key={property._id} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="gold" size="lg">
            Ver Todos os Imóveis
          </Button>
        </div>
      </div>
    </section>
  );
}
