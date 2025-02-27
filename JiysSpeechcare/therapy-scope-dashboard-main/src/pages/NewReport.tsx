
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const NewReport = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Report generated successfully!");
    navigate("/reports");
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
              <h1 className="text-2xl font-bold">Generate New Report</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title</Label>
                    <Input id="title" placeholder="Enter report title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Report Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress Report</SelectItem>
                        <SelectItem value="treatment">Treatment Plan</SelectItem>
                        <SelectItem value="assessment">Assessment Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Report Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Enter report details"
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/reports")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Generate Report</Button>
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

export default NewReport;
