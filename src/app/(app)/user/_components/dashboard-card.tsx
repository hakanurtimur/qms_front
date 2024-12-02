import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  items: {
    title: string;
    value: number | string;
    growth: string;
    icon: LucideIcon;
  }[];
}

export default function DashboardCard({ items }: DashboardCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium line-clamp-1">
              {item.title}
            </CardTitle>
            <item.icon className="h-8 w-8 text-muted-foreground " />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{item.value}</div>
            <p className="text-sm text-muted-foreground text-gray-500">
              {item.growth}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
