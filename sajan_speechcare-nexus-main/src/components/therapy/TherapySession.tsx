
import React, { useState } from 'react';
import { VideoConsultation } from '../consultation/VideoConsultation';
import { VirtualWaitingRoom } from '../consultation/VirtualWaitingRoom';

export const TherapySession = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const handleJoinSession = () => {
    setIsSessionStarted(true);
  };

  const handleEndSession = () => {
    setIsSessionStarted(false);
  };

  if (isSessionStarted) {
    return <VideoConsultation onClose={handleEndSession} />;
  }

  return (
    <VirtualWaitingRoom
      appointmentTime="2:00 PM"
      doctorName="Sarah Thompson"
      onJoinSession={handleJoinSession}
    />
  );
};
