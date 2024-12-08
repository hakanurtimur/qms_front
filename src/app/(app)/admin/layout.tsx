"use client";
import { adminNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(true);
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated ? null : (
        <DashboardLayout
          variant={"admin"}
          open={open}
          onSetOpen={setOpen}
          navItems={adminNavItems}
        >
          {children}
        </DashboardLayout>
      )}
    </>
  );
}
