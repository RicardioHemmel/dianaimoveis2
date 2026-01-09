"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

// FORMATTER
import { getStateName } from "@/lib/formatters/ui-formatters/brazilian-state-name";

interface PropertyHeroProps {
  title: PropertyViewSchema["title"];
  address: PropertyViewSchema["address"];
  propertyStatus: PropertyViewSchema["propertyStatus"];
  coverImage: PropertyViewSchema["coverImage"];
  gallery: PropertyViewSchema["propertyGallery"];
  typology: PropertyViewSchema["propertyTypology"];
}

export default function PropertyHero({
  title,
  address,
  propertyStatus,
  coverImage,
  gallery,
  typology,
}: PropertyHeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt="Imóvel"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/20 backdrop-blur-sm hover:bg-card/40 text-primary-foreground z-10"
        onClick={prevImage}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/20 backdrop-blur-sm hover:bg-card/40 text-primary-foreground z-10"
        onClick={nextImage}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {gallery.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentImage === index
                ? "border-secondary scale-110"
                : "border-card/50 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Expand Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-card/20 backdrop-blur-sm hover:bg-card/40 text-primary-foreground z-10"
      >
        <Expand className="h-5 w-5" />
      </Button>

      {/* Property Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="container mx-auto">
          <div className="inline-block bg-action-primary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
            <h2>{propertyStatus?.name}</h2>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-2">
            {`${title} - ${typology?.name}`}
          </h1>
          <p className="text-primary-foreground/80 text-lg">
          {`${address?.street} - ${address?.neighborhood}, ${address?.city} - ${address?.stateUf}`}
          </p>
        </div>
      </div>
    </section>
  );
}
