
import { ChartLine, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressNavProps {
  selectedTab: "overview" | "reports" | "goals";
  setSelectedTab: (tab: "overview" | "reports" | "goals") => void;
}

export const ProgressNav = ({ selectedTab, setSelectedTab }: ProgressNavProps) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: ChartLine },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "goals", label: "Goals", icon: Target },
  ];

  return (
    <div className="flex gap-4 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={selectedTab === tab.id ? "default" : "outline"}
          onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
          className="min-w-[120px]"
        >
          <tab.icon className="w-4 h-4 mr-2" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
