
import { motion } from "framer-motion";
import { FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const sessionHistory = [
  {
    date: "March 18, 2024",
    type: "Regular Session",
    focus: "Articulation",
    progress: "Good improvement in R sound production",
  },
  {
    date: "March 15, 2024",
    type: "Assessment",
    focus: "Overall Progress",
    progress: "Significant progress in fluency",
  },
];

const recentAchievements = [
  {
    id: 1,
    title: "Speech Clarity Master",
    date: "March 15, 2024",
    description: "Achieved 90% accuracy in consonant pronunciation",
  },
  {
    id: 2,
    title: "Fluency Champion",
    date: "March 10, 2024",
    description: "Completed 5 consecutive sessions without blocks",
  },
];

export const ReportsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Session Summaries */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Session Summaries</h3>
        <div className="space-y-4">
          {sessionHistory.map((session, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{session.date}</span>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Report
                </Button>
              </div>
              <p className="text-sm text-gray-600">{session.progress}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Achievement Certificates</h3>
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-lg bg-white/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <span className="text-sm text-gray-500">{achievement.date}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
