"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
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
                    label: "Doküman Ana Liste",
                    href: "/user/documents/document-master",
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
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildiri Yap",
              href: "/user/hasta-geri-bildirim/bildiri-yap",
              items: [],
            },
          ],
        },
        {
          icon: FlagIcon,
          label: "Hasta Güvenliği Bildirimi",
          href: "/hasta-guvenligi",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildiri Yap",
              href: "/user/hasta-guvenligi/bildiri-yap",
              items: [],
            },
          ],
        },
        {
          icon: CursorArrowRippleIcon,
          label: "Çalışan Güvenliği Bildirimi",
          href: "/calisan-guvenligi",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildiri Yap",
              href: "/user/calisan-guvenligi/bildiri-yap",
              items: [],
            },
          ],
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
      {!isAuthenticated ? null : (
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
