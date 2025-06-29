import { create } from 'zustand';
import { supabase, type Project, type Skill, type Experience } from '../lib/supabase';

interface PortfolioState {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  fetchSkills: () => Promise<void>;
  fetchExperiences: () => Promise<void>;
  submitContactForm: (data: { name: string; email: string; message: string }) => Promise<boolean>;
};

export const usePortfolio = create<PortfolioState>((set) => ({
  projects: [],
  skills: [],
  experiences: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    const { data } = await supabase.from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) set({ projects: data });
    set({ loading: false });
  },

  fetchSkills: async () => {
    const { data } = await supabase.from('skills')
      .select('*')
      .order('name', { ascending: true });

    if (data) set({ skills: data });
  },

  fetchExperiences: async () => {
    const { data } = await supabase.from('experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (data) set({ experiences: data });
  },

  submitContactForm: async (contactData) => {
    const { error } = await supabase.from('contact_submissions')
      .insert([contactData]);

    return !error;
  }
}));