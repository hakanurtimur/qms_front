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

export const userNavItems = [
  {
    icon: DocumentTextIcon,
    label: "Dokümanlar",
    href: "/dokumanlar",
    items: [
      {
        icon: DocumentTextIcon,
        label: "Politikalar",
        href: "/dokumanlar/politikalar",
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

export const adminNavItems = [
  {
    icon: DocumentTextIcon,
    label: "Dokümanlar",
    href: "/dokumanlar",
    items: [
      {
        icon: DocumentTextIcon,
        label: "Politikalar",
        href: "/dokumanlar/politikalar",
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
        label: "Lokasyon İşlem",
        href: "/kullanici-yonetimi/lokasyon-islem",
      },
      {
        icon: DocumentTextIcon,
        label: "Personel İşlem",
        href: "/kullanici-yonetimi/personel-islem",
      },
      {
        icon: DocumentTextIcon,
        label: "Rol İşlem",
        href: "/kullanici-yonetimi/rol-islem",
      },
      {
        icon: DocumentTextIcon,
        label: "Yetkilendirme",
        href: "/kullanici-yonetimi/yetkilendirme",
      },
      {
        icon: DocumentTextIcon,
        label: "Tarihçe",
        href: "/kullanici-yonetimi/tarihce",
      },
    ],
  },
];
