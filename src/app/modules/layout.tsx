"use client";
import NonLoginLayout from "@/components/layout/NonLoginLayout";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  let title = "Dokumanlar";

  if (pathname === "/modules/2") {
    title = "Hasta Geri Bildirim";
  }
  if (pathname === "/modules/3") {
    title = "Olay Bildirimi";
  }
  if (pathname === "/modules") {
    title = "Olay Bildirimi";
  }

  return <NonLoginLayout title={title}>{children}</NonLoginLayout>;
};

export default Layout;
