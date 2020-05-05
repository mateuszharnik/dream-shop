export interface Alert {
  id: string;
  message: string;
  key: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  img: string;
  description: string;
  price: string;
  quantity: number;
  fullDescription: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Contact {
  _id?: string;
  email: string;
  phone: string;
  nip: string;
  address: {
    street: string;
    street_number: string;
    city: string;
    zip_code: string;
  };
  working_hours: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Navigation {
  isOpen: boolean;
  isDisabled: boolean;
  isAnimated: boolean;
  animationTime: number;
}

export interface About {
  _id?: string;
  information: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Slide {
  img: string;
  href: string;
}

export interface Links {
  id: string;
  category: string;
  title: string;
  link?: string;
  links?: Links[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface SocialMediaLinks {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface FAQs {
  id: string;
  category: string;
  title: string;
  icon: string;
  questions: FAQ[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface FAQ {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Map {
  _id?: string;
  latlng: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface User {
  name: string;
  username: string;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface EmailsList {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
