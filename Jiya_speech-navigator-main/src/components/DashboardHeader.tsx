
import { Bell, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const DashboardHeader = () => {
  const handleNotificationClick = () => {
    toast.info("You have 3 new notifications", {
      description: "2 new messages and 1 appointment reminder",
    });
  };

  const handleProfileClick = () => {
    toast.info("Profile options", {
      description: "Profile settings will be available soon",
    });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            onChange={(e) => {
              if (e.target.value) {
                toast.info("Search feature", {
                  description: "Search functionality will be implemented soon",
                });
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleProfileClick}
        >
          <User className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
