
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";

const progressData = [
  { session: 1, improvement: 65, practice: 45, needImprovement: 35 },
  { session: 2, improvement: 70, practice: 50, needImprovement: 30 },
  { session: 3, improvement: 75, practice: 55, needImprovement: 25 },
  { session: 4, improvement: 85, practice: 60, needImprovement: 15 },
  { session: 5, improvement: 90, practice: 65, needImprovement: 10 },
];

const therapyData = [
  { name: "Completed", value: 75 },
  { name: "Pending", value: 25 },
];

const comparativeData = [
  { technique: "Articulation", score: 85 },
  { technique: "Fluency", score: 75 },
  { technique: "Voice", score: 90 },
  { technique: "Language", score: 70 },
];

const COLORS = ["#0EA5E9", "#F97316"];

const Analytics = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
            </div>
            <Button variant="outline">See All</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Patient Progress Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-up">
              <h2 className="text-lg font-medium mb-4">Patient Progress</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="improvement"
                      stroke="#0EA5E9"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="practice"
                      stroke="#22C55E"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="needImprovement"
                      stroke="#F97316"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Therapy Effectiveness Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-up delay-[100ms]">
              <h2 className="text-lg font-medium mb-4">Therapy Effectiveness</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={therapyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {therapyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comparative Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-up delay-[200ms]">
            <h2 className="text-lg font-medium mb-4">Therapy Techniques Comparison</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="technique" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
