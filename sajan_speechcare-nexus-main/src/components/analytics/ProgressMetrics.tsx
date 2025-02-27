
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface MetricsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

interface SpeechMetric {
  metric_type: string;
  score: number;
  recorded_at: string;
}

export const ProgressMetrics = ({ dateRange }: MetricsProps) => {
  const [metrics, setMetrics] = useState<SpeechMetric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('speech_metrics')
        .select('*')
        .eq('patient_id', user.id)
        .gte('recorded_at', dateRange.from.toISOString())
        .lte('recorded_at', dateRange.to.toISOString())
        .order('recorded_at', { ascending: true });

      if (error) {
        console.error('Error fetching metrics:', error);
        return;
      }

      setMetrics(data || []);
    };

    fetchMetrics();
  }, [dateRange]);

  const chartData = metrics.reduce((acc: any[], metric) => {
    const date = format(new Date(metric.recorded_at), 'MMM dd');
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing[metric.metric_type] = metric.score;
    } else {
      acc.push({
        date,
        [metric.metric_type]: metric.score
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Speech Progress</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="clarity" stroke="#8884d8" />
              <Line type="monotone" dataKey="fluency" stroke="#82ca9d" />
              <Line type="monotone" dataKey="articulation" stroke="#ffc658" />
              <Line type="monotone" dataKey="pronunciation" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
