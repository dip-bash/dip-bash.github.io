
export interface Identity {
  name: string;
  status: string;
  location: string;
  email: string;
  pronouns: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface About {
  roles: string[];
  bio: string;
}

export interface Project {
  title: string;
  description: string;
  github?: string;
  external?: string;
  icon: string;
}

export interface TechItem {
  name: string;
  icon?: string;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export interface Certification {
  title: string;
  link: string;
}

export interface PortfolioData {
  identity: Identity | null;
  about: About | null;
  projects: Project[];
  techStack: TechCategory[];
  certifications: Certification[];
}
