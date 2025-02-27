
import { Users, Calendar, ClipboardList, Bell } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatsCard from "@/components/StatsCard";
import AppointmentTimeline from "@/components/AppointmentTimeline";
import { cn } from "@/lib/utils";

const Index = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "248",
      icon: Users,
      trend: { value: 12, label: "vs last month" },
    },
    {
      title: "Today's Appointments",
      value: "8",
      icon: Calendar,
      trend: { value: -2, label: "vs yesterday" },
    },
    {
      title: "Pending Reports",
      value: "5",
      icon: ClipboardList,
      trend: { value: 0, label: "no change" },
    },
    {
      title: "Notifications",
      value: "3",
      icon: Bell,
      trend: { value: 2, label: "new today" },
    },
  ];

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                {...stat}
                className={cn("delay-[100ms]", {
                  "delay-[200ms]": index === 1,
                  "delay-[300ms]": index === 2,
                  "delay-[400ms]": index === 3,
                })}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentTimeline />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
