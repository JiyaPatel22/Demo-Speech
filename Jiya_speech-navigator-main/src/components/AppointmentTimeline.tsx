
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "canceled";
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    time: "09:00 AM",
    type: "Initial Assessment",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Mike Peterson",
    time: "10:30 AM",
    type: "Follow-up",
    status: "upcoming",
  },
  {
    id: "3",
    patientName: "Emma Davis",
    time: "02:00 PM",
    type: "Therapy Session",
    status: "upcoming",
  },
];

const AppointmentTimeline = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={cn(
              "p-4 rounded-lg border flex items-start gap-4 transition-all",
              appointment.status === "completed"
                ? "bg-gray-50 border-gray-100"
                : appointment.status === "upcoming"
                ? "bg-white border-primary/20"
                : "bg-gray-50 border-gray-100"
            )}
          >
            <div className="min-w-[60px] text-sm font-medium text-gray-600">
              {appointment.time}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {appointment.patientName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
            </div>
            <div className="ml-auto">
              <span
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  appointment.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "upcoming"
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTimeline;
