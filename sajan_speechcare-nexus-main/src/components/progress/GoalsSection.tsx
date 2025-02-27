
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Articulation Improvement",
    progress: 75,
    totalSessions: 12,
    completedSessions: 9,
    nextMilestone: "Clear pronunciation of R sounds",
  },
  {
    id: 2,
    title: "Fluency Development",
    progress: 60,
    totalSessions: 10,
    completedSessions: 6,
    nextMilestone: "Smooth sentence transitions",
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

export const GoalsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Current Goals */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Current Goals</h3>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{goal.title}</h4>
                <span className="text-sm font-semibold">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Sessions: {goal.completedSessions}/{goal.totalSessions}</span>
                <span>Next: {goal.nextMilestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Recent Milestones</h3>
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-lg bg-white/50 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <span className="text-xs text-gray-500">{achievement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
