
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mic, Upload, Save, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SessionNote {
  id: string;
  patient_id: string;
  summary: string | null;
  real_time_notes: string[] | null;
  recommendations: string[] | null;
  next_session_goals: string[] | null;
  session_date: string;
  status: string;
}

export const SessionDocumentation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [sessionNotes, setSessionNotes] = useState<SessionNote | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    initializeMediaRecorder();
  }, []);

  const initializeMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, e.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          
          try {
            const { data, error } = await supabase.functions.invoke('transcribe-audio', {
              body: { audio: base64Audio }
            });

            if (error) throw error;
            
            setCurrentNote((prev) => prev + ' ' + data.text);
          } catch (error) {
            console.error('Transcription error:', error);
            toast.error('Failed to transcribe audio');
          }
        };

        reader.readAsDataURL(audioBlob);
      };

      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Media recorder error:', error);
      toast.error('Failed to initialize voice recording');
    }
  };

  const startRecording = () => {
    if (mediaRecorder && !isRecording) {
      setAudioChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
      toast.info('Recording started');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
    }
  };

  const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to upload files');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('session-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  const saveNotes = async () => {
    if (!currentNote) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to save notes');
      return;
    }

    try {
      const { error } = await supabase
        .from('session_notes')
        .insert({
          patient_id: user.id,
          real_time_notes: [currentNote],
          session_date: new Date().toISOString(),
          status: 'active'
        });

      if (error) throw error;

      toast.success('Notes saved successfully');
      setCurrentNote('');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save notes');
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Session Documentation</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={isRecording ? stopRecording : startRecording}
            className={isRecording ? "bg-red-100 hover:bg-red-200" : ""}
          >
            <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" asChild>
            <label>
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleAttachmentUpload}
              />
            </label>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <label>
              <Upload className="h-4 w-4" />
              <input
                type="file"
                className="hidden"
                onChange={handleAttachmentUpload}
              />
            </label>
          </Button>
        </div>
      </div>

      <Textarea
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="Enter session notes..."
        className="min-h-[200px]"
      />

      <div className="flex justify-end">
        <Button onClick={saveNotes}>
          <Save className="w-4 h-4 mr-2" />
          Save Notes
        </Button>
      </div>
    </div>
  );
};
