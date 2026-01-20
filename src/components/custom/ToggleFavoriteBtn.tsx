"use client";

// ICON
import { Heart } from "lucide-react";

// LOCAL STORAGE
import {
  getPropertiesFromLocalStorage,
  setPropertyOnLocalStorage,
  removePropertyFromLocalStorage,
} from "@/lib/helpers/localStorage";
import { useEffect, useState } from "react";

export function ToggleFavoriteBtn({ propertyId }: { propertyId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const properties = getPropertiesFromLocalStorage();
    setIsFavorite(properties.includes(propertyId));
  }, [propertyId]);

  function handleFavoriteToggle() {
    if (isFavorite) {
      removePropertyFromLocalStorage(propertyId);
      setIsFavorite(false);
    } else {
      setPropertyOnLocalStorage(propertyId);
      setIsFavorite(true);
    }
  }

  return (
    <button
      onClick={() => handleFavoriteToggle()}
      className={`absolute top-4 right-4 size-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110${
        isFavorite
          ? "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/20"
          : "bg-white/20 border border-white/60 hover:bg-white/30"
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-white hover:text-red-300"
        }`}
      />
    </button>
  );
}
