"use client";
import { userNavItems } from "@/constants/userNavItems";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import LoadingScreen from "@/components/commons/LoadingScreen";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(true);
  return (
    <>
      {!isAuthenticated ? (
        <LoadingScreen />
      ) : (
        <DashboardLayout
          variant={"user"}
          open={open}
          onSetOpen={setOpen}
          navItems={userNavItems}
        >
          {children}
        </DashboardLayout>
      )}
    </>
  );
}
