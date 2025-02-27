
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, FileText } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Report Available",
      description: "Weekly progress report for Patient John D. is ready for review",
      time: "2 hours ago",
      icon: FileText,
      unread: true,
    },
    {
      id: 2,
      title: "Session Reminder",
      description: "Upcoming session with Emma S. tomorrow at 10:30 AM",
      time: "5 hours ago",
      icon: Calendar,
      unread: true,
    },
    {
      id: 3,
      title: "System Update",
      description: "New features have been added to the platform",
      time: "1 day ago",
      icon: Bell,
      unread: false,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Notifications</h1>
              <Button variant="outline">Mark all as read</Button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`hover:shadow-md transition-shadow ${
                    notification.unread ? "bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="flex items-start p-4 gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <notification.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Notifications;
