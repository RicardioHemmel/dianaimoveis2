// NEXT | REACT
import Image from "next/image";
import { useState, useEffect } from "react";

// COMPONTENTS
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ICONS
import { X } from "lucide-react";

// SCHEMA
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

interface FullScreenImageModalProps {
  closeModal: () => void;
  gallery: PropertyViewSchema["propertyGallery"];
  currentImage: number;
}

export default function FullScreenPropertyGallery({
  closeModal,
  gallery,
  currentImage,
}: FullScreenImageModalProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // GIVES CAROUSEL ITS MECHANICS
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

  // STARTS FULL SCREEN IMAGE INDEX WITH THE CURRENT ON THE PARENT COMPONENT
  useEffect(() => {
    setFullScreenImageIndex(currentImage);
  }, [currentImage]);

  useEffect(() => {
    if (!carouselApi) return;

    // WHEN INTERECTING WITH NEXT AND PREV ARROWS UPDATES THE IMAGE INDEX
    const onSelect = () => {
      setFullScreenImageIndex(carouselApi.selectedScrollSnap());
    };

    // REGISTERS THE EVENT
    carouselApi.on("select", onSelect);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        carouselApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        carouselApi.scrollNext();
      } else if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // REMOVES LISTENER WHEN COMPONENT IS UNMOUNTED
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [carouselApi]);

  // BLOCKS SCROLLING
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [carouselApi]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true, startIndex: currentImage }}
        className="w-[96vw] h-[92vh] flex justify-center"
      >
        <CarouselContent>
          {gallery.length > 0 &&
            gallery.map((img) => (
              <CarouselItem
                key={img.key}
                className="h-screen flex items-center"
              >
                <Card className="flex justify-center w-full">
                  <CardContent className="flex justify-center">
                    {img.url && (
                      <div className="relative w-[70vw] h-[70vh]">
                        <Image
                          alt={`Imagem ${img.key}`}
                          src={img.url}
                          fill={true}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
        </CarouselContent>

        {/* NAVIGATION BUTTONS INSIDE CAROUSEL */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>

      {/* CLOSE BUTTON */}
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-4 right-8 z-50 hover:opacity-75 cursor-pointer"
      >
        <X className="size-8 text-white" />
      </button>

      {/* IMAGE INDEX LABEL */}
      <p className="absolute top-10 left-1/2 -translate-x-1/2 z-10 text-white text-sm md:text-base bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
        {fullScreenImageIndex + 1}/{gallery.length}
      </p>
    </div>
  );
}
