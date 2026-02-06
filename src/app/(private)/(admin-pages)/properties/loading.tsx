import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyFormLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center gap-6">
        <div className="px-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-28 bg-gray-200" />
              <Skeleton className="h-6 w-20 bg-gray-200" />
            </div>
            <Skeleton className="h-9 w-72 bg-gray-200" />
            <Skeleton className="h-4 w-56 bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Skeleton className="h-9 w-28 bg-gray-200" />
          <Skeleton className="h-9 w-28 bg-gray-200" />
          <Skeleton className="h-9 w-24 bg-gray-200" />
          <Skeleton className="h-9 w-24 bg-gray-200" />
          <Skeleton className="h-9 w-10 bg-gray-200" />
        </div>
      </div>

      {/* FORM CARD */}
      <div className="p-6 shadow-card bg-white border-2 border-neutral-100 rounded-lg space-y-6">
        {/* TABS */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-28 bg-gray-200" />
          ))}
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-14 w-full bg-gray-200" />
            <Skeleton className="h-14 w-full bg-gray-200" />
            <Skeleton className="h-14 w-full bg-gray-200" />
            <Skeleton className="h-14 w-full bg-gray-200" />
          </div>

          <Skeleton className="h-28 w-full bg-gray-200" />

          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-14 w-full bg-gray-200" />
            <Skeleton className="h-14 w-full bg-gray-200" />
            <Skeleton className="h-14 w-full bg-gray-200" />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
          <Skeleton className="h-10 w-40 bg-gray-200" />
          <Skeleton className="h-10 w-44 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
