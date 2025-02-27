
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ChevronRight, Clock, CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4;
type SessionType = "initial" | "regular" | "followup" | "assessment";

const sessionTypes = [
  {
    id: "initial",
    title: "Initial Consultation",
    duration: "60 minutes",
    description: "First meeting to assess needs and create a treatment plan",
  },
  {
    id: "regular",
    title: "Regular Therapy",
    duration: "45 minutes",
    description: "Ongoing speech therapy session",
  },
  {
    id: "followup",
    title: "Follow-up Session",
    duration: "30 minutes",
    description: "Progress review and plan adjustment",
  },
  {
    id: "assessment",
    title: "Assessment",
    duration: "90 minutes",
    description: "Comprehensive evaluation of speech and language skills",
  },
];

// Demo time slots
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export const AppointmentScheduler = () => {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<SessionType | undefined>(
    undefined
  );
  const [notes, setNotes] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleConfirm = () => {
    // Demo confirmation
    toast.success("Appointment scheduled successfully!", {
      description: `${format(selectedDate!, "PPP")} at ${selectedTime}`,
    });
    // In a real app, we would send this to the backend
    console.log({
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      notes,
    });
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return selectedDate && selectedTime;
      case 2:
        return selectedType;
      case 3:
        return true; // Notes are optional
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="flex items-center"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s === step
                  ? "bg-primary text-white"
                  : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`h-1 w-16 mx-2 ${
                  s < step ? "bg-primary/20" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-6 rounded-xl"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-lg p-4"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Times</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Session Type</h2>
              <RadioGroup
                onValueChange={(value) => setSelectedType(value as SessionType)}
                value={selectedType}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {sessionTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem
                      value={type.id}
                      id={type.id}
                      className="sr-only"
                    />
                    <Label htmlFor={type.id} className="cursor-pointer">
                      <div className="font-semibold mb-1">{type.title}</div>
                      <div className="text-sm text-gray-600 mb-1">
                        Duration: {type.duration}
                      </div>
                      <div className="text-sm text-gray-500">
                        {type.description}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Additional Notes</h2>
              <div className="space-y-4">
                <div>
                  <Label>Special Requirements or Notes</Label>
                  <Textarea
                    placeholder="Enter any additional information or special requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Confirm Appointment</h2>
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="text-primary" />
                    <span className="font-semibold">
                      {format(selectedDate!, "PPP")} at {selectedTime}
                    </span>
                  </div>
                  <div className="text-gray-600 ml-9">
                    {sessionTypes.find((t) => t.id === selectedType)?.title}
                  </div>
                  {notes && (
                    <div className="mt-4 ml-9 text-sm text-gray-500">
                      <span className="font-medium">Notes:</span> {notes}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  By confirming, you agree to our cancellation policy. You can
                  reschedule or cancel up to 24 hours before the appointment.
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="ml-auto">
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepComplete()}
                  className="bg-primary hover:bg-primary/90"
                >
                  Next Step
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleConfirm}
                  className="bg-primary hover:bg-primary/90"
                >
                  Confirm Appointment
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
