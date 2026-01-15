import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { useState, useEffect } from "react";

interface ThumbnailsCarouselProps {
  gallery: PropertyViewSchema["gallery"];
  currentImage: number;
  setCurrentImage: (index: number) => void;
}

export default function ThumbnailsCarousel({
  gallery,
  currentImage,
  setCurrentImage,
}: ThumbnailsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(currentImage);
  }, [api, currentImage]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {gallery.map((img, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3 shrink-0">
            <div className="p-1">
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-full h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
