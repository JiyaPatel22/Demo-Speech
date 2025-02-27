
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface SessionNote {
  id: string;
  patient_id: string;
  summary: string | null;
  real_time_notes: string[] | null;
  recommendations: string[] | null;
  next_session_goals: string[] | null;
  session_date: string;
  status: string;
}

interface Milestone {
  id: string;
  patient_id: string;
  title: string;
  description: string | null;
  achieved_date: string;
}

export const SessionHistory = () => {
  const [sessions, setSessions] = useState<SessionNote[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    fetchSessionHistory();
    fetchMilestones();
  }, []);

  const fetchSessionHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('session_notes')
      .select('*')
      .eq('patient_id', user.id)
      .order('session_date', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return;
    }

    setSessions(data || []);
  };

  const fetchMilestones = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('treatment_milestones')
      .select('*')
      .eq('patient_id', user.id)
      .order('achieved_date', { ascending: false });

    if (error) {
      console.error('Error fetching milestones:', error);
      return;
    }

    setMilestones(data || []);
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Session History</h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-lg bg-white/50 space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-medium">
                  {format(new Date(session.session_date), 'PPP')}
                </span>
              </div>
              {session.real_time_notes?.map((note, index) => (
                <p key={index} className="text-sm text-gray-600">{note}</p>
              ))}
              {session.recommendations?.length > 0 && (
                <div className="mt-2">
                  <h4 className="font-medium text-sm">Recommendations:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {session.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Treatment Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="p-4 rounded-lg bg-white/50 space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-medium">{milestone.title}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(milestone.achieved_date), 'PP')}
                </span>
              </div>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
