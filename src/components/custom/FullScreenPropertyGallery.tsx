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
  onClose: () => void;
  gallery: PropertyViewSchema["propertyGallery"];
  currentImage: number;
}

export default function FullScreenPropertyGallery({
  onClose,
  gallery,
  currentImage,
}: FullScreenImageModalProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>(); // Gives carousel its mechanics

  useEffect(() => {
    if (!carouselApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        carouselApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        carouselApi.scrollNext();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Removes listener when component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [carouselApi]);

  // Blocks scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

        {/* navigation buttons inside carousel */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-8 z-50 hover:opacity-75 cursor-pointer"
      >
        <X className="size-8 text-white" />
      </button>
    </div>
  );
}
