"use client";

import { Heart } from "lucide-react";

const favorites = [1, 2, 3, 4, 5];

function handleFavoriteToggle(id: string, e: any) {
  console.log("Clicou");
}

export function ToggleFavoriteBtn() {
  return (
    <button
      onClick={(e) => handleFavoriteToggle("id 1", e)}
      className={`absolute top-4 right-4 size-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110${
        favorites.includes(6)
          ? "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/20"
          : "bg-white/20 border border-white/60 hover:bg-white/30"
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          favorites.includes(6)
            ? "fill-red-500 text-red-500"
            : "text-white hover:text-red-300"
        }`}
      />
    </button>
  );
}
