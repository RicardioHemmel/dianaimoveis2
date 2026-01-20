"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { VerticalPropertyCard } from "@/components/custom/property-cards/VerticalPropertyCard";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyListing({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + properties.length) % properties.length,
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section mb-3">Studios para Morar ou Investir</h2>
          <p className="subtitle-section">
            Descubra os melhores studios da cidade de São Paulo
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <VerticalPropertyCard property={property} key={property._id} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
