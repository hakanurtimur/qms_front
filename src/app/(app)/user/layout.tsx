"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import LoadingScreen from "@/components/commons/LoadingScreen";
import { NavItemModel } from "@/components/ui/breadcrumb-with-dropdown";
import {
  ArrowPathRoundedSquareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingUpIcon,
  CursorArrowRippleIcon,
  DocumentTextIcon,
  FlagIcon,
  ShieldExclamationIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(true);

  // TODO: make this dynamic, before that we can use this static navItems
  // TODO: user nav itemları artık burada bütün değişiklikler buraya aktarılacak

  const adjustedUserNavItems: NavItemModel[] = user
    ? [
        {
          icon: DocumentTextIcon,
          label: "Dokümanlar",
          href: "/dokumanlar",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Dokümanlar",
              href: "/user/documents/documents",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Talepler",
              href: "/user/documents/requests",
              items: [],
            },
            ...(user?.roleId === "4"
              ? [
                  {
                    icon: DocumentTextIcon,
                    label: "Bekleyen Talepler",
                    href: "/user/documents/waiting-requests",
                    items: [],
                  },
                ]
              : []),
            ...(user?.roleId === "4"
              ? [
                  {
                    icon: DocumentTextIcon,
                    label: "Arşivleme",
                    href: "/user/documents/archive",
                    items: [],
                  },
                ]
              : []),
            ...(user?.roleId === "7"
              ? [
                  {
                    icon: DocumentTextIcon,
                    label: "Yönetici Onay Red",
                    href: "/user/documents/director-rejection",
                    items: [],
                  },
                ]
              : []),
          ],
        },
        {
          icon: ArrowPathRoundedSquareIcon,
          label: "Hasta Geri Bildirim",
          href: "/hasta-geri-bildirim",
          items: [],
        },
        {
          icon: FlagIcon,
          label: "Hasta Güvenliği",
          href: "/hasta-guvenligi",
          items: [],
        },
        {
          icon: CursorArrowRippleIcon,
          label: "Çalışan Güvenliği",
          href: "/calisan-guvenligi",
          items: [],
        },
        {
          icon: ArrowTopRightOnSquareIcon,
          label: "DİF",
          href: "/dif",
          items: [],
        },
        {
          icon: ArrowTrendingUpIcon,
          label: "Göstergeler",
          href: "/gostergeler",
          items: [],
        },
        {
          icon: ShieldExclamationIcon,
          label: "İç Denetimler",
          href: "/ic-denetimler",
          items: [],
        },
        {
          icon: WrenchIcon,
          label: "Kalite İyileştirme Araçları",
          href: "/kalite-iyilestirme",
          items: [],
        },
      ]
    : [];

  return (
    <>
      {!isAuthenticated ? (
        <LoadingScreen />
      ) : (
        <DashboardLayout
          variant={"user"}
          open={open}
          onSetOpen={setOpen}
          navItems={adjustedUserNavItems}
        >
          {children}
        </DashboardLayout>
      )}
    </>
  );
}
