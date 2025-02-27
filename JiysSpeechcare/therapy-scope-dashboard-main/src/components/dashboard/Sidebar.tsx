
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  Home,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Overview",
    icon: Home,
    url: "/overview",
  },
  {
    title: "Therapists",
    icon: Users,
    url: "/therapists",
  },
  {
    title: "Reports",
    icon: ClipboardList,
    url: "/reports",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    title: "Schedule",
    icon: Calendar,
    url: "/schedule",
  },
];

export const DashboardSidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (title: string, url: string) => {
    toast.info(`Navigating to ${title}`);
    navigate(url);
  };

  return (
    <>
      <div className="relative">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(item.title, item.url);
                          }}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger 
          className="absolute top-4 -right-3 z-50 bg-background shadow-sm border rounded-full p-1.5"
          aria-label="Toggle Sidebar"
        />
      </div>
    </>
  );
};
