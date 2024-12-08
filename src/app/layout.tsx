"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <html lang="en">
            <body>
              {children}
              <Toaster />
            </body>
          </html>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
