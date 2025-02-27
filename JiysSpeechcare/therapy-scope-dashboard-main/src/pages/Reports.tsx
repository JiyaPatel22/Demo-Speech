
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Reports = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      title: "Weekly Progress Report",
      date: "2024-02-20",
      status: "Pending Review",
      type: "Progress",
    },
    {
      id: 2,
      title: "Treatment Plan Update",
      date: "2024-02-19",
      status: "Approved",
      type: "Treatment",
    },
    {
      id: 3,
      title: "Monthly Assessment",
      date: "2024-02-15",
      status: "Pending Review",
      type: "Assessment",
    },
  ];

  const handleGenerateReport = () => {
    toast.info("Navigating to report generation");
    navigate("/reports/new");
  };

  const handleViewReport = (reportId: number) => {
    toast.info("Opening report viewer");
    navigate(`/reports/${reportId}/view`);
  };

  const handleReviewReport = (reportId: number) => {
    toast.info("Opening report for review");
    navigate(`/reports/${reportId}/review`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {id ? `Reports for ${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}` : 'All Reports'}
              </h1>
              <Button onClick={handleGenerateReport}>Generate New Report</Button>
            </div>
            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{report.title}</span>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        report.status === "Pending Review"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {report.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Date: {report.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Type: {report.type}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewReport(report.id)}
                        >
                          View
                        </Button>
                        {report.status === "Pending Review" && (
                          <Button onClick={() => handleReviewReport(report.id)}>
                            Review
                          </Button>
                        )}
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

export default Reports;
