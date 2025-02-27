
import { useState } from "react";
import { ProgressMetrics } from "./ProgressMetrics";
import { ExerciseAnalytics } from "./ExerciseAnalytics";
import { GoalTracking } from "./GoalTracking";
import { ReportGenerator } from "./ReportGenerator";
import { DateRangePicker } from "./DateRangePicker";
import { addDays, subDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <DateRangePicker 
          dateRange={dateRange}
          onChange={setDateRange}
        />
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="progress">
          <ProgressMetrics dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="exercises">
          <ExerciseAnalytics dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="goals">
          <GoalTracking dateRange={dateRange} />
        </TabsContent>
        <TabsContent value="reports">
          <ReportGenerator dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
