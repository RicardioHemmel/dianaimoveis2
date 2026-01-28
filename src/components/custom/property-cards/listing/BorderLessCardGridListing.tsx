"use client";

import { BorderLessPropertyCard } from "@/components/custom/property-cards/BorderLessPropertyCard";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";
import { ChevronUp } from "lucide-react";

export function BorderLessCardsGridListing({
  initialData,
}: {
  initialData: PropertyViewSchema[];
}) {
  const { ref, inView } = useInView({
    rootMargin: "200px", // Começa a carregar um pouco antes de chegar no fim
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["properties"],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `/api/properties/get-all-properties?page=${pageParam}&limit=12`,
        );
        return res.json();
      },
      initialPageParam: 1,
      // 1. ADICIONE O INITIAL DATA AQUI
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      // 2. IMPORTANTE: Defina um staleTime para o React Query não
      // invalidar os dados do servidor assim que carregar.
      staleTime: 1000 * 60 * 5, // 5 minutos

      getNextPageParam: (lastPage, allPages) => {
        const limit = 12;
        // Se a última página carregada for menor que o limite, acabou.
        if (!lastPage || lastPage.length < limit) return undefined;

        // A próxima página será a quantidade de páginas que já temos + 1
        return allPages.length + 1;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allProperties = data?.pages.flat() ?? [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allProperties.map((property) => (
          <BorderLessPropertyCard property={property} key={property._id} />
        ))}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage ? (
          <span>Carregando mais...</span>
        ) : !hasNextPage ? (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <span className="text-muted-foreground text-sm font-medium group-hover:text-primary transition-colors">
              Você chegou ao fim!
            </span>

            <div className="flex items-center justify-center gap-2 bg-action-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              <span className="font-semibold text-sm">Voltar ao topo</span>
              <ChevronUp className="size-4 animate-bounce stroke-4" />
            </div>
          </button>
        ) : null}
      </div>
    </>
  );
}
