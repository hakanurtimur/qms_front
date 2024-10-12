"use client";
import { userNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <DashboardLayout open={open} onSetOpen={setOpen} navItems={userNavItems}>
      <div
        className={`animate-slide-in-from-left grid ${open ? "xl:grid-cols-6" : "xl:grid-cols-7"} md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 transition-all duration-500`}
      >
        {children}
      </div>
    </DashboardLayout>
  );
}
