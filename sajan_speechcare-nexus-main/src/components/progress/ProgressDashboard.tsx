
import { useState } from "react";
import { ProgressNav } from "./ProgressNav";
import { OverviewSection } from "./OverviewSection";
import { ReportsSection } from "./ReportsSection";
import { GoalsSection } from "./GoalsSection";

export const ProgressDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<"overview" | "reports" | "goals">("overview");

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <ProgressNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      {selectedTab === "overview" && <OverviewSection />}
      {selectedTab === "reports" && <ReportsSection />}
      {selectedTab === "goals" && <GoalsSection />}
    </div>
  );
};
