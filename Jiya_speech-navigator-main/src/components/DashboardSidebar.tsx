
import { Home, CalendarDays, Users, ClipboardList, Settings, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Schedule", icon: CalendarDays, href: "/schedule" },
  { name: "Patients", icon: Users, href: "/patients" },
  { name: "Reports", icon: ClipboardList, href: "/reports" },
  { name: "Analytics", icon: BarChart, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "#", onClick: () => {
    toast.info("Settings", {
      description: "Settings page will be available soon",
    });
  }},
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col animate-fade-in">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Speech<span className="text-primary">Care</span>
        </h1>
      </div>
      <nav className="flex-1 px-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={item.onClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg mb-1",
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors",
              "group",
              location.pathname === item.href && "bg-gray-50 text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
