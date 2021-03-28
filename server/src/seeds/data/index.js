const { ADMIN_PASSWORD, ADMIN_EMAIL } = require('../../config');
const { ADMIN, USER } = require('../../helpers/constants/users');
const {
  RETURNS,
  DELIVERY,
  PAYMENT,
  SERVICE,
  PRODUCTS,
  DISCOUNTS,
  OTHERS,
} = require('../../helpers/constants/faq');

const user = {
  name: '',
  username: 'administrator',
  email: ADMIN_EMAIL,
  avatar: '',
  password: ADMIN_PASSWORD,
  reset_password_token: null,
  reset_password_token_exp: null,
  roles: [USER, ADMIN],
};

const regulations = [
  {
    name: 'newsletter',
    content: 'Regulamin Newslettera.',
  },
  {
    name: 'kontakt',
    content: 'Regulamin Formularza.',
  },
];

const about = {
  information: '',
};

const productCategories = [
  {
    name: 'Bestsellery',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Nowości',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

const faqCategories = [
  RETURNS,
  DELIVERY,
  PAYMENT,
  SERVICE,
  PRODUCTS,
  DISCOUNTS,
  OTHERS,
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
  latlng: '(00.00, 00.00)',
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
