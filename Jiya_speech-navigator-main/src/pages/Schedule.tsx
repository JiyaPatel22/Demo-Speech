import { useState } from "react";
import { ArrowLeft, Star, X } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Patient {
  name: string;
  age: number;
  condition: string;
  history: string;
  appointmentTime: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  patient?: Patient;
}

interface Doctor {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  image: string;
  availableSlots: TimeSlot[];
}

const getAvailableSlotsForDate = (doctorId: string, date: Date): TimeSlot[] => {
  // Generate different schedules based on day of week
  const dayOfWeek = format(date, "E").toLowerCase();
  
  const baseSlots: TimeSlot[] = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "12:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
  ];

  // Make some slots unavailable based on the day
  return baseSlots.map(slot => {
    if (dayOfWeek === "mon" && slot.time === "09:00") {
      return {
        time: "09:00",
        available: false,
        patient: {
          name: "Emily Parker",
          age: 7,
          condition: "Speech Delay",
          history: "Regular therapy since January 2024",
          appointmentTime: "09:00 AM"
        }
      };
    }
    if (dayOfWeek === "wed" && slot.time === "14:00") {
      return {
        time: "14:00",
        available: false,
        patient: {
          name: "James Wilson",
          age: 5,
          condition: "Articulation Disorder",
          history: "First appointment",
          appointmentTime: "02:00 PM"
        }
      };
    }
    if (dayOfWeek === "fri" && slot.time === "11:00") {
      return {
        time: "11:00",
        available: false,
        patient: {
          name: "Sophie Chen",
          age: 6,
          condition: "Stuttering",
          history: "Monthly checkup",
          appointmentTime: "11:00 AM"
        }
      };
    }
    return slot;
  });
};

const doctors: Omit<Doctor, 'availableSlots'>[] = [
  {
    id: "1",
    name: "Olivia Wilson",
    title: "Consultant - Speech Therapy",
    rating: 4.9,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "2",
    name: "Jonathan Patterson",
    title: "Senior Speech Therapist",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "3",
    name: "Sarah Thompson",
    title: "Speech Language Pathologist",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "4",
    name: "Michael Chang",
    title: "Pediatric Speech Therapist",
    rating: 4.7,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
  }
];

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Generate week days dynamically based on current date
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(selectedDate), i);
    return {
      day: format(date, "EEE").toUpperCase(),
      date: format(date, "d"),
      fullDate: date,
    };
  });

  const handleSlotClick = (doctorId: string, slot: TimeSlot) => {
    if (!slot.available && slot.patient) {
      setSelectedPatient(slot.patient);
    } else if (slot.available) {
      setSelectedSlot(`${doctorId}-${slot.time}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">See your Schedule</h1>
            <p className="text-sm text-gray-500 mt-1">Book appointments with our speech therapists</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {weekDays.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.fullDate)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-colors",
                  format(selectedDate, "d") === day.date
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <span className="text-xs font-medium">{day.day}</span>
                <span className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full mt-1",
                  format(selectedDate, "d") === day.date && "bg-primary text-white"
                )}>
                  {day.date}
                </span>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            {format(selectedDate, "MMMM d, yyyy")}
          </p>
        </div>

        {/* Available Doctors */}
        <div className="space-y-6">
          {doctors.map((doctor) => {
            const availableSlots = getAvailableSlotsForDate(doctor.id, selectedDate);
            return (
              <div key={doctor.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary/10"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.title}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-600">
                        ({doctor.reviews} Reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availableSlots.map((slot) => (
                    <Button 
                      key={slot.time}
                      variant={slot.available ? "outline" : "ghost"}
                      className={cn(
                        "w-full",
                        !slot.available && "opacity-75 hover:bg-gray-100",
                        selectedSlot === `${doctor.id}-${slot.time}` && "border-primary text-primary"
                      )}
                      onClick={() => handleSlotClick(doctor.id, slot)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Patient Name</h4>
                <p className="text-lg font-medium">{selectedPatient.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Age</h4>
                <p>{selectedPatient.age} years old</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Condition</h4>
                <p>{selectedPatient.condition}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">History</h4>
                <p>{selectedPatient.history}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Appointment Time</h4>
                <p>{selectedPatient.appointmentTime}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
