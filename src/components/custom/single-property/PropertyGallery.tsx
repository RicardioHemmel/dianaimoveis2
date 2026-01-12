"use client";

import { useState } from "react";
import { Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function PropertyGallery({
  gallery,
}: {
  gallery: PropertyViewSchema["propertyGallery"];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const MAX_VISIBLE_IMAGES = 5;

  const remainingImages = gallery.length - MAX_VISIBLE_IMAGES;
  const visibleImages = gallery.slice(0, MAX_VISIBLE_IMAGES);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Galeria</h2>
          <p className="section-subtitle">
            Explore cada detalhe do empreendimento
          </p>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] mb-10">
          {/* Main Image - spans 2 cols and 2 rows */}
          <button
            onClick={() => openLightbox(0)}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-xl group"
          >
            <img
              src={gallery[0].url}
              alt={""}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          </button>

          {/* Other images in grid */}
          {visibleImages.slice(1).map((image, index) => {
            const actualIndex = index + 1;
            const isLastVisible =
              actualIndex === MAX_VISIBLE_IMAGES - 1 && remainingImages > 0;

            return (
              <button
                key={actualIndex}
                onClick={() => openLightbox(actualIndex)}
                className="relative overflow-hidden rounded-xl group"
              >
                <img
                  src={image.url}
                  alt={""}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />

                {/* "Ver mais" overlay on last visible image */}
                {isLastVisible && (
                  <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center text-primary-foreground transition-colors duration-300 group-hover:bg-primary/70">
                    <Images className="h-8 w-8 mb-2" />
                    <span className="font-semibold text-lg">
                      +{remainingImages}
                    </span>
                    <span className="text-sm">Ver mais</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={
                  "https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"
                }
                alt={`Imagem ${index} da galeria`}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  index === 0 ? "h-[400px] md:h-[500px]" : "h-48 md:h-56"
                }`}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={
                "https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"
              }
              alt={""}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
