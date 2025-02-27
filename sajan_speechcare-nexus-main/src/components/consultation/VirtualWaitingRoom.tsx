
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, SignalHigh } from "lucide-react";

interface VirtualWaitingRoomProps {
  appointmentTime: string;
  doctorName: string;
  onJoinSession: () => void;
}

export const VirtualWaitingRoom = ({ 
  appointmentTime, 
  doctorName, 
  onJoinSession 
}: VirtualWaitingRoomProps) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Virtual Waiting Room</h2>
            <p className="text-muted-foreground">Your therapist will be with you shortly</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <SignalHigh className="w-4 h-4 text-green-500" />
            <span className="text-green-600">Connection Excellent</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p>Appointment Time: {appointmentTime}</p>
          </div>
          <p>Doctor: Dr. {doctorName}</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium mb-2">Preparing for your session:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Ensure you're in a quiet, private space</li>
            <li>Test your camera and microphone</li>
            <li>Have any relevant materials ready</li>
            <li>Close unnecessary browser tabs</li>
          </ul>
        </div>

        <Button 
          className="w-full"
          onClick={onJoinSession}
        >
          Join Session
        </Button>
      </div>
    </div>
  );
};
