
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

export const SessionHistory = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4">Session History</h3>
      <div className="space-y-4">
        {sessionHistory.map((session, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/50 space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-medium">{session.type}</span>
              <span className="text-sm text-gray-500">{session.date}</span>
            </div>
            <p className="text-sm text-gray-600">Focus: {session.focus}</p>
            <p className="text-sm">{session.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
