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
    title = "HASTA GERİ BİLDİRİM";
  }
  if (pathname === "/modules/3") {
    title = "HASTA GÜVENLİĞİ BİLDİRİMİ";
  }
  if (pathname === "/modules/10") {
    title = "ÇALIŞAN GÜVENLİĞİ BİLDİRİMİ";
  }
  /*   if (pathname === "/modules") {
    title = "Olay Bildirimi";
  } */

  return <NonLoginLayout title={title}>{children}</NonLoginLayout>;
};

export default Layout;
