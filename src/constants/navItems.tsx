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

export const navItems = [
  {
    icon: DocumentTextIcon,
    label: "Dokümanlar",
    href: "/dokumanlar", // Ana menü öğesinin href'i
    items: [
      {
        icon: DocumentTextIcon,
        label: "Politikalar",
        href: "/dokumanlar/politikalar", // Alt menü öğelerinin href'leri
      },
      {
        icon: DocumentTextIcon,
        label: "Prosedürler",
        href: "/dokumanlar/prosedurler",
      },
      {
        icon: DocumentTextIcon,
        label: "Formlar",
        href: "/dokumanlar/formlar",
      },
    ],
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    label: "Hasta Geri Bildirim",
    href: "/hasta-geri-bildirim", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: FlagIcon,
    label: "Olay Bildirim",
    href: "/olay-bildirim", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: ArrowTopRightOnSquareIcon,
    label: "DİF",
    href: "/dif", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: ArrowTrendingUpIcon,
    label: "Göstergeler",
    href: "/gostergeler", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: ShieldExclamationIcon,
    label: "İç Denetimler",
    href: "/ic-denetimler", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: WrenchIcon,
    label: "Kalite İyileştirme Araçları",
    href: "/kalite-iyilestirme", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: PaperClipIcon,
    label: "Raporlama",
    href: "/raporlama", // Ana menü öğesi, alt menü yok
    items: [],
  },
  {
    icon: UserGroupIcon,
    label: "Kullanıcı Yönetimi",
    href: "/kullanici-yonetimi", // Ana menü öğesi, alt menü yok
    items: [],
  },
];
