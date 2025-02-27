
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";

const recentMessages = [
  {
    sender: "Dr. Sarah Smith",
    message: "Great progress in today's session!",
    time: "2 hours ago",
  },
  {
    sender: "Dr. Michael Chen",
    message: "Don't forget to practice the exercises.",
    time: "Yesterday",
  },
];

const upcomingSessions = [
  {
    title: "Speech Therapy Session",
    date: "Mar 15, 2024",
    time: "2:00 PM",
    therapist: "Dr. Sarah Smith",
  },
  {
    title: "Progress Review",
    date: "Mar 18, 2024",
    time: "3:30 PM",
    therapist: "Dr. Michael Chen",
  },
];

export const ActivityFeed = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {recentMessages.map((message, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{message.sender}</h4>
                <p className="text-gray-600 text-sm">{message.message}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4">
          View All Messages
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium">{session.title}</h4>
                <p className="text-gray-600 text-sm">
                  {session.date} at {session.time}
                </p>
                <span className="text-xs text-gray-500">with {session.therapist}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4">
          View Full Schedule
        </Button>
      </motion.div>
    </div>
  );
};
