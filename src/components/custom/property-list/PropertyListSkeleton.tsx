import { Skeleton } from "@/components/ui/skeleton";

export function PropertyListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="w-full h-44 bg-gray-200" key={index} />
      ))}
    </div>
  );
}
