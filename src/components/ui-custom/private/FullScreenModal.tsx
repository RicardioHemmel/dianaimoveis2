import { LocalImage } from "@/lib/schemas/uplodad-image";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ModalProps {
  image: LocalImage;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FullscreenModal({
  image,
  onClose,
  onNext,
  onPrev,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 z-50 text-white text-5xl flex justify-start items-center hover:opacity-75 transition-opacity w-60 h-full cursor-pointer"
      >
        <ArrowLeft className="w-10 h-10 ml-8" />
      </button>

      {/* Image */}
      <div
        className="flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.preview}
          alt="Fullscreen preview"
          fill={true}
          className="object-contain"
        />
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-4 z-50 text-white text-5xl flex justify-end items-center hover:opacity-75 transition-opacity w-60 h-full cursor-pointer"
      >
        <ArrowRight className="w-10 h-10 mr-8" />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-8 z-50 text-white text-3xl cursor-pointer hover:opacity-75"
      >
        <X className="w-8 h-8" />
      </button>
    </div>
  );
}
