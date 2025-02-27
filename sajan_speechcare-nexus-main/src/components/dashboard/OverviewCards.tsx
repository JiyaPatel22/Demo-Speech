
import { motion } from "framer-motion";
import { Calendar, ChartLine, CheckSquare } from "lucide-react";

export const overviewCards = [
  {
    title: "Next Appointment",
    icon: <Calendar className="w-6 h-6" />,
    value: "Tomorrow, 2:00 PM",
    description: "Speech Therapy Session",
    color: "text-primary",
  },
  {
    title: "Therapy Progress",
    icon: <ChartLine className="w-6 h-6" />,
    value: "75%",
    description: "Overall Completion",
    color: "text-secondary",
  },
  {
    title: "Pending Tasks",
    icon: <CheckSquare className="w-6 h-6" />,
    value: "4",
    description: "Tasks to Complete",
    color: "text-accent",
  },
];

export const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {overviewCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
              {card.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
          <div className="text-2xl font-bold mb-1">{card.value}</div>
          <p className="text-gray-600 text-sm">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
