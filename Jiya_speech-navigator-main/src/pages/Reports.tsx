
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Simulated data - in a real app, this would come from your database
const samplePatientData = {
  name: "John Doe",
  id: "PT0001",
  age: 35,
  gender: "Male",
  diagnosis: "Speech Apraxia",
  treatmentPlan: "Weekly speech therapy sessions focusing on articulation exercises",
  notes: "Patient shows steady improvement in consonant pronunciation",
};

const progressData = [
  { month: "Jan", progress: 30 },
  { month: "Feb", progress: 45 },
  { month: "Mar", progress: 55 },
  { month: "Apr", progress: 70 },
  { month: "May", progress: 85 },
];

const Reports = () => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
    // Implementation for PDF download would go here
  };

  const handleShare = () => {
    console.log("Sharing report...");
    // Implementation for sharing functionality would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Patient Reports</h1>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Report
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Patient Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-900">{samplePatientData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient ID</p>
                <p className="text-gray-900">{samplePatientData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-gray-900">{samplePatientData.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-900">{samplePatientData.gender}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis & Treatment Plan */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Diagnosis & Treatment Plan
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Diagnosis</p>
                <p className="text-gray-900">{samplePatientData.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Treatment Plan</p>
                <p className="text-gray-900">{samplePatientData.treatmentPlan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor's Notes</p>
                <p className="text-gray-900">{samplePatientData.notes}</p>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Report</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    dot={{ fill: "#0EA5E9" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compliance Tracking */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Therapy Compliance Tracking
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sessions Attended</span>
                <span className="text-gray-900 font-medium">12/15 (80%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Exercise Completion Rate</span>
                <span className="text-gray-900 font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Home Practice Adherence</span>
                <span className="text-gray-900 font-medium">90%</span>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Appointments
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-gray-900">Speech Therapy Session</p>
                  <p className="text-sm text-gray-500">Dr. Sarah Johnson</p>
                </div>
                <p className="text-sm text-gray-600">March 15, 2024 - 10:00 AM</p>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Progress Assessment</p>
                  <p className="text-sm text-gray-500">Dr. Michael Chen</p>
                </div>
                <p className="text-sm text-gray-600">March 22, 2024 - 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
