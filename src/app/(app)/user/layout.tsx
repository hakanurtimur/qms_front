"use client";
import { userNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <DashboardLayout navItems={userNavItems}>{children}</DashboardLayout>;
}
