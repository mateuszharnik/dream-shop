const { capitalize } = require('../../helpers/strings');
const { defaultUsername } = require('../../helpers/variables/users');
const { defaultMapLatLng } = require('../../helpers/variables/map');
const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');
const { BESTSELLERS_PL, NEWS_PL } = require('../../helpers/constants/products');
const { ADMIN, USER } = require('../../helpers/constants/users');
const {
  defaultNewsletterRegulationsName,
  defaultNewsletterRegulationsContent,
  defaultContactRegulationsName,
  defaultContactRegulationsContent,
} = require('../../helpers/variables/regulations');
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
  username: defaultUsername,
  email: ADMIN_EMAIL,
  avatar: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: [USER, ADMIN],
};

const regulations = [
  {
    name: defaultNewsletterRegulationsName,
    content: defaultNewsletterRegulationsContent,
  },
  {
    name: defaultContactRegulationsName,
    content: defaultContactRegulationsContent,
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
  latlng: defaultMapLatLng,
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
