import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyListLoading() {
  return (
    <div className="min-h-screen">
      {/* HEADER WITH FILTERS */}
      <Skeleton className="w-full h-60 bg-gray-200 mb-10" />

      {/* PROPERTY LIST */}
      <div className="flex flex-col gap-y-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton className="w-full h-44 bg-gray-200" key={index} />
        ))}
      </div>
    </div>
  );
}
