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

export interface About {
  id: string;
  text: string;
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
