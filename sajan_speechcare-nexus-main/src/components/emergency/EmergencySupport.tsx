
import { Button } from "@/components/ui/button";
import {
  Phone,
  AlertCircle,
  Map,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

export const EmergencySupport = () => {
  const handleEmergencyCall = () => {
    toast.info("Connecting to emergency services...");
  };

  const emergencyResources = [
    {
      title: "Crisis Helpline",
      description: "24/7 Support Available",
      icon: <Phone className="w-5 h-5" />,
      action: "Call Now"
    },
    {
      title: "Urgent Care Locations",
      description: "Find nearest center",
      icon: <Map className="w-5 h-5" />,
      action: "View Map"
    },
    {
      title: "Contact Therapist",
      description: "Emergency consultation",
      icon: <MessageSquare className="w-5 h-5" />,
      action: "Message"
    }
  ];

  return (
    <div className="space-y-6">
      <Button
        variant="destructive"
        size="lg"
        className="w-full py-6"
        onClick={handleEmergencyCall}
      >
        <AlertCircle className="w-6 h-6 mr-2" />
        Emergency SOS
      </Button>

      <div className="grid gap-4">
        {emergencyResources.map((resource, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              {resource.icon}
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            </div>
            <Button variant="outline">
              {resource.action}
            </Button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
        <div className="flex items-center gap-2 text-destructive mb-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium">Important Notice</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          For life-threatening emergencies, please dial your local emergency services immediately.
        </p>
      </div>
    </div>
  );
};
