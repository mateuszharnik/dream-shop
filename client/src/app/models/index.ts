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

export interface Credentials {
  password: string;
  username: string;
}

export interface DeleteResponse {
  message: string;
  items: number;
}

export interface ProductCategory {
  _id?: string;
  category?: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface Product {
  _id?: string;
  name: string;
  category: string;
  thumbnail: string;
  short_description: string;
  price: string;
  quantity: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface FAQs {
  icon: string;
  title: string;
  category: string;
  link: string;
  questions: FAQ[];
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
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
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
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
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
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
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
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface Map {
  _id?: string;
  latlng: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface UserEmail {
  email: string;
}

export interface Response {
  message: string;
}

export interface User {
  _id?: string;
  name: string;
  username: string;
  email: string;
  avatar: string | ArrayBuffer;
  roles: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface UserWithToken {
  user: User;
  token?: string;
}

export interface Email {
  _id?: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface Passwords {
  password: string;
  confirm_password: string;
}
