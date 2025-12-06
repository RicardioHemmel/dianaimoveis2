// Next / React
import Image from "next/image";

// ShadcnUI
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Types
import { LocalImage } from "@/lib/schemas/uplodad-image";

// Icons
import { X } from "lucide-react";

interface FullScreenImageModalProps {
  localImages: LocalImage[];
  doubleClickedImageIndex: number | null;
  onClose: () => void;
}

export default function FullScreenImageModal({
  localImages,
  doubleClickedImageIndex,
  onClose,
}: FullScreenImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <Carousel
        opts={{ loop: true, startIndex: doubleClickedImageIndex ?? 0 }}
        className="w-[96vw] h-[92vh] flex justify-center"
      >
        <CarouselContent>
          {localImages.length > 0 &&
            localImages.map((img) => (
              <CarouselItem key={img.id} className="h-screen flex items-center">
                <Card className="flex justify-center w-full">
                  <CardContent className="flex justify-center">
                    {img.preview && (
                      <Image
                        alt={`Imagem ${img.id}`}
                        key={img.id}
                        className="object-contain"
                        width={900}
                        height={900}
                        src={img.preview}
                      />
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
