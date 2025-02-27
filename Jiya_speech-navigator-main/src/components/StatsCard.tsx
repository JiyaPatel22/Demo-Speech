
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <div className={cn("p-6 bg-white rounded-xl shadow-sm animate-fade-up", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              "text-xs font-medium",
              trend.value >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.value}%
          </span>
          <span className="text-xs text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
