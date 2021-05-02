const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');
const { BESTSELLERS_PL, NEWS_PL } = require('../../helpers/constants/products');
const {
  ADMIN,
  USER,
  DEFAULT_USERNAME,
} = require('../../helpers/constants/users');
const { MAP_LAT_LNG } = require('../../helpers/constants/map');
const {
  NEWSLETTER_REGULATIONS_NAME,
  NEWSLETTER_REGULATIONS_CONTENT,
  CONTACT_REGULATIONS_NAME,
  CONTACT_REGULATIONS_CONTENT,
} = require('../../helpers/constants/regulations');
const { capitalize } = require('../../helpers/strings');
const {
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
} = require('../../helpers/constants/faq');

const user = {
  name: '',
  username: DEFAULT_USERNAME,
  email: ADMIN_EMAIL,
  avatar: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: [USER, ADMIN],
};

const regulations = [
  {
    name: NEWSLETTER_REGULATIONS_NAME,
    content: NEWSLETTER_REGULATIONS_CONTENT,
  },
  {
    name: CONTACT_REGULATIONS_NAME,
    content: CONTACT_REGULATIONS_CONTENT,
  },
];

const about = {
  information: '',
};

const productCategories = [
  {
    name: capitalize(BESTSELLERS_PL),
  },
  {
    name: capitalize(NEWS_PL),
  },
];

const faqCategories = [
  RETURNS_PL,
  DELIVERY_PL,
  PAYMENT_PL,
  SERVICE_PL,
  PRODUCTS_PL,
  DISCOUNTS_PL,
  OTHERS_PL,
];

const contact = {
  email: '',
  phone: '',
  nip: '',
  street: '',
  street_number: '',
  city: '',
  zip_code: '',
  working_hours: '',
};

const map = {
  latlng: MAP_LAT_LNG,
};

const socialMedia = {
  twitter: '',
  facebook: '',
  linkedin: '',
  instagram: '',
};

module.exports = {
  user,
  socialMedia,
  contact,
  map,
  about,
  productCategories,
  regulations,
  faqCategories,
};
