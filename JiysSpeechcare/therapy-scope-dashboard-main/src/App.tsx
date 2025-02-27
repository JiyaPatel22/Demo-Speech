
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TherapistDetails from "./pages/TherapistDetails";
import Reports from "./pages/Reports";
import NewReport from "./pages/NewReport";
import ViewReport from "./pages/ViewReport";
import ReviewReport from "./pages/ReviewReport";
import Analytics from "./pages/Analytics";
import Schedule from "./pages/Schedule";
import ScheduleReview from "./pages/ScheduleReview";
import AddAppointment from "./pages/AddAppointment";
import RescheduleAppointment from "./pages/RescheduleAppointment";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SessionRoom from "./pages/SessionRoom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/overview" element={<Index />} />
          <Route path="/therapists" element={<TherapistDetails />} />
          <Route path="/therapists/:id" element={<TherapistDetails />} />
          <Route path="/therapists/:id/reports" element={<Reports />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/new" element={<NewReport />} />
          <Route path="/reports/:id/view" element={<ViewReport />} />
          <Route path="/reports/:id/review" element={<ReviewReport />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule-review" element={<ScheduleReview />} />
          <Route path="/schedule/new" element={<AddAppointment />} />
          <Route path="/schedule/reschedule" element={<RescheduleAppointment />} />
          <Route path="/session-room" element={<SessionRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
