
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { Check, X, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const ScheduleReview = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const appointments = [
    {
      id: 1,
      patientName: "John D.",
      therapistName: "Dr. Sarah Johnson",
      time: "09:00 AM",
      type: "Initial Assessment",
      status: "Pending Review",
    },
    {
      id: 2,
      patientName: "Emma S.",
      therapistName: "Dr. Michael Chen",
      time: "10:30 AM",
      type: "Follow-up Session",
      status: "Approved",
    },
    {
      id: 3,
      patientName: "Robert M.",
      therapistName: "Dr. Emily Williams",
      time: "02:00 PM",
      type: "Progress Review",
      status: "Pending Review",
    },
  ];

  const handleApprove = (id: number) => {
    toast.success("Appointment approved successfully");
  };

  const handleReject = (id: number) => {
    toast.error("Appointment rejected");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Schedule Review</h1>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Pending Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-muted-foreground">
                              with {appointment.therapistName}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                              {appointment.type}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                              onClick={() => handleApprove(appointment.id)}
                            >
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive"
                              onClick={() => handleReject(appointment.id)}
                            >
                              <X className="h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ScheduleReview;
