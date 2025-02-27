
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Schedule = () => {
  const navigate = useNavigate();
  
  const schedule = [
    {
      time: "09:00 AM",
      therapist: "Dr. Sarah Johnson",
      patient: "John D.",
      type: "Initial Assessment",
    },
    {
      time: "10:30 AM",
      therapist: "Dr. Michael Chen",
      patient: "Emma S.",
      type: "Follow-up Session",
    },
    {
      time: "02:00 PM",
      therapist: "Dr. Emily Williams",
      patient: "Robert M.",
      type: "Progress Review",
    },
  ];

  const handleAddAppointment = () => {
    toast.info("Navigating to new appointment form");
    navigate("/schedule/new");
  };

  const handleReschedule = (time: string) => {
    toast.info(`Rescheduling appointment at ${time}`);
    navigate("/schedule/reschedule");
  };

  const handleJoinSession = (time: string) => {
    toast.info(`Joining session at ${time}`);
    navigate("/session-room");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Today's Schedule</h1>
              <Button onClick={handleAddAppointment}>Add Appointment</Button>
            </div>
            <div className="grid gap-4">
              {schedule.map((appointment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{appointment.time}</span>
                      <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {appointment.type}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.therapist}</p>
                        <p className="text-sm text-muted-foreground">
                          Patient: {appointment.patient}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleReschedule(appointment.time)}
                        >
                          Reschedule
                        </Button>
                        <Button onClick={() => handleJoinSession(appointment.time)}>
                          Join Session
                        </Button>
                      </div>
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

export default Schedule;
