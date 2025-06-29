import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  image_url: string;
  featured: boolean;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency_level: number;
  icon_url: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  location: string;
  company_url?: string;
  is_current: boolean;
};