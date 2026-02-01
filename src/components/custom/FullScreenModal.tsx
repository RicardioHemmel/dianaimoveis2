"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFileUploadContext } from "@/context/FileUploadContext";

interface FullScreenImageModalProps {
  doubleClickedImageIndex: number | null;
  onClose: () => void;
}

export default function FullScreenImageModal({
  doubleClickedImageIndex,
  onClose,
}: FullScreenImageModalProps) {
  const { fileUploadHook } = useFileUploadContext();
  const { filesUpload } = fileUploadHook;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [mounted, setMounted] = useState(false);

  // ISOLATES THE MODAL FROM THE ADMIN LAYOUT
  useEffect(() => {
    setMounted(true);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // KEYBOARD SHORTCUTS
  useEffect(() => {
    if (!carouselApi) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") carouselApi.scrollPrev();
      else if (e.key === "ArrowRight") carouselApi.scrollNext();
      else if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [carouselApi, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-199 bg-black/95 flex items-center justify-center w-screen h-screen outline-none">
      {/* Botão de Fechar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 z-200 text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
      >
        <X className="size-10" />
      </button>

      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          startIndex: doubleClickedImageIndex ?? 0,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0">
          {filesUpload.map((img) => (
            <CarouselItem
              key={img.id}
              className="pl-0 relative flex flex-col items-center justify-center w-screen h-screen"
            >
              {/* TÍTULO CENTRALIZADO NO TOPO */}
              <div className="absolute top-8 left-0 right-0 flex justify-center px-20">
                <h2 className="text-white/80 text-lg font-medium tracking-wide truncate max-w-2xl">
                  {img.file?.name ?? img.key ?? "Imagem do Imóvel"}
                </h2>
              </div>

              {/* CONTAINER DA IMAGEM */}
              <div className="relative w-[90vw] h-[75vh] mt-8">
                <Image
                  alt={`Imagem ${img.id}`}
                  src={img.previewURL ?? ""}
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* LEGENDA NO RODAPÉ (OPCIONAL) */}
              <p className="absolute bottom-8 text-white/30 text-xs font-light uppercase tracking-[0.3em]">
                {img.status}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="fixed left-8 top-1/2 -translate-y-1/2 size-14 bg-white/5 border-none text-white hover:bg-white/20" />
        <CarouselNext className="fixed right-8 top-1/2 -translate-y-1/2 size-14 bg-white/5 border-none text-white hover:bg-white/20" />
      </Carousel>
    </div>,
    document.body,
  );
}
