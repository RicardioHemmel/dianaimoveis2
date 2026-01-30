"use client";

import { Images } from "lucide-react";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import FullScreenPropertyGallery from "@/components/custom/FullScreenPropertyGallery";
import { useFullScreenGallery } from "@/hooks/properties/use-full-screen-gallery";

export default function PropertyGallery({
  gallery,
}: {
  gallery: PropertyViewSchema["gallery"];
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
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 md:gap-3 h-[350px] md:h-[500px] mb-10">
          {visibleImages.map((image, index) => {
            const isMain = index === 0;

            // No mobile mostramos 3 fotos (índices 0, 1, 2)
            // No desktop mostramos as 5 fotos (índices 0 a 4)
            const isLastMobile = index === 2;
            const isLastDesktop = index === MAX_VISIBLE_IMAGES - 1;

            return (
              <button
                key={index}
                onClick={() => openImage(index)}
                className={`
              relative overflow-hidden rounded-xl group cursor-pointer
              ${isMain ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
              ${index > 2 ? "hidden md:block" : ""} 
            `}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay de hover padrão */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* "Ver mais" Overlay Dinâmico */}
                {remainingImages > 0 && (
                  <div
                    className={`
                absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white 
                transition-all duration-300 group-hover:bg-black/70
                /* Só mostra no mobile se for a 3ª foto, só mostra no desktop se for a 5ª */
                ${isLastMobile ? "flex md:hidden" : "hidden"}
                ${isLastDesktop ? "md:flex" : ""}
              `}
                  >
                    <Images className="h-6 w-6 md:h-8 md:w-8 mb-1" />
                    <span className="font-semibold text-base md:text-lg">
                      +
                      {remainingImages +
                        (isLastMobile ? MAX_VISIBLE_IMAGES - 3 : 0)}
                    </span>
                    <span className="text-xs md:text-sm">Ver fotos</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

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
