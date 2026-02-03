"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Header skeleton */}
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-56 mb-3" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
        </section>

        {/* Filters + results layout */}
        <div className="w-11/12 mx-auto md:px-6 pb-8 md:py-6 xl:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center md:items-stretch">
            {/* Desktop filters skeleton */}
            <aside className="hidden w-full xl:block lg:w-[320px] shrink-0">
              <div className="bg-card rounded-2xl border border-border/30 shadow-lg p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </aside>

            {/* Results skeleton */}
            <div className="w-full sm:w-[80%] md:w-full">
              <div className="flex flex-col md:flex-row items-center justify-end 2xl:justify-between gap-4 mb-6">
                <Skeleton className="h-9 w-48 hidden 2xl:block" />
                <Skeleton className="h-9 w-40 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-10 gap-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl border border-border/30 shadow-lg overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-5 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 w-9 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
