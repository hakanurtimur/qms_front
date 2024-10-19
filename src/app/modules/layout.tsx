"use client";
import NonLoginLayout from "@/components/layout/NonLoginLayout";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/utils/formatPathname";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <NonLoginLayout title={formatPathname(pathname)}>{children}</NonLoginLayout>
  );
};

export default Layout;
