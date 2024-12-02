import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  { id: 1, description: "Yeni görev eklendi", time: "5 dakika önce" },
  { id: 2, description: "Rapor güncellendi", time: "1 saat önce" },
  { id: 3, description: "Toplantı planlandı", time: "3 saat önce" },
  { id: 4, description: "Proje tamamlandı", time: "1 gün önce" },
];

export default function RecentActivities() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Son Yapılanlar</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activity.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
