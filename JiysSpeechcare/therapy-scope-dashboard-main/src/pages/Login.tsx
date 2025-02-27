
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    toast.success("Login successful!");
    navigate("/overview");
  };

  return (
    <SidebarProvider>
      <div className="min-h-[100vh] w-full grid place-items-center px-4 py-8 bg-background">
        <Card className="w-full max-w-[440px] shadow-lg">
          <CardHeader className="space-y-1 flex flex-col items-center text-center pb-8">
            <div className="h-14 w-14 bg-primary/10 flex items-center justify-center rounded-full mb-4">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <Button type="button" variant="link" className="px-0 font-medium">
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    className="h-12"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Button type="submit" className="w-full h-12 text-base">
                  Sign In
                </Button>
                <p className="text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-primary hover:underline font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Sign up
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

export default Login;
