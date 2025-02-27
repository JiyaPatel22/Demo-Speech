
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yhyeapusdgjscqvnjlof.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeWVhcHVzZGdqc2Nxdm5qbG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NDM0ODksImV4cCI6MjA1NTUxOTQ4OX0.GhVBY_ulGmUnW4yCLLVMNzpH4_rm7w7287AVVQGKtv4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
