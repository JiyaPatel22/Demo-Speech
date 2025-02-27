
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

interface GoalTrackingProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

interface Goal {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  start_date: string;
  target_date: string;
  status: string;
}

export const GoalTracking = ({ dateRange }: GoalTrackingProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('patient_goals')
        .select('*')
        .eq('patient_id', user.id)
        .gte('start_date', dateRange.from.toISOString())
        .lte('target_date', dateRange.to.toISOString());

      if (error) {
        console.error('Error fetching goals:', error);
        return;
      }

      setGoals(data || []);
    };

    fetchGoals();
  }, [dateRange]);

  const chartData = goals.map(goal => ({
    name: goal.goal_type,
    progress: (goal.current_value / goal.target_value) * 100,
    fill: goal.status === 'achieved' ? '#82ca9d' : 
          goal.status === 'in_progress' ? '#8884d8' : '#ff8042'
  }));

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Goal Progress</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="10%" 
              outerRadius="80%" 
              data={chartData}
              startAngle={180} 
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="progress"
                background
                animationBegin={0}
                animationDuration={1500}
                cornerRadius={5}
                label={{
                  position: "insideStart",
                  fill: "#666"
                }}
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
