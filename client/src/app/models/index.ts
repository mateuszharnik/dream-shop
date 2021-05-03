export interface Alert {
  id: string;
  message: string;
  key: string;
}

export interface Comment {
  _id: string;
  product_id: string;
  user_id: string;
  author_image: string;
  content: string;
  purify_content: string;
  author: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface CommentsWithPagination {
  total: number;
  comments: Comment[];
  pagination: Pagination;
}

export interface Alerts {
  server: string;
  error: string;
  success: string;
}

export interface Pagination {
  remaining: number;
  skip: number;
  limit: number;
}

export interface ProductWithPagination {
  total: number;
  products: Product[];
  pagination: Pagination;
}

export interface MessageWithPagination {
  total: number;
  messages: Message[];
  pagination: Pagination;
}

export interface EmailWithPagination {
  total: number;
  emails: Email[];
  pagination: Pagination;
}

export interface Credentials {
  password: string;
  username: string;
}

export interface DeleteResponse {
  message: string;
  items: number;
}

export interface OrderContact {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  zip_code: string;
  street: string;
  street_number: string;
}

export interface OrderProduct {
  _id: string;
  name: string;
  company_name: string;
  quantity: number;
  price: string;
  category_name: string;
  thumbnail: string;
}

export interface Order {
  _id?: string;
  contact: OrderContact;
  products: OrderProduct[];
  isPaid?: boolean;
  isAccepted?: boolean;
  isRefused?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface OrderWithPagination {
  total: number;
  orders: Order[];
  pagination: Pagination;
}

export interface ProductCategoryWithPagination {
  total: number;
  categories: ProductCategory[];
}

export interface ProductCategory {
  _id?: string;
  category?: string;
  name: string;
  count?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface DashboardNavigation {
  link: string;
  text: string;
  title: string;
  icon: string;
}

export interface Regulations {
  name: string;
  content: string;
  purify_content: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ProductInCart {
  _id: string;
  quantity: number;
}

export interface Product {
  _id?: string;
  name: string;
  category: string;
  company_name: string;
  category_name: string;
  thumbnail: string;
  gallery: string[];
  price: string;
  quantity: number;
  selled: number;
  description: string;
  purify_description: string;
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
  street: string;
  street_number: string;
  city: string;
  zip_code: string;
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
  purify_information: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface Slide {
  img: string;
  href: string;
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
  purify_title: string;
  content: string;
  purify_content: string;
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

export interface MapEvent {
  lat: number;
  lng: number;
}

export interface SortOption {
  sort: 'popularnosc' | 'cena' | 'alfabet';
  sortType: 'asc' | 'desc';
}

export interface CompanyNameFilters {
  name: string;
  items: number;
}

export interface Filter {
  _id: string;
  category: string;
  filters: {
    company_name: CompanyNameFilters[];
  };
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ProductParams {
  skip?: number;
  limit?: number;
  category?: string;
  available?: boolean;
  search?: string;
  sort?: 'popularnosc' | 'cena' | 'alfabet';
  sortType?: 'asc' | 'desc';
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  purify_subject: string;
  message: string;
  purify_message: string;
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
