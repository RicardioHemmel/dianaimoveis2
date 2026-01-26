"use client";

import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Search, MapPin } from "lucide-react";
import Link from "next/link";

export function EmptySearchResults() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* ANIMATED HOUSE ILLUSTRATION */}
      <div className="relative mb-8">
        {/* PULSING BACKGROUND CIRCLE */}
        <div className="absolute inset-0 -m-4 rounded-full bg-action-primary/20 animate-[ping_1.8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 -m-2 rounded-full bg-[#1a365d]/10 animate-pulse" />

        {/* MAIN ICON CONTAINER */}
        <div className="relative size-32 rounded-full bg-linear-to-br from-hero-via to-hero-from flex items-center justify-center shadow-lg">
          {/* BUILDING SVG */}
          <svg
            viewBox="0 0 64 64"
            className="size-16 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* BUILDING BASE */}
            <rect
              x="12"
              y="8"
              width="40"
              height="52"
              rx="2"
              fill="rgba(212, 168, 83, 0.2)"
              stroke="currentColor"
            />
            {/* WINDOWS ROW 1 */}
            <rect
              x="18"
              y="16"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2s_ease-in-out_infinite]"
            />
            <rect
              x="29"
              y="16"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2.5s_ease-in-out_infinite]"
            />
            <rect
              x="40"
              y="16"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2s_ease-in-out_infinite_0.3s]"
            />
            {/* WINDOWS ROW 2 */}
            <rect
              x="18"
              y="28"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2.2s_ease-in-out_infinite_0.5s]"
            />
            <rect
              x="29"
              y="28"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2s_ease-in-out_infinite_0.7s]"
            />
            <rect
              x="40"
              y="28"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2.3s_ease-in-out_infinite]"
            />
            {/* WINDOWS ROW 3 */}
            <rect
              x="18"
              y="40"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2s_ease-in-out_infinite_0.2s]"
            />
            <rect
              x="40"
              y="40"
              width="6"
              height="6"
              rx="1"
              className="fill-white/20 stroke-white animate-[pulse_2.1s_ease-in-out_infinite_0.4s]"
            />
            {/* DOOR */}
            <rect
              x="27"
              y="48"
              width="10"
              height="12"
              rx="1"
              className="fill-action-primary/30 stroke-action-primary"
            />
          </svg>

          {/* SEARCH ICON OVERLAY */}
          <div className="absolute -bottom-1 -right-1 size-10 rounded-full bg-action-primary flex items-center justify-center shadow-md">
            <Search className="size-5 text-white" />
          </div>
        </div>

        {/* Floating location pins */}
        <MapPin
          className="absolute -top-2 -left-4 size-6 text-action-primary animate-infinity-float"
          style={{ animationDelay: "0s" }}
        />
        <MapPin
          className="absolute top-4 -right-6 size-5 text-text-title/60 animate-infinity-float"
          style={{ animationDelay: "0.5s" }}
        />
        <MapPin
          className="absolute -bottom-2 -left-2 size-4 text-text-title/40 animate-infinity-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* TEXT CONTENT WITH FADE-IN ANIMATION */}
      <div className="text-center space-y-3 animate-[fadeIn_0.6s_ease-out]">
        <h3 className="text-2xl font-semibold text-text-title">
          Nenhum imóvel encontrado
        </h3>
        <p className="text-text-title/70 max-w-md leading-relaxed">
          <>
            Não encontramos imóveis com os filtros selecionados.
            <br />
            Tente ajustar sua busca ou limpar os filtros.
          </>
        </p>
      </div>

      {/* ANIMATED BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 ">
        <Button
          className="gap-2 border-2 border-hero-bg text-text-title hover:bg-hero-bg hover:text-white bg-white transition-all duration-300 hover:scale-105 group"
          asChild
        >
          <Link href="/properties">
            <RefreshCw className="size-4 group-hover:animate-spin" />
            Limpar filtros
          </Link>
        </Button>
        <Button
          className="gap-2 bg-action-primary hover:bg-action-primary-hover text-white transition-all duration-300 hover:scale-105"
          asChild
        >
          <Link href="/properties">
            <Home className="size-4" />
            Ver todos os imóveis
          </Link>
        </Button>
      </div>

      {/* TIP SECTION */}
      <div className="mt-8 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200">
        <p className="text-sm text-text-title/80 flex items-center gap-2">
          <span className="flex items-center justify-center p-3 rounded-full bg-action-primary/10">
            <Search className="size-4 text-action-primary" />
          </span>
          <span>
            <strong className="text-[#1a365d]">Dica:</strong> tente usar termos
            mais genéricos na busca
          </span>
        </p>
      </div>
    </div>
  );
}
