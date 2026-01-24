"use client";

import { useSearchPropertyContext } from "@/context/SearchPropertyContext";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { pagination } = useSearchPropertyContext();

  const { totalPages, currentPage } = pagination;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* PREV */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Anterior
      </Button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            size="sm"
            className="rounded-lg w-10"
            variant={isActive ? "gold" : "ghost"}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* NEXT */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Próximo
      </Button>
    </div>
  );
}
