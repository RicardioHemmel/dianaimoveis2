"use client";

// REACT | NEXT
import { useState, useEffect } from "react";
import Link from "next/link";

// ICONS
import { Heart, ArrowRight, Search } from "lucide-react";

import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

// HELPER
import { getPropertiesFromLocalStorage } from "@/lib/helpers/localStorage";

// COMPONENT
import { VerticalPropertyCard } from "@/components/custom/property-cards/VerticalPropertyCard";
import { Button } from "@/components/ui/button";
import { FavoriteDialogModal } from "@/components/custom/FavoriteDialogModal";

export default function FavoritePropertiesPage() {
  // PROPERTY IDS FROM LOCAL STORAGE
  const [favoritePropertiesIds, setFavoritePropertiesIds] = useState<string[]>(
    [],
  );
  const [properties, setProperties] = useState<PropertyViewSchema[]>([]); // PROPERTY LIST FROM DB
  const [showEmptyModal, setShowEmptyModal] = useState(false); // MESSAGE WHEN THERE IS NO PROPERTY ON LOCAL STORAGE
  const [hasLoadedFavorites, setHasLoadedFavorites] = useState(false); // FOR FETCHING CONTROL
  const [isLoading, setIsLoading] = useState(true); // LOADING CONTROL

  // ON MOUTING GETS PROPERTY IDS
  useEffect(() => {
    const storedPropertyIds = getPropertiesFromLocalStorage();
    setFavoritePropertiesIds(storedPropertyIds);
    setHasLoadedFavorites(true);
  }, []);

  // FETCH PROPERTY DATA
  useEffect(() => {
    if (!hasLoadedFavorites) return;

    if (!favoritePropertiesIds.length) {
      setProperties([]);
      setShowEmptyModal(true);
      setIsLoading(false);
      return;
    }

    const fetchFavoriteProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/properties/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: favoritePropertiesIds,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar favoritos");
        }

        const data: PropertyViewSchema[] = await response.json();
        setProperties(data);
        setShowEmptyModal(false);
      } catch (e) {
        console.error("Erro ao buscar os imóveis: ", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProperties();
  }, [favoritePropertiesIds, hasLoadedFavorites]);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-br from-hero-from via-hero-via to-hero-to pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-red-400/20 rounded-full backdrop-blur-sm">
              <Heart className="size-10 text-red-500 fill-red-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
            Meus Favoritos
          </h1>
          <p className="text-xl text-white/80 text-center max-w-2xl mx-auto">
            Seus imóveis favoritos salvos em um só lugar. Encontre rapidamente
            os que mais chamaram sua atenção.
          </p>
          {/* FAVORITES QTY & EXPLORE BTN */}
          <div className="flex justify-center gap-3 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 text-sm sm:text-base">
              <span className="text-white font-medium">
                {properties.length}{" "}
                {properties.length === 1 ? "imóvel salvo" : "imóveis salvos"}
              </span>
            </div>

            <Link href={"/properties"}>
              <div className="flex items-center gap-2 bg-action-primary backdrop-blur-md rounded-full px-2 sm:px-6 py-3 border border-white/20 text-white font-medium text-sm sm:text-base">
                <Search className="size-4 sm:size-5" />
                <span>Encontrar Imóveis</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAVORITE PROPERTIES LIST */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <VerticalPropertyCard property={property} key={property._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Nenhum favorito ainda
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Explore nossos imóveis e clique no coração para salvar os que
                mais gostar.
              </p>
              <Link href="/imoveis">
                <Button
                  size="lg"
                  className="bg-action-primary text-secondary-foreground hover:bg-action-primary-hover"
                >
                  Explorar Imóveis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <FavoriteDialogModal
        showEmptyModal={showEmptyModal}
        setShowEmptyModal={setShowEmptyModal}
      />
    </div>
  );
}
