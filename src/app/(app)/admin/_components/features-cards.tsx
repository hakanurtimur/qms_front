import {
  ArrowPathRoundedSquareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowTrendingUpIcon,
  CursorArrowRippleIcon,
  DocumentTextIcon,
  FlagIcon,
  ShieldExclamationIcon,
  WrenchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    icon: DocumentTextIcon,
    title: "Dokümanlar",
    description: "Full support for desktop devices and browsers.",
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    title: "Hasta Geri Bildirim",
    description: "Optimized for a seamless mobile experience.",
  },
  {
    icon: FlagIcon,
    title: "Hasta Güvenliği Bildirimi",
    description: "Perfect viewing and interaction on tablet devices.",
  },
  {
    icon: CursorArrowRippleIcon,
    title: "Çalışan Güvenliği Bildirimi",
    description: "Lightning-fast load times and smooth interactions.",
  },
  {
    icon: ArrowTopRightOnSquareIcon,
    title: "DİF",
    description: "Top-notch security features to protect your data.",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Göstergeler",
    description: "Stay updated with real-time notifications.",
  },
  {
    icon: ShieldExclamationIcon,
    title: "İç Denetimler",
    description: "Powerful search capabilities to find what you need.",
  },
  {
    icon: WrenchIcon,
    title: "Kalite İyileştirme Araçları",
    description: "Comprehensive analytics to track your progress.",
  },
  {
    icon: UserGroupIcon,
    title: "Kullanıcı Yönetimi",
    description: "Manage users and roles with ease.",
  },
];

export default function FeatureCards() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader>
              <div className="rounded-full bg-gradient-to-br from-primary to-primary-foreground p-3 w-full h-5 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
