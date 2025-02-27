
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Clock, Star } from "lucide-react";
import { RecentAchievements } from "./RecentAchievements";
import { SessionHistory } from "./SessionHistory";

export const OverviewSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Overall Progress */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Therapy Progress</span>
              <span className="font-semibold">75%</span>
            </div>
            <Progress value={75} className="h-3" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/10">
            <Clock className="w-5 h-5 text-secondary mb-2" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-gray-600">Sessions Completed</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <Target className="w-5 h-5 text-primary mb-2" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-gray-600">Goals Achieved</div>
          </div>
          <div className="p-4 rounded-lg bg-accent/10">
            <Star className="w-5 h-5 text-accent mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">Milestones Reached</div>
          </div>
        </div>
      </div>

      <RecentAchievements />
      <SessionHistory />
    </motion.div>
  );
};
