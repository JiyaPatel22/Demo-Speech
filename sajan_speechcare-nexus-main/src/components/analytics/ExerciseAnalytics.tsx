
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface ExerciseAnalyticsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

interface ExerciseCompletion {
  exercise_name: string;
  success_rate: number;
  duration_minutes: number;
  completed_at: string;
}

export const ExerciseAnalytics = ({ dateRange }: ExerciseAnalyticsProps) => {
  const [completions, setCompletions] = useState<ExerciseCompletion[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('exercise_completions')
        .select('*')
        .eq('patient_id', user.id)
        .gte('completed_at', dateRange.from.toISOString())
        .lte('completed_at', dateRange.to.toISOString())
        .order('completed_at', { ascending: true });

      if (error) {
        console.error('Error fetching exercise completions:', error);
        return;
      }

      setCompletions(data || []);
    };

    fetchExercises();
  }, [dateRange]);

  const chartData = completions.reduce((acc: any[], completion) => {
    const date = format(new Date(completion.completed_at), 'MMM dd');
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.totalExercises++;
      existing.avgSuccessRate = (existing.avgSuccessRate * (existing.totalExercises - 1) + completion.success_rate) / existing.totalExercises;
      existing.totalDuration += completion.duration_minutes;
    } else {
      acc.push({
        date,
        totalExercises: 1,
        avgSuccessRate: completion.success_rate,
        totalDuration: completion.duration_minutes
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Exercise Analytics</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="avgSuccessRate" name="Success Rate (%)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="totalDuration" name="Duration (min)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
