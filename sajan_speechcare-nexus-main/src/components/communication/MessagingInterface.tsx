
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileUp, CheckCheck, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "patient" | "therapist";
  timestamp: Date;
  read: boolean;
  attachments?: { name: string; url: string }[];
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi John, how are you progressing with the exercises I shared last session?",
    sender: "therapist",
    timestamp: new Date(2024, 2, 18, 10, 30),
    read: true,
  },
  {
    id: "2",
    content: "I've been practicing daily and noticing improvement in my R sounds!",
    sender: "patient",
    timestamp: new Date(2024, 2, 18, 11, 15),
    read: true,
  },
  {
    id: "3",
    content: "That's great to hear! I'm attaching some additional exercises for you to try.",
    sender: "therapist",
    timestamp: new Date(2024, 2, 18, 11, 20),
    read: true,
    attachments: [
      { name: "R-sound-exercises.pdf", url: "#" },
    ],
  },
];

export const MessagingInterface = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "patient",
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    toast.success("Message sent");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[600px] bg-white rounded-xl shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Dr. Sarah Thompson</h2>
        <p className="text-sm text-gray-500">Speech Therapist</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                message.sender === "patient"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/10"
              } rounded-lg p-3`}
            >
              <p>{message.content}</p>
              {message.attachments && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-2 p-2 bg-white/10 rounded"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                {message.read && <CheckCheck className="w-4 h-4 opacity-70" />}
                {!message.read && <Clock className="w-4 h-4 opacity-70" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toast.info("File upload coming soon")}
          >
            <FileUp className="w-4 h-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
