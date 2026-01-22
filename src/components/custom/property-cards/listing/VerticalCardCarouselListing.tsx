"use client";

import { VerticalPropertyCard } from "@/components/custom/property-cards/VerticalPropertyCard";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function VerticalCardCarouselListing({
  properties,
}: {
  properties: PropertyViewSchema[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // GIVES CAROUSEL ITS MECHANICS

  useEffect(() => {
    if (!carouselApi) return;
  }, [carouselApi]);

  return (
    <Carousel
      setApi={setCarouselApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem
            key={property._id}
            className="basis-full sm:basis-1/2 xl:basis-1/3"
          >
            <div className="p-1">
              <Card>
                <CardContent className="p-0">
                  <VerticalPropertyCard
                    property={property}
                    key={property._id}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* NAVIGATION */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <CarouselPrevious
          icon="chevron"
          iconSize={25}
          className="static rounded-full border text-black p-5 bg-gray-100 hover:bg-gray-200 border-border"
        />
        <CarouselNext
          icon="chevron"
          iconSize={25}
          className="static rounded-full border text-black p-5 bg-gray-100 hover:bg-gray-200 border-border"
        />
      </div>
    </Carousel>
  );
}
