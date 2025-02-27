
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";

const RescheduleAppointment = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Appointment rescheduled successfully!");
    navigate("/schedule");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Reschedule Appointment</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Current Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Date</Label>
                    <p className="text-muted-foreground">February 20, 2024</p>
                  </div>
                  <div>
                    <Label>Current Time</Label>
                    <p className="text-muted-foreground">9:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Appointment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>New Date</Label>
                    <Calendar mode="single" className="rounded-md border" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Time</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select new time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/schedule")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Confirm Reschedule</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RescheduleAppointment;
