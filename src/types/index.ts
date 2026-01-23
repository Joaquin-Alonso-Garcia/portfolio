export interface Project {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency_level: number;
  icon_url: string | null;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  location: string | null;
  company_url: string | null;
  is_current: boolean;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}