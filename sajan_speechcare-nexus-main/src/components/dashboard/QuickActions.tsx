
import { motion } from "framer-motion";
import { Plus, MessageCircle, ChartLine, Video } from "lucide-react";

interface QuickActionsProps {
  onSchedule: () => void;
  onProgress: () => void;
  onMessage: () => void;
  onTherapy: () => void;
}

export const QuickActions = ({ onSchedule, onProgress, onMessage, onTherapy }: QuickActionsProps) => {
  const quickActions = [
    {
      title: "Join Virtual Therapy 🎥",
      icon: <Video className="w-5 h-5" />,
      action: onTherapy,
      color: "bg-accent",
      isHighlighted: true,
    },
    {
      title: "Schedule Appointment",
      icon: <Plus className="w-5 h-5" />,
      action: onSchedule,
      color: "bg-primary",
      isHighlighted: false,
    },
    {
      title: "View Progress",
      icon: <ChartLine className="w-5 h-5" />,
      action: onProgress,
      color: "bg-secondary",
      isHighlighted: false,
    },
    {
      title: "Message Therapist",
      icon: <MessageCircle className="w-5 h-5" />,
      action: onMessage,
      color: "bg-accent/80",
      isHighlighted: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickActions.map((action, index) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={action.action}
          className={`${action.color} text-white p-4 rounded-xl flex items-center gap-3 hover:opacity-90 transition-opacity ${
            action.isHighlighted ? 'ring-2 ring-accent ring-offset-2 shadow-lg scale-105' : ''
          }`}
        >
          {action.icon}
          <span className="font-medium">{action.title}</span>
        </motion.button>
      ))}
    </div>
  );
};
