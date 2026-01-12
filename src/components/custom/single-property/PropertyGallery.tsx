"use client";

import { Images } from "lucide-react";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import FullScreenPropertyGallery from "@/components/custom/FullScreenPropertyGallery";
import { useFullScreenGallery } from "@/hooks/properties/use-full-screen-gallery";

export default function PropertyGallery({
  gallery,
}: {
  gallery: PropertyViewSchema["propertyGallery"];
}) {
  //  FULL SCREEN HOOK
  const { isModalOpen, currentImage, closeModal, openImage } =
    useFullScreenGallery(gallery);

  const MAX_VISIBLE_IMAGES = 5;

  const remainingImages = gallery.length - MAX_VISIBLE_IMAGES;
  const visibleImages = gallery.slice(0, MAX_VISIBLE_IMAGES);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-section">Galeria</h2>
          <p className="subtitle-section">
            Explore cada detalhe do empreendimento
          </p>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] mb-10">
          {visibleImages.map((image, index) => {
            const isMain = index === 0;
            const isLastVisible =
              index === MAX_VISIBLE_IMAGES - 1 && remainingImages > 0;

            return (
              <button
                key={index}
                onClick={() => openImage(index)}
                className={`
          relative overflow-hidden rounded-xl group cursor-pointer
          ${isMain ? "col-span-2 row-span-2" : ""}
        `}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />

                {/* "Ver mais" overlay */}
                {isLastVisible && !isMain && (
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
      </div>
      {/* FULL SCREEN GALLERY */};
      {isModalOpen && (
        <FullScreenPropertyGallery
          currentImage={currentImage}
          gallery={gallery}
          closeModal={closeModal}
        />
      )}
    </section>
  );
}
