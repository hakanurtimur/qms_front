"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/authContext";
import { ILoadingState, loadingState } from "@/services/states/loading.service";
import { usePathname } from "next/navigation"; // next/router yerine next/navigation kullanın
import LoadingBar from "@/components/ui/loading-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const { setLoadingWithDelay, loading } = loadingState(
    (state) => state as ILoadingState,
  );
  const pathname = usePathname();

  useEffect(() => {
    setLoadingWithDelay(true, 1500);
  }, [pathname, setLoadingWithDelay]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <html lang="en">
            <body>
              {loading && <LoadingBar />}
              {children}
              <Toaster />
            </body>
          </html>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
