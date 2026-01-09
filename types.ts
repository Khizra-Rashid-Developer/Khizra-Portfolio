export interface Project {
  title: string;
  description: string;
  link: string;
  tech: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100 for charts
  category: 'Technical' | 'Tools' | 'Office';
  status?: string; // e.g., "In Progress"
}

export interface Certification {
  title: string;
  issuer: string;
  imageFileName: string;
}

export interface Internship {
  company: string;
  role: string;
  domain: string;
  imageFileName: string;
}

export interface Education {
  institution: string;
  degree: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
