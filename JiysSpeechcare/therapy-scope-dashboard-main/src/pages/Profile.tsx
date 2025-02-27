
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  
  const profile = {
    name: "Dr. Sarah Johnson",
    role: "Senior Therapist",
    email: "sarah.johnson@therapy.com",
    phone: "+1 (555) 123-4567",
    specialty: "Speech Language Therapy",
    experience: "8 years",
    certifications: ["ASHA CCC-SLP", "PROMPT Certified"],
  };

  const handleEditProfile = () => {
    toast.info("Navigating to profile editor");
    navigate("/profile/edit");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/50 dark:bg-gray-900">
        <DashboardSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Profile</h1>
              <Button onClick={handleEditProfile}>Edit Profile</Button>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                      <p className="text-muted-foreground">{profile.role}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-muted-foreground">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-muted-foreground">{profile.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Specialty</label>
                      <p className="text-muted-foreground">{profile.specialty}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Experience</label>
                      <p className="text-muted-foreground">{profile.experience}</p>
                    </div>
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

export default Profile;
