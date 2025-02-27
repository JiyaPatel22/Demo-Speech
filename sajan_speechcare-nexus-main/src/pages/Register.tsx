
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success("Registration successful! Please check your email to confirm your account.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600">Start your therapy journey today</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
