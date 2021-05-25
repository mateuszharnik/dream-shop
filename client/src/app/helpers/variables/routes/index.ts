import { ClientRoutes, ServerRoutes } from '@models/routes/index';

/* ====== Server Routes ====== */
export const serverRoutes: ServerRoutes = {
  home: '/',
  auth: '/auth',
  socialMedia: '/social-media',
  contact: '/contact',
  about: '/about',
  faq: '/faq',
  faqCategories: '/faq-categories',
  users: '/users',
  newsletter: '/newsletter',
  map: '/map',
  messages: '/messages',
  products: '/products',
  comments: '/comments',
  productCategories: '/product-categories',
  productFilters: '/product-filters',
  regulations: '/regulations',
  orders: '/orders',
};

/* ====== Client Routes ====== */
export const clientRoutes: ClientRoutes = {
  home: '/',
  pages: '/strony',
  admin: '/admin',
  recovery: '/odzyskaj',
  login: '/zaloguj',
  notFound: '/404',
  cart: '/koszyk',
  socialMedia: '/media-spolecznosciowe',
  contact: '/kontakt',
  about: '/o-nas',
  faq: '/najczesciej-zadawane-pytania',
  faqCategories: '/faq-categories',
  profile: '/profil',
  newsletter: '/newsletter',
  map: '/mapa',
  messages: '/wiadomosci',
  products: '/produkty',
  product: '/produkt',
  comments: '/comments',
  productCategories: '/product-categories',
  productFilters: '/product-filters',
  regulations: '/regulaminy',
  orders: '/zamowienia',
};
