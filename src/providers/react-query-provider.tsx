"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

// MANAGE ASYNCHRONOUS CALLS
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ENSURES THAT THE QUERYCLIENT IS NOT RECREATED WITH EACH RENDER
  const [queryClient] = useState(() => new QueryClient());

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </APIProvider>
  );
}
