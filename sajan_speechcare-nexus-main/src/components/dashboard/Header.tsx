
import { Bell, User } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  notifications: number;
  onProfileClick?: () => void;
}

export const Header = ({ notifications, onProfileClick }: HeaderProps) => {
  const handleNotificationClick = () => {
    toast.info("Notifications panel coming soon!", {
      description: `You have ${notifications} unread notifications`,
    });
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">ST</span>
            </div>
            <span className="font-semibold text-lg">SpeechCare</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleNotificationClick}
              aria-label={`${notifications} unread notifications`}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onProfileClick}
            >
              <User className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
