
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo } from "./types";

export const fetchUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return {
    profile,
    user
  };
};

export const updateUserProfile = async (userId: string, updates: Partial<PersonalInfo>) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: updates.firstName,
      last_name: updates.lastName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) throw error;
};
