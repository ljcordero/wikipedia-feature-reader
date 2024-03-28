"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Error } from "../components/atoms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // avoid FOUC: https://en.wikipedia.org/wiki/Flash_of_unstyled_content
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <main className={`${ready ? "visible" : "hidden"} h-screen w-screen`}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
      </QueryClientProvider>
    </main>
  );
}
