import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Bell, Eye, AlertCircle } from "lucide-react";
import { AppointmentScheduler } from "@/components/scheduling/AppointmentScheduler";
import { Header } from "@/components/dashboard/Header";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { MessagingInterface } from "@/components/communication/MessagingInterface";
import { ResourceLibrary } from "@/components/communication/ResourceLibrary";
import { ProfileManagement } from "@/components/profile/ProfileManagement";
import { TherapySession } from "@/components/therapy/TherapySession";
import { CommunityHub } from "@/components/community/CommunityHub";
import { SmartReminders } from "@/components/reminders/SmartReminders";
import { AccessibilityControls } from "@/components/accessibility/AccessibilityControls";
import { EmergencySupport } from "@/components/emergency/EmergencySupport";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Dashboard = () => {
  const [notifications] = useState(3);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'scheduler':
        return <AppointmentScheduler />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'messaging':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MessagingInterface />
            </div>
            <div>
              <ResourceLibrary />
            </div>
          </div>
        );
      case 'profile':
        return <ProfileManagement />;
      case 'therapy':
        return <TherapySession />;
      case 'community':
        return <CommunityHub />;
      case 'reminders':
        return <SmartReminders />;
      case 'accessibility':
        return <AccessibilityControls />;
      case 'emergency':
        return <EmergencySupport />;
      default:
        return (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
              <p className="text-gray-600">Here's an overview of your therapy journey</p>
            </motion.div>

            <ErrorBoundary>
              <OverviewCards />
            </ErrorBoundary>

            <QuickActions
              onSchedule={() => setCurrentView('scheduler')}
              onProgress={() => setCurrentView('analytics')}
              onMessage={() => setCurrentView('messaging')}
              onTherapy={() => setCurrentView('therapy')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('community')}
                className="h-auto py-4"
              >
                <Users className="w-5 h-5 mr-2" />
                Community Hub
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setCurrentView('reminders')}
                className="h-auto py-4"
              >
                <Bell className="w-5 h-5 mr-2" />
                Smart Reminders
              </Button>

              <Button 
                variant="outline"
                onClick={() => setCurrentView('accessibility')}
                className="h-auto py-4"
              >
                <Eye className="w-5 h-5 mr-2" />
                Accessibility Settings
              </Button>

              <Button 
                variant="outline"
                onClick={() => setCurrentView('emergency')}
                className="h-auto py-4"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Emergency Support
              </Button>
            </div>

            <ErrorBoundary>
              <ActivityFeed />
            </ErrorBoundary>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Header 
        notifications={notifications} 
        onProfileClick={() => setCurrentView('profile')} 
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {currentView !== 'dashboard' && (
              <Button
                variant="ghost"
                onClick={() => setCurrentView('dashboard')}
                className="mb-6"
              >
                ← Back to Dashboard
              </Button>
            )}

            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                {renderContent()}
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
