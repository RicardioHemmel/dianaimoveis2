import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyLoading() {
  return (
    <div className="bg-surface-base min-h-screen">
      {/* Hero */}
      <section className="relative h-[520px] md:h-[620px] lg:h-[680px]">
        <Skeleton className="absolute inset-0 rounded-none bg-gray-200" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-end pb-10 gap-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-10 w-3/4 max-w-2xl" />
          <Skeleton className="h-5 w-2/3 max-w-xl" />
        </div>
      </section>

      {/* Overview */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-7 w-40" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* Content blocks */}
      <section className="container mx-auto px-4 pb-12 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-7 w-56" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-7 w-52" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-[320px] w-full rounded-2xl" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-7 w-56" />
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
