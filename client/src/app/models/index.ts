export interface Alert {
  id: string;
  message: string;
  key: string;
}

export interface Contact {
  id: string;
  email: string;
  phone: string;
  nip: string;
  adress: {
    street: string;
    streetNumber: string;
    city: string;
    code: string;
  };
  workHours: string;
}

export interface Navigation {
  isOpen: boolean;
  isDisabled: boolean;
  isAnimated: boolean;
  animationTime: number;
}

export interface About {
  id: string;
  text: string;
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
}

export interface SocialMediaLinks {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface FAQs {
  id: string;
  category: string;
  title: string;
  icon: string;
  questions: FAQ[];
}

export interface FAQ {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface Map {
  latlng: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  image: string;
}

export interface EmailsList {
  id: string;
  email: string;
}
