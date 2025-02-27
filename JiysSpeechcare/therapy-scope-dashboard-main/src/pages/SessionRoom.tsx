
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  MonitorUp,
  MonitorOff,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SessionRoom = () => {
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast.info(`Camera turned ${isCameraOn ? 'off' : 'on'}`);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast.info(`Microphone turned ${isMicOn ? 'off' : 'on'}`);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(`Screen sharing ${isScreenSharing ? 'stopped' : 'started'}`);
  };

  const endCall = () => {
    toast.info("Ending session...");
    window.close();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Therapy Session</h1>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>2 Participants</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            You (Therapist)
          </div>
        </div>
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            Patient
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-background border-t flex justify-center items-center gap-4">
        <Button
          variant={isCameraOn ? "outline" : "secondary"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleCamera}
        >
          {isCameraOn ? <Video /> : <VideoOff />}
        </Button>
        <Button
          variant={isMicOn ? "outline" : "secondary"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleMic}
        >
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>
        <Button
          variant={isScreenSharing ? "secondary" : "outline"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleScreenShare}
        >
          {isScreenSharing ? <MonitorOff /> : <MonitorUp />}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={endCall}
        >
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};

export default SessionRoom;
