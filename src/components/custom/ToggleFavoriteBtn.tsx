"use client";

import { useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import {
  getPropertiesFromLocalStorage,
  setPropertyOnLocalStorage,
  removePropertyFromLocalStorage,
  getPrivacyConsent,
  setPrivacyConsent,
} from "@/lib/helpers/localStorage";
import { Button } from "@/components/ui/button";

// Variants fora do componente
const favoriteBtnVariants = cva(
  "size-10 flex items-center justify-center cursor-pointer transition-all duration-300",
  {
    variants: {
      variant: {
        blur: "rounded-full backdrop-blur-md hover:scale-110",
        default: "size-2 bg-black",
      },
      active: {
        true: "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/20",
        false: "bg-white/20 border border-white/60 hover:bg-white/30",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  },
);

type ToggleFavoriteBtnProps = {
  propertyId: string;
} & VariantProps<typeof favoriteBtnVariants>;

export function ToggleFavoriteBtn({
  propertyId,
  variant = "blur",
}: ToggleFavoriteBtnProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const properties = getPropertiesFromLocalStorage();
    setIsFavorite(properties.includes(propertyId));
  }, [propertyId]);

  function handleFavoriteToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (getPrivacyConsent() === "declined") {
      toast("Para favoritar imóveis, aceite a Política de Privacidade.", {
        action: {
          label: "Aceitar cookies",
          onClick: () => {
            setPrivacyConsent("accepted");
            setPropertyOnLocalStorage(propertyId);
            setIsFavorite(true);
            toast.success("Preferências de privacidade atualizadas.");
          },
        },
      });
      return;
    }

    if (isFavorite) {
      removePropertyFromLocalStorage(propertyId);
      setIsFavorite(false);
    } else {
      setPropertyOnLocalStorage(propertyId);
      setIsFavorite(true);
    }
  }

  if (variant === "blur") {
    return (
      <button
        onClick={handleFavoriteToggle}
        className={
          favoriteBtnVariants({
            variant,
            active: isFavorite,
          }) +
          " " +
          (isFavorite
            ? "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/20"
            : "bg-white/20 border border-white/60 hover:bg-white/30")
        }
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

  // SINGULAR PROPERTY
  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="lg"
      className={isFavorite ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}
      onClick={handleFavoriteToggle}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
    </Button>
  );
}
