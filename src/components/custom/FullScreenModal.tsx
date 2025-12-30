// Next / React
import Image from "next/image";
import { useState, useEffect } from "react";

// ShadcnUI
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Types
import { MediaDraft } from "@/lib/schemas/media/media-draft.schema";

// Icons
import { X } from "lucide-react";

interface FullScreenImageModalProps {
  mediaDrafts: MediaDraft[];
  doubleClickedImageIndex: number | null;
  onClose: () => void;
}

export default function FullScreenImageModal({
  mediaDrafts,
  doubleClickedImageIndex,
  onClose,
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
        opts={{ loop: true, startIndex: doubleClickedImageIndex ?? 0 }}
        className="w-[96vw] h-[92vh] flex justify-center"
      >
        <CarouselContent>
          {mediaDrafts.length > 0 &&
            mediaDrafts.map((img) => (
              <CarouselItem key={img.tempId} className="h-screen flex items-center">
                <Card className="flex justify-center w-full">
                  <CardContent className="flex justify-center">
                    {img.preview && (
                      <>
                        <div
                          key={img.tempId}
                          className="relative w-[70vw] h-[70vh]"
                        >
                          <Image
                            alt={`Imagem ${img.tempId}`}
                            src={img.preview}
                            fill={true}
                            className="object-contain"
                          />
                        </div>
                        <div className="absolute top-4 rounded-4xl py-2 px-4 w-full flex justify-center">
                          <h2 className="text-white text-lg">
                            {img.file.name}
                          </h2>
                        </div>
                      </>
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
        onClick={onClose}
        className="absolute top-4 right-8 z-50 hover:opacity-75 cursor-pointer"
      >
        <X className="size-8 text-white" />
      </button>
    </div>
  );
}
