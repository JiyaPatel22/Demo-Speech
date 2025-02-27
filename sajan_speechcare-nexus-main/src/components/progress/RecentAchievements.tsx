
import { Trophy } from "lucide-react";

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

export const RecentAchievements = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
      <div className="space-y-4">
        {recentAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-white/50"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              <span className="text-xs text-gray-500">{achievement.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
