const aboutConstants = {
  ABOUT_NOT_FOUND: 'Informacje o sklepie nie istnieją.',
  ABOUT_NOT_UPDATED: 'Nie udało się zaktualizować informacji o sklepie.',
};

const productFiltersConstants = {
  FILTERS_NOT_FOUND: 'Nie udało się pobrać filtrów produktów.',
};

const mapConstants = {
  MAP_NOT_FOUND: 'Informacje o mapie nie istnieją.',
  MAP_NOT_UPDATED: 'Nie udało się zaktualizować koordynatów mapy.',
};

const messageConstants = {
  MESSAGE_NOT_FOUND: 'Wiadomość nie istnieje.',
  MESSAGES_NOT_FOUND: 'W bazie danych nie ma żadnych wiadomości.',
  MESSAGES_NOT_DELETED: 'Nie udało się usunąć wiadomości.',
  MESSAGE_NOT_DELETED: 'Nie udało się usunąć wiadomości.',
  MESSAGES_DELETED: 'Usunięto wszystkie wiadomości.',
  MESSAGE_NOT_CREATED: 'Nie udało się wysłać wiadomości.',
  MESSAGE_NOT_UPDATED: 'Nie udało się zaktualizować wiadomości.',
};

const newsletterConstants = {
  EMAIL_NOT_FOUND: 'Podany adres email nie znajduje się w bazie danych.',
  EMAILS_NOT_FOUND: 'Nie udało się pobrać adresów email.',
  EMAILS_NOT_DELETED: 'Nie udało się usunąć adresów email.',
  EMAIL_NOT_DELETED: 'Nie udało się usunąć adresu email.',
  EMAILS_DELETED: 'Usunięto wszystkie adresy email.',
  EMAIL_NOT_CREATED: 'Nie udało się zapisać adresu email.',
  EMAIL_ALREADY_EXIST: 'Adres email znajduje się już w bazie danych.',
};

const faqsConstants = {
  FAQ_ALREADY_EXIST: 'Pytanie znajduje się już w bazie danych.',
  FAQ_NOT_FOUND: 'Pytanie nie istnieje.',
  FAQ_NOT_UPDATED: 'Nie udało się zaktualizować pytania.',
  FAQ_NOT_CREATED: 'Nie udało się zapisać pytania w bazie danych.',
  FAQ_NOT_DELETED: 'Nie udało się usunąć pytania.',
  FAQS_NOT_DELETED: 'Nie udało się usunąć pytań.',
  FAQS_NOT_FOUND: 'Najczęściej zadawane pytania nie istnieją.',
  FAQS_DELETED: 'Usunięto wszystkie pytania.',
  FAQ_CATEGORIES_NOT_FOUND:
    'Nie udało się pobrać kategorii najczęściej zadawanych pytań.',
};

const contactConstants = {
  CONTACT_NOT_FOUND: 'Informacje kontaktowe nie istnieją.',
  CONTACT_NOT_UPDATED: 'Nie udało się zaktualizować informacji kontaktowych.',
};

const socialMediaConstants = {
  SOCIAL_MEDIA_NOT_FOUND: 'Linki do mediów społecznościowych nie istnieją.',
  SOCIAL_MEDIA_NOT_UPDATED:
    'Nie udało się zaktualizować linków do mediów społecznościowych.',
};

const errorsConstants = {
  ERROR_OCCURRED: 'Wystąpił błąd.',
  ACCESS_NOT_ALLOWED: 'Brak dostępu.',
  USER_IS_LOGGED_IN: 'Użytkownik jest aktualnie zalogowany.',
};

const statusCodesConstants = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const dbSeedsConstants = {
  USER_SEEDED: 'Database seeded with users data',
  ABOUT_SEEDED: 'Database seeded with about data',
  MAP_SEEDED: 'Database seeded with map data',
  CONTACT_SEEDED: 'Database seeded with contact data',
  SOCIAL_MEDIA_SEEDED: 'Database seeded with social media data',
  FAQS_CATEGORIES_SEEDED: 'Database seeded with faq categories data',
  REGULATIONS_SEEDED: 'Database seeded with regulations data',
};

const dbDeleteConstants = {
  PRODUCT_FILTERS_DELETED: 'Deleted product filters from database',
  FAQS_DELETED: 'Deleted faqs from database',
  MESSAGES_DELETED: 'Deleted messages from database',
  NEWSLETTER_DELETED: 'Deleted emails from database',
};

const urlConstants = {
  AVATARS_URL: 'http://localhost:3000/uploads/avatars/',
};

const routesConstants = {
  HOME: '/',
  AUTH: '/auth',
  SOCIAL_MEDIA: '/social-media',
  CONTACT: '/contact',
  ABOUT: '/about',
  USERS: '/users',
  FAQ: '/faq',
  FAQ_CATEGORIES: '/faq-categories',
  NEWSLETTER: '/newsletter',
  MAP: '/map',
  MESSAGES: '/messages',
  PRODUCTS: '/products',
  COMMENTS: '/comments',
  PRODUCT_CATEGORIES: '/product-categories',
  PRODUCT_FILTERS: '/product-filters',
  REGULATIONS: '/regulations',
  ORDERS: '/orders',
};

const faqsCategoriesConstants = {
  RETURNS: 'zwroty',
  DELIVERY: 'dostawa',
  PAYMENT: 'płatności',
  SERVICE: 'obsługa',
  PRODUCTS: 'produkty',
  DISCOUNTS: 'rabaty',
  OTHERS: 'inne',
};

const sortConstants = {
  DESC: 'desc',
  ASC: 'asc',
};

module.exports = {
  sortConstants,
  dbDeleteConstants,
  aboutConstants,
  socialMediaConstants,
  contactConstants,
  errorsConstants,
  statusCodesConstants,
  dbSeedsConstants,
  routesConstants,
  mapConstants,
  newsletterConstants,
  faqsConstants,
  faqsCategoriesConstants,
  messageConstants,
  productFiltersConstants,
  urlConstants,
};
