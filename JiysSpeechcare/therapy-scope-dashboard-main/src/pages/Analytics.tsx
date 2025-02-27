
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Session 1",
    "Patient Progress": 8,
    "Therapy Details": 8,
    "Therapist Performance": 4,
  },
  {
    name: "Session 2",
    "Patient Progress": 12,
    "Therapy Details": 10,
    "Therapist Performance": 8,
  },
  {
    name: "Session 4",
    "Patient Progress": 16,
    "Therapy Details": 10,
    "Therapist Performance": 10,
  },
  {
    name: "Session 5",
    "Patient Progress": 20,
    "Therapy Details": 23,
    "Therapist Performance": 6,
  },
];

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Supervisor Dashboard</h1>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Patient Progress"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Therapy Details"
                    fill="#60A5FA"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Therapist Performance"
                    fill="#34D399"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Review Plan</h2>
                <div className="space-y-4">
                  {/* Placeholder for review plan content */}
                  <div className="h-40 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="flex justify-between">
                    <Button variant="outline">Previous</Button>
                    <Button>Next</Button>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Provide Feedback</h2>
                <textarea
                  className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="A Short Description"
                />
                <Button className="mt-4 w-full">Submit Feedback</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
