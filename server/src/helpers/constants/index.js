const aboutConstants = {
  ABOUT_NOT_FOUND: 'Informacje o sklepie nie istnieją.',
  ABOUT_NOT_UPDATED: 'Nie udało się zaktualizować informacji o sklepie.',
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

const enviromentConstants = {
  PRODUCTION: 'production',
  DEV: 'development',
};

const dbSeedsConstants = {
  ABOUT_SEEDED: 'Database seeded with about data',
  CONTACT_SEEDED: 'Database seeded with contact data',
  SOCIAL_MEDIA_SEEDED: 'Database seeded with social media data',
};

const directoriesConstants = {
  UPLOADS: 'uploads',
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

const apiVersionsConstants = {
  V1: '/v1',
};

module.exports = {
  aboutConstants,
  socialMediaConstants,
  contactConstants,
  errorsConstants,
  statusCodesConstants,
  dbSeedsConstants,
  enviromentConstants,
  directoriesConstants,
  routesConstants,
  apiVersionsConstants,
};
