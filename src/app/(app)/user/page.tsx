"use client";

import { Clock, Dock, InfoIcon, User } from "lucide-react";
import DashboardCard from "./_components/dashboard-card";
import { BarChartComponent } from "@/components/ui/bar-chart";
import TaskTable from "./_components/task-table";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import SearchableTaskTable from "./_components/searchable-task-table";

const dashboardCardItems = [
  {
    title: "Bildirim",
    value: "3232",
    growth: "olaylar için bildirin sayısı",
    icon: InfoIcon,
  },
  {
    title: "Döküman",
    value: 2,
    growth: "growth",
    icon: Dock,
  },
  {
    title: "DİF ataması",
    value: 3,
    growth: "growth",
    icon: ArrowTopRightOnSquareIcon,
  },
  {
    title: "Sisteme Son Giriş",
    value: "12.12.2021",
    growth: "growth",
    icon: Clock,
  },
];

const Page = () => {
  return (
    <div className="flex flex-col w-full h-screen gap-4">
      <DashboardCard items={dashboardCardItems} />
      <div className="flex w-full h-fit ">
        <div className="flex w-1/3 h-full gap-4">
        <BarChartComponent/>
        </div>
        <div className="flex w-2/3 h-full gap-4">
        <TaskTable/>
        </div>
      </div>
      <SearchableTaskTable/>

    </div>
  );
};

export default Page;
