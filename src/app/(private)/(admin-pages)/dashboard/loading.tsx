import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen [&_.skeleton]:bg-gray-200 flex flex-col gap-y-6">
      <Skeleton className="skeleton h-42 w-full " />

      <div className="flex justify-between gap-4 ">
        <Skeleton className="skeleton h-24 w-full" />
        <Skeleton className="skeleton h-24 w-full" />
        <Skeleton className="skeleton h-24 w-full" />
      </div>

      <div className="flex justify-between gap-4">
        <Skeleton className="skeleton h-24 w-full" />
        <Skeleton className="skeleton h-24 w-full" />
        <Skeleton className="skeleton h-24 w-full" />
        <Skeleton className="skeleton h-24 w-full" />
      </div>

      <Skeleton className="skeleton h-42 w-full " />

      <div className="flex justify-between gap-4">
        <Skeleton className="skeleton w-full h-66" />
        <Skeleton className="skeleton w-full h-66" />
      </div>
    </div>
  );
}
