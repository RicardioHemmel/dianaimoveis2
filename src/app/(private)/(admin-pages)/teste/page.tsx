import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyFormLoading() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen [&_.skeleton]:bg-gray-200 mt-6 bg-admin-primary/10">
      <div className="container">
        <div className="flex justify-between items-center bg-action-primary/40 mb-12">
          <Skeleton className="h-36 w-78" />

          <div className="w-100 flex gap-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        <Skeleton className="w-full h-126" />
      </div>
    </div>
  );
}
