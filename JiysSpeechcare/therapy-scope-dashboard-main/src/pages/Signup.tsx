
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    toast.success("Signup successful!");
    navigate("/overview");
  };

  return (
    <SidebarProvider>
      <div className="min-h-[100vh] w-full grid place-items-center px-4 py-8 bg-background">
        <Card className="w-full max-w-[500px] shadow-lg">
          <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8">
            <div className="h-14 w-14 bg-primary/10 flex items-center justify-center rounded-full mb-4">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Create Supervisor Account</CardTitle>
            <CardDescription className="text-base">
              Enter your details to create your supervisor account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="h-12"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="h-12"
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="supervisor@example.com" 
                    className="h-12"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="h-12"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    className="h-12"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Button type="submit" className="w-full h-12 text-base">
                  Create Account
                </Button>
                <p className="text-center text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
};

export default Signup;
