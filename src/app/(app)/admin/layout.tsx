"use client";
import { adminNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <DashboardLayout navItems={adminNavItems}>{children}</DashboardLayout>;
}
