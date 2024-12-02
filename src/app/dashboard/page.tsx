import DashboardCards from "@/components/DashboardCards"
import DailyChart from "@/components/DailyChart"
import RecentActivities from "@/components/RecentActivities"
import TaskTable from "@/components/TaskTable"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DailyChart />
        <RecentActivities />
      </div>
      <TaskTable />
    </div>
  )
}

