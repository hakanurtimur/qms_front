import {
  ArrowPathRoundedSquareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  FlagIcon,
  PaperClipIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { NavItemModel } from "@/components/ui/breadcrumb-with-dropdown";

export const userNavItems: NavItemModel[] = [
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
      {
        icon: DocumentTextIcon,
        label: "Bekleyen Talepler",
        href: "/user/documents/waiting-requests",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Arşivleme",
        href: "/user/documents/archive",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Yönetici Onay Red",
        href: "/user/documents/director-rejection",
        items: [],
      },
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
    label: "Olay Bildirim",
    href: "/olay-bildirim",
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
];

export const adminNavItems: NavItemModel[] = [
  {
    icon: DocumentTextIcon,
    label: "Dokümanlar",
    href: "/dokumanlar",
    items: [
      {
        icon: DocumentTextIcon,
        label: "Politikalar",
        href: "/dokumanlar/politikalar",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Prosedürler",
        href: "/dokumanlar/prosedurler",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Formlar",
        href: "/dokumanlar/formlar",
        items: [],
      },
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
    label: "Olay Bildirim",
    href: "/olay-bildirim",
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
  {
    icon: PaperClipIcon,
    label: "Raporlama",
    href: "/raporlama",
    items: [],
  },
  {
    icon: UserGroupIcon,
    label: "Kullanıcı Yönetimi",
    href: "/kullanici-yonetimi",
    items: [
      {
        icon: DocumentTextIcon,
        label: "Lokasyon",
        href: "/admin/user-management/location",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Personel İşlem",
        href: "/admin/user-management/employee-management",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Rol İşlem",
        href: "/admin/user-management/role-management",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Modül İşlem",
        href: "/admin/user-management/module-management",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Yetkilendirme",
        href: "/kullanici-yonetimi/yetkilendirme",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Tarihçe",
        href: "/admin/user-management/history",
        items: [],
      },
    ],
  },
];
