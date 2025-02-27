
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Mic, MicOff, Monitor, Video, VideoOff, PhoneOff } from "lucide-react";
import { toast } from "sonner";

interface VideoConsultationProps {
  sessionId?: string;
  onClose: () => void;
}

export const VideoConsultation = ({ sessionId, onClose }: VideoConsultationProps) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnecting(false);
      toast.success("Connected to session");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast(isAudioEnabled ? "Microphone disabled" : "Microphone enabled");
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast(isVideoEnabled ? "Camera disabled" : "Camera enabled");
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");
  };

  const endCall = () => {
    toast.info("Ending session...");
    onClose();
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-lg font-medium">Connecting to your session...</p>
          <p className="text-sm text-muted-foreground">Please wait while we establish a secure connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Main video area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="relative bg-muted rounded-xl overflow-hidden">
          {isVideoEnabled ? (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
              <p className="text-lg font-medium">Your Video</p>
            </div>
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <p className="text-lg font-medium">Camera Off</p>
            </div>
          )}
        </div>
        <div className="relative bg-muted rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center">
            <p className="text-lg font-medium">Therapist's Video</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-20 bg-muted/50 border-t flex items-center justify-center gap-4 px-4">
        <Button
          variant="outline"
          size="icon"
          className={!isAudioEnabled ? "bg-destructive text-destructive-foreground" : ""}
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={!isVideoEnabled ? "bg-destructive text-destructive-foreground" : ""}
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={isScreenSharing ? "bg-primary text-primary-foreground" : ""}
          onClick={toggleScreenShare}
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={endCall}
        >
          <PhoneOff className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
