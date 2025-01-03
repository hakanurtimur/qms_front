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
          href: "/documents",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Dokümanlar",
              href: "/user/documents/documents",
              items: [],
            },
            ...(user?.roleId === "4" ||
            user?.roleId === "3" ||
            user?.roleId === "2" ||
            user?.roleId === "6"
              ? [
                  {
                    icon: DocumentTextIcon,
                    label: "Talepler",
                    href: "/user/documents/requests",
                    items: [],
                  },
                ]
              : []),
            ...(user?.roleId === "4"
              ? [
                  {
                    icon: DocumentTextIcon,
                    label: "Kurum Talepleri",
                    href: "/user/documents/organisation-requests",
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
                    label: "Direktör Onayı",
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
          href: "/patient-feedback",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildirim Yap",
              href: "/user/patient-feedback/submit-report",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Bildirimlerim",
              href: "/user/patient-feedback/my-reports",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Kurum Bildirimleri",
              href: "/user/patient-feedback/company-reports",
              items: [],
            },
          ],
        },
        {
          icon: FlagIcon,
          label: "Hasta Güvenliği Bildirimi",
          href: "/patient-safety",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildirim Yap",
              href: "/user/patient-safety/submit-report",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Bildirimlerim",
              href: "/user/patient-safety/my-reports",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Kurum Bildirimleri",
              href: "/user/patient-safety/company-reports",
              items: [],
            },
          ],
        },
        {
          icon: CursorArrowRippleIcon,
          label: "Çalışan Güvenliği Bildirimi",
          href: "/personnel-safety",
          items: [
            {
              icon: DocumentTextIcon,
              label: "Bildirim Yap",
              href: "/user/personnel-safety/submit-report",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Bildirimlerim",
              href: "/user/personnel-safety/my-reports",
              items: [],
            },
            {
              icon: DocumentTextIcon,
              label: "Kurum Bildirimleri",
              href: "/user/personnel-safety/company-reports",
              items: [],
            },
          ],
        },
        {
          icon: ArrowTopRightOnSquareIcon,
          label: "DİF",
          href: "/rra",
          items: [],
        },
        {
          icon: ArrowTrendingUpIcon,
          label: "Göstergeler",
          href: "/indicators",
          items: [],
        },
        {
          icon: ShieldExclamationIcon,
          label: "İç Denetimler",
          href: "/internal-audits",
          items: [],
        },
        {
          icon: WrenchIcon,
          label: "Kalite İyileştirme Araçları",
          href: "/quality-improvement",
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
