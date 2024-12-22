"use client";

import { Clock, Dock, InfoIcon } from "lucide-react";
import DashboardCard from "./_components/dashboard-card";
/* import { BarChartComponent } from "@/components/ui/bar-chart";
 *//* import TaskTable from "./_components/task-table";
 */ import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
/* import SearchableTaskTable from "./_components/searchable-task-table";
 */

const currentDate = new Date();

// Gün, ay ve yıl değerlerini al
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Aylar 0-11 arasındadır
const year = currentDate.getFullYear();

// Saat ve dakika değerlerini al
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");

// İstenen formatta birleştir
const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
const dashboardCardItems = [
  {
    title: "Bildirim",
    value: "0",
    growth: "Kurum Bildirim Sayısı",
    icon: InfoIcon,
  },
  {
    title: "Doküman",
    value: "7360",
    growth: "Sistemde Yer Alan Doküman Sayısı",
    icon: Dock,
  },
  {
    title: "DÖF",
    value: "0",
    growth: "DÖF Sayısı",
    icon: ArrowTopRightOnSquareIcon,
  },
  {
    title: "Son Giriş Zamanı",
    value: formattedDate,
    growth: "Sisteme Son Giriş Tarihiniz",
    icon: Clock,
  },
];

const Page = () => {
  return (
    <div className="flex flex-col w-full h-screen gap-4">
      <DashboardCard items={dashboardCardItems} />
      <div className="flex w-full h-fit gap-5 ">
        <div className="flex w-1/3 h-full gap-4">
          {/*           <BarChartComponent />
           */}{" "}
        </div>
        <div className="flex w-2/3 h-full gap-4">
          {/*           <TaskTable />
           */}{" "}
        </div>
      </div>
      {/*       <SearchableTaskTable />
       */}{" "}
    </div>
  );
};

export default Page;
