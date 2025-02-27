
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ChartLine } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">ST</span>
            </div>
            <span className="font-semibold text-lg">SpeechCare</span>
          </button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-6">About SpeechCare</h1>
            <p className="text-lg text-gray-600 mb-12">
              We're dedicated to revolutionizing speech therapy through technology and personalized care.
              Our platform connects patients with expert therapists and provides tools for effective therapy management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book and manage appointments that fit your schedule with our intuitive calendar system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Stay connected with your therapist through our secure messaging platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <ChartLine className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed progress reports and analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
