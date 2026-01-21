"use client";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// FORMATER
import { deliveryDateToDeliveryStatus } from "@/lib/formatters/ui-formatters/property-delivery-date";

// COMPONENTS
import ThumbnailsCarousel from "@/components/custom/ThumbnailsCarousel";
import FullScreenPropertyGallery from "@/components/custom/FullScreenPropertyGallery";
import { useFullScreenGallery } from "@/hooks/properties/use-full-screen-gallery";

export default function PropertyHero({
  property,
}: {
  property: PropertyViewSchema;
}) {
  // SPREAD PROPERTY
  const { title, deliveryDate, address, gallery } = property;

  // FULL SCREEN HOOK
  const {
    isModalOpen,
    currentImage,
    setCurrentImage,
    nextImage,
    prevImage,
    closeModal,
    setIsModalOpen,
  } = useFullScreenGallery(gallery);

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden select-none">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 ">
        {gallery.length > 0 ? (
          <>
            <Image
              alt="Imagem de Capa"
              src={gallery[currentImage].url}
              className="object-cover transition-all duration-700"
              fill
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90">
            <div className="flex flex-col items-center gap-4 text-white">
              <ImageOff size={64} className="opacity-70" />
              <p className="text-lg opacity-80">Nenhuma imagem disponível</p>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION ARROWS */}
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

      {/* THUMBNAILS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-20 w-[250px]">
        <ThumbnailsCarousel
          gallery={gallery}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
        />
      </div>

      {/* FULL SCREEN MODAL */}
      {isModalOpen && (
        <FullScreenPropertyGallery
          closeModal={closeModal}
          gallery={gallery}
          currentImage={currentImage}
        />
      )}

      {/* EXPAND GALLERY BUTTON */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-card/20 backdrop-blur-sm hover:bg-card/40 text-primary-foreground z-10"
        onClick={() => setIsModalOpen(true)}
      >
        <Expand className="h-5 w-5" />
      </Button>

      {/* PROPERTY INFO OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="container mx-auto ">
          {deliveryDate && (
            <div className="inline-block bg-action-primary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
              <h2 className="text-lg">
                {deliveryDateToDeliveryStatus(deliveryDate).label}
              </h2>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-4xl text-primary-foreground mb-2 ">
            {title}
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            {`${address?.street} - ${address?.neighborhood}, ${address?.city} - ${address?.stateUf}`}
          </p>
        </div>
      </div>
    </section>
  );
}
