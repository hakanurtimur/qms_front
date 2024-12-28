"use client";
import NonLoginLayout from "@/components/layout/NonLoginLayout";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  let title = "DOKÜMANLAR";

  if (pathname === "/modules/2") {
    title = "Hasta Geri Bildirim";
  }
  if (pathname === "/modules/3") {
    title = "Hasta Güvenliği Bildirimi";
  }
  if (pathname === "/modules/10") {
    title = "Çalışan Güvenliği Bildirimi";
  }
  if (pathname === "/modules") {
    title = "Olay Bildirimi";
  }

  return <NonLoginLayout title={title}>{children}</NonLoginLayout>;
};

export default Layout;
