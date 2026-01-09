"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
  { src: "propertyHero", alt: "Fachada do empreendimento" },
  { src: "propertyInterior", alt: "Interior do apartamento" },
  { src: "propertyPool", alt: "Área de lazer - Piscina" },
  { src: "propertyHero", alt: "Vista externa" },
  { src: "propertyInterior", alt: "Decorado" },
  { src: "propertyPool", alt: "Pôr do sol na piscina" },
];

export default function PropertyGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={"https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"}
                alt={image.alt}
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
              src={"https://dianaimoveis.com/wp-content/uploads/2024/08/20240902160736271-1.jpg.webp"}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
