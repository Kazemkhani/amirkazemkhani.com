export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link: string;
  featured?: boolean;
  createdAt?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  tag: string;
  link: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface TimelineEvent {
  id: number;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate?: string;
  type: 'education' | 'work' | 'achievement';
  logo?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
