"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * React Query provider (Convert-style).
 * Single QueryClient with default options: no refetch on window focus, retry on 401/403 disabled.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error: unknown) => {
              const err = error as { response?: { status?: number } };
              if ([401, 403].includes(err?.response?.status ?? 0)) return false;
              return failureCount <= 3;
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
