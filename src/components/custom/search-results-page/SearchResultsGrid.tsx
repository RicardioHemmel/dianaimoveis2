import { useState, useEffect, useRef } from "react";
import { Bed, Bath, Car, Maximize, Heart, Grid3X3, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    title: "Villes Tailored by Emiliano",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    beds: 4,
    baths: 4,
    parking: 3,
    area: 280,
    price: 8900000,
    tag: "Alto Padrão",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    title: "Soft Clementino",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    area: 85,
    price: 890000,
    tag: "Lançamento",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    title: "Brooklin Senses by Cyrela",
    neighborhood: "Brooklin",
    city: "São Paulo",
    beds: 3,
    baths: 3,
    parking: 2,
    area: 145,
    price: 2100000,
    tag: "Em obras",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
    title: "Lumini High Residences",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    beds: 3,
    baths: 2,
    parking: 2,
    area: 120,
    price: 1650000,
    tag: "Pronto",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    title: "Very Estação Faria Lima",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    beds: 1,
    baths: 1,
    parking: 1,
    area: 45,
    price: 580000,
    tag: "Studio",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    title: "Every Day Chácara Klabin",
    neighborhood: "Chácara Klabin",
    city: "São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    area: 72,
    price: 750000,
    tag: "Lançamento",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    title: "Residencial Aurora",
    neighborhood: "Moema",
    city: "São Paulo",
    beds: 3,
    baths: 3,
    parking: 2,
    area: 156,
    price: 2450000,
    tag: "Alto Padrão",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    title: "Garden Towers",
    neighborhood: "Santana",
    city: "São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    area: 68,
    price: 620000,
    tag: "Em obras",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    title: "Jardins Residence",
    neighborhood: "Jardins",
    city: "São Paulo",
    beds: 4,
    baths: 3,
    parking: 3,
    area: 220,
    price: 4500000,
    tag: "Alto Padrão",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80",
    title: "Brooklin Prime",
    neighborhood: "Brooklin",
    city: "São Paulo",
    beds: 3,
    baths: 2,
    parking: 2,
    area: 110,
    price: 1850000,
    tag: "Pronto",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    title: "Vila Nova Concept",
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    beds: 5,
    baths: 5,
    parking: 4,
    area: 350,
    price: 12000000,
    tag: "Exclusivo",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80",
    title: "Paraíso Living",
    neighborhood: "Paraíso",
    city: "São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    area: 78,
    price: 920000,
    tag: "Lançamento",
  },
];

interface PropertyCardProps {
  property: (typeof properties)[0];
  index: number;
  viewMode: "grid" | "list";
}

const PropertyCard = ({ property, index, viewMode }: PropertyCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (viewMode === "list") {
    return (
      <a
        ref={cardRef}
        href={`/imovel/${property.id}`}
        className={cn(
          "bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift group cursor-pointer flex flex-col md:flex-row",
          "transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        style={{
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {/* Image */}
        <div className="relative w-full md:w-72 h-56 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
            {property.tag}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                {property.title}
              </h3>
              <button
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {property.neighborhood}, {property.city}
            </p>

            {/* Features */}
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span className="text-sm">{property.beds} quartos</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4" />
                <span className="text-sm">{property.baths} banheiros</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span className="text-sm">{property.parking} vagas</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-4 w-4" />
                <span className="text-sm">{property.area}m²</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xl font-semibold text-primary">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      ref={cardRef}
      href={`/imovel/${property.id}`}
      className={cn(
        "bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift group cursor-pointer block",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
          {property.tag}
        </Badge>
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">
          {property.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {property.neighborhood}, {property.city}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span className="text-xs">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span className="text-xs">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            <span className="text-xs">{property.parking}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-xs">{property.area}m²</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-lg font-semibold text-primary">
          {formatPrice(property.price)}
        </p>
      </div>
    </a>
  );
};

export function SearchResultsGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {properties.length} imóveis encontrados
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-lg h-9 w-9"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-lg h-9 w-9"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <Select defaultValue="relevancia">
            <SelectTrigger className="w-44 h-9 bg-card border-border rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="relevancia">Mais relevantes</SelectItem>
              <SelectItem value="menor-preco">Menor preço</SelectItem>
              <SelectItem value="maior-preco">Maior preço</SelectItem>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="area">Maior área</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              viewMode="grid"
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              viewMode="list"
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <Button variant="outline" size="sm" className="rounded-lg">
          Anterior
        </Button>
        <Button variant="secondary" size="sm" className="rounded-lg w-10">
          1
        </Button>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          2
        </Button>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          3
        </Button>
        <span className="text-muted-foreground">...</span>
        <Button variant="ghost" size="sm" className="rounded-lg w-10">
          8
        </Button>
        <Button variant="outline" size="sm" className="rounded-lg">
          Próximo
        </Button>
      </div>
    </div>
  );
}
