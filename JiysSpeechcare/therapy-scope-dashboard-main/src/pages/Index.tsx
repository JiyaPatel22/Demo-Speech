
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KPICard } from "@/components/dashboard/KPICard";
import { TherapistCard } from "@/components/dashboard/TherapistCard";
import { Activity, Heart, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // This is a simple example. In a real app, use proper auth management

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  }, [isAuthenticated, navigate]);

  // Sample data - would be fetched from an API in a real app
  const kpiData = [
    {
      title: "Active Therapists",
      value: 24,
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Patients",
      value: 148,
      icon: Heart,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Patient Satisfaction",
      value: "92%",
      icon: Star,
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Weekly Sessions",
      value: 286,
      icon: Activity,
      trend: { value: 2, isPositive: false },
    },
  ];

  const therapists = [
    {
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg",
      patientLoad: 15,
      maxPatients: 20,
      successRate: 92,
      pendingReports: 2,
    },
    {
      name: "Dr. Michael Chen",
      image: "/placeholder.svg",
      patientLoad: 18,
      maxPatients: 20,
      successRate: 88,
      pendingReports: 1,
    },
    {
      name: "Dr. Emily Williams",
      image: "/placeholder.svg",
      patientLoad: 12,
      maxPatients: 20,
      successRate: 95,
      pendingReports: 0,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50">
        <DashboardSidebar />
        <div className="flex-1 ml-[var(--sidebar-width)] transition-all duration-300 ease-in-out">
          <Header />
          <main className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi) => (
                <KPICard key={kpi.title} {...kpi} />
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Active Therapists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {therapists.map((therapist) => (
                  <TherapistCard key={therapist.name} {...therapist} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
