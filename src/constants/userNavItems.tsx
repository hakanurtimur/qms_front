import {
  ArrowPathRoundedSquareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingUpIcon,
  CursorArrowRippleIcon,
  DocumentTextIcon,
  FlagIcon,
  PaperClipIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { NavItemModel } from "@/components/ui/breadcrumb-with-dropdown";

// export const userNavItems: NavItemModel[] = [
//   {
//     icon: DocumentTextIcon,
//     label: "Dokümanlar",
//     href: "/dokumanlar",
//     items: [
//       {
//         icon: DocumentTextIcon,
//         label: "Dokümanlar",
//         href: "/user/documents/documents",
//         items: [],
//       },
//       {
//         icon: DocumentTextIcon,
//         label: "Talepler",
//         href: "/user/documents/requests",
//         items: [],
//       },
//       {
//         icon: DocumentTextIcon,
//         label: "Bekleyen Talepler",
//         href: "/user/documents/waiting-requests",
//         items: [],
//       },
//       {
//         icon: DocumentTextIcon,
//         label: "Arşivleme",
//         href: "/user/documents/archive",
//         items: [],
//       },
//       {
//         icon: DocumentTextIcon,
//         label: "Direktör Onayı",
//         href: "/user/documents/director-rejection",
//         items: [],
//       },
//       {
//         icon: DocumentTextIcon,
//         label: "Doküman Ana Liste",
//         href: "/user/documents/document-master",
//         items: [],
//       },
//     ],
//   },
//   {
//     icon: ArrowPathRoundedSquareIcon,
//     label: "Hasta Geri Bildirim",
//     href: "/hasta-geri-bildirim",
//     items: [
//       {
//         icon: DocumentTextIcon,
//         label: "Bildirim Yap",
//         href: "/user/hasta-geri-bildirim/bildiri-yap",
//         items: [],
//       },
//     ],
//   },
//   {
//     icon: FlagIcon,
//     label: "Hasta Güvenliği Bildirimi",
//     href: "/hasta-guvenligi",
//     items: [
//       {
//         icon: DocumentTextIcon,
//         label: "Bildiri Yap",
//         href: "/user/hasta-guvenligi/bildiri-yap",
//         items: [],
//       },
//     ],
//   },
//   {
//     icon: CursorArrowRippleIcon,
//     label: "Çalışan Güvenliği Bildirimi",
//     href: "/calisan-guvenligi",
//     items: [
//       {
//         icon: DocumentTextIcon,
//         label: "Bildiri Yap",
//         href: "/user/calisan-guvenligi/bildiri-yap",
//         items: [],
//       },
//     ],
//   },
//   {
//     icon: ArrowTopRightOnSquareIcon,
//     label: "DİF",
//     href: "/dif",
//     items: [],
//   },
//   {
//     icon: ArrowTrendingUpIcon,
//     label: "Göstergeler",
//     href: "/gostergeler",
//     items: [],
//   },
//   {
//     icon: ShieldExclamationIcon,
//     label: "İç Denetimler",
//     href: "/ic-denetimler",
//     items: [],
//   },
//   {
//     icon: WrenchIcon,
//     label: "Kalite İyileştirme Araçları",
//     href: "/kalite-iyilestirme",
//     items: [],
//   },
// ];

export const adminNavItems: NavItemModel[] = [
  {
    icon: DocumentTextIcon,
    label: "Dokümanlar",
    href: "/documents",
    items: [
      {
        icon: DocumentTextIcon,
        label: "Politikalar",
        href: "/admin/documents/page1",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Prosedürler",
        href: "/admin/documents/page2",
        items: [],
      },
      {
        icon: DocumentTextIcon,
        label: "Formlar",
        href: "/admin/documents/page3",
        items: [],
      },
    ],
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    label: "Hasta Geri Bildirim",
    href: "/patient-feedback",
    items: [],
  },
  {
    icon: FlagIcon,
    label: "Hasta Güvenliği Bildirimi",
    href: "/patient-safety",
    items: [],
  },
  {
    icon: CursorArrowRippleIcon,
    label: "Çalışan Güvenliği Bildirimi",
    href: "/personnel-safety",
    items: [],
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
  {
    icon: PaperClipIcon,
    label: "Raporlama",
    href: "/report",
    items: [],
  },
  {
    icon: UserGroupIcon,
    label: "Kullanıcı Yönetimi",
    href: "/user-management",
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
        label: "Bölüm İşlem",
        href: "/admin/user-management/directorate",
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
        href: "/admin/user-management/authorization",
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
