import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";

const TherapistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API
  const therapist = {
    name: id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Therapist Name',
    specialty: "Speech Language Therapy",
    patients: 15,
    maxPatients: 20,
    successRate: 92,
    experience: "8 years",
    certifications: ["ASHA CCC-SLP", "PROMPT Certified", "LSVT Certified"],
    currentCaseload: [
      { name: "Patient A", progress: 75 },
      { name: "Patient B", progress: 60 },
      { name: "Patient C", progress: 85 },
    ],
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{therapist.name}</h1>
              <Button onClick={() => navigate('/schedule-review')}>Schedule Review</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{therapist.patients} / {therapist.maxPatients}</span>
                      <span>{Math.round((therapist.patients / therapist.maxPatients) * 100)}%</span>
                    </div>
                    <Progress value={(therapist.patients / therapist.maxPatients) * 100} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {therapist.successRate}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{therapist.experience}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Caseload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {therapist.currentCaseload.map((patient) => (
                      <div key={patient.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{patient.name}</span>
                          <span>{patient.progress}%</span>
                        </div>
                        <Progress value={patient.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {therapist.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full inline-block mr-2"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TherapistDetails;
