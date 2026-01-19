import { useState } from "react";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Ruler,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import propertyHero from "@/assets/property-hero.jpg";

interface PropertyData {
  id: number;
  title: string;
  propertyType: string;
  typology: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    stateUf: string;
  };
  price: number;
  bedrooms: { min: number; max: number };
  suites: { min: number; max: number };
  parkingSpaces: { min: number; max: number };
  area: { min: number; max: number };
  isLaunch?: boolean;
  isFeatured?: boolean;
  image: string;
}

interface PropertyCardAltProps {
  property?: PropertyData;
}

const defaultProperty: PropertyData = {
  id: 1,
  title: "Lumière Residence",
  propertyType: "Apartamento",
  typology: "Cobertura",
  address: {
    street: "Av. Paulista, 1000",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    stateUf: "SP",
  },
  price: 2450000,
  bedrooms: { min: 3, max: 4 },
  suites: { min: 2, max: 3 },
  parkingSpaces: { min: 2, max: 4 },
  area: { min: 180, max: 250 },
  isLaunch: true,
  isFeatured: true,
  image: "https://dianaimoveis.com/wp-content/uploads/2025/11/2359553-1.png",
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatRange = (range: { min: number; max: number }) => {
  if (range.min === range.max) return range.min.toString();
  return `${range.min}-${range.max}`;
};

export function PropertyCardAlt2({
  property = defaultProperty,
}: PropertyCardAltProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/imovel/${property.id}`}
      className="group flex flex-col md:flex-row bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/40 hover:border-secondary/40"
    >
      {/* Left: Image Section */}
      <div className="relative w-full md:w-2/5 h-56 md:h-auto md:min-h-[280px] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent md:bg-gradient-to-t md:from-black/60 md:via-transparent md:to-transparent" />

        {/* Glassmorphism Favorite - Top Right */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            isFavorite
              ? "bg-red-500/30 border border-red-400/50 shadow-lg shadow-red-500/25"
              : "bg-white/20 border border-white/30 hover:bg-white/35"
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

        {/* Badges - Bottom Left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          {property.isLaunch && (
            <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
              Lançamento
            </span>
          )}
          {property.isFeatured && (
            <span className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
              Destaque
            </span>
          )}
        </div>
      </div>

      {/* Right: Content Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        {/* Top Content */}
        <div>
          {/* Type Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              {property.propertyType}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="px-3 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
              {property.typology}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <MapPin className="h-4 w-4 text-secondary flex-shrink-0" />
            <span className="text-sm">
              {property.address.neighborhood}, {property.address.city} –{" "}
              {property.address.stateUf}
            </span>
          </div>

          {/* Features Row */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <BedDouble className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {formatRange(property.bedrooms)}
                </span>
                <span className="text-xs text-muted-foreground">Quartos</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Bath className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {formatRange(property.suites)}
                </span>
                <span className="text-xs text-muted-foreground">Suítes</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Car className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {formatRange(property.parkingSpaces)}
                </span>
                <span className="text-xs text-muted-foreground">Vagas</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Ruler className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {formatRange(property.area)}m²
                </span>
                <span className="text-xs text-muted-foreground">Área</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Price & CTA */}
        <div className="flex items-end justify-between pt-5 border-t border-border/50">
          <div>
            <span className="text-muted-foreground text-xs block mb-1">
              A partir de
            </span>
            <span className="font-display text-3xl font-bold text-foreground">
              {formatPrice(property.price)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
            <span>Ver imóvel</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
