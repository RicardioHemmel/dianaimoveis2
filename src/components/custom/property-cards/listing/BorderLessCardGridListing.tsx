"use client";

import { BorderLessPropertyCard } from "@/components/custom/property-cards/BorderLessPropertyCard";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UseScrollFetchProperties from "@/hooks/properties/use-scroll-fetch-properties";

export function BorderLessCardsGridListing({
  initialData,
  relatedTo,
}: {
  initialData: PropertyViewSchema[];
  relatedTo?: PropertyViewSchema;
}) {
  const { ref, allProperties, hasNextPage, isFetchingNextPage } =
    UseScrollFetchProperties(initialData, relatedTo);

  return (
    <>
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {allProperties.map((property) => (
          <BorderLessPropertyCard property={property} key={property._id} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        {isFetchingNextPage ? (
          <span>Carregando mais...</span>
        ) : !hasNextPage ? (
          <div className="flex flex-col mt-20 mb-10 items-center">
            <div className="text-center mb-6">
              <p className="text-lg font-bold group-hover:text-primary transition-colors mb-2">
                Você explorou tudo!
              </p>
              <p className="text-sm text-muted-foreground">
                Obrigado por navegar por todos os nossos imóveis
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                variant={"hero"}
                className="group gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-full p-4 text-white"
              >
                <ChevronUp className="size-5 animate-bounce stroke-4" />
                <span className="font-semibold">Voltar ao Início</span>
              </Button>

              <Button
                asChild
                variant={"gold"}
                className="group gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-full p-4 text-white"
              >
                <Link href="properties">
                  <Search className="size-5 stroke-3" />
                  <span className="font-semibold">
                    Explorar Todos os Imóveis
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
