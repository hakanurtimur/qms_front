"use client";
import { adminNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <DashboardLayout open={open} onSetOpen={setOpen} navItems={adminNavItems}>
      {children}
    </DashboardLayout>
  );
}
