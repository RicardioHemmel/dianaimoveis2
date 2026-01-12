import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { useState } from "react";

export function useFullScreenGallery(
  gallery: PropertyViewSchema["propertyGallery"]
) {
  // FIRST IMAGE FROM GALLERY
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // FULLSCREEN STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openImage = (imageIndex: number) => {
    setCurrentImage(imageIndex);
    setIsModalOpen(true);
  };

  return {
    currentImage,
    setCurrentImage,
    nextImage,
    prevImage,
    isModalOpen,
    closeModal,
    setIsModalOpen,
    openImage,
  };
}
