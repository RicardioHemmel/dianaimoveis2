"use client";

// REACT | NEXT
import Link from "next/link";

// ICONS
import { Heart, MapPin, BedDouble, Bath, Car, Maximize } from "lucide-react";
import { useState } from "react";

// FORMATTER
import { formattedPrice } from "@/lib/formatters/ui-formatters/price-BRL";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

const similarProperties = [
  {
    id: 1,
    title: "Very Estação Faria Lima",
    propertyType: "Apartamento",
    typology: "Studio",
    address: {
      street: "Rua Cunha Gago, 618",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      stateUf: "SP",
    },
    price: 384998,
    bedrooms: { min: 1, max: 1 },
    suites: { min: 1, max: 1 },
    parkingSpaces: { min: 0, max: 1 },
    area: { min: 22, max: 45 },
    isLaunch: true,
    isFeatured: true,
    image: "/08_VIRG_PISCINA__low-1920w.webp",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Sky Residence Itaim",
    propertyType: "Apartamento",
    typology: "Duplex",
    address: {
      street: "Av. Brigadeiro Faria Lima, 3400",
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      stateUf: "SP",
    },
    price: 1250000,
    bedrooms: { min: 2, max: 3 },
    suites: { min: 2, max: 2 },
    parkingSpaces: { min: 2, max: 3 },
    area: { min: 68, max: 120 },
    isLaunch: true,
    isFeatured: false,
    image: "/08_VIRG_PISCINA__low-1920w.webp",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Urban Living Brooklin",
    propertyType: "Apartamento",
    typology: "Garden",
    address: {
      street: "Rua Michigan, 150",
      neighborhood: "Brooklin",
      city: "São Paulo",
      stateUf: "SP",
    },
    price: 890000,
    bedrooms: { min: 1, max: 2 },
    suites: { min: 1, max: 1 },
    parkingSpaces: { min: 1, max: 2 },
    area: { min: 52, max: 78 },
    isLaunch: false,
    isFeatured: true,
    image: "/08_VIRG_PISCINA__low-1920w.webp",
    isFavorite: true,
  },
];

export function VerticalPropertyCard() {
  const formatRange = (range: { min: number; max: number }) => {
    if (range.min === range.max) return range.min.toString();
    return `${range.min}`;
  };

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {similarProperties.map((property: any) => (
        <Link
          href={`/imovel/${property.id}`}
          key={property.id}
          className="group relative bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border/30"
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Glassmorphism Favorite Button - Top Right */}
            <button
              onClick={(e) => toggleFavorite(property.id, e)}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                favorites.includes(property.id)
                  ? "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/20"
                  : "bg-white/20 border border-white/30 hover:bg-white/30"
              }`}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${
                  favorites.includes(property.id)
                    ? "fill-red-500 text-red-500"
                    : "text-white hover:text-red-300"
                }`}
              />
            </button>

            {/* Badges Container - Top Left */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {property.isFeatured && (
                <span className="px-3 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-bold tracking-wide shadow-lg">
                  Destaque
                </span>
              )}
              {property.isLaunch && (
                <span className="px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold tracking-wide shadow-lg">
                  Lançamento
                </span>
              )}
            </div>

            {/* Property Type & Typology - Bottom of Image */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  {property.propertyType}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-md text-secondary-foreground text-xs font-semibold">
                  {property.typology}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-b from-card to-card/95">
            {/* Title */}
            <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {property.title}
            </h3>

            {/* Address */}
            <div className="flex items-start gap-2 text-muted-foreground mb-5">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary" />
              <span className="text-sm line-clamp-1">
                {property.address.street}, {property.address.neighborhood}
              </span>
            </div>

            {/* Property Features - Circular Icons Style */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <BedDouble className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {formatRange(property.bedrooms)} qts
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Bath className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {formatRange(property.suites)} suítes
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {formatRange(property.parkingSpaces)} vagas
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Maximize className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {formatRange(property.area)}m²
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-muted-foreground text-xs uppercase tracking-wider block mb-1">
                  A partir de
                </span>
                <span className="font-display text-2xl font-bold text-foreground">
                  {formattedPrice(property.price)}
                </span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                Ver Detalhes
              </div>
            </div>
          </div>

          {/* Premium Border Glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-secondary/40 transition-all duration-500 pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}
