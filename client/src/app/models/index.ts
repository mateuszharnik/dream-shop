export interface Alert {
  id: string;
  message: string;
  key: string;
}

export interface Alerts {
  server: string;
  error: string;
  success: string;
}

export interface Product {
  _id?: string;
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

export interface SocialMedia {
  _id?: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface FAQCategories {
  _id?: string;
  category: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface FAQ {
  _id?: string;
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
  _id?: string;
  name: string;
  username: string;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Email {
  _id?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
