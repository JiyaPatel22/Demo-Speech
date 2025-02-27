
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Download, Printer, ArrowLeft } from "lucide-react";

const ViewReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const report = {
    id,
    title: "Weekly Progress Report",
    date: "2024-02-20",
    type: "Progress",
    content: "Detailed progress report content would appear here...",
    status: "Pending Review",
    author: "Dr. Sarah Johnson",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">View Report</h1>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-muted-foreground">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-muted-foreground">{report.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-muted-foreground">{report.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Author</p>
                    <p className="text-muted-foreground">{report.author}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Report Content</p>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <p className="text-muted-foreground">{report.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ViewReport;
