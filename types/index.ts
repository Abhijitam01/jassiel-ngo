export interface Cause {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
  goal?: number;
  raised?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  location: string;
  time?: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  interests?: string[];
  availability?: string;
}

export interface DonationFormData {
  amount: number;
  name: string;
  email: string;
  phone: string;
  anonymous?: boolean;
  causeId?: string;
}

