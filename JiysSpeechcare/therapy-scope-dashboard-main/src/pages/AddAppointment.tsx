
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";

const AddAppointment = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Appointment scheduled successfully!");
    navigate("/schedule");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="therapist">Therapist</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapist" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="dr-williams">Dr. Emily Williams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Input id="patient" placeholder="Enter patient name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Calendar mode="single" className="rounded-md border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
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
                    <Button type="submit">Schedule Appointment</Button>
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

export default AddAppointment;
