
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, ChartLine, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "Book and manage your therapy sessions with ease"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Direct Communication",
      description: "Stay connected with your therapist"
    },
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your therapy journey"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Personalized Care",
      description: "Tailored therapy plans for your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold">ST</span>
            </div>
            <span className="font-semibold text-lg">SpeechCare</span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Welcome to SpeechCare
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Transform Your Speech Therapy Journey
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Experience personalized speech therapy care with cutting-edge technology and expert guidance.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate('/register')}
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl"
                onMouseEnter={() => setHoveredFeature(feature.title)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`w-16 h-16 rounded-xl ${hoveredFeature === feature.title ? 'bg-primary' : 'bg-primary/10'} flex items-center justify-center mb-4 mx-auto transition-colors duration-200`}>
                  <div className={`${hoveredFeature === feature.title ? 'text-white' : 'text-primary'} transition-colors duration-200`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
