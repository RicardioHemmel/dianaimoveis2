"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { PropertyViewSchema } from "@/lib/schemas/property/property.schema";

export default function UseScrollFetchProperties(
  initialData: PropertyViewSchema[],
  relatedTo?: PropertyViewSchema,
) {
  // LISTENER FOR RENDERING PROPERTIES DIV
  const { ref, inView } = useInView({
    rootMargin: "200px", // STARTS LOADING A LITTLE BEFORE REACHING THE END
  });

  // DEFINE KEYS FOR SPECIFIC PROPERTY OR HOME PAGE LISTING
  const queryKey = relatedTo
    ? ["properties", "related", relatedTo._id]
    : ["properties", "all"];

  // LOGIC FOR SCROLL FETCHING
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: async ({ pageParam }) => {
        const url = relatedTo
          ? `/api/properties/get-related-properties?page=${pageParam}&limit=12&excludeId=${relatedTo._id}&propertyStanding=${relatedTo.propertyStanding?._id}`
          : `/api/properties/get-all-properties?page=${pageParam}&limit=12`;

        const res = await fetch(url);
        return res.json();
      },
      initialPageParam: 1,
      // STARTS WITH INITIAL DATA FOR BETTER "SEO" INDEXING PROPERTIES THE COMES FROM THE SERVER
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      // VALID DATA FOR
      staleTime: 1000 * 60 * 60, // 1h

      // GETS DATA FROM THE NEXT PAGE OR STOPS WHEN THERE ISN'T DATA ANYMORE
      getNextPageParam: (lastPage, allPages) => {
        const limit = 12;
        if (!lastPage || lastPage.length < limit) return undefined;

        // CALL THE NEXT PAGE
        return allPages.length + 1;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allProperties = data?.pages.flat() ?? [];

  return {
    allProperties,
    hasNextPage,
    isFetchingNextPage,
    ref,
  };
}
